import { NextRequest, NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"
import { getSession } from "@/lib/session"
import { createLog } from "@/lib/logs"
import { requireCSRF } from "@/lib/csrf-middleware"

export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  // Vérifier le token CSRF
  const csrfError = await requireCSRF(request)
  if (csrfError) {
    return csrfError
  }

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
      order,
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
    if (order !== undefined) {
      updateData.order = order
      console.log(`[API PC] Mise à jour de l'ordre du PC ${params.id} à ${order}`)
    }

    const pc = await prisma.pC.update({
      where: { id: params.id },
      data: updateData,
    })
    
    console.log(`[API PC] PC mis à jour:`, { id: pc.id, name: pc.name, order: pc.order })

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
  // Vérifier le token CSRF
  const csrfError = await requireCSRF(request)
  if (csrfError) {
    return csrfError
  }

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

