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
    const { technicalId, brand, model, type, ip } = body

    if (!technicalId) {
      return NextResponse.json(
        { error: "technicalId requis" },
        { status: 400 }
      )
    }

    const camera = await prisma.camera.create({
      data: {
        technicalId,
        brand: brand || null,
        model: model || null,
        type: type || null,
        ip: ip || null,
      },
    })

    await createLog(session.id, "CAMERA_CREE", {
      cameraId: camera.id,
      technicalId,
    }, request)

    return NextResponse.json(camera, { status: 201 })
  } catch (error) {
    console.error("Error creating camera:", error)
    return NextResponse.json(
      { error: "Erreur serveur" },
      { status: 500 }
    )
  }
}

