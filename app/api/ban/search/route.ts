import { NextRequest, NextResponse } from "next/server"
import { getSession } from "@/lib/session"

// API BAN : https://api-adresse.data.gouv.fr/search/
// Timeout : 5 secondes (conforme OWASP Top 10 2021 - A10: SSRF)
const BAN_API_TIMEOUT_MS = 5000

/**
 * Effectue une requête avec timeout
 */
async function fetchWithTimeout(
  url: string,
  options: RequestInit = {},
  timeoutMs: number = BAN_API_TIMEOUT_MS
): Promise<Response> {
  const controller = new AbortController()
  const timeoutId = setTimeout(() => controller.abort(), timeoutMs)

  try {
    const response = await fetch(url, {
      ...options,
      signal: controller.signal,
    })
    clearTimeout(timeoutId)
    return response
  } catch (error: any) {
    clearTimeout(timeoutId)
    if (error.name === "AbortError") {
      throw new Error("Timeout: La requête a pris trop de temps")
    }
    throw error
  }
}

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
    // Appel à l'API BAN avec timeout de 5 secondes
    const banUrl = `https://api-adresse.data.gouv.fr/search/?q=${encodeURIComponent(query)}&limit=${limit}`
    const response = await fetchWithTimeout(banUrl)
    
    if (!response.ok) {
      return NextResponse.json(
        { error: "Erreur lors de la recherche d'adresse" },
        { status: response.status }
      )
    }

    const data = await response.json()

    // Validation basique de la structure de la réponse
    if (!data || typeof data !== "object") {
      return NextResponse.json(
        { error: "Réponse invalide de l'API BAN" },
        { status: 500 }
      )
    }

    return NextResponse.json(data)
  } catch (error: any) {
    console.error("Error searching BAN:", error)
    
    // Gestion spécifique des erreurs de timeout
    if (error.message && error.message.includes("Timeout")) {
      return NextResponse.json(
        { error: "La recherche d'adresse a pris trop de temps. Veuillez réessayer." },
        { status: 504 } // Gateway Timeout
      )
    }

    return NextResponse.json(
      { error: "Erreur lors de la recherche d'adresse" },
      { status: 500 }
    )
  }
}

