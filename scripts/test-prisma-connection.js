/**
 * Script pour tester la connexion Prisma avec le chemin absolu
 */

const { PrismaClient } = require('@prisma/client')
const path = require('path')

// Forcer le chemin absolu
const dbPath = path.join(process.cwd(), 'prisma', 'dev.db')
process.env.DATABASE_URL = `file:${dbPath}`

console.log(`🔍 Test de connexion Prisma...\n`)
console.log(`CWD: ${process.cwd()}`)
console.log(`DATABASE_URL: ${process.env.DATABASE_URL}`)
console.log(`DB Path exists: ${require('fs').existsSync(dbPath)}\n`)

const prisma = new PrismaClient()

async function testConnection() {
  try {
    const userCount = await prisma.user.count()
    console.log(`✅ Connexion réussie !`)
    console.log(`   Nombre d'utilisateurs: ${userCount}`)
    
    const users = await prisma.user.findMany({
      select: { login: true, active: true },
    })
    
    console.log(`\n👥 Utilisateurs:`)
    users.forEach((user) => {
      console.log(`   - ${user.login} (active: ${user.active})`)
    })
    
    const admin = await prisma.user.findUnique({
      where: { login: 'Admin' },
    })
    
    if (admin) {
      console.log(`\n✅ Admin trouvé: ${admin.login} (${admin.role})`)
    } else {
      console.log(`\n❌ Admin non trouvé`)
    }
    
  } catch (error) {
    console.error('❌ Erreur:', error.message)
  } finally {
    await prisma.$disconnect()
  }
}

testConnection()

