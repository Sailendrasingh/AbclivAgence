import { NextRequest, NextResponse } from "next/server"
import { readdir, stat, mkdir, unlink, readFile, writeFile } from "fs/promises"
import { createWriteStream } from "fs"
import { join } from "path"
import { existsSync } from "fs"
import { getSession } from "@/lib/session"
import { createLog } from "@/lib/logs"
import archiver from "archiver"
import { encryptFile } from "@/lib/encryption"
import { saveChecksum, verifyFileIntegrity, cleanupOrphanedChecksums } from "@/lib/backup-integrity"
import { alertSensitiveAction } from "@/lib/alerts"
import { isPostgresUrl, pgDumpToFile } from "@/lib/db-backup"

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

        // Vérifier l'intégrité de la sauvegarde (si un checksum existe)
        const integrityCheck = await verifyFileIntegrity(filePath)
        const integrityStatus = integrityCheck.storedChecksum
          ? (integrityCheck.valid ? "valid" : "corrupted")
          : "unknown"

        return {
          filename: file,
          date: date.toISOString(),
          size: stats.size,
          sizeFormatted: formatFileSize(stats.size),
          integrity: integrityStatus,
          integrityError: integrityCheck.valid ? undefined : integrityCheck.error,
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

  // Vérifier que le 2FA est activé pour les Super Admin
  const { requireTwoFactorForSuperAdmin } = await import("@/lib/require-two-factor")
  const twoFactorError = await requireTwoFactorForSuperAdmin(request)
  if (twoFactorError) {
    return twoFactorError
  }

  try {
    const backupsDir = join(process.cwd(), "backups")
    const dbUrl = process.env.DATABASE_URL || ""

    if (!isPostgresUrl(dbUrl)) {
      return NextResponse.json(
        { error: "La sauvegarde nécessite PostgreSQL (DATABASE_URL postgresql://...)" },
        { status: 400 }
      )
    }

    // Créer le dossier backups s'il n'existe pas
    if (!existsSync(backupsDir)) {
      await mkdir(backupsDir, { recursive: true })
    }

    // Générer le nom de fichier avec timestamp
    const timestamp = new Date().toISOString().replace(/[:.]/g, "-")
    const backupZipPath = join(backupsDir, `backup-${timestamp}.zip`)
    const backupPath = join(backupsDir, `backup-${timestamp}.encrypted.zip`)
    const uploadsDir = join(process.cwd(), "uploads")
    const dumpPath = join(backupsDir, `dump-${timestamp}.sql`)

    try {
      // Dump PostgreSQL via pg_dump
      pgDumpToFile(dbUrl, dumpPath)
      if (!existsSync(dumpPath)) {
        throw new Error("Le dump PostgreSQL n'a pas été créé")
      }

      // Créer l'archive ZIP (temporaire, non chiffrée)
      const output = createWriteStream(backupZipPath)
      const archive = archiver("zip", {
        zlib: { level: 9 }
      })

      const archivePromise = new Promise<void>((resolve, reject) => {
        output.on("close", () => {
          console.log(`Archive créée: ${archive.pointer()} bytes`)
          resolve()
        })
        output.on("error", reject)
        archive.on("error", (err: Error) => reject(err))
      })

      archive.pipe(output)
      archive.file(dumpPath, { name: "dump.sql" })
      if (existsSync(uploadsDir)) {
        archive.directory(uploadsDir, "uploads")
      }
      await archive.finalize()
      await archivePromise
    } finally {
      if (existsSync(dumpPath)) {
        await unlink(dumpPath).catch(() => {})
      }
    }

    // Chiffrer l'archive ZIP
    try {
      await encryptFile(backupZipPath, backupPath)
      // Supprimer le fichier ZIP non chiffré
      await unlink(backupZipPath)
    } catch (encryptError: any) {
      // En cas d'erreur de chiffrement, supprimer les deux fichiers
      try {
        await unlink(backupZipPath)
      } catch { }
      try {
        await unlink(backupPath)
      } catch { }
      throw new Error(`Erreur lors du chiffrement de la sauvegarde: ${encryptError.message}`)
    }

    // Calculer et sauvegarder le checksum SHA-256 de la sauvegarde chiffrée
    let checksum: string | undefined
    try {
      checksum = await saveChecksum(backupPath)
      console.log(`[BACKUP] Checksum SHA-256 sauvegardé pour ${backupPath}`)
    } catch (checksumError: any) {
      console.error(`[BACKUP] Erreur lors du calcul du checksum:`, checksumError)
      // Ne pas faire échouer la sauvegarde si le checksum échoue, mais logger l'erreur
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
            // Supprimer aussi le fichier de checksum associé s'il existe
            const checksumPath = `${filePath}.sha256`
            if (existsSync(checksumPath)) {
              try {
                await unlink(checksumPath)
              } catch { }
            }
            deletedCount++
          } catch (unlinkError) {
            // Ignorer les erreurs de suppression
            console.warn(`Impossible de supprimer ${file}:`, unlinkError)
          }
        }
      }
    }

    // Nettoyer les checksums orphelins
    try {
      const orphanedChecksums = await cleanupOrphanedChecksums(backupsDir)
      if (orphanedChecksums > 0) {
        console.log(`[BACKUP] ${orphanedChecksums} checksum(s) orphelin(s) nettoyé(s)`)
      }
    } catch (error) {
      console.warn("[BACKUP] Erreur lors du nettoyage des checksums orphelins:", error)
    }

    await createLog(session.id, "SAUVEGARDE_CREEE", {
      filename: `backup-${timestamp}.encrypted.zip`,
      deletedOldBackups: deletedCount,
    }, request)

    const backupStats = await stat(backupPath)

    // Vérifier l'intégrité de la sauvegarde créée
    const integrityCheck = await verifyFileIntegrity(backupPath)

    return NextResponse.json(
      {
        filename: `backup-${timestamp}.encrypted.zip`,
        date: new Date().toISOString(),
        size: backupStats.size,
        sizeFormatted: formatFileSize(backupStats.size),
        deletedOldBackups: deletedCount,
        checksum: integrityCheck.calculatedChecksum,
        integrity: integrityCheck.valid ? "valid" : "unknown",
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

  // Vérifier que le 2FA est activé pour les Super Admin
  const { requireTwoFactorForSuperAdmin } = await import("@/lib/require-two-factor")
  const twoFactorError = await requireTwoFactorForSuperAdmin(request)
  if (twoFactorError) {
    return twoFactorError
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

        // Supprimer aussi le fichier de checksum associé s'il existe
        const checksumPath = `${filePath}.sha256`
        if (existsSync(checksumPath)) {
          try {
            await unlink(checksumPath)
          } catch { }
        }

        deletedCount++
      } catch (error) {
        console.error(`Erreur lors de la suppression de ${file}:`, error)
      }
    }

    await createLog(session.id, "SAUVEGARDES_PURGEES", {
      deletedCount,
    }, request)

    // Alerter sur l'action sensible
    const { getClientIP } = await import("@/lib/get-client-ip")
    const ipAddress = getClientIP(request)
    await alertSensitiveAction("SAUVEGARDES_PURGEES", session.id, {
      deletedCount,
    }, ipAddress)

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

