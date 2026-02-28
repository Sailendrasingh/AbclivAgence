import { NextRequest, NextResponse } from "next/server"
import { unlink } from "fs/promises"
import { join, resolve } from "path"
import { existsSync } from "fs"
import { getSession } from "@/lib/session"
import { requireCSRF } from "@/lib/csrf-middleware"
import { createLog } from "@/lib/logs"
import { alertSensitiveAction } from "@/lib/alerts"

// DELETE : Supprimer une sauvegarde spécifique
export async function DELETE(
  request: NextRequest,
  context: { params: Promise<{ filename: string }> }
) {
  const session = await getSession()
  if (!session) {
    return NextResponse.json({ error: "Non autorisé" }, { status: 401 })
  }

  const csrfError = await requireCSRF(request)
  if (csrfError) return csrfError

  // Seul le Super Admin peut supprimer des sauvegardes
  if (session.role !== "Super Admin") {
    return NextResponse.json({ error: "Accès refusé" }, { status: 403 })
  }

  // Vérifier que le 2FA est activé pour les Super Admin
  const { requireTwoFactorForSuperAdmin } = await import("@/lib/require-two-factor")
  const twoFactorError = await requireTwoFactorForSuperAdmin(request)
  if (twoFactorError) {
    return twoFactorError
  }

  try {
    const { filename } = await context.params

    // Protection path traversal
    if (filename.includes("..") || filename.includes("/") || filename.includes("\\")) {
      return NextResponse.json(
        { error: "Nom de fichier invalide" },
        { status: 400 }
      )
    }

    // Vérifier que le fichier est bien une sauvegarde
    if (!filename.startsWith("backup-") || (
      !filename.endsWith(".encrypted.zip") && 
      !filename.endsWith(".zip") && 
      !filename.endsWith(".db")
    )) {
      return NextResponse.json(
        { error: "Nom de fichier invalide" },
        { status: 400 }
      )
    }

    const backupsDir = resolve(process.cwd(), "backups")
    const filePath = resolve(backupsDir, filename)
    if (!filePath.startsWith(backupsDir)) {
      return NextResponse.json({ error: "Nom de fichier invalide" }, { status: 400 })
    }

    // Vérifier que le fichier existe
    if (!existsSync(filePath)) {
      return NextResponse.json(
        { error: "Sauvegarde non trouvée" },
        { status: 404 }
      )
    }

    // Supprimer le fichier de sauvegarde
    await unlink(filePath)

    // Supprimer aussi le fichier de checksum associé s'il existe
    const checksumPath = `${filePath}.sha256`
    if (existsSync(checksumPath)) {
      try {
        await unlink(checksumPath)
      } catch {
        // Ignorer les erreurs de suppression du checksum
      }
    }

    await createLog(session.id, "SAUVEGARDE_SUPPRIMEE", {
      filename,
    }, request)

    // Alerter sur l'action sensible
    const { getClientIP } = await import("@/lib/get-client-ip")
    const ipAddress = getClientIP(request)
    await alertSensitiveAction("SAUVEGARDE_SUPPRIMEE", session.id, {
      filename,
    }, ipAddress)

    return NextResponse.json({
      message: "Sauvegarde supprimée avec succès",
      filename,
    })
  } catch (error: any) {
    console.error("Error deleting backup:", error)
    return NextResponse.json(
      { error: "Erreur lors de la suppression de la sauvegarde" },
      { status: 500 }
    )
  }
}

