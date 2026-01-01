import { NextRequest, NextResponse } from "next/server"
import { getSession } from "@/lib/session"

export async function GET(request: NextRequest) {
  const session = await getSession()

  if (!session) {
    return NextResponse.json({ error: "Non autorisé" }, { status: 401 })
  }

  return NextResponse.json({
    id: session.id,
    login: session.login,
    role: session.role,
    twoFactorEnabled: session.twoFactorEnabled,
  })
}

