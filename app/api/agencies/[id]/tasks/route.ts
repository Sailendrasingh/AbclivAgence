import { NextRequest, NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"
import { getSession } from "@/lib/session"
import { createLog } from "@/lib/logs"
import { requireCSRF } from "@/lib/csrf-middleware"

// GET - Récupérer toutes les tâches d'une agence
export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params
    const session = await getSession()

    if (!session) {
      return NextResponse.json({ error: "Non autorisé" }, { status: 401 })
    }

    const tasks = await prisma.task.findMany({
      where: { agencyId: id },
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
      orderBy: {
        createdAt: "desc",
      },
    })

    // Normaliser les photos pour s'assurer que null est bien géré
    const normalizedTasks = tasks.map(task => ({
      ...task,
      photos: task.photos || null, // S'assurer que null est explicite
    }))

    return NextResponse.json(normalizedTasks)
  } catch (error: any) {
    console.error("Error fetching tasks:", error)
    console.error("Error details:", {
      message: error?.message,
      code: error?.code,
      meta: error?.meta,
    })
    return NextResponse.json(
      { error: "Erreur serveur", details: process.env.NODE_ENV === "development" ? error?.message : undefined },
      { status: 500 }
    )
  }
}

// POST - Créer une nouvelle tâche
export async function POST(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params

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
    const { title, createdAt, notes, importance, photos } = body

    // Validation
    if (!title || title.trim() === "") {
      return NextResponse.json(
        { error: "Le titre est obligatoire" },
        { status: 400 }
      )
    }

    if (!notes || notes.trim() === "") {
      return NextResponse.json(
        { error: "Les notes sont obligatoires" },
        { status: 400 }
      )
    }

    if (!["URGENT", "CRITIQUE", "INFO"].includes(importance)) {
      return NextResponse.json(
        { error: "L'importance doit être URGENT, CRITIQUE ou INFO" },
        { status: 400 }
      )
    }

    // Vérifier que l'agence existe
    const agency = await prisma.agency.findUnique({
      where: { id },
    })

    if (!agency) {
      return NextResponse.json(
        { error: "Agence non trouvée" },
        { status: 404 }
      )
    }

    // Valider les photos (max 5)
    let photosJson = null
    if (photos) {
      if (!Array.isArray(photos)) {
        return NextResponse.json(
          { error: "photos doit être un tableau" },
          { status: 400 }
        )
      }
      if (photos.length > 5) {
        return NextResponse.json(
          { error: "Maximum 5 photos autorisées" },
          { status: 400 }
        )
      }
      photosJson = JSON.stringify(photos)
    }

    // Créer la tâche
    const task = await prisma.task.create({
      data: {
        agencyId: id,
        createdBy: session.id,
        title: title.trim(),
        notes: notes.trim(),
        importance,
        photos: photosJson,
        createdAt: createdAt ? new Date(createdAt) : new Date(),
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
      "TACHE_CREEE",
      {
        taskId: task.id,
        agencyId: id,
        agencyName: agency.name,
        importance,
      },
      request
    )

    return NextResponse.json(task, { status: 201 })
  } catch (error) {
    console.error("Error creating task:", error)
    return NextResponse.json(
      { error: "Erreur serveur" },
      { status: 500 }
    )
  }
}

