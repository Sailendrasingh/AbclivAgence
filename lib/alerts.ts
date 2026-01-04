/**
 * Système d'alertes automatiques
 * Conforme OWASP Top 10 2021 - A09: Security Logging and Monitoring Failures
 * 
 * Détecte et alerte sur :
 * - Tentatives de connexion échouées multiples
 * - Accès non autorisés
 * - Actions sensibles (suppression, restauration, etc.)
 * - Patterns suspects
 */

import { prisma } from "./prisma"
import { logSecurity } from "./logger"

export type AlertSeverity = 'low' | 'medium' | 'high' | 'critical'
export type AlertType = 
  | 'FAILED_LOGIN_ATTEMPTS'
  | 'UNAUTHORIZED_ACCESS'
  | 'SENSITIVE_ACTION'
  | 'SUSPICIOUS_PATTERN'
  | 'ACCOUNT_LOCKED'
  | 'RATE_LIMIT_EXCEEDED'
  | 'BACKUP_RESTORED'
  | 'BACKUP_DELETED'
  | 'USER_DELETED'
  | 'PERMISSION_CHANGED'

export interface Alert {
  id: string
  type: AlertType
  severity: AlertSeverity
  title: string
  message: string
  details: any
  userId: string | null
  ipAddress: string | null
  resolved: boolean
  resolvedAt: Date | null
  resolvedBy: string | null
  createdAt: Date
}

/**
 * Crée une alerte dans la base de données
 */
export async function createAlert(
  type: AlertType,
  severity: AlertSeverity,
  title: string,
  message: string,
  details: any = {},
  userId: string | null = null,
  ipAddress: string | null = null
): Promise<void> {
  try {
    // Créer l'alerte dans la base de données
    await prisma.alert.create({
      data: {
        type,
        severity,
        title,
        message,
        details: JSON.stringify(details),
        userId,
        ipAddress,
        resolved: false,
      },
    })

    // Logger l'alerte de sécurité
    logSecurity(`ALERT: ${title}`, {
      type,
      severity,
      message,
      details,
      userId,
      ipAddress,
    }, severity === 'critical' || severity === 'high' ? 'error' : 'warn')
  } catch (error) {
    // Logger l'erreur mais ne pas faire échouer l'opération
    const { logError } = await import("./logger")
    logError("Error creating alert", error, { type, title })
  }
}

/**
 * Détecte les tentatives de connexion échouées multiples
 */
export async function checkFailedLoginAttempts(
  login: string,
  ipAddress: string
): Promise<void> {
  const fiveMinutesAgo = new Date(Date.now() - 5 * 60 * 1000)

  // Compter les tentatives échouées dans les 5 dernières minutes
  const failedAttempts = await prisma.log.count({
    where: {
      action: 'TENTATIVE_CONNEXION_ECHOUEE',
      createdAt: {
        gte: fiveMinutesAgo,
      },
      OR: [
        { details: { contains: `"login":"${login}"` } },
        { ipAddress },
      ],
    },
  })

  // Alerter si plus de 3 tentatives échouées
  if (failedAttempts >= 3) {
    await createAlert(
      'FAILED_LOGIN_ATTEMPTS',
      failedAttempts >= 5 ? 'high' : 'medium',
      'Tentatives de connexion échouées multiples',
      `${failedAttempts} tentatives de connexion échouées détectées pour "${login}" depuis ${ipAddress} dans les 5 dernières minutes`,
      {
        login,
        ipAddress,
        failedAttempts,
        timeWindow: '5 minutes',
      },
      null,
      ipAddress
    )
  }
}

/**
 * Alerte sur un accès non autorisé
 */
export async function alertUnauthorizedAccess(
  userId: string | null,
  resource: string,
  ipAddress: string | null
): Promise<void> {
  await createAlert(
    'UNAUTHORIZED_ACCESS',
    'high',
    'Accès non autorisé',
    `Tentative d'accès non autorisé à ${resource}`,
    {
      resource,
      userId,
    },
    userId,
    ipAddress || null
  )
}

/**
 * Alerte sur une action sensible
 */
export async function alertSensitiveAction(
  action: string,
  userId: string,
  details: any,
  ipAddress: string | null = null
): Promise<void> {
  const sensitiveActions: Record<string, { severity: AlertSeverity; title: string }> = {
    'SAUVEGARDE_RESTAUREE': {
      severity: 'critical',
      title: 'Restauration de sauvegarde',
    },
    'SAUVEGARDE_CREEE': {
      severity: 'low',
      title: 'Création de sauvegarde',
    },
    'SAUVEGARDES_PURGEES': {
      severity: 'high',
      title: 'Purge de toutes les sauvegardes',
    },
    'UTILISATEUR_SUPPRIME': {
      severity: 'high',
      title: 'Suppression d\'utilisateur',
    },
    'UTILISATEUR_MODIFIE': {
      severity: 'medium',
      title: 'Modification d\'utilisateur',
    },
  }

  const actionConfig = sensitiveActions[action]
  if (actionConfig) {
    await createAlert(
      'SENSITIVE_ACTION',
      actionConfig.severity,
      actionConfig.title,
      `Action sensible effectuée: ${action}`,
      {
        action,
        ...details,
      },
      userId,
      ipAddress
    )
  }
}

/**
 * Résout une alerte
 */
export async function resolveAlert(
  alertId: string,
  resolvedBy: string
): Promise<void> {
  await prisma.alert.update({
    where: { id: alertId },
    data: {
      resolved: true,
      resolvedAt: new Date(),
      resolvedBy,
    },
  })
}

/**
 * Récupère les alertes non résolues
 */
export async function getUnresolvedAlerts(limit: number = 50): Promise<Alert[]> {
  const alerts = await prisma.alert.findMany({
    where: {
      resolved: false,
    },
    orderBy: {
      createdAt: 'desc',
    },
    take: limit,
    include: {
      user: {
        select: {
          login: true,
        },
      },
    },
  })

  return alerts.map(alert => ({
    id: alert.id,
    type: alert.type as AlertType,
    severity: alert.severity as AlertSeverity,
    title: alert.title,
    message: alert.message,
    details: alert.details ? JSON.parse(alert.details) : {},
    userId: alert.userId,
    ipAddress: alert.ipAddress,
    resolved: alert.resolved,
    resolvedAt: alert.resolvedAt,
    resolvedBy: alert.resolvedBy,
    createdAt: alert.createdAt,
  }))
}

/**
 * Récupère les statistiques d'alertes
 */
export async function getAlertStats() {
  const [
    total,
    unresolved,
    critical,
    high,
    last24Hours,
  ] = await Promise.all([
    prisma.alert.count(),
    prisma.alert.count({ where: { resolved: false } }),
    prisma.alert.count({ where: { severity: 'critical', resolved: false } }),
    prisma.alert.count({ where: { severity: 'high', resolved: false } }),
    prisma.alert.count({
      where: {
        createdAt: {
          gte: new Date(Date.now() - 24 * 60 * 60 * 1000),
        },
      },
    }),
  ])

  return {
    total,
    unresolved,
    critical,
    high,
    last24Hours,
  }
}

