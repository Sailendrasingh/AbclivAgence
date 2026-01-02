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
    // Valider les données avec Zod
    const validation = await validateRequest(request, createUserSchema)
    if (!validation.success) {
      return validation.error
    }

    const { login, password, role } = validation.data

    // Sanitizer les entrées utilisateur (après validation)
    const sanitizedLogin = sanitize(login)
    const sanitizedRole = sanitize(role || "User")

    const passwordHash = await hashPassword(password)

    const user = await prisma.user.create({
      data: {
        login: sanitizedLogin,
        passwordHash,
        role: sanitizedRole,
        active: true,
      },
    })

    await createLog(session.id, "UTILISATEUR_CREE", {
      userId: user.id,
      login: sanitizedLogin,
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

