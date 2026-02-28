import { NextRequest, NextResponse } from "next/server"
import { getSession } from "@/lib/session"
import { requireCSRF } from "@/lib/csrf-middleware"
import { resolveAlert } from "@/lib/alerts"
import { createLog } from "@/lib/logs"

export async function POST(
  request: NextRequest,
  context: { params: Promise<{ id: string }> }
) {
  const { id } = await context.params
  const session = await getSession()
  if (!session) {
    return NextResponse.json({ error: "Non autorisé" }, { status: 401 })
  }

  const csrfError = await requireCSRF(request)
  if (csrfError) return csrfError

  // Seul le Super Admin peut résoudre les alertes
  if (session.role !== "Super Admin") {
    return NextResponse.json({ error: "Accès refusé" }, { status: 403 })
  }

  try {
    await resolveAlert(id, session.id)
    
    await createLog(session.id, "ALERTE_RESOLUE", {
      alertId: id,
    }, request)

    return NextResponse.json({ success: true })
  } catch (error) {
    const { logError } = await import("@/lib/logger")
    logError("Error resolving alert", error, { alertId: id })
    return NextResponse.json(
      { error: "Erreur serveur" },
      { status: 500 }
    )
  }
}

