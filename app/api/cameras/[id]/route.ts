import { NextRequest, NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"
import { getSession } from "@/lib/session"
import { createLog } from "@/lib/logs"

export async function PUT(
  request: NextRequest,
  { params }: Promise<{ params: { id: string } }>
) {
  const { id } = await params
  const session = await getSession()
  if (!session) {
    return NextResponse.json({ error: "Non autorisé" }, { status: 401 })
  }

  try {
    const body = await request.json()
    const { brand, model, type, ip } = body

    const updateData: any = {}
    if (brand !== undefined) updateData.brand = brand
    if (model !== undefined) updateData.model = model
    if (type !== undefined) updateData.type = type
    if (ip !== undefined) updateData.ip = ip

    const camera = await prisma.camera.update({
      where: { id },
      data: updateData,
    })

    await createLog(session.id, "CAMERA_MODIFIEE", {
      cameraId: id,
    }, request)

    return NextResponse.json(camera)
  } catch (error) {
    console.error("Error updating camera:", error)
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
  const session = await getSession()
  if (!session) {
    return NextResponse.json({ error: "Non autorisé" }, { status: 401 })
  }

  try {
    await prisma.camera.delete({
      where: { id },
    })

    await createLog(session.id, "CAMERA_SUPPRIMEE", {
      cameraId: id,
    }, request)

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error("Error deleting camera:", error)
    return NextResponse.json(
      { error: "Erreur serveur" },
      { status: 500 }
    )
  }
}

