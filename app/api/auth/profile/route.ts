import { NextRequest, NextResponse } from "next/server"
import { getSession } from "@/lib/session"
import { hashPassword } from "@/lib/auth"
import { prisma } from "@/lib/prisma"
import { createLog } from "@/lib/logs"
import { requireCSRF } from "@/lib/csrf-middleware"
import { invalidateAllUserSessions } from "@/lib/session-secure"
import { sanitize } from "@/lib/sanitize"
import { updateProfileSchema } from "@/lib/validations"
import { validateRequest } from "@/lib/validation-middleware"

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
  // Vérifier le token CSRF
  const csrfError = await requireCSRF(request)
  if (csrfError) {
    return csrfError
  }

  const session = await getSession()

  if (!session) {
    return NextResponse.json({ error: "Non autorisé" }, { status: 401 })
  }

  try {
    // Valider les données avec Zod
    const validation = await validateRequest(request, updateProfileSchema)
    if (!validation.success) {
      return validation.error
    }

    const { login, password } = validation.data

    // Sanitizer les entrées utilisateur (après validation)
    const sanitizedLogin = login ? sanitize(login) : undefined

    const updateData: any = {}
    if (sanitizedLogin) updateData.login = sanitizedLogin
    const passwordChanged = !!password
    if (password) {
      updateData.passwordHash = await hashPassword(password)
    }

    const user = await prisma.user.update({
      where: { id: session.id },
      data: updateData,
    })

    // Si le mot de passe a été changé, invalider toutes les sessions de l'utilisateur
    // (sauf la session actuelle qui sera invalidée par le client)
    if (passwordChanged) {
      await invalidateAllUserSessions(session.id)
      console.log(`[PROFILE] Toutes les sessions de l'utilisateur ${session.id} ont été invalidées après changement de mot de passe`)
    }

    await createLog(session.id, "PROFIL_MODIFIE", {
      userId: session.id,
      passwordChanged,
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

