/**
 * Script pour désactiver le 2FA pour le compte Admin
 * Usage: npx tsx scripts/disable-2fa-admin.ts
 */

import 'dotenv/config';
import { disconnectPrisma, getAdminOrNull, printAdminMissingHint, prisma } from './admin-utils';

async function disable2FA() {
  console.log(`🔧 Désactivation du 2FA pour le compte Admin...
`);

  try {
    const admin = await getAdminOrNull();

    if (!admin) {
      printAdminMissingHint();
      return;
    }

    console.log(`📝 État actuel:`);
    console.log(`   Login: ${admin.login}`);
    console.log(`   2FA activé: ${admin.twoFactorEnabled ? 'Oui' : 'Non'}`);
    console.log(`   Secret présent: ${admin.twoFactorSecret ? 'Oui' : 'Non'}
`);

    if (!admin.twoFactorEnabled) {
      console.log(`✅ Le 2FA est déjà désactivé pour le compte Admin`);
      return;
    }

    const updated = await prisma.user.update({
      where: { login: 'Admin' },
      data: {
        twoFactorEnabled: false,
        twoFactorSecret: null,
      },
    });

    console.log(`✅ 2FA désactivé avec succès !`);
    console.log(`   Login: ${updated.login}`);
    console.log(`   2FA activé: ${updated.twoFactorEnabled ? 'Oui' : 'Non'}`);
    console.log(`   Secret présent: ${updated.twoFactorSecret ? 'Oui' : 'Non'}`);
  } catch (error) {
    console.error('❌ Erreur:', error);
    process.exit(1);
  } finally {
    await disconnectPrisma();
  }
}

disable2FA();
