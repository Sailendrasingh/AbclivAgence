import { NextRequest, NextResponse } from "next/server"
import { getSession } from "@/lib/session"
import { createLog } from "@/lib/logs"
import { validateCSRF } from "@/lib/csrf"

export async function POST(request: NextRequest) {
  // Pour la déconnexion, on valide le CSRF si présent mais on ne bloque pas si invalide
  // Cela permet de se déconnecter même en cas de problème de session/CSRF
  const csrfValidation = await validateCSRF(request)
  if (!csrfValidation.valid) {
    console.warn("[LOGOUT] Token CSRF invalide ou manquant, mais déconnexion autorisée")
  }

  const session = await getSession()
  
  if (session) {
    await createLog(session.id, "DECONNEXION", null)
  }

  // Supprimer les cookies de session et CSRF dans la réponse
  const response = NextResponse.json({ success: true })
  response.cookies.delete("session")
  response.cookies.delete("csrf-token")

  return response
}

