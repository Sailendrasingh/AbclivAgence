import { NextRequest, NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"
import { verifyPassword, verifyTwoFactorToken } from "@/lib/auth"
import { createLog } from "@/lib/logs"
import { checkRateLimit, resetRateLimit } from "@/lib/rate-limit"
import { createCSRFToken } from "@/lib/csrf"
import { ensureSessionTable } from "@/lib/ensure-session-table"
import { checkFailedLoginAttempts } from "@/lib/alerts"
import { getClientIP } from "@/lib/get-client-ip"

const MAX_FAILED_ATTEMPTS = 5
const LOCKOUT_DURATION_MS = 15 * 60 * 1000 // 15 minutes

export async function POST(request: NextRequest) {
  try {
    const { login, password, twoFactorToken } = await request.json()

    if (!login || !password) {
      return NextResponse.json(
        { error: "Identifiant et mot de passe requis" },
        { status: 400 }
      )
    }

    // Rate limiting par IP
    const ipAddress = getClientIP(request) || "unknown"
    const rateLimit = checkRateLimit(`login:${ipAddress}`)
    
    if (!rateLimit.allowed) {
      const minutesLeft = Math.ceil((rateLimit.resetAt - Date.now()) / 60000)
      return NextResponse.json(
        { 
          error: `Trop de tentatives. Réessayez dans ${minutesLeft} minute(s).`,
          lockedUntil: new Date(rateLimit.resetAt).toISOString()
        },
        { status: 429 }
      )
    }

    console.log(`[LOGIN DEBUG] Recherche de l'utilisateur avec login: "${login}" (length: ${login.length})`)
    console.log(`[LOGIN DEBUG] DATABASE_URL: ${process.env.DATABASE_URL}`)
    
    // Lister tous les utilisateurs pour le débogage
    const allUsers = await prisma.user.findMany({
      select: { login: true, active: true },
    })
    console.log(`[LOGIN DEBUG] Total users in database: ${allUsers.length}`)
    console.log(`[LOGIN DEBUG] Users in database:`, allUsers.map(u => `${u.login} (active: ${u.active})`))
    
    const user = await prisma.user.findUnique({
      where: { login },
    })

    if (!user) {
      console.error(`[LOGIN DEBUG] User not found: "${login}"`)
      console.error(`[LOGIN DEBUG] Available logins:`, allUsers.map(u => u.login))
      await createLog(null, "TENTATIVE_CONNEXION_ECHOUEE", {
        login,
        reason: "Utilisateur inexistant",
      }, request)
      
      // Vérifier et alerter sur les tentatives multiples
      const ipAddress = getClientIP(request) || "unknown"
      await checkFailedLoginAttempts(login, ipAddress)
      
      return NextResponse.json(
        { error: "Identifiant ou mot de passe incorrect" },
        { status: 401 }
      )
    }

    if (!user.active) {
      console.error(`User inactive: ${login}`)
      await createLog(user.id, "TENTATIVE_CONNEXION_ECHOUEE", {
        reason: "Utilisateur désactivé",
      }, request)
      
      // Vérifier et alerter sur les tentatives multiples
      const ipAddress = getClientIP(request) || "unknown"
      await checkFailedLoginAttempts(login, ipAddress)
      
      return NextResponse.json(
        { error: "Identifiant ou mot de passe incorrect" },
        { status: 401 }
      )
    }

    // Vérifier si le compte est verrouillé
    if (user.lockedUntil && user.lockedUntil > new Date()) {
      const minutesLeft = Math.ceil((user.lockedUntil.getTime() - Date.now()) / 60000)
      return NextResponse.json(
        { 
          error: `Compte verrouillé. Réessayez dans ${minutesLeft} minute(s).`,
          lockedUntil: user.lockedUntil.toISOString()
        },
        { status: 423 }
      )
    }

    console.log(`[LOGIN DEBUG] Vérification du mot de passe pour: ${login}`)
    console.log(`[LOGIN DEBUG] Hash length: ${user.passwordHash.length}`)
    console.log(`[LOGIN DEBUG] Hash preview: ${user.passwordHash.substring(0, 30)}...`)
    console.log(`[LOGIN DEBUG] Password length: ${password.length}`)
    console.log(`[LOGIN DEBUG] Password preview: ${password.substring(0, 3)}...`)
    
    const isValidPassword = await verifyPassword(user.passwordHash, password)
    
    console.log(`[LOGIN DEBUG] Password valid: ${isValidPassword}`)
    
    if (!isValidPassword) {
      console.error(`Invalid password for user: ${login}`)
      
      // Incrémenter les tentatives échouées
      const newFailedAttempts = (user.failedLoginAttempts || 0) + 1
      const shouldLock = newFailedAttempts >= MAX_FAILED_ATTEMPTS
      
      try {
        await prisma.user.update({
          where: { id: user.id },
          data: {
            failedLoginAttempts: newFailedAttempts,
            lockedUntil: shouldLock 
              ? new Date(Date.now() + LOCKOUT_DURATION_MS)
              : null,
          },
        })
      } catch (updateError: any) {
        // Si l'utilisateur n'existe plus (peut arriver dans les tests), continuer quand même
        if (updateError?.code !== 'P2025') {
          console.error("Error updating failed login attempts:", updateError)
        }
      }
      
      await createLog(user.id, "TENTATIVE_CONNEXION_ECHOUEE", {
        reason: "Mot de passe incorrect",
        failedAttempts: newFailedAttempts,
        locked: shouldLock,
      }, request)
      
      // Vérifier et alerter sur les tentatives multiples
      const ipAddress = getClientIP(request) || "unknown"
      await checkFailedLoginAttempts(login, ipAddress)
      
      if (shouldLock) {
        return NextResponse.json(
          { 
            error: `Compte verrouillé après ${MAX_FAILED_ATTEMPTS} tentatives échouées. Réessayez dans 15 minutes.`,
            lockedUntil: new Date(Date.now() + LOCKOUT_DURATION_MS).toISOString()
          },
          { status: 423 }
        )
      }
      
      return NextResponse.json(
        { error: "Identifiant ou mot de passe incorrect" },
        { status: 401 }
      )
    }

    // Vérifier si le 2FA est obligatoire pour les Super Admin
    const isSuperAdmin = user.role === "Super Admin"
    const twoFactorRequired = isSuperAdmin
    const requiresTwoFactorSetup = twoFactorRequired && !user.twoFactorEnabled
    
    // Si 2FA obligatoire mais non activé, permettre la connexion mais indiquer qu'il faut configurer le 2FA
    // On créera la session pour permettre l'accès à la page de configuration 2FA

    // Si 2FA activé, vérifier le token
    if (user.twoFactorEnabled) {
      if (!twoFactorToken) {
        return NextResponse.json(
          { needsTwoFactor: true },
          { status: 200 }
        )
      }

      if (!user.twoFactorSecret) {
        return NextResponse.json(
          { error: "Configuration 2FA invalide" },
          { status: 401 }
        )
      }

      const isValidToken = verifyTwoFactorToken(
        user.twoFactorSecret,
        twoFactorToken
      )

      if (!isValidToken) {
        // Incrémenter les tentatives échouées pour 2FA
        const newFailedAttempts = (user.failedLoginAttempts || 0) + 1
        const shouldLock = newFailedAttempts >= MAX_FAILED_ATTEMPTS
        
        try {
          await prisma.user.update({
            where: { id: user.id },
            data: {
              failedLoginAttempts: newFailedAttempts,
              lockedUntil: shouldLock 
                ? new Date(Date.now() + LOCKOUT_DURATION_MS)
                : null,
            },
          })
        } catch (updateError: any) {
          // Si l'utilisateur n'existe plus (peut arriver dans les tests), continuer quand même
          if (updateError?.code !== 'P2025') {
            console.error("Error updating failed login attempts:", updateError)
          }
        }
        
        await createLog(user.id, "TENTATIVE_CONNEXION_ECHOUEE", {
          reason: "Code 2FA incorrect",
          failedAttempts: newFailedAttempts,
          locked: shouldLock,
        }, request)
        
        // Vérifier et alerter sur les tentatives multiples
        const ipAddress = request.headers.get("x-forwarded-for") || 
                         request.headers.get("x-real-ip") || 
                         "unknown"
        await checkFailedLoginAttempts(login, ipAddress)
        
        if (shouldLock) {
          return NextResponse.json(
            { 
              error: `Compte verrouillé après ${MAX_FAILED_ATTEMPTS} tentatives échouées. Réessayez dans 15 minutes.`,
              lockedUntil: new Date(Date.now() + LOCKOUT_DURATION_MS).toISOString()
            },
            { status: 423 }
          )
        }
        
        return NextResponse.json(
          { error: "Code 2FA incorrect" },
          { status: 401 }
        )
      }
    }

    // Connexion réussie : réinitialiser les tentatives échouées et déverrouiller
    await prisma.user.update({
      where: { id: user.id },
      data: {
        failedLoginAttempts: 0,
        lockedUntil: null,
      },
    })
    
    // Réinitialiser le rate limiting pour cette IP
    resetRateLimit(`login:${ipAddress}`)
    
    await createLog(user.id, "CONNEXION", null, request)

    // Vérifier et créer la table Session si nécessaire
    try {
      await ensureSessionTable()
    } catch (ensureError: any) {
      console.error("[LOGIN] Erreur lors de ensureSessionTable:", ensureError)
      // Continuer quand même, le fallback prendra le relais
    }

    // Créer une session sécurisée avec token aléatoire
    try {
      const { createSecureSession } = await import("@/lib/session-secure")
      
      // Créer la réponse d'abord
      const response = NextResponse.json({ 
        success: true,
        requiresTwoFactorSetup, // Indiquer si le 2FA doit être configuré
      })
      
      // Créer la session et définir le cookie sur la réponse
      const sessionToken = await createSecureSession(user.id, response)
      
      // Créer un token CSRF pour cette session et le définir sur la réponse
      const csrfToken = await createCSRFToken(response)
      
      // Ajouter le token CSRF dans le corps de la réponse
      const responseData = { 
        success: true,
        csrfToken,
        requiresTwoFactorSetup,
      }
      const finalResponse = NextResponse.json(responseData)
      
      // Copier tous les cookies de la réponse originale (session + CSRF)
      response.cookies.getAll().forEach(cookie => {
        finalResponse.cookies.set(cookie.name, cookie.value, {
          httpOnly: cookie.httpOnly,
          secure: cookie.secure,
          sameSite: cookie.sameSite as any,
          maxAge: cookie.maxAge,
          path: cookie.path,
        })
      })

      console.log(`[LOGIN] Session sécurisée créée pour l'utilisateur ${user.login} (${user.id}) avec token ${sessionToken.substring(0, 16)}...`)
      console.log(`[LOGIN] Cookies dans la réponse:`, finalResponse.cookies.getAll().map(c => c.name))

      return finalResponse
    } catch (sessionError: any) {
      console.error("[LOGIN] Erreur lors de createSecureSession:", sessionError)
      // Si le modèle Session n'est pas disponible, utiliser l'ancien système temporairement
      if (sessionError?.code === 'P2021' || sessionError?.message?.includes('Session') || sessionError?.message?.includes('Prisma') || sessionError?.message?.includes('does not exist')) {
        // Ne logger qu'une seule fois pour éviter le spam
        if (!(global as any).__loginFallbackLogged) {
          console.warn("[LOGIN] Table Session non disponible, utilisation du fallback temporaire")
          console.warn("[LOGIN] Pour activer les sessions sécurisées: arrêtez le serveur, exécutez 'npx prisma generate', puis redémarrez")
          ;(global as any).__loginFallbackLogged = true
        }
        
        try {
          // Fallback temporaire : utiliser l'ancien système de session
          const { createSession } = await import("@/lib/session")
          await createSession(user.id)
          
          // Créer un token CSRF pour cette session
          const csrfToken = await createCSRFToken()

          const response = NextResponse.json({ 
            success: true,
            csrfToken,
            requiresTwoFactorSetup, // Indiquer si le 2FA doit être configuré
          })

          return response
        } catch (fallbackError: any) {
          console.error("[LOGIN] Erreur lors du fallback:", fallbackError)
          throw fallbackError
        }
      }
      throw sessionError
    }
  } catch (error: any) {
    console.error("Login error:", error)
    console.error("Login error stack:", error?.stack)
    console.error("Login error message:", error?.message)
    console.error("Login error code:", error?.code)
    return NextResponse.json(
      { 
        error: "Erreur serveur",
        details: process.env.NODE_ENV === "development" ? error?.message : undefined
      },
      { status: 500 }
    )
  }
}

