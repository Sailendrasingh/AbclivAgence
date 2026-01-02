import { NextRequest, NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"
import { getSession } from "@/lib/session"
import { createLog } from "@/lib/logs"
import { requireCSRF } from "@/lib/csrf-middleware"
import { sanitize } from "@/lib/sanitize"
import { updatePCSchema } from "@/lib/validations"
import { validateRequest } from "@/lib/validation-middleware"

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
    // Valider les données avec Zod
    const validation = await validateRequest(request, updatePCSchema)
    if (!validation.success) {
      return validation.error
    }

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
    } = validation.data

    // Sanitizer les entrées utilisateur (après validation)
    const sanitizedName = name ? sanitize(name) : undefined
    const sanitizedIp = ip ? sanitize(ip) : null
    const sanitizedMac = mac ? sanitize(mac) : null
    const sanitizedSerialNumber = serialNumber ? sanitize(serialNumber) : null
    const sanitizedBrand = brand ? sanitize(brand) : null
    const sanitizedModel = model ? sanitize(model) : null

    const updateData: any = {}
    if (sanitizedName !== undefined) updateData.name = sanitizedName
    if (ip !== undefined) updateData.ip = sanitizedIp
    if (mac !== undefined) updateData.mac = sanitizedMac
    if (serialNumber !== undefined) updateData.serialNumber = sanitizedSerialNumber
    if (brand !== undefined) updateData.brand = sanitizedBrand
    if (model !== undefined) updateData.model = sanitizedModel
    if (purchaseDate !== undefined) updateData.purchaseDate = purchaseDate
    if (warrantyDate !== undefined) updateData.warrantyDate = warrantyDate
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

