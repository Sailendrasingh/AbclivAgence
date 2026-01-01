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
    const { key, value, order } = body

    const updateData: any = {}
    if (key !== undefined) updateData.key = key
    if (value !== undefined) updateData.value = value
    if (order !== undefined) updateData.order = order

    const dynamicField = await prisma.dynamicField.update({
      where: { id: params.id },
      data: updateData,
    })

    await createLog(session.id, "CHAMP_DYNAMIQUE_MODIFIE", {
      dynamicFieldId: params.id,
    }, request)

    return NextResponse.json(dynamicField)
  } catch (error) {
    console.error("Error updating dynamic field:", error)
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
    await prisma.dynamicField.delete({
      where: { id: params.id },
    })

    await createLog(session.id, "CHAMP_DYNAMIQUE_SUPPRIME", {
      dynamicFieldId: params.id,
    }, request)

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error("Error deleting dynamic field:", error)
    return NextResponse.json(
      { error: "Erreur serveur" },
      { status: 500 }
    )
  }
}

