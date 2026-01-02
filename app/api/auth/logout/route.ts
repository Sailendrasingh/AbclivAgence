import { NextRequest, NextResponse } from "next/server"
import { getSecureSession, destroySecureSession } from "@/lib/session-secure"
import { createLog } from "@/lib/logs"
import { validateCSRF } from "@/lib/csrf"

export async function POST(request: NextRequest) {
  // Pour la déconnexion, on valide le CSRF si présent mais on ne bloque pas si invalide
  // Cela permet de se déconnecter même en cas de problème de session/CSRF
  const csrfValidation = await validateCSRF(request)
  if (!csrfValidation.valid) {
    console.warn("[LOGOUT] Token CSRF invalide ou manquant, mais déconnexion autorisée")
  }

  const session = await getSecureSession()
  
  if (session) {
    await createLog(session.userId, "DECONNEXION", null)
  }

  // Détruire la session sécurisée (supprime de la DB et du cookie)
  await destroySecureSession()

  // Supprimer aussi le cookie CSRF
  const response = NextResponse.json({ success: true })
  response.cookies.delete("csrf-token")

  return response
}

