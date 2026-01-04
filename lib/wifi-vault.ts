/**
 * Module de vault sécurisé pour les mots de passe WiFi
 * Conforme OWASP Top 10 2021 - A02: Cryptographic Failures
 * 
 * Utilise un chiffrement par entrée avec :
 * - AES-256-GCM (chiffrement authentifié)
 * - Salt unique par mot de passe
 * - Dérivation de clé avec scrypt (comme les sauvegardes)
 * - Contexte unique (ID du WiFi AP) pour la dérivation
 * 
 * Avantages par rapport à l'ancien système :
 * - Chaque mot de passe a sa propre clé dérivée
 * - Si une clé est compromise, les autres restent sécurisées
 * - Chiffrement authentifié (détection de modification)
 */

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

// Contexte pour la dérivation de clé (différencie le vault WiFi des sauvegardes)
const VAULT_CONTEXT = 'abcliv-wifi-vault'

/**
 * Récupère la clé maître du vault depuis les variables d'environnement
 * Utilise ENCRYPTION_KEY mais avec un contexte différent pour la dérivation
 */
function getVaultMasterKey(): string {
  const key = process.env.ENCRYPTION_KEY
  if (!key) {
    if (process.env.NODE_ENV === "production" && process.env.VERCEL_ENV !== undefined) {
      throw new Error(
        'ENCRYPTION_KEY n\'est pas définie dans les variables d\'environnement. ' +
        'Générez une clé de 32 caractères minimum avec: node -e "console.log(require(\'crypto\').randomBytes(32).toString(\'hex\'))"'
      )
    }
    // En développement, utiliser une clé par défaut (avec avertissement)
    if (process.env.NODE_ENV !== "production") {
      console.warn("⚠️ ATTENTION: ENCRYPTION_KEY non définie. Utilisation d'une clé par défaut non sécurisée pour le vault WiFi.")
    }
    return "default-encryption-key-32-chars!!" // Dev uniquement
  }
  if (key.length < 32) {
    throw new Error(
      'ENCRYPTION_KEY doit contenir au moins 32 caractères pour garantir la sécurité'
    )
  }
  return key
}

/**
 * Dérive une clé unique pour un mot de passe spécifique
 * @param wifiAPId - ID unique du point d'accès WiFi (contexte)
 * @param salt - Salt unique pour ce mot de passe
 * @returns Clé dérivée de 32 bytes
 */
function deriveKeyForPassword(wifiAPId: string, salt: Buffer): Buffer {
  const masterKey = getVaultMasterKey()
  
  // Créer un contexte unique en combinant le contexte du vault et l'ID du WiFi AP
  // Cela garantit que chaque WiFi AP a une clé différente même avec le même salt
  const context = `${VAULT_CONTEXT}:${wifiAPId}`
  
  // Dériver la clé avec scrypt
  return scryptSync(masterKey + context, salt, KEY_LENGTH, {
    N: SCRYPT_N,
    r: SCRYPT_R,
    p: SCRYPT_P,
  })
}

/**
 * Chiffre un mot de passe WiFi avec un chiffrement par entrée
 * @param password - Mot de passe en clair
 * @param wifiAPId - ID unique du point d'accès WiFi
 * @returns Chaîne chiffrée au format: salt:iv:tag:encrypted (tous en hex)
 */
export function encryptWifiPassword(password: string, wifiAPId: string): string {
  if (!password) {
    throw new Error("Le mot de passe ne peut pas être vide")
  }
  if (!wifiAPId) {
    throw new Error("L'ID du point d'accès WiFi est requis")
  }

  // Générer un salt unique pour ce mot de passe
  const salt = randomBytes(SALT_LENGTH)
  
  // Dériver une clé unique pour ce mot de passe
  const key = deriveKeyForPassword(wifiAPId, salt)
  
  // Générer un IV unique
  const iv = randomBytes(IV_LENGTH)
  
  // Chiffrer avec AES-256-GCM
  const cipher = createCipheriv(ALGORITHM, key, iv)
  cipher.setAAD(Buffer.from(wifiAPId, 'utf8')) // Additional Authenticated Data (ID du WiFi AP)
  
  const encrypted = Buffer.concat([
    cipher.update(password, 'utf8'),
    cipher.final(),
  ])
  
  const tag = cipher.getAuthTag()
  
  // Format: salt:iv:tag:encrypted (tous en hex, séparés par :)
  return [
    salt.toString('hex'),
    iv.toString('hex'),
    tag.toString('hex'),
    encrypted.toString('hex')
  ].join(':')
}

/**
 * Déchiffre un mot de passe WiFi
 * @param encryptedPassword - Mot de passe chiffré au format: salt:iv:tag:encrypted
 * @param wifiAPId - ID unique du point d'accès WiFi
 * @returns Mot de passe en clair
 */
export function decryptWifiPassword(encryptedPassword: string, wifiAPId: string): string {
  if (!encryptedPassword) {
    return ""
  }
  if (!wifiAPId) {
    throw new Error("L'ID du point d'accès WiFi est requis")
  }

  try {
    // Parser le format: salt:iv:tag:encrypted
    const parts = encryptedPassword.split(':')
    if (parts.length !== 4) {
      throw new Error("Format de mot de passe chiffré invalide")
    }

    const salt = Buffer.from(parts[0], 'hex')
    const iv = Buffer.from(parts[1], 'hex')
    const tag = Buffer.from(parts[2], 'hex')
    const encrypted = Buffer.from(parts[3], 'hex')

    // Vérifier les tailles
    if (salt.length !== SALT_LENGTH || iv.length !== IV_LENGTH || tag.length !== TAG_LENGTH) {
      throw new Error("Tailles de composants invalides")
    }

    // Dériver la clé pour ce mot de passe
    const key = deriveKeyForPassword(wifiAPId, salt)

    // Déchiffrer avec AES-256-GCM
    const decipher = createDecipheriv(ALGORITHM, key, iv)
    decipher.setAuthTag(tag)
    decipher.setAAD(Buffer.from(wifiAPId, 'utf8'))

    const decrypted = Buffer.concat([
      decipher.update(encrypted),
      decipher.final(),
    ])

    return decrypted.toString('utf8')
  } catch (error: any) {
    console.error("Erreur lors du déchiffrement du mot de passe WiFi:", error)
    throw new Error("Impossible de déchiffrer le mot de passe. Il peut être corrompu ou utiliser un format ancien.")
  }
}

/**
 * Vérifie si un mot de passe chiffré utilise le nouveau format du vault
 * @param encryptedPassword - Mot de passe chiffré
 * @returns true si c'est le nouveau format (vault), false sinon
 */
export function isVaultFormat(encryptedPassword: string): boolean {
  if (!encryptedPassword) {
    return false
  }
  
  // Le nouveau format contient 4 parties séparées par :
  // Ancien format (AES-256-CBC) : 2 parties (iv:encrypted)
  // Ancien format (argon2) : commence par $argon2
  const parts = encryptedPassword.split(':')
  
  // Nouveau format : 4 parties (salt:iv:tag:encrypted)
  if (parts.length === 4) {
    // Vérifier que ce sont bien des hex valides
    try {
      parts.forEach(part => {
        if (!/^[0-9a-f]+$/i.test(part)) {
          throw new Error("Format invalide")
        }
      })
      return true
    } catch {
      return false
    }
  }
  
  return false
}

/**
 * Migre un ancien mot de passe chiffré vers le nouveau format du vault
 * @param oldEncryptedPassword - Ancien mot de passe chiffré (AES-256-CBC)
 * @param wifiAPId - ID unique du point d'accès WiFi
 * @returns Nouveau mot de passe chiffré au format vault
 */
export function migrateOldPassword(oldEncryptedPassword: string, wifiAPId: string): string {
  // D'abord, déchiffrer avec l'ancien système
  const masterKey = getVaultMasterKey().substring(0, 32)
  const parts = oldEncryptedPassword.split(':')
  
  if (parts.length !== 2) {
    throw new Error("Format d'ancien mot de passe invalide")
  }

  try {
    const iv = Buffer.from(parts[0], 'hex')
    const encryptedText = parts[1]
    
    const decipher = createDecipheriv('aes-256-cbc', Buffer.from(masterKey), iv)
    let decrypted = decipher.update(encryptedText, 'hex', 'utf8')
    decrypted += decipher.final('utf8')
    
    // Puis chiffrer avec le nouveau système
    return encryptWifiPassword(decrypted, wifiAPId)
  } catch (error: any) {
    throw new Error(`Erreur lors de la migration: ${error.message}`)
  }
}

