import { NextRequest, NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"
import { getSession } from "@/lib/session"
import { createLog } from "@/lib/logs"
import { createTechnicalHistory } from "@/lib/history"

export async function POST(request: NextRequest) {
  const session = await getSession()
  if (!session) {
    return NextResponse.json({ error: "Non autorisé" }, { status: 401 })
  }

  try {
    const body = await request.json()
    const { agencyId, networkIp, ...otherFields } = body

    if (!agencyId) {
      return NextResponse.json(
        { error: "agencyId requis" },
        { status: 400 }
      )
    }

    // Validation CIDR pour networkIp si fourni
    if (networkIp && !/^\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3}\/\d{1,2}$/.test(networkIp)) {
      return NextResponse.json(
        { error: "L'adresse IP LAN doit être au format CIDR" },
        { status: 400 }
      )
    }

    const technical = await prisma.technical.create({
      data: {
        agencyId,
        networkIp: networkIp || null,
        machineBrand: otherFields.machineBrand || null,
        machineModel: otherFields.machineModel || null,
        machineConnection: otherFields.machineConnection || null,
        machineIp: otherFields.machineIp || null,
        machineMac: otherFields.machineMac || null,
        wifiRouterBrand: otherFields.wifiRouterBrand || null,
        wifiRouterModel: otherFields.wifiRouterModel || null,
        wifiRouterIp: otherFields.wifiRouterIp || null,
        wifiRouterSerial: otherFields.wifiRouterSerial || null,
        mainRouterBrand: otherFields.mainRouterBrand || null,
        mainRouterModel: otherFields.mainRouterModel || null,
        mainRouterIp: otherFields.mainRouterIp || null,
        mainRouterSerial: otherFields.mainRouterSerial || null,
        mainRouterLinkType: otherFields.mainRouterLinkType || null,
        backupRouterBrand: otherFields.backupRouterBrand || null,
        backupRouterModel: otherFields.backupRouterModel || null,
        backupRouterIp: otherFields.backupRouterIp || null,
        backupRouterSerial: otherFields.backupRouterSerial || null,
        recorderBrand: otherFields.recorderBrand || null,
        recorderModel: otherFields.recorderModel || null,
        recorderSerial: otherFields.recorderSerial || null,
        recorderMac: otherFields.recorderMac || null,
        recorderIp: otherFields.recorderIp || null,
        recorderStorage: otherFields.recorderStorage || null,
        technicalNotes: otherFields.technicalNotes || null,
      },
    })

    await createLog(session.id, "TECHNIQUE_CREE", {
      technicalId: technical.id,
      agencyId,
    }, request)

    return NextResponse.json(technical, { status: 201 })
  } catch (error) {
    console.error("Error creating technical:", error)
    return NextResponse.json(
      { error: "Erreur serveur" },
      { status: 500 }
    )
  }
}

export async function PUT(request: NextRequest) {
  const session = await getSession()
  if (!session) {
    return NextResponse.json({ error: "Non autorisé" }, { status: 401 })
  }

  try {
    const body = await request.json()
    const { technicalId, ...updateData } = body

    console.log("PUT /api/technical - Received data:", { technicalId, updateData })

    if (!technicalId) {
      return NextResponse.json(
        { error: "technicalId requis" },
        { status: 400 }
      )
    }

    // Sauvegarder l'état actuel pour l'historique
    const currentTechnical = await prisma.technical.findUnique({
      where: { id: technicalId },
      include: {
        pcs: true,
        printers: true,
        wifiAccessPoints: true,
        cameras: true,
        dynamicFields: true,
      },
    })

    if (!currentTechnical) {
      return NextResponse.json(
        { error: "Données techniques non trouvées" },
        { status: 404 }
      )
    }

    // Validation CIDR si networkIp est modifié
    if (updateData.networkIp && !/^\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3}\/\d{1,2}$/.test(updateData.networkIp)) {
      return NextResponse.json(
        { error: "L'adresse IP LAN doit être au format CIDR" },
        { status: 400 }
      )
    }

    // Convertir les chaînes vides en null pour tous les champs optionnels
    const cleanedData: any = {}
    for (const [key, value] of Object.entries(updateData)) {
      if (key !== "technicalId") {
        // Pour technicalNotes, on garde la valeur même si elle est vide (chaîne vide)
        // Pour les autres champs, on convertit les chaînes vides en null
        if (key === "technicalNotes") {
          cleanedData[key] = value === "" ? null : value
        } else {
          cleanedData[key] = value === "" ? null : value
        }
      }
    }

    console.log("PUT /api/technical - Cleaned data:", cleanedData)

    const updatedTechnical = await prisma.technical.update({
      where: { id: technicalId },
      data: cleanedData,
    })
    
    console.log("PUT /api/technical - Updated technical:", updatedTechnical)

    // Créer l'entrée d'historique pour les notes techniques uniquement
    if ("technicalNotes" in updateData) {
      await createTechnicalHistory(
        technicalId,
        session.id,
        cleanedData.technicalNotes || ""
      )
    }

    await createLog(session.id, "TECHNIQUE_MODIFIE", {
      technicalId,
    }, request)

    return NextResponse.json(updatedTechnical)
  } catch (error) {
    console.error("Error updating technical:", error)
    return NextResponse.json(
      { error: "Erreur serveur" },
      { status: 500 }
    )
  }
}

