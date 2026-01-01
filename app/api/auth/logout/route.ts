import { NextResponse } from "next/server"
import { getSession } from "@/lib/session"
import { createLog } from "@/lib/logs"

export async function POST() {
  const session = await getSession()
  
  if (session) {
    await createLog(session.id, "DECONNEXION", null)
  }

  // Supprimer le cookie de session dans la réponse
  const response = NextResponse.json({ success: true })
  response.cookies.delete("session")

  return response
}

