import { NextRequest, NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"
import { getSession } from "@/lib/session"
import { createLog } from "@/lib/logs"
import { requireCSRF } from "@/lib/csrf-middleware"
import { sanitize } from "@/lib/sanitize"
import { updateAddressSchema } from "@/lib/validations"
import { validateRequest } from "@/lib/validation-middleware"

export async function PUT(
  request: NextRequest,
  { params }: Promise<{ params: { id: string } }>
) {
  // Vérifier le token CSRF
  const csrfError = await requireCSRF(request)
  if (csrfError) {
    return csrfError
  }

  const { id } = await params
  const session = await getSession()
  if (!session) {
    return NextResponse.json({ error: "Non autorisé" }, { status: 401 })
  }

  try {
    // Valider les données avec Zod
    const validation = await validateRequest(request, updateAddressSchema)
    if (!validation.success) {
      return validation.error
    }

    const {
      label,
      street,
      city,
      postalCode,
      country,
      latitude,
      longitude,
    } = validation.data

    // Sanitizer les entrées utilisateur (après validation)
    const sanitizedLabel = label ? sanitize(label) : undefined
    const sanitizedStreet = street ? sanitize(street) : undefined
    const sanitizedCity = city ? sanitize(city) : undefined
    const sanitizedPostalCode = postalCode ? sanitize(postalCode) : undefined
    const sanitizedCountry = country ? sanitize(country) : "France"

    const updateData: any = {}
    if (sanitizedLabel !== undefined) updateData.label = sanitizedLabel
    if (sanitizedStreet !== undefined) updateData.street = sanitizedStreet
    if (sanitizedCity !== undefined) updateData.city = sanitizedCity
    if (sanitizedPostalCode !== undefined) updateData.postalCode = sanitizedPostalCode
    if (sanitizedCountry !== undefined) updateData.country = sanitizedCountry
    if (latitude !== undefined) updateData.latitude = latitude || null
    if (longitude !== undefined) updateData.longitude = longitude || null

    const address = await prisma.address.update({
      where: { id },
      data: updateData,
    })

    await createLog(session.id, "ADRESSE_MODIFIEE", {
      addressId: id,
    }, request)

    return NextResponse.json(address)
  } catch (error: any) {
    console.error("Error updating address:", error)
    // Si l'adresse n'existe pas, retourner 404
    if (error?.code === 'P2025') {
      return NextResponse.json(
        { error: "Adresse non trouvée" },
        { status: 404 }
      )
    }
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
  // Vérifier le token CSRF
  const csrfError = await requireCSRF(request)
  if (csrfError) {
    return csrfError
  }

  const { id } = await params
  const session = await getSession()
  if (!session) {
    return NextResponse.json({ error: "Non autorisé" }, { status: 401 })
  }

  try {
    await prisma.address.delete({
      where: { id },
    })

    await createLog(session.id, "ADRESSE_SUPPRIMEE", {
      addressId: id,
    }, request)

    return NextResponse.json({ success: true })
  } catch (error: any) {
    console.error("Error deleting address:", error)
    // Si l'adresse n'existe pas, retourner 404
    if (error?.code === 'P2025') {
      return NextResponse.json(
        { error: "Adresse non trouvée" },
        { status: 404 }
      )
    }
    return NextResponse.json(
      { error: "Erreur serveur" },
      { status: 500 }
    )
  }
}

