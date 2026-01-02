import { NextRequest, NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"
import { getSession } from "@/lib/session"
import { createLog } from "@/lib/logs"
import { requireCSRF } from "@/lib/csrf-middleware"
import { sanitize } from "@/lib/sanitize"
import { createPCSchema } from "@/lib/validations"
import { validateRequest } from "@/lib/validation-middleware"

export async function POST(request: NextRequest) {
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
    const validation = await validateRequest(request, createPCSchema)
    if (!validation.success) {
      return validation.error
    }

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
    } = validation.data

    // Sanitizer les entrées utilisateur (après validation)
    const sanitizedName = sanitize(name)
    const sanitizedIp = ip ? sanitize(ip) : null
    const sanitizedMac = mac ? sanitize(mac) : null
    const sanitizedSerialNumber = serialNumber ? sanitize(serialNumber) : null
    const sanitizedBrand = brand ? sanitize(brand) : null
    const sanitizedModel = model ? sanitize(model) : null

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
        name: sanitizedName,
        ip: sanitizedIp,
        mac: sanitizedMac,
        serialNumber: sanitizedSerialNumber,
        brand: sanitizedBrand,
        model: sanitizedModel,
        purchaseDate: purchaseDate,
        warrantyDate: warrantyDate,
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

