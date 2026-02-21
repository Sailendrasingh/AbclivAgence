import { NextRequest, NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"
import { getSession } from "@/lib/session"
import { createLog } from "@/lib/logs"
import validator from "validator"
import { requireCSRF } from "@/lib/csrf-middleware"
import { sanitize } from "@/lib/sanitize"
import { createContactSchema } from "@/lib/validations"
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
    const validation = await validateRequest(request, createContactSchema)
    if (!validation.success) {
      // Logger les détails de l'erreur pour le débogage
      const errorResponse = await validation.error.clone().json()
      console.error("[CONTACTS] Erreur de validation:", JSON.stringify(errorResponse, null, 2))
      return validation.error
    }

    const {
      agencyId,
      postNumber,
      agentNumber,
      directLine,
      emails,
      managerName,
      note,
    } = validation.data

    // Sanitizer les entrées utilisateur (après validation)
    const sanitizedPostNumber = postNumber ? sanitize(postNumber) : ""
    const sanitizedAgentNumber = agentNumber ? sanitize(agentNumber) : ""
    const sanitizedManagerName = sanitize(managerName)
    const sanitizedNote = note ? sanitize(note) : null

    // Sanitizer les emails (tableau)
    const sanitizedEmails = emails && Array.isArray(emails) 
      ? emails.map((email: string) => sanitize(email))
      : []

    // Normaliser la ligne directe - retirer les espaces pour le stockage
    let normalizedDirectLine = ""
    if (directLine) {
      const cleanedDirectLine = directLine.replace(/\s/g, "")
      // Normaliser au format avec espaces pour le stockage
      normalizedDirectLine = cleanedDirectLine.match(/.{1,2}/g)?.join(" ") || cleanedDirectLine
    }

    // Calculer l'ordre pour le nouveau contact (maximum + 1)
    const maxOrder = await prisma.contact.findFirst({
      where: { agencyId },
      orderBy: { order: "desc" },
      select: { order: true },
    })
    const newOrder = (maxOrder?.order ?? -1) + 1

    const contact = await prisma.contact.create({
      data: {
        agencyId,
        postNumber: sanitizedPostNumber,
        agentNumber: sanitizedAgentNumber,
        directLine: normalizedDirectLine,
        emails: sanitizedEmails.length > 0 ? JSON.stringify(sanitizedEmails) : "[]",
        managerName: sanitizedManagerName,
        note: sanitizedNote,
        order: newOrder,
      },
    })

    await createLog(session.id, "CONTACT_CREE", {
      contactId: contact.id,
      agencyId,
    }, request)

    return NextResponse.json(contact, { status: 201 })
  } catch (error: any) {
    console.error("Error creating contact:", error)
    return NextResponse.json(
      { error: error.message || "Erreur serveur" },
      { status: 500 }
    )
  }
}

