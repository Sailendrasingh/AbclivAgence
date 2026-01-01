import { NextRequest, NextResponse } from "next/server"
import { getSession } from "@/lib/session"

// API BAN : https://api-adresse.data.gouv.fr/search/

export async function GET(request: NextRequest) {
  const session = await getSession()
  if (!session) {
    return NextResponse.json({ error: "Non autorisé" }, { status: 401 })
  }

  const { searchParams } = new URL(request.url)
  const query = searchParams.get("q")
  const limit = searchParams.get("limit") || "10"

  if (!query) {
    return NextResponse.json(
      { error: "Paramètre 'q' requis" },
      { status: 400 }
    )
  }

  try {
    // Appel à l'API BAN
    const banUrl = `https://api-adresse.data.gouv.fr/search/?q=${encodeURIComponent(query)}&limit=${limit}`
    const response = await fetch(banUrl)
    const data = await response.json()

    return NextResponse.json(data)
  } catch (error) {
    console.error("Error searching BAN:", error)
    return NextResponse.json(
      { error: "Erreur lors de la recherche" },
      { status: 500 }
    )
  }
}

