/**
 * Gestion sécurisée des sessions avec tokens aléatoires
 * Conforme ASVS Niveau 3
 */

import { cookies } from "next/headers"
import { prisma } from "./prisma"
import { randomBytes } from "crypto"

const SESSION_COOKIE = "session"
const SESSION_TOKEN_LENGTH = 32 // 256 bits (32 bytes = 64 caractères hex)
const SESSION_DURATION_MS = 60 * 60 * 24 * 7 * 1000 // 7 jours

export interface Session {
  id: string
  userId: string
  login: string
  role: string
  twoFactorEnabled: boolean
}

/**
 * Génère un token de session cryptographiquement sécurisé (256 bits)
 */
function generateSessionToken(): string {
  return randomBytes(SESSION_TOKEN_LENGTH).toString("hex")
}

/**
 * Crée une nouvelle session sécurisée pour un utilisateur
 * @param userId - ID de l'utilisateur
 * @param response - Optionnel : NextResponse sur laquelle définir le cookie
 * @returns Le token de session généré
 */
export async function createSecureSession(userId: string, response?: any): Promise<string> {
  // Vérifier que l'utilisateur existe et est actif
  const user = await prisma.user.findUnique({
    where: { id: userId },
    select: {
      id: true,
      login: true,
      role: true,
      twoFactorEnabled: true,
      active: true,
    },
  })

  if (!user || !user.active) {
    throw new Error("Utilisateur non trouvé ou inactif")
  }

  // Générer un token aléatoire unique
  const token = generateSessionToken()
  const expiresAt = new Date(Date.now() + SESSION_DURATION_MS)

  // Créer la session dans la base de données
  // La table Session devrait déjà exister (vérifiée par ensureSessionTable)
  await prisma.session.create({
    data: {
      token,
      userId,
      expiresAt,
    },
  })

  // Définir le cookie de session
  // Détecter automatiquement si on est en HTTPS ou HTTP
  // En production avec HTTPS, secure: true est requis par OWASP
  // En développement local avec HTTP, secure: false est nécessaire
  const isSecure = process.env.NODE_ENV === "production" && 
                   process.env.ALLOW_INSECURE_COOKIES !== "true"
  
  const cookieOptions = {
    httpOnly: true,
    secure: isSecure, // true en production HTTPS, false en développement HTTP
    sameSite: "lax" as const, // OWASP recommande "lax" (équilibre sécurité/fonctionnalité)
    maxAge: 60 * 60 * 24 * 7, // 7 jours
    path: "/",
  }

  if (response) {
    // Si une réponse est fournie, définir le cookie dessus
    response.cookies.set(SESSION_COOKIE, token, cookieOptions)
  } else {
    // Sinon, utiliser cookies() pour définir le cookie dans le contexte
    const cookieStore = await cookies()
    cookieStore.set(SESSION_COOKIE, token, cookieOptions)
  }

  return token
}

/**
 * Récupère la session depuis le token stocké dans le cookie
 * @returns Les informations de session ou null si invalide
 */
export async function getSecureSession(): Promise<Session | null> {
  const cookieStore = await cookies()
  const token = cookieStore.get(SESSION_COOKIE)?.value

  if (!token) {
    return null
  }

  try {
    // Récupérer la session depuis la base de données
    const session = await prisma.session.findUnique({
      where: { token },
      include: {
        user: {
          select: {
            id: true,
            login: true,
            role: true,
            twoFactorEnabled: true,
            active: true,
          },
        },
      },
    })

    // Vérifier que la session existe, n'est pas expirée et que l'utilisateur est actif
    if (!session || session.expiresAt < new Date() || !session.user.active) {
      // Supprimer la session expirée ou invalide
      await destroySecureSession()
      return null
    }

    // Mettre à jour lastUsedAt
    await prisma.session.update({
      where: { id: session.id },
      data: { lastUsedAt: new Date() },
    })

    return {
      id: session.id,
      userId: session.userId,
      login: session.user.login,
      role: session.user.role,
      twoFactorEnabled: session.user.twoFactorEnabled,
    }
  } catch (error: any) {
    // Si la table Session n'existe pas (code P2021), lancer l'erreur pour déclencher le fallback
    if (error?.code === 'P2021' || error?.message?.includes('does not exist') || error?.message?.includes('no such table')) {
      // Ne pas logger l'erreur - elle est gérée par le fallback dans getSession()
      // Lancer l'erreur pour que getSession() puisse la capturer et utiliser le fallback
      throw error
    }
    console.error("Error getting secure session:", error)
    return null
  }
}

/**
 * Détruit la session actuelle
 */
export async function destroySecureSession(): Promise<void> {
  const cookieStore = await cookies()
  const token = cookieStore.get(SESSION_COOKIE)?.value

  if (token) {
    try {
      // Supprimer la session de la base de données
      await prisma.session.deleteMany({
        where: { token },
      })
    } catch (error) {
      console.error("Error deleting session from DB:", error)
    }
  }

  // Supprimer le cookie
  cookieStore.delete(SESSION_COOKIE)
}

/**
 * Invalide toutes les sessions d'un utilisateur
 * Utile lors du changement de mot de passe ou de la désactivation d'un compte
 * @param userId - ID de l'utilisateur
 */
export async function invalidateAllUserSessions(userId: string): Promise<void> {
  try {
    // Supprimer toutes les sessions de l'utilisateur
    await prisma.session.deleteMany({
      where: { userId },
    })
  } catch (error) {
    console.error("Error invalidating user sessions:", error)
  }
}

/**
 * Nettoie les sessions expirées (à exécuter périodiquement)
 */
export async function cleanupExpiredSessions(): Promise<number> {
  try {
    const result = await prisma.session.deleteMany({
      where: {
        expiresAt: {
          lt: new Date(),
        },
      },
    })
    return result.count
  } catch (error) {
    console.error("Error cleaning up expired sessions:", error)
    return 0
  }
}

