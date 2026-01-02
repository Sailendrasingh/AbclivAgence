import { NextRequest, NextResponse } from "next/server"
import { readFile, stat } from "fs/promises"
import { join, resolve } from "path"
import { getSession } from "@/lib/session"
import { createHash } from "crypto"

export async function GET(
  request: NextRequest,
  { params }: Promise<{ params: { path: string[] } }>
) {
  const { path } = await params
  const session = await getSession()
  if (!session) {
    return NextResponse.json({ error: "Non autorisé" }, { status: 401 })
  }

  try {
    // Protection contre path traversal
    const filepath = join(process.cwd(), "uploads", ...path)
    const resolvedPath = resolve(filepath)
    const uploadsDir = resolve(process.cwd(), "uploads")
    
    // Vérifier que le chemin résolu est bien dans le dossier uploads
    if (!resolvedPath.startsWith(uploadsDir)) {
      return NextResponse.json(
        { error: "Chemin invalide" },
        { status: 400 }
      )
    }
    
    // Récupérer les stats du fichier pour ETag et Last-Modified
    const fileStats = await stat(resolvedPath)
    const file = await readFile(resolvedPath)

    // Générer un ETag basé sur la taille et la date de modification
    const etag = createHash("md5")
      .update(`${fileStats.size}-${fileStats.mtime.getTime()}`)
      .digest("hex")
    
    // Vérifier si le client a une version en cache (validation conditionnelle)
    const ifNoneMatch = request.headers.get("if-none-match")
    if (ifNoneMatch === etag) {
      return new NextResponse(null, {
        status: 304, // Not Modified
        headers: {
          "ETag": etag,
          "Cache-Control": "public, max-age=31536000, immutable", // 1 an
        },
      })
    }

    // Déterminer le type MIME
    const ext = path[path.length - 1].split(".").pop()
    const mimeTypes: Record<string, string> = {
      jpg: "image/jpeg",
      jpeg: "image/jpeg",
      png: "image/png",
    }

    const contentType = mimeTypes[ext?.toLowerCase() || ""] || "application/octet-stream"

    // En-têtes de cache optimisés pour les images
    // max-age=31536000 = 1 an (les images ne changent généralement pas)
    // immutable = le fichier ne changera jamais (basé sur le nom de fichier unique)
    return new NextResponse(file, {
      headers: {
        "Content-Type": contentType,
        "Cache-Control": "public, max-age=31536000, immutable", // Cache 1 an, immutable
        "ETag": etag, // Pour la validation conditionnelle
        "Last-Modified": fileStats.mtime.toUTCString(), // Date de modification
        "Expires": new Date(Date.now() + 31536000 * 1000).toUTCString(), // Expiration dans 1 an
      },
    })
  } catch (error) {
    return NextResponse.json(
      { error: "Fichier non trouvé" },
      { status: 404 }
    )
  }
}

