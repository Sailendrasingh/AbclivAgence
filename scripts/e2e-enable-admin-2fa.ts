import "dotenv/config";
import { disconnectPrisma, getAdminOrNull, printAdminMissingHint, prisma } from "./admin-utils";

const DEFAULT_E2E_ADMIN_2FA_SECRET = "37ZCBWCSRS27VICE6KUG2D66G3OFFDUY";

async function enableAdmin2FAForE2E() {
  console.log("🔧 Configuration 2FA Admin pour les tests E2E...\n");

  try {
    const admin = await getAdminOrNull();

    if (!admin) {
      printAdminMissingHint();
      return;
    }

    const secret = process.env.ADMIN_2FA_SECRET || DEFAULT_E2E_ADMIN_2FA_SECRET;

    const updated = await prisma.user.update({
      where: { login: "Admin" },
      data: {
        twoFactorEnabled: true,
        twoFactorSecret: secret,
        active: true,
        failedLoginAttempts: 0,
        lockedUntil: null,
      },
    });

    console.log("✅ 2FA Admin configuré pour E2E");
    console.log(`   Login: ${updated.login}`);
    console.log(`   2FA activé: ${updated.twoFactorEnabled ? "Oui" : "Non"}`);
    console.log(`   Secret utilisé: ${secret.slice(0, 4)}...${secret.slice(-4)}`);
  } catch (error) {
    console.error("❌ Erreur lors de la configuration 2FA E2E:", error);
    process.exit(1);
  } finally {
    await disconnectPrisma();
  }
}

enableAdmin2FAForE2E();
