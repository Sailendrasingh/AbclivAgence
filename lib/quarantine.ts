import { writeFile, mkdir, rename, unlink, stat } from "fs/promises"
import { join } from "path"
import { scanFile, AntivirusScanResult } from "./antivirus"

/**
 * Configuration de la quarantaine
 */
const QUARANTINE_DIR = join(process.cwd(), "uploads", "quarantine")
const QUARANTINE_DURATION_MS = 5 * 60 * 1000 // 5 minutes par défaut

/**
 * Interface pour les informations de quarantaine
 */
export interface QuarantineInfo {
  filePath: string
  originalName: string
  quarantinedAt: Date
  scanResult?: AntivirusScanResult
}

/**
 * Crée le dossier de quarantaine s'il n'existe pas
 */
async function ensureQuarantineDir(): Promise<void> {
  try {
    await mkdir(QUARANTINE_DIR, { recursive: true })
  } catch {
    // Le dossier existe déjà
  }
}

/**
 * Génère un nom de fichier unique pour la quarantaine
 * @param originalName Nom original du fichier
 * @returns Nom de fichier unique
 */
function generateQuarantineFileName(originalName: string): string {
  const timestamp = Date.now()
  const random = Math.random().toString(36).substring(2, 15)
  const extension = originalName.split(".").pop() || "tmp"
  return `quarantine-${timestamp}-${random}.${extension}`
}

/**
 * Met un fichier en quarantaine
 * @param buffer Buffer du fichier
 * @param originalName Nom original du fichier
 * @returns Informations de quarantaine
 */
export async function quarantineFile(
  buffer: Buffer,
  originalName: string
): Promise<QuarantineInfo> {
  await ensureQuarantineDir()

  const quarantineFileName = generateQuarantineFileName(originalName)
  const quarantinePath = join(QUARANTINE_DIR, quarantineFileName)

  // Écrire le fichier dans la quarantaine
  await writeFile(quarantinePath, buffer)

  return {
    filePath: quarantinePath,
    originalName,
    quarantinedAt: new Date(),
  }
}

/**
 * Scanne un fichier en quarantaine
 * @param quarantineInfo Informations de quarantaine
 * @param buffer Buffer original du fichier (pour scan heuristique)
 * @returns Résultat du scan
 */
export async function scanQuarantinedFile(
  quarantineInfo: QuarantineInfo,
  buffer: Buffer
): Promise<AntivirusScanResult> {
  return await scanFile(quarantineInfo.filePath, buffer)
}

/**
 * Libère un fichier de la quarantaine vers la destination finale
 * @param quarantineInfo Informations de quarantaine
 * @param finalDestination Destination finale du fichier
 * @returns Chemin final du fichier
 */
export async function releaseFromQuarantine(
  quarantineInfo: QuarantineInfo,
  finalDestination: string
): Promise<string> {
  try {
    // Créer le dossier de destination s'il n'existe pas
    const path = await import("path")
    const finalDir = path.dirname(finalDestination)
    await mkdir(finalDir, { recursive: true })

    // Déplacer le fichier
    await rename(quarantineInfo.filePath, finalDestination)

    return finalDestination
  } catch (error) {
    // Erreur lors du déplacement, supprimer de la quarantaine
    try {
      await unlink(quarantineInfo.filePath)
    } catch {
      // Ignorer
    }

    throw new Error(`Erreur lors du déplacement du fichier depuis la quarantaine: ${error}`)
  }
}

/**
 * Nettoie les fichiers en quarantaine plus anciens que la durée spécifiée
 * @param maxAgeMs Âge maximum en millisecondes (défaut: 24h)
 */
export async function cleanOldQuarantineFiles(maxAgeMs: number = 24 * 60 * 60 * 1000): Promise<void> {
  try {
    const fs = await import("fs/promises")
    const files = await fs.readdir(QUARANTINE_DIR)

    const now = Date.now()

    for (const file of files) {
      if (!file.startsWith("quarantine-")) continue

      const filePath = join(QUARANTINE_DIR, file)
      try {
        const stats = await stat(filePath)
        const age = now - stats.mtimeMs

        if (age > maxAgeMs) {
          await unlink(filePath)
          console.log(`[QUARANTINE] Fichier ancien supprimé: ${file}`)
        }
      } catch {
        // Ignorer les erreurs
      }
    }
  } catch {
    // Ignorer les erreurs de nettoyage
  }
}

/**
 * Supprime un fichier de la quarantaine
 * @param quarantinePath Chemin du fichier en quarantaine
 */
export async function removeFromQuarantine(quarantinePath: string): Promise<void> {
  try {
    await unlink(quarantinePath)
  } catch {
    // Ignorer les erreurs
  }
}

