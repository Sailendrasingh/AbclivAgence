import { NextRequest, NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"
import { getSession } from "@/lib/session"
import { createLog } from "@/lib/logs"
import { hashPassword } from "@/lib/auth"
import { requireCSRF } from "@/lib/csrf-middleware"
import { sanitize } from "@/lib/sanitize"
import { updateUserSchema } from "@/lib/validations"
import { validateRequest } from "@/lib/validation-middleware"
import { alertSensitiveAction } from "@/lib/alerts"

export async function PUT(
  request: NextRequest,
  context: { params: Promise<{ id: string }> }
) {
  // Vérifier le token CSRF
  const csrfError = await requireCSRF(request)
  if (csrfError) {
    return csrfError
  }

  const { id } = await context.params
  const session = await getSession()
  if (!session || session.role !== "Super Admin") {
    return NextResponse.json({ error: "Non autorisé" }, { status: 401 })
  }

  // Vérifier que le 2FA est activé pour les Super Admin
  const { requireTwoFactorForSuperAdmin } = await import("@/lib/require-two-factor")
  const twoFactorError = await requireTwoFactorForSuperAdmin(request)
  if (twoFactorError) {
    return twoFactorError
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

    // Alerter sur l'action sensible
    const ipAddress = request.headers.get("x-forwarded-for") || 
                     request.headers.get("x-real-ip") || 
                     null
    await alertSensitiveAction("UTILISATEUR_MODIFIE", session.id, {
      userId: id,
    }, ipAddress)

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
  context: { params: Promise<{ id: string }> }
) {
  // Vérifier le token CSRF
  const csrfError = await requireCSRF(request)
  if (csrfError) {
    return csrfError
  }

  const { id } = await context.params
  const session = await getSession()
  if (!session || session.role !== "Super Admin") {
    return NextResponse.json({ error: "Non autorisé" }, { status: 401 })
  }

  // Vérifier que le 2FA est activé pour les Super Admin
  const { requireTwoFactorForSuperAdmin } = await import("@/lib/require-two-factor")
  const twoFactorError = await requireTwoFactorForSuperAdmin(request)
  if (twoFactorError) {
    return twoFactorError
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

    // Alerter sur l'action sensible
    const ipAddress = request.headers.get("x-forwarded-for") || 
                     request.headers.get("x-real-ip") || 
                     null
    await alertSensitiveAction("UTILISATEUR_SUPPRIME", session.id, {
      userId: id,
    }, ipAddress)

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error("Error deleting user:", error)
    return NextResponse.json(
      { error: "Erreur serveur" },
      { status: 500 }
    )
  }
}

