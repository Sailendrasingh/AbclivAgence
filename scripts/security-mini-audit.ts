import "dotenv/config";
import { mkdir, readdir, readFile, writeFile } from "fs/promises";
import { join, relative } from "path";

type Severity = "high" | "medium" | "low";

interface Finding {
  severity: Severity;
  rule: string;
  file: string;
  details: string;
}

async function walkFiles(root: string, filter: (file: string) => boolean): Promise<string[]> {
  const stack = [root];
  const files: string[] = [];

  while (stack.length > 0) {
    const current = stack.pop() as string;
    const entries = await readdir(current, { withFileTypes: true });
    for (const entry of entries) {
      const fullPath = join(current, entry.name);
      if (entry.isDirectory()) {
        stack.push(fullPath);
        continue;
      }
      if (filter(fullPath)) {
        files.push(fullPath);
      }
    }
  }

  return files;
}

function severityRank(severity: Severity): number {
  if (severity === "high") return 3;
  if (severity === "medium") return 2;
  return 1;
}

async function auditApiRoutes(repoRoot: string): Promise<Finding[]> {
  const findings: Finding[] = [];
  const apiRoot = join(repoRoot, "app", "api");
  const routeFiles = await walkFiles(apiRoot, (file) => file.endsWith("route.ts"));
  const csrfExemptRoutes = new Set<string>([
    "app/api/auth/login/route.ts",
  ]);

  for (const file of routeFiles) {
    const content = await readFile(file, "utf-8");
    const rel = relative(repoRoot, file).replaceAll("\\", "/");

    const mutatingMethods = [...content.matchAll(/export\s+async\s+function\s+(POST|PUT|PATCH|DELETE)\s*\(/g)];
    const hasMutatingMethod = mutatingMethods.length > 0;
    const hasCsrfProtection =
      content.includes("requireCSRF(") ||
      content.includes("validateCSRF(") ||
      content.includes("verifyCSRFToken(");
    if (hasMutatingMethod && !hasCsrfProtection && !csrfExemptRoutes.has(rel)) {
      findings.push({
        severity: "high",
        rule: "CSRF",
        file: rel,
        details: "Route mutative sans validation CSRF detectee.",
      });
    }

    if (content.includes("$queryRaw") || content.includes("$executeRaw")) {
      findings.push({
        severity: "high",
        rule: "SQL_INJECTION_SURFACE",
        file: rel,
        details: "Usage de raw SQL detecte; verification manuelle requise.",
      });
    }

    if (content.includes("console.log(")) {
      findings.push({
        severity: "low",
        rule: "LOGGING_HYGIENE",
        file: rel,
        details: "console.log detecte dans une route API (a limiter en production).",
      });
    }
  }

  return findings;
}

async function auditDangerousHtml(repoRoot: string): Promise<Finding[]> {
  const findings: Finding[] = [];
  const appRoot = join(repoRoot, "app");
  const files = await walkFiles(appRoot, (file) => file.endsWith(".tsx"));
  const dangerousHtmlExemptFiles = new Set<string>([
    "app/layout.tsx",
  ]);

  for (const file of files) {
    const content = await readFile(file, "utf-8");
    if (!content.includes("dangerouslySetInnerHTML")) continue;
    const rel = relative(repoRoot, file).replaceAll("\\", "/");
    if (dangerousHtmlExemptFiles.has(rel)) continue;

    findings.push({
      severity: "medium",
      rule: "DANGEROUS_HTML",
      file: rel,
      details: "dangerouslySetInnerHTML detecte (verifier sanitization et justification).",
    });
  }

  return findings;
}

function toMarkdown(findings: Finding[]): string {
  const now = new Date().toISOString();
  const sorted = findings.sort((a, b) => severityRank(b.severity) - severityRank(a.severity));
  const bySeverity = {
    high: sorted.filter((f) => f.severity === "high").length,
    medium: sorted.filter((f) => f.severity === "medium").length,
    low: sorted.filter((f) => f.severity === "low").length,
  };

  const lines: string[] = [];
  lines.push("# Mini audit securite interne (OWASP cible)");
  lines.push("");
  lines.push(`- Date: ${now}`);
  lines.push("- Perimetre: routes API, surfaces XSS, hygiene logging");
  lines.push(
    `- Resultat: ${sorted.length} findings (high=${bySeverity.high}, medium=${bySeverity.medium}, low=${bySeverity.low})`
  );
  lines.push("");

  if (sorted.length === 0) {
    lines.push("Aucun finding detecte automatiquement.");
    lines.push("");
    return lines.join("\n");
  }

  lines.push("| Severity | Regle | Fichier | Detail |");
  lines.push("|---|---|---|---|");
  for (const finding of sorted) {
    lines.push(
      `| ${finding.severity.toUpperCase()} | ${finding.rule} | \`${finding.file}\` | ${finding.details} |`
    );
  }
  lines.push("");
  lines.push("## Recommandations");
  lines.push("- Corriger en priorite tous les findings HIGH.");
  lines.push("- Revoir les findings MEDIUM a la prochaine iteration securite.");
  lines.push("- Nettoyer les findings LOW en continu pour limiter la dette technique.");
  lines.push("");

  return lines.join("\n");
}

async function main() {
  const strictMode = process.argv.includes("--strict");
  const repoRoot = process.cwd();
  const findings = [
    ...(await auditApiRoutes(repoRoot)),
    ...(await auditDangerousHtml(repoRoot)),
  ];

  const report = toMarkdown(findings);
  const reportsDir = join(repoRoot, "reports");
  const outputPath = join(reportsDir, "SECURITY_MINI_AUDIT.md");
  await mkdir(reportsDir, { recursive: true });
  await writeFile(outputPath, report, "utf-8");

  console.log(`[SECURITY MINI AUDIT] Rapport genere: ${relative(repoRoot, outputPath)}`);
  const high = findings.filter((f) => f.severity === "high").length;
  const medium = findings.filter((f) => f.severity === "medium").length;
  const low = findings.filter((f) => f.severity === "low").length;
  console.log(`[SECURITY MINI AUDIT] Findings => high=${high}, medium=${medium}, low=${low}`);

  if (high > 0) {
    if (strictMode) {
      console.error("[SECURITY MINI AUDIT] Findings HIGH detectes (mode strict).");
      process.exit(1);
    }
    console.warn("[SECURITY MINI AUDIT] Findings HIGH detectes (mode rapport).");
  }
}

main().catch((error) => {
  console.error("[SECURITY MINI AUDIT] Echec execution:", error);
  process.exit(1);
});
