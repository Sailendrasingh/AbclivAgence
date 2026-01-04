import { NextRequest, NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"
import { getSession } from "@/lib/session"
import { createLog } from "@/lib/logs"
import { encryptWifiPassword } from "@/lib/wifi-vault"

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

    // Créer d'abord le WiFi AP pour obtenir son ID
    const wifiAP = await prisma.wifiAccessPoint.create({
      data: {
        technicalId,
        brand: brand || null,
        model: model || null,
        ip: ip || null,
        serialNumber: serialNumber || null,
        ssid: ssid || null,
        passwordEncrypted: null, // Sera mis à jour après création
      },
    })

    // Chiffrer le mot de passe avec le vault sécurisé si fourni
    if (password) {
      const passwordEncrypted = encryptWifiPassword(password, wifiAP.id)
      await prisma.wifiAccessPoint.update({
        where: { id: wifiAP.id },
        data: { passwordEncrypted },
      })
    }

    // Recharger le WiFi AP sans exposer le mot de passe chiffré
    const responseWifiAP = await prisma.wifiAccessPoint.findUnique({
      where: { id: wifiAP.id },
      select: {
        id: true,
        technicalId: true,
        brand: true,
        model: true,
        ip: true,
        serialNumber: true,
        ssid: true,
        createdAt: true,
        updatedAt: true,
        // passwordEncrypted n'est pas inclus dans le select
      },
    })

    await createLog(session.id, "WIFI_AP_CREE", {
      wifiAPId: wifiAP.id,
      technicalId,
    }, request)

    return NextResponse.json(responseWifiAP, { status: 201 })
  } catch (error) {
    console.error("Error creating wifi access point:", error)
    return NextResponse.json(
      { error: "Erreur serveur" },
      { status: 500 }
    )
  }
}

