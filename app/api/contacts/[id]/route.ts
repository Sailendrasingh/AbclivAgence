import { NextRequest, NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"
import { getSession } from "@/lib/session"
import { createLog } from "@/lib/logs"
import validator from "validator"
import { requireCSRF } from "@/lib/csrf-middleware"
import { sanitize } from "@/lib/sanitize"
import { updateContactSchema } from "@/lib/validations"
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
    const validation = await validateRequest(request, updateContactSchema)
    if (!validation.success) {
      return validation.error
    }

    const {
      postNumber,
      agentNumber,
      directLine,
      emails,
      managerName,
      note,
      order,
    } = validation.data

    // Sanitizer les entrées utilisateur (après validation)
    const sanitizedPostNumber = postNumber ? sanitize(postNumber) : ""
    const sanitizedAgentNumber = agentNumber ? sanitize(agentNumber) : ""
    const sanitizedManagerName = managerName ? sanitize(managerName) : undefined
    const sanitizedNote = note ? sanitize(note) : null

    // Sanitizer les emails (tableau)
    const sanitizedEmails = emails && Array.isArray(emails)
      ? emails.map((email: string) => sanitize(email))
      : undefined

    // Normaliser la ligne directe - retirer les espaces pour le stockage
    let normalizedDirectLine: string | undefined = undefined
    if (directLine !== undefined) {
      if (directLine) {
        const cleanedDirectLine = directLine.replace(/\s/g, "")
        // Normaliser au format avec espaces pour le stockage
        normalizedDirectLine = cleanedDirectLine.match(/.{1,2}/g)?.join(" ") || cleanedDirectLine
      } else {
        normalizedDirectLine = ""
      }
    }

    const updateData: any = {}
    if (postNumber !== undefined) updateData.postNumber = sanitizedPostNumber
    if (agentNumber !== undefined) updateData.agentNumber = sanitizedAgentNumber
    if (normalizedDirectLine !== undefined) updateData.directLine = normalizedDirectLine
    if (sanitizedEmails !== undefined) updateData.emails = sanitizedEmails.length > 0 ? JSON.stringify(sanitizedEmails) : "[]"
    if (sanitizedManagerName !== undefined) updateData.managerName = sanitizedManagerName
    if (sanitizedNote !== undefined) updateData.note = sanitizedNote
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

