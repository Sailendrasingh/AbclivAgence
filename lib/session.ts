import { cookies } from "next/headers"
import { prisma } from "./prisma"

export async function getSession() {
  const cookieStore = await cookies()
  const sessionId = cookieStore.get("session")?.value

  if (!sessionId) {
    return null
  }

  // En production, utiliser une table Session dédiée
  // Pour l'instant, on vérifie juste que l'utilisateur existe
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

export async function createSession(userId: string) {
  const cookieStore = await cookies()
  cookieStore.set("session", userId, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    maxAge: 60 * 60 * 24 * 7, // 7 jours
  })
}

export async function destroySession() {
  const cookieStore = await cookies()
  cookieStore.delete("session")
}

