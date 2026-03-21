import { NextRequest, NextResponse } from "next/server"
import { getSession } from "@/lib/session"
import { prisma } from "@/lib/prisma"
import { createLog } from "@/lib/logs"
import { startTimer, withTimingHeader } from "@/lib/api-metrics"
import { requireCSRF } from "@/lib/csrf-middleware"

export async function GET(request: NextRequest) {
  const start = startTimer()
  const session = await getSession()
  if (!session) {
    return withTimingHeader(NextResponse.json({ error: "Non autorisé" }, { status: 401 }), start)
  }

  try {
    const url = request.nextUrl
    const page = Math.max(1, Number(url.searchParams.get("page") || "1"))
    const limit = Math.min(200, Math.max(1, Number(url.searchParams.get("limit") || "1000")))
    const action = url.searchParams.get("action") || undefined
    const userId = url.searchParams.get("userId") || undefined
    const includeMeta = url.searchParams.get("meta") === "1"
    const skip = (page - 1) * limit

    const where = {
      ...(action ? { action } : {}),
      ...(userId ? { userId } : {}),
    }

    const [logs, total] = await Promise.all([
      prisma.log.findMany({
        where,
        orderBy: { createdAt: "desc" },
        skip,
        take: limit,
        include: {
          user: {
            select: {
              login: true,
            },
          },
        },
      }),
      prisma.log.count({ where }),
    ])

    // Compatibilité ascendante: si aucun paramètre de pagination n'est fourni, conserver l'ancien format (array)
    const hasPaginationParams = url.searchParams.has("page") || url.searchParams.has("limit") || includeMeta
    if (!hasPaginationParams && !action && !userId && limit === 1000 && page === 1) {
      return withTimingHeader(NextResponse.json(logs), start)
    }

    const response = NextResponse.json({
      items: logs,
      pagination: {
        page,
        limit,
        total,
        totalPages: Math.max(1, Math.ceil(total / limit)),
      },
    })
    return withTimingHeader(response, start)
  } catch (error) {
    console.error("Error fetching logs:", error instanceof Error ? error.message : String(error))
    const response = NextResponse.json(
      { error: "Erreur serveur" },
      { status: 500 }
    )
    return withTimingHeader(response, start)
  }
}

// DELETE : Purger tous les logs
export async function DELETE(request: NextRequest) {
  const session = await getSession()
  if (!session) {
    return NextResponse.json({ error: "Non autorisé" }, { status: 401 })
  }
  const csrfError = await requireCSRF(request)
  if (csrfError) return csrfError

  // Seul le Super Admin peut purger tous les logs
  if (session.role !== "Super Admin") {
    return NextResponse.json({ error: "Accès refusé" }, { status: 403 })
  }

  try {
    // Compter les logs avant suppression
    const count = await prisma.log.count()

    if (count === 0) {
      return NextResponse.json({
        message: "Aucun log à purger",
        deletedCount: 0,
      })
    }

    // Supprimer tous les logs
    const result = await prisma.log.deleteMany({})

    // Créer un log de l'action de purge (avant que tous les logs soient supprimés)
    await createLog(session.id, "LOGS_PURGES", {
      deletedCount: result.count,
    }, request)

    return NextResponse.json({
      message: `${result.count} log(s) supprimé(s)`,
      deletedCount: result.count,
    })
  } catch (error) {
    console.error("Error purging logs:", error)
    return NextResponse.json(
      { error: "Erreur lors de la purge des logs" },
      { status: 500 }
    )
  }
}

