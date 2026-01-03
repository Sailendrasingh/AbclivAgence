import { prisma } from "@/lib/prisma"

/**
 * Vérifie si le 2FA est obligatoire pour un utilisateur
 * Le 2FA est obligatoire pour les Super Admin
 */
export function isTwoFactorRequired(role: string): boolean {
  return role === "Super Admin"
}

/**
 * Vérifie si un utilisateur a activé le 2FA
 */
export async function hasTwoFactorEnabled(userId: string): Promise<boolean> {
  try {
    const user = await prisma.user.findUnique({
      where: { id: userId },
      select: { twoFactorEnabled: true },
    })
    return user?.twoFactorEnabled ?? false
  } catch {
    return false
  }
}

/**
 * Vérifie si un utilisateur doit activer le 2FA (obligatoire mais non activé)
 */
export async function mustActivateTwoFactor(userId: string, role: string): Promise<boolean> {
  if (!isTwoFactorRequired(role)) {
    return false
  }
  return !(await hasTwoFactorEnabled(userId))
}

