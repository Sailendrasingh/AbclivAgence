/**
 * Vérifie et crée la table Session si elle n'existe pas
 * À appeler au démarrage de l'application
 */

import { prisma } from "./prisma"

let tableChecked = false

export async function ensureSessionTable(): Promise<void> {
  if (tableChecked) {
    return
  }

  try {
    // Vérifier si la table existe en essayant une requête simple
    await prisma.$queryRaw`SELECT 1 FROM Session LIMIT 1`
    tableChecked = true
  } catch (error: any) {
    // Si la table n'existe pas (code P2021), la créer
    if (error?.code === 'P2021' || error?.message?.includes('does not exist') || error?.message?.includes('no such table')) {
      try {
        console.log('[SESSION] Création de la table Session...')
        await prisma.$executeRawUnsafe(`
          CREATE TABLE IF NOT EXISTS "Session" (
            "id" TEXT NOT NULL PRIMARY KEY,
            "token" TEXT NOT NULL,
            "userId" TEXT NOT NULL,
            "expiresAt" DATETIME NOT NULL,
            "lastUsedAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
            "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
            "updatedAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
            CONSTRAINT "Session_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User" ("id") ON DELETE CASCADE ON UPDATE CASCADE
          );
        `)
        await prisma.$executeRawUnsafe(`CREATE UNIQUE INDEX IF NOT EXISTS "Session_token_key" ON "Session"("token");`)
        console.log('[SESSION] Table Session créée avec succès')
        tableChecked = true
      } catch (createError) {
        console.error('[SESSION] Erreur lors de la création de la table Session:', createError)
        // Ne pas bloquer l'application, le fallback prendra le relais
      }
    } else {
      // Autre erreur, ne pas créer la table
      console.error('[SESSION] Erreur lors de la vérification de la table Session:', error)
    }
  }
}

