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
      agencyId,
      banId,
      label,
      street,
      city,
      postalCode,
      country,
      latitude,
      longitude,
    } = body

    if (!agencyId || !label || !street || !city || !postalCode) {
      return NextResponse.json(
        { error: "Champs obligatoires manquants" },
        { status: 400 }
      )
    }

    const address = await prisma.address.create({
      data: {
        agencyId,
        banId: banId || null,
        label,
        street,
        city,
        postalCode,
        country: country || "France",
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

