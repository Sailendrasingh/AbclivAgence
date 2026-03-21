/**
 * Script de réinitialisation du mot de passe Admin
 * Usage: npx tsx scripts/reset-admin-password.ts
 * 
 * Ce script réinitialise le mot de passe de l'utilisateur Admin à "Password"
 */

import 'dotenv/config';
import argon2 from 'argon2';
import { disconnectPrisma, getAdminOrNull, printAdminMissingHint, prisma } from './admin-utils';

async function resetAdminPassword() {
  console.log(`🔧 Réinitialisation du mot de passe Admin...
`);

  try {
    const existingAdmin = await getAdminOrNull();

    if (!existingAdmin) {
      printAdminMissingHint();
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
  } catch (error) {
    console.error('❌ Erreur lors de la réinitialisation:', error);
    process.exit(1);
  } finally {
    await disconnectPrisma();
  }
}

resetAdminPassword();
