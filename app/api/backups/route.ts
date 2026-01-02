import { NextRequest, NextResponse } from "next/server"
import { readdir, stat, mkdir, unlink, readFile, writeFile } from "fs/promises"
import { createWriteStream } from "fs"
import { join } from "path"
import { existsSync } from "fs"
import { getSession } from "@/lib/session"
import { createLog } from "@/lib/logs"
import archiver from "archiver"
import { encryptFile } from "@/lib/encryption"

// GET : Lister toutes les sauvegardes
export async function GET(request: NextRequest) {
  const session = await getSession()
  if (!session) {
    return NextResponse.json({ error: "Non autorisé" }, { status: 401 })
  }

  // Vérifier que l'utilisateur est Super Admin
  if (session.role !== "Super Admin") {
    return NextResponse.json({ error: "Accès refusé" }, { status: 403 })
  }

  try {
    const backupsDir = join(process.cwd(), "backups")

    // Créer le dossier s'il n'existe pas
    if (!existsSync(backupsDir)) {
      await mkdir(backupsDir, { recursive: true })
      return NextResponse.json([])
    }

    // Lister tous les fichiers de sauvegarde (ZIP chiffrés, ZIP non chiffrés pour rétrocompatibilité, .db pour rétrocompatibilité)
    const files = await readdir(backupsDir)
    const backupFiles = files.filter((file) => 
      file.startsWith("backup-") && (
        file.endsWith(".encrypted.zip") || 
        file.endsWith(".zip") || 
        file.endsWith(".db")
      )
    )
    
    if (backupFiles.length === 0) {
      return NextResponse.json([])
    }

    const backups = await Promise.all(
      backupFiles.map(async (file) => {
        const filePath = join(backupsDir, file)
        const stats = await stat(filePath)

        // Utiliser la date de création du fichier système (plus fiable)
        // birthtime = date de création (Windows), mtime = date de modification (fallback)
        const date = stats.birthtime && stats.birthtime.getTime() > 0 
          ? stats.birthtime 
          : stats.mtime

        return {
          filename: file,
          date: date.toISOString(),
          size: stats.size,
          sizeFormatted: formatFileSize(stats.size),
        }
      })
    )

    // Trier par date décroissante (plus récentes en premier)
    backups.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())

    return NextResponse.json(backups)
  } catch (error) {
    console.error("Error listing backups:", error)
    return NextResponse.json(
      { error: "Erreur lors de la récupération des sauvegardes" },
      { status: 500 }
    )
  }
}

// POST : Créer une sauvegarde manuelle
export async function POST(request: NextRequest) {
  const session = await getSession()
  if (!session) {
    return NextResponse.json({ error: "Non autorisé" }, { status: 401 })
  }

  // Vérifier que l'utilisateur est Super Admin
  if (session.role !== "Super Admin") {
    return NextResponse.json({ error: "Accès refusé" }, { status: 403 })
  }

  try {
    const backupsDir = join(process.cwd(), "backups")
    const dbPath = join(process.cwd(), "prisma", "dev.db")

    // Créer le dossier backups s'il n'existe pas
    if (!existsSync(backupsDir)) {
      await mkdir(backupsDir, { recursive: true })
    }

    // Vérifier que la base de données existe
    if (!existsSync(dbPath)) {
      return NextResponse.json(
        { error: "Base de données non trouvée" },
        { status: 404 }
      )
    }

    // Générer le nom de fichier avec timestamp
    const timestamp = new Date().toISOString().replace(/[:.]/g, "-")
    const backupZipPath = join(backupsDir, `backup-${timestamp}.zip`)
    const backupPath = join(backupsDir, `backup-${timestamp}.encrypted.zip`)
    const uploadsDir = join(process.cwd(), "uploads")

    // Créer l'archive ZIP (temporaire, non chiffrée)
    const output = createWriteStream(backupZipPath)
    const archive = archiver("zip", {
      zlib: { level: 9 } // Compression maximale
    })

    // Attendre que l'écriture soit terminée
    const archivePromise = new Promise<void>((resolve, reject) => {
      output.on("close", () => {
        console.log(`Archive créée: ${archive.pointer()} bytes`)
        resolve()
      })
      output.on("error", (err) => {
        console.error("Erreur lors de l'écriture de l'archive:", err)
        reject(err)
      })
      
      // Gérer les erreurs de l'archive
      archive.on("error", (err: Error) => {
        console.error("Erreur lors de la création de l'archive:", err)
        reject(err)
      })
    })

    // Pipe l'archive vers le fichier
    archive.pipe(output)

    // Ajouter la base de données à l'archive
    archive.file(dbPath, { name: "dev.db" })

    // Ajouter le dossier uploads s'il existe
    if (existsSync(uploadsDir)) {
      archive.directory(uploadsDir, "uploads")
    }

    // Finaliser l'archive
    await archive.finalize()

    // Attendre que l'écriture soit terminée
    await archivePromise

    // Chiffrer l'archive ZIP
    try {
      await encryptFile(backupZipPath, backupPath)
      // Supprimer le fichier ZIP non chiffré
      await unlink(backupZipPath)
    } catch (encryptError: any) {
      // En cas d'erreur de chiffrement, supprimer les deux fichiers
      try {
        await unlink(backupZipPath)
      } catch {}
      try {
        await unlink(backupPath)
      } catch {}
      throw new Error(`Erreur lors du chiffrement de la sauvegarde: ${encryptError.message}`)
    }

    // Nettoyer les sauvegardes de plus de 10 jours
    const files = await readdir(backupsDir)
    const now = Date.now()
    const tenDaysAgo = now - 10 * 24 * 60 * 60 * 1000

    let deletedCount = 0
    for (const file of files) {
      if (file.startsWith("backup-") && (
        file.endsWith(".encrypted.zip") || 
        file.endsWith(".zip") || 
        file.endsWith(".db")
      )) {
        const filePath = join(backupsDir, file)
        const stats = await stat(filePath)

        if (stats.mtimeMs < tenDaysAgo) {
          try {
            await unlink(filePath)
            deletedCount++
          } catch (unlinkError) {
            // Ignorer les erreurs de suppression
            console.warn(`Impossible de supprimer ${file}:`, unlinkError)
          }
        }
      }
    }

    await createLog(session.id, "SAUVEGARDE_CREEE", {
      filename: `backup-${timestamp}.encrypted.zip`,
      deletedOldBackups: deletedCount,
    }, request)

    const backupStats = await stat(backupPath)

    return NextResponse.json(
      {
        filename: `backup-${timestamp}.encrypted.zip`,
        date: new Date().toISOString(),
        size: backupStats.size,
        sizeFormatted: formatFileSize(backupStats.size),
        deletedOldBackups: deletedCount,
      },
      { status: 201 }
    )
  } catch (error: any) {
    console.error("Error creating backup:", error)
    return NextResponse.json(
      { 
        error: "Erreur lors de la création de la sauvegarde",
        details: error?.message || String(error)
      },
      { status: 500 }
    )
  }
}

// DELETE : Purger toutes les sauvegardes
export async function DELETE(request: NextRequest) {
  const session = await getSession()
  if (!session) {
    return NextResponse.json({ error: "Non autorisé" }, { status: 401 })
  }

  // Seul le Super Admin peut purger toutes les sauvegardes
  if (session.role !== "Super Admin") {
    return NextResponse.json({ error: "Accès refusé" }, { status: 403 })
  }

  try {
    const backupsDir = join(process.cwd(), "backups")

    if (!existsSync(backupsDir)) {
      return NextResponse.json({
        message: "Aucune sauvegarde à purger",
        deletedCount: 0,
      })
    }

    // Lister tous les fichiers de sauvegarde
    const files = await readdir(backupsDir)
    const backupFiles = files.filter((file) =>
      file.startsWith("backup-") && (
        file.endsWith(".encrypted.zip") || 
        file.endsWith(".zip") || 
        file.endsWith(".db")
      )
    )

    if (backupFiles.length === 0) {
      return NextResponse.json({
        message: "Aucune sauvegarde à purger",
        deletedCount: 0,
      })
    }

    // Supprimer tous les fichiers de sauvegarde
    let deletedCount = 0
    for (const file of backupFiles) {
      try {
        const filePath = join(backupsDir, file)
        await unlink(filePath)
        deletedCount++
      } catch (error) {
        console.error(`Erreur lors de la suppression de ${file}:`, error)
      }
    }

    await createLog(session.id, "SAUVEGARDES_PURGEES", {
      deletedCount,
    }, request)

    return NextResponse.json({
      message: `${deletedCount} sauvegarde(s) supprimée(s)`,
      deletedCount,
    })
  } catch (error) {
    console.error("Error purging backups:", error)
    return NextResponse.json(
      { error: "Erreur lors de la purge des sauvegardes" },
      { status: 500 }
    )
  }
}

function formatFileSize(bytes: number): string {
  if (bytes === 0) return "0 Ko"
  const k = 1024
  const sizes = ["Ko", "Mo", "Go", "To"]
  
  // Trouver l'unité appropriée en testant chaque niveau
  // On commence à Ko (index 0), donc on divise une fois pour obtenir Ko
  let size = bytes / k  // Convertir en Ko
  let unitIndex = 0
  
  // Si c'est >= 1024 Ko, convertir en Mo, etc.
  while (size >= k && unitIndex < sizes.length - 1) {
    size = size / k
    unitIndex++
  }
  
  return Math.round(size * 100) / 100 + " " + sizes[unitIndex]
}

