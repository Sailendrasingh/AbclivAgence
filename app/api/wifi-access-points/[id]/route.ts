import { NextRequest, NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"
import { getSession } from "@/lib/session"
import { createLog } from "@/lib/logs"
import { encryptWifiPassword } from "@/lib/wifi-vault"
import { logError } from "@/lib/logger"

export async function PUT(
  request: NextRequest,
  context: { params: Promise<{ id: string }> }
) {
  const { id } = await context.params
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

    // Chiffrer le mot de passe avec le vault sécurisé si fourni
    if (password !== undefined) {
      if (password) {
        updateData.passwordEncrypted = encryptWifiPassword(password, id)
      } else {
        // Si password est une chaîne vide, supprimer le mot de passe
        updateData.passwordEncrypted = null
      }
    }

    await prisma.wifiAccessPoint.update({
      where: { id },
      data: updateData,
    })

    // Recharger sans exposer le mot de passe chiffré
    const wifiAP = await prisma.wifiAccessPoint.findUnique({
      where: { id },
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

    await createLog(session.id, "WIFI_AP_MODIFIE", {
      wifiAPId: id,
    }, request)

    return NextResponse.json(wifiAP)
  } catch (error) {
    logError("Error updating wifi access point", error, { wifiAPId: id })
    return NextResponse.json(
      { error: "Erreur serveur" },
      { status: 500 }
    )
  }
}

export async function DELETE(
  request: NextRequest,
  context: { params: Promise<{ id: string }> }
) {
  const { id } = await context.params
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
    logError("Error deleting wifi access point", error, { wifiAPId: id })
    return NextResponse.json(
      { error: "Erreur serveur" },
      { status: 500 }
    )
  }
}

