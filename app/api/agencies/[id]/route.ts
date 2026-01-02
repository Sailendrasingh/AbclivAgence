import { NextRequest, NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"
import { getSession } from "@/lib/session"
import { createLog } from "@/lib/logs"
import { createAgencyHistory } from "@/lib/history"
import { requireCSRF } from "@/lib/csrf-middleware"
import { sanitize } from "@/lib/sanitize"
import { updateAgencySchema } from "@/lib/validations"
import { validateRequest } from "@/lib/validation-middleware"

export async function GET(
  request: NextRequest,
  { params }: Promise<{ params: { id: string } }>
) {
  const { id } = await params
  const session = await getSession()
  if (!session) {
    return NextResponse.json({ error: "Non autorisé" }, { status: 401 })
  }

  try {
    const agency = await prisma.agency.findUnique({
      where: { id },
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
    const validation = await validateRequest(request, updateAgencySchema)
    if (!validation.success) {
      return validation.error
    }

    const { name, photo, state, codeAgence, codeRayon, dateOuverture, dateFermeture, validatedAt } = validation.data

    // Sanitizer les entrées utilisateur (après validation)
    const sanitizedName = name ? sanitize(name) : undefined
    const sanitizedCodeAgence = codeAgence ? sanitize(codeAgence) : undefined
    const sanitizedCodeRayon = codeRayon ? sanitize(codeRayon) : undefined

    // Sauvegarder l'état actuel pour l'historique
    const currentAgency = await prisma.agency.findUnique({
      where: { id },
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
      where: { id },
      data: {
        name: sanitizedName,
        photo,
        state: state || "ALERTE",
        codeAgence: sanitizedCodeAgence,
        codeRayon: sanitizedCodeRayon,
        dateOuverture: dateOuverture,
        dateFermeture: dateFermeture,
        validatedAt: validatedAt,
      },
    })

    // Créer l'entrée d'historique
    await createAgencyHistory(
      id,
      session.id,
      JSON.stringify(currentAgency)
    )

    await createLog(session.id, "AGENCE_MODIFIEE", {
      agencyId: id,
      agencyName: name,
    }, request)

    return NextResponse.json(updatedAgency)
  } catch (error: any) {
    console.error("Error updating agency:", error)
    // Si l'agence n'existe pas, retourner 404
    if (error?.code === 'P2025') {
      return NextResponse.json(
        { error: "Agence non trouvée" },
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
    await prisma.agency.delete({
      where: { id },
    })

    await createLog(session.id, "AGENCE_SUPPRIMEE", {
      agencyId: id,
    }, request)

    return NextResponse.json({ success: true })
  } catch (error: any) {
    console.error("Error deleting agency:", error)
    // Si l'agence n'existe pas, retourner 404
    if (error?.code === 'P2025') {
      return NextResponse.json(
        { error: "Agence non trouvée" },
        { status: 404 }
      )
    }
    return NextResponse.json(
      { error: "Erreur serveur" },
      { status: 500 }
    )
  }
}

