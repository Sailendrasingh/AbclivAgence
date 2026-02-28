/**
 * Script de restauration de l'utilisateur Admin
 * Usage: npx tsx scripts/restore-admin.ts
 * 
 * Ce script recrée l'utilisateur Admin si il n'existe pas
 */

import { PrismaClient } from '@prisma/client';
import { hashPassword } from '../lib/auth';

import path from 'path';

// DATABASE_URL doit pointer vers la base principale (pas la base de test)

const prisma = new PrismaClient();

async function restoreAdmin() {
  console.log(`🔧 Restauration de l'utilisateur Admin...
`);

  try {
    // Vérifier si l'admin existe
    const existingAdmin = await prisma.user.findUnique({
      where: { login: 'Admin' },
    });

    if (existingAdmin) {
      console.log(`✅ L'utilisateur Admin existe déjà`);
      console.log(`   ID: ${existingAdmin.id}`);
      console.log(`   Rôle: ${existingAdmin.role}`);
      console.log(`   Actif: ${existingAdmin.active ? 'Oui' : 'Non'}`);
      return;
    }

    // Créer l'admin
    console.log(`📝 Création de l'utilisateur Admin...`);
    const passwordHash = await hashPassword('Password');

    const admin = await prisma.user.create({
      data: {
        login: 'Admin',
        passwordHash,
        role: 'Super Admin',
        active: true,
      },
    });

    console.log(`✅ Utilisateur Admin créé avec succès !`);
    console.log(`   ID: ${admin.id}`);
    console.log(`   Login: ${admin.login}`);
    console.log(`   Mot de passe par défaut: Password`);
    console.log(`
⚠️  IMPORTANT: Le mot de passe par défaut "Password" ne respecte pas la politique de sécurité.`);
    console.log(`   ⚠️  Changez-le IMMÉDIATEMENT après la première connexion !`);
    console.log(`   ⚠️  Le nouveau mot de passe doit contenir au moins 12 caractères avec majuscules, minuscules, chiffres et caractères spéciaux.`);
  } catch (error) {
    console.error('❌ Erreur lors de la restauration:', error);
    process.exit(1);
  } finally {
    await prisma.$disconnect();
  }
}

restoreAdmin();
