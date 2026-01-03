import { NextRequest, NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"
import { getSession } from "@/lib/session"
import { generateTwoFactorSecret, generateQRCode } from "@/lib/auth"

export async function POST(
  request: NextRequest,
  context: { params: Promise<{ id: string }> }
) {
  const { id } = await context.params
  const session = await getSession()
  if (!session) {
    return NextResponse.json({ error: "Non autorisé" }, { status: 401 })
  }

  // L'utilisateur ne peut activer 2FA que pour lui-même, sauf Super Admin
  if (session.id !== id && session.role !== "Super Admin") {
    return NextResponse.json({ error: "Non autorisé" }, { status: 401 })
  }

  try {
    const user = await prisma.user.findUnique({
      where: { id },
    })

    if (!user) {
      return NextResponse.json(
        { error: "Utilisateur non trouvé" },
        { status: 404 }
      )
    }

    const { secret, uri } = generateTwoFactorSecret(user.login)
    const qrCode = await generateQRCode(uri)

    await prisma.user.update({
      where: { id },
      data: {
        twoFactorSecret: secret,
        twoFactorEnabled: false, // Pas encore activé, doit valider avec un token
      },
    })

    return NextResponse.json({
      secret,
      uri,
      qrCode,
    })
  } catch (error) {
    console.error("Error generating 2FA:", error)
    return NextResponse.json(
      { error: "Erreur serveur" },
      { status: 500 }
    )
  }
}

export async function PUT(
  request: NextRequest,
  context: { params: Promise<{ id: string }> }
) {
  const { id } = await context.params
  const session = await getSession()
  if (!session) {
    return NextResponse.json({ error: "Non autorisé" }, { status: 401 })
  }

  if (session.id !== id && session.role !== "Super Admin") {
    return NextResponse.json({ error: "Non autorisé" }, { status: 401 })
  }

  try {
    const body = await request.json()
    const { enabled } = body

    await prisma.user.update({
      where: { id },
      data: {
        twoFactorEnabled: enabled,
        // Si le 2FA est désactivé pour un Super Admin, cela ne devrait pas être possible
        // Mais on le permet pour la flexibilité (un autre Super Admin peut le faire)
      },
    })

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error("Error updating 2FA:", error)
    return NextResponse.json(
      { error: "Erreur serveur" },
      { status: 500 }
    )
  }
}

