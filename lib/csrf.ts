import { cookies } from "next/headers"
import { randomBytes } from "crypto"

const CSRF_TOKEN_COOKIE = "csrf-token"
const CSRF_TOKEN_HEADER = "x-csrf-token"
const CSRF_TOKEN_LENGTH = 32 // 256 bits

/**
 * Génère un token CSRF cryptographiquement sécurisé
 */
export function generateCSRFToken(): string {
  return randomBytes(CSRF_TOKEN_LENGTH).toString("hex")
}

/**
 * Récupère le token CSRF depuis les cookies
 */
export async function getCSRFToken(): Promise<string | null> {
  const cookieStore = await cookies()
  return cookieStore.get(CSRF_TOKEN_COOKIE)?.value || null
}

/**
 * Définit le token CSRF dans les cookies
 */
export async function setCSRFToken(token: string): Promise<void> {
  const cookieStore = await cookies()
  cookieStore.set(CSRF_TOKEN_COOKIE, token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict",
    maxAge: 60 * 60 * 24, // 24 heures
    path: "/",
  })
}

/**
 * Génère un nouveau token CSRF et le définit dans les cookies
 */
export async function createCSRFToken(): Promise<string> {
  const token = generateCSRFToken()
  await setCSRFToken(token)
  return token
}

/**
 * Vérifie que le token CSRF fourni correspond au token stocké dans les cookies
 */
export async function verifyCSRFToken(token: string | null): Promise<boolean> {
  if (!token) {
    return false
  }

  const storedToken = await getCSRFToken()
  if (!storedToken) {
    return false
  }

  // Comparaison en temps constant pour éviter les attaques par timing
  return constantTimeEqual(token, storedToken)
}

/**
 * Comparaison en temps constant pour éviter les attaques par timing
 */
function constantTimeEqual(a: string, b: string): boolean {
  if (a.length !== b.length) {
    return false
  }

  let result = 0
  for (let i = 0; i < a.length; i++) {
    result |= a.charCodeAt(i) ^ b.charCodeAt(i)
  }

  return result === 0
}

/**
 * Récupère le token CSRF depuis les headers de la requête
 * Note: Pour FormData, utiliser getCSRFTokenFromFormData() après avoir parsé le FormData
 */
export function getCSRFTokenFromRequest(request: Request): string | null {
  return request.headers.get(CSRF_TOKEN_HEADER)
}

/**
 * Récupère le token CSRF depuis un FormData déjà parsé
 */
export function getCSRFTokenFromFormData(formData: FormData): string | null {
  const token = formData.get("_csrf")
  return token && typeof token === "string" ? token : null
}

/**
 * Valide le token CSRF sur les requêtes modifiantes
 */
export async function validateCSRF(request: Request): Promise<{
  valid: boolean
  error?: string
}> {
  // Seulement pour les méthodes modifiantes
  const method = request.method
  if (!["POST", "PUT", "PATCH", "DELETE"].includes(method)) {
    return { valid: true }
  }

  const token = getCSRFTokenFromRequest(request)
  const isValid = await verifyCSRFToken(token || undefined)

  if (!isValid) {
    return {
      valid: false,
      error: "Token CSRF invalide ou manquant",
    }
  }

  return { valid: true }
}

