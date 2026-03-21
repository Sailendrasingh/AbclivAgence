/**
 * Script de réinitialisation du mot de passe Admin (Prisma)
 * Usage: npx tsx scripts/reset-admin-password-sql.ts
 *
 * Ce script réinitialise le mot de passe de l'utilisateur Admin à "Password"
 */

import 'dotenv/config';
import { PrismaClient } from '@prisma/client';
import argon2 from 'argon2';

const prisma = new PrismaClient();

async function resetAdminPassword() {
  console.log(`🔧 Réinitialisation du mot de passe Admin...\n`);

  try {
    const existingAdmin = await prisma.user.findUnique({
      where: { login: 'Admin' },
    });

    if (!existingAdmin) {
      console.log(`❌ L'utilisateur Admin n'existe pas`);
      console.log(`💡 Utilisez "npm run restore:admin" pour créer l'utilisateur Admin`);
      return;
    }

    console.log(`📝 Réinitialisation du mot de passe...`);
    const passwordHash = await argon2.hash('Password');

    const admin = await prisma.user.update({
      where: { login: 'Admin' },
      data: {
        passwordHash,
        active: true,
        lockedUntil: null,
        failedLoginAttempts: 0,
      },
    });

    console.log(`✅ Mot de passe réinitialisé avec succès !`);
    console.log(`   ID: ${admin.id}`);
    console.log(`   Login: ${admin.login}`);
    console.log(`   Rôle: ${admin.role}`);
    console.log(`   Actif: ${admin.active ? 'Oui' : 'Non'}`);
    console.log(`   Nouveau mot de passe: Password`);
    console.log(`
⚠️  IMPORTANT: Changez le mot de passe après la première connexion !`);
  } finally {
    await prisma.$disconnect();
  }
}

resetAdminPassword().catch((error) => {
  console.error('❌ Erreur:', error);
  process.exit(1);
});
