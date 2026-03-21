/**
 * Script de test pour vérifier le mot de passe Admin
 * Usage: npx tsx scripts/test-admin-password.ts
 */

import 'dotenv/config';
import argon2 from 'argon2';
import { disconnectPrisma, getAdminOrNull, printAdminMissingHint } from './admin-utils';

async function testAdminPassword() {
  console.log(`🔍 Test du mot de passe Admin...\n`);

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
    console.log(`   Actif: ${admin.active ? 'Oui' : 'Non'}`);
    console.log(`   Hash length: ${admin.passwordHash.length}`);
    console.log(`   Hash starts with $argon2: ${admin.passwordHash.startsWith('$argon2')}`);
    console.log(`\n🔐 Test de vérification du mot de passe "Password"...`);

    const isValid = await argon2.verify(admin.passwordHash, 'Password');

    if (isValid) {
      console.log(`✅ Le mot de passe "Password" est VALIDE !`);
    } else {
      console.log(`❌ Le mot de passe "Password" est INVALIDE !`);
      console.log(`\n🔧 Génération d'un nouveau hash pour "Password"...`);
      const newHash = await argon2.hash('Password');
      console.log(`   Nouveau hash: ${newHash.substring(0, 30)}...`);
      console.log(`\n💡 Le hash doit être mis à jour dans la base de données.`);
    }

    // Test avec d'autres variantes courantes
    console.log(`\n🔍 Test avec d'autres variantes...`);
    const variants = ['password', 'PASSWORD', 'Password ', ' Password', 'Password\n'];
    for (const variant of variants) {
      const isValidVariant = await argon2.verify(admin.passwordHash, variant);
      if (isValidVariant) {
        console.log(`⚠️  Le mot de passe "${variant}" (avec ${variant.length} caractères) est VALIDE !`);
      }
    }

  } catch (error) {
    console.error('❌ Erreur:', error);
  } finally {
    await disconnectPrisma();
  }
}

testAdminPassword();
