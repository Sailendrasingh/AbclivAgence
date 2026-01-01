import { NextRequest, NextResponse } from "next/server"
import { getSession } from "@/lib/session"
import { hashPassword } from "@/lib/auth"
import { prisma } from "@/lib/prisma"
import { createLog } from "@/lib/logs"

export async function GET(request: NextRequest) {
  const session = await getSession()

  if (!session) {
    return NextResponse.json({ error: "Non autorisé" }, { status: 401 })
  }

  try {
    const user = await prisma.user.findUnique({
      where: { id: session.id },
      select: {
        id: true,
        login: true,
        role: true,
        active: true,
        twoFactorEnabled: true,
      },
    })

    if (!user) {
      return NextResponse.json({ error: "Utilisateur non trouvé" }, { status: 404 })
    }

    return NextResponse.json(user)
  } catch (error) {
    console.error("Error fetching profile:", error)
    return NextResponse.json(
      { error: "Erreur serveur" },
      { status: 500 }
    )
  }
}

export async function PUT(request: NextRequest) {
  const session = await getSession()

  if (!session) {
    return NextResponse.json({ error: "Non autorisé" }, { status: 401 })
  }

  try {
    const body = await request.json()
    const { login, password } = body

    const updateData: any = {}
    if (login) updateData.login = login
    if (password) {
      updateData.passwordHash = await hashPassword(password)
    }

    const user = await prisma.user.update({
      where: { id: session.id },
      data: updateData,
    })

    await createLog(session.id, "PROFIL_MODIFIE", {
      userId: session.id,
    }, request)

    return NextResponse.json({
      id: user.id,
      login: user.login,
      role: user.role,
      active: user.active,
    })
  } catch (error) {
    console.error("Error updating profile:", error)
    return NextResponse.json(
      { error: "Erreur serveur" },
      { status: 500 }
    )
  }
}

