import { NextRequest, NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"
import { getSession } from "@/lib/session"

export async function GET(request: NextRequest) {
    const session = await getSession()
    if (!session) {
        return NextResponse.json({ error: "Non autorisé" }, { status: 401 })
    }

    const isAdmin = session.role === "Super Admin"

    try {
        // 1. Global Metrics
        const totalAgencies = await prisma.agency.count()
        const totalUsers = isAdmin ? await prisma.user.count({ where: { active: true } }) : null

        const totalTasksOpen = await prisma.task.count({ where: { closedAt: null } })
        const totalAlertsOpen = isAdmin
            ? await prisma.alert.count({ where: { resolved: false } })
            : null

        // 2. Agency States
        const agenciesRaw = await prisma.agency.groupBy({
            by: ["state"],
            _count: { state: true },
        })

        const agencyStates = agenciesRaw.map(item => ({
            name: item.state,
            value: item._count.state,
            // Map colors on frontend later
        }))

        // 3. Recent Activity (Tasks over the last 7 days)
        // Create an array of the last 7 days
        const last7Days = Array.from({ length: 7 }).map((_, i) => {
            const d = new Date()
            d.setDate(d.getDate() - (6 - i))
            d.setHours(0, 0, 0, 0)
            return d
        })

        const sevenDaysAgo = last7Days[0]

        const recentTasksCreatedStr = await prisma.task.findMany({
            where: { createdAt: { gte: sevenDaysAgo } },
            select: { createdAt: true }
        })

        // Pour ne pas faire de group by complexe sur les dates avec SQLite, on aggrège en JS :
        const activityMap: Record<string, { created: number, closed: number }> = {}
        last7Days.forEach(d => {
            activityMap[d.toLocaleDateString("fr-FR", { day: "2-digit", month: "2-digit" })] = { created: 0, closed: 0 }
        })

        recentTasksCreatedStr.forEach(t => {
            const dayStr = new Date(t.createdAt).toLocaleDateString("fr-FR", { day: "2-digit", month: "2-digit" })
            if (activityMap[dayStr]) activityMap[dayStr].created += 1
        })

        const recentTasksClosedStr = await prisma.task.findMany({
            where: { closedAt: { gte: sevenDaysAgo } },
            select: { closedAt: true }
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

        // 4. Urgent Tasks
        const urgentTasks = await prisma.task.findMany({
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
        })

        // 5. Recent Alerts
        const recentAlerts = isAdmin ? await prisma.alert.findMany({
            where: { resolved: false },
            orderBy: { createdAt: "desc" },
            take: 5
        }) : []

        // 6. Recent Agencies (For the feed)
        const recentAgencies = await prisma.agency.findMany({
            orderBy: { updatedAt: "desc" },
            take: 5,
            select: { id: true, name: true, updatedAt: true, state: true }
        })

        return NextResponse.json({
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
    } catch (error) {
        console.error("Dashboard global error:", error)
        return NextResponse.json(
            { error: "Erreur lors de la récupération des données" },
            { status: 500 }
        )
    }
}
