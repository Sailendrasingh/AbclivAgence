import { NextRequest, NextResponse } from "next/server"
import { writeFile, mkdir, unlink } from "fs/promises"
import { join } from "path"
import { getSession } from "@/lib/session"
import { prisma } from "@/lib/prisma"
import { createLog } from "@/lib/logs"
import { requireCSRF } from "@/lib/csrf-middleware"
import { quarantineFile, scanQuarantinedFile, releaseFromQuarantine, removeFromQuarantine } from "@/lib/quarantine"
import { processImageSecurely } from "@/lib/image-sandbox"

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

    // ÉTAPE 1: Mettre le fichier en quarantaine
    const quarantineInfo = await quarantineFile(buffer, file.name)
    console.log(`[PHOTO] Fichier mis en quarantaine: ${quarantineInfo.filePath}`)

    // ÉTAPE 2: Scanner le fichier en quarantaine
    const scanResult = await scanQuarantinedFile(quarantineInfo, buffer)

    if (!scanResult.clean) {
      // Fichier malveillant détecté, le supprimer de la quarantaine
      await removeFromQuarantine(quarantineInfo.filePath)
      
      await createLog(session.id, "PHOTO_PROFIL_REJETEE", {
        userId: id,
        reason: scanResult.threat || "Fichier suspect détecté",
        engine: scanResult.engine,
      }, request)

      return NextResponse.json(
        { 
          error: "Fichier rejeté pour des raisons de sécurité. Veuillez utiliser une image valide.",
          details: scanResult.threat 
        },
        { status: 403 }
      )
    }

    console.log(`[PHOTO] Fichier approuvé par scan: ${scanResult.engine} - Propre`)

    // ÉTAPE 3: Traiter l'image dans un sandbox (redimensionnement)
    let processedBuffer: Buffer
    try {
      processedBuffer = await processImageSecurely(buffer, {
        width: PROFILE_PHOTO_SIZE,
        height: PROFILE_PHOTO_SIZE,
        fit: "cover",
        position: "center",
      })
    } catch (error: any) {
      // Si le traitement échoue, supprimer de la quarantaine
      await removeFromQuarantine(quarantineInfo.filePath)
      return NextResponse.json(
        { error: "Erreur lors du traitement de l'image" },
        { status: 500 }
      )
    }

    // ÉTAPE 4: Générer le nom de fichier final et libérer depuis la quarantaine
    const timestamp = Date.now()
    const random = Math.random().toString(36).substring(2, 15)
    const extension = isValidJPEG ? "jpg" : "png"
    const filename = `profile-${id}-${timestamp}-${random}.${extension}`
    const finalFilePath = join(userPhotosDir, filename)
    const relativePath = `/uploads/user-photos/${filename}`

    // Écrire l'image traitée directement (le fichier en quarantaine n'est plus nécessaire)
    await writeFile(finalFilePath, processedBuffer)
    
    // Supprimer le fichier de la quarantaine (déjà traité)
    await removeFromQuarantine(quarantineInfo.filePath)
    
    console.log(`[PHOTO] Fichier traité et sauvegardé: ${finalFilePath}`)

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

