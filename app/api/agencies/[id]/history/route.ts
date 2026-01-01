import { NextRequest, NextResponse } from "next/server"
import { getSession } from "@/lib/session"
import { getAgencyHistory } from "@/lib/history"
import { prisma } from "@/lib/prisma"

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  const session = await getSession()
  if (!session) {
    return NextResponse.json({ error: "Non autorisé" }, { status: 401 })
  }

  // Vérifier que l'utilisateur est Super Admin
  if (session.role !== "Super Admin") {
    return NextResponse.json({ error: "Accès refusé" }, { status: 403 })
  }

  try {
    const agencyId = params.id

    const agency = await prisma.agency.findUnique({
      where: { id: agencyId },
    })

    if (!agency) {
      return NextResponse.json(
        { error: "Agence non trouvée" },
        { status: 404 }
      )
    }

    const history = await getAgencyHistory(agencyId)

    return NextResponse.json(history)
  } catch (error) {
    console.error("Error fetching agency history:", error)
    return NextResponse.json(
      { error: "Erreur lors de la récupération de l'historique" },
      { status: 500 }
    )
  }
}

