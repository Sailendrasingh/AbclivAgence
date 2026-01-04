/**
 * Système de logging centralisé
 * Conforme OWASP Top 10 2021 - A09: Security Logging and Monitoring Failures
 * 
 * Utilise Winston pour un logging structuré avec :
 * - Niveaux de log (error, warn, info, debug)
 * - Format JSON structuré
 * - Métadonnées contextuelles (userId, action, IP, etc.)
 * - Support pour plusieurs transports (console, fichier, service externe)
 * - Rotation automatique des fichiers de log
 */

import winston from 'winston'
import path from 'path'
import fs from 'fs'

// Créer le dossier logs s'il n'existe pas
const logsDir = path.join(process.cwd(), 'logs')
if (!fs.existsSync(logsDir)) {
  fs.mkdirSync(logsDir, { recursive: true })
}

// Format personnalisé pour les logs
const logFormat = winston.format.combine(
  winston.format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),
  winston.format.errors({ stack: true }),
  winston.format.splat(),
  winston.format.json()
)

// Format pour la console (plus lisible)
const consoleFormat = winston.format.combine(
  winston.format.colorize(),
  winston.format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),
  winston.format.printf(({ timestamp, level, message, ...meta }) => {
    let msg = `${timestamp} [${level}]: ${message}`
    if (Object.keys(meta).length > 0) {
      msg += ` ${JSON.stringify(meta)}`
    }
    return msg
  })
)

// Transports (destinations des logs)
const transports: winston.transport[] = [
  // Console (toujours actif)
  new winston.transports.Console({
    format: consoleFormat,
    level: process.env.NODE_ENV === 'production' ? 'info' : 'debug',
  }),
  
  // Fichier pour tous les logs
  new winston.transports.File({
    filename: path.join(logsDir, 'combined.log'),
    format: logFormat,
    maxsize: 10 * 1024 * 1024, // 10MB
    maxFiles: 5,
    tailable: true,
  }),
  
  // Fichier séparé pour les erreurs
  new winston.transports.File({
    filename: path.join(logsDir, 'error.log'),
    format: logFormat,
    level: 'error',
    maxsize: 10 * 1024 * 1024, // 10MB
    maxFiles: 5,
    tailable: true,
  }),
  
  // Fichier séparé pour les logs de sécurité
  new winston.transports.File({
    filename: path.join(logsDir, 'security.log'),
    format: logFormat,
    maxsize: 10 * 1024 * 1024, // 10MB
    maxFiles: 10, // Garder plus d'historique pour la sécurité
    tailable: true,
  }),
]

// Ajouter un transport pour un service externe si configuré
// Exemple : CloudWatch, ELK, Splunk, etc.
if (process.env.LOG_SERVICE_URL) {
  // Transport HTTP personnalisé (exemple pour un service externe)
  // À adapter selon le service utilisé
  transports.push(
    new winston.transports.Http({
      host: process.env.LOG_SERVICE_HOST || 'localhost',
      port: parseInt(process.env.LOG_SERVICE_PORT || '3000'),
      path: process.env.LOG_SERVICE_PATH || '/logs',
      format: logFormat,
      level: 'info', // Envoyer seulement info et au-dessus
    })
  )
}

// Créer le logger principal
export const logger = winston.createLogger({
  level: process.env.LOG_LEVEL || (process.env.NODE_ENV === 'production' ? 'info' : 'debug'),
  format: logFormat,
  defaultMeta: {
    service: 'abcliv-agency',
    environment: process.env.NODE_ENV || 'development',
  },
  transports,
  // Ne pas quitter en cas d'erreur
  exitOnError: false,
})

/**
 * Logger pour les actions de sécurité
 * Les logs de sécurité sont toujours enregistrés même en production
 */
export const securityLogger = winston.createLogger({
  level: 'info',
  format: logFormat,
  defaultMeta: {
    service: 'abcliv-agency',
    type: 'security',
    environment: process.env.NODE_ENV || 'development',
  },
  transports: [
    new winston.transports.File({
      filename: path.join(logsDir, 'security.log'),
      format: logFormat,
      maxsize: 10 * 1024 * 1024, // 10MB
      maxFiles: 10,
      tailable: true,
    }),
    new winston.transports.Console({
      format: consoleFormat,
    }),
  ],
})

/**
 * Logger pour les actions métier
 * Enregistre uniquement dans les fichiers de log (la base de données est gérée par createLog)
 */
export async function logAction(
  userId: string | null,
  action: string,
  details: any,
  request?: any,
  level: 'info' | 'warn' | 'error' = 'info'
) {
  // Utiliser getClientIP pour extraire l'IP correctement
  let ipAddress = 'unknown'
  try {
    const { getClientIP } = await import('./get-client-ip')
    ipAddress = getClientIP(request) || 'unknown'
  } catch {
    // Fallback si l'import échoue
    ipAddress = request?.headers?.get?.('x-forwarded-for') || 
                request?.headers?.get?.('x-real-ip') || 
                request?.ip ||
                'unknown'
  }
  const userAgent = request?.headers?.get?.('user-agent') || 'unknown'

  const logData = {
    userId,
    action,
    details,
    ipAddress: Array.isArray(ipAddress) ? ipAddress[0] : ipAddress,
    userAgent,
    timestamp: new Date().toISOString(),
  }

  // Logger dans les fichiers
  logger[level]('Action métier', logData)
}

/**
 * Logger pour les événements de sécurité
 */
export function logSecurity(
  event: string,
  details: any,
  level: 'info' | 'warn' | 'error' = 'warn'
) {
  securityLogger[level](event, {
    ...details,
    timestamp: new Date().toISOString(),
  })
}

/**
 * Logger pour les erreurs avec contexte
 */
export function logError(
  message: string,
  error: Error | unknown,
  context?: any
) {
  const errorDetails = {
    message,
    error: error instanceof Error ? {
      name: error.name,
      message: error.message,
      stack: error.stack,
    } : error,
    context,
    timestamp: new Date().toISOString(),
  }

  logger.error(message, errorDetails)
}

/**
 * Logger pour les warnings avec contexte
 */
export function logWarning(
  message: string,
  context?: any
) {
  logger.warn(message, {
    ...context,
    timestamp: new Date().toISOString(),
  })
}

/**
 * Logger pour les informations avec contexte
 */
export function logInfo(
  message: string,
  context?: any
) {
  logger.info(message, {
    ...context,
    timestamp: new Date().toISOString(),
  })
}

/**
 * Logger pour le debug (seulement en développement)
 */
export function logDebug(
  message: string,
  context?: any
) {
  logger.debug(message, {
    ...context,
    timestamp: new Date().toISOString(),
  })
}

// Export par défaut
export default logger

