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
  const [login, setLogin] = useState("")
  const [password, setPassword] = useState("")
  const [twoFactorToken, setTwoFactorToken] = useState("")
  const [needsTwoFactor, setNeedsTwoFactor] = useState(false)
  const [error, setError] = useState("")
  const [loading, setLoading] = useState(false)

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
        setError(data.error || `Erreur de connexion (${response.status})`)
        setLoading(false)
        return
      }

      // Stocker le token CSRF reçu après connexion
      if (data.csrfToken) {
        setCSRFToken(data.csrfToken)
      }

      console.log("Login successful, redirecting...")

      // Utiliser window.location pour forcer un rechargement complet et éviter les problèmes d'hydratation
      window.location.href = "/dashboard/agences"
    } catch (err) {
      setError("Erreur de connexion")
    } finally {
      setLoading(false)
    }
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
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="login">Identifiant</Label>
              <Input
                id="login"
                type="text"
                value={login}
                onChange={(e) => setLogin(e.target.value)}
                required
                disabled={loading}
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

