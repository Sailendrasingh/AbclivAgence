/**
 * Script de vérification des données via SQLite direct
 * Usage: npx tsx scripts/verify-data.ts
 * 
 * NOTE: This script uses the `sqlite3` command-line tool directly.
 * For better consistency and error handling, it could be rewritten
 * to use Prisma Client, like the other scripts.
 */

import { execSync } from 'child_process';
import path from 'path';

const dbPath = path.join(__dirname, '..', 'prisma', 'dev.db');

console.log(`🔍 Vérification de l'état de la base de données (dev.db)...\n`);
console.log(`📁 Chemin: ${dbPath}\n`);

try {
  // Vérifier les utilisateurs
  const users = execSync(`sqlite3 "${dbPath}" "SELECT login, role, active FROM User;"`, { encoding: 'utf-8' });
  const userLines = users.trim().split('\n').filter(l => l);
  console.log(`👥 Utilisateurs: ${userLines.length}`);
  userLines.forEach(line => {
    const parts = line.split('|');
    if (parts.length >= 3) {
      const [login, role, active] = parts;
      // Nettoyer les valeurs (enlever les espaces et retours à la ligne)
      const cleanActive = active.trim();
      const isActive = cleanActive === '1' || cleanActive.toLowerCase() === 'true';
      console.log(`   - ${login} (${role}) ${isActive ? '✓ Actif' : '✗ Inactif'}`);
    }
  });

  // Vérifier les agences
  const agencies = execSync(`sqlite3 "${dbPath}" "SELECT name, state FROM Agency;"`, { encoding: 'utf-8' });
  const agencyLines = agencies.trim().split('\n').filter(l => l);
  console.log(`\n🏢 Agences: ${agencyLines.length}`);

  const states: Record<string, number> = { OK: 0, INFO: 0, ALERTE: 0, FERMÉE: 0 };
  agencyLines.forEach(line => {
    const parts = line.split('|');
    if (parts.length >= 2) {
      const [name, state] = parts;
      const cleanState = state.trim();
      states[cleanState] = (states[cleanState] || 0) + 1;
      console.log(`   - ${name} [${cleanState}]`);
    }
  });

  console.log(`\n   Répartition par état:`);
  Object.entries(states).forEach(([state, count]) => {
    console.log(`     ${state}: ${count}`);
  });

  // Vérifier les contacts
  const contacts = execSync(`sqlite3 "${dbPath}" "SELECT COUNT(*) FROM Contact;"`, { encoding: 'utf-8' });
  console.log(`\n📞 Contacts: ${contacts.trim()}`);

  // Vérifier les adresses
  const addresses = execSync(`sqlite3 "${dbPath}" "SELECT COUNT(*) FROM Address;"`, { encoding: 'utf-8' });
  console.log(`📍 Adresses: ${addresses.trim()}`);

  // Vérifier les groupes de photos
  const photoGroups = execSync(`sqlite3 "${dbPath}" "SELECT COUNT(*) FROM PhotoGroup;"`, { encoding: 'utf-8' });
  console.log(`📷 Groupes de photos: ${photoGroups.trim()}`);

  // Vérifier les données techniques
  const technical = execSync(`sqlite3 "${dbPath}" "SELECT COUNT(*) FROM Technical;"`, { encoding: 'utf-8' });
  console.log(`⚙️ Données techniques: ${technical.trim()}`);

  console.log(`\n✅ Vérification terminée - Vos données sont présentes !`);

  if (userLines.length === 0) {
    console.log(`\n⚠️  ATTENTION: Aucun utilisateur trouvé !`);
    console.log(`   Exécutez: npx tsx scripts/restore-admin.ts`);
  }
} catch (error: any) {
  console.error('❌ Erreur lors de la vérification:', error.message);
  process.exit(1);
}
