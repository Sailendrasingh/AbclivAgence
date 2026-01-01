import { NextRequest, NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"
import { getSession } from "@/lib/session"
import { createLog } from "@/lib/logs"
import { unlink } from "fs/promises"
import { join } from "path"
import { existsSync } from "fs"

const ALLOWED_TYPES = ["Bureau", "Connexion", "Armoire électrique", "Agence", "Divers"]

export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  const session = await getSession()
  if (!session) {
    return NextResponse.json({ error: "Non autorisé" }, { status: 401 })
  }

  try {
    const body = await request.json()
    const { type, title, photos } = body

    if (type && !ALLOWED_TYPES.includes(type)) {
      return NextResponse.json(
        { error: `Type invalide. Types autorisés: ${ALLOWED_TYPES.join(", ")}` },
        { status: 400 }
      )
    }

    if (photos && !Array.isArray(photos)) {
      return NextResponse.json(
        { error: "photos doit être un tableau" },
        { status: 400 }
      )
    }

    // Récupérer le groupe photo actuel pour vérifier le type
    const currentPhotoGroup = await prisma.photoGroup.findUnique({
      where: { id: params.id },
    })

    if (!currentPhotoGroup) {
      return NextResponse.json(
        { error: "Groupe de photos non trouvé" },
        { status: 404 }
      )
    }

    const updateData: any = {}
    if (type) updateData.type = type
    if (title !== undefined) updateData.title = title || null
    if (photos) {
      // Récupérer les anciennes photos pour détecter celles qui ont été supprimées
      const oldPhotos = JSON.parse(currentPhotoGroup.photos || "[]")
      const oldPhotoPaths = oldPhotos.map((p: string | { path: string }) => 
        typeof p === "string" ? p : p.path
      )
      const newPhotoPaths = photos.map((p: string | { path: string }) => 
        typeof p === "string" ? p : p.path
      )
      
      // Trouver les photos supprimées (présentes dans l'ancien tableau mais pas dans le nouveau)
      const deletedPhotoPaths = oldPhotoPaths.filter((path: string) => !newPhotoPaths.includes(path))
      
      // Supprimer les fichiers physiques des photos supprimées
      for (const photoPath of deletedPhotoPaths) {
        try {
          // Extraire le nom de fichier du path (format: /uploads/filename.jpg)
          const filename = photoPath.replace(/^\/uploads\//, "")
          const filePath = join(process.cwd(), "uploads", filename)
          
          if (existsSync(filePath)) {
            await unlink(filePath)
            console.log(`Fichier photo supprimé: ${filePath}`)
          }
        } catch (fileError) {
          // Ignorer les erreurs de suppression de fichier (fichier déjà supprimé, etc.)
          console.warn(`Impossible de supprimer le fichier ${photoPath}:`, fileError)
        }
      }
      
      // Cas spécial : Photo de l'agence - une seule photo
      if ((type || currentPhotoGroup.type) === "Agence") {
        // Ne garder que la première photo
        const firstPhoto = photos.length > 0 ? photos[0] : null
        updateData.photos = JSON.stringify(firstPhoto ? [firstPhoto] : [])
        
        // Mettre à jour le champ photo de l'agence
        if (firstPhoto) {
          // Extraire le path si c'est un objet, sinon utiliser directement
          const photoPath = typeof firstPhoto === "string" ? firstPhoto : firstPhoto.path
          await prisma.agency.update({
            where: { id: currentPhotoGroup.agencyId },
            data: { photo: photoPath },
          })
        }
      } else {
        updateData.photos = JSON.stringify(photos)
      }
    }

    const photoGroup = await prisma.photoGroup.update({
      where: { id: params.id },
      data: updateData,
    })

    await createLog(session.id, "PHOTO_GROUPE_MODIFIE", {
      photoGroupId: params.id,
    }, request)

    return NextResponse.json(photoGroup)
  } catch (error) {
    console.error("Error updating photo group:", error)
    return NextResponse.json(
      { error: "Erreur serveur" },
      { status: 500 }
    )
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  const session = await getSession()
  if (!session) {
    return NextResponse.json({ error: "Non autorisé" }, { status: 401 })
  }

  try {
    // Récupérer le groupe photo avant suppression
    const photoGroup = await prisma.photoGroup.findUnique({
      where: { id: params.id },
    })

    if (!photoGroup) {
      return NextResponse.json(
        { error: "Groupe de photos non trouvé" },
        { status: 404 }
      )
    }

    // Supprimer tous les fichiers physiques du groupe
    const photos = JSON.parse(photoGroup.photos || "[]")
    for (const photo of photos) {
      try {
        const photoPath = typeof photo === "string" ? photo : photo.path
        // Extraire le nom de fichier du path (format: /uploads/filename.jpg)
        const filename = photoPath.replace(/^\/uploads\//, "")
        const filePath = join(process.cwd(), "uploads", filename)
        
        if (existsSync(filePath)) {
          await unlink(filePath)
          console.log(`Fichier photo supprimé: ${filePath}`)
        }
      } catch (fileError) {
        // Ignorer les erreurs de suppression de fichier (fichier déjà supprimé, etc.)
        console.warn(`Impossible de supprimer le fichier:`, fileError)
      }
    }

    if (photoGroup.type === "Agence") {
      // Si c'est la photo de l'agence, supprimer aussi le champ photo de l'agence
      await prisma.agency.update({
        where: { id: photoGroup.agencyId },
        data: { photo: null },
      })
    }

    await prisma.photoGroup.delete({
      where: { id: params.id },
    })

    await createLog(session.id, "PHOTO_GROUPE_SUPPRIME", {
      photoGroupId: params.id,
    }, request)

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error("Error deleting photo group:", error)
    return NextResponse.json(
      { error: "Erreur serveur" },
      { status: 500 }
    )
  }
}

