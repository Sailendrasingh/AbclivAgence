import { readFile, writeFile, stat } from "fs/promises"
import { join } from "path"
import { existsSync } from "fs"
import { encryptFile, isEncryptedFile } from "../lib/encryption"

/**
 * Script pour chiffrer la base de données existante
 * 
 * Usage: npx tsx scripts/encrypt-database.ts
 * 
 * Ce script crée une copie chiffrée de la base de données.
 * La base de données originale est conservée comme backup.
 */
async function encryptDatabase() {
  const dbPath = join(process.cwd(), "prisma", "dev.db")
  const encryptedDbPath = join(process.cwd(), "prisma", "dev.encrypted.db")
  const backupDbPath = join(process.cwd(), "prisma", "dev.backup.db")

  try {
    // Vérifier que la base de données existe
    if (!existsSync(dbPath)) {
      console.error("❌ Base de données non trouvée:", dbPath)
      process.exit(1)
    }

    // Vérifier si la base est déjà chiffrée
    const dbData = await readFile(dbPath)
    if (isEncryptedFile(dbData)) {
      console.log("⚠️  La base de données semble déjà être chiffrée.")
      console.log("   Si vous souhaitez la re-chiffrer, supprimez d'abord le fichier chiffré.")
      process.exit(0)
    }

    // Vérifier si un fichier chiffré existe déjà
    if (existsSync(encryptedDbPath)) {
      console.error("❌ Un fichier chiffré existe déjà:", encryptedDbPath)
      console.error("   Supprimez-le d'abord si vous souhaitez créer un nouveau fichier chiffré.")
      process.exit(1)
    }

    console.log("📦 Chiffrement de la base de données...")
    console.log(`   Source: ${dbPath}`)
    
    // Créer une sauvegarde de la base originale
    console.log("💾 Création d'une sauvegarde de la base originale...")
    await writeFile(backupDbPath, dbData)
    console.log(`   Sauvegarde créée: ${backupDbPath}`)

    // Chiffrer la base de données
    await encryptFile(dbPath, encryptedDbPath)
    
    const originalStats = await stat(dbPath)
    const encryptedStats = await stat(encryptedDbPath)
    
    console.log("✅ Base de données chiffrée avec succès!")
    console.log(`   Fichier chiffré: ${encryptedDbPath}`)
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

