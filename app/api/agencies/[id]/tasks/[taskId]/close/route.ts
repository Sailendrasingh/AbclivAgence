import { NextRequest, NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"
import { getSession } from "@/lib/session"
import { createLog } from "@/lib/logs"
import { requireCSRF } from "@/lib/csrf-middleware"

// POST - Clôturer une tâche
export async function POST(
  request: NextRequest,
  { params }: { params: Promise<{ id: string; taskId: string }> }
) {
  try {
    const { id, taskId } = await params

    // Vérifier le token CSRF
    const csrfError = await requireCSRF(request)
    if (csrfError) {
      return csrfError
    }

    const session = await getSession()
    if (!session) {
      return NextResponse.json({ error: "Non autorisé" }, { status: 401 })
    }

    const body = await request.json()
    const { closedAt } = body

    // Vérifier que la tâche existe et appartient à l'agence
    const existingTask = await prisma.task.findFirst({
      where: {
        id: taskId,
        agencyId: id,
      },
      include: {
        agency: {
          select: {
            name: true,
          },
        },
      },
    })

    if (!existingTask) {
      return NextResponse.json(
        { error: "Tâche non trouvée" },
        { status: 404 }
      )
    }

    if (existingTask.closedAt) {
      return NextResponse.json(
        { error: "La tâche est déjà clôturée" },
        { status: 400 }
      )
    }

    // Clôturer la tâche
    const updatedTask = await prisma.task.update({
      where: { id: taskId },
      data: {
        closedAt: closedAt ? new Date(closedAt) : new Date(),
        closedBy: session.id,
      },
      include: {
        creator: {
          select: {
            id: true,
            login: true,
          },
        },
        closer: {
          select: {
            id: true,
            login: true,
          },
        },
      },
    })

    await createLog(
      session.id,
      "TACHE_CLOTUREE",
      {
        taskId: taskId,
        agencyId: id,
        agencyName: existingTask.agency.name,
      },
      request
    )

    return NextResponse.json(updatedTask)
  } catch (error) {
    console.error("Error closing task:", error)
    return NextResponse.json(
      { error: "Erreur serveur" },
      { status: 500 }
    )
  }
}

