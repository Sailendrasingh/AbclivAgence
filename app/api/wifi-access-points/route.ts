import { NextRequest, NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"
import { getSession } from "@/lib/session"
import { createLog } from "@/lib/logs"
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
    if (process.env.NODE_ENV !== "production") {
      console.warn("⚠️ ATTENTION: ENCRYPTION_KEY non définie. Utilisation d'une clé par défaut non sécurisée.")
    }
    return "default-encryption-key-32-chars!!" // Dev uniquement
  }
  if (ENCRYPTION_KEY.length < 32) {
    throw new Error("ENCRYPTION_KEY doit contenir au moins 32 caractères")
  }
  return ENCRYPTION_KEY.substring(0, 32)
}

function encrypt(text: string): string {
  const key = getEncryptionKey()
  const iv = crypto.randomBytes(16)
  const cipher = crypto.createCipheriv(
    ALGORITHM,
    Buffer.from(key),
    iv
  )
  let encrypted = cipher.update(text, "utf8", "hex")
  encrypted += cipher.final("hex")
  return iv.toString("hex") + ":" + encrypted
}

export async function POST(request: NextRequest) {
  const session = await getSession()
  if (!session) {
    return NextResponse.json({ error: "Non autorisé" }, { status: 401 })
  }

  try {
    const body = await request.json()
    const { technicalId, brand, model, ip, serialNumber, ssid, password } = body

    if (!technicalId) {
      return NextResponse.json(
        { error: "technicalId requis" },
        { status: 400 }
      )
    }

    // Chiffrer le mot de passe si fourni (chiffrement réversible pour pouvoir l'afficher)
    let passwordEncrypted = null
    if (password) {
      passwordEncrypted = encrypt(password)
    }

    const wifiAP = await prisma.wifiAccessPoint.create({
      data: {
        technicalId,
        brand: brand || null,
        model: model || null,
        ip: ip || null,
        serialNumber: serialNumber || null,
        ssid: ssid || null,
        passwordEncrypted,
      },
    })

    await createLog(session.id, "WIFI_AP_CREE", {
      wifiAPId: wifiAP.id,
      technicalId,
    }, request)

    return NextResponse.json(wifiAP, { status: 201 })
  } catch (error) {
    console.error("Error creating wifi access point:", error)
    return NextResponse.json(
      { error: "Erreur serveur" },
      { status: 500 }
    )
  }
}

