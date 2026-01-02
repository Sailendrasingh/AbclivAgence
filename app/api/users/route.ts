import { NextRequest, NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"
import { getSession } from "@/lib/session"
import { createLog } from "@/lib/logs"
import { hashPassword } from "@/lib/auth"
import { requireCSRF } from "@/lib/csrf-middleware"

export async function GET(request: NextRequest) {
  const session = await getSession()
  if (!session || session.role !== "Super Admin") {
    return NextResponse.json({ error: "Non autorisé" }, { status: 401 })
  }

  try {
    const users = await prisma.user.findMany({
      orderBy: { createdAt: "desc" },
      select: {
        id: true,
        login: true,
        role: true,
        twoFactorEnabled: true,
        active: true,
        createdAt: true,
        updatedAt: true,
      },
    })

    return NextResponse.json(users)
  } catch (error) {
    console.error("Error fetching users:", error)
    return NextResponse.json(
      { error: "Erreur serveur" },
      { status: 500 }
    )
  }
}

export async function POST(request: NextRequest) {
  // Vérifier le token CSRF
  const csrfError = await requireCSRF(request)
  if (csrfError) {
    return csrfError
  }

  const session = await getSession()
  if (!session || session.role !== "Super Admin") {
    return NextResponse.json({ error: "Non autorisé" }, { status: 401 })
  }

  try {
    const body = await request.json()
    const { login, password, role } = body

    if (!login || !password) {
      return NextResponse.json(
        { error: "Login et mot de passe requis" },
        { status: 400 }
      )
    }

    const passwordHash = await hashPassword(password)

    const user = await prisma.user.create({
      data: {
        login,
        passwordHash,
        role: role || "User",
        active: true,
      },
    })

    await createLog(session.id, "UTILISATEUR_CREE", {
      userId: user.id,
      login,
    }, request)

    return NextResponse.json(
      { id: user.id, login: user.login, role: user.role },
      { status: 201 }
    )
  } catch (error) {
    console.error("Error creating user:", error)
    return NextResponse.json(
      { error: "Erreur serveur" },
      { status: 500 }
    )
  }
}

