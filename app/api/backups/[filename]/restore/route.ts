import { NextRequest, NextResponse } from "next/server"
import { readFile, writeFile, mkdir, rm } from "fs/promises"
import { createWriteStream } from "fs"
import { join, dirname } from "path"
import { existsSync } from "fs"
import { getSession } from "@/lib/session"
import { createLog } from "@/lib/logs"
import yauzl from "yauzl"

export async function POST(
  request: NextRequest,
  { params }: Promise<{ params: { filename: string } }>
) {
  const { filename } = await params
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
    const backupPath = join(backupsDir, filename)

    // Vérifier que le fichier de sauvegarde existe
    if (!existsSync(backupPath)) {
      return NextResponse.json(
        { error: "Sauvegarde non trouvée" },
        { status: 404 }
      )
    }

    // Vérifier que c'est bien un fichier .zip ou .db (rétrocompatibilité)
    const isZip = filename.endsWith(".zip")
    const isDb = filename.endsWith(".db")
    
    if (!filename.startsWith("backup-") || (!isZip && !isDb)) {
      return NextResponse.json(
        { error: "Fichier de sauvegarde invalide" },
        { status: 400 }
      )
    }

    // Créer une sauvegarde de la base actuelle avant restauration
    const timestamp = new Date().toISOString().replace(/[:.]/g, "-")
    const currentBackupPath = join(backupsDir, `backup-before-restore-${timestamp}.zip`)
    
    // Sauvegarder l'état actuel (base + uploads) avant restauration
    if (existsSync(dbPath)) {
      const uploadsDir = join(process.cwd(), "uploads")
      const archiverModule = await import("archiver")
      const archiver = archiverModule.default
      const output = createWriteStream(currentBackupPath)
      const archive = archiver("zip", { zlib: { level: 9 } })
      
      archive.on("error", (err) => {
        throw err
      })
      
      archive.pipe(output)
      archive.file(dbPath, { name: "dev.db" })
      
      if (existsSync(uploadsDir)) {
        archive.directory(uploadsDir, "uploads")
      }
      
      await archive.finalize()
      await new Promise<void>((resolve, reject) => {
        output.on("close", () => resolve())
        output.on("error", reject)
      })
    }

    // Restaurer la sauvegarde
    if (isZip) {
      // Extraire l'archive ZIP avec yauzl
      const uploadsDir = join(process.cwd(), "uploads")
      const prismaDir = join(process.cwd(), "prisma")
      
      // Supprimer l'ancien dossier uploads s'il existe
      if (existsSync(uploadsDir)) {
        await rm(uploadsDir, { recursive: true, force: true })
      }
      
      // Créer les dossiers nécessaires
      await mkdir(uploadsDir, { recursive: true })
      await mkdir(prismaDir, { recursive: true })
      
      // Extraire l'archive avec yauzl
      await new Promise<void>((resolve, reject) => {
        yauzl.open(backupPath, { lazyEntries: true }, (err, zipfile) => {
          if (err) {
            reject(err)
            return
          }
          
          if (!zipfile) {
            reject(new Error("Impossible d'ouvrir l'archive"))
            return
          }
          
          zipfile.readEntry()
          
          zipfile.on("entry", (entry) => {
            // Ignorer les entrées malformées ou dangereuses
            if (entry.fileName.includes("..") || entry.fileName.startsWith("/")) {
              zipfile.readEntry()
              return
            }
            
            if (/\/$/.test(entry.fileName)) {
              // C'est un dossier, créer le dossier et passer à l'entrée suivante
              const dirPath = join(process.cwd(), entry.fileName)
              mkdir(dirPath, { recursive: true })
                .then(() => zipfile.readEntry())
                .catch((err) => {
                  console.error(`Erreur lors de la création du dossier ${dirPath}:`, err)
                  zipfile.readEntry() // Continuer même en cas d'erreur
                })
            } else {
              // C'est un fichier, l'extraire
              zipfile.openReadStream(entry, (err, readStream) => {
                if (err) {
                  console.error(`Erreur lors de l'ouverture de ${entry.fileName}:`, err)
                  zipfile.readEntry() // Continuer même en cas d'erreur
                  return
                }
                
                if (!readStream) {
                  console.error(`Impossible de lire l'entrée ${entry.fileName}`)
                  zipfile.readEntry() // Continuer même en cas d'erreur
                  return
                }
                
                // Déterminer le chemin de destination
                let filePath: string
                if (entry.fileName === "dev.db") {
                  // Le fichier dev.db va dans prisma/dev.db
                  filePath = join(prismaDir, "dev.db")
                } else if (entry.fileName.startsWith("uploads/")) {
                  // Les fichiers uploads/ vont dans uploads/
                  filePath = join(process.cwd(), entry.fileName)
                } else {
                  // Autres fichiers à la racine
                  filePath = join(process.cwd(), entry.fileName)
                }
                
                const dirPath = dirname(filePath)
                
                mkdir(dirPath, { recursive: true })
                  .then(() => {
                    const writeStream = createWriteStream(filePath)
                    readStream.pipe(writeStream)
                    
                    writeStream.on("close", () => {
                      zipfile.readEntry()
                    })
                    writeStream.on("error", (err) => {
                      console.error(`Erreur lors de l'écriture de ${filePath}:`, err)
                      zipfile.readEntry() // Continuer même en cas d'erreur
                    })
                  })
                  .catch((err) => {
                    console.error(`Erreur lors de la création du dossier ${dirPath}:`, err)
                    zipfile.readEntry() // Continuer même en cas d'erreur
                  })
                
                readStream.on("error", (err) => {
                  console.error(`Erreur lors de la lecture de ${entry.fileName}:`, err)
                  zipfile.readEntry() // Continuer même en cas d'erreur
                })
              })
            }
          })
          
          zipfile.on("end", () => {
            resolve()
          })
          
          zipfile.on("error", reject)
        })
      })
    } else {
      // Rétrocompatibilité : restaurer uniquement la base de données (.db)
      const backupData = await readFile(backupPath)
      await writeFile(dbPath, backupData)
    }

    await createLog(session.id, "SAUVEGARDE_RESTAUREE", {
      restoredFrom: filename,
      backupCreatedBefore: `backup-before-restore-${timestamp}.zip`,
    }, request)

    return NextResponse.json({
      success: true,
      message: "Sauvegarde restaurée avec succès",
      backupCreatedBefore: `backup-before-restore-${timestamp}.zip`,
    })
  } catch (error) {
    console.error("Error restoring backup:", error)
    return NextResponse.json(
      { error: "Erreur lors de la restauration de la sauvegarde" },
      { status: 500 }
    )
  }
}

