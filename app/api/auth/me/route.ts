import { NextRequest, NextResponse } from "next/server"
import { getSession } from "@/lib/session"
import { getCSRFToken, createCSRFToken } from "@/lib/csrf"
import { mustActivateTwoFactor } from "@/lib/two-factor-required"
import { prisma } from "@/lib/prisma"

export async function GET(request: NextRequest) {
  const session = await getSession()

  if (!session) {
    return NextResponse.json({ error: "Non autorisé" }, { status: 401 })
  }

  try {
    // Vérifier si le 2FA doit être activé pour les Super Admin
    const requiresTwoFactorSetup = await mustActivateTwoFactor(session.id, session.role)

    // Récupérer la photo de l'utilisateur
    let userPhoto: string | null = null
    try {
      const user = await prisma.user.findUnique({
        where: { id: session.id },
        select: { photo: true },
      })
      userPhoto = user?.photo || null
    } catch (photoError: any) {
      console.error("[AUTH/ME] Erreur lors de la récupération de la photo:", photoError)
      // Continuer sans la photo si erreur
    }

    // Récupérer ou créer le token CSRF
    let csrfToken = await getCSRFToken()
    
    // Si pas de token, en créer un nouveau
    if (!csrfToken) {
      csrfToken = await createCSRFToken()
    }

    return NextResponse.json({
      id: session.id,
      login: session.login,
      role: session.role,
      twoFactorEnabled: session.twoFactorEnabled,
      photo: userPhoto,
      requiresTwoFactorSetup,
      csrfToken,
    })
  } catch (error) {
    console.error("Error in /api/auth/me:", error)
    return NextResponse.json(
      { error: "Erreur serveur" },
      { status: 500 }
    )
  }
}

