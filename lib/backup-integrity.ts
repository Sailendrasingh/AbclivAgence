/**
 * Module de validation de l'intégrité des sauvegardes
 * Conforme OWASP Top 10 2021 - A08: Data Integrity Failures
 * 
 * Utilise SHA-256 pour calculer et vérifier les checksums des sauvegardes
 */

import { createHash } from "crypto"
import { readFile, writeFile, readdir } from "fs/promises"
import { join } from "path"
import { existsSync } from "fs"

/**
 * Calcule le checksum SHA-256 d'un fichier
 * @param filePath Chemin vers le fichier
 * @returns Checksum SHA-256 en hexadécimal
 */
export async function calculateFileChecksum(filePath: string): Promise<string> {
  const fileData = await readFile(filePath)
  const hash = createHash("sha256")
  hash.update(fileData)
  return hash.digest("hex")
}

/**
 * Calcule le checksum SHA-256 d'un buffer
 * @param buffer Buffer à hasher
 * @returns Checksum SHA-256 en hexadécimal
 */
export function calculateBufferChecksum(buffer: Buffer): string {
  const hash = createHash("sha256")
  hash.update(buffer)
  return hash.digest("hex")
}

/**
 * Sauvegarde le checksum d'un fichier dans un fichier .sha256
 * @param filePath Chemin vers le fichier
 * @param checksum Checksum à sauvegarder (optionnel, sera calculé si non fourni)
 * @returns Checksum calculé et sauvegardé
 */
export async function saveChecksum(
  filePath: string,
  checksum?: string
): Promise<string> {
  const checksumValue = checksum || await calculateFileChecksum(filePath)
  const checksumPath = `${filePath}.sha256`
  
  // Format : checksum  filename
  // Exemple : a1b2c3d4...  backup-2026-01-30.encrypted.zip
  const filename = filePath.split(/[/\\]/).pop() || "unknown"
  const checksumContent = `${checksumValue}  ${filename}\n`
  
  await writeFile(checksumPath, checksumContent, "utf-8")
  return checksumValue
}

/**
 * Lit le checksum stocké pour un fichier
 * @param filePath Chemin vers le fichier
 * @returns Checksum stocké ou null si le fichier de checksum n'existe pas
 */
export async function readStoredChecksum(filePath: string): Promise<string | null> {
  const checksumPath = `${filePath}.sha256`
  
  if (!existsSync(checksumPath)) {
    return null
  }
  
  try {
    const checksumContent = await readFile(checksumPath, "utf-8")
    // Format : checksum  filename
    const checksum = checksumContent.trim().split(/\s+/)[0]
    return checksum || null
  } catch (error) {
    console.error(`Erreur lors de la lecture du checksum pour ${filePath}:`, error)
    return null
  }
}

/**
 * Vérifie l'intégrité d'un fichier en comparant son checksum avec celui stocké
 * @param filePath Chemin vers le fichier
 * @returns Résultat de la vérification
 */
export async function verifyFileIntegrity(filePath: string): Promise<{
  valid: boolean
  storedChecksum: string | null
  calculatedChecksum: string
  error?: string
}> {
  try {
    // Calculer le checksum actuel du fichier
    const calculatedChecksum = await calculateFileChecksum(filePath)
    
    // Lire le checksum stocké
    const storedChecksum = await readStoredChecksum(filePath)
    
    if (!storedChecksum) {
      return {
        valid: false,
        storedChecksum: null,
        calculatedChecksum,
        error: "Aucun checksum stocké trouvé pour cette sauvegarde",
      }
    }
    
    // Comparer les checksums (comparaison en temps constant pour éviter les attaques par timing)
    const isValid = constantTimeEqual(calculatedChecksum, storedChecksum)
    
    if (!isValid) {
      return {
        valid: false,
        storedChecksum,
        calculatedChecksum,
        error: "Le checksum ne correspond pas. La sauvegarde peut être corrompue.",
      }
    }
    
    return {
      valid: true,
      storedChecksum,
      calculatedChecksum,
    }
  } catch (error: any) {
    return {
      valid: false,
      storedChecksum: null,
      calculatedChecksum: "",
      error: error.message || "Erreur lors de la vérification de l'intégrité",
    }
  }
}

/**
 * Comparaison en temps constant pour éviter les attaques par timing
 */
function constantTimeEqual(a: string, b: string): boolean {
  if (a.length !== b.length) {
    return false
  }
  
  let result = 0
  for (let i = 0; i < a.length; i++) {
    result |= a.charCodeAt(i) ^ b.charCodeAt(i)
  }
  
  return result === 0
}

/**
 * Nettoie les fichiers de checksum orphelins (sans fichier correspondant)
 * @param backupsDir Dossier contenant les sauvegardes
 */
export async function cleanupOrphanedChecksums(backupsDir: string): Promise<number> {
  if (!existsSync(backupsDir)) {
    return 0
  }
  
  const files = await readdir(backupsDir)
  const checksumFiles = files.filter(file => file.endsWith(".sha256"))
  
  let deletedCount = 0
  for (const checksumFile of checksumFiles) {
    // Le fichier de checksum correspond à un fichier sans l'extension .sha256
    const originalFile = checksumFile.replace(/\.sha256$/, "")
    const originalFilePath = join(backupsDir, originalFile)
    
    if (!existsSync(originalFilePath)) {
      // Le fichier original n'existe plus, supprimer le checksum orphelin
      try {
        const { unlink } = await import("fs/promises")
        await unlink(join(backupsDir, checksumFile))
        deletedCount++
      } catch (error) {
        console.warn(`Impossible de supprimer le checksum orphelin ${checksumFile}:`, error)
      }
    }
  }
  
  return deletedCount
}

