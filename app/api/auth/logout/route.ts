import { NextRequest, NextResponse } from "next/server"
import { getSecureSession, destroySecureSession } from "@/lib/session-secure"
import { createLog } from "@/lib/logs"
import { requireCSRF } from "@/lib/csrf-middleware"

export async function POST(request: NextRequest) {
  const csrfError = await requireCSRF(request)
  if (csrfError) return csrfError

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

