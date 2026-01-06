"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { apiFetch } from "@/lib/api-client"
import { setCSRFToken } from "@/lib/csrf-client"

export default function LoginPage() {
  const router = useRouter()
  const [mounted, setMounted] = useState(false)
  const [login, setLogin] = useState("")
  const [password, setPassword] = useState("")
  const [twoFactorToken, setTwoFactorToken] = useState("")
  const [needsTwoFactor, setNeedsTwoFactor] = useState(false)
  const [error, setError] = useState("")
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError("")
    setLoading(true)

    try {
      const response = await apiFetch("/api/auth/login", {
        method: "POST",
        skipCSRF: true, // Le login n'a pas besoin de CSRF
        body: JSON.stringify({ login, password, twoFactorToken }),
      })

      const data = await response.json()

      // Vérifier si le 2FA est requis (même si response.ok est true)
      if (data.needsTwoFactor) {
        setNeedsTwoFactor(true)
        setLoading(false)
        return
      }

      if (!response.ok) {
        console.error("Login error:", response.status, data)
        
        // Si le 2FA est requis mais non activé pour Super Admin, rediriger vers le profil
        if (data.requiresTwoFactorSetup && data.userId) {
          setError(data.error || "L'authentification à deux facteurs (2FA) est obligatoire pour les Super Admin. Veuillez activer le 2FA depuis votre profil.")
          // Note: L'utilisateur ne peut pas se connecter, donc on ne peut pas rediriger automatiquement
          // Il devra contacter un autre Super Admin ou utiliser un autre compte
          setLoading(false)
          return
        }
        
        setError(data.error || `Erreur de connexion (${response.status})`)
        setLoading(false)
        return
      }

      // Stocker le token CSRF reçu après connexion
      if (data.csrfToken) {
        setCSRFToken(data.csrfToken)
      }

      console.log("Login successful, redirecting...")
      console.log("Response headers:", response.headers)
      console.log("Cookies:", document.cookie)

      // Attendre un court délai pour s'assurer que le cookie de session est bien défini
      // et que le navigateur a le temps de le traiter
      await new Promise(resolve => setTimeout(resolve, 200))

      // Vérifier que le cookie de session est présent avant de rediriger
      const hasSessionCookie = document.cookie.includes("session=")
      console.log("Session cookie present:", hasSessionCookie)

      // Si le 2FA doit être configuré, rediriger vers la page de configuration
      if (data.requiresTwoFactorSetup) {
        window.location.href = "/dashboard/setup-2fa"
      } else {
        // Utiliser window.location pour forcer un rechargement complet et éviter les problèmes d'hydratation
        window.location.href = "/dashboard/agences"
      }
    } catch (err) {
      setError("Erreur de connexion")
    } finally {
      setLoading(false)
    }
  }

  // Éviter les erreurs d'hydratation en retournant un contenu cohérent
  if (!mounted) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-background">
        <Card className="w-full max-w-md">
          <CardHeader>
            <CardTitle>Connexion</CardTitle>
            <CardDescription>
              Connectez-vous à votre compte
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form className="space-y-4" suppressHydrationWarning>
              <div className="space-y-2">
                <Label htmlFor="login">Identifiant</Label>
              <Input
                id="login"
                type="text"
                value=""
                readOnly
                required
                disabled
                suppressHydrationWarning
              />
              </div>
              <div className="space-y-2">
                <Label htmlFor="password">Mot de passe</Label>
                <Input
                  id="password"
                  type="password"
                  value=""
                  readOnly
                  required
                  disabled
                  suppressHydrationWarning
                />
              </div>
              <Button type="submit" className="w-full" disabled>
                Se connecter
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    )
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-background">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle>Connexion</CardTitle>
          <CardDescription>
            Connectez-vous à votre compte
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4" suppressHydrationWarning>
            <div className="space-y-2">
              <Label htmlFor="login">Identifiant</Label>
              <Input
                id="login"
                type="text"
                value={login}
                onChange={(e) => setLogin(e.target.value)}
                required
                disabled={loading}
                suppressHydrationWarning
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="password">Mot de passe</Label>
              <Input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                disabled={loading}
                suppressHydrationWarning
              />
            </div>
            {needsTwoFactor && (
              <div className="space-y-2">
                <Label htmlFor="twoFactorToken">Code 2FA</Label>
                <Input
                  id="twoFactorToken"
                  type="text"
                  value={twoFactorToken}
                  onChange={(e) => setTwoFactorToken(e.target.value)}
                  placeholder="000000"
                  maxLength={6}
                  required
                  disabled={loading}
                  suppressHydrationWarning
                />
              </div>
            )}
            {error && (
              <div className="text-sm text-destructive">{error}</div>
            )}
            <Button type="submit" className="w-full" disabled={loading}>
              {loading ? "Connexion..." : "Se connecter"}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}

