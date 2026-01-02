import { NextRequest, NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"
import { getSession } from "@/lib/session"
import { createLog } from "@/lib/logs"
import { hashPassword } from "@/lib/auth"
import { requireCSRF } from "@/lib/csrf-middleware"

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
  if (!session || session.role !== "Super Admin") {
    return NextResponse.json({ error: "Non autorisé" }, { status: 401 })
  }

  try {
    // Vérifier si l'utilisateur est Admin avant toute modification
    const existingUser = await prisma.user.findUnique({
      where: { id: params.id },
      select: { login: true },
    })

    if (existingUser?.login === "Admin") {
      return NextResponse.json(
        { error: "Le compte Admin ne peut pas être modifié" },
        { status: 403 }
      )
    }

    const body = await request.json()
    const { login, password, role, active } = body

    const updateData: any = {}
    if (login) updateData.login = login
    if (password) updateData.passwordHash = await hashPassword(password)
    if (role) updateData.role = role
    if (active !== undefined) updateData.active = active

    const user = await prisma.user.update({
      where: { id: params.id },
      data: updateData,
    })

    await createLog(session.id, "UTILISATEUR_MODIFIE", {
      userId: params.id,
    }, request)

    return NextResponse.json({
      id: user.id,
      login: user.login,
      role: user.role,
      active: user.active,
    })
  } catch (error) {
    console.error("Error updating user:", error)
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
  if (!session || session.role !== "Super Admin") {
    return NextResponse.json({ error: "Non autorisé" }, { status: 401 })
  }

  try {
    // Vérifier si l'utilisateur est Admin avant suppression
    const existingUser = await prisma.user.findUnique({
      where: { id: params.id },
      select: { login: true },
    })

    if (existingUser?.login === "Admin") {
      return NextResponse.json(
        { error: "Le compte Admin ne peut pas être supprimé" },
        { status: 403 }
      )
    }

    await prisma.user.delete({
      where: { id: params.id },
    })

    await createLog(session.id, "UTILISATEUR_SUPPRIME", {
      userId: params.id,
    }, request)

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error("Error deleting user:", error)
    return NextResponse.json(
      { error: "Erreur serveur" },
      { status: 500 }
    )
  }
}

