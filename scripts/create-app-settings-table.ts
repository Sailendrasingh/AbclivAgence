/**
 * Script pour créer la table AppSettings
 * Usage: npx tsx scripts/create-app-settings-table.ts
 */

import { PrismaClient } from '@prisma/client';
import path from 'path';

// Forcer l'utilisation de la base de production
const dbPath = path.join(__dirname, '..', 'prisma', 'dev.db');
process.env.DATABASE_URL = `file:${dbPath}`;

const prisma = new PrismaClient();

async function createAppSettingsTable() {
  console.log(`🔧 Création de la table AppSettings...
`);

  try {
    // Créer la table AppSettings
    await prisma.$executeRawUnsafe(`
      CREATE TABLE IF NOT EXISTS AppSettings (
        id TEXT PRIMARY KEY,
        sessionTimeout INTEGER NOT NULL DEFAULT 1,
        updatedAt DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
      );
    `);
    
    console.log(`✅ Table AppSettings créée avec succès !`);
    
    // Créer les paramètres par défaut s'ils n'existent pas
    try {
      await prisma.appSettings.create({
        data: {
          id: "settings",
          sessionTimeout: 1,
        },
      });
      console.log(`✅ Paramètres par défaut créés`);
    } catch (error: any) {
      if (error.code === 'P2002') {
        console.log(`ℹ️  Les paramètres existent déjà`);
      } else {
        throw error;
      }
    }
    
    // Vérifier
    const settings = await prisma.appSettings.findUnique({
      where: { id: "settings" },
    });
    
    if (settings) {
      console.log(`
✅ Paramètres trouvés:`);
      console.log(`   Session timeout: ${settings.sessionTimeout} minutes`);
    }
    
  } catch (error: any) {
    console.error('❌ Erreur:', error.message);
    process.exit(1);
  } finally {
    await prisma.$disconnect();
  }
}

createAppSettingsTable();
