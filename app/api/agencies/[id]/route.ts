import { NextRequest, NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"
import { getSession } from "@/lib/session"
import { createLog } from "@/lib/logs"
import { createAgencyHistory } from "@/lib/history"

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  const session = await getSession()
  if (!session) {
    return NextResponse.json({ error: "Non autorisé" }, { status: 401 })
  }

  try {
    const agency = await prisma.agency.findUnique({
      where: { id: params.id },
      include: {
        addresses: true,
        contacts: true,
        technical: {
          include: {
            pcs: true,
            printers: true,
            wifiAccessPoints: true,
            cameras: true,
            dynamicFields: true,
          },
        },
        photos: true,
      },
    })

    if (!agency) {
      return NextResponse.json(
        { error: "Agence non trouvée" },
        { status: 404 }
      )
    }

    // S'assurer que les contacts ont un champ order (rétrocompatibilité)
    if (agency.contacts && Array.isArray(agency.contacts)) {
      agency.contacts = agency.contacts.map((contact: any, index: number) => ({
        ...contact,
        order: contact.order !== undefined ? contact.order : index
      }))
    }

    return NextResponse.json(agency)
  } catch (error: any) {
    console.error("Error fetching agency:", error)
    return NextResponse.json(
      { error: error.message || "Erreur serveur" },
      { status: 500 }
    )
  }
}

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
    const { name, photo, state, codeAgence, codeRayon, dateOuverture, dateFermeture, validatedAt } = body

    // Sauvegarder l'état actuel pour l'historique
    const currentAgency = await prisma.agency.findUnique({
      where: { id: params.id },
      include: {
        addresses: true,
        contacts: true,
        technical: true,
        photos: true,
      },
    })

    if (!currentAgency) {
      return NextResponse.json(
        { error: "Agence non trouvée" },
        { status: 404 }
      )
    }

    // Mettre à jour l'agence
    const updatedAgency = await prisma.agency.update({
      where: { id: params.id },
      data: {
        name,
        photo,
        state: state || "ALERTE",
        codeAgence: codeAgence || null,
        codeRayon: codeRayon || null,
        dateOuverture: dateOuverture ? new Date(dateOuverture) : null,
        dateFermeture: dateFermeture ? new Date(dateFermeture) : null,
        validatedAt: validatedAt ? new Date(validatedAt) : null,
      },
    })

    // Créer l'entrée d'historique
    await createAgencyHistory(
      params.id,
      session.id,
      JSON.stringify(currentAgency)
    )

    await createLog(session.id, "AGENCE_MODIFIEE", {
      agencyId: params.id,
      agencyName: name,
    }, request)

    return NextResponse.json(updatedAgency)
  } catch (error) {
    console.error("Error updating agency:", error)
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
    await prisma.agency.delete({
      where: { id: params.id },
    })

    await createLog(session.id, "AGENCE_SUPPRIMEE", {
      agencyId: params.id,
    }, request)

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error("Error deleting agency:", error)
    return NextResponse.json(
      { error: "Erreur serveur" },
      { status: 500 }
    )
  }
}

