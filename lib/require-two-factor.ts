import { NextRequest, NextResponse } from "next/server"
import { getSession } from "@/lib/session"
import { mustActivateTwoFactor } from "@/lib/two-factor-required"

/**
 * Middleware pour vérifier que les Super Admin ont activé le 2FA
 * Retourne une erreur si le 2FA est obligatoire mais non activé
 */
export async function requireTwoFactorForSuperAdmin(
  request: NextRequest
): Promise<NextResponse | null> {
  const session = await getSession()
  
  if (!session) {
    return NextResponse.json(
      { error: "Non autorisé" },
      { status: 401 }
    )
  }

  // Vérifier si le 2FA doit être activé
  const mustActivate = await mustActivateTwoFactor(session.id, session.role)
  
  if (mustActivate) {
    return NextResponse.json(
      {
        error: "L'authentification à deux facteurs (2FA) est obligatoire pour les Super Admin. Veuillez activer le 2FA depuis votre profil.",
        requiresTwoFactorSetup: true,
        userId: session.id,
      },
      { status: 403 }
    )
  }

  return null
}

