import { NextRequest, NextResponse } from "next/server"
import { readFile, writeFile, mkdir, rm, unlink } from "fs/promises"
import { createWriteStream } from "fs"
import { join, dirname } from "path"
import { existsSync } from "fs"
import { getSession } from "@/lib/session"
import { createLog } from "@/lib/logs"
import yauzl from "yauzl"
import { decryptFile, isEncryptedFile } from "@/lib/encryption"
import { verifyFileIntegrity } from "@/lib/backup-integrity"
import { alertSensitiveAction } from "@/lib/alerts"
import { prisma } from "@/lib/prisma"

export async function POST(
  request: NextRequest,
  context: { params: Promise<{ filename: string }> }
) {
  const { filename } = await context.params
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
    // Utiliser le chemin de la base depuis DATABASE_URL (ex: file:/app/data/prod.db ou file:./prisma/dev.db)
    const dbUrl = process.env.DATABASE_URL || "file:./prisma/dev.db"
    const dbPathRaw = dbUrl.replace(/^file:/, "").trim()
    const dbPath = dbPathRaw.startsWith("/") ? dbPathRaw : join(process.cwd(), dbPathRaw)
    const backupPath = join(backupsDir, filename)

    // Vérifier que le fichier de sauvegarde existe
    if (!existsSync(backupPath)) {
      return NextResponse.json(
        { error: "Sauvegarde non trouvée" },
        { status: 404 }
      )
    }

    // Vérifier que c'est bien un fichier .zip (chiffré ou non) ou .db (rétrocompatibilité)
    const isEncryptedZip = filename.endsWith(".encrypted.zip")
    const isZip = filename.endsWith(".zip")
    const isDb = filename.endsWith(".db")
    
    if (!filename.startsWith("backup-") || (!isZip && !isDb)) {
      return NextResponse.json(
        { error: "Fichier de sauvegarde invalide" },
        { status: 400 }
      )
    }

    // Vérifier l'intégrité de la sauvegarde avant restauration
    const integrityCheck = await verifyFileIntegrity(backupPath)
    if (integrityCheck.storedChecksum && !integrityCheck.valid) {
      return NextResponse.json(
        { 
          error: "La sauvegarde est corrompue ou a été modifiée",
          details: integrityCheck.error,
          storedChecksum: integrityCheck.storedChecksum,
          calculatedChecksum: integrityCheck.calculatedChecksum,
        },
        { status: 400 }
      )
    }
    
    // Avertir si aucun checksum n'est disponible (sauvegarde ancienne)
    if (!integrityCheck.storedChecksum) {
      console.warn(`[RESTORE] Aucun checksum trouvé pour ${filename}. La sauvegarde peut être ancienne.`)
    }

    // Déterminer le chemin du fichier à restaurer (déchiffré si nécessaire)
    let fileToRestore = backupPath
    if (isEncryptedZip) {
      // Déchiffrer le fichier dans un fichier temporaire
      const tempZipPath = join(backupsDir, `temp-restore-${Date.now()}.zip`)
      try {
        await decryptFile(backupPath, tempZipPath)
        fileToRestore = tempZipPath
      } catch (decryptError: any) {
        return NextResponse.json(
          { 
            error: "Erreur lors du déchiffrement de la sauvegarde",
            details: decryptError.message
          },
          { status: 500 }
        )
      }
    } else if (isZip) {
      // Vérifier si le fichier ZIP est chiffré (ancien format sans extension .encrypted)
      const fileData = await readFile(backupPath)
      if (isEncryptedFile(fileData)) {
        // Le fichier est chiffré mais n'a pas l'extension .encrypted (ancien format)
        const tempZipPath = join(backupsDir, `temp-restore-${Date.now()}.zip`)
        try {
          await decryptFile(backupPath, tempZipPath)
          fileToRestore = tempZipPath
        } catch (decryptError: any) {
          return NextResponse.json(
            { 
              error: "Erreur lors du déchiffrement de la sauvegarde",
              details: decryptError.message
            },
            { status: 500 }
          )
        }
      }
    }

    // Déconnecter Prisma pour libérer le verrou SQLite avant d'écraser la base
    await prisma.$disconnect()

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
      
      archive.on("error", (err: Error) => {
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
    try {
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
              zipfile.openReadStream(entry, (err: Error | null, readStream: any) => {
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
                
                // Déterminer le chemin de destination (dev.db dans l'archive → chemin réel de la base)
                let filePath: string
                if (entry.fileName === "dev.db") {
                  filePath = dbPath
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
                
                readStream.on("error", (err: Error) => {
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
        // Vérifier si le fichier .db est chiffré
        const fileData = await readFile(backupPath)
        if (isEncryptedFile(fileData)) {
          // Déchiffrer le fichier .db
          const tempDbPath = join(backupsDir, `temp-restore-${Date.now()}.db`)
          await decryptFile(backupPath, tempDbPath)
          const decryptedData = await readFile(tempDbPath)
          await writeFile(dbPath, decryptedData)
          await unlink(tempDbPath)
        } else {
          const backupData = await readFile(backupPath)
          await writeFile(dbPath, backupData)
        }
      }

      // Nettoyer le fichier temporaire si créé
      if (fileToRestore !== backupPath && existsSync(fileToRestore)) {
        await unlink(fileToRestore)
      }
    } catch (restoreError: any) {
      // Nettoyer le fichier temporaire en cas d'erreur
      if (fileToRestore !== backupPath && existsSync(fileToRestore)) {
        try {
          await unlink(fileToRestore)
        } catch {}
      }
      throw restoreError
    }

    await createLog(session.id, "SAUVEGARDE_RESTAUREE", {
      restoredFrom: filename,
      backupCreatedBefore: `backup-before-restore-${timestamp}.zip`,
    }, request)

    // Alerter sur l'action sensible
    const { getClientIP } = await import("@/lib/get-client-ip")
    const ipAddress = getClientIP(request)
    await alertSensitiveAction("SAUVEGARDE_RESTAUREE", session.id, {
      restoredFrom: filename,
      backupCreatedBefore: `backup-before-restore-${timestamp}.zip`,
    }, ipAddress)

    return NextResponse.json({
      success: true,
      message: "Sauvegarde restaurée avec succès",
      backupCreatedBefore: `backup-before-restore-${timestamp}.zip`,
    })
  } catch (error) {
    const message = error instanceof Error ? error.message : String(error)
    console.error("Error restoring backup:", error)
    return NextResponse.json(
      {
        error: "Erreur lors de la restauration de la sauvegarde",
        details: message,
      },
      { status: 500 }
    )
  }
}

