import { NextRequest, NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"
import { verifyTwoFactorToken } from "@/lib/auth"

export async function POST(request: NextRequest) {
  try {
    const { userId, token } = await request.json()

    if (!userId || !token) {
      return NextResponse.json(
        { error: "userId et token requis" },
        { status: 400 }
      )
    }

    const user = await prisma.user.findUnique({
      where: { id: userId },
    })

    if (!user || !user.twoFactorSecret) {
      return NextResponse.json(
        { error: "Utilisateur non trouvé ou 2FA non configuré" },
        { status: 404 }
      )
    }

    const isValid = verifyTwoFactorToken(user.twoFactorSecret, token)

    if (!isValid) {
      return NextResponse.json(
        { error: "Code de vérification incorrect" },
        { status: 401 }
      )
    }

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error("Error verifying 2FA:", error)
    return NextResponse.json(
      { error: "Erreur serveur" },
      { status: 500 }
    )
  }
}

