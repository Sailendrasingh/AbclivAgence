/**
 * Script pour initialiser les ordres des PC existants
 * Usage: npx tsx scripts/initialize-pc-orders.ts
 */

import { PrismaClient } from '@prisma/client';
import 'dotenv/config';

const prisma = new PrismaClient();

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
      const pcs = await prisma.pC.findMany({
        where: { technicalId: technical.id },
        select: { id: true, name: true, order: true },
        orderBy: { createdAt: 'asc' },
      });

      if (Array.isArray(pcs) && pcs.length > 0) {
        console.log(`
📋 Technical ${technical.id}: ${pcs.length} PC(s)`);
        
        // Mettre à jour chaque PC avec un ordre séquentiel
        for (let i = 0; i < pcs.length; i++) {
          await prisma.pC.update({
            where: { id: pcs[i].id },
            data: { order: i },
          });
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
