import { NextRequest, NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"
import { getSession } from "@/lib/session"
import { createLog } from "@/lib/logs"
import { hashPassword } from "@/lib/auth"
import { requireCSRF } from "@/lib/csrf-middleware"
import { sanitize } from "@/lib/sanitize"
import { updateUserSchema } from "@/lib/validations"
import { validateRequest } from "@/lib/validation-middleware"

export async function PUT(
  request: NextRequest,
  props: Promise<{ params: { id: string } }>
) {
  const { params } = await props
  // Vérifier le token CSRF
  const csrfError = await requireCSRF(request)
  if (csrfError) {
    return csrfError
  }

  const { id } = await params
  const session = await getSession()
  if (!session || session.role !== "Super Admin") {
    return NextResponse.json({ error: "Non autorisé" }, { status: 401 })
  }

  try {
    // Vérifier si l'utilisateur est Admin avant toute modification
    const existingUser = await prisma.user.findUnique({
      where: { id },
      select: { login: true },
    })

    if (existingUser?.login === "Admin") {
      return NextResponse.json(
        { error: "Le compte Admin ne peut pas être modifié" },
        { status: 403 }
      )
    }

    // Valider les données avec Zod
    const validation = await validateRequest(request, updateUserSchema)
    if (!validation.success) {
      return validation.error
    }

    const { login, password, role, active } = validation.data

    // Sanitizer les entrées utilisateur (après validation)
    const sanitizedLogin = login ? sanitize(login) : undefined
    const sanitizedRole = role ? sanitize(role) : undefined

    const updateData: any = {}
    if (sanitizedLogin) updateData.login = sanitizedLogin
    if (password) updateData.passwordHash = await hashPassword(password)
    if (sanitizedRole) updateData.role = sanitizedRole
    if (active !== undefined) updateData.active = active

    const user = await prisma.user.update({
      where: { id },
      data: updateData,
    })

    await createLog(session.id, "UTILISATEUR_MODIFIE", {
      userId: id,
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
  props: Promise<{ params: { id: string } }>
) {
  const { params } = await props
  // Vérifier le token CSRF
  const csrfError = await requireCSRF(request)
  if (csrfError) {
    return csrfError
  }

  const { id } = await params
  const session = await getSession()
  if (!session || session.role !== "Super Admin") {
    return NextResponse.json({ error: "Non autorisé" }, { status: 401 })
  }

  try {
    // Vérifier si l'utilisateur est Admin avant suppression
    const existingUser = await prisma.user.findUnique({
      where: { id },
      select: { login: true },
    })

    if (existingUser?.login === "Admin") {
      return NextResponse.json(
        { error: "Le compte Admin ne peut pas être supprimé" },
        { status: 403 }
      )
    }

    await prisma.user.delete({
      where: { id },
    })

    await createLog(session.id, "UTILISATEUR_SUPPRIME", {
      userId: id,
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

