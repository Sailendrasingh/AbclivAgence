/**
 * Ce fichier est maintenu pour la compatibilité avec l'ancien code
 * Il redirige vers la nouvelle gestion de session sécurisée
 */
import { getSecureSession, createSecureSession, destroySecureSession as destroySecure } from "./session-secure"

export interface Session {
  id: string
  login: string
  role: string
  twoFactorEnabled: boolean
}

/**
 * @deprecated Utilisez getSecureSession() à la place
 * Cette fonction est maintenue pour la compatibilité
 * Fallback vers l'ancien système si le modèle Session n'est pas disponible
 */
export async function getSession(): Promise<Session | null> {
  try {
    const secureSession = await getSecureSession()
    if (!secureSession) {
      return null
    }
    
    // Adapter le format pour la compatibilité
    return {
      id: secureSession.userId,
      login: secureSession.login,
      role: secureSession.role,
      twoFactorEnabled: secureSession.twoFactorEnabled,
    }
  } catch (error: any) {
    // Fallback vers l'ancien système si le modèle Session n'est pas disponible
    if (error?.code === 'P2021' || error?.message?.includes('Session') || error?.message?.includes('Prisma') || error?.message?.includes('does not exist')) {
      // Ne logger qu'une seule fois au démarrage pour éviter le spam
      if (!(global as any).__sessionFallbackLogged) {
        console.warn("[SESSION] Table Session non disponible, utilisation du fallback (userId comme sessionId)")
        console.warn("[SESSION] Pour activer les sessions sécurisées: arrêtez le serveur, exécutez 'npx prisma generate', puis redémarrez")
        ;(global as any).__sessionFallbackLogged = true
      }
      const { cookies } = await import("next/headers")
      const { prisma } = await import("./prisma")
      const cookieStore = await cookies()
      const sessionId = cookieStore.get("session")?.value

      if (!sessionId) {
        return null
      }

      try {
        const user = await prisma.user.findFirst({
          where: {
            id: sessionId,
            active: true,
          },
          select: {
            id: true,
            login: true,
            role: true,
            twoFactorEnabled: true,
          },
        })

        return user
      } catch {
        return null
      }
    }
    throw error
  }
}

/**
 * @deprecated Utilisez createSecureSession() à la place
 * Cette fonction est maintenue pour la compatibilité
 * Fallback vers l'ancien système si le modèle Session n'est pas disponible
 */
export async function createSession(userId: string): Promise<void> {
  try {
    await createSecureSession(userId)
  } catch (error: any) {
    // Fallback vers l'ancien système si le modèle Session n'est pas disponible
    if (error?.code === 'P2021' || error?.message?.includes('Session') || error?.message?.includes('Prisma') || error?.message?.includes('does not exist')) {
      // Ne logger qu'une seule fois au démarrage pour éviter le spam
      if (!(global as any).__sessionFallbackLogged) {
        console.warn("[SESSION] Table Session non disponible, utilisation du fallback (userId comme sessionId)")
        console.warn("[SESSION] Pour activer les sessions sécurisées: arrêtez le serveur, exécutez 'npx prisma generate', puis redémarrez")
        ;(global as any).__sessionFallbackLogged = true
      }
      const cookieStore = await (await import("next/headers")).cookies()
      // Détecter automatiquement si on est en HTTPS ou HTTP
      // En production avec HTTPS, secure: true est requis par OWASP
      // En développement local avec HTTP, secure: false est nécessaire
      const isSecure = process.env.NODE_ENV === "production" && 
                       process.env.ALLOW_INSECURE_COOKIES !== "true"
      
      cookieStore.set("session", userId, {
        httpOnly: true,
        secure: isSecure, // true en production HTTPS, false en développement HTTP
        sameSite: "lax", // OWASP recommande "lax" (équilibre sécurité/fonctionnalité)
        maxAge: 60 * 60 * 24 * 7, // 7 jours
        path: "/",
        // Ne pas définir de domaine pour permettre l'accès via IP et localhost
        // domain: undefined
      })
      return
    }
    throw error
  }
}

/**
 * @deprecated Utilisez destroySecureSession() à la place
 * Cette fonction est maintenue pour la compatibilité
 */
export async function destroySession(): Promise<void> {
  await destroySecure()
}

