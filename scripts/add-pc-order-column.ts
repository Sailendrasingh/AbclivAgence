/**
 * Script pour ajouter la colonne 'order' à la table PC
 * Usage: npx tsx scripts/add-pc-order-column.ts
 */

import { PrismaClient } from '@prisma/client';
import path from 'path';

// Forcer l'utilisation de la base de développement
const dbPath = path.join(__dirname, '..', 'prisma', 'dev.db');
process.env.DATABASE_URL = `file:${dbPath}`;

const prisma = new PrismaClient();

async function addOrderColumn() {
  console.log(`🔧 Ajout de la colonne "order" à la table PC...`);

  try {
    // Utiliser Prisma pour exécuter une requête SQL brute
    await prisma.$executeRawUnsafe(`
      ALTER TABLE PC ADD COLUMN "order" INTEGER DEFAULT 0;
    `);

    console.log(`✅ Colonne "order" ajoutée avec succès !`);

    // Mettre à jour tous les PC existants pour avoir order = 0
    await prisma.$executeRawUnsafe(`
      UPDATE PC SET "order" = 0 WHERE "order" IS NULL;
    `);

    console.log(`✅ Valeurs par défaut assignées aux PC existants`);

    // Vérifier avec une requête SQL brute (car le client Prisma n'a peut-être pas encore été régénéré)
    const result: any[] = await prisma.$queryRawUnsafe(`
      SELECT id, name, "order" FROM PC LIMIT 5;
    `);

    console.log(`
📋 Exemple de PC (premiers 5):`);
    if (Array.isArray(result)) {
      result.forEach((pc: { name: string, order: number }) => {
        console.log(`   - ${pc.name}: order = ${pc.order}`);
      });
    }

  } catch (error: any) {
    if (error.message.includes('duplicate column name') || error.message.includes('already exists')) {
      console.log(`ℹ️  La colonne "order" existe déjà`);
    } else {
      console.error('❌ Erreur:', error.message);
      process.exit(1);
    }
  } finally {
    await prisma.$disconnect();
  }
}

addOrderColumn();
