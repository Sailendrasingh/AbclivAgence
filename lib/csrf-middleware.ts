import { NextRequest, NextResponse } from "next/server"
import { validateCSRF } from "./csrf"

/**
 * Middleware pour valider le token CSRF sur les requêtes modifiantes
 * À utiliser dans les routes API POST, PUT, PATCH, DELETE
 * 
 * @param request - La requête Next.js
 * @returns null si valide, ou une NextResponse avec erreur 403 si invalide
 */
export async function requireCSRF(request: NextRequest): Promise<NextResponse | null> {
  const validation = await validateCSRF(request)
  
  if (!validation.valid) {
    return NextResponse.json(
      { error: validation.error || "Token CSRF invalide" },
      { status: 403 }
    )
  }
  
  return null
}

