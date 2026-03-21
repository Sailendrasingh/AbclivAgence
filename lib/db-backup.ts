/**
 * Utilitaires de sauvegarde/restauration PostgreSQL.
 * PostgreSQL : utilise pg_dump et psql (postgresql-client doit être installé).
 */

import { spawnSync } from "child_process"

export function isPostgresUrl(url: string): boolean {
  return !!(url && (url.startsWith("postgresql://") || url.startsWith("postgres://")))
}

/**
 * Créer un dump PostgreSQL via pg_dump.
 * Nécessite postgresql-client installé (apt-get install postgresql-client).
 */
export function pgDumpToFile(dbUrl: string, outputPath: string): void {
  try {
    const result = spawnSync("pg_dump", [dbUrl, "--no-owner", "--no-acl", "-f", outputPath], {
      stdio: "pipe",
      encoding: "utf-8",
      maxBuffer: 50 * 1024 * 1024,
    })
    if (result.status !== 0) {
      throw new Error(result.stderr || result.stdout || `pg_dump exited with code ${result.status}`)
    }
  } catch (err: unknown) {
    const msg = err instanceof Error ? err.message : String(err)
    if (msg.includes("pg_dump: command not found") || msg.includes("'pg_dump' is not recognized")) {
      throw new Error(
        "pg_dump non trouvé. Installez postgresql-client (Ubuntu: apt-get install postgresql-client)"
      )
    }
    throw err
  }
}

/**
 * Restaurer un dump PostgreSQL via psql.
 */
export function pgRestoreFromFile(dbUrl: string, dumpPath: string): void {
  try {
    const result = spawnSync("psql", [dbUrl, "-f", dumpPath, "-v", "ON_ERROR_STOP=1"], {
      stdio: "pipe",
      encoding: "utf-8",
      maxBuffer: 50 * 1024 * 1024,
    })
    if (result.status !== 0) {
      throw new Error(result.stderr || result.stdout || `psql exited with code ${result.status}`)
    }
  } catch (err: unknown) {
    const msg = err instanceof Error ? err.message : String(err)
    if (msg.includes("psql: command not found") || msg.includes("'psql' is not recognized")) {
      throw new Error(
        "psql non trouvé. Installez postgresql-client (Ubuntu: apt-get install postgresql-client)"
      )
    }
    throw err
  }
}

