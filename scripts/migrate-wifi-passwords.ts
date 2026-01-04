/**
 * Script de migration des mots de passe WiFi vers le nouveau vault sécurisé
 * 
 * Ce script migre tous les mots de passe WiFi de l'ancien format (AES-256-CBC)
 * vers le nouveau format du vault (AES-256-GCM avec chiffrement par entrée)
 * 
 * Usage:
 *   npx tsx scripts/migrate-wifi-passwords.ts
 * 
 * Options:
 *   --dry-run : Affiche ce qui sera migré sans effectuer la migration
 *   --force : Force la migration même si le mot de passe est déjà au nouveau format
 */

import { PrismaClient } from "@prisma/client"
import { isVaultFormat, migrateOldPassword, decryptWifiPassword } from "../lib/wifi-vault"
import crypto from "crypto"

const prisma = new PrismaClient()

// Fonction de déchiffrement pour l'ancien format (AES-256-CBC)
function decryptOldFormat(text: string): string {
  try {
    const ENCRYPTION_KEY = process.env.ENCRYPTION_KEY || "default-encryption-key-32-chars!!"
    const key = ENCRYPTION_KEY.substring(0, 32)
    const parts = text.split(":")
    
    if (parts.length !== 2) {
      return ""
    }
    
    const iv = Buffer.from(parts[0], "hex")
    const encryptedText = parts[1]
    const decipher = crypto.createDecipheriv("aes-256-cbc", Buffer.from(key), iv)
    let decrypted = decipher.update(encryptedText, "hex", "utf8")
    decrypted += decipher.final("utf8")
    return decrypted
  } catch (error) {
    return ""
  }
}

async function migrateWifiPasswords(dryRun: boolean = false, force: boolean = false) {
  console.log("🔐 Migration des mots de passe WiFi vers le vault sécurisé")
  console.log(`Mode: ${dryRun ? "DRY RUN (simulation)" : "MIGRATION RÉELLE"}`)
  console.log("")

  try {
    // Récupérer tous les points d'accès WiFi avec des mots de passe
    const wifiAPs = await prisma.wifiAccessPoint.findMany({
      where: {
        passwordEncrypted: {
          not: null,
        },
      },
      select: {
        id: true,
        ssid: true,
        passwordEncrypted: true,
      },
    })

    if (wifiAPs.length === 0) {
      console.log("✅ Aucun mot de passe WiFi à migrer")
      return
    }

    console.log(`📊 ${wifiAPs.length} point(s) d'accès WiFi trouvé(s)`)
    console.log("")

    let migratedCount = 0
    let skippedCount = 0
    let errorCount = 0

    for (const wifiAP of wifiAPs) {
      if (!wifiAP.passwordEncrypted) {
        continue
      }

      // Vérifier si c'est déjà au nouveau format
      if (isVaultFormat(wifiAP.passwordEncrypted) && !force) {
        console.log(`⏭️  ${wifiAP.id} (${wifiAP.ssid || "N/A"}) : Déjà au nouveau format, ignoré`)
        skippedCount++
        continue
      }

      // Vérifier si c'est un hash argon2 (non réversible)
      if (wifiAP.passwordEncrypted.startsWith("$argon2")) {
        console.log(`⚠️  ${wifiAP.id} (${wifiAP.ssid || "N/A"}) : Hash argon2 (non réversible), ignoré`)
        skippedCount++
        continue
      }

      try {
        // Déchiffrer avec l'ancien format
        const decryptedPassword = decryptOldFormat(wifiAP.passwordEncrypted)

        if (!decryptedPassword) {
          console.log(`❌ ${wifiAP.id} (${wifiAP.ssid || "N/A"}) : Impossible de déchiffrer l'ancien format`)
          errorCount++
          continue
        }

        // Vérifier que le nouveau format fonctionne
        const newEncryptedPassword = migrateOldPassword(wifiAP.passwordEncrypted, wifiAP.id)
        const testDecrypted = decryptWifiPassword(newEncryptedPassword, wifiAP.id)

        if (testDecrypted !== decryptedPassword) {
          console.log(`❌ ${wifiAP.id} (${wifiAP.ssid || "N/A"}) : Échec de vérification après migration`)
          errorCount++
          continue
        }

        if (dryRun) {
          console.log(`✅ ${wifiAP.id} (${wifiAP.ssid || "N/A"}) : Sera migré`)
        } else {
          // Migrer vers le nouveau format
          await prisma.wifiAccessPoint.update({
            where: { id: wifiAP.id },
            data: { passwordEncrypted: newEncryptedPassword },
          })
          console.log(`✅ ${wifiAP.id} (${wifiAP.ssid || "N/A"}) : Migré avec succès`)
        }

        migratedCount++
      } catch (error: any) {
        console.log(`❌ ${wifiAP.id} (${wifiAP.ssid || "N/A"}) : Erreur - ${error.message}`)
        errorCount++
      }
    }

    console.log("")
    console.log("📊 Résumé de la migration:")
    console.log(`   ✅ Migrés: ${migratedCount}`)
    console.log(`   ⏭️  Ignorés: ${skippedCount}`)
    console.log(`   ❌ Erreurs: ${errorCount}`)

    if (dryRun) {
      console.log("")
      console.log("💡 Pour effectuer la migration réelle, exécutez sans --dry-run")
    } else {
      console.log("")
      console.log("✅ Migration terminée!")
    }
  } catch (error) {
    console.error("❌ Erreur lors de la migration:", error)
    process.exit(1)
  } finally {
    await prisma.$disconnect()
  }
}

// Parser les arguments
const args = process.argv.slice(2)
const dryRun = args.includes("--dry-run")
const force = args.includes("--force")

// Vérifier ENCRYPTION_KEY
if (!process.env.ENCRYPTION_KEY && process.env.NODE_ENV === "production") {
  console.error("❌ ERREUR: ENCRYPTION_KEY doit être définie en production")
  process.exit(1)
}

// Exécuter la migration
migrateWifiPasswords(dryRun, force)
  .then(() => {
    process.exit(0)
  })
  .catch((error) => {
    console.error("❌ Erreur fatale:", error)
    process.exit(1)
  })

