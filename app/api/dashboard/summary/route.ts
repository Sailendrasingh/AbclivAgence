import { NextRequest, NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"
import { getSession } from "@/lib/session"

export async function GET(request: NextRequest) {
    const session = await getSession()
    if (!session) {
        return NextResponse.json({ error: "Non autorisé" }, { status: 401 })
    }

    try {
        const recentAgencies = await prisma.agency.findMany({
            orderBy: { updatedAt: "desc" },
            take: 5,
            select: {
                id: true,
                name: true,
                state: true,
                updatedAt: true,
            },
        })

        const urgentTasks = await prisma.task.findMany({
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
        })

        return NextResponse.json({
            recentAgencies,
            urgentTasks,
        })
    } catch (error) {
        console.error("Dashboard summary error:", error)
        return NextResponse.json(
            { error: "Erreur lors de la récupération des données du tableau de bord" },
            { status: 500 }
        )
    }
}
