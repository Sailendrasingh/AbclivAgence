/**
 * Vérifie que la table Session existe (créée par les migrations Prisma).
 * Pour PostgreSQL : exécuter `prisma migrate deploy` avant le premier démarrage.
 */

import { prisma } from "./prisma"

let tableChecked = false

export async function ensureSessionTable(): Promise<void> {
  if (tableChecked) {
    return
  }

  try {
    await prisma.$queryRaw`SELECT 1 FROM "Session" LIMIT 1`
    tableChecked = true
  } catch (error: unknown) {
    const msg = error instanceof Error ? error.message : String(error)
    if (msg.includes("does not exist") || msg.includes("no such table") || (error as { code?: string })?.code === "P2021") {
      console.warn("[SESSION] Table Session manquante. Exécutez: npx prisma migrate deploy")
    }
    console.error("[SESSION] Erreur:", error)
  }
}

