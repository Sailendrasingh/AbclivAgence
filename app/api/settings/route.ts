import { NextRequest, NextResponse } from "next/server"
import { getSession } from "@/lib/session"
import { prisma } from "@/lib/prisma"

export async function GET(request: NextRequest) {
  try {
    const session = await getSession()
    
    // Log pour debug
    console.log("[SETTINGS GET] Session:", session ? { id: session.id, login: session.login, role: session.role } : "null")
    
    // Vérifier les cookies reçus
    const cookieHeader = request.headers.get("cookie")
    console.log("[SETTINGS GET] Cookie header:", cookieHeader ? "présent" : "absent")
    
    if (!session) {
      console.log("[SETTINGS GET] Pas de session, retour 401")
      return NextResponse.json({ error: "Non autorisé" }, { status: 401 })
    }

    // Tous les utilisateurs connectés peuvent lire les paramètres (notamment pour le sessionTimeout)
    // Seul le Super Admin peut modifier les paramètres (voir PUT)

    let settings = await prisma.appSettings.findUnique({
      where: { id: "settings" },
    })

    // Si les paramètres n'existent pas, les créer avec les valeurs par défaut
    if (!settings) {
      settings = await prisma.appSettings.create({
        data: {
          id: "settings",
          sessionTimeout: 60, // 1 minute par défaut
        },
      })
    }

    return NextResponse.json(settings)
  } catch (error) {
    console.error("Error fetching settings:", error)
    const errorMessage = error instanceof Error ? error.message : "Erreur inconnue"
    console.error("Error details:", errorMessage)
    return NextResponse.json(
      { error: `Erreur serveur: ${errorMessage}` },
      { status: 500 }
    )
  }
}

export async function PUT(request: NextRequest) {
  const session = await getSession()
  if (!session) {
    return NextResponse.json({ error: "Non autorisé" }, { status: 401 })
  }

  // Seul le Super Admin peut modifier les paramètres
  if (session.role !== "Super Admin") {
    return NextResponse.json({ error: "Accès refusé" }, { status: 403 })
  }

  try {
    const body = await request.json()
    const { sessionTimeout } = body

    // Convertir en nombre si nécessaire
    const timeoutValue = typeof sessionTimeout === "string" ? parseInt(sessionTimeout, 10) : Number(sessionTimeout)

    if (!timeoutValue || isNaN(timeoutValue) || timeoutValue < 1) {
      return NextResponse.json(
        { error: "La durée de session doit être un nombre positif d'au moins 1 minute" },
        { status: 400 }
      )
    }

    const settings = await prisma.appSettings.upsert({
      where: { id: "settings" },
      update: {
        sessionTimeout: timeoutValue,
      },
      create: {
        id: "settings",
        sessionTimeout: timeoutValue,
      },
    })

    return NextResponse.json(settings)
  } catch (error) {
    console.error("Error updating settings:", error)
    const errorMessage = error instanceof Error ? error.message : "Erreur inconnue"
    return NextResponse.json(
      { error: `Erreur serveur: ${errorMessage}` },
      { status: 500 }
    )
  }
}
