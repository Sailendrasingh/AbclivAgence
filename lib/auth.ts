import argon2 from "argon2"
import { prisma } from "./prisma"
import { TOTP, Secret } from "otpauth"
import QRCode from "qrcode"

export async function hashPassword(password: string): Promise<string> {
  return await argon2.hash(password)
}

export async function verifyPassword(
  hash: string,
  password: string
): Promise<boolean> {
  try {
    console.log(`[VERIFY PASSWORD] Hash length: ${hash.length}, Password length: ${password.length}`)
    console.log(`[VERIFY PASSWORD] Hash starts with $argon2: ${hash.startsWith('$argon2')}`)
    const result = await argon2.verify(hash, password)
    console.log(`[VERIFY PASSWORD] Result: ${result}`)
    return result
  } catch (error) {
    console.error("Error verifying password:", error)
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
  return await QRCode.toDataURL(uri)
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

