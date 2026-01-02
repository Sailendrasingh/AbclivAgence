import { NextRequest, NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"
import { verifyPassword, verifyTwoFactorToken } from "@/lib/auth"
import { createLog } from "@/lib/logs"
import { checkRateLimit, resetRateLimit } from "@/lib/rate-limit"

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
    const ipAddress = request.headers.get("x-forwarded-for") || 
                     request.headers.get("x-real-ip") || 
                     request.ip || 
                     "unknown"
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

    // Créer la réponse avec le cookie de session
    const response = NextResponse.json({ success: true })
    
    // Définir le cookie de session dans la réponse
    response.cookies.set("session", user.id, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      path: "/", // Important : définir le path pour que le cookie soit accessible partout
      maxAge: 60 * 60 * 24 * 7, // 7 jours
    })

    console.log(`[LOGIN] Session créée pour l'utilisateur ${user.login} (${user.id})`)
    console.log(`[LOGIN] Cookie défini: session=${user.id}`)

    return response
  } catch (error) {
    console.error("Login error:", error)
    return NextResponse.json(
      { error: "Erreur serveur" },
      { status: 500 }
    )
  }
}

