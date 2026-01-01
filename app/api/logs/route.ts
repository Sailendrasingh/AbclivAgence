import { NextRequest, NextResponse } from "next/server"
import { getSession } from "@/lib/session"
import { prisma } from "@/lib/prisma"
import { createLog } from "@/lib/logs"

export async function GET(request: NextRequest) {
  const session = await getSession()
  if (!session) {
    return NextResponse.json({ error: "Non autorisé" }, { status: 401 })
  }

  try {
    const logs = await prisma.log.findMany({
      orderBy: { createdAt: "desc" },
      take: 1000,
      include: {
        user: {
          select: {
            login: true,
          },
        },
      },
    })

    return NextResponse.json(logs)
  } catch (error) {
    console.error("Error fetching logs:", error)
    return NextResponse.json(
      { error: "Erreur serveur" },
      { status: 500 }
    )
  }
}

// DELETE : Purger tous les logs
export async function DELETE(request: NextRequest) {
  const session = await getSession()
  if (!session) {
    return NextResponse.json({ error: "Non autorisé" }, { status: 401 })
  }

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

