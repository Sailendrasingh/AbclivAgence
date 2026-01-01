import { NextRequest, NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"
import { getSession } from "@/lib/session"
import { createLog } from "@/lib/logs"

const ALLOWED_TYPES = ["Bureau", "Connexion", "Armoire électrique", "Agence", "Divers"]

export async function POST(request: NextRequest) {
  const session = await getSession()
  if (!session) {
    return NextResponse.json({ error: "Non autorisé" }, { status: 401 })
  }

  try {
    const body = await request.json()
    const { agencyId, type, title, photos } = body

    if (!agencyId || !type || !photos) {
      return NextResponse.json(
        { error: "Champs obligatoires manquants" },
        { status: 400 }
      )
    }

    if (!ALLOWED_TYPES.includes(type)) {
      return NextResponse.json(
        { error: `Type invalide. Types autorisés: ${ALLOWED_TYPES.join(", ")}` },
        { status: 400 }
      )
    }

    if (!Array.isArray(photos)) {
      return NextResponse.json(
        { error: "photos doit être un tableau" },
        { status: 400 }
      )
    }

    // Cas spécial : Photo de l'agence - une seule photo, remplace la précédente
    if (type === "Agence") {
      // Supprimer l'ancien groupe "Agence" s'il existe
      const existingAgencyPhoto = await prisma.photoGroup.findFirst({
        where: {
          agencyId,
          type: "Agence",
        },
      })

      if (existingAgencyPhoto) {
        await prisma.photoGroup.delete({
          where: { id: existingAgencyPhoto.id },
        })
      }

      // Ne garder que la première photo
      const firstPhoto = photos.length > 0 ? photos[0] : null
      if (firstPhoto) {
        // Extraire le path si c'est un objet, sinon utiliser directement
        const photoPath = typeof firstPhoto === "string" ? firstPhoto : firstPhoto.path
        // Mettre à jour le champ photo de l'agence
        await prisma.agency.update({
          where: { id: agencyId },
          data: { photo: photoPath },
        })
      }
    }

    const photoGroup = await prisma.photoGroup.create({
      data: {
        agencyId,
        type,
        title: title || null,
        photos: JSON.stringify(photos),
      },
    })

    await createLog(session.id, "PHOTO_GROUPE_CREE", {
      photoGroupId: photoGroup.id,
      agencyId,
      type,
    }, request)

    return NextResponse.json(photoGroup, { status: 201 })
  } catch (error) {
    console.error("Error creating photo group:", error)
    return NextResponse.json(
      { error: "Erreur serveur" },
      { status: 500 }
    )
  }
}

