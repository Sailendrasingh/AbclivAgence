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

    try {
        const [recentAgencies, urgentTasks] = await Promise.all([
            prisma.agency.findMany({
                orderBy: { updatedAt: "desc" },
                take: 5,
                select: {
                    id: true,
                    name: true,
                    state: true,
                    updatedAt: true,
                },
            }),
            prisma.task.findMany({
                where: {
                    closedAt: null,
                    importance: { in: ["URGENT", "CRITIQUE"] },
                },
                orderBy: { createdAt: "desc" },
                take: 6,
                include: {
                    agency: { select: { id: true, name: true } },
                    creator: { select: { login: true } },
                },
            }),
        ])

        const response = NextResponse.json({
            recentAgencies,
            urgentTasks,
        })
        return withTimingHeader(response, start)
    } catch (error) {
        console.error("Dashboard summary error:", error instanceof Error ? error.message : String(error))
        const response = NextResponse.json(
            { error: "Erreur lors de la récupération des données du tableau de bord" },
            { status: 500 }
        )
        if (elapsedMs(start) > 1000) {
            console.warn(`[API][SLOW] /api/dashboard/summary ${elapsedMs(start)}ms`)
        }
        return withTimingHeader(response, start)
    }
}
