import { NextRequest, NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"
import { getSession } from "@/lib/session"
import { createLog } from "@/lib/logs"

export async function POST(request: NextRequest) {
  const session = await getSession()
  if (!session) {
    return NextResponse.json({ error: "Non autorisé" }, { status: 401 })
  }

  try {
    const body = await request.json()
    const {
      technicalId,
      name,
      ip,
      mac,
      serialNumber,
      brand,
      model,
      purchaseDate,
      warrantyDate,
      files,
      photos,
    } = body

    if (!technicalId || !name) {
      return NextResponse.json(
        { error: "technicalId et name sont requis" },
        { status: 400 }
      )
    }

    // Calculer l'ordre pour le nouveau PC (maximum + 1)
    const maxOrder = await prisma.pC.findFirst({
      where: { technicalId },
      orderBy: { order: "desc" },
      select: { order: true },
    })
    const newOrder = (maxOrder?.order ?? -1) + 1

    const pc = await prisma.pC.create({
      data: {
        technicalId,
        name,
        ip: ip || null,
        mac: mac || null,
        serialNumber: serialNumber || null,
        brand: brand || null,
        model: model || null,
        purchaseDate: purchaseDate ? new Date(purchaseDate) : null,
        warrantyDate: warrantyDate ? new Date(warrantyDate) : null,
        files: files ? JSON.stringify(files) : null,
        photos: photos ? JSON.stringify(photos) : null,
        order: newOrder,
      },
    })

    await createLog(session.id, "PC_CREE", {
      pcId: pc.id,
      technicalId,
    }, request)

    return NextResponse.json(pc, { status: 201 })
  } catch (error) {
    console.error("Error creating PC:", error)
    return NextResponse.json(
      { error: "Erreur serveur" },
      { status: 500 }
    )
  }
}

