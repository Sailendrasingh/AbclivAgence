import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl

  // Laisser passer tous les fichiers statiques Next.js sans vérification
  if (
    pathname.startsWith("/_next/") ||
    pathname.startsWith("/favicon.ico") ||
    pathname.startsWith("/manifest.json") ||
    pathname.match(/\.(svg|png|jpg|jpeg|gif|webp|ico)$/)
  ) {
    return NextResponse.next()
  }

  // Routes publiques
  if (pathname === "/login" || pathname.startsWith("/api/auth/login")) {
    return NextResponse.next()
  }

  // Vérification de session pour les routes protégées
  const session = request.cookies.get("session")

  if (!session && !pathname.startsWith("/api/auth")) {
    if (pathname.startsWith("/api")) {
      return NextResponse.json(
        { error: "Non autorisé" },
        { status: 401 }
      )
    }
    return NextResponse.redirect(new URL("/login", request.url))
  }

  return NextResponse.next()
}

export const config = {
  matcher: [
    "/((?!_next/static|_next/image|favicon.ico|manifest.json|sw.js|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)",
  ],
}

