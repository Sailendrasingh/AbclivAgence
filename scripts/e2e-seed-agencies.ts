import "dotenv/config";
import { disconnectPrisma, prisma } from "./admin-utils";

const AGENCY_NAMES = [
  "Agence E2E Alpha",
  "Agence E2E Beta",
  "Agence E2E Gamma",
];

async function seedAgenciesForE2E() {
  console.log("🌱 Seed agences E2E...\n");

  try {
    for (const name of AGENCY_NAMES) {
      const existing = await prisma.agency.findFirst({ where: { name } });
      if (!existing) {
        await prisma.agency.create({
          data: {
            name,
            state: "ALERTE",
          },
        });
        console.log(`✅ Agence créée: ${name}`);
      }
    }

    const total = await prisma.agency.count();
    console.log(`\n📊 Total agences en base: ${total}`);
  } catch (error) {
    console.error("❌ Erreur seed agences E2E:", error);
    process.exit(1);
  } finally {
    await disconnectPrisma();
  }
}

seedAgenciesForE2E();
