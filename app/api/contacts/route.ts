import { NextRequest, NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"
import { getSession } from "@/lib/session"
import { createLog } from "@/lib/logs"
import validator from "validator"

export async function POST(request: NextRequest) {
  const session = await getSession()
  if (!session) {
    return NextResponse.json({ error: "Non autorisé" }, { status: 401 })
  }

  try {
    const body = await request.json()
    const {
      agencyId,
      postNumber,
      agentNumber,
      directLine,
      emails,
      managerName,
      note,
    } = body

    // Validation selon PRD - seul managerName est obligatoire
    if (!agencyId || !managerName) {
      return NextResponse.json(
        { error: "Champs obligatoires manquants" },
        { status: 400 }
      )
    }

    // Validation numéro de poste (6 chiffres exacts) - optionnel
    if (postNumber && !/^\d{6}$/.test(postNumber)) {
      return NextResponse.json(
        { error: "Le numéro de poste doit contenir exactement 6 chiffres" },
        { status: 400 }
      )
    }

    // Validation numéro d'agent (4 chiffres exacts) - optionnel
    if (agentNumber && !/^\d{4}$/.test(agentNumber)) {
      return NextResponse.json(
        { error: "Le numéro d'agent doit contenir exactement 4 chiffres" },
        { status: 400 }
      )
    }

    // Validation ligne directe - optionnel
    // Accepte le format avec espaces (00 00 00 00 00) ou sans espaces (0000000000)
    let normalizedDirectLine = directLine || ""
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
    }

    // Validation emails - optionnel, mais si fourni, doit être valide
    if (emails) {
      if (!Array.isArray(emails)) {
        return NextResponse.json(
          { error: "Les emails doivent être un tableau" },
          { status: 400 }
        )
      }

      for (const email of emails) {
        if (!validator.isEmail(email)) {
          return NextResponse.json(
            { error: `Email invalide: ${email}` },
            { status: 400 }
          )
        }
      }
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
        postNumber: postNumber || "",
        agentNumber: agentNumber || "",
        directLine: normalizedDirectLine,
        emails: emails && emails.length > 0 ? JSON.stringify(emails) : "[]",
        managerName,
        note: note || null,
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

