import { PrismaClient } from '@prisma/client'
import path from 'path'

// ⚠️ IMPORTANT: S'assurer que nous utilisons la bonne base de données
// Ne jamais utiliser test.db en dehors des tests
if (process.env.NODE_ENV !== 'test') {
  const dbUrl = process.env.DATABASE_URL || ''
  // Pour SQLite (file:) : convertir le chemin relatif en absolu
  if (dbUrl.startsWith('file:')) {
    const dbPath = path.join(process.cwd(), 'prisma', 'dev.db')
    let finalDbPath = dbPath
    if (dbUrl.startsWith('file:./')) {
      finalDbPath = path.resolve(process.cwd(), dbUrl.replace('file:', ''))
    } else if (dbUrl.startsWith('file:')) {
      const dbUrlPath = dbUrl.replace('file:', '')
      finalDbPath = path.isAbsolute(dbUrlPath) ? dbUrlPath : path.resolve(process.cwd(), dbUrlPath)
    }
    process.env.DATABASE_URL = `file:${finalDbPath}`
    if (process.env.NODE_ENV === 'development') {
      console.log(`[PRISMA] Base SQLite (chemin absolu): ${finalDbPath}`)
    }
  }
  // Pour PostgreSQL : DATABASE_URL postgresql://... est utilisée telle quelle
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
