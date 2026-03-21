import "dotenv/config";

const MIN_KEY_LENGTH = 32;
const ROTATION_WINDOW_DAYS = 90;

function fail(message: string): never {
  console.error(message);
  process.exit(1);
}

function warn(message: string): void {
  console.warn(message);
}

function main() {
  const key = process.env.ENCRYPTION_KEY || "";
  const rotatedAtRaw = process.env.ENCRYPTION_KEY_ROTATED_AT || "";

  if (!key) fail("ENCRYPTION_KEY manquante.");
  if (key.length < MIN_KEY_LENGTH) {
    fail(`ENCRYPTION_KEY trop courte (${key.length}). Minimum attendu: ${MIN_KEY_LENGTH}.`);
  }

  if (!rotatedAtRaw) {
    warn("ENCRYPTION_KEY_ROTATED_AT non defini. Ajoutez une date ISO (YYYY-MM-DD) pour suivre la rotation.");
    console.log("Secrets check OK (avec avertissement de gouvernance).");
    return;
  }

  const rotatedAt = new Date(rotatedAtRaw);
  if (Number.isNaN(rotatedAt.getTime())) {
    fail("ENCRYPTION_KEY_ROTATED_AT invalide. Format attendu: YYYY-MM-DD.");
  }

  const ageDays = Math.floor((Date.now() - rotatedAt.getTime()) / (1000 * 60 * 60 * 24));
  if (ageDays > ROTATION_WINDOW_DAYS) {
    warn(`ENCRYPTION_KEY agee de ${ageDays} jours (> ${ROTATION_WINDOW_DAYS} jours). Rotation recommandee.`);
  }

  console.log("Secrets check OK.");
}

main();
