"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import { DashboardLayout } from "@/components/layout/dashboard-layout"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Switch } from "@/components/ui/switch"
import { Plus, Edit, Trash2, Shield, ShieldOff, Save, X } from "lucide-react"

interface User {
  id: string
  login: string
  role: string
  twoFactorEnabled: boolean
  active: boolean
  createdAt: string
  updatedAt: string
}

export default function UtilisateursPage() {
  const [users, setUsers] = useState<User[]>([])
  const [loading, setLoading] = useState(true)
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [selectedUser, setSelectedUser] = useState<User | null>(null)
  const [formData, setFormData] = useState({
    login: "",
    password: "",
    role: "User",
    active: true,
  })
  const [is2FADialogOpen, setIs2FADialogOpen] = useState(false)
  const [twoFactorData, setTwoFactorData] = useState<{
    secret?: string
    uri?: string
    qrCode?: string
  } | null>(null)
  const [twoFactorToken, setTwoFactorToken] = useState("")
  const [current2FAUserId, setCurrent2FAUserId] = useState<string | null>(null)

  useEffect(() => {
    loadUsers()
  }, [])

  const loadUsers = async () => {
    setLoading(true)
    try {
      const response = await fetch("/api/users")
      if (response.ok) {
        const data = await response.json()
        setUsers(data)
      } else {
        alert("Erreur lors du chargement des utilisateurs")
      }
    } catch (error) {
      console.error("Error loading users:", error)
      alert("Erreur lors du chargement des utilisateurs")
    } finally {
      setLoading(false)
    }
  }

  const handleAddUser = () => {
    setSelectedUser(null)
    setFormData({
      login: "",
      password: "",
      role: "User",
      active: true,
    })
    setIsDialogOpen(true)
  }

  const handleEditUser = (user: User) => {
    setSelectedUser(user)
    setFormData({
      login: user.login,
      password: "",
      role: user.role,
      active: user.active,
    })
    setIsDialogOpen(true)
  }

  const handleDeleteUser = async (userId: string, userLogin: string) => {
    if (!confirm(`Êtes-vous sûr de vouloir supprimer l'utilisateur "${userLogin}" ?`)) {
      return
    }

    try {
      const response = await fetch(`/api/users/${userId}`, {
        method: "DELETE",
      })

      if (response.ok) {
        await loadUsers()
      } else {
        const error = await response.json()
        alert(error.error || "Erreur lors de la suppression")
      }
    } catch (error) {
      console.error("Error deleting user:", error)
      alert("Erreur lors de la suppression")
    }
  }

  const handleToggleActive = async (user: User) => {
    try {
      const response = await fetch(`/api/users/${user.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          login: user.login,
          role: user.role,
          active: !user.active,
        }),
      })

      if (response.ok) {
        await loadUsers()
      } else {
        const error = await response.json()
        alert(error.error || "Erreur lors de la modification")
      }
    } catch (error) {
      console.error("Error toggling active:", error)
      alert("Erreur lors de la modification")
    }
  }

  const handleSaveUser = async () => {
    if (!formData.login.trim()) {
      alert("Le login est requis")
      return
    }

    if (!selectedUser && !formData.password) {
      alert("Le mot de passe est requis pour un nouvel utilisateur")
      return
    }

    try {
      const url = selectedUser ? `/api/users/${selectedUser.id}` : "/api/users"
      const method = selectedUser ? "PUT" : "POST"

      const body: any = {
        login: formData.login,
        role: formData.role,
        active: formData.active,
      }

      if (formData.password) {
        body.password = formData.password
      }

      const response = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      })

      if (response.ok) {
        await loadUsers()
        setIsDialogOpen(false)
        setSelectedUser(null)
        setFormData({
          login: "",
          password: "",
          role: "User",
          active: true,
        })
      } else {
        const error = await response.json()
        alert(error.error || "Erreur lors de la sauvegarde")
      }
    } catch (error) {
      console.error("Error saving user:", error)
      alert("Erreur lors de la sauvegarde")
    }
  }

  const handleSetup2FA = async (userId: string) => {
    try {
      const response = await fetch(`/api/users/${userId}/2fa`, {
        method: "POST",
      })

      if (response.ok) {
        const data = await response.json()
        console.log("2FA data received:", data)
        console.log("QR Code type:", typeof data.qrCode)
        console.log("QR Code length:", data.qrCode?.length)
        setTwoFactorData(data)
        setCurrent2FAUserId(userId)
        setIs2FADialogOpen(true)
      } else {
        const error = await response.json()
        alert(error.error || "Erreur lors de la configuration 2FA")
      }
    } catch (error) {
      console.error("Error setting up 2FA:", error)
      alert("Erreur lors de la configuration 2FA")
    }
  }

  const handleEnable2FA = async () => {
    if (!current2FAUserId) return
    
    if (!twoFactorToken) {
      alert("Veuillez entrer le code de vérification")
      return
    }

    try {
      // Vérifier le token
      const verifyResponse = await fetch("/api/auth/verify-2fa", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          userId: current2FAUserId,
          token: twoFactorToken,
        }),
      })

      if (!verifyResponse.ok) {
        alert("Code de vérification incorrect")
        return
      }

      // Activer le 2FA
      const response = await fetch(`/api/users/${current2FAUserId}/2fa`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ enabled: true }),
      })

      if (response.ok) {
        setIs2FADialogOpen(false)
        setTwoFactorData(null)
        setTwoFactorToken("")
        setCurrent2FAUserId(null)
        await loadUsers()
      } else {
        const error = await response.json()
        alert(error.error || "Erreur lors de l'activation du 2FA")
      }
    } catch (error) {
      console.error("Error enabling 2FA:", error)
      alert("Erreur lors de l'activation du 2FA")
    }
  }

  const handleDisable2FA = async (userId: string) => {
    if (!confirm("Êtes-vous sûr de vouloir désactiver le 2FA pour cet utilisateur ?")) {
      return
    }

    try {
      const response = await fetch(`/api/users/${userId}/2fa`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ enabled: false }),
      })

      if (response.ok) {
        await loadUsers()
      } else {
        const error = await response.json()
        alert(error.error || "Erreur lors de la désactivation du 2FA")
      }
    } catch (error) {
      console.error("Error disabling 2FA:", error)
      alert("Erreur lors de la désactivation du 2FA")
    }
  }

  return (
    <DashboardLayout>
      <div className="p-3 sm:p-6">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 sm:gap-0 mb-4 sm:mb-6">
          <h1 className="text-xl sm:text-2xl font-bold">Utilisateurs</h1>
          <Button onClick={handleAddUser} className="gap-2 w-full sm:w-auto min-h-[44px]">
            <Plus className="h-4 w-4" />
            <span className="hidden sm:inline">Nouvel utilisateur</span>
            <span className="sm:hidden">Nouveau</span>
          </Button>
        </div>

        {loading ? (
          <div>Chargement...</div>
        ) : (
          <div className="space-y-4">
            {users.map((user) => (
              <Card key={user.id}>
                <CardHeader>
                  <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 sm:gap-0">
                    <div className="flex-1">
                      <CardTitle>{user.login}</CardTitle>
                      <div className="text-xs sm:text-sm text-muted-foreground mt-1 flex flex-wrap gap-1 sm:gap-0">
                        <span>Rôle: {user.role}</span>
                        <span className="hidden sm:inline"> | </span>
                        {user.active ? (
                          <span className="text-green-600">Actif</span>
                        ) : (
                          <span className="text-red-600">Désactivé</span>
                        )}
                        <span className="hidden sm:inline"> | </span>
                        <span>2FA: </span>
                        {user.twoFactorEnabled ? (
                          <span className="text-green-600">Activé</span>
                        ) : (
                          <span className="text-gray-600">Désactivé</span>
                        )}
                      </div>
                    </div>
                    <div className="flex flex-wrap gap-2 w-full sm:w-auto">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleEditUser(user)}
                        className="gap-2 flex-1 sm:flex-initial min-h-[44px]"
                      >
                        <Edit className="h-4 w-4" />
                        <span className="hidden sm:inline">Modifier</span>
                        <span className="sm:hidden">Modif.</span>
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleToggleActive(user)}
                        className="gap-2 flex-1 sm:flex-initial min-h-[44px]"
                      >
                        {user.active ? (
                          <>
                            <ShieldOff className="h-4 w-4" />
                            <span className="hidden sm:inline">Désactiver</span>
                          </>
                        ) : (
                          <>
                            <Shield className="h-4 w-4" />
                            <span className="hidden sm:inline">Activer</span>
                          </>
                        )}
                      </Button>
                      {!user.twoFactorEnabled ? (
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => handleSetup2FA(user.id)}
                          className="gap-2 flex-1 sm:flex-initial min-h-[44px]"
                        >
                          <Shield className="h-4 w-4" />
                          <span className="hidden sm:inline">2FA</span>
                        </Button>
                      ) : (
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => handleDisable2FA(user.id)}
                          className="gap-2 flex-1 sm:flex-initial min-h-[44px]"
                        >
                          <ShieldOff className="h-4 w-4" />
                          <span className="hidden sm:inline">Désactiver 2FA</span>
                          <span className="sm:hidden">2FA Off</span>
                        </Button>
                      )}
                      <Button
                        variant="destructive"
                        size="sm"
                        onClick={() => handleDeleteUser(user.id, user.login)}
                        className="gap-2 flex-1 sm:flex-initial min-h-[44px]"
                      >
                        <Trash2 className="h-4 w-4" />
                        <span className="hidden sm:inline">Supprimer</span>
                        <span className="sm:hidden">Suppr.</span>
                      </Button>
                    </div>
                  </div>
                </CardHeader>
              </Card>
            ))}
          </div>
        )}

        {/* Dialog Créer/Modifier utilisateur */}
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>
                {selectedUser ? "Modifier l'utilisateur" : "Nouvel utilisateur"}
              </DialogTitle>
              <DialogDescription>
                {selectedUser
                  ? "Modifiez les informations de l'utilisateur"
                  : "Créez un nouvel utilisateur"}
              </DialogDescription>
            </DialogHeader>
            <div className="space-y-4 py-4">
              <div className="space-y-2">
                <Label>Login *</Label>
                <Input
                  value={formData.login}
                  onChange={(e) =>
                    setFormData({ ...formData, login: e.target.value })
                  }
                  placeholder="Login"
                  required
                />
              </div>
              <div className="space-y-2">
                <Label>Mot de passe {selectedUser ? "(laisser vide pour ne pas modifier)" : "*"}</Label>
                <Input
                  type="password"
                  value={formData.password}
                  onChange={(e) =>
                    setFormData({ ...formData, password: e.target.value })
                  }
                  placeholder="Mot de passe"
                  required={!selectedUser}
                />
              </div>
              <div className="space-y-2">
                <Label>Rôle *</Label>
                <Select
                  value={formData.role}
                  onValueChange={(value) =>
                    setFormData({ ...formData, role: value })
                  }
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="User">User</SelectItem>
                    <SelectItem value="Admin">Admin</SelectItem>
                    <SelectItem value="Super Admin">Super Admin</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="flex items-center justify-between">
                <Label>Actif</Label>
                <Switch
                  checked={formData.active}
                  onCheckedChange={(checked) =>
                    setFormData({ ...formData, active: checked })
                  }
                />
              </div>
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setIsDialogOpen(false)}>
                Annuler
              </Button>
              <Button onClick={handleSaveUser}>Enregistrer</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>

        {/* Dialog Configuration 2FA */}
        <Dialog
          open={is2FADialogOpen}
          onOpenChange={(open) => {
            setIs2FADialogOpen(open)
            if (!open) {
              setTwoFactorData(null)
              setTwoFactorToken("")
              setCurrent2FAUserId(null)
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
                  setCurrent2FAUserId(null)
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
