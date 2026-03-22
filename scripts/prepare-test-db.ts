import "dotenv/config";
import { execSync } from "child_process";

const currentDbUrl = process.env.DATABASE_URL || "";

function buildDockerTestDbUrl(): string {
  const host = process.env.TEST_DB_HOST || process.env.POSTGRES_HOST || "localhost";
  const port = process.env.TEST_DB_PORT || process.env.POSTGRES_PORT || "5433";
  const user = process.env.TEST_DB_USER || process.env.POSTGRES_USER || "postgres";
  const password = process.env.TEST_DB_PASSWORD || process.env.POSTGRES_PASSWORD || "postgres";
  const parsed = new URL(`postgresql://${user}:${password}@${host}:${port}/abcliv_test`);
  return parsed.toString();
}

function deriveTestDbUrl(sourceUrl: string): string {
  if (sourceUrl.startsWith("postgresql://") || sourceUrl.startsWith("postgres://")) {
    try {
      const parsed = new URL(sourceUrl);
      parsed.pathname = "/abcliv_test";

      // Cas fréquent en local Docker: ancien mot de passe dans .env mais conteneur DB en postgres/postgres.
      if (
        (parsed.hostname === "localhost" || parsed.hostname === "127.0.0.1") &&
        parsed.port === "5433" &&
        parsed.username === "postgres"
      ) {
        parsed.password = process.env.TEST_DB_PASSWORD || process.env.POSTGRES_PASSWORD || "postgres";
      }

      return parsed.toString();
    } catch {
      // Fallback conservateur: URL Docker locale par défaut.
    }
  }
  return buildDockerTestDbUrl();
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
