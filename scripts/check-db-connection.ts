/**
 * Script pour vérifier quelle base de données est utilisée
 * Usage: npx tsx scripts/check-db-connection.ts
 */

import { PrismaClient } from '@prisma/client';

console.log(`🔍 Vérification de la connexion à la base de données...
`);
console.log(`DATABASE_URL: ${process.env.DATABASE_URL || 'non défini'}`);
console.log(`NODE_ENV: ${process.env.NODE_ENV || 'non défini'}
`);

const prisma = new PrismaClient({
  log: ['error'],
});

async function checkConnection() {
  try {
    // Compter les utilisateurs pour vérifier la connexion
    const userCount = await prisma.user.count();
    console.log(`✅ Connexion réussie !`);
    console.log(`   Nombre d'utilisateurs: ${userCount}`);
    
    // Lister les utilisateurs
    const users = await prisma.user.findMany({
      select: {
        login: true,
        role: true,
        active: true,
      },
    });
    
    if (users.length > 0) {
      console.log(`
👥 Utilisateurs trouvés:`);
      users.forEach((user) => {
        console.log(`   - ${user.login} (${user.role}) ${user.active ? '✅' : '❌'}`);
      });
    } else {
      console.log(`
⚠️  Aucun utilisateur trouvé dans la base de données`);
    }
    
    // Vérifier quelle base de données est utilisée
    const dbPath = process.env.DATABASE_URL || '';
    if (dbPath.includes('test.db')) {
      console.log(`
⚠️  ATTENTION: La base de données test.db est utilisée !`);
      console.log(`   Cela ne devrait se produire que lors des tests.`);
    } else if (dbPath.includes('dev.db')) {
      console.log(`
✅ Base de données de développement (dev.db) utilisée - Correct !`);
    } else {
      console.log(`
ℹ️  Base de données: ${dbPath}`);
    }
    
  } catch (error: any) {
    console.error('❌ Erreur de connexion:', error.message);
    console.error(`   DATABASE_URL: ${process.env.DATABASE_URL}`);
  } finally {
    await prisma.$disconnect();
  }
}

checkConnection();
