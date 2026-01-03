import { NextRequest, NextResponse } from "next/server"
import { writeFile, mkdir, unlink } from "fs/promises"
import { join } from "path"
import { getSession } from "@/lib/session"
import { prisma } from "@/lib/prisma"
import { createLog } from "@/lib/logs"
import { requireCSRF } from "@/lib/csrf-middleware"

const MAX_FILE_SIZE = 1 * 1024 * 1024 // 1 MB
const ALLOWED_TYPES = ["image/jpeg", "image/png"]
const PROFILE_PHOTO_SIZE = 100 // 100x100px

// Magic bytes pour vérifier le vrai type de fichier
const MAGIC_BYTES: Record<string, number[]> = {
  "image/jpeg": [0xFF, 0xD8, 0xFF],
  "image/png": [0x89, 0x50, 0x4E, 0x47, 0x0D, 0x0A, 0x1A, 0x0A],
}

function verifyFileType(buffer: Buffer, expectedMime: string): boolean {
  const magicBytes = MAGIC_BYTES[expectedMime]
  if (!magicBytes) return false
  
  for (let i = 0; i < magicBytes.length; i++) {
    if (buffer[i] !== magicBytes[i]) {
      return false
    }
  }
  return true
}

export async function POST(
  request: NextRequest,
  context: { params: Promise<{ id: string }> }
) {
  const session = await getSession()
  if (!session) {
    return NextResponse.json({ error: "Non autorisé" }, { status: 401 })
  }

  // Vérifier le token CSRF
  const csrfError = await requireCSRF(request)
  if (csrfError) {
    return csrfError
  }

  try {
    const { id } = await context.params

    // Vérifier que l'utilisateur modifie son propre profil ou est Super Admin
    if (session.id !== id && session.role !== "Super Admin") {
      return NextResponse.json({ error: "Non autorisé" }, { status: 403 })
    }

    const formData = await request.formData()
    const file = formData.get("file") as File

    if (!file) {
      return NextResponse.json(
        { error: "Aucun fichier fourni" },
        { status: 400 }
      )
    }

    // Vérifier le type
    if (!ALLOWED_TYPES.includes(file.type)) {
      return NextResponse.json(
        { error: "Type de fichier non autorisé. Seuls JPEG et PNG sont acceptés." },
        { status: 400 }
      )
    }

    // Vérifier la taille
    if (file.size > MAX_FILE_SIZE) {
      return NextResponse.json(
        { error: "Fichier trop volumineux. Maximum 1 MB." },
        { status: 400 }
      )
    }

    // Créer le dossier user-photos s'il n'existe pas
    const userPhotosDir = join(process.cwd(), "uploads", "user-photos")
    try {
      await mkdir(userPhotosDir, { recursive: true })
    } catch {
      // Le dossier existe déjà
    }

    // Lire le fichier
    const bytes = await file.arrayBuffer()
    const buffer = Buffer.from(bytes)

    // Vérification stricte du type MIME via magic bytes
    const isValidJPEG = verifyFileType(buffer, "image/jpeg")
    const isValidPNG = verifyFileType(buffer, "image/png")
    
    if (!isValidJPEG && !isValidPNG) {
      return NextResponse.json(
        { error: "Type de fichier non autorisé. Seuls les fichiers JPEG et PNG valides sont acceptés." },
        { status: 400 }
      )
    }

    // Récupérer l'ancienne photo pour la supprimer
    const user = await prisma.user.findUnique({
      where: { id },
      select: { photo: true },
    })

    if (user?.photo) {
      try {
        const oldPhotoPath = join(process.cwd(), user.photo)
        await unlink(oldPhotoPath)
      } catch {
        // Ignorer si le fichier n'existe pas
      }
    }

    // Générer un nom de fichier unique
    const timestamp = Date.now()
    const random = Math.random().toString(36).substring(2, 15)
    const extension = isValidJPEG ? "jpg" : "png"
    const filename = `profile-${id}-${timestamp}-${random}.${extension}`
    const filepath = join(userPhotosDir, filename)
    const relativePath = `/uploads/user-photos/${filename}`

    // Redimensionner et sauvegarder l'image en carré 100x100px
    const sharp = (await import("sharp")).default
    await sharp(buffer)
      .resize(PROFILE_PHOTO_SIZE, PROFILE_PHOTO_SIZE, {
        fit: "cover",
        position: "center",
      })
      .toFile(filepath)

    // Mettre à jour l'utilisateur avec le chemin de la photo
    await prisma.user.update({
      where: { id },
      data: { photo: relativePath },
    })

    await createLog(session.id, "PHOTO_PROFIL_UPLOADEE", {
      userId: id,
      photoPath: relativePath,
    }, request)

    return NextResponse.json({
      success: true,
      path: relativePath,
    })
  } catch (error: any) {
    console.error("Error uploading profile photo:", error)
    return NextResponse.json(
      { error: "Erreur lors de l'upload de la photo" },
      { status: 500 }
    )
  }
}

export async function DELETE(
  request: NextRequest,
  context: { params: Promise<{ id: string }> }
) {
  const session = await getSession()
  if (!session) {
    return NextResponse.json({ error: "Non autorisé" }, { status: 401 })
  }

  // Vérifier le token CSRF
  const csrfError = await requireCSRF(request)
  if (csrfError) {
    return csrfError
  }

  try {
    const { id } = await context.params

    // Vérifier que l'utilisateur modifie son propre profil ou est Super Admin
    if (session.id !== id && session.role !== "Super Admin") {
      return NextResponse.json({ error: "Non autorisé" }, { status: 403 })
    }

    // Récupérer l'utilisateur
    const user = await prisma.user.findUnique({
      where: { id },
      select: { photo: true },
    })

    if (user?.photo) {
      try {
        const photoPath = join(process.cwd(), user.photo)
        await unlink(photoPath)
      } catch {
        // Ignorer si le fichier n'existe pas
      }

      // Mettre à jour l'utilisateur pour supprimer la référence à la photo
      await prisma.user.update({
        where: { id },
        data: { photo: null },
      })

      await createLog(session.id, "PHOTO_PROFIL_SUPPRIMEE", {
        userId: id,
      }, request)
    }

    return NextResponse.json({ success: true })
  } catch (error: any) {
    console.error("Error deleting profile photo:", error)
    return NextResponse.json(
      { error: "Erreur lors de la suppression de la photo" },
      { status: 500 }
    )
  }
}

