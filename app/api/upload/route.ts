import { NextRequest, NextResponse } from "next/server"
import { writeFile, mkdir, stat, readFile } from "fs/promises"
import { join } from "path"
import { getSession } from "@/lib/session"
import { createLog } from "@/lib/logs"
import exifr from "exifr"
import { requireCSRF } from "@/lib/csrf-middleware"

const ALLOWED_TYPES = ["image/jpeg", "image/png"]

// Fonction pour récupérer la taille maximale depuis les paramètres
async function getMaxFileSize(): Promise<number> {
  try {
    const { prisma } = await import("@/lib/prisma")
    const settings = await prisma.appSettings.findUnique({
      where: { id: "settings" },
      select: { maxImageSizeMB: true },
    })
    return (settings?.maxImageSizeMB || 5) * 1024 * 1024 // Convertir Mo en octets
  } catch (error) {
    console.warn("Erreur lors de la récupération de la taille maximale, utilisation de 5 Mo par défaut:", error)
    return 5 * 1024 * 1024 // 5 MB par défaut
  }
}

// Magic bytes pour vérifier le vrai type de fichier
const MAGIC_BYTES: Record<string, number[]> = {
  "image/jpeg": [0xFF, 0xD8, 0xFF],
  "image/png": [0x89, 0x50, 0x4E, 0x47, 0x0D, 0x0A, 0x1A, 0x0A],
}

// Fonction pour vérifier le type MIME réel d'un fichier via magic bytes
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

export async function POST(request: NextRequest) {
  const session = await getSession()
  if (!session) {
    return NextResponse.json({ error: "Non autorisé" }, { status: 401 })
  }

  try {
    // Pour FormData, on doit parser le FormData d'abord pour extraire le token CSRF
    // car request.formData() ne peut être appelé qu'une seule fois
    const formData = await request.formData()
    const csrfTokenFromForm = formData.get("_csrf")
    const csrfTokenFromHeader = request.headers.get("x-csrf-token")
    const csrfToken = (csrfTokenFromForm && typeof csrfTokenFromForm === "string" ? csrfTokenFromForm : null) || csrfTokenFromHeader
    
    console.log("[UPLOAD] CSRF Token from FormData:", csrfTokenFromForm ? "présent" : "absent")
    console.log("[UPLOAD] CSRF Token from Header:", csrfTokenFromHeader ? "présent" : "absent")
    console.log("[UPLOAD] CSRF Token final:", csrfToken ? "présent" : "absent")
    
    // Valider le token CSRF
    const { verifyCSRFToken } = await import("@/lib/csrf")
    const isValid = await verifyCSRFToken(csrfToken)
    
    console.log("[UPLOAD] CSRF Token validation:", isValid ? "valide" : "invalide")
    
    if (!isValid) {
      return NextResponse.json(
        { error: "Token CSRF invalide ou manquant" },
        { status: 403 }
      )
    }
    
    // Retirer le token CSRF du FormData (il a été utilisé pour la validation)
    formData.delete("_csrf")
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
        { error: "Type de fichier non autorisé. Seuls jpeg et png sont acceptés." },
        { status: 400 }
      )
    }

    // Récupérer la taille maximale depuis les paramètres
    const MAX_FILE_SIZE = await getMaxFileSize()
    const maxSizeMB = MAX_FILE_SIZE / (1024 * 1024)

    // Vérifier la taille
    if (file.size > MAX_FILE_SIZE) {
      return NextResponse.json(
        { error: `Fichier trop volumineux. Maximum ${maxSizeMB} MB.` },
        { status: 400 }
      )
    }

    // Créer le dossier uploads s'il n'existe pas
    const uploadsDir = join(process.cwd(), "uploads")
    try {
      await mkdir(uploadsDir, { recursive: true })
    } catch {
      // Le dossier existe déjà
    }

    // Générer un nom de fichier unique
    const timestamp = Date.now()
    const random = Math.random().toString(36).substring(2, 15)
    const extension = file.name.split(".").pop()
    const filename = `${timestamp}-${random}.${extension}`
    const filepath = join(uploadsDir, filename)

    // Écrire le fichier
    const bytes = await file.arrayBuffer()
    const buffer = Buffer.from(bytes)

    // Vérification stricte du type MIME via magic bytes (protection contre falsification)
    const isValidJPEG = verifyFileType(buffer, "image/jpeg")
    const isValidPNG = verifyFileType(buffer, "image/png")
    
    if (!isValidJPEG && !isValidPNG) {
      return NextResponse.json(
        { error: "Type de fichier non autorisé. Seuls les fichiers JPEG et PNG valides sont acceptés." },
        { status: 400 }
      )
    }
    
    // Vérifier que le type déclaré correspond au type réel
    if ((file.type === "image/jpeg" && !isValidJPEG) || 
        (file.type === "image/png" && !isValidPNG)) {
      return NextResponse.json(
        { error: "Le type de fichier déclaré ne correspond pas au contenu réel." },
        { status: 400 }
      )
    }

    // Récupérer la date de création originale depuis les métadonnées EXIF de l'image
    // IMPORTANT : Faire cela AVANT d'écrire le fichier pour éviter d'utiliser la date de création du nouveau fichier
    let createdAt: Date | null = null
    
    try {
      const exifData = await exifr.parse(buffer, {
        pick: ['DateTimeOriginal', 'CreateDate', 'ModifyDate', 'FileModifyDate']
      })
      
      // Priorité : DateTimeOriginal > CreateDate > ModifyDate
      if (exifData?.DateTimeOriginal) {
        createdAt = new Date(exifData.DateTimeOriginal)
      } else if (exifData?.CreateDate) {
        createdAt = new Date(exifData.CreateDate)
      } else if (exifData?.ModifyDate) {
        createdAt = new Date(exifData.ModifyDate)
      }
    } catch (exifError) {
      // Si la lecture EXIF échoue, on essaie d'utiliser lastModified du File object
      console.log("Erreur lecture EXIF:", exifError)
    }
    
    // Si pas de date EXIF, utiliser lastModified du File object (date de modification originale du fichier)
    if (!createdAt || isNaN(createdAt.getTime())) {
      if (file.lastModified) {
        createdAt = new Date(file.lastModified)
      }
    }
    
    // Écrire le fichier après avoir récupéré la date
    await writeFile(filepath, buffer)
    
    // Si toujours pas de date valide, utiliser la date de création du fichier système (dernier recours)
    if (!createdAt || isNaN(createdAt.getTime())) {
      const fileStats = await stat(filepath)
      // birthtime = date de création du fichier (disponible sur Windows et certains systèmes Unix)
      // mtime = date de modification (fallback si birthtime n'est pas disponible)
      createdAt = fileStats.birthtime || fileStats.mtime
    }

    const relativePath = `/uploads/${filename}`

    await createLog(session.id, "FICHIER_UPLOADE", {
      filename,
      size: file.size,
      type: file.type,
    }, request)

    return NextResponse.json({ 
      path: relativePath, 
      filename,
      createdAt: createdAt.toISOString()
    })
  } catch (error) {
    console.error("Error uploading file:", error)
    return NextResponse.json(
      { error: "Erreur lors de l'upload" },
      { status: 500 }
    )
  }
}

