"use client"

import { useState, useEffect, Suspense } from "react"
import { useSearchParams, useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Save, Plus, RotateCcw, HardDrive, AlertTriangle, Trash2, Download, Edit, Shield, ShieldOff, Sliders, Users, FileText } from "lucide-react"
import Image from "next/image"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Switch } from "@/components/ui/switch"

interface Backup {
  filename: string
  date: string
  size: number
  sizeFormatted: string
}

function ParametresPageContent() {
  const searchParams = useSearchParams()
  const router = useRouter()
  const initialTab = searchParams.get("tab") || "general"
  
  const [activeTab, setActiveTab] = useState<string>(initialTab)
  
  // Synchroniser activeTab avec l'URL
  useEffect(() => {
    const tab = searchParams.get("tab") || "general"
    setActiveTab(tab)
  }, [searchParams])
  const [sessionTimeout, setSessionTimeout] = useState(60) // En minutes, défaut 1 minute
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [userRole, setUserRole] = useState<string | null>(null)
  
  // États pour les sauvegardes
  const [backups, setBackups] = useState<Backup[]>([])
  const [loadingBackups, setLoadingBackups] = useState(true)
  const [creating, setCreating] = useState(false)
  const [restoring, setRestoring] = useState(false)
  const [restoreDialogOpen, setRestoreDialogOpen] = useState(false)
  const [selectedBackup, setSelectedBackup] = useState<Backup | null>(null)
  const [purgeDialogOpen, setPurgeDialogOpen] = useState(false)
  const [purgeConfirmText, setPurgeConfirmText] = useState("")
  const [purging, setPurging] = useState(false)
  
  // États pour les logs
  const [logs, setLogs] = useState<any[]>([])
  const [loadingLogs, setLoadingLogs] = useState(true)
  const [purgeLogsDialogOpen, setPurgeLogsDialogOpen] = useState(false)
  const [purgeLogsConfirmText, setPurgeLogsConfirmText] = useState("")
  const [purgingLogs, setPurgingLogs] = useState(false)
  
  // États pour les utilisateurs
  const [users, setUsers] = useState<any[]>([])
  const [loadingUsers, setLoadingUsers] = useState(true)
  const [isUserDialogOpen, setIsUserDialogOpen] = useState(false)
  const [selectedUser, setSelectedUser] = useState<any | null>(null)
  const [userFormData, setUserFormData] = useState({
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
    const fetchUserData = async () => {
      try {
        const response = await fetch("/api/auth/me")
        if (response.ok) {
          const data = await response.json()
          setUserRole(data.role)
        }
      } catch (error) {
        console.error("Error fetching user data:", error)
      }
    }

    fetchUserData()
  }, [])

  useEffect(() => {
    const loadSettings = async () => {
      try {
        const response = await fetch("/api/settings")
        if (response.ok) {
          const data = await response.json()
          setSessionTimeout(data.sessionTimeout || 60)
        }
      } catch (error) {
        console.error("Error loading settings:", error)
      } finally {
        setLoading(false)
      }
    }

    loadSettings()
  }, [])
  
  useEffect(() => {
    if (activeTab === "sauvegardes") {
      loadBackups()
    } else if (activeTab === "logs") {
      loadLogs()
    } else if (activeTab === "utilisateurs") {
      loadUsers()
    }
  }, [activeTab])
  
  const loadBackups = async () => {
    setLoadingBackups(true)
    try {
      const response = await fetch("/api/backups")
      if (response.ok) {
        const data = await response.json()
        setBackups(Array.isArray(data) ? data : [])
      } else {
        const error = await response.json()
        console.error("Error loading backups:", error)
        alert(error.error || "Erreur lors du chargement des sauvegardes")
      }
    } catch (error) {
      console.error("Error loading backups:", error)
      alert("Erreur lors du chargement des sauvegardes")
    } finally {
      setLoadingBackups(false)
    }
  }

  const handleCreateBackup = async () => {
    setCreating(true)
    try {
      const response = await fetch("/api/backups", {
        method: "POST",
      })

      if (response.ok) {
        const newBackup = await response.json()
        await new Promise(resolve => setTimeout(resolve, 500))
        await loadBackups()
        alert(
          `Sauvegarde créée avec succès !\n${newBackup.deletedOldBackups > 0 ? `${newBackup.deletedOldBackups} ancienne(s) sauvegarde(s) supprimée(s).\n` : ""}Fichier : ${newBackup.filename}`
        )
      } else {
        const error = await response.json()
        console.error("Erreur de sauvegarde:", error)
        alert(error.error || "Erreur lors de la création de la sauvegarde" + (error.details ? `\n\nDétails: ${error.details}` : ""))
      }
    } catch (error) {
      console.error("Error creating backup:", error)
      alert("Erreur lors de la création de la sauvegarde")
    } finally {
      setCreating(false)
    }
  }

  const handleRestore = async () => {
    if (!selectedBackup) return

    setRestoring(true)
    try {
      const response = await fetch(
        `/api/backups/${encodeURIComponent(selectedBackup.filename)}/restore`,
        {
          method: "POST",
        }
      )

      if (response.ok) {
        const result = await response.json()
        alert(
          `Sauvegarde restaurée avec succès !\n\nUne sauvegarde de la base actuelle a été créée : ${result.backupCreatedBefore}\n\nL'application va recharger...`
        )
        setRestoreDialogOpen(false)
        setSelectedBackup(null)
        window.location.reload()
      } else {
        const error = await response.json()
        alert(error.error || "Erreur lors de la restauration")
      }
    } catch (error) {
      console.error("Error restoring backup:", error)
      alert("Erreur lors de la restauration de la sauvegarde")
    } finally {
      setRestoring(false)
    }
  }

  const handlePurgeAll = async () => {
    if (purgeConfirmText !== "PURGER") {
      alert('Veuillez saisir "PURGER" pour confirmer')
      return
    }

    setPurging(true)
    try {
      const response = await fetch("/api/backups", {
        method: "DELETE",
      })

      if (response.ok) {
        const result = await response.json()
        alert(result.message || `${result.deletedCount} sauvegarde(s) supprimée(s)`)
        setPurgeDialogOpen(false)
        setPurgeConfirmText("")
        await loadBackups()
      } else {
        const error = await response.json()
        alert(error.error || "Erreur lors de la purge des sauvegardes")
      }
    } catch (error) {
      console.error("Error purging backups:", error)
      alert("Erreur lors de la purge des sauvegardes")
    } finally {
      setPurging(false)
    }
  }
  
  const loadLogs = async () => {
    setLoadingLogs(true)
    try {
      const response = await fetch("/api/logs")
      const data = await response.json()
      setLogs(data)
    } catch (error) {
      console.error("Error loading logs:", error)
    } finally {
      setLoadingLogs(false)
    }
  }

  const exportLogs = async () => {
    try {
      const response = await fetch("/api/logs/export")
      const blob = await response.blob()
      const url = window.URL.createObjectURL(blob)
      const a = document.createElement("a")
      a.href = url
      a.download = "logs.csv"
      a.click()
      window.URL.revokeObjectURL(url)
    } catch (error) {
      console.error("Error exporting logs:", error)
    }
  }

  const handlePurgeLogs = async () => {
    if (purgeLogsConfirmText !== "PURGER") {
      alert('Veuillez saisir "PURGER" pour confirmer')
      return
    }

    setPurgingLogs(true)
    try {
      const response = await fetch("/api/logs", {
        method: "DELETE",
      })

      if (response.ok) {
        const result = await response.json()
        alert(result.message || `${result.deletedCount} log(s) supprimé(s)`)
        setPurgeLogsDialogOpen(false)
        setPurgeLogsConfirmText("")
        await loadLogs()
      } else {
        const error = await response.json()
        alert(error.error || "Erreur lors de la purge des logs")
      }
    } catch (error) {
      console.error("Error purging logs:", error)
      alert("Erreur lors de la purge des logs")
    } finally {
      setPurgingLogs(false)
    }
  }
  
  const loadUsers = async () => {
    setLoadingUsers(true)
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
      setLoadingUsers(false)
    }
  }

  const handleAddUser = () => {
    setSelectedUser(null)
    setUserFormData({
      login: "",
      password: "",
      role: "User",
      active: true,
    })
    setIsUserDialogOpen(true)
  }

  const handleEditUser = (user: any) => {
    setSelectedUser(user)
    setUserFormData({
      login: user.login,
      password: "",
      role: user.role,
      active: user.active,
    })
    setIsUserDialogOpen(true)
  }

  const handleDeleteUser = async (userId: string, userLogin: string) => {
    // Empêcher la suppression du compte Admin
    if (userLogin === "Admin") {
      alert("Le compte Admin ne peut pas être supprimé")
      return
    }

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

  const handleToggleActive = async (user: any) => {
    // Empêcher la désactivation du compte Admin
    if (user.login === "Admin") {
      alert("Le compte Admin ne peut pas être désactivé")
      return
    }

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
    if (!userFormData.login.trim()) {
      alert("Le login est requis")
      return
    }

    // Empêcher la modification du login du compte Admin
    if (selectedUser && selectedUser.login === "Admin" && userFormData.login !== "Admin") {
      alert("Le login du compte Admin ne peut pas être modifié")
      return
    }

    if (!selectedUser && !userFormData.password) {
      alert("Le mot de passe est requis pour un nouvel utilisateur")
      return
    }

    try {
      const url = selectedUser ? `/api/users/${selectedUser.id}` : "/api/users"
      const method = selectedUser ? "PUT" : "POST"

      // Empêcher la modification du rôle et de l'état actif du compte Admin
      if (selectedUser && selectedUser.login === "Admin") {
        // Pour le compte Admin, on ne peut modifier que le mot de passe
        const body: any = {}
        if (userFormData.password) {
          body.password = userFormData.password
        }
        
        const response = await fetch(`/api/users/${selectedUser.id}`, {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(body),
        })

        if (response.ok) {
          await loadUsers()
          setIsUserDialogOpen(false)
          setSelectedUser(null)
          setUserFormData({
            login: "",
            password: "",
            role: "User",
            active: true,
          })
        } else {
          const error = await response.json()
          alert(error.error || "Erreur lors de la sauvegarde")
        }
        return
      }

      const body: any = {
        login: userFormData.login,
        role: userFormData.role,
        active: userFormData.active,
      }

      if (userFormData.password) {
        body.password = userFormData.password
      }

      const response = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      })

      if (response.ok) {
        await loadUsers()
        setIsUserDialogOpen(false)
        setSelectedUser(null)
        setUserFormData({
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

  const handleSave = async () => {
    if (sessionTimeout < 1) {
      alert("La durée de session doit être d'au moins 1 minute")
      return
    }

    setSaving(true)
    try {
      const response = await fetch("/api/settings", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          sessionTimeout: Number(sessionTimeout), // S'assurer que c'est un nombre
        }),
      })

      const data = await response.json()

      if (response.ok) {
        alert("Paramètres enregistrés avec succès")
      } else {
        console.error("Error response:", data)
        alert(data.error || "Erreur lors de l'enregistrement")
      }
    } catch (error) {
      console.error("Error saving settings:", error)
      alert(`Erreur lors de l'enregistrement des paramètres: ${error instanceof Error ? error.message : "Erreur inconnue"}`)
    } finally {
      setSaving(false)
    }
  }

  // Vérifier que l'utilisateur est Super Admin
  if (userRole !== "Super Admin") {
    return (
      <div className="p-6">
        <Card>
          <CardContent className="pt-6">
            <div className="text-center text-muted-foreground">
              <p>Accès refusé. Cette page est réservée aux Super Admin.</p>
            </div>
          </CardContent>
        </Card>
      </div>
    )
  }

  return (
      <div className="p-3 sm:p-6 w-full max-w-full min-w-0 overflow-x-hidden">
        <div className="flex justify-between items-center mb-4 sm:mb-6">
          <h1 className="text-xl sm:text-2xl font-bold">Paramètres</h1>
        </div>

        <Tabs 
          value={activeTab} 
          onValueChange={(value) => {
            setActiveTab(value)
            router.push(`/dashboard/parametres?tab=${value}`)
          }} 
          className="w-full"
        >
          <TabsList className="hidden sm:grid w-full grid-cols-4">
            <TabsTrigger value="general" className="flex items-center gap-2">
              <Sliders className="h-4 w-4" />
              Général
            </TabsTrigger>
            <TabsTrigger value="utilisateurs" className="flex items-center gap-2">
              <Users className="h-4 w-4" />
              Utilisateurs
            </TabsTrigger>
            <TabsTrigger value="sauvegardes" className="flex items-center gap-2">
              <HardDrive className="h-4 w-4" />
              Sauvegardes
            </TabsTrigger>
            <TabsTrigger value="logs" className="flex items-center gap-2">
              <FileText className="h-4 w-4" />
              Logs
            </TabsTrigger>
          </TabsList>

          <TabsContent value="general" className="mt-4">
            {loading ? (
              <div>Chargement...</div>
            ) : (
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Sliders className="h-5 w-5" />
                    Paramètres de l&apos;application
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="session-timeout">
                      Durée de session (en minutes)
                    </Label>
                    <Input
                      id="session-timeout"
                      type="number"
                      min="1"
                      value={sessionTimeout}
                      onChange={(e) => setSessionTimeout(parseInt(e.target.value) || 60)}
                      placeholder="60"
                    />
                    <p className="text-sm text-muted-foreground">
                      Durée d&apos;inactivité avant déconnexion automatique (minimum 1 minute)
                    </p>
                  </div>
                  <Button onClick={handleSave} disabled={saving} className="gap-2">
                    <Save className="h-4 w-4" />
                    {saving ? "Enregistrement..." : "Enregistrer"}
                  </Button>
                </CardContent>
              </Card>
            )}
          </TabsContent>

          <TabsContent value="utilisateurs" className="mt-4">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 sm:gap-0 mb-4 sm:mb-6">
              <h2 className="text-lg sm:text-xl font-semibold">Utilisateurs</h2>
              <Button onClick={handleAddUser} className="gap-2 w-full sm:w-auto min-h-[44px]">
                <Plus className="h-4 w-4" />
                <span className="hidden sm:inline">Nouvel utilisateur</span>
                <span className="sm:hidden">Nouveau</span>
              </Button>
            </div>

            {loadingUsers ? (
              <div>Chargement...</div>
            ) : (
              <div className="space-y-4">
                {users.length === 0 ? (
                  <Card>
                    <CardContent className="pt-6">
                      <div className="text-center text-muted-foreground">
                        <p>Aucun utilisateur disponible</p>
                      </div>
                    </CardContent>
                  </Card>
                ) : (
                  users.map((user) => (
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
                              disabled={user.login === "Admin"}
                              className="gap-2 flex-1 sm:flex-initial min-h-[44px]"
                              title={user.login === "Admin" ? "Le compte Admin ne peut pas être désactivé" : undefined}
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
                              disabled={user.login === "Admin"}
                              className="gap-2 flex-1 sm:flex-initial min-h-[44px]"
                              title={user.login === "Admin" ? "Le compte Admin ne peut pas être supprimé" : undefined}
                            >
                              <Trash2 className="h-4 w-4" />
                              <span className="hidden sm:inline">Supprimer</span>
                              <span className="sm:hidden">Suppr.</span>
                            </Button>
                          </div>
                        </div>
                      </CardHeader>
                    </Card>
                  ))
                )}
              </div>
            )}
          </TabsContent>

          <TabsContent value="sauvegardes" className="mt-4">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 sm:gap-0 mb-4 sm:mb-6">
              <h2 className="text-lg sm:text-xl font-semibold break-words w-full sm:w-auto">Sauvegardes</h2>
              <div className="flex flex-col sm:flex-row gap-2 w-full sm:w-auto">
                {backups.length > 0 && (
                  <Button
                    variant="destructive"
                    onClick={() => setPurgeDialogOpen(true)}
                    className="gap-2 w-full sm:w-auto min-h-[44px]"
                  >
                    <Trash2 className="h-4 w-4" />
                    <span className="hidden sm:inline">Purger toutes les sauvegardes</span>
                    <span className="sm:hidden">Purger</span>
                  </Button>
                )}
                <Button onClick={handleCreateBackup} disabled={creating} className="gap-2 w-full sm:w-auto min-h-[44px]">
                  <Plus className="h-4 w-4" />
                  <span className="hidden sm:inline">{creating ? "Création..." : "Créer une sauvegarde"}</span>
                  <span className="sm:hidden">{creating ? "Création..." : "Créer"}</span>
                </Button>
              </div>
            </div>

            {loadingBackups ? (
              <div>Chargement...</div>
            ) : backups.length === 0 ? (
              <Card>
                <CardContent className="pt-6">
                  <div className="text-center text-muted-foreground">
                    <HardDrive className="h-12 w-12 mx-auto mb-4 opacity-50" />
                    <p className="break-words">Aucune sauvegarde disponible</p>
                    <p className="text-sm mt-2 break-words">
                      Cliquez sur &quot;Créer une sauvegarde&quot; pour créer votre première sauvegarde
                    </p>
                  </div>
                </CardContent>
              </Card>
            ) : (
              <div className="space-y-4">
                <Card>
                  <CardHeader>
                    <CardTitle>Liste des sauvegardes</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-2">
                      {backups.map((backup) => (
                        <div
                          key={backup.filename}
                          className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 sm:gap-0 p-3 sm:p-4 border rounded-lg hover:bg-accent/50 transition-colors"
                        >
                          <div className="flex items-center gap-3 sm:gap-4 flex-1 min-w-0">
                            <HardDrive className="h-5 w-5 text-muted-foreground shrink-0" />
                            <div className="flex-1 min-w-0">
                              <div className="font-medium break-words text-sm sm:text-base">{backup.filename}</div>
                              <div className="text-xs sm:text-sm text-muted-foreground flex flex-wrap gap-1 sm:gap-0 break-words">
                                <span className="break-words">{new Date(backup.date).toLocaleString("fr-FR", {
                                  day: "2-digit",
                                  month: "2-digit",
                                  year: "numeric",
                                  hour: "2-digit",
                                  minute: "2-digit",
                                })}</span>
                                <span className="hidden sm:inline"> • </span>
                                <span className="break-words">{backup.sizeFormatted}</span>
                              </div>
                            </div>
                          </div>
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => {
                              setSelectedBackup(backup)
                              setRestoreDialogOpen(true)
                            }}
                            className="gap-2 w-full sm:w-auto min-h-[44px]"
                          >
                            <RotateCcw className="h-4 w-4" />
                            Restaurer
                          </Button>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Informations</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-2 text-sm text-muted-foreground">
                    <p className="break-words">
                      • Les sauvegardes sont créées automatiquement quotidiennement
                    </p>
                    <p className="break-words">
                      • Les sauvegardes de plus de 10 jours sont automatiquement supprimées
                    </p>
                    <p className="break-words">
                      • La restauration remplace complètement la base de données actuelle
                    </p>
                    <p className="break-words">
                      • Une sauvegarde de la base actuelle est créée avant chaque restauration
                    </p>
                  </CardContent>
                </Card>
              </div>
            )}
          </TabsContent>

          <TabsContent value="logs" className="mt-4">
            <div className="mb-4 sm:mb-6 space-y-2 md:space-y-0 md:flex md:flex-row md:gap-2 md:items-center">
              {logs.length > 0 && (
                <Button
                  variant="destructive"
                  onClick={() => setPurgeLogsDialogOpen(true)}
                  className="w-auto min-h-[44px] gap-2 whitespace-nowrap block md:inline-flex"
                >
                  <Trash2 className="h-4 w-4 shrink-0" />
                  <span>Purger tous les logs</span>
                </Button>
              )}
              <Button
                onClick={exportLogs}
                className="w-auto min-h-[44px] gap-2 whitespace-nowrap block md:inline-flex"
              >
                <Download className="h-4 w-4 shrink-0" />
                <span>Exporter en CSV</span>
              </Button>
            </div>
            {loadingLogs ? (
              <div>Chargement...</div>
            ) : (
              <div className="space-y-2">
                {logs.length === 0 ? (
                  <Card>
                    <CardContent className="pt-6">
                      <div className="text-center text-muted-foreground">
                        <p>Aucun log disponible</p>
                      </div>
                    </CardContent>
                  </Card>
                ) : (
                  logs.map((log) => (
                    <Card key={log.id}>
                      <CardContent className="p-4">
                        <div className="font-semibold break-words">{log.action}</div>
                        <div className="text-sm text-muted-foreground break-words">
                          {new Date(log.createdAt).toLocaleString("fr-FR")} - {log.user?.login || "Anonyme"}
                        </div>
                        {log.details && (
                          <div className="text-sm mt-2 break-words">{log.details}</div>
                        )}
                      </CardContent>
                    </Card>
                  ))
                )}
              </div>
            )}
          </TabsContent>
        </Tabs>

        {/* Dialog de confirmation de purge des logs */}
        <Dialog open={purgeLogsDialogOpen} onOpenChange={setPurgeLogsDialogOpen}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle className="flex items-center gap-2">
                <AlertTriangle className="h-5 w-5 text-destructive" />
                Purger tous les logs
              </DialogTitle>
              <DialogDescription>
                Cette action est irréversible. Tous les logs seront définitivement supprimés.
              </DialogDescription>
            </DialogHeader>
            <div className="py-4">
              <div className="space-y-4">
                <div className="p-3 bg-destructive/10 rounded border border-destructive/20">
                  <p className="text-sm font-medium text-destructive">
                    Attention : Cette action supprimera définitivement tous les logs.
                  </p>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="purge-logs-confirm">
                    Pour confirmer, saisissez &quot;PURGER&quot; :
                  </Label>
                  <Input
                    id="purge-logs-confirm"
                    value={purgeLogsConfirmText}
                    onChange={(e) => setPurgeLogsConfirmText(e.target.value)}
                    placeholder="PURGER"
                    className="font-mono"
                  />
                </div>
              </div>
            </div>
            <DialogFooter>
              <Button
                variant="outline"
                onClick={() => {
                  setPurgeLogsDialogOpen(false)
                  setPurgeLogsConfirmText("")
                }}
              >
                Annuler
              </Button>
              <Button
                variant="destructive"
                onClick={handlePurgeLogs}
                disabled={purgingLogs || purgeLogsConfirmText !== "PURGER"}
                className="gap-2"
              >
                <Trash2 className="h-4 w-4" />
                {purgingLogs ? "Suppression..." : "Purger tous les logs"}
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>

        {/* Dialog de confirmation de purge */}
        <Dialog open={purgeDialogOpen} onOpenChange={setPurgeDialogOpen}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle className="flex items-center gap-2">
                <AlertTriangle className="h-5 w-5 text-destructive" />
                Purger toutes les sauvegardes
              </DialogTitle>
              <DialogDescription>
                Cette action est irréversible. Toutes les sauvegardes seront définitivement supprimées.
              </DialogDescription>
            </DialogHeader>
            <div className="py-4">
              <div className="space-y-4">
                <div className="p-3 bg-destructive/10 rounded border border-destructive/20">
                  <p className="text-sm font-medium text-destructive">
                    Attention : Cette action supprimera définitivement toutes les sauvegardes.
                  </p>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="purge-confirm">
                    Pour confirmer, saisissez &quot;PURGER&quot; :
                  </Label>
                  <Input
                    id="purge-confirm"
                    value={purgeConfirmText}
                    onChange={(e) => setPurgeConfirmText(e.target.value)}
                    placeholder="PURGER"
                    className="font-mono"
                  />
                </div>
              </div>
            </div>
            <DialogFooter>
              <Button
                variant="outline"
                onClick={() => {
                  setPurgeDialogOpen(false)
                  setPurgeConfirmText("")
                }}
              >
                Annuler
              </Button>
              <Button
                variant="destructive"
                onClick={handlePurgeAll}
                disabled={purging || purgeConfirmText !== "PURGER"}
                className="gap-2"
              >
                <Trash2 className="h-4 w-4" />
                {purging ? "Suppression..." : "Purger toutes les sauvegardes"}
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>

        {/* Dialog de confirmation de restauration */}
        <Dialog open={restoreDialogOpen} onOpenChange={setRestoreDialogOpen}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle className="flex items-center gap-2">
                <AlertTriangle className="h-5 w-5 text-destructive" />
                Confirmer la restauration
              </DialogTitle>
              <DialogDescription>
                Cette action est irréversible. La base de données actuelle sera
                complètement remplacée par la sauvegarde sélectionnée.
              </DialogDescription>
            </DialogHeader>
            {selectedBackup && (
              <div className="py-4">
                <div className="space-y-2">
                  <div>
                    <span className="font-medium">Fichier :</span> {selectedBackup.filename}
                  </div>
                  <div>
                    <span className="font-medium">Date :</span>{" "}
                    {new Date(selectedBackup.date).toLocaleString("fr-FR", {
                      day: "2-digit",
                      month: "2-digit",
                      year: "numeric",
                      hour: "2-digit",
                      minute: "2-digit",
                    })}
                  </div>
                  <div>
                    <span className="font-medium">Taille :</span> {selectedBackup.sizeFormatted}
                  </div>
                </div>
                <div className="mt-4 p-3 bg-yellow-50 dark:bg-yellow-900/20 rounded border border-yellow-200 dark:border-yellow-800">
                  <p className="text-sm">
                    <strong>Note :</strong> Une sauvegarde de la base de données actuelle sera
                    créée automatiquement avant la restauration.
                  </p>
                </div>
              </div>
            )}
            <DialogFooter>
              <Button
                variant="outline"
                onClick={() => {
                  setRestoreDialogOpen(false)
                  setSelectedBackup(null)
                }}
              >
                Annuler
              </Button>
              <Button
                variant="destructive"
                onClick={handleRestore}
                disabled={restoring}
                className="gap-2"
              >
                <RotateCcw className="h-4 w-4" />
                {restoring ? "Restauration..." : "Confirmer la restauration"}
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>

        {/* Dialog Créer/Modifier utilisateur */}
        <Dialog open={isUserDialogOpen} onOpenChange={setIsUserDialogOpen}>
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
                  value={userFormData.login}
                  onChange={(e) =>
                    setUserFormData({ ...userFormData, login: e.target.value })
                  }
                  placeholder="Login"
                  required
                  disabled={selectedUser?.login === "Admin"}
                  title={selectedUser?.login === "Admin" ? "Le login du compte Admin ne peut pas être modifié" : undefined}
                />
              </div>
              <div className="space-y-2">
                <Label>Mot de passe {selectedUser ? "(laisser vide pour ne pas modifier)" : "*"}</Label>
                <Input
                  type="password"
                  value={userFormData.password}
                  onChange={(e) =>
                    setUserFormData({ ...userFormData, password: e.target.value })
                  }
                  placeholder="Mot de passe"
                  required={!selectedUser}
                />
              </div>
              <div className="space-y-2">
                <Label>Rôle *</Label>
                <Select
                  value={userFormData.role}
                  onValueChange={(value) =>
                    setUserFormData({ ...userFormData, role: value })
                  }
                  disabled={selectedUser?.login === "Admin"}
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
                  checked={userFormData.active}
                  onCheckedChange={(checked) =>
                    setUserFormData({ ...userFormData, active: checked })
                  }
                  disabled={selectedUser?.login === "Admin"}
                  title={selectedUser?.login === "Admin" ? "Le compte Admin ne peut pas être désactivé" : undefined}
                />
              </div>
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setIsUserDialogOpen(false)}>
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
  )
}

export default function ParametresPage() {
  return (
    <Suspense fallback={
      <div className="p-3 sm:p-6">
        <div className="flex justify-between items-center mb-4 sm:mb-6">
          <h1 className="text-xl sm:text-2xl font-bold">Paramètres</h1>
        </div>
        <div>Chargement...</div>
      </div>
    }>
      <ParametresPageContent />
    </Suspense>
  )
}

