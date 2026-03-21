/**
 * Script pour vérifier l'état complet du compte Admin
 * Usage: npx tsx scripts/check-admin-status.ts
 */

import 'dotenv/config';
import argon2 from 'argon2';
import { disconnectPrisma, getAdminOrNull, printAdminMissingHint } from './admin-utils';

async function checkAdminStatus() {
  console.log(`🔍 Vérification de l'état du compte Admin...
`);

  try {
    const admin = await getAdminOrNull();

    if (!admin) {
      printAdminMissingHint();
      return;
    }

    console.log(`✅ Utilisateur Admin trouvé`);
    console.log(`   ID: ${admin.id}`);
    console.log(`   Login: ${admin.login}`);
    console.log(`   Rôle: ${admin.role}`);
    console.log(`   Actif: ${admin.active ? '✅ Oui' : '❌ Non'}`);
    console.log(`   Tentatives échouées: ${admin.failedLoginAttempts || 0}`);
    
    if (admin.lockedUntil) {
      const now = new Date();
      const lockedUntil = new Date(admin.lockedUntil);
      if (lockedUntil > now) {
        const minutesLeft = Math.ceil((lockedUntil.getTime() - now.getTime()) / 60000);
        console.log(`   🔒 Verrouillé jusqu'à: ${lockedUntil.toISOString()}`);
        console.log(`   ⏰ Temps restant: ${minutesLeft} minute(s)`);
      } else {
        console.log(`   ✅ Verrouillage expiré (était verrouillé jusqu'à: ${lockedUntil.toISOString()})`);
      }
    } else {
      console.log(`   ✅ Non verrouillé`);
    }

    console.log(`
🔐 Test de vérification du mot de passe "Password"...`);
    const isValid = await argon2.verify(admin.passwordHash, 'Password');
    console.log(`   Résultat: ${isValid ? '✅ VALIDE' : '❌ INVALIDE'}`);

    if (!isValid) {
      console.log(`
⚠️  Le mot de passe ne correspond pas !`);
      console.log(`💡 Exécutez: npm run reset:admin`);
    }

    if (!admin.active) {
      console.log(`
⚠️  Le compte est désactivé !`);
      console.log(`💡 Réactivez-le avec: npm run reset:admin`);
    }

    if (admin.lockedUntil && new Date(admin.lockedUntil) > new Date()) {
      console.log(`
⚠️  Le compte est verrouillé !`);
      console.log(`💡 Déverrouillez-le avec: npm run reset:admin`);
    }

  } catch (error) {
    console.error('❌ Erreur:', error);
  } finally {
    await disconnectPrisma();
  }
}

checkAdminStatus();
