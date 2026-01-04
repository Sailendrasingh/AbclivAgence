import { NextRequest, NextResponse } from "next/server"
import { getSession } from "@/lib/session"
import { getUnresolvedAlerts, getAlertStats } from "@/lib/alerts"

// GET : Récupérer les alertes non résolues
export async function GET(request: NextRequest) {
  const session = await getSession()
  if (!session) {
    return NextResponse.json({ error: "Non autorisé" }, { status: 401 })
  }

  // Seul le Super Admin peut voir les alertes
  if (session.role !== "Super Admin") {
    return NextResponse.json({ error: "Accès refusé" }, { status: 403 })
  }

  try {
    const { searchParams } = new URL(request.url)
    const limit = parseInt(searchParams.get("limit") || "50")
    const includeStats = searchParams.get("stats") === "true"

    const alerts = await getUnresolvedAlerts(limit)

    if (includeStats) {
      const stats = await getAlertStats()
      return NextResponse.json({ alerts, stats })
    }

    return NextResponse.json(alerts)
  } catch (error) {
    const { logError } = await import("@/lib/logger")
    logError("Error fetching alerts", error)
    return NextResponse.json(
      { error: "Erreur serveur" },
      { status: 500 }
    )
  }
}

