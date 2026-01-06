import { NextRequest, NextResponse } from "next/server"
import { getSession } from "@/lib/session"
import { prisma } from "@/lib/prisma"
import { existsSync, statSync } from "fs"
import { join } from "path"

/**
 * Scanne les images référencées dans la base de données pour trouver celles qui sont manquantes physiquement
 */
export async function GET(request: NextRequest) {
  const session = await getSession()
  if (!session) {
    return NextResponse.json({ error: "Non autorisé" }, { status: 401 })
  }

  // Seuls les Super Admin peuvent scanner les images manquantes
  if (session.role !== "Super Admin") {
    return NextResponse.json({ error: "Accès refusé" }, { status: 403 })
  }

  try {
    const missingImages: Array<{
      agencyName: string
      agencyId: string
      photoType: string
      photoLabel: string | null
      photoDate: string | null
      photoPath: string
    }> = []

    // 1. Photos dans PhotoGroup
    const photoGroups = await prisma.photoGroup.findMany({
      include: {
        agency: {
          select: {
            id: true,
            name: true,
          },
        },
      },
    })

    for (const group of photoGroups) {
      try {
        const photos = JSON.parse(group.photos)
        if (Array.isArray(photos)) {
          for (const photo of photos) {
            let photoPath: string | null = null
            let photoLabel: string | null = null
            let photoDate: string | null = null

            if (typeof photo === "string") {
              photoPath = photo
            } else if (photo && typeof photo === "object") {
              photoPath = photo.path || null
              photoLabel = photo.title || group.title || null
              photoDate = photo.createdAt || photo.date || null
            }

            if (photoPath) {
              // Vérifier si le fichier existe physiquement
              const absolutePath = join(process.cwd(), photoPath)
              if (!existsSync(absolutePath)) {
                missingImages.push({
                  agencyName: group.agency.name,
                  agencyId: group.agency.id,
                  photoType: group.type,
                  photoLabel: photoLabel,
                  photoDate: photoDate,
                  photoPath: photoPath,
                })
              }
            }
          }
        }
      } catch (error) {
        // Ignorer les erreurs de parsing JSON
        console.warn(`Erreur lors du parsing des photos pour le groupe ${group.id}:`, error)
      }
    }

    // 2. Photos d'agences (Agency.photo)
    const agencies = await prisma.agency.findMany({
      where: { photo: { not: null } },
      select: {
        id: true,
        name: true,
        photo: true,
      },
    })

    for (const agency of agencies) {
      if (agency.photo) {
        const absolutePath = join(process.cwd(), agency.photo)
        if (!existsSync(absolutePath)) {
          missingImages.push({
            agencyName: agency.name,
            agencyId: agency.id,
            photoType: "Agence",
            photoLabel: null,
            photoDate: null,
            photoPath: agency.photo,
          })
        }
      }
    }

    // 3. Photos de profil (User.photo) - optionnel, mais on peut les inclure
    const users = await prisma.user.findMany({
      where: { photo: { not: null } },
      select: {
        id: true,
        login: true,
        photo: true,
      },
    })

    for (const user of users) {
      if (user.photo) {
        const absolutePath = join(process.cwd(), user.photo)
        if (!existsSync(absolutePath)) {
          missingImages.push({
            agencyName: `Utilisateur: ${user.login}`,
            agencyId: user.id,
            photoType: "Photo de profil",
            photoLabel: null,
            photoDate: null,
            photoPath: user.photo,
          })
        }
      }
    }

    // 4. Photos dans Task (JSON array)
    const tasks = await prisma.task.findMany({
      where: { photos: { not: null } },
      include: {
        agency: {
          select: {
            id: true,
            name: true,
          },
        },
      },
    })

    for (const task of tasks) {
      if (task.photos) {
        try {
          const photos = JSON.parse(task.photos)
          if (Array.isArray(photos)) {
            for (const photoPath of photos) {
              if (photoPath && typeof photoPath === "string") {
                const absolutePath = join(process.cwd(), photoPath)
                if (!existsSync(absolutePath)) {
                  missingImages.push({
                    agencyName: task.agency.name,
                    agencyId: task.agency.id,
                    photoType: "Tâche",
                    photoLabel: task.title,
                    photoDate: task.createdAt ? new Date(task.createdAt).toISOString() : null,
                    photoPath: photoPath,
                  })
                }
              }
            }
          }
        } catch (error) {
          // Ignorer les erreurs de parsing JSON
          console.warn(`Erreur lors du parsing des photos pour la tâche ${task.id}:`, error)
        }
      }
    }

    // Trier par agence puis par type
    missingImages.sort((a, b) => {
      if (a.agencyName !== b.agencyName) {
        return a.agencyName.localeCompare(b.agencyName)
      }
      return a.photoType.localeCompare(b.photoType)
    })

    return NextResponse.json({
      missingImages,
      count: missingImages.length,
    })
  } catch (error: any) {
    console.error("Error scanning missing images:", error)
    return NextResponse.json(
      { error: "Erreur lors du scan des images manquantes" },
      { status: 500 }
    )
  }
}

