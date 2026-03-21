/**
 * Script de vérification des données via Prisma
 * Usage: npx tsx scripts/verify-data.ts
 */

import 'dotenv/config';
import { AgencyState, PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function verifyData() {
  console.log(`🔍 Vérification de l'état de la base de données...\n`);
  console.log(`DATABASE_URL: ${process.env.DATABASE_URL || 'non défini'}\n`);

  try {
    const users = await prisma.user.findMany({
      select: { login: true, role: true, active: true },
    });
    console.log(`👥 Utilisateurs: ${users.length}`);
    users.forEach((user) => {
      console.log(`   - ${user.login} (${user.role}) ${user.active ? '✓ Actif' : '✗ Inactif'}`);
    });

    const agencies = await prisma.agency.findMany({
      select: { name: true, state: true },
    });
    console.log(`\n🏢 Agences: ${agencies.length}`);

    const states: Record<AgencyState, number> = { OK: 0, INFO: 0, ALERTE: 0, FERMÉE: 0 };
    agencies.forEach((agency) => {
      states[agency.state] = (states[agency.state] || 0) + 1;
      console.log(`   - ${agency.name} [${agency.state}]`);
    });

    console.log(`\n   Répartition par état:`);
    Object.entries(states).forEach(([state, count]) => {
      console.log(`     ${state}: ${count}`);
    });

    const contacts = await prisma.contact.count();
    console.log(`\n📞 Contacts: ${contacts}`);

    const addresses = await prisma.address.count();
    console.log(`📍 Adresses: ${addresses}`);

    const photoGroups = await prisma.photoGroup.count();
    console.log(`📷 Groupes de photos: ${photoGroups}`);

    const technical = await prisma.technical.count();
    console.log(`⚙️ Données techniques: ${technical}`);

    console.log(`\n✅ Vérification terminée - Vos données sont présentes !`);

    if (users.length === 0) {
      console.log(`\n⚠️  ATTENTION: Aucun utilisateur trouvé !`);
      console.log(`   Exécutez: npx tsx scripts/restore-admin.ts`);
    }
  } catch (error: any) {
    console.error('❌ Erreur lors de la vérification:', error.message);
    process.exit(1);
  } finally {
    await prisma.$disconnect();
  }
}

verifyData();
