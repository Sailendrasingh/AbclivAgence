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

export async function PUT(
  request: NextRequest,
  { params }: Promise<{ params: { id: string } }>
) {
  const { id } = await params
  const session = await getSession()
  if (!session) {
    return NextResponse.json({ error: "Non autorisé" }, { status: 401 })
  }

  try {
    const body = await request.json()
    const { brand, model, ip, serialNumber, ssid, password } = body

    const updateData: any = {}
    if (brand !== undefined) updateData.brand = brand
    if (model !== undefined) updateData.model = model
    if (ip !== undefined) updateData.ip = ip
    if (serialNumber !== undefined) updateData.serialNumber = serialNumber
    if (ssid !== undefined) updateData.ssid = ssid

    // Chiffrer le mot de passe si fourni (chiffrement réversible pour pouvoir l'afficher)
    if (password) {
      updateData.passwordEncrypted = encrypt(password)
    }

    const wifiAP = await prisma.wifiAccessPoint.update({
      where: { id },
      data: updateData,
    })

    await createLog(session.id, "WIFI_AP_MODIFIE", {
      wifiAPId: id,
    }, request)

    return NextResponse.json(wifiAP)
  } catch (error) {
    console.error("Error updating wifi access point:", error)
    return NextResponse.json(
      { error: "Erreur serveur" },
      { status: 500 }
    )
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: Promise<{ params: { id: string } }>
) {
  const { id } = await params
  const session = await getSession()
  if (!session) {
    return NextResponse.json({ error: "Non autorisé" }, { status: 401 })
  }

  try {
    await prisma.wifiAccessPoint.delete({
      where: { id },
    })

    await createLog(session.id, "WIFI_AP_SUPPRIME", {
      wifiAPId: id,
    }, request)

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error("Error deleting wifi access point:", error)
    return NextResponse.json(
      { error: "Erreur serveur" },
      { status: 500 }
    )
  }
}

