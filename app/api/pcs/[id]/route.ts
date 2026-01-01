import { NextRequest, NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"
import { getSession } from "@/lib/session"
import { createLog } from "@/lib/logs"

export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  const session = await getSession()
  if (!session) {
    return NextResponse.json({ error: "Non autorisé" }, { status: 401 })
  }

  try {
    const body = await request.json()
    const {
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

    const updateData: any = {}
    if (name) updateData.name = name
    if (ip !== undefined) updateData.ip = ip
    if (mac !== undefined) updateData.mac = mac
    if (serialNumber !== undefined) updateData.serialNumber = serialNumber
    if (brand !== undefined) updateData.brand = brand
    if (model !== undefined) updateData.model = model
    if (purchaseDate !== undefined) updateData.purchaseDate = purchaseDate ? new Date(purchaseDate) : null
    if (warrantyDate !== undefined) updateData.warrantyDate = warrantyDate ? new Date(warrantyDate) : null
    if (files !== undefined) updateData.files = files ? JSON.stringify(files) : null
    if (photos !== undefined) updateData.photos = photos ? JSON.stringify(photos) : null

    const pc = await prisma.pC.update({
      where: { id: params.id },
      data: updateData,
    })

    await createLog(session.id, "PC_MODIFIE", {
      pcId: params.id,
    }, request)

    return NextResponse.json(pc)
  } catch (error) {
    console.error("Error updating PC:", error)
    return NextResponse.json(
      { error: "Erreur serveur" },
      { status: 500 }
    )
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  const session = await getSession()
  if (!session) {
    return NextResponse.json({ error: "Non autorisé" }, { status: 401 })
  }

  try {
    await prisma.pC.delete({
      where: { id: params.id },
    })

    await createLog(session.id, "PC_SUPPRIME", {
      pcId: params.id,
    }, request)

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error("Error deleting PC:", error)
    return NextResponse.json(
      { error: "Erreur serveur" },
      { status: 500 }
    )
  }
}

