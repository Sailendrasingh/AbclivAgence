import { NextRequest, NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"
import { getSession } from "@/lib/session"

/**
 * GET /api/tasks
 * Retourne les tâches pour la vue calendrier (toutes les agences).
 * Query optionnels : from, to (YYYY-MM-DD) pour filtrer par date de création.
 */
export async function GET(request: NextRequest) {
  const session = await getSession()
  if (!session) {
    return NextResponse.json({ error: "Non autorisé" }, { status: 401 })
  }

  try {
    const { searchParams } = new URL(request.url)
    const fromParam = searchParams.get("from")
    const toParam = searchParams.get("to")

    let fromDate: Date | undefined
    let toDate: Date | undefined

    if (fromParam) {
      fromDate = new Date(fromParam)
      if (isNaN(fromDate.getTime())) {
        return NextResponse.json({ error: "Paramètre from invalide (attendu YYYY-MM-DD)" }, { status: 400 })
      }
      fromDate.setHours(0, 0, 0, 0)
    }
    if (toParam) {
      toDate = new Date(toParam)
      if (isNaN(toDate.getTime())) {
        return NextResponse.json({ error: "Paramètre to invalide (attendu YYYY-MM-DD)" }, { status: 400 })
      }
      toDate.setHours(23, 59, 59, 999)
    }

    const now = new Date()
    const start = fromDate ?? new Date(now.getFullYear(), 0, 1)
    const end = toDate ?? new Date(now.getFullYear() + 1, 11, 31, 23, 59, 59, 999)

    const tasks = await prisma.task.findMany({
      where: {
        createdAt: {
          gte: start,
          lte: end,
        },
      },
      select: {
        id: true,
        agencyId: true,
        title: true,
        createdAt: true,
        closedAt: true,
        importance: true,
        notes: true,
        photos: true,
        agency: { select: { name: true } },
      },
      orderBy: { createdAt: "asc" },
    })

    return NextResponse.json(tasks)
  } catch (error) {
    console.error("Error fetching tasks for calendar:", error)
    return NextResponse.json({ error: "Erreur serveur" }, { status: 500 })
  }
}
