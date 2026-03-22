import { execSync } from "child_process";

function run(command: string) {
  execSync(command, { stdio: "inherit" });
}

async function globalSetup() {
  // Stabilise l'utilisateur Admin pour les tests E2E.
  run("npm run reset:admin");
  run("npx tsx scripts/e2e-enable-admin-2fa.ts");
  run("npx tsx scripts/e2e-seed-agencies.ts");
}

export default globalSetup;
