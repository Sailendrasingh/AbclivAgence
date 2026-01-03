import { NextRequest, NextResponse } from "next/server"
import { getSession } from "@/lib/session"
import { getCSRFToken, createCSRFToken } from "@/lib/csrf"
import { mustActivateTwoFactor } from "@/lib/two-factor-required"

export async function GET(request: NextRequest) {
  const session = await getSession()

  if (!session) {
    return NextResponse.json({ error: "Non autorisé" }, { status: 401 })
  }

  // Vérifier si le 2FA doit être activé pour les Super Admin
  const requiresTwoFactorSetup = await mustActivateTwoFactor(session.id, session.role)

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
    requiresTwoFactorSetup,
    csrfToken,
  })
}

