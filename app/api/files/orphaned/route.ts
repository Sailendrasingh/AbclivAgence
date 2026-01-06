import { NextRequest, NextResponse } from "next/server"
import { getSession } from "@/lib/session"
import { prisma } from "@/lib/prisma"
import { readdir, stat, unlink } from "fs/promises"
import { join } from "path"
import { createLog } from "@/lib/logs"
import { requireCSRF } from "@/lib/csrf-middleware"

/**
 * Scanne le dossier uploads pour trouver les fichiers orphelins (non référencés dans la base de données)
 */
export async function GET(request: NextRequest) {
  const session = await getSession()
  if (!session) {
    return NextResponse.json({ error: "Non autorisé" }, { status: 401 })
  }

  // Seuls les Super Admin peuvent scanner les fichiers orphelins
  if (session.role !== "Super Admin") {
    return NextResponse.json({ error: "Accès refusé" }, { status: 403 })
  }

  try {
    const uploadsDir = join(process.cwd(), "uploads")
    const orphanedFiles: Array<{ path: string; size: number; modified: Date }> = []

    // Récupérer tous les chemins de fichiers référencés dans la base de données
    const referencedPaths = new Set<string>()

    // 1. Photos de profil (User.photo)
    const users = await prisma.user.findMany({
      where: { photo: { not: null } },
      select: { photo: true },
    })
    users.forEach((user) => {
      if (user.photo) {
        referencedPaths.add(user.photo)
        // Ajouter aussi le chemin absolu
        referencedPaths.add(join(process.cwd(), user.photo))
      }
    })

    // 2. Photos d'agences (Agency.photo)
    const agencies = await prisma.agency.findMany({
      where: { photo: { not: null } },
      select: { photo: true },
    })
    agencies.forEach((agency) => {
      if (agency.photo) {
        referencedPaths.add(agency.photo)
        referencedPaths.add(join(process.cwd(), agency.photo))
      }
    })

    // 3. Photos dans PhotoGroup (JSON array)
    const photoGroups = await prisma.photoGroup.findMany({
      select: { photos: true },
    })
    photoGroups.forEach((group) => {
      try {
        const photos = JSON.parse(group.photos)
        if (Array.isArray(photos)) {
          photos.forEach((photo: string | { path?: string }) => {
            const path = typeof photo === "string" ? photo : photo.path
            if (path) {
              referencedPaths.add(path)
              referencedPaths.add(join(process.cwd(), path))
            }
          })
        }
      } catch {
        // Ignorer les erreurs de parsing JSON
      }
    })

    // 4. Photos dans Printer (chaîne séparée par des virgules ou JSON)
    const printers = await prisma.printer.findMany({
      where: {
        OR: [
          { photos: { not: null } },
          { files: { not: null } },
        ],
      },
      select: { photos: true, files: true },
    })
    printers.forEach((printer) => {
      // Photos
      if (printer.photos) {
        try {
          const photos = JSON.parse(printer.photos)
          if (Array.isArray(photos)) {
            photos.forEach((photo: string | { path?: string }) => {
              const path = typeof photo === "string" ? photo : photo.path
              if (path) {
                referencedPaths.add(path)
                referencedPaths.add(join(process.cwd(), path))
              }
            })
          }
        } catch {
          // Si ce n'est pas du JSON, traiter comme une chaîne séparée par des virgules
          printer.photos.split(",").forEach((path) => {
            const trimmed = path.trim()
            if (trimmed) {
              referencedPaths.add(trimmed)
              referencedPaths.add(join(process.cwd(), trimmed))
            }
          })
        }
      }
      // Files
      if (printer.files) {
        try {
          const files = JSON.parse(printer.files)
          if (Array.isArray(files)) {
            files.forEach((file: string | { path?: string }) => {
              const path = typeof file === "string" ? file : file.path
              if (path) {
                referencedPaths.add(path)
                referencedPaths.add(join(process.cwd(), path))
              }
            })
          }
        } catch {
          printer.files.split(",").forEach((path) => {
            const trimmed = path.trim()
            if (trimmed) {
              referencedPaths.add(trimmed)
              referencedPaths.add(join(process.cwd(), trimmed))
            }
          })
        }
      }
    })

    // 5. Photos dans Task (JSON array)
    const tasks = await prisma.task.findMany({
      where: { photos: { not: null } },
      select: { photos: true },
    })
    tasks.forEach((task) => {
      if (task.photos) {
        try {
          const photos = JSON.parse(task.photos)
          if (Array.isArray(photos)) {
            photos.forEach((photo: string) => {
              if (photo && typeof photo === "string") {
                referencedPaths.add(photo)
                referencedPaths.add(join(process.cwd(), photo))
              }
            })
          }
        } catch {
          // Ignorer les erreurs de parsing JSON
        }
      }
    })

    // Fonction récursive pour scanner un dossier
    async function scanDirectory(dir: string, relativePath: string = "") {
      try {
        const entries = await readdir(dir, { withFileTypes: true })

        for (const entry of entries) {
          const fullPath = join(dir, entry.name)
          const relPath = relativePath ? `${relativePath}/${entry.name}` : entry.name

          // Ignorer le dossier de quarantaine
          if (entry.name === "quarantine" || relPath.includes("quarantine")) {
            continue
          }

          if (entry.isDirectory()) {
            await scanDirectory(fullPath, relPath)
          } else if (entry.isFile()) {
            // Vérifier si le fichier est une image (extension)
            const ext = entry.name.toLowerCase().split(".").pop()
            if (["jpg", "jpeg", "png", "gif", "webp"].includes(ext || "")) {
              const filePath = `/uploads/${relPath}`
              const absolutePath = join(process.cwd(), filePath)

              // Vérifier si le fichier n'est pas référencé
              if (!referencedPaths.has(filePath) && !referencedPaths.has(absolutePath)) {
                try {
                  const stats = await stat(fullPath)
                  orphanedFiles.push({
                    path: filePath,
                    size: stats.size,
                    modified: stats.mtime,
                  })
                } catch {
                  // Ignorer les erreurs de stat
                }
              }
            }
          }
        }
      } catch (error) {
        // Ignorer les erreurs de lecture de dossier
        console.warn(`Erreur lors du scan de ${dir}:`, error)
      }
    }

    // Scanner le dossier uploads (sauf quarantine)
    await scanDirectory(uploadsDir)

    // Trier par date de modification (plus ancien en premier)
    orphanedFiles.sort((a, b) => a.modified.getTime() - b.modified.getTime())

    return NextResponse.json({
      orphanedFiles: orphanedFiles.map((file) => ({
        path: file.path,
        size: file.size,
        sizeFormatted: formatFileSize(file.size),
        modified: file.modified.toISOString(),
      })),
      count: orphanedFiles.length,
    })
  } catch (error: any) {
    console.error("Error scanning orphaned files:", error)
    return NextResponse.json(
      { error: "Erreur lors du scan des fichiers orphelins" },
      { status: 500 }
    )
  }
}

/**
 * Supprime les fichiers orphelins spécifiés
 */
export async function DELETE(request: NextRequest) {
  // Vérifier le token CSRF
  const csrfError = await requireCSRF(request)
  if (csrfError) {
    return csrfError
  }

  const session = await getSession()
  if (!session) {
    return NextResponse.json({ error: "Non autorisé" }, { status: 401 })
  }

  // Seuls les Super Admin peuvent supprimer les fichiers orphelins
  if (session.role !== "Super Admin") {
    return NextResponse.json({ error: "Accès refusé" }, { status: 403 })
  }

  try {
    const body = await request.json()
    const { paths } = body

    if (!Array.isArray(paths)) {
      return NextResponse.json(
        { error: "paths doit être un tableau" },
        { status: 400 }
      )
    }

    const deletedFiles: string[] = []
    const errors: Array<{ path: string; error: string }> = []

    for (const filePath of paths) {
      try {
        // Vérifier que le chemin est bien dans uploads (sécurité)
        if (!filePath.startsWith("/uploads/") && !filePath.startsWith("uploads/")) {
          errors.push({ path: filePath, error: "Chemin invalide" })
          continue
        }

        const absolutePath = join(process.cwd(), filePath.startsWith("/") ? filePath : `/${filePath}`)
        const uploadsDir = join(process.cwd(), "uploads")
        
        // Vérifier que le fichier est bien dans le dossier uploads (protection path traversal)
        if (!absolutePath.startsWith(uploadsDir)) {
          errors.push({ path: filePath, error: "Chemin en dehors de uploads" })
          continue
        }

        await unlink(absolutePath)
        deletedFiles.push(filePath)
      } catch (error: any) {
        errors.push({ path: filePath, error: error.message || "Erreur inconnue" })
      }
    }

    // Logger l'action
    await createLog(session.id, "FICHIERS_ORPHELINS_SUPPRIMES", {
      deletedCount: deletedFiles.length,
      deletedFiles,
      errors: errors.length > 0 ? errors : undefined,
    }, request)

    return NextResponse.json({
      success: true,
      deletedCount: deletedFiles.length,
      deletedFiles,
      errors: errors.length > 0 ? errors : undefined,
    })
  } catch (error: any) {
    console.error("Error deleting orphaned files:", error)
    return NextResponse.json(
      { error: "Erreur lors de la suppression des fichiers" },
      { status: 500 }
    )
  }
}

/**
 * Formate la taille d'un fichier en format lisible
 */
function formatFileSize(bytes: number): string {
  if (bytes === 0) return "0 B"
  const k = 1024
  const sizes = ["B", "KB", "MB", "GB"]
  const i = Math.floor(Math.log(bytes) / Math.log(k))
  return `${(bytes / Math.pow(k, i)).toFixed(2)} ${sizes[i]}`
}

