import { redirect } from "next/navigation"
import { getSession } from "@/lib/session"
import { mustActivateTwoFactor } from "@/lib/two-factor-required"

/**
 * Layout spécial pour la page de configuration 2FA
 * N'affiche pas la sidebar ni le header normal
 */
export default async function Setup2FALayout({
  children,
}: {
  children: React.ReactNode
}) {
  const session = await getSession()

  if (!session) {
    redirect("/login")
  }

  // Vérifier si l'utilisateur doit vraiment configurer le 2FA
  const mustActivate = await mustActivateTwoFactor(session.id, session.role)
  
  // Si ce n'est pas un Super Admin ou si le 2FA est déjà activé, rediriger
  if (!mustActivate) {
    redirect("/dashboard/agences")
  }

  // Afficher uniquement le contenu sans sidebar ni header
  return <>{children}</>
}

