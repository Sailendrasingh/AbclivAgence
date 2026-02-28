import argon2 from "argon2"
import { prisma } from "./prisma"
import { TOTP, Secret } from "otpauth"
import QRCode from "qrcode"

/**
 * Interface pour le résultat de validation de la force d'un mot de passe
 */
export interface PasswordStrengthResult {
  valid: boolean
  errors: string[]
  score: number // Score de 0 à 5 (5 = très fort)
}

/**
 * Politique de mots de passe forts (conforme OWASP Top 10 2021)
 * - Minimum 12 caractères
 * - Au moins une majuscule
 * - Au moins une minuscule
 * - Au moins un chiffre
 * - Au moins un caractère spécial
 */
export function validatePasswordStrength(password: string): PasswordStrengthResult {
  const errors: string[] = []
  let score = 0

  // Longueur minimale : 12 caractères
  if (password.length < 12) {
    errors.push("Le mot de passe doit contenir au moins 12 caractères")
  } else {
    score++
    // Bonus pour longueur supérieure
    if (password.length >= 16) score++
  }

  // Maximum 128 caractères
  if (password.length > 128) {
    errors.push("Le mot de passe ne peut pas dépasser 128 caractères")
  }

  // Au moins une majuscule
  if (!/[A-Z]/.test(password)) {
    errors.push("Le mot de passe doit contenir au moins une majuscule")
  } else {
    score++
  }

  // Au moins une minuscule
  if (!/[a-z]/.test(password)) {
    errors.push("Le mot de passe doit contenir au moins une minuscule")
  } else {
    score++
  }

  // Au moins un chiffre
  if (!/[0-9]/.test(password)) {
    errors.push("Le mot de passe doit contenir au moins un chiffre")
  } else {
    score++
  }

  // Au moins un caractère spécial
  if (!/[^A-Za-z0-9]/.test(password)) {
    errors.push("Le mot de passe doit contenir au moins un caractère spécial (!@#$%^&*()_+-=[]{}|;:,.<>?)")
  } else {
    score++
  }

  return {
    valid: errors.length === 0,
    errors,
    score: Math.min(score, 5), // Score maximum de 5
  }
}

export async function hashPassword(password: string): Promise<string> {
  return await argon2.hash(password)
}

export async function verifyPassword(
  hash: string,
  password: string
): Promise<boolean> {
  try {
    return await argon2.verify(hash, password)
  } catch {
    return false
  }
}

export function generateTwoFactorSecret(login: string): {
  secret: string
  uri: string
} {
  const secret = new Secret()
  const totp = new TOTP({
    issuer: "Gestion Agences",
    label: login,
    secret: secret,
    algorithm: "SHA1",
    digits: 6,
    period: 30,
  })

  return {
    secret: secret.base32,
    uri: totp.toString(),
  }
}

export async function generateQRCode(uri: string): Promise<string> {
  return await QRCode.toDataURL(uri, {
    width: 600,
    margin: 2,
    errorCorrectionLevel: 'M'
  })
}

export function verifyTwoFactorToken(
  secretBase32: string,
  token: string
): boolean {
  try {
    const secret = Secret.fromBase32(secretBase32)
    const totp = new TOTP({
      secret: secret,
      algorithm: "SHA1",
      digits: 6,
      period: 30,
    })

    const delta = totp.validate({ token, window: 1 })
    return delta !== null
  } catch {
    return false
  }
}

export async function createInitialAdmin() {
  const existingAdmin = await prisma.user.findUnique({
    where: { login: "Admin" },
  })

  if (!existingAdmin) {
    const passwordHash = await hashPassword("Password")
    await prisma.user.create({
      data: {
        login: "Admin",
        passwordHash,
        role: "Super Admin",
        active: true,
      },
    })
  }
}

