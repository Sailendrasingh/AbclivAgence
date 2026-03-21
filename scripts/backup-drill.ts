import "dotenv/config";
import { readdir, rm, unlink, mkdir } from "fs/promises";
import { createWriteStream } from "fs";
import { join } from "path";
import { existsSync } from "fs";
import yauzl from "yauzl";
import { decryptFile } from "../lib/encryption";
import { verifyFileIntegrity } from "../lib/backup-integrity";

async function getLatestEncryptedBackup(backupsDir: string): Promise<string | null> {
  if (!existsSync(backupsDir)) return null;
  const files = await readdir(backupsDir);
  const candidates = files
    .filter((f) => f.startsWith("backup-") && f.endsWith(".encrypted.zip"))
    .sort()
    .reverse();
  return candidates[0] || null;
}

async function extractDumpSqlFromZip(zipPath: string, outputDir: string): Promise<string | null> {
  return new Promise((resolve, reject) => {
    yauzl.open(zipPath, { lazyEntries: true }, (err, zipfile) => {
      if (err || !zipfile) return reject(err || new Error("Impossible d'ouvrir l'archive ZIP"));
      let dumpPath: string | null = null;
      zipfile.readEntry();

      zipfile.on("entry", (entry: any) => {
        const name = String(entry.fileName || "").replace(/\\/g, "/");
        if (/\/$/.test(name)) {
          zipfile.readEntry();
          return;
        }
        if (name.toLowerCase() !== "dump.sql") {
          zipfile.readEntry();
          return;
        }
        dumpPath = join(outputDir, "dump.sql");
        zipfile.openReadStream(entry, (streamErr, readStream) => {
          if (streamErr || !readStream) return reject(streamErr || new Error("Flux ZIP invalide"));
          const ws = createWriteStream(dumpPath!);
          readStream.pipe(ws);
          ws.on("close", () => resolve(dumpPath));
          ws.on("error", reject);
        });
      });

      zipfile.on("end", () => resolve(dumpPath));
      zipfile.on("error", reject);
    });
  });
}

async function main() {
  const backupsDir = join(process.cwd(), "backups");
  const latest = await getLatestEncryptedBackup(backupsDir);

  if (!latest) {
    console.error("Aucune sauvegarde chiffrée trouvée (backup-*.encrypted.zip).");
    process.exit(1);
  }

  const backupPath = join(backupsDir, latest);
  const integrity = await verifyFileIntegrity(backupPath);
  if (!integrity.valid) {
    console.error(`Integrite KO pour ${latest}: ${integrity.error || "checksum invalide"}`);
    process.exit(1);
  }

  const tempDir = join(backupsDir, `drill-${Date.now()}`);
  const tempZip = join(tempDir, "decrypted.zip");
  try {
    await rm(tempDir, { recursive: true, force: true });
    await rm(tempZip, { force: true });
  } catch {}

  try {
    await rm(tempDir, { recursive: true, force: true }).catch(() => {});
    await mkdir(tempDir, { recursive: true });
    await decryptFile(backupPath, tempZip);
    const dumpPath = await extractDumpSqlFromZip(tempZip, tempDir);
    if (!dumpPath) {
      console.error("Drill KO: dump.sql absent de l'archive.");
      process.exit(1);
    }
    console.log(`Drill OK: sauvegarde ${latest} verifiee, dump detecte.`);
  } finally {
    await unlink(tempZip).catch(() => {});
    await rm(tempDir, { recursive: true, force: true }).catch(() => {});
  }
}

main().catch((error) => {
  console.error("Echec du drill de restauration:", error instanceof Error ? error.message : String(error));
  process.exit(1);
});
