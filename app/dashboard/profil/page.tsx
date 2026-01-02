"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import { DashboardLayout } from "@/components/layout/dashboard-layout"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Switch } from "@/components/ui/switch"
import { Save, Shield, ShieldOff } from "lucide-react"

interface UserData {
  id: string
  login: string
  role: string
  twoFactorEnabled: boolean
}

export default function ProfilPage() {
  const [userData, setUserData] = useState<UserData | null>(null)
  const [loading, setLoading] = useState(true)
  const [editing, setEditing] = useState(false)
  const [formData, setFormData] = useState({
    login: "",
    password: "",
    confirmPassword: "",
  })
  const [error, setError] = useState("")
  const [success, setSuccess] = useState("")
  const [is2FADialogOpen, setIs2FADialogOpen] = useState(false)
  const [twoFactorData, setTwoFactorData] = useState<{
    secret?: string
    uri?: string
    qrCode?: string
  } | null>(null)
  const [twoFactorToken, setTwoFactorToken] = useState("")

  useEffect(() => {
    const loadUserData = async () => {
      try {
        await fetchUserData()
      } finally {
        setLoading(false)
      }
    }

    loadUserData()
  }, [])

    const fetchUserData = async () => {
      try {
        const response = await fetch("/api/auth/me")
        if (response.ok) {
          const data = await response.json()
          setUserData(data)
          setFormData((prev) => ({ ...prev, login: data.login }))
        }
      } catch (error) {
        console.error("Error fetching user data:", error)
      }
    }

  const handleSave = async () => {
    setError("")
    setSuccess("")

    if (formData.password && formData.password !== formData.confirmPassword) {
      setError("Les mots de passe ne correspondent pas")
      return
    }

    try {
      const updateData: any = { login: formData.login }
      if (formData.password) {
        updateData.password = formData.password
      }

      const response = await fetch(`/api/auth/profile`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(updateData),
      })

      if (response.ok) {
        setSuccess("Profil mis à jour avec succès")
        setEditing(false)
        setFormData({ ...formData, password: "", confirmPassword: "" })
        // Recharger les données utilisateur
        await fetchUserData()
      } else {
        const data = await response.json()
        setError(data.error || "Erreur lors de la mise à jour")
      }
    } catch (error) {
      console.error("Error updating profile:", error)
      setError("Erreur lors de la mise à jour")
    }
  }

  const handleSetup2FA = async () => {
    if (!userData?.id) return

    try {
      const response = await fetch(`/api/users/${userData.id}/2fa`, {
        method: "POST",
      })

      if (response.ok) {
        const data = await response.json()
        setTwoFactorData(data)
        setIs2FADialogOpen(true)
      } else {
        const error = await response.json()
        setError(error.error || "Erreur lors de la configuration 2FA")
      }
    } catch (error) {
      console.error("Error setting up 2FA:", error)
      setError("Erreur lors de la configuration 2FA")
    }
  }

  const handleEnable2FA = async () => {
    if (!userData?.id) return

    if (!twoFactorToken) {
      setError("Veuillez entrer le code de vérification")
      return
    }

    try {
      // Vérifier le token
      const verifyResponse = await fetch("/api/auth/verify-2fa", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          userId: userData.id,
          token: twoFactorToken,
        }),
      })

      if (!verifyResponse.ok) {
        setError("Code de vérification incorrect")
        return
      }

      // Activer le 2FA
      const response = await fetch(`/api/users/${userData.id}/2fa`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ enabled: true }),
      })

      if (response.ok) {
        setSuccess("2FA activé avec succès")
        setIs2FADialogOpen(false)
        setTwoFactorData(null)
        setTwoFactorToken("")
        await fetchUserData()
      } else {
        const error = await response.json()
        setError(error.error || "Erreur lors de l'activation du 2FA")
      }
    } catch (error) {
      console.error("Error enabling 2FA:", error)
      setError("Erreur lors de l'activation du 2FA")
    }
  }

  const handleDisable2FA = async () => {
    if (!userData?.id) return

    if (!confirm("Êtes-vous sûr de vouloir désactiver le 2FA ?")) {
      return
    }

    try {
      const response = await fetch(`/api/users/${userData.id}/2fa`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ enabled: false }),
      })

      if (response.ok) {
        setSuccess("2FA désactivé avec succès")
        await fetchUserData()
      } else {
        const error = await response.json()
        setError(error.error || "Erreur lors de la désactivation du 2FA")
      }
    } catch (error) {
      console.error("Error disabling 2FA:", error)
      setError("Erreur lors de la désactivation du 2FA")
    }
  }

  if (loading) {
    return (
      <DashboardLayout>
        <div className="p-6">
          <div>Chargement...</div>
        </div>
      </DashboardLayout>
    )
  }

  return (
    <DashboardLayout>
      <div className="p-3 sm:p-6">
        <h1 className="text-xl sm:text-2xl font-bold mb-4 sm:mb-6">Mon profil</h1>

        <Card>
          <CardHeader>
            <CardTitle>Informations personnelles</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {error && (
              <div className="p-3 bg-red-50 text-red-700 rounded-md text-sm">
                {error}
              </div>
            )}
            {success && (
              <div className="p-3 bg-green-50 text-green-700 rounded-md text-sm">
                {success}
              </div>
            )}

            <div className="space-y-2">
              <Label htmlFor="role">Rôle</Label>
              <Input
                id="role"
                value={userData?.role || ""}
                disabled
                className="bg-muted"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="login">Login</Label>
              <Input
                id="login"
                value={formData.login}
                onChange={(e) =>
                  setFormData({ ...formData, login: e.target.value })
                }
                disabled={!editing}
              />
            </div>

            {editing && (
              <>
                <div className="space-y-2">
                  <Label htmlFor="password">Nouveau mot de passe (optionnel)</Label>
                  <Input
                    id="password"
                    type="password"
                    value={formData.password}
                    onChange={(e) =>
                      setFormData({ ...formData, password: e.target.value })
                    }
                    placeholder="Laisser vide pour ne pas modifier"
                  />
                </div>

                  <div className="space-y-2">
                    <Label htmlFor="confirmPassword">Confirmer le mot de passe</Label>
                    <Input
                      id="confirmPassword"
                      type="password"
                      value={formData.confirmPassword}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          confirmPassword: e.target.value,
                        })
                      }
                    placeholder={formData.password ? "Confirmer le mot de passe" : "Laisser vide pour ne pas modifier"}
                    />
                  </div>
              </>
            )}

            {!editing && (
              <div className="space-y-2">
                <Label className="text-base font-medium">Modifier le mot de passe</Label>
              </div>
            )}

            <div className="flex flex-col sm:flex-row gap-2">
              {!editing ? (
                <Button onClick={() => setEditing(true)} className="w-full sm:w-auto min-h-[44px]">Modifier</Button>
              ) : (
                <>
                  <Button onClick={handleSave} className="gap-2 w-full sm:w-auto min-h-[44px]">
                    <Save className="h-4 w-4" />
                    Enregistrer
                  </Button>
                  <Button
                    variant="outline"
                    onClick={() => {
                      setEditing(false)
                      setFormData({
                        login: userData?.login || "",
                        password: "",
                        confirmPassword: "",
                      })
                      setError("")
                      setSuccess("")
                    }}
                    className="w-full sm:w-auto min-h-[44px]"
                  >
                    Annuler
                  </Button>
                </>
              )}
            </div>
          </CardContent>
        </Card>

        <Card className="mt-4">
          <CardHeader>
            <CardTitle>Authentification à deux facteurs (2FA)</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label htmlFor="2fa-switch">Activer le 2FA</Label>
                <p className="text-sm text-muted-foreground">
                  {userData?.twoFactorEnabled
                    ? "Le 2FA est actuellement activé"
                    : "Le 2FA est actuellement désactivé"}
                </p>
              </div>
              <div className="flex items-center gap-2">
                {userData?.twoFactorEnabled ? (
                  <Button
                    variant="outline"
                    onClick={handleDisable2FA}
                    className="gap-2 min-h-[44px]"
                  >
                    <ShieldOff className="h-4 w-4" />
                    Désactiver
                  </Button>
                ) : (
                  <Button
                    onClick={handleSetup2FA}
                    className="gap-2 min-h-[44px]"
                  >
                    <Shield className="h-4 w-4" />
                    Activer
                  </Button>
                )}
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Dialog Configuration 2FA */}
        <Dialog
          open={is2FADialogOpen}
          onOpenChange={(open) => {
            setIs2FADialogOpen(open)
            if (!open) {
              setTwoFactorData(null)
              setTwoFactorToken("")
              setError("")
            }
          }}
        >
          <DialogContent className="max-w-md">
            <DialogHeader>
              <DialogTitle>Configuration 2FA</DialogTitle>
              <DialogDescription>
                Scannez le QR Code avec Google Authenticator ou entrez le secret
                manuellement
              </DialogDescription>
            </DialogHeader>
            <div className="space-y-4 py-4">
              {twoFactorData?.qrCode && (
                <div className="flex justify-center">
                  <div className="relative w-48 h-48">
                    <Image
                      src={twoFactorData.qrCode}
                      alt="QR Code 2FA"
                      fill
                      className="object-contain"
                      unoptimized
                    />
                  </div>
                </div>
              )}
              {twoFactorData?.secret && (
                <div className="space-y-2">
                  <Label>Secret</Label>
                  <Input value={twoFactorData.secret} readOnly />
                </div>
              )}
              <div className="space-y-2">
                <Label>Code de vérification *</Label>
                <Input
                  value={twoFactorToken}
                  onChange={(e) => setTwoFactorToken(e.target.value)}
                  placeholder="Entrez le code depuis Google Authenticator"
                />
              </div>
            </div>
            <DialogFooter>
              <Button
                variant="outline"
                onClick={() => {
                  setIs2FADialogOpen(false)
                  setTwoFactorData(null)
                  setTwoFactorToken("")
                  setError("")
                }}
              >
                Annuler
              </Button>
              <Button onClick={handleEnable2FA}>
                Activer 2FA
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
    </DashboardLayout>
  )
}

