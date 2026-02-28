import { NextRequest, NextResponse } from "next/server"
import { readFile, mkdir, rm, unlink, readdir } from "fs/promises"
import { createWriteStream } from "fs"
import { join, dirname, resolve } from "path"
import { existsSync } from "fs"
import { getSession } from "@/lib/session"
import { createLog } from "@/lib/logs"
import yauzl from "yauzl"
import { decryptFile, isEncryptedFile } from "@/lib/encryption"
import { verifyFileIntegrity, saveChecksum } from "@/lib/backup-integrity"
import { alertSensitiveAction } from "@/lib/alerts"
import { prisma } from "@/lib/prisma"
import { isPostgresUrl, pgDumpToFile, pgRestoreFromFile } from "@/lib/db-backup"
import archiver from "archiver"

export async function POST(
  request: NextRequest,
  context: { params: Promise<{ filename: string }> }
) {
  const { filename } = await context.params
  const session = await getSession()
  if (!session) {
    return NextResponse.json({ error: "Non autorisé" }, { status: 401 })
  }

  if (session.role !== "Super Admin") {
    return NextResponse.json({ error: "Accès refusé" }, { status: 403 })
  }

  const { requireTwoFactorForSuperAdmin } = await import("@/lib/require-two-factor")
  const twoFactorError = await requireTwoFactorForSuperAdmin(request)
  if (twoFactorError) {
    return twoFactorError
  }

  try {
    const backupsDir = resolve(process.cwd(), "backups")
    if (filename.includes("..") || filename.includes("/") || filename.includes("\\")) {
      return NextResponse.json({ error: "Nom de fichier invalide" }, { status: 400 })
    }

    const dbUrl = process.env.DATABASE_URL || ""
    if (!isPostgresUrl(dbUrl)) {
      return NextResponse.json(
        { error: "La restauration nécessite PostgreSQL (DATABASE_URL postgresql://...)" },
        { status: 400 }
      )
    }

    const backupPath = resolve(backupsDir, filename)
    if (!backupPath.startsWith(backupsDir)) {
      return NextResponse.json({ error: "Chemin de sauvegarde invalide" }, { status: 400 })
    }
    if (!existsSync(backupPath)) {
      return NextResponse.json({ error: "Sauvegarde non trouvée" }, { status: 404 })
    }

    const isEncryptedZip = filename.endsWith(".encrypted.zip")
    const isZip = filename.endsWith(".zip")

    if (!filename.startsWith("backup-") || !isZip) {
      return NextResponse.json(
        { error: "Fichier de sauvegarde invalide (attendu: backup-*.zip)" },
        { status: 400 }
      )
    }

    const integrityCheck = await verifyFileIntegrity(backupPath)
    if (integrityCheck.storedChecksum && !integrityCheck.valid) {
      return NextResponse.json(
        {
          error: "La sauvegarde est corrompue ou a été modifiée",
          details: integrityCheck.error,
        },
        { status: 400 }
      )
    }

    let fileToRestore = backupPath
    if (isEncryptedZip) {
      const tempZipPath = join(backupsDir, `temp-restore-${Date.now()}.zip`)
      await decryptFile(backupPath, tempZipPath)
      fileToRestore = tempZipPath
    } else if (isZip) {
      const fileData = await readFile(backupPath)
      if (isEncryptedFile(fileData)) {
        const tempZipPath = join(backupsDir, `temp-restore-${Date.now()}.zip`)
        await decryptFile(backupPath, tempZipPath)
        fileToRestore = tempZipPath
      }
    }

    await prisma.$disconnect()

    const timestamp = new Date().toISOString().replace(/[:.]/g, "-")
    const currentBackupPath = join(backupsDir, `backup-before-restore-${timestamp}.zip`)
    const dumpPath = join(backupsDir, `before-restore-${timestamp}.sql`)

    try {
      pgDumpToFile(dbUrl, dumpPath)
      const uploadsDir = join(process.cwd(), "uploads")
      const output = createWriteStream(currentBackupPath)
      const archive = archiver("zip", { zlib: { level: 9 } })
      archive.pipe(output)
      archive.file(dumpPath, { name: "dump.sql" })
      if (existsSync(uploadsDir)) {
        archive.directory(uploadsDir, "uploads")
      }
      await archive.finalize()
      await new Promise<void>((resolve, reject) => {
        output.on("close", () => resolve())
        output.on("error", reject)
      })
      await saveChecksum(currentBackupPath)
    } finally {
      if (existsSync(dumpPath)) await unlink(dumpPath).catch(() => {})
    }

    const extractDir = join(backupsDir, `extract-restore-${Date.now()}`)
    const uploadsDir = join(process.cwd(), "uploads")
    let dumpSqlPath: string | null = null

    if (existsSync(uploadsDir)) {
      const entries = await readdir(uploadsDir, { withFileTypes: true })
      for (const entry of entries) {
        await rm(join(uploadsDir, entry.name), { recursive: true, force: true })
      }
    }
    await mkdir(uploadsDir, { recursive: true })

    try {
      await mkdir(extractDir, { recursive: true })

      await new Promise<void>((resolve, reject) => {
        yauzl.open(fileToRestore, { lazyEntries: true }, (err: Error | null, zipfile: any) => {
          if (err) {
            reject(err)
            return
          }
          if (!zipfile) {
            reject(new Error("Impossible d'ouvrir l'archive"))
            return
          }
          zipfile.readEntry()
          zipfile.on("entry", (entry: any) => {
            if (entry.fileName.includes("..") || entry.fileName.startsWith("/")) {
              zipfile.readEntry()
              return
            }
            const normalizedName = entry.fileName.replace(/\\/g, "/").replace(/^\.\/+/, "").trim()
            const nameLower = normalizedName.toLowerCase()

            if (/\/$/.test(entry.fileName)) {
              mkdir(join(extractDir, entry.fileName), { recursive: true })
                .then(() => zipfile.readEntry())
                .catch(() => zipfile.readEntry())
              return
            }

            zipfile.openReadStream(entry, (streamErr: Error | null, readStream: any) => {
              if (streamErr || !readStream) {
                zipfile.readEntry()
                return
              }
              const destPath = nameLower === "dump.sql"
                ? join(extractDir, "dump.sql")
                : normalizedName.startsWith("uploads/")
                  ? join(process.cwd(), normalizedName)
                  : join(extractDir, entry.fileName)

              if (nameLower === "dump.sql") {
                dumpSqlPath = destPath
              }

              const destDir = dirname(destPath)
              mkdir(destDir, { recursive: true })
                .then(() => {
                  const ws = createWriteStream(destPath)
                  readStream.pipe(ws)
                  ws.on("close", () => zipfile.readEntry())
                  ws.on("error", () => zipfile.readEntry())
                })
                .catch(() => zipfile.readEntry())
            })
          })
          zipfile.on("end", () => resolve())
          zipfile.on("error", reject)
        })
      })

      if (!dumpSqlPath || !existsSync(dumpSqlPath)) {
        throw new Error("L'archive ne contient pas de dump.sql (sauvegarde PostgreSQL)")
      }

      pgRestoreFromFile(dbUrl, dumpSqlPath)
    } finally {
      if (fileToRestore !== backupPath && existsSync(fileToRestore)) {
        await unlink(fileToRestore).catch(() => {})
      }
      if (existsSync(extractDir)) {
        await rm(extractDir, { recursive: true, force: true }).catch(() => {})
      }
    }

    await prisma.$connect()

    await createLog(session.id, "SAUVEGARDE_RESTAUREE", {
      restoredFrom: filename,
      backupCreatedBefore: `backup-before-restore-${timestamp}.zip`,
    }, request)

    const { getClientIP } = await import("@/lib/get-client-ip")
    await alertSensitiveAction("SAUVEGARDE_RESTAUREE", session.id, {
      restoredFrom: filename,
      backupCreatedBefore: `backup-before-restore-${timestamp}.zip`,
    }, getClientIP(request))

    const restartScheduled = process.env.RESTART_AFTER_RESTORE === "true"
    if (restartScheduled) {
      setImmediate(() => setTimeout(() => process.exit(0), 2000))
    }

    return NextResponse.json({
      success: true,
      message: "Sauvegarde restaurée avec succès",
      backupCreatedBefore: `backup-before-restore-${timestamp}.zip`,
      restartHint: restartScheduled
        ? "L'application redémarre. Rechargez la page dans 10 secondes."
        : "Si les données ne se mettent pas à jour, redémarrez le conteneur Docker.",
      restartScheduled,
    })
  } catch (error) {
    const message = error instanceof Error ? error.message : String(error)
    console.error("Error restoring backup:", error)
    return NextResponse.json(
      { error: "Erreur lors de la restauration de la sauvegarde", details: message },
      { status: 500 }
    )
  }
}
