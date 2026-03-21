/**
 * Script de vérification de l'état de la base de données
 * Usage: npx tsx scripts/check-database.ts
 */

import 'dotenv/config';
import { AgencyState, PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function checkDatabase() {
  console.log(`🔍 Vérification de l'état de la base de données...
`);

  try {
    // Vérifier les utilisateurs
    const users = await prisma.user.findMany({
      select: {
        id: true,
        login: true,
        role: true,
        active: true,
        twoFactorEnabled: true,
      },
    });
    console.log(`👥 Utilisateurs: ${users.length}`);
    users.forEach((user) => {
      console.log(`   - ${user.login} (${user.role}) ${user.active ? '✓' : '✗'} ${user.twoFactorEnabled ? '[2FA]' : ''}`);
    });

    // Vérifier les agences
    const agencies = await prisma.agency.findMany({
      select: {
        id: true,
        name: true,
        state: true,
      },
    });
    console.log(`
🏢 Agences: ${agencies.length}`);
    const states: Record<AgencyState, number> = { OK: 0, INFO: 0, ALERTE: 0, FERMÉE: 0 };
    agencies.forEach((agency) => {
      states[agency.state] = (states[agency.state] || 0) + 1;
      console.log(`   - ${agency.name} [${agency.state}]`);
    });
    console.log(`
   Répartition par état:`);
    Object.entries(states).forEach(([state, count]) => {
      console.log(`     ${state}: ${count}`);
    });

    // Vérifier les contacts
    const contacts = await prisma.contact.count();
    console.log(`
📞 Contacts: ${contacts}`);

    // Vérifier les adresses
    const addresses = await prisma.address.count();
    console.log(`
📍 Adresses: ${addresses}`);

    // Vérifier les groupes de photos
    const photoGroups = await prisma.photoGroup.count();
    console.log(`
📷 Groupes de photos: ${photoGroups}`);

    // Vérifier les données techniques
    const technical = await prisma.technical.count();
    console.log(`
⚙️ Données techniques: ${technical}`);

    // Vérifier les logs
    const totalLogs = await prisma.log.count();
    console.log(`
📋 Logs: ${totalLogs}`);

    // Vérifier l'historique
    const agencyHistory = await prisma.agencyHistory.count();
    const technicalHistory = await prisma.technicalHistory.count();
    console.log(`
📚 Historique:`);
    console.log(`   - Agences: ${agencyHistory}`);
    console.log(`   - Technique: ${technicalHistory}`);

    // Vérifier l'utilisateur Admin
    const admin = await prisma.user.findUnique({
      where: { login: 'Admin' },
    });

    if (!admin) {
      console.log(`
⚠️  ATTENTION: L'utilisateur Admin n'existe pas !`);
      console.log(`   Vous pouvez le recréer en lançant l'application (createInitialAdmin sera appelé)`);
    } else {
      console.log(`
✅ Utilisateur Admin présent`);
    }

    console.log(`
✅ Vérification terminée`);
  } catch (error) {
    console.error('❌ Erreur lors de la vérification:', error);
  } finally {
    await prisma.$disconnect();
  }
}

checkDatabase();
