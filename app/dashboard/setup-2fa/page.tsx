"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Shield, AlertTriangle } from "lucide-react"
import { apiFetch } from "@/lib/api-client"
import { setCSRFToken } from "@/lib/csrf-client"

export default function Setup2FAPage() {
  const router = useRouter()
  const [loading, setLoading] = useState(true)
  const [settingUp, setSettingUp] = useState(false)
  const [enabling, setEnabling] = useState(false)
  const [error, setError] = useState("")
  const [twoFactorData, setTwoFactorData] = useState<{
    secret?: string
    uri?: string
    qrCode?: string
  } | null>(null)
  const [twoFactorToken, setTwoFactorToken] = useState("")
  const [userId, setUserId] = useState<string | null>(null)

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await apiFetch("/api/auth/me")
        if (response.ok) {
          const data = await response.json()
          setUserId(data.id)
          
          // Stocker le token CSRF si disponible
          if (data.csrfToken) {
            setCSRFToken(data.csrfToken)
          }

          // Si le 2FA est déjà activé, rediriger vers le dashboard
          if (data.twoFactorEnabled) {
            router.push("/dashboard/agences")
            return
          }

          // Si ce n'est pas un Super Admin, rediriger
          if (data.role !== "Super Admin") {
            router.push("/dashboard/agences")
            return
          }
        } else {
          // Pas de session, rediriger vers login
          router.push("/login")
          return
        }
      } catch (error) {
        console.error("Error fetching user data:", error)
        router.push("/login")
        return
      } finally {
        setLoading(false)
      }
    }

    fetchUserData()
  }, [router])

  const handleSetup2FA = async () => {
    if (!userId) return

    setSettingUp(true)
    setError("")

    try {
      const response = await apiFetch(`/api/users/${userId}/2fa`, {
        method: "POST",
      })

      if (response.ok) {
        const data = await response.json()
        setTwoFactorData(data)
      } else {
        const errorData = await response.json()
        setError(errorData.error || "Erreur lors de la configuration 2FA")
      }
    } catch (error) {
      console.error("Error setting up 2FA:", error)
      setError("Erreur lors de la configuration 2FA")
    } finally {
      setSettingUp(false)
    }
  }

  const handleEnable2FA = async () => {
    if (!userId || !twoFactorToken) {
      setError("Veuillez entrer le code de vérification")
      return
    }

    setEnabling(true)
    setError("")

    try {
      // Vérifier le code 2FA
      const verifyResponse = await apiFetch("/api/auth/verify-2fa", {
        method: "POST",
        body: JSON.stringify({
          userId,
          token: twoFactorToken,
        }),
      })

      if (!verifyResponse.ok) {
        setError("Code de vérification incorrect")
        setEnabling(false)
        return
      }

      // Activer le 2FA
      const response = await apiFetch(`/api/users/${userId}/2fa`, {
        method: "PUT",
        body: JSON.stringify({ enabled: true }),
      })

      if (response.ok) {
        // Rediriger vers le dashboard
        router.push("/dashboard/agences")
      } else {
        const errorData = await response.json()
        setError(errorData.error || "Erreur lors de l'activation du 2FA")
      }
    } catch (error) {
      console.error("Error enabling 2FA:", error)
      setError("Erreur lors de l'activation du 2FA")
    } finally {
      setEnabling(false)
    }
  }

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-background">
        <Card className="w-full max-w-md">
          <CardContent className="pt-6">
            <div className="text-center">Chargement...</div>
          </CardContent>
        </Card>
      </div>
    )
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-background p-4">
      <Card className="w-full max-w-4xl">
        <CardHeader>
          <div className="flex items-center gap-3">
            <div className="rounded-full bg-yellow-100 dark:bg-yellow-900/20 p-2">
              <AlertTriangle className="h-6 w-6 text-yellow-600 dark:text-yellow-400" />
            </div>
            <div>
              <CardTitle>Configuration 2FA obligatoire</CardTitle>
              <CardDescription>
                L'authentification à deux facteurs (2FA) est obligatoire pour les Super Admin
              </CardDescription>
            </div>
          </div>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="rounded-lg bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800 p-4">
            <div className="flex items-start gap-3">
              <Shield className="h-5 w-5 text-yellow-600 dark:text-yellow-400 mt-0.5" />
              <div className="flex-1">
                <h4 className="font-semibold text-yellow-800 dark:text-yellow-200 mb-1">
                  Accès limité jusqu'à l'activation du 2FA
                </h4>
                <p className="text-sm text-yellow-700 dark:text-yellow-300">
                  Vous devez activer l'authentification à deux facteurs pour accéder à toutes les fonctionnalités de l'application.
                  Une fois le 2FA activé, vous pourrez accéder au tableau de bord.
                </p>
              </div>
            </div>
          </div>

          {!twoFactorData ? (
            <div className="space-y-4">
              <p className="text-sm text-muted-foreground">
                Cliquez sur le bouton ci-dessous pour générer votre QR Code 2FA. 
                Vous devrez scanner ce code avec Google Authenticator ou une application similaire.
              </p>
              <Button
                onClick={handleSetup2FA}
                disabled={settingUp}
                className="w-full gap-2"
                size="lg"
              >
                <Shield className="h-4 w-4" />
                {settingUp ? "Génération en cours..." : "Générer le QR Code 2FA"}
              </Button>
            </div>
          ) : (
            <div className="space-y-6">
              <div className="space-y-4">
                <div className="flex justify-center">
                  <div className="border-2 border-border rounded-lg p-4 sm:p-6 bg-white dark:bg-gray-900 shadow-lg flex items-center justify-center w-full max-w-[90vw]">
                    <img
                      src={twoFactorData.qrCode || ""}
                      alt="QR Code 2FA"
                      style={{
                        width: "min(500px, 85vw)",
                        height: "min(500px, 85vw)",
                        maxWidth: "100%",
                        maxHeight: "100%",
                        objectFit: "contain",
                        display: "block",
                        flexShrink: 0
                      }}
                    />
                  </div>
                </div>
                {twoFactorData.secret && (
                  <div className="space-y-2">
                    <Label>Secret (si vous préférez l'entrer manuellement)</Label>
                    <Input value={twoFactorData.secret} readOnly className="font-mono text-sm" />
                  </div>
                )}
                <div className="space-y-2">
                  <Label htmlFor="twoFactorToken">Code de vérification *</Label>
                  <Input
                    id="twoFactorToken"
                    value={twoFactorToken}
                    onChange={(e) => setTwoFactorToken(e.target.value)}
                    placeholder="Entrez le code à 6 chiffres depuis Google Authenticator"
                    maxLength={6}
                    className="text-center text-2xl tracking-widest"
                  />
                  <p className="text-xs text-muted-foreground">
                    Scannez le QR Code avec Google Authenticator, puis entrez le code à 6 chiffres affiché
                  </p>
                </div>
              </div>
              {error && (
                <div className="text-sm text-destructive bg-destructive/10 p-3 rounded-md">
                  {error}
                </div>
              )}
              <div className="flex gap-3">
                <Button
                  variant="outline"
                  onClick={() => {
                    setTwoFactorData(null)
                    setTwoFactorToken("")
                    setError("")
                  }}
                  disabled={enabling}
                  className="flex-1"
                >
                  Annuler
                </Button>
                <Button
                  onClick={handleEnable2FA}
                  disabled={enabling || !twoFactorToken || twoFactorToken.length !== 6}
                  className="flex-1 gap-2"
                  size="lg"
                >
                  <Shield className="h-4 w-4" />
                  {enabling ? "Activation..." : "Activer le 2FA"}
                </Button>
              </div>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}

