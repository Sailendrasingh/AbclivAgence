import { NextRequest, NextResponse } from "next/server"
import { getSession } from "@/lib/session"
import { prisma } from "@/lib/prisma"
import { getAlertStats } from "@/lib/alerts"

export async function GET(request: NextRequest) {
  const session = await getSession()
  if (!session) {
    return NextResponse.json({ error: "Non autorisé" }, { status: 401 })
  }

  // Seul le Super Admin peut voir les statistiques de monitoring
  if (session.role !== "Super Admin") {
    return NextResponse.json({ error: "Accès refusé" }, { status: 403 })
  }

  try {
    const now = new Date()
    const last24Hours = new Date(now.getTime() - 24 * 60 * 60 * 1000)
    const last7Days = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000)

    // Statistiques d'alertes
    const alertStats = await getAlertStats()

    // Statistiques de logs
    const [
      totalLogs,
      logsLast24Hours,
      logsLast7Days,
      failedLogins,
      sensitiveActions,
    ] = await Promise.all([
      prisma.log.count(),
      prisma.log.count({
        where: { createdAt: { gte: last24Hours } },
      }),
      prisma.log.count({
        where: { createdAt: { gte: last7Days } },
      }),
      prisma.log.count({
        where: {
          action: "TENTATIVE_CONNEXION_ECHOUEE",
          createdAt: { gte: last24Hours },
        },
      }),
      prisma.log.count({
        where: {
          action: {
            in: [
              "SAUVEGARDE_RESTAUREE",
              "SAUVEGARDES_PURGEES",
              "USER_SUPPRIME",
              "USER_MODIFIE",
            ],
          },
          createdAt: { gte: last24Hours },
        },
      }),
    ])

    // Statistiques d'utilisateurs
    // Récupérer tous les utilisateurs pour calculer les stats
    const allUsers = await prisma.user.findMany({
      select: {
        active: true,
        lockedUntil: true,
      },
    })

    const totalUsers = allUsers.length
    // Utilisateurs actifs = tous les utilisateurs qui sont actifs OU verrouillés (même désactivés)
    // Un utilisateur verrouillé est considéré comme "actif" dans le système car il représente un compte existant
    const activeUsers = allUsers.filter(
      (user) => {
        const isActive = user.active === true
        const isLocked = user.lockedUntil && new Date(user.lockedUntil) > now
        return isActive || isLocked
      }
    ).length
    const lockedUsers = allUsers.filter(
      (user) => user.lockedUntil && new Date(user.lockedUntil) > now
    ).length
    const inactiveUsers = allUsers.filter(
      (user) => user.active === false && (!user.lockedUntil || new Date(user.lockedUntil) <= now)
    ).length

    // Statistiques de sessions
    const activeSessions = await prisma.session.count({
      where: {
        expiresAt: { gt: now },
      },
    })

    return NextResponse.json({
      alerts: alertStats,
      logs: {
        total: totalLogs,
        last24Hours: logsLast24Hours,
        last7Days: logsLast7Days,
        failedLogins,
        sensitiveActions,
      },
      users: {
        total: totalUsers,
        active: activeUsers,
        locked: lockedUsers,
        inactive: inactiveUsers,
      },
      sessions: {
        active: activeSessions,
      },
      timestamp: now.toISOString(),
    })
  } catch (error) {
    const { logError } = await import("@/lib/logger")
    logError("Error fetching monitoring stats", error)
    return NextResponse.json(
      { error: "Erreur serveur" },
      { status: 500 }
    )
  }
}

