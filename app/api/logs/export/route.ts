import { NextRequest, NextResponse } from "next/server"
import { getSession } from "@/lib/session"
import { prisma } from "@/lib/prisma"
import { cleanupOldLogs } from "@/lib/logs"

export async function GET(request: NextRequest) {
  const session = await getSession()
  if (!session) {
    return NextResponse.json({ error: "Non autorisé" }, { status: 401 })
  }

  // Nettoyer les logs de plus de 30 jours
  await cleanupOldLogs()

  try {
    const logs = await prisma.log.findMany({
      orderBy: { createdAt: "desc" },
      include: {
        user: {
          select: {
            login: true,
          },
        },
      },
    })

    // Convertir en CSV
    const headers = ["ID", "Date", "Utilisateur", "Action", "Détails", "IP", "User Agent"]
    const rows = logs.map((log) => [
      log.id,
      log.createdAt.toISOString(),
      log.user?.login || "Anonyme",
      log.action,
      log.details || "",
      log.ipAddress || "",
      log.userAgent || "",
    ])

    const csv = [
      headers.join(","),
      ...rows.map((row) => row.map((cell) => `"${String(cell).replace(/"/g, '""')}"`).join(",")),
    ].join("\n")

    return new NextResponse(csv, {
      headers: {
        "Content-Type": "text/csv",
        "Content-Disposition": 'attachment; filename="logs.csv"',
      },
    })
  } catch (error) {
    console.error("Error exporting logs:", error)
    return NextResponse.json(
      { error: "Erreur serveur" },
      { status: 500 }
    )
  }
}

