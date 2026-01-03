import { NextRequest, NextResponse } from "next/server"
import { getSession } from "@/lib/session"
import { getTechnicalHistory } from "@/lib/history"
import { prisma } from "@/lib/prisma"

export async function GET(
  request: NextRequest,
  context: { params: Promise<{ id: string }> }
) {
  const { id } = await context.params
  const session = await getSession()
  if (!session) {
    return NextResponse.json({ error: "Non autorisé" }, { status: 401 })
  }

  try {
    const technicalId = id

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

    const history = await getTechnicalHistory(technicalId)

    return NextResponse.json(history)
  } catch (error) {
    console.error("Error fetching technical history:", error)
    return NextResponse.json(
      { error: "Erreur lors de la récupération de l'historique" },
      { status: 500 }
    )
  }
}

