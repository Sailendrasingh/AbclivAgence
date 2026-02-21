/**
 * Script pour initialiser les ordres des PC existants
 * Usage: npx tsx scripts/initialize-pc-orders.ts
 */

import { PrismaClient } from '@prisma/client';
import path from 'path';

// Forcer l'utilisation de la base de développement
const dbPath = path.join(__dirname, '..', 'prisma', 'dev.db');
process.env.DATABASE_URL = `file:${dbPath}`;

const prisma = new PrismaClient();

interface PC {
    id: string;
    name: string;
    order: number;
}

async function initializeOrders() {
  console.log(`🔧 Initialisation des ordres des PC...
`);

  try {
    // Récupérer tous les technical IDs
    const technicals = await prisma.technical.findMany({
      select: { id: true },
    });

    for (const technical of technicals) {
      // Récupérer tous les PC pour ce technical, triés par createdAt
      const pcs: PC[] = await prisma.$queryRawUnsafe(`
        SELECT id, name, "order" FROM PC 
        WHERE "technicalId" = '${technical.id}' 
        ORDER BY "createdAt" ASC;
      `);

      if (Array.isArray(pcs) && pcs.length > 0) {
        console.log(`
📋 Technical ${technical.id}: ${pcs.length} PC(s)`);
        
        // Mettre à jour chaque PC avec un ordre séquentiel
        for (let i = 0; i < pcs.length; i++) {
          await prisma.$executeRawUnsafe(`
            UPDATE PC SET "order" = ${i} WHERE id = '${pcs[i].id}';
          `);
          console.log(`   - ${pcs[i].name}: order = ${i}`);
        }
      }
    }

    console.log(`
✅ Initialisation terminée !`);
    
  } catch (error: any) {
    console.error('❌ Erreur:', error.message);
    process.exit(1);
  } finally {
    await prisma.$disconnect();
  }
}

initializeOrders();
