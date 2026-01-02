import { PrismaClient } from '@prisma/client'
import path from 'path'

// ⚠️ IMPORTANT: S'assurer que nous utilisons la bonne base de données
// Ne jamais utiliser test.db en dehors des tests
if (process.env.NODE_ENV !== 'test') {
  // TOUJOURS utiliser un chemin absolu pour éviter les problèmes avec Next.js
  // Le chemin relatif peut pointer vers un mauvais répertoire selon le contexte d'exécution
  // Même si .env contient un chemin relatif, on le convertit en absolu
  // Cela s'applique aussi en production pour garantir que le chemin est correct
  const dbPath = path.join(process.cwd(), 'prisma', 'dev.db')
  
  // Convertir le chemin relatif en absolu si nécessaire
  let finalDbPath = dbPath
  if (process.env.DATABASE_URL && process.env.DATABASE_URL.startsWith('file:./')) {
    // Le .env contient un chemin relatif, on le convertit en absolu
    finalDbPath = path.resolve(process.cwd(), process.env.DATABASE_URL.replace('file:', ''))
  } else if (process.env.DATABASE_URL && process.env.DATABASE_URL.startsWith('file:')) {
    // Si DATABASE_URL contient déjà un chemin (relatif ou absolu), le convertir en absolu
    const dbUrlPath = process.env.DATABASE_URL.replace('file:', '')
    if (!path.isAbsolute(dbUrlPath)) {
      finalDbPath = path.resolve(process.cwd(), dbUrlPath)
    } else {
      finalDbPath = dbUrlPath
    }
  }
  
  process.env.DATABASE_URL = `file:${finalDbPath}`
  if (process.env.NODE_ENV === 'development') {
    console.log(`[PRISMA] Base de données forcée (chemin absolu): ${finalDbPath}`)
    console.log(`[PRISMA] CWD: ${process.cwd()}`)
  }
}

const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined
}

// Configuration du client Prisma
// Les logs d'erreur P2021 pour la table Session sont gérés par le fallback et ne doivent pas polluer les logs
export const prisma = globalForPrisma.prisma ?? new PrismaClient({
  log: process.env.NODE_ENV === 'development' ? ['error', 'warn'] : ['error'],
})

if (process.env.NODE_ENV !== 'production') globalForPrisma.prisma = prisma
