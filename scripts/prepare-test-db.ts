import "dotenv/config";
import { execSync } from "child_process";

const currentDbUrl = process.env.DATABASE_URL || "";

function deriveTestDbUrl(sourceUrl: string): string {
  if (sourceUrl.startsWith("postgresql://") || sourceUrl.startsWith("postgres://")) {
    const parsed = new URL(sourceUrl);
    parsed.pathname = "/abcliv_test";
    return parsed.toString();
  }
  return "postgresql://postgres:postgres@localhost:5432/abcliv_test";
}

const testDbUrl = process.env.DATABASE_URL_TEST || deriveTestDbUrl(currentDbUrl);
process.env.DATABASE_URL = testDbUrl;

if (!testDbUrl.includes("test") && !testDbUrl.includes("_test")) {
  throw new Error(`DATABASE_URL de test invalide: ${testDbUrl}`);
}

try {
  execSync("npx prisma db push --skip-generate", { stdio: "inherit" });
} catch {
  throw new Error(
    `Impossible de préparer la base de test (${testDbUrl}). Créez la base PostgreSQL puis relancez npm run test:prepare.`
  );
}
