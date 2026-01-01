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
    const { technicalId, key, value, order } = body

    if (!technicalId || !key || value === undefined) {
      return NextResponse.json(
        { error: "technicalId, key et value requis" },
        { status: 400 }
      )
    }

    const dynamicField = await prisma.dynamicField.create({
      data: {
        technicalId,
        key,
        value,
        order: order || 0,
      },
    })

    await createLog(session.id, "CHAMP_DYNAMIQUE_CREE", {
      dynamicFieldId: dynamicField.id,
      technicalId,
    }, request)

    return NextResponse.json(dynamicField, { status: 201 })
  } catch (error) {
    console.error("Error creating dynamic field:", error)
    return NextResponse.json(
      { error: "Erreur serveur" },
      { status: 500 }
    )
  }
}

