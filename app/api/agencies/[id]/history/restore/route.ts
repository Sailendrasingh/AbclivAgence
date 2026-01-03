import { NextRequest, NextResponse } from "next/server"
import { getSession } from "@/lib/session"
import { restoreAgencyVersion } from "@/lib/history"
import { prisma } from "@/lib/prisma"
import { createLog } from "@/lib/logs"

export async function POST(
  request: NextRequest,
  context: { params: Promise<{ id: string }> }
) {
  const { id } = await context.params
  const session = await getSession()
  if (!session) {
    return NextResponse.json({ error: "Non autorisé" }, { status: 401 })
  }

  // Vérifier que l'utilisateur est Super Admin
  if (session.role !== "Super Admin") {
    return NextResponse.json({ error: "Accès refusé" }, { status: 403 })
  }

  try {
    const agencyId = id
    const body = await request.json()
    const { version } = body

    if (!version || typeof version !== "number") {
      return NextResponse.json(
        { error: "Version requise" },
        { status: 400 }
      )
    }

    const agency = await prisma.agency.findUnique({
      where: { id: agencyId },
    })

    if (!agency) {
      return NextResponse.json(
        { error: "Agence non trouvée" },
        { status: 404 }
      )
    }

    await restoreAgencyVersion(agencyId, version, session.id)

    await createLog(
      session.id,
      "AGENCE_RESTAUREE",
      `Restauration version ${version} pour agencyId: ${agencyId}`
    )

    return NextResponse.json({ success: true })
  } catch (error: any) {
    console.error("Error restoring agency version:", error)
    return NextResponse.json(
      { error: error.message || "Erreur lors de la restauration" },
      { status: 500 }
    )
  }
}

