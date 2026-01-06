import { NextRequest, NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"
import { getSession } from "@/lib/session"
import { createLog } from "@/lib/logs"
import { requireCSRF } from "@/lib/csrf-middleware"

// PUT - Modifier une tâche
export async function PUT(
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
    const { title, createdAt, notes, importance, closedAt, photos } = body

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

    // Validation
    if (title !== undefined && title.trim() === "") {
      return NextResponse.json(
        { error: "Le titre ne peut pas être vide" },
        { status: 400 }
      )
    }

    // Vérifier que seul le Super Admin peut supprimer les notes des tâches
    if (notes !== undefined) {
      const isDeletingNotes = notes.trim() === ""
      const hasExistingNotes = existingTask.notes && existingTask.notes.trim() !== ""
      
      // Si on tente de supprimer des notes existantes et que l'utilisateur n'est pas Super Admin
      if (isDeletingNotes && hasExistingNotes && session.role !== "Super Admin") {
        return NextResponse.json(
          { error: "Seul le Super Admin peut supprimer les notes des tâches" },
          { status: 403 }
        )
      }
      
      // Si les notes sont vides et que l'utilisateur n'est pas Super Admin (et qu'il n'y avait pas de notes avant)
      // Note: Si l'utilisateur est Super Admin, il peut laisser les notes vides même si elles n'existaient pas avant
      if (isDeletingNotes && !hasExistingNotes && session.role !== "Super Admin") {
        return NextResponse.json(
          { error: "Les notes ne peuvent pas être vides" },
          { status: 400 }
        )
      }
    }

    if (importance && !["URGENT", "CRITIQUE", "INFO"].includes(importance)) {
      return NextResponse.json(
        { error: "L'importance doit être URGENT, CRITIQUE ou INFO" },
        { status: 400 }
      )
    }

    // Valider les photos (max 5)
    let photosJson = undefined
    if (photos !== undefined) {
      if (photos === null) {
        photosJson = null
      } else {
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
        photosJson = photos.length > 0 ? JSON.stringify(photos) : null
      }
    }

    // Mettre à jour la tâche
    const updatedTask = await prisma.task.update({
      where: { id: taskId },
      data: {
        ...(title !== undefined && { title: title.trim() }),
        ...(createdAt && { createdAt: new Date(createdAt) }),
        // Permettre les notes vides uniquement pour le Super Admin
        ...(notes !== undefined && { 
          notes: notes.trim()
        }),
        ...(importance && { importance }),
        ...(photosJson !== undefined && { photos: photosJson }),
        ...(closedAt !== undefined && {
          closedAt: closedAt ? new Date(closedAt) : null,
          closedBy: closedAt ? session.id : null,
        }),
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
      "TACHE_MODIFIEE",
      {
        taskId: taskId,
        agencyId: id,
        agencyName: existingTask.agency.name,
      },
      request
    )

    return NextResponse.json(updatedTask)
  } catch (error) {
    console.error("Error updating task:", error)
    return NextResponse.json(
      { error: "Erreur serveur" },
      { status: 500 }
    )
  }
}

// DELETE - Supprimer une tâche
export async function DELETE(
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

    // Vérifier que seul le Super Admin peut supprimer une tâche
    if (session.role !== "Super Admin") {
      return NextResponse.json(
        { error: "Seul le Super Admin peut supprimer une tâche" },
        { status: 403 }
      )
    }

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

    // Supprimer la tâche
    await prisma.task.delete({
      where: { id: taskId },
    })

    await createLog(
      session.id,
      "TACHE_SUPPRIMEE",
      {
        taskId: taskId,
        agencyId: id,
        agencyName: existingTask.agency.name,
      },
      request
    )

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error("Error deleting task:", error)
    return NextResponse.json(
      { error: "Erreur serveur" },
      { status: 500 }
    )
  }
}

