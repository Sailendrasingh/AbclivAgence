import { exec } from "child_process"
import { promisify } from "util"
import { createHash } from "crypto"

const execAsync = promisify(exec)

/**
 * Interface pour les résultats du scan antivirus
 */
export interface AntivirusScanResult {
  clean: boolean
  threat?: string
  engine?: string
  error?: string
}

/**
 * Signatures de fichiers suspects (heuristiques basiques)
 * Ces signatures peuvent indiquer des fichiers potentiellement malveillants
 */
const SUSPICIOUS_SIGNATURES = [
  // Scripts potentiellement malveillants
  /<script[^>]*>.*eval\(/i,
  /<script[^>]*>.*document\.cookie/i,
  /<script[^>]*>.*XMLHttpRequest/i,
  // Polyglots (fichiers qui sont à la fois images et scripts)
  /GIF89a.*<script/i,
  /PNG.*<script/i,
  // Entêtes suspects
  /MZ.*PE/i, // Fichier exécutable Windows
  /ELF/i, // Fichier exécutable Linux
]

/**
 * Scan un fichier avec ClamAV si disponible
 * @param filePath Chemin vers le fichier à scanner
 * @returns Résultat du scan
 */
async function scanWithClamAV(filePath: string): Promise<AntivirusScanResult> {
  try {
    // Vérifier si ClamAV est disponible
    try {
      await execAsync("clamdscan --version")
    } catch {
      // ClamAV n'est pas disponible
      return {
        clean: true,
        engine: "none",
        error: "ClamAV non disponible, utilisation des validations heuristiques uniquement",
      }
    }

    // Scanner le fichier avec ClamAV
    const { stdout, stderr } = await execAsync(`clamdscan --no-summary "${filePath}"`)
    
    // ClamAV retourne "OK" si le fichier est propre
    if (stdout.includes("OK") || stdout.includes("FOUND")) {
      const isClean = stdout.includes("OK")
      const threat = stdout.includes("FOUND") ? stdout.split(":")[1]?.trim() : undefined
      
      return {
        clean: isClean,
        threat,
        engine: "clamav",
      }
    }

    // Si erreur, considérer comme suspect
    if (stderr) {
      return {
        clean: false,
        threat: "Erreur lors du scan",
        engine: "clamav",
        error: stderr,
      }
    }

    return {
      clean: true,
      engine: "clamav",
    }
  } catch (error: any) {
    // Si ClamAV n'est pas disponible ou erreur, retourner un résultat indiquant l'utilisation du fallback
    return {
      clean: true,
      engine: "none",
      error: error.message || "ClamAV non disponible",
    }
  }
}

/**
 * Vérifie si un buffer correspond à un magic byte d'image valide
 * @param buffer Buffer à vérifier
 * @returns true si c'est une image valide (JPEG ou PNG)
 */
function isValidImageMagicBytes(buffer: Buffer): boolean {
  if (buffer.length < 8) return false

  // JPEG: 0xFF, 0xD8, 0xFF
  const isJPEG = buffer[0] === 0xFF && buffer[1] === 0xD8 && buffer[2] === 0xFF

  // PNG: 0x89, 0x50, 0x4E, 0x47, 0x0D, 0x0A, 0x1A, 0x0A
  const pngSignature = [0x89, 0x50, 0x4E, 0x47, 0x0D, 0x0A, 0x1A, 0x0A]
  let isPNG = true
  for (let i = 0; i < pngSignature.length; i++) {
    if (buffer[i] !== pngSignature[i]) {
      isPNG = false
      break
    }
  }

  return isJPEG || isPNG
}

/**
 * Scan heuristique d'un buffer de fichier
 * Vérifie la présence de signatures suspectes
 * @param buffer Buffer du fichier à scanner
 * @returns Résultat du scan
 */
function scanHeuristic(buffer: Buffer): AntivirusScanResult {
  // Si c'est une image valide (JPEG ou PNG), on est plus permissif
  // car les images binaires peuvent contenir des séquences qui ressemblent à du texte
  const isImage = isValidImageMagicBytes(buffer)

  // Pour les images, on ne vérifie que les séquences d'exécutables au début
  // et on évite de convertir en UTF-8 qui peut créer des faux positifs
  if (isImage) {
    // Vérifier uniquement les séquences d'exécutables au début du fichier
    // (les images ne devraient pas commencer par MZ ou ELF)
    const suspiciousBytes = [
      [0x4D, 0x5A], // MZ (exécutable Windows) - ne doit PAS être au début d'une image
      [0x7F, 0x45, 0x4C, 0x46], // ELF (exécutable Linux) - ne doit PAS être au début d'une image
    ]

    for (const seq of suspiciousBytes) {
      let found = true
      for (let i = 0; i < seq.length; i++) {
        if (buffer[i] !== seq[i]) {
          found = false
          break
        }
      }
      if (found) {
        return {
          clean: false,
          threat: "Séquence d'exécutable détectée au début du fichier",
          engine: "heuristic",
        }
      }
    }

    // Pour les images valides, on accepte le fichier
    // (le scan de texte peut créer des faux positifs avec les données binaires)
    return {
      clean: true,
      engine: "heuristic",
    }
  }

  // Pour les fichiers non-images, on fait un scan plus complet
  // Mais on limite la conversion UTF-8 aux premiers bytes pour éviter les problèmes
  const maxBytesToCheck = Math.min(buffer.length, 10000)
  let content: string
  
  try {
    // Essayer de convertir en UTF-8, mais ignorer les erreurs de conversion
    content = buffer.toString("utf-8", 0, maxBytesToCheck)
  } catch {
    // Si la conversion échoue, c'est probablement un fichier binaire
    // Pour les fichiers binaires non-images, on vérifie uniquement les séquences d'exécutables
    const suspiciousBytes = [
      [0x4D, 0x5A], // MZ
      [0x7F, 0x45, 0x4C, 0x46], // ELF
    ]

    for (const seq of suspiciousBytes) {
      let found = true
      for (let i = 0; i < seq.length; i++) {
        if (buffer[i] !== seq[i]) {
          found = false
          break
        }
      }
      if (found) {
        return {
          clean: false,
          threat: "Séquence d'exécutable détectée",
          engine: "heuristic",
        }
      }
    }

    return {
      clean: true,
      engine: "heuristic",
    }
  }

  // Scanner les signatures de texte suspect uniquement pour les fichiers texte
  for (const signature of SUSPICIOUS_SIGNATURES) {
    if (signature.test(content)) {
      return {
        clean: false,
        threat: "Signature suspecte détectée",
        engine: "heuristic",
      }
    }
  }

  // Vérifier les séquences d'exécutables
  const suspiciousBytes = [
    [0x4D, 0x5A], // MZ
    [0x7F, 0x45, 0x4C, 0x46], // ELF
  ]

  for (const seq of suspiciousBytes) {
    let found = true
    for (let i = 0; i < seq.length; i++) {
      if (buffer[i] !== seq[i]) {
        found = false
        break
      }
    }
    if (found) {
      return {
        clean: false,
        threat: "Séquence d'exécutable détectée",
        engine: "heuristic",
      }
    }
  }

  return {
    clean: true,
    engine: "heuristic",
  }
}

/**
 * Scan un fichier avec antivirus (ClamAV si disponible, sinon heuristique)
 * @param filePath Chemin vers le fichier à scanner
 * @param buffer Buffer du fichier (pour scan heuristique si ClamAV indisponible)
 * @returns Résultat du scan
 */
export async function scanFile(
  filePath: string,
  buffer: Buffer
): Promise<AntivirusScanResult> {
  // Essayer d'abord avec ClamAV
  const clamavResult = await scanWithClamAV(filePath)
  
  // Si ClamAV est disponible et a trouvé une menace, retourner le résultat
  if (clamavResult.engine === "clamav" && !clamavResult.clean) {
    return clamavResult
  }

  // Sinon, utiliser le scan heuristique en complément
  const heuristicResult = scanHeuristic(buffer)
  
  // Si l'heuristique détecte une menace, retourner ce résultat
  if (!heuristicResult.clean) {
    return heuristicResult
  }

  // Si ClamAV était disponible et a retourné clean, utiliser ce résultat
  if (clamavResult.engine === "clamav" && clamavResult.clean) {
    return {
      ...clamavResult,
      // Ajouter une note que l'heuristique a aussi été utilisée
    }
  }

  // Sinon, retourner le résultat heuristique
  return {
    ...heuristicResult,
    error: clamavResult.error, // Inclure l'erreur ClamAV si présente
  }
}

/**
 * Vérifie si ClamAV est disponible sur le système
 * @returns true si ClamAV est disponible
 */
export async function isClamAVAvailable(): Promise<boolean> {
  try {
    await execAsync("clamdscan --version")
    return true
  } catch {
    return false
  }
}

