import { NextRequest, NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"
import { getSession } from "@/lib/session"
import { createLog } from "@/lib/logs"
import validator from "validator"
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
      postNumber,
      agentNumber,
      directLine,
      emails,
      managerName,
      note,
      order,
    } = body

    // Validations identiques à POST
    if (postNumber && !/^\d{6}$/.test(postNumber)) {
      return NextResponse.json(
        { error: "Le numéro de poste doit contenir exactement 6 chiffres" },
        { status: 400 }
      )
    }

    if (agentNumber && !/^\d{4}$/.test(agentNumber)) {
      return NextResponse.json(
        { error: "Le numéro d'agent doit contenir exactement 4 chiffres" },
        { status: 400 }
      )
    }

    // Validation ligne directe - optionnel
    // Accepte le format avec espaces (00 00 00 00 00) ou sans espaces (0000000000)
    let normalizedDirectLine = directLine
    if (directLine !== undefined) {
      if (directLine) {
        // Retirer les espaces pour la validation
        const cleanedDirectLine = directLine.replace(/\s/g, "")
        if (!/^\d{10}$/.test(cleanedDirectLine)) {
          return NextResponse.json(
            { error: "La ligne directe doit contenir 10 chiffres (format: 00 00 00 00 00 ou 0000000000)" },
            { status: 400 }
          )
        }
        // Normaliser au format avec espaces pour le stockage
        normalizedDirectLine = cleanedDirectLine.match(/.{1,2}/g)?.join(" ") || cleanedDirectLine
      } else {
        normalizedDirectLine = ""
      }
    }

    if (emails !== undefined) {
      if (!Array.isArray(emails)) {
        return NextResponse.json(
          { error: "Les emails doivent être un tableau" },
          { status: 400 }
        )
      }

      // Valider chaque email s'il y en a
      for (const email of emails) {
        if (!validator.isEmail(email)) {
          return NextResponse.json(
            { error: `Email invalide: ${email}` },
            { status: 400 }
          )
        }
      }
    }

    const updateData: any = {}
    if (postNumber !== undefined) updateData.postNumber = postNumber || ""
    if (agentNumber !== undefined) updateData.agentNumber = agentNumber || ""
    if (directLine !== undefined) updateData.directLine = normalizedDirectLine
    if (emails !== undefined) updateData.emails = emails && emails.length > 0 ? JSON.stringify(emails) : "[]"
    if (managerName !== undefined) updateData.managerName = managerName
    if (note !== undefined) updateData.note = note || null
    if (order !== undefined) updateData.order = order

    const contact = await prisma.contact.update({
      where: { id: params.id },
      data: updateData,
    })

    await createLog(session.id, "CONTACT_MODIFIE", {
      contactId: params.id,
    }, request)

    return NextResponse.json(contact)
  } catch (error: any) {
    console.error("Error updating contact:", error)
    // Si le contact n'existe pas, retourner 404
    if (error?.code === 'P2025') {
      return NextResponse.json(
        { error: "Contact non trouvé" },
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
    await prisma.contact.delete({
      where: { id: params.id },
    })

    await createLog(session.id, "CONTACT_SUPPRIME", {
      contactId: params.id,
    }, request)

    return NextResponse.json({ success: true })
  } catch (error: any) {
    console.error("Error deleting contact:", error)
    // Si le contact n'existe pas, retourner 404
    if (error?.code === 'P2025') {
      return NextResponse.json(
        { error: "Contact non trouvé" },
        { status: 404 }
      )
    }
    return NextResponse.json(
      { error: "Erreur serveur" },
      { status: 500 }
    )
  }
}

