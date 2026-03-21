/**
 * Script pour tester la connexion Prisma
 */

import 'dotenv/config';
import { PrismaClient } from '@prisma/client';

console.log(`🔍 Test de connexion Prisma...
`);
console.log(`DATABASE_URL: ${process.env.DATABASE_URL}`);
console.log('');

const prisma = new PrismaClient();

async function testConnection() {
  try {
    const userCount = await prisma.user.count();
    console.log(`✅ Connexion réussie !`);
    console.log(`   Nombre d'utilisateurs: ${userCount}`);
    
    const users = await prisma.user.findMany({
      select: { login: true, active: true },
    });
    
    console.log(`
👥 Utilisateurs:`);
    users.forEach((user) => {
      console.log(`   - ${user.login} (active: ${user.active})`);
    });
    
    const admin = await prisma.user.findUnique({
      where: { login: 'Admin' },
    });
    
    if (admin) {
      console.log(`
✅ Admin trouvé: ${admin.login} (${admin.role})`);
    } else {
      console.log(`
❌ Admin non trouvé`);
    }
    
  } catch (error: any) {
    console.error('❌ Erreur:', error.message);
  } finally {
    await prisma.$disconnect();
  }
}

testConnection();
