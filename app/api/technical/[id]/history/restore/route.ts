import { NextRequest, NextResponse } from "next/server"
import { getSession } from "@/lib/session"
import { restoreTechnicalNotes } from "@/lib/history"
import { prisma } from "@/lib/prisma"
import { createLog } from "@/lib/logs"

export async function POST(
  request: NextRequest,
  { params }: Promise<{ params: { id: string } }>
) {
  const { id } = await params
  const session = await getSession()
  if (!session) {
    return NextResponse.json({ error: "Non autorisé" }, { status: 401 })
  }

  try {
    const technicalId = id
    const body = await request.json()
    const { version } = body

    if (!version || typeof version !== "number") {
      return NextResponse.json(
        { error: "Version requise" },
        { status: 400 }
      )
    }

    // Vérifier que les données techniques existent
    const technical = await prisma.technical.findUnique({
      where: { id: technicalId },
    })

    if (!technical) {
      return NextResponse.json(
        { error: "Données techniques non trouvées" },
        { status: 404 }
      )
    }

    await restoreTechnicalNotes(technicalId, version, session.id)

    await createLog(
      session.id,
      "NOTES_TECHNIQUES_RESTAUREES",
      `Restauration version ${version} pour technicalId: ${technicalId}`
    )

    return NextResponse.json({ success: true })
  } catch (error: any) {
    console.error("Error restoring technical notes:", error)
    return NextResponse.json(
      { error: error.message || "Erreur lors de la restauration" },
      { status: 500 }
    )
  }
}

