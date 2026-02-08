import { createCipheriv, createDecipheriv, randomBytes, scryptSync } from 'crypto'

const ALGORITHM = 'aes-256-gcm'
const KEY_LENGTH = 32 // 256 bits
const IV_LENGTH = 16 // 128 bits
const SALT_LENGTH = 32
const TAG_LENGTH = 16

// Paramètres scrypt pour ASVS Niveau 3 (dérivation de clé sécurisée)
const SCRYPT_N = 16384 // CPU/memory cost factor (2^14)
const SCRYPT_R = 8     // Block size
const SCRYPT_P = 1     // Parallelization factor

/**
 * Génère une clé de chiffrement à partir d'une phrase secrète
 * Utilise scrypt avec paramètres explicites pour ASVS Niveau 3
 */
function deriveKey(password: string, salt: Buffer): Buffer {
  return scryptSync(password, salt, KEY_LENGTH, {
    N: SCRYPT_N,
    r: SCRYPT_R,
    p: SCRYPT_P,
  })
}

/**
 * Récupère la clé de chiffrement depuis les variables d'environnement
 */
function getEncryptionKey(): string {
  const key = process.env.ENCRYPTION_KEY
  if (!key) {
    throw new Error(
      'ENCRYPTION_KEY n\'est pas définie dans les variables d\'environnement. ' +
      'Générez une clé de 32 caractères minimum avec: node -e "console.log(require(\'crypto\').randomBytes(32).toString(\'hex\'))"'
    )
  }
  if (key.length < 32) {
    throw new Error(
      'ENCRYPTION_KEY doit contenir au moins 32 caractères pour garantir la sécurité'
    )
  }
  return key
}

/**
 * Chiffre un buffer de données avec AES-256-GCM
 * @param data Données à chiffrer
 * @returns Buffer contenant: salt (32 bytes) + iv (16 bytes) + tag (16 bytes) + données chiffrées
 */
export function encryptBuffer(data: Buffer): Buffer {
  const password = getEncryptionKey()
  const salt = randomBytes(SALT_LENGTH)
  const key = deriveKey(password, salt)
  const iv = randomBytes(IV_LENGTH)
  
  const cipher = createCipheriv(ALGORITHM, key, iv)
  cipher.setAAD(Buffer.from('abcliv-agency-backup', 'utf8')) // Additional Authenticated Data
  
  const encrypted = Buffer.concat([
    cipher.update(data),
    cipher.final(),
  ])
  
  const tag = cipher.getAuthTag()
  
  // Format: salt (32) + iv (16) + tag (16) + encrypted data
  return Buffer.concat([salt, iv, tag, encrypted])
}

/**
 * Déchiffre un buffer de données avec AES-256-GCM
 * @param encryptedData Buffer chiffré contenant: salt + iv + tag + données
 * @returns Buffer déchiffré
 */
export function decryptBuffer(encryptedData: Buffer): Buffer {
  const password = getEncryptionKey()
  
  // Extraire les composants
  const salt = encryptedData.subarray(0, SALT_LENGTH)
  const iv = encryptedData.subarray(SALT_LENGTH, SALT_LENGTH + IV_LENGTH)
  const tag = encryptedData.subarray(
    SALT_LENGTH + IV_LENGTH,
    SALT_LENGTH + IV_LENGTH + TAG_LENGTH
  )
  const encrypted = encryptedData.subarray(SALT_LENGTH + IV_LENGTH + TAG_LENGTH)
  
  const key = deriveKey(password, salt)
  
  const decipher = createDecipheriv(ALGORITHM, key, iv)
  decipher.setAuthTag(tag)
  decipher.setAAD(Buffer.from('abcliv-agency-backup', 'utf8'))
  
  const decrypted = Buffer.concat([
    decipher.update(encrypted),
    decipher.final(),
  ])
  
  return decrypted
}

/**
 * Chiffre un fichier complet
 * @param inputPath Chemin du fichier à chiffrer
 * @param outputPath Chemin du fichier chiffré de sortie
 */
export async function encryptFile(
  inputPath: string,
  outputPath: string
): Promise<void> {
  const { readFile, writeFile } = await import('fs/promises')
  const data = await readFile(inputPath)
  const encrypted = encryptBuffer(data)
  await writeFile(outputPath, encrypted)
}

/**
 * Déchiffre un fichier complet
 * @param inputPath Chemin du fichier chiffré
 * @param outputPath Chemin du fichier déchiffré de sortie
 */
export async function decryptFile(
  inputPath: string,
  outputPath: string
): Promise<void> {
  const { readFile, writeFile } = await import('fs/promises')
  const encrypted = await readFile(inputPath)
  const decrypted = decryptBuffer(encrypted)
  await writeFile(outputPath, decrypted)
}

// Signature ZIP (PK) : les fichiers ZIP bruts ne doivent pas être pris pour du chiffré
const ZIP_MAGIC = Buffer.from([0x50, 0x4b]) // "PK"

/**
 * Vérifie si un fichier est au format chiffré (AES-GCM avec salt+iv+tag).
 * Un fichier ZIP brut (ex. backup-before-restore) commence par "PK" et ne doit pas être déchiffré.
 */
export function isEncryptedFile(data: Buffer): boolean {
  if (data.length < SALT_LENGTH + IV_LENGTH + TAG_LENGTH) return false
  // Ne pas considérer un ZIP brut comme chiffré (évite erreur de déchiffrement sur backup-before-restore)
  if (data.length >= 2 && data[0] === ZIP_MAGIC[0] && data[1] === ZIP_MAGIC[1]) return false
  return true
}

