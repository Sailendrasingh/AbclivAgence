import { readdir, stat, unlink, mkdir } from "fs/promises"
import { createWriteStream } from "fs"
import { join } from "path"
import { existsSync } from "fs"
import archiver from "archiver"
import { encryptFile } from "../lib/encryption"
import { saveChecksum, cleanupOrphanedChecksums } from "../lib/backup-integrity"

async function backup() {
  const backupsDir = join(process.cwd(), "backups")
  const dbPath = join(process.cwd(), "prisma", "dev.db")
  const uploadsDir = join(process.cwd(), "uploads")
  const timestamp = new Date().toISOString().replace(/[:.]/g, "-")
  const backupZipPath = join(backupsDir, `backup-${timestamp}.zip`)
  const backupPath = join(backupsDir, `backup-${timestamp}.encrypted.zip`)

  try {
    // Créer le dossier backups s'il n'existe pas
    if (!existsSync(backupsDir)) {
      await mkdir(backupsDir, { recursive: true })
    }

    // Vérifier que la base de données existe
    if (!existsSync(dbPath)) {
      console.error("Base de données non trouvée:", dbPath)
      process.exit(1)
    }

    // Créer l'archive ZIP (temporaire, non chiffrée)
    const output = createWriteStream(backupZipPath)
    const archive = archiver("zip", {
      zlib: { level: 9 } // Compression maximale
    })

    // Gérer les erreurs de l'archive
    archive.on("error", (err) => {
      throw err
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
    await new Promise((resolve, reject) => {
      output.on("close", () => {
        console.log(`Archive ZIP créée: ${archive.pointer()} bytes`)
        resolve(undefined)
      })
      output.on("error", reject)
    })

    // Chiffrer l'archive ZIP
    console.log("Chiffrement de la sauvegarde...")
    await encryptFile(backupZipPath, backupPath)
    console.log(`Sauvegarde chiffrée créée: ${backupPath}`)
    
    // Supprimer le fichier ZIP non chiffré
    await unlink(backupZipPath)
    
    const { stat } = await import("fs/promises")
    const backupStats = await stat(backupPath)
    console.log(`Taille de la sauvegarde chiffrée: ${backupStats.size} bytes`)

    // Calculer et sauvegarder le checksum SHA-256
    console.log("Calcul du checksum SHA-256...")
    try {
      const checksum = await saveChecksum(backupPath)
      console.log(`Checksum SHA-256: ${checksum}`)
      console.log(`Checksum sauvegardé dans: ${backupPath}.sha256`)
    } catch (checksumError: any) {
      console.error(`Erreur lors du calcul du checksum:`, checksumError)
      // Ne pas faire échouer la sauvegarde si le checksum échoue
    }

    // Nettoyer les sauvegardes de plus de 10 jours
    const files = await readdir(backupsDir)
    const now = Date.now()
    const tenDaysAgo = now - 10 * 24 * 60 * 60 * 1000

    for (const file of files) {
      if (file.startsWith("backup-") && (
        file.endsWith(".encrypted.zip") || 
        file.endsWith(".zip") || 
        file.endsWith(".db")
      )) {
        const filePath = join(backupsDir, file)
        const stats = await stat(filePath)
        
        if (stats.mtimeMs < tenDaysAgo) {
          await unlink(filePath)
          // Supprimer aussi le fichier de checksum associé s'il existe
          const checksumPath = `${filePath}.sha256`
          if (existsSync(checksumPath)) {
            try {
              await unlink(checksumPath)
            } catch {}
          }
          console.log(`Sauvegarde supprimée: ${file}`)
        }
      }
    }

    // Nettoyer les checksums orphelins
    try {
      const orphanedChecksums = await cleanupOrphanedChecksums(backupsDir)
      if (orphanedChecksums > 0) {
        console.log(`${orphanedChecksums} checksum(s) orphelin(s) nettoyé(s)`)
      }
    } catch (error) {
      console.warn("Erreur lors du nettoyage des checksums orphelins:", error)
    }
  } catch (error) {
    console.error("Erreur lors de la sauvegarde:", error)
    process.exit(1)
  }
}

backup()

