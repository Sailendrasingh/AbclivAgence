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
      label,
      street,
      city,
      postalCode,
      country,
      latitude,
      longitude,
    } = body

    const address = await prisma.address.update({
      where: { id: params.id },
      data: {
        label,
        street,
        city,
        postalCode,
        country: country || "France",
        latitude: latitude || null,
        longitude: longitude || null,
      },
    })

    await createLog(session.id, "ADRESSE_MODIFIEE", {
      addressId: params.id,
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
  { params }: { params: { id: string } }
) {
  const session = await getSession()
  if (!session) {
    return NextResponse.json({ error: "Non autorisé" }, { status: 401 })
  }

  try {
    await prisma.address.delete({
      where: { id: params.id },
    })

    await createLog(session.id, "ADRESSE_SUPPRIMEE", {
      addressId: params.id,
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

