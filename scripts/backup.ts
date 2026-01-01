import { readdir, stat, unlink, mkdir } from "fs/promises"
import { createWriteStream } from "fs"
import { join } from "path"
import { existsSync } from "fs"
import archiver from "archiver"

async function backup() {
  const backupsDir = join(process.cwd(), "backups")
  const dbPath = join(process.cwd(), "prisma", "dev.db")
  const uploadsDir = join(process.cwd(), "uploads")
  const timestamp = new Date().toISOString().replace(/[:.]/g, "-")
  const backupPath = join(backupsDir, `backup-${timestamp}.zip`)

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

    // Créer l'archive ZIP
    const output = createWriteStream(backupPath)
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
        console.log(`Sauvegarde créée: ${backupPath}`)
        console.log(`Taille de l'archive: ${archive.pointer()} bytes`)
        resolve(undefined)
      })
      output.on("error", reject)
    })

    // Nettoyer les sauvegardes de plus de 10 jours
    const files = await readdir(backupsDir)
    const now = Date.now()
    const tenDaysAgo = now - 10 * 24 * 60 * 60 * 1000

    for (const file of files) {
      if (file.startsWith("backup-") && (file.endsWith(".zip") || file.endsWith(".db"))) {
        const filePath = join(backupsDir, file)
        const stats = await stat(filePath)
        
        if (stats.mtimeMs < tenDaysAgo) {
          await unlink(filePath)
          console.log(`Sauvegarde supprimée: ${file}`)
        }
      }
    }
  } catch (error) {
    console.error("Erreur lors de la sauvegarde:", error)
    process.exit(1)
  }
}

backup()

