"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
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
import { Save, Shield, ShieldOff, Trash2 } from "lucide-react"
import { apiFetch } from "@/lib/api-client"
import { setCSRFToken } from "@/lib/csrf-client"

interface UserData {
  id: string
  login: string
  role: string
  twoFactorEnabled: boolean
  requiresTwoFactorSetup?: boolean
  photo?: string | null
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
  const [userPhotoFile, setUserPhotoFile] = useState<File | null>(null)
  const [userPhotoPreview, setUserPhotoPreview] = useState<string | null>(null)

  // Fonctions pour les avatars
  const getInitials = (name: string) => {
    return name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase()
      .slice(0, 2)
  }

  const getAvatarColor = (name: string) => {
    const colors = [
      "bg-blue-500",
      "bg-green-500",
      "bg-yellow-500",
      "bg-purple-500",
      "bg-pink-500",
      "bg-indigo-500",
      "bg-red-500",
      "bg-orange-500",
    ]
    const index = name.charCodeAt(0) % colors.length
    return colors[index]
  }

  const fetchUserData = async () => {
    try {
      const response = await apiFetch("/api/auth/me")
      if (response.ok) {
        const data = await response.json()
        setUserData(data)
        setFormData((prev) => ({ ...prev, login: data.login }))
        
        // Stocker le token CSRF si disponible
        if (data.csrfToken) {
          setCSRFToken(data.csrfToken)
        }
      }
    } catch (error) {
      console.error("Error fetching user data:", error)
    }
  }

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

      const response = await apiFetch(`/api/auth/profile`, {
        method: "PUT",
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
        // Afficher le message d'erreur principal et les détails si disponibles
        let errorMessage = data.error || "Erreur lors de la mise à jour"
        if (data.details && Array.isArray(data.details) && data.details.length > 0) {
          const detailsMessages = data.details
            .filter((d: any) => d.message && !errorMessage.includes(d.message))
            .map((d: any) => d.message)
          if (detailsMessages.length > 0) {
            errorMessage += "\n\n" + detailsMessages.join("\n")
          }
        }
        setError(errorMessage)
      }
    } catch (error) {
      console.error("Error updating profile:", error)
      setError("Erreur lors de la mise à jour")
    }
  }

  const handleSetup2FA = async () => {
    if (!userData?.id) return

    try {
      const response = await apiFetch(`/api/users/${userData.id}/2fa`, {
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
      const verifyResponse = await apiFetch("/api/auth/verify-2fa", {
        method: "POST",
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
      const response = await apiFetch(`/api/users/${userData.id}/2fa`, {
        method: "PUT",
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
      const response = await apiFetch(`/api/users/${userData.id}/2fa`, {
        method: "PUT",
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

  const handlePhotoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      // Vérifier la taille (1 MB max)
      if (file.size > 1 * 1024 * 1024) {
        setError("La photo ne doit pas dépasser 1 MB")
        return
      }

      // Vérifier le type
      if (!file.type.startsWith("image/")) {
        setError("Le fichier doit être une image")
        return
      }

      setUserPhotoFile(file)
      setUserPhotoPreview(URL.createObjectURL(file))
      setError("")
    }
  }

  const handleUploadPhoto = async () => {
    if (!userData?.id || !userPhotoFile) return

    setError("")
    setSuccess("")

    try {
      const photoFormData = new FormData()
      photoFormData.append("file", userPhotoFile)

      const photoResponse = await apiFetch(`/api/users/${userData.id}/photo`, {
        method: "POST",
        body: photoFormData,
      })

      if (photoResponse.ok) {
        setSuccess("Photo de profil mise à jour avec succès")
        setUserPhotoFile(null)
        setUserPhotoPreview(null)
        await fetchUserData()
      } else {
        // Vérifier si le body peut être lu
        let errorMessage = "Erreur lors de l'upload de la photo"
        try {
          const errorData = await photoResponse.json()
          errorMessage = errorData.error || errorData.details || errorMessage
        } catch (jsonError) {
          // Si le body ne peut pas être lu, utiliser le message d'erreur par défaut
          console.warn("Impossible de lire le body de la réponse:", jsonError)
          // Essayer de récupérer le message depuis le status
          if (photoResponse.status === 403) {
            errorMessage = "Accès refusé. Vérifiez vos permissions."
          } else if (photoResponse.status === 400) {
            errorMessage = "Fichier invalide. Vérifiez le format et la taille."
          }
        }
        setError(errorMessage)
      }
    } catch (error: any) {
      console.error("Error uploading photo:", error)
      setError(error.message || "Erreur lors de l'upload de la photo")
    }
  }

  const handleDeletePhoto = async () => {
    if (!userData?.id) return

    if (!confirm("Êtes-vous sûr de vouloir supprimer la photo de profil ?")) {
      return
    }

    setError("")
    setSuccess("")

    try {
      const response = await apiFetch(`/api/users/${userData.id}/photo`, {
        method: "DELETE",
      })

      if (response.ok) {
        setSuccess("Photo de profil supprimée avec succès")
        setUserPhotoFile(null)
        setUserPhotoPreview(null)
        await fetchUserData()
      } else {
        const error = await response.json()
        setError(error.error || "Erreur lors de la suppression de la photo")
      }
    } catch (error) {
      console.error("Error deleting photo:", error)
      setError("Erreur lors de la suppression de la photo")
    }
  }

  if (loading) {
    return (
      <div className="p-6">
        <div>Chargement...</div>
      </div>
    )
  }

  return (
      <div className="p-3 sm:p-6">
        <h1 className="text-xl sm:text-2xl font-bold mb-4 sm:mb-6">Mon profil</h1>

        <Card>
          <CardHeader>
            <CardTitle>Informations personnelles</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {error && (
              <div className="p-3 bg-red-50 dark:bg-red-900/20 text-red-700 dark:text-red-400 rounded-md text-sm">
                {error}
              </div>
            )}
            {success && (
              <div className="p-3 bg-green-50 dark:bg-green-900/20 text-green-700 dark:text-green-400 rounded-md text-sm">
                {success}
              </div>
            )}

            {/* Photo de profil */}
            <div className="space-y-2">
              <Label>Photo de profil</Label>
              <div className="flex items-center gap-4">
                {userPhotoPreview ? (
                  <Image
                    src={userPhotoPreview}
                    alt="Aperçu"
                    width={100}
                    height={100}
                    className="rounded-full object-cover"
                    unoptimized
                  />
                ) : userData?.photo ? (
                  <Image
                    src={userData.photo}
                    alt="Photo actuelle"
                    width={100}
                    height={100}
                    className="rounded-full object-cover"
                    unoptimized
                  />
                ) : (
                  <div className={`w-[100px] h-[100px] rounded-full ${getAvatarColor(userData?.login || "")} text-white text-2xl flex items-center justify-center font-semibold`}>
                    {getInitials(userData?.login || "")}
                  </div>
                )}
                <div className="flex-1 space-y-2">
                  <Input
                    type="file"
                    accept="image/jpeg,image/png"
                    onChange={handlePhotoChange}
                    className="cursor-pointer"
                  />
                  <p className="text-xs text-muted-foreground">
                    Maximum 1 MB. La photo sera redimensionnée en 100x100px.
                  </p>
                  {userPhotoFile && (
                    <div className="flex gap-2">
                      <Button
                        type="button"
                        variant="default"
                        size="sm"
                        onClick={handleUploadPhoto}
                        className="flex-1"
                      >
                        Enregistrer la photo
                      </Button>
                      <Button
                        type="button"
                        variant="outline"
                        size="sm"
                        onClick={() => {
                          setUserPhotoFile(null)
                          setUserPhotoPreview(null)
                        }}
                      >
                        Annuler
                      </Button>
                    </div>
                  )}
                  {userData?.photo && !userPhotoFile && (
                    <Button
                      type="button"
                      variant="outline"
                      size="sm"
                      onClick={handleDeletePhoto}
                      className="w-full"
                    >
                      <Trash2 className="h-4 w-4 mr-2" />
                      Supprimer la photo
                    </Button>
                  )}
                </div>
              </div>
            </div>

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
                  setFormData((prev) => ({ ...prev, login: e.target.value }))
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
                      setFormData((prev) => ({ ...prev, password: e.target.value }))
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
                        setFormData((prev) => ({
                          ...prev,
                          confirmPassword: e.target.value,
                        }))
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
            {userData?.requiresTwoFactorSetup && userData?.role === "Super Admin" && (
              <div className="rounded-lg bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800 p-4 mb-4">
                <div className="flex items-start gap-3">
                  <Shield className="h-5 w-5 text-yellow-600 dark:text-yellow-400 mt-0.5" />
                  <div className="flex-1">
                    <h4 className="font-semibold text-yellow-800 dark:text-yellow-200 mb-1">
                      Le 2FA est obligatoire pour les Super Admin
                    </h4>
                    <p className="text-sm text-yellow-700 dark:text-yellow-300">
                      Vous devez activer l'authentification à deux facteurs pour accéder à toutes les fonctionnalités. 
                      Veuillez activer le 2FA ci-dessous.
                    </p>
                  </div>
                </div>
              </div>
            )}
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label htmlFor="2fa-switch">Activer le 2FA</Label>
                <p className="text-sm text-muted-foreground">
                  {userData?.twoFactorEnabled
                    ? "Le 2FA est actuellement activé"
                    : userData?.role === "Super Admin"
                    ? "Le 2FA est obligatoire pour les Super Admin"
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
  )
}

