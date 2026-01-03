import { NextRequest, NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"
import { getSession } from "@/lib/session"
import { createLog } from "@/lib/logs"
import { requireCSRF } from "@/lib/csrf-middleware"
import { sanitize } from "@/lib/sanitize"
import { validateRequest } from "@/lib/validation-middleware"
import { createAddressSchema } from "@/lib/validations"

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
    const validation = await validateRequest(request, createAddressSchema)
    if (!validation.success) {
      return validation.error
    }

    const {
      agencyId,
      banId,
      label,
      street,
      city,
      postalCode,
      country,
      latitude,
      longitude,
    } = validation.data

    // Sanitizer les entrées utilisateur (après validation)
    const sanitizedBanId = banId ? sanitize(banId) : null
    const sanitizedLabel = sanitize(label)
    const sanitizedStreet = sanitize(street)
    const sanitizedCity = sanitize(city)
    const sanitizedPostalCode = sanitize(postalCode)
    const sanitizedCountry = sanitize(country || "France")

    const address = await prisma.address.create({
      data: {
        agencyId,
        banId: sanitizedBanId,
        label: sanitizedLabel,
        street: sanitizedStreet,
        city: sanitizedCity,
        postalCode: sanitizedPostalCode,
        country: sanitizedCountry,
        latitude: latitude || null,
        longitude: longitude || null,
      },
    })

    await createLog(session.id, "ADRESSE_CREEE", {
      addressId: address.id,
      agencyId,
    }, request)

    return NextResponse.json(address, { status: 201 })
  } catch (error) {
    console.error("Error creating address:", error)
    return NextResponse.json(
      { error: "Erreur serveur" },
      { status: 500 }
    )
  }
}

