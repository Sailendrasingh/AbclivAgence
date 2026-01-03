import { NextRequest, NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"
import { getSession } from "@/lib/session"
import crypto from "crypto"

// Clé de chiffrement - FORCER l'utilisation d'une variable d'environnement en production
const ENCRYPTION_KEY = process.env.ENCRYPTION_KEY
const ALGORITHM = "aes-256-cbc"

// Fonction pour obtenir la clé de chiffrement
// Ne vérifie la production qu'au moment de l'utilisation, pas au chargement du module
function getEncryptionKey(): string {
  if (!ENCRYPTION_KEY) {
    // Vérifier seulement si on est vraiment en production (pas pendant le build)
    if (process.env.NODE_ENV === "production" && process.env.VERCEL_ENV !== undefined) {
      throw new Error("ENCRYPTION_KEY doit être définie en production")
    }
    // En développement ou build, utiliser une clé par défaut
    return "default-encryption-key-32-chars!!" // Dev uniquement
  }
  if (ENCRYPTION_KEY.length < 32) {
    throw new Error("ENCRYPTION_KEY doit contenir au moins 32 caractères")
  }
  return ENCRYPTION_KEY.substring(0, 32)
}

function decrypt(text: string): string {
  try {
    const key = getEncryptionKey()
    const parts = text.split(":")
    const iv = Buffer.from(parts.shift()!, "hex")
    const encryptedText = parts.join(":")
    const decipher = crypto.createDecipheriv(
      ALGORITHM,
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
    // Sinon, c'est un chiffrement réversible
    if (wifiAP.passwordEncrypted.startsWith("$argon2")) {
      return NextResponse.json({ password: "" })
    }

    const decryptedPassword = decrypt(wifiAP.passwordEncrypted)
    return NextResponse.json({ password: decryptedPassword })
  } catch (error) {
    console.error("Error decrypting password:", error)
    return NextResponse.json(
      { error: "Erreur serveur" },
      { status: 500 }
    )
  }
}
