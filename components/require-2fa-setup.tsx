"use client"

import { useEffect, useState } from "react"
import { useRouter, usePathname } from "next/navigation"
import { apiFetch } from "@/lib/api-client"

/**
 * Composant qui vérifie si un Super Admin doit configurer le 2FA
 * et redirige vers la page de configuration si nécessaire
 */
export function Require2FASetup({ children }: { children: React.ReactNode }) {
  const router = useRouter()
  const pathname = usePathname()
  const [checking, setChecking] = useState(true)

  useEffect(() => {
    const check2FA = async () => {
      // Ne pas vérifier sur la page de configuration 2FA elle-même
      if (pathname === "/dashboard/setup-2fa") {
        setChecking(false)
        return
      }

      try {
        const response = await apiFetch("/api/auth/me")
        if (response.ok) {
          const data = await response.json()
          
          // Si c'est un Super Admin sans 2FA, rediriger vers la page de configuration
          if (data.role === "Super Admin" && !data.twoFactorEnabled && data.requiresTwoFactorSetup) {
            router.push("/dashboard/setup-2fa")
            return
          }
        } else {
          // Pas de session, rediriger vers login
          router.push("/login")
          return
        }
      } catch (error) {
        console.error("Error checking 2FA:", error)
        // En cas d'erreur, rediriger vers login
        router.push("/login")
        return
      } finally {
        setChecking(false)
      }
    }

    check2FA()
  }, [router, pathname])

  // Afficher un loader pendant la vérification
  if (checking) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-background">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto mb-4"></div>
          <p className="text-sm text-muted-foreground">Vérification...</p>
        </div>
      </div>
    )
  }

  return <>{children}</>
}

