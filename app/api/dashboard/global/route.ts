import { NextRequest, NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"
import { getSession } from "@/lib/session"
import { startTimer, withTimingHeader, elapsedMs } from "@/lib/api-metrics"

export async function GET(request: NextRequest) {
    const start = startTimer()
    const session = await getSession()
    if (!session) {
        return withTimingHeader(NextResponse.json({ error: "Non autorisé" }, { status: 401 }), start)
    }

    const isAdmin = session.role === "Super Admin"

    try {
        // 1. Global Metrics
        // 3. Recent Activity (Tasks over the last 7 days)
        // Create an array of the last 7 days
        const last7Days = Array.from({ length: 7 }).map((_, i) => {
            const d = new Date()
            d.setDate(d.getDate() - (6 - i))
            d.setHours(0, 0, 0, 0)
            return d
        })

        const sevenDaysAgo = last7Days[0]

        const [
            totalAgencies,
            totalUsers,
            totalTasksOpen,
            totalAlertsOpen,
            agenciesRaw,
            recentTasksCreatedStr,
            recentTasksClosedStr,
            urgentTasks,
            recentAlerts,
            recentAgencies,
        ] = await Promise.all([
            prisma.agency.count(),
            isAdmin ? prisma.user.count({ where: { active: true } }) : Promise.resolve(null),
            prisma.task.count({ where: { closedAt: null } }),
            isAdmin ? prisma.alert.count({ where: { resolved: false } }) : Promise.resolve(null),
            prisma.agency.groupBy({
                by: ["state"],
                _count: { state: true },
            }),
            prisma.task.findMany({
                where: { createdAt: { gte: sevenDaysAgo } },
                select: { createdAt: true }
            }),
            prisma.task.findMany({
                where: { closedAt: { gte: sevenDaysAgo } },
                select: { closedAt: true }
            }),
            prisma.task.findMany({
                where: {
                    closedAt: null,
                    importance: { in: ["URGENT", "CRITIQUE"] },
                },
                orderBy: { createdAt: "desc" },
                take: 5,
                include: {
                    agency: { select: { id: true, name: true } },
                    creator: { select: { login: true } },
                },
            }),
            isAdmin ? prisma.alert.findMany({
                where: { resolved: false },
                orderBy: { createdAt: "desc" },
                take: 5
            }) : Promise.resolve([]),
            prisma.agency.findMany({
                orderBy: { updatedAt: "desc" },
                take: 5,
                select: { id: true, name: true, updatedAt: true, state: true }
            }),
        ])

        const agencyStates = agenciesRaw.map(item => ({
            name: item.state,
            value: item._count.state,
        }))

        // On agrège en JS pour garder une logique de comptage lisible.
        const activityMap: Record<string, { created: number, closed: number }> = {}
        last7Days.forEach(d => {
            activityMap[d.toLocaleDateString("fr-FR", { day: "2-digit", month: "2-digit" })] = { created: 0, closed: 0 }
        })

        recentTasksCreatedStr.forEach(t => {
            const dayStr = new Date(t.createdAt).toLocaleDateString("fr-FR", { day: "2-digit", month: "2-digit" })
            if (activityMap[dayStr]) activityMap[dayStr].created += 1
        })

        recentTasksClosedStr.forEach(t => {
            if (t.closedAt) {
                const dayStr = new Date(t.closedAt).toLocaleDateString("fr-FR", { day: "2-digit", month: "2-digit" })
                if (activityMap[dayStr]) activityMap[dayStr].closed += 1
            }
        })

        const recentActivity = Object.entries(activityMap).map(([date, counts]) => ({
            date,
            Créées: counts.created,
            Résolues: counts.closed
        }))

        const response = NextResponse.json({
            globalMetrics: {
                totalAgencies,
                totalUsers,
                totalTasksOpen,
                totalAlertsOpen,
            },
            agencyStates,
            recentActivity,
            urgentTasks,
            recentAlerts,
            recentAgencies
        })
        return withTimingHeader(response, start)
    } catch (error) {
        console.error("Dashboard global error:", error instanceof Error ? error.message : String(error))
        const response = NextResponse.json(
            { error: "Erreur lors de la récupération des données" },
            { status: 500 }
        )
        if (elapsedMs(start) > 1000) {
            console.warn(`[API][SLOW] /api/dashboard/global ${elapsedMs(start)}ms`)
        }
        return withTimingHeader(response, start)
    }
}
