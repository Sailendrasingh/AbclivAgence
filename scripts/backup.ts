import { readdir, stat, unlink, mkdir } from "fs/promises"
import { createWriteStream } from "fs"
import { join } from "path"
import { existsSync } from "fs"
import archiver from "archiver"
import { encryptFile } from "../lib/encryption"
import { saveChecksum, cleanupOrphanedChecksums } from "../lib/backup-integrity"
import { isPostgresUrl, pgDumpToFile } from "../lib/db-backup"

async function backup() {
  const backupsDir = join(process.cwd(), "backups")
  const dbUrl = process.env.DATABASE_URL || ""
  const uploadsDir = join(process.cwd(), "uploads")
  const timestamp = new Date().toISOString().replace(/[:.]/g, "-")
  const backupZipPath = join(backupsDir, `backup-${timestamp}.zip`)
  const backupPath = join(backupsDir, `backup-${timestamp}.encrypted.zip`)
  const dumpPath = join(backupsDir, `dump-${timestamp}.sql`)

  if (!isPostgresUrl(dbUrl)) {
    console.error("DATABASE_URL doit être une URL PostgreSQL (postgresql://...)")
    process.exit(1)
  }

  try {
    if (!existsSync(backupsDir)) {
      await mkdir(backupsDir, { recursive: true })
    }

    console.log("Dump PostgreSQL via pg_dump...")
    pgDumpToFile(dbUrl, dumpPath)
    if (!existsSync(dumpPath)) {
      throw new Error("Le dump n'a pas été créé")
    }

    const output = createWriteStream(backupZipPath)
    const archive = archiver("zip", { zlib: { level: 9 } })
    archive.on("error", (err) => { throw err })
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

    await unlink(dumpPath)

    console.log("Chiffrement de la sauvegarde...")
    await encryptFile(backupZipPath, backupPath)
    console.log(`Sauvegarde chiffrée créée: ${backupPath}`)
    await unlink(backupZipPath)

    const backupStats = await stat(backupPath)
    console.log(`Taille: ${backupStats.size} bytes`)

    try {
      const checksum = await saveChecksum(backupPath)
      console.log(`Checksum: ${checksum}`)
    } catch (checksumError: unknown) {
      console.error("Erreur checksum:", checksumError)
    }

    const files = await readdir(backupsDir)
    const now = Date.now()
    const tenDaysAgo = now - 10 * 24 * 60 * 60 * 1000

    for (const file of files) {
      if (file.startsWith("backup-") && (file.endsWith(".encrypted.zip") || file.endsWith(".zip"))) {
        const filePath = join(backupsDir, file)
        const stats = await stat(filePath)
        if (stats.mtimeMs < tenDaysAgo) {
          await unlink(filePath)
          const checksumPath = `${filePath}.sha256`
          if (existsSync(checksumPath)) {
            try { await unlink(checksumPath) } catch { }
          }
          console.log(`Sauvegarde supprimée: ${file}`)
        }
      }
    }

    try {
      const orphanedChecksums = await cleanupOrphanedChecksums(backupsDir)
      if (orphanedChecksums > 0) console.log(`${orphanedChecksums} checksum(s) orphelin(s) nettoyé(s)`)
    } catch (error) {
      console.warn("Nettoyage checksums:", error)
    }

    console.log("Nettoyage des anciens logs...")
    try {
      const { cleanupOldLogs } = await import("../lib/logs")
      await cleanupOldLogs()
      console.log("Nettoyage terminé.")
    } catch (logError) {
      console.warn("Logs:", logError)
    }
  } catch (error) {
    if (existsSync(dumpPath)) unlink(dumpPath).catch(() => {})
    console.error("Erreur lors de la sauvegarde:", error)
    process.exit(1)
  }
}

backup()
