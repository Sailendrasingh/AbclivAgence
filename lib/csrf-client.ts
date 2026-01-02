/**
 * Fonctions client-side pour gérer le token CSRF
 */

let csrfToken: string | null = null

/**
 * Récupère le token CSRF depuis l'API /api/auth/me
 */
export async function fetchCSRFToken(): Promise<string | null> {
  try {
    const response = await fetch("/api/auth/me", {
      credentials: "include",
    })
    
    if (response.ok) {
      const data = await response.json()
      csrfToken = data.csrfToken || null
      return csrfToken
    }
  } catch (error) {
    console.error("Error fetching CSRF token:", error)
  }
  
  return null
}

/**
 * Récupère le token CSRF (depuis le cache ou l'API)
 */
export async function getCSRFToken(): Promise<string | null> {
  if (csrfToken) {
    return csrfToken
  }
  
  return await fetchCSRFToken()
}

/**
 * Définit le token CSRF manuellement (après login)
 */
export function setCSRFToken(token: string | null): void {
  csrfToken = token
}

/**
 * Réinitialise le token CSRF (après logout)
 */
export function resetCSRFToken(): void {
  csrfToken = null
}

/**
 * Récupère les headers avec le token CSRF pour les requêtes modifiantes
 */
export async function getCSRFHeaders(): Promise<HeadersInit> {
  const token = await getCSRFToken()
  const headers: HeadersInit = {
    "Content-Type": "application/json",
  }
  
  if (token) {
    headers["x-csrf-token"] = token
  }
  
  return headers
}

