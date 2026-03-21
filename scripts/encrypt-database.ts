import { readFile, writeFile, stat } from "fs/promises"
import { join } from "path"
import { existsSync } from "fs"
import { encryptFile, isEncryptedFile } from "../lib/encryption"

/**
 * Script pour chiffrer un fichier de sauvegarde base de données
 * 
 * Usage: npx tsx scripts/encrypt-database.ts
 * 
 * Ce script crée une copie chiffrée d'un dump SQL.
 * Le fichier original est conservé comme backup.
 */
async function encryptDatabase() {
  const sourcePath = join(process.cwd(), "backups", "latest.sql")
  const encryptedPath = join(process.cwd(), "backups", "latest.sql.enc")
  const backupPath = join(process.cwd(), "backups", "latest.sql.bak")

  try {
    // Vérifier que le fichier source existe
    if (!existsSync(sourcePath)) {
      console.error("❌ Fichier source non trouvé:", sourcePath)
      process.exit(1)
    }

    // Vérifier si le fichier est déjà chiffré
    const fileData = await readFile(sourcePath)
    if (isEncryptedFile(fileData)) {
      console.log("⚠️  Le fichier semble déjà être chiffré.")
      console.log("   Si vous souhaitez le re-chiffrer, supprimez d'abord le fichier chiffré.")
      process.exit(0)
    }

    // Vérifier si un fichier chiffré existe déjà
    if (existsSync(encryptedPath)) {
      console.error("❌ Un fichier chiffré existe déjà:", encryptedPath)
      console.error("   Supprimez-le d'abord si vous souhaitez créer un nouveau fichier chiffré.")
      process.exit(1)
    }

    console.log("📦 Chiffrement du fichier de sauvegarde...")
    console.log(`   Source: ${sourcePath}`)
    
    // Créer une sauvegarde du fichier original
    console.log("💾 Création d'une sauvegarde du fichier original...")
    await writeFile(backupPath, fileData)
    console.log(`   Sauvegarde créée: ${backupPath}`)

    // Chiffrer le fichier
    await encryptFile(sourcePath, encryptedPath)
    
    const originalStats = await stat(sourcePath)
    const encryptedStats = await stat(encryptedPath)
    
    console.log("✅ Fichier chiffré avec succès!")
    console.log(`   Fichier chiffré: ${encryptedPath}`)
    console.log(`   Taille originale: ${originalStats.size} bytes`)
    console.log(`   Taille chiffrée: ${encryptedStats.size} bytes`)
    console.log("")
    console.log("⚠️  IMPORTANT:")
    console.log("   1. La base de données originale est conservée comme backup.")
    console.log("   2. Pour utiliser la base chiffrée, vous devez modifier votre configuration.")
    console.log("   3. Assurez-vous que ENCRYPTION_KEY est définie dans vos variables d'environnement.")
    console.log("   4. Testez la restauration avant de supprimer les fichiers de backup.")
    
  } catch (error: any) {
    console.error("❌ Erreur lors du chiffrement:", error.message)
    process.exit(1)
  }
}

encryptDatabase()

