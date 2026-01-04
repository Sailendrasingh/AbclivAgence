import { NextRequest } from "next/server"
import { prisma } from "./prisma"
import { getClientIP } from "./get-client-ip"

/**
 * Crée un log dans la base de données ET dans les fichiers de log centralisés
 * Cette fonction est la fonction principale pour logger les actions métier
 */
export async function createLog(
  userId: string | null,
  action: string,
  details: any,
  request?: NextRequest
) {
  try {
    const ipAddress = getClientIP(request) || "unknown"
    const userAgent = request?.headers.get("user-agent") || "unknown"

    // Enregistrer dans la base de données
    await prisma.log.create({
      data: {
        userId,
        action,
        details: details ? JSON.stringify(details) : null,
        ipAddress: Array.isArray(ipAddress) ? ipAddress[0] : ipAddress,
        userAgent,
      },
    })

    // Enregistrer aussi dans les fichiers de log centralisés (import dynamique pour éviter les cycles)
    try {
      const { logAction } = await import("./logger")
      logAction(userId, action, details, request, 'info')
    } catch (logError) {
      // Si le logger n'est pas disponible, continuer sans erreur
      // (peut arriver lors du build)
    }
  } catch (error) {
    // Utiliser le logger centralisé pour les erreurs (import dynamique)
    try {
      const { logError } = await import("./logger")
      logError("Error creating log", error, { userId, action })
    } catch {
      // Fallback vers console si le logger n'est pas disponible
      console.error("Error creating log:", error)
    }
  }
}

export async function cleanupOldLogs() {
  const thirtyDaysAgo = new Date()
  thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30)

  try {
    const deletedCount = await prisma.log.deleteMany({
      where: {
        createdAt: {
          lt: thirtyDaysAgo,
        },
      },
    })

    // Logger l'action de nettoyage (import dynamique)
    try {
      const { logInfo } = await import("./logger")
      logInfo("Nettoyage des logs anciens", { 
        deletedCount: deletedCount.count,
        olderThan: thirtyDaysAgo.toISOString()
      })
    } catch {
      // Fallback si le logger n'est pas disponible
    }
  } catch (error) {
    try {
      const { logError } = await import("./logger")
      logError("Error cleaning up logs", error)
    } catch {
      console.error("Error cleaning up logs:", error)
    }
  }
}

