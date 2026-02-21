import { NextRequest, NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"
import { getSession } from "@/lib/session"
import { decryptWifiPassword, isVaultFormat, migrateOldPassword } from "@/lib/wifi-vault"
import { logError, logInfo, logWarning } from "@/lib/logger"
import crypto from "crypto"

// Fonction de déchiffrement pour l'ancien format (AES-256-CBC)
// Utilisée uniquement pour la migration. Refuse de déchiffrer si ENCRYPTION_KEY est absente.
function decryptOldFormat(text: string): string {
  try {
    const ENCRYPTION_KEY = process.env.ENCRYPTION_KEY
    if (!ENCRYPTION_KEY || ENCRYPTION_KEY.length < 32) {
      logError("ENCRYPTION_KEY manquante ou trop courte, impossible de déchiffrer l'ancien format WiFi", new Error("ENCRYPTION_KEY required"))
      return ""
    }
    const key = ENCRYPTION_KEY.substring(0, 32)
    const parts = text.split(":")
    const iv = Buffer.from(parts.shift()!, "hex")
    const encryptedText = parts.join(":")
    const decipher = crypto.createDecipheriv(
      "aes-256-cbc",
      Buffer.from(key),
      iv
    )
    let decrypted = decipher.update(encryptedText, "hex", "utf8")
    decrypted += decipher.final("utf8")
    return decrypted
  } catch (error) {
    return ""
  }
}

export async function GET(
  request: NextRequest,
  context: { params: Promise<{ id: string }> }
) {
  const { id } = await context.params
  const session = await getSession()
  if (!session) {
    return NextResponse.json({ error: "Non autorisé" }, { status: 401 })
  }

  try {
    const wifiAP = await prisma.wifiAccessPoint.findUnique({
      where: { id },
      select: {
        passwordEncrypted: true,
      },
    })

    if (!wifiAP || !wifiAP.passwordEncrypted) {
      return NextResponse.json({ password: "" })
    }

    // Si le mot de passe commence par $argon2, c'est un hash (ancien système, non réversible)
    if (wifiAP.passwordEncrypted.startsWith("$argon2")) {
      return NextResponse.json({ password: "" })
    }

    let decryptedPassword: string

    // Vérifier si c'est le nouveau format (vault)
    if (isVaultFormat(wifiAP.passwordEncrypted)) {
      // Nouveau format : déchiffrer avec le vault
      try {
        decryptedPassword = decryptWifiPassword(wifiAP.passwordEncrypted, id)
      } catch (error: any) {
        logError("Erreur lors du déchiffrement avec le vault", error, { wifiAPId: id })
        return NextResponse.json(
          { error: "Impossible de déchiffrer le mot de passe" },
          { status: 500 }
        )
      }
    } else {
      // Ancien format (AES-256-CBC) : déchiffrer et migrer automatiquement
      try {
        decryptedPassword = decryptOldFormat(wifiAP.passwordEncrypted)
        
        if (!decryptedPassword) {
          return NextResponse.json({ password: "" })
        }

        // Migrer automatiquement vers le nouveau format
        try {
          const newEncryptedPassword = migrateOldPassword(wifiAP.passwordEncrypted, id)
          await prisma.wifiAccessPoint.update({
            where: { id },
            data: { passwordEncrypted: newEncryptedPassword },
          })
          logInfo("Mot de passe WiFi migré vers le nouveau format", { wifiAPId: id })
        } catch (migrationError: any) {
          logWarning("Échec de la migration du mot de passe WiFi", { 
            wifiAPId: id, 
            error: migrationError.message 
          })
          // Continuer quand même avec le déchiffrement de l'ancien format
        }
      } catch (error: any) {
        logError("Erreur lors du déchiffrement de l'ancien format", error, { wifiAPId: id })
        return NextResponse.json({ password: "" })
      }
    }

    return NextResponse.json({ password: decryptedPassword })
  } catch (error) {
    logError("Error decrypting password", error, { wifiAPId: id })
    return NextResponse.json(
      { error: "Erreur serveur" },
      { status: 500 }
    )
  }
}
