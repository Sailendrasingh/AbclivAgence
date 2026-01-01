import { PrismaClient } from '@prisma/client'
import path from 'path'

// ⚠️ IMPORTANT: S'assurer que nous utilisons la bonne base de données en développement
// Ne jamais utiliser test.db en dehors des tests
if (process.env.NODE_ENV !== 'test' && process.env.NODE_ENV !== 'production') {
  // TOUJOURS utiliser un chemin absolu pour éviter les problèmes avec Next.js
  // Le chemin relatif peut pointer vers un mauvais répertoire selon le contexte d'exécution
  // Même si .env contient un chemin relatif, on le convertit en absolu
  const dbPath = path.join(process.cwd(), 'prisma', 'dev.db')
  
  // Convertir le chemin relatif en absolu si nécessaire
  let finalDbPath = dbPath
  if (process.env.DATABASE_URL && process.env.DATABASE_URL.startsWith('file:./')) {
    // Le .env contient un chemin relatif, on le convertit en absolu
    finalDbPath = path.resolve(process.cwd(), process.env.DATABASE_URL.replace('file:', ''))
  }
  
  process.env.DATABASE_URL = `file:${finalDbPath}`
  console.log(`[PRISMA] Base de données forcée (chemin absolu): ${finalDbPath}`)
  console.log(`[PRISMA] CWD: ${process.cwd()}`)
}

const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined
}

export const prisma = globalForPrisma.prisma ?? new PrismaClient({
  log: process.env.NODE_ENV === 'development' ? ['error', 'warn'] : ['error'],
})

if (process.env.NODE_ENV !== 'production') globalForPrisma.prisma = prisma
