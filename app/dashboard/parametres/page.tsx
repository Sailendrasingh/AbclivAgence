"use client"

import { useState, useEffect, Suspense } from "react"
import { useSearchParams, useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { cn } from "@/lib/utils"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Save, Plus, RotateCcw, HardDrive, AlertTriangle, Trash2, Download, Edit, Shield, ShieldOff, Sliders, Users, FileText, Search, CheckSquare, Square, CheckCircle2, XCircle, Activity, Clock, TrendingUp, Image as ImageIcon } from "lucide-react"
import Image from "next/image"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Switch } from "@/components/ui/switch"
import { apiFetch } from "@/lib/api-client"
import { fetchCSRFToken } from "@/lib/csrf-client"
import { Breadcrumb } from "@/components/ui/breadcrumb"

interface Backup {
  filename: string
  date: string
  size: number
  sizeFormatted: string
  integrity?: "valid" | "corrupted" | "unknown"
  integrityError?: string
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
  const [sessionTimeout, setSessionTimeout] = useState(1) // En minutes, défaut 1 minute
  const [maxImageSizeMB, setMaxImageSizeMB] = useState(5) // En Mo, défaut 5 Mo
  const [maxPhotosPerType, setMaxPhotosPerType] = useState(50) // Nombre max de photos par type, défaut 50
  const [maxPhotosPerTask, setMaxPhotosPerTask] = useState(5) // Nombre max de photos par tâche, défaut 5
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
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false)
  const [deletingBackup, setDeletingBackup] = useState(false)
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
  const [userPhotoFile, setUserPhotoFile] = useState<File | null>(null)
  const [userPhotoPreview, setUserPhotoPreview] = useState<string | null>(null)
  const [is2FADialogOpen, setIs2FADialogOpen] = useState(false)
  const [twoFactorData, setTwoFactorData] = useState<{
    secret?: string
    uri?: string
    qrCode?: string
  } | null>(null)
  const [twoFactorToken, setTwoFactorToken] = useState("")
  const [current2FAUserId, setCurrent2FAUserId] = useState<string | null>(null)

  // États pour les fichiers orphelins
  const [orphanedFiles, setOrphanedFiles] = useState<Array<{ path: string; size: number; sizeFormatted: string; modified: string }>>([])
  const [scanningOrphaned, setScanningOrphaned] = useState(false)
  const [deletingOrphaned, setDeletingOrphaned] = useState(false)
  const [selectedOrphanedFiles, setSelectedOrphanedFiles] = useState<Set<string>>(new Set())

  // États pour les images manquantes
  const [missingImages, setMissingImages] = useState<Array<{
    agencyName: string
    agencyId: string
    photoType: string
    photoLabel: string | null
    photoDate: string | null
    photoPath: string
  }>>([])
  const [scanningMissing, setScanningMissing] = useState(false)

  // États pour le monitoring
  const [monitoringAlerts, setMonitoringAlerts] = useState<Array<{
    id: string
    type: string
    severity: "low" | "medium" | "high" | "critical"
    title: string
    message: string
    details: any
    userId: string | null
    ipAddress: string | null
    createdAt: string
  }>>([])
  const [monitoringStats, setMonitoringStats] = useState<{
    alerts: {
      total: number
      unresolved: number
      critical: number
      high: number
      last24Hours: number
    }
    logs: {
      total: number
      last24Hours: number
      last7Days: number
      failedLogins: number
      sensitiveActions: number
    }
    users: {
      total: number
      active: number
      locked: number
      inactive?: number
    }
    sessions: {
      active: number
    }
    timestamp: string
  } | null>(null)
  const [loadingMonitoring, setLoadingMonitoring] = useState(false)
  const [selectedAlert, setSelectedAlert] = useState<any | null>(null)
  const [resolveDialogOpen, setResolveDialogOpen] = useState(false)

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await apiFetch("/api/auth/me")
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
        const response = await apiFetch("/api/settings")
        if (response.ok) {
          const data = await response.json()
          setSessionTimeout(data.sessionTimeout ?? 1)
          setMaxImageSizeMB(data.maxImageSizeMB || 5)
          setMaxPhotosPerType(data.maxPhotosPerType || 50)
          setMaxPhotosPerTask(data.maxPhotosPerTask || 5)
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
    } else if (activeTab === "monitoring") {
      loadMonitoringData()
      // Rafraîchir toutes les 30 secondes
      const interval = setInterval(loadMonitoringData, 30000)
      return () => clearInterval(interval)
    }
  }, [activeTab])

  const loadBackups = async () => {
    setLoadingBackups(true)
    try {
      const response = await apiFetch("/api/backups")
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
      const response = await apiFetch("/api/backups", {
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
      const response = await apiFetch(
        `/api/backups/${encodeURIComponent(selectedBackup.filename)}/restore`,
        {
          method: "POST",
        }
      )

      if (response.ok) {
        const result = await response.json()
        let msg = `Sauvegarde restaurée avec succès !\n\nUne sauvegarde de la base actuelle a été créée : ${result.backupCreatedBefore}\n\n`
        if (result.restartHint) msg += `${result.restartHint}`
        alert(msg)
        setRestoreDialogOpen(false)
        setSelectedBackup(null)
        if (result.restartScheduled) {
          setTimeout(() => window.location.reload(), 10000)
        } else {
          window.location.reload()
        }
      } else {
        const error = await response.json()
        // Afficher le message d'erreur principal et les détails si disponibles
        let errorMessage = error.error || "Erreur lors de la restauration"
        if (error.details) {
          errorMessage += `\n\nDétails: ${error.details}`
        }
        if (error.storedChecksum && error.calculatedChecksum) {
          errorMessage += `\n\nChecksum attendu: ${error.storedChecksum}`
          errorMessage += `\nChecksum calculé: ${error.calculatedChecksum}`
        }
        alert(errorMessage)
      }
    } catch (error) {
      console.error("Error restoring backup:", error)
      alert("Erreur lors de la restauration de la sauvegarde")
    } finally {
      setRestoring(false)
    }
  }

  const handleDeleteBackup = async () => {
    if (!selectedBackup) return

    setDeletingBackup(true)
    try {
      const response = await apiFetch(
        `/api/backups/${encodeURIComponent(selectedBackup.filename)}`,
        {
          method: "DELETE",
        }
      )

      if (response.ok) {
        const data = await response.json()
        setDeleteDialogOpen(false)
        setSelectedBackup(null)
        alert(data.message || "Sauvegarde supprimée avec succès")
        await loadBackups()
      } else {
        const error = await response.json()
        console.error("Erreur de suppression:", error)
        alert(error.error || "Erreur lors de la suppression de la sauvegarde")
      }
    } catch (error) {
      console.error("Error deleting backup:", error)
      alert("Erreur lors de la suppression de la sauvegarde")
    } finally {
      setDeletingBackup(false)
    }
  }

  const handlePurgeAll = async () => {
    if (purgeConfirmText !== "PURGER") {
      alert('Veuillez saisir "PURGER" pour confirmer')
      return
    }

    setPurging(true)
    try {
      const response = await apiFetch("/api/backups", {
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
      const response = await apiFetch("/api/logs")
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
      const response = await apiFetch("/api/logs/export")
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
      const response = await apiFetch("/api/logs", {
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
      const response = await apiFetch("/api/users")
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

  const loadMonitoringData = async () => {
    setLoadingMonitoring(true)
    try {
      // Charger les alertes avec les statistiques
      const alertsResponse = await apiFetch("/api/alerts?limit=50&stats=true")
      if (alertsResponse.ok) {
        const data = await alertsResponse.json()
        setMonitoringAlerts(data.alerts || [])
        if (data.stats) {
          // Charger les stats complètes
          const statsResponse = await apiFetch("/api/monitoring/stats")
          if (statsResponse.ok) {
            const statsData = await statsResponse.json()
            setMonitoringStats(statsData)
          }
        }
      }

      // Charger les statistiques si pas déjà chargées
      if (!monitoringStats) {
        const statsResponse = await apiFetch("/api/monitoring/stats")
        if (statsResponse.ok) {
          const statsData = await statsResponse.json()
          setMonitoringStats(statsData)
        }
      }
    } catch (error) {
      console.error("Error loading monitoring data:", error)
    } finally {
      setLoadingMonitoring(false)
    }
  }

  const handleResolveAlert = async () => {
    if (!selectedAlert) return

    try {
      const response = await apiFetch(`/api/alerts/${selectedAlert.id}/resolve`, {
        method: "POST",
      })

      if (response.ok) {
        setResolveDialogOpen(false)
        setSelectedAlert(null)
        await loadMonitoringData()
        alert("Alerte résolue avec succès")
      } else {
        const error = await response.json()
        alert(error.error || "Erreur lors de la résolution de l'alerte")
      }
    } catch (error) {
      console.error("Error resolving alert:", error)
      alert("Erreur lors de la résolution de l'alerte")
    }
  }

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case "critical":
        return "bg-red-500"
      case "high":
        return "bg-orange-500"
      case "medium":
        return "bg-yellow-500"
      case "low":
        return "bg-blue-500"
      default:
        return "bg-gray-500"
    }
  }

  const getSeverityBadge = (severity: string) => {
    switch (severity) {
      case "critical":
        return <Badge variant="destructive">Critique</Badge>
      case "high":
        return <Badge className="bg-orange-500">Élevée</Badge>
      case "medium":
        return <Badge className="bg-yellow-500">Moyenne</Badge>
      case "low":
        return <Badge className="bg-blue-500">Faible</Badge>
      default:
        return <Badge>Inconnue</Badge>
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
    setUserPhotoFile(null)
    setUserPhotoPreview(null)
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
    setUserPhotoFile(null)
    setUserPhotoPreview(user.photo || null)
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
      const response = await apiFetch(`/api/users/${userId}`, {
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
      const response = await apiFetch(`/api/users/${user.id}`, {
        method: "PUT",
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

        const response = await apiFetch(`/api/users/${selectedUser.id}`, {
          method: "PUT",
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
          // Afficher le message d'erreur principal et les détails si disponibles
          let errorMessage = error.error || "Erreur lors de la sauvegarde"
          if (error.details && Array.isArray(error.details) && error.details.length > 0) {
            const detailsMessages = error.details
              .filter((d: any) => d.message && !errorMessage.includes(d.message))
              .map((d: any) => d.message)
            if (detailsMessages.length > 0) {
              errorMessage += "\n\n" + detailsMessages.join("\n")
            }
          }
          alert(errorMessage)
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

      const response = await apiFetch(url, {
        method,
        body: JSON.stringify(body),
      })

      if (response.ok) {
        const savedUser = await response.json()
        const userId = selectedUser ? selectedUser.id : savedUser.id

        // Uploader la photo si un fichier est sélectionné
        if (userPhotoFile) {
          const photoFormData = new FormData()
          photoFormData.append("file", userPhotoFile)

          const photoResponse = await apiFetch(`/api/users/${userId}/photo`, {
            method: "POST",
            body: photoFormData,
          })

          if (!photoResponse.ok) {
            const error = await photoResponse.json()
            alert(error.error || "Erreur lors de l'upload de la photo")
          }
        }

        await loadUsers()
        setIsUserDialogOpen(false)
        setSelectedUser(null)
        setUserFormData({
          login: "",
          password: "",
          role: "User",
          active: true,
        })
        setUserPhotoFile(null)
        setUserPhotoPreview(null)
      } else {
        const error = await response.json()
        // Afficher le message d'erreur principal et les détails si disponibles
        let errorMessage = error.error || "Erreur lors de la sauvegarde"
        if (error.details && Array.isArray(error.details) && error.details.length > 0) {
          // Si le message principal ne contient pas déjà tous les détails, les ajouter
          const detailsMessages = error.details
            .filter((d: any) => d.message && !errorMessage.includes(d.message))
            .map((d: any) => d.message)
          if (detailsMessages.length > 0) {
            errorMessage += "\n\n" + detailsMessages.join("\n")
          }
        }
        alert(errorMessage)
      }
    } catch (error) {
      console.error("Error saving user:", error)
      alert("Erreur lors de la sauvegarde")
    }
  }

  const handlePhotoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      // Vérifier la taille (1 MB max)
      if (file.size > 1 * 1024 * 1024) {
        alert("La photo ne doit pas dépasser 1 MB")
        return
      }

      // Vérifier le type
      if (!file.type.startsWith("image/")) {
        alert("Le fichier doit être une image")
        return
      }

      setUserPhotoFile(file)

      // Créer une preview
      const reader = new FileReader()
      reader.onloadend = () => {
        setUserPhotoPreview(reader.result as string)
      }
      reader.readAsDataURL(file)
    }
  }

  const handleSetup2FA = async (userId: string) => {
    try {
      const response = await apiFetch(`/api/users/${userId}/2fa`, {
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
      const verifyResponse = await apiFetch("/api/auth/verify-2fa", {
        method: "POST",
        body: JSON.stringify({
          userId: current2FAUserId,
          token: twoFactorToken,
        }),
      })

      if (!verifyResponse.ok) {
        alert("Code de vérification incorrect")
        return
      }

      const response = await apiFetch(`/api/users/${current2FAUserId}/2fa`, {
        method: "PUT",
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
      const response = await apiFetch(`/api/users/${userId}/2fa`, {
        method: "PUT",
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

  const handleScanOrphanedFiles = async () => {
    setScanningOrphaned(true)
    setOrphanedFiles([])
    setSelectedOrphanedFiles(new Set())
    try {
      const response = await apiFetch("/api/files/orphaned")
      if (response.ok) {
        const data = await response.json()
        setOrphanedFiles(data.orphanedFiles || [])
      } else {
        const error = await response.json()
        alert(error.error || "Erreur lors du scan des fichiers orphelins")
      }
    } catch (error) {
      console.error("Error scanning orphaned files:", error)
      alert("Erreur lors du scan des fichiers orphelins")
    } finally {
      setScanningOrphaned(false)
    }
  }

  const handleDeleteOrphanedFiles = async () => {
    if (selectedOrphanedFiles.size === 0) {
      alert("Veuillez sélectionner au moins un fichier à supprimer")
      return
    }

    if (!confirm(`Êtes-vous sûr de vouloir supprimer ${selectedOrphanedFiles.size} fichier(s) orphelin(s) ? Cette action est irréversible.`)) {
      return
    }

    setDeletingOrphaned(true)
    try {
      const response = await apiFetch("/api/files/orphaned", {
        method: "DELETE",
        body: JSON.stringify({
          paths: Array.from(selectedOrphanedFiles),
        }),
      })

      if (response.ok) {
        const data = await response.json()
        alert(`${data.deletedCount} fichier(s) supprimé(s) avec succès`)
        // Re-scanner pour mettre à jour la liste
        await handleScanOrphanedFiles()
        setSelectedOrphanedFiles(new Set())
      } else {
        const error = await response.json()
        alert(error.error || "Erreur lors de la suppression des fichiers")
      }
    } catch (error) {
      console.error("Error deleting orphaned files:", error)
      alert("Erreur lors de la suppression des fichiers")
    } finally {
      setDeletingOrphaned(false)
    }
  }

  const toggleOrphanedFileSelection = (path: string) => {
    const newSelection = new Set(selectedOrphanedFiles)
    if (newSelection.has(path)) {
      newSelection.delete(path)
    } else {
      newSelection.add(path)
    }
    setSelectedOrphanedFiles(newSelection)
  }

  const handleScanMissingImages = async () => {
    setScanningMissing(true)
    setMissingImages([])
    try {
      const response = await apiFetch("/api/files/missing")
      if (response.ok) {
        const data = await response.json()
        setMissingImages(data.missingImages || [])
        if (data.count === 0) {
          alert("Aucune image manquante trouvée")
        }
      } else {
        const error = await response.json()
        alert(error.error || "Erreur lors du scan")
      }
    } catch (error) {
      console.error("Error scanning missing images:", error)
      alert("Erreur lors du scan des images manquantes")
    } finally {
      setScanningMissing(false)
    }
  }

  const selectAllOrphanedFiles = () => {
    if (selectedOrphanedFiles.size === orphanedFiles.length) {
      setSelectedOrphanedFiles(new Set())
    } else {
      setSelectedOrphanedFiles(new Set(orphanedFiles.map((f) => f.path)))
    }
  }

  const handleSave = async () => {
    if (sessionTimeout < 1) {
      alert("La durée de session doit être d'au moins 1 minute")
      return
    }

    if (maxImageSizeMB < 1 || maxImageSizeMB > 100) {
      alert("La taille maximale des images doit être entre 1 et 100 Mo")
      return
    }

    if (maxPhotosPerType < 1 || maxPhotosPerType > 1000) {
      alert("Le nombre maximum de photos par type doit être entre 1 et 1000")
      return
    }

    if (maxPhotosPerTask < 1 || maxPhotosPerTask > 100) {
      alert("Le nombre maximum de photos par tâche doit être entre 1 et 100")
      return
    }

    setSaving(true)
    try {
      const response = await apiFetch("/api/settings", {
        method: "PUT",
        body: JSON.stringify({
          sessionTimeout: Number(sessionTimeout), // S'assurer que c'est un nombre
          maxImageSizeMB: Number(maxImageSizeMB), // S'assurer que c'est un nombre
          maxPhotosPerType: Number(maxPhotosPerType), // S'assurer que c'est un nombre
          maxPhotosPerTask: Number(maxPhotosPerTask), // S'assurer que c'est un nombre
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

  // Fonctions utilitaires pour les avatars
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

  const tabLabels: Record<string, string> = {
    general: "Général",
    utilisateurs: "Utilisateurs",
    sauvegardes: "Sauvegardes",
    logs: "Logs",
    monitoring: "Monitoring",
  }

  return (
    <div className="p-3 sm:p-6 w-full max-w-full min-w-0 overflow-x-hidden">
      <Breadcrumb
        items={[
          { label: "Tableau de bord", href: "/dashboard" },
          { label: "Paramètres", href: "/dashboard/parametres" },
          { label: tabLabels[activeTab] || activeTab },
        ]}
      />
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-4 sm:mb-6 mt-2">
        <h1 className="text-xl sm:text-2xl font-bold">Paramètres</h1>
        <div className="flex flex-wrap gap-1 p-1 rounded-lg bg-muted">
          {[
            { value: "general", label: "Général", icon: Sliders },
            { value: "utilisateurs", label: "Utilisateurs", icon: Users },
            { value: "sauvegardes", label: "Sauvegardes", icon: HardDrive },
            { value: "logs", label: "Logs", icon: FileText },
            { value: "monitoring", label: "Monitoring", icon: Activity },
          ].map((item) => {
            const Icon = item.icon
            const isActive = activeTab === item.value
            return (
              <button
                key={item.value}
                onClick={() => {
                  setActiveTab(item.value)
                  router.push(`/dashboard/parametres?tab=${item.value}`)
                }}
                className={cn(
                  "flex items-center gap-2 px-3 py-2 rounded-md text-sm font-medium transition-all min-h-[44px] sm:min-h-0",
                  isActive
                    ? "bg-background text-foreground shadow-sm"
                    : "text-muted-foreground hover:text-foreground hover:bg-background/50"
                )}
              >
                <Icon className="h-4 w-4 shrink-0" />
                <span>{item.label}</span>
              </button>
            )
          })}
        </div>
      </div>

      <div className="mt-4">

          {activeTab === "general" && (
            loading ? (
              <div className="flex items-center justify-center py-12 text-muted-foreground">Chargement...</div>
            ) : (
              <div className="space-y-6">
                {/* Carte Session & Sécurité */}
                <Card className="border-l-[3px] border-l-blue-500">
                  <CardHeader className="pb-3">
                    <CardTitle className="flex items-center gap-2 text-base">
                      <div className="h-8 w-8 rounded-lg bg-blue-500/10 flex items-center justify-center">
                        <Shield className="h-4 w-4 text-blue-500" />
                      </div>
                      Session &amp; Sécurité
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
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
                  </CardContent>
                </Card>

                {/* Carte Médias & Uploads */}
                <Card className="border-l-[3px] border-l-emerald-500">
                  <CardHeader className="pb-3">
                    <CardTitle className="flex items-center gap-2 text-base">
                      <div className="h-8 w-8 rounded-lg bg-emerald-500/10 flex items-center justify-center">
                        <ImageIcon className="h-4 w-4 text-emerald-500" />
                      </div>
                      Médias &amp; Uploads
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="grid sm:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="max-image-size">
                          Taille max images (Mo)
                        </Label>
                        <Input
                          id="max-image-size"
                          type="number"
                          min="1"
                          max="100"
                          value={maxImageSizeMB}
                          onChange={(e) => setMaxImageSizeMB(Number(e.target.value))}
                          placeholder="5"
                        />
                        <p className="text-sm text-muted-foreground">
                          Entre 1 et 100 Mo
                        </p>
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="max-photos-per-type">
                          Photos par type
                        </Label>
                        <Input
                          id="max-photos-per-type"
                          type="number"
                          min="1"
                          max="1000"
                          value={maxPhotosPerType}
                          onChange={(e) => setMaxPhotosPerType(Number(e.target.value))}
                          placeholder="50"
                        />
                        <p className="text-sm text-muted-foreground">
                          Entre 1 et 1000
                        </p>
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="max-photos-per-task">
                          Photos par tâche
                        </Label>
                        <Input
                          id="max-photos-per-task"
                          type="number"
                          min="1"
                          max="100"
                          value={maxPhotosPerTask}
                          onChange={(e) => setMaxPhotosPerTask(Number(e.target.value))}
                          placeholder="5"
                        />
                        <p className="text-sm text-muted-foreground">
                          Entre 1 et 100
                        </p>
                      </div>
                    </div>
                    <div className="mt-4 flex justify-end">
                      <Button onClick={handleSave} disabled={saving} className="gap-2">
                        <Save className="h-4 w-4" />
                        {saving ? "Enregistrement..." : "Enregistrer"}
                      </Button>
                    </div>
                  </CardContent>
                </Card>

                {/* Carte Maintenance & Nettoyage */}
                {userRole === "Super Admin" && (
                  <Card className="border-l-[3px] border-l-amber-500">
                    <CardHeader className="pb-3">
                      <CardTitle className="flex items-center gap-2 text-base">
                        <div className="h-8 w-8 rounded-lg bg-amber-500/10 flex items-center justify-center">
                          <FileText className="h-4 w-4 text-amber-500" />
                        </div>
                        Maintenance &amp; Nettoyage
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-6">
                      <div>
                        <h4 className="text-sm font-medium mb-2">Fichiers orphelins</h4>
                        <p className="text-sm text-muted-foreground mb-2">
                          Scanne le dossier uploads pour trouver les images non référencées.
                        </p>
                        <Button
                          onClick={handleScanOrphanedFiles}
                          disabled={scanningOrphaned}
                          className="gap-2"
                          variant="outline"
                        >
                          <Search className="h-4 w-4" />
                          {scanningOrphaned ? "Scan en cours..." : "Scanner les fichiers orphelins"}
                        </Button>

                        {orphanedFiles.length > 0 && (
                          <div className="space-y-4">
                            <div className="flex items-center justify-between">
                              <p className="text-sm font-medium">
                                {orphanedFiles.length} fichier(s) orphelin(s) trouvé(s)
                              </p>
                              <div className="flex gap-2">
                                <Button
                                  onClick={selectAllOrphanedFiles}
                                  variant="outline"
                                  size="sm"
                                  className="gap-2"
                                >
                                  {selectedOrphanedFiles.size === orphanedFiles.length ? (
                                    <>
                                      <CheckSquare className="h-4 w-4" />
                                      Tout désélectionner
                                    </>
                                  ) : (
                                    <>
                                      <Square className="h-4 w-4" />
                                      Tout sélectionner
                                    </>
                                  )}
                                </Button>
                                <Button
                                  onClick={handleDeleteOrphanedFiles}
                                  disabled={deletingOrphaned || selectedOrphanedFiles.size === 0}
                                  variant="destructive"
                                  size="sm"
                                  className="gap-2"
                                >
                                  <Trash2 className="h-4 w-4" />
                                  {deletingOrphaned
                                    ? "Suppression..."
                                    : `Supprimer (${selectedOrphanedFiles.size})`}
                                </Button>
                              </div>
                            </div>

                            <div className="border rounded-lg max-h-96 overflow-y-auto">
                              <div className="divide-y">
                                {orphanedFiles.map((file) => (
                                  <div
                                    key={file.path}
                                    className="p-3 hover:bg-muted/50 flex items-center gap-3"
                                  >
                                    <button
                                      onClick={() => toggleOrphanedFileSelection(file.path)}
                                      className="shrink-0"
                                    >
                                      {selectedOrphanedFiles.has(file.path) ? (
                                        <CheckSquare className="h-5 w-5 text-primary" />
                                      ) : (
                                        <Square className="h-5 w-5 text-muted-foreground" />
                                      )}
                                    </button>
                                    <div className="flex-1 min-w-0">
                                      <p className="text-sm font-medium truncate">{file.path}</p>
                                      <div className="flex gap-4 text-xs text-muted-foreground mt-1">
                                        <span>{file.sizeFormatted}</span>
                                        <span>
                                          {new Date(file.modified).toLocaleDateString("fr-FR", {
                                            year: "numeric",
                                            month: "short",
                                            day: "numeric",
                                            hour: "2-digit",
                                            minute: "2-digit",
                                          })}
                                        </span>
                                      </div>
                                    </div>
                                  </div>
                                ))}
                              </div>
                            </div>
                          </div>
                        )}

                        {orphanedFiles.length === 0 && !scanningOrphaned && (
                          <p className="text-sm text-muted-foreground text-center py-4">
                            Aucun fichier orphelin trouvé. Cliquez sur &quot;Scanner les fichiers orphelins&quot; pour lancer une recherche.
                          </p>
                        )}
                      </div>

                      <div className="border-t pt-4">
                        <h4 className="text-sm font-medium mb-2">Images manquantes</h4>
                        <p className="text-sm text-muted-foreground mb-2">
                          Scanne les images référencées pour trouver celles manquantes physiquement.
                        </p>
                        <Button
                          onClick={handleScanMissingImages}
                          disabled={scanningMissing}
                          className="gap-2"
                          variant="outline"
                        >
                          <Search className="h-4 w-4" />
                          {scanningMissing ? "Scan en cours..." : "Rechercher les images manquantes"}
                        </Button>

                        {missingImages.length > 0 && (
                          <div className="space-y-4">
                            <p className="text-sm font-medium">
                              {missingImages.length} image(s) manquante(s) trouvée(s)
                            </p>
                            <div className="border rounded-lg divide-y overflow-x-auto overflow-y-hidden">
                              <div className="grid grid-cols-5 gap-4 p-3 bg-muted/50 font-medium text-sm min-w-[500px]">
                                <div>Agence</div>
                                <div>Type de photo</div>
                                <div>Libellé</div>
                                <div>Date physique</div>
                                <div>Nom physique</div>
                              </div>
                              {missingImages.map((image, index) => (
                                <div
                                  key={`${image.agencyId}-${image.photoPath}-${index}`}
                                  className="grid grid-cols-5 gap-4 p-3 hover:bg-muted/50 text-sm min-w-[800px]"
                                >
                                  <div className="font-medium">{image.agencyName}</div>
                                  <div>{image.photoType}</div>
                                  <div className="text-muted-foreground">
                                    {image.photoLabel || "-"}
                                  </div>
                                  <div className="text-muted-foreground">
                                    {image.photoDate
                                      ? new Date(image.photoDate).toLocaleDateString("fr-FR", {
                                        year: "numeric",
                                        month: "2-digit",
                                        day: "2-digit",
                                      })
                                      : "-"}
                                  </div>
                                  <div className="text-muted-foreground font-mono text-xs break-all">
                                    {image.photoPath}
                                  </div>
                                </div>
                              ))}
                            </div>
                          </div>
                        )}

                        {missingImages.length === 0 && !scanningMissing && (
                          <p className="text-sm text-muted-foreground text-center py-4">
                            Aucune image manquante trouvée. Cliquez sur &quot;Rechercher les images manquantes&quot; pour lancer une recherche.
                          </p>
                        )}
                      </div>
                    </CardContent>
                  </Card>
                )}
              </div>
            )
          )}

          {activeTab === "utilisateurs" && (
            <div className="space-y-4 pt-4">
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
                    users.map((user) => {
                      return (
                        <Card key={user.id}>
                          <CardHeader>
                            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 sm:gap-0">
                              <div className="flex-1 flex items-center gap-3">
                                {user.photo ? (
                                  <Image
                                    src={user.photo}
                                    alt={user.login}
                                    width={40}
                                    height={40}
                                    className="rounded-full shrink-0"
                                    unoptimized
                                  />
                                ) : (
                                  <div className={`w-10 h-10 rounded-full ${getAvatarColor(user.login)} text-white text-sm flex items-center justify-center font-semibold shrink-0`}>
                                    {getInitials(user.login)}
                                  </div>
                                )}
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
                            </div>
                          </CardHeader>
                        </Card>
                      )
                    })
                  )}
                </div>
              )}
            </div>
          )}

          {activeTab === "sauvegardes" && (
            <div className="space-y-4 pt-4">
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
                                <div className="font-medium break-words text-sm sm:text-base flex items-center gap-2">
                                  {backup.filename}
                                  {backup.integrity === "valid" && (
                                    <span title="Intégrité vérifiée">
                                      <CheckCircle2 className="h-4 w-4 text-green-500 shrink-0" />
                                    </span>
                                  )}
                                  {backup.integrity === "corrupted" && (
                                    <span title="Sauvegarde corrompue">
                                      <XCircle className="h-4 w-4 text-red-500 shrink-0" />
                                    </span>
                                  )}
                                  {backup.integrity === "unknown" && (
                                    <span title="Intégrité non vérifiée (sauvegarde ancienne)">
                                      <AlertTriangle className="h-4 w-4 text-yellow-500 shrink-0" />
                                    </span>
                                  )}
                                </div>
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
                                  {backup.integrity === "corrupted" && backup.integrityError && (
                                    <>
                                      <span className="hidden sm:inline"> • </span>
                                      <span className="text-red-500 break-words">Corrompue</span>
                                    </>
                                  )}
                                </div>
                              </div>
                            </div>
                            <div className="flex gap-2 w-full sm:w-auto">
                              <Button
                                variant="outline"
                                size="sm"
                                onClick={() => {
                                  setSelectedBackup(backup)
                                  setRestoreDialogOpen(true)
                                }}
                                disabled={backup.integrity === "corrupted"}
                                className="gap-2 flex-1 sm:flex-initial min-h-[44px]"
                                title={backup.integrity === "corrupted" ? "Impossible de restaurer une sauvegarde corrompue" : "Restaurer cette sauvegarde"}
                              >
                                <RotateCcw className="h-4 w-4" />
                                <span className="hidden sm:inline">Restaurer</span>
                              </Button>
                              <Button
                                variant="destructive"
                                size="sm"
                                onClick={() => {
                                  setSelectedBackup(backup)
                                  setDeleteDialogOpen(true)
                                }}
                                className="gap-2 flex-1 sm:flex-initial min-h-[44px]"
                                title="Supprimer cette sauvegarde"
                              >
                                <Trash2 className="h-4 w-4" />
                                <span className="hidden sm:inline">Supprimer</span>
                              </Button>
                            </div>
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
                      <p className="break-words">
                        • L'intégrité des sauvegardes est vérifiée avec des checksums SHA-256
                      </p>
                      <p className="break-words">
                        • Les sauvegardes corrompues ne peuvent pas être restaurées
                      </p>
                    </CardContent>
                  </Card>
                </div>
              )}
            </div>
          )}

          {activeTab === "logs" && (
            <div className="space-y-4 pt-4">
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
            </div>
          )}

          {activeTab === "monitoring" && (
            <div className="space-y-4 pt-4">
              <div className="flex items-center justify-between mb-4 sm:mb-6">
                <h2 className="text-lg sm:text-xl font-semibold">Monitoring de Sécurité</h2>
                <Button onClick={loadMonitoringData} variant="outline" disabled={loadingMonitoring}>
                  <Activity className="h-4 w-4 mr-2" />
                  Actualiser
                </Button>
              </div>

              {loadingMonitoring ? (
                <div>Chargement...</div>
              ) : (
                <>
                  {/* Statistiques */}
                  {monitoringStats && (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
                      <Card>
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                          <CardTitle className="text-sm font-medium">Alertes Non Résolues</CardTitle>
                          <AlertTriangle className="h-4 w-4 text-muted-foreground" />
                        </CardHeader>
                        <CardContent>
                          <div className="text-2xl font-bold">{monitoringStats.alerts.unresolved}</div>
                          <div className="flex gap-2 mt-2">
                            <Badge variant="destructive">{monitoringStats.alerts.critical} critiques</Badge>
                            <Badge className="bg-orange-500">{monitoringStats.alerts.high} élevées</Badge>
                          </div>
                        </CardContent>
                      </Card>

                      <Card>
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                          <CardTitle className="text-sm font-medium">Tentatives Échouées (24h)</CardTitle>
                          <Shield className="h-4 w-4 text-muted-foreground" />
                        </CardHeader>
                        <CardContent>
                          <div className="text-2xl font-bold">{monitoringStats.logs.failedLogins}</div>
                          <p className="text-xs text-muted-foreground mt-1">
                            {monitoringStats.logs.last24Hours} logs au total
                          </p>
                        </CardContent>
                      </Card>

                      <Card>
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                          <CardTitle className="text-sm font-medium">Utilisateurs Actifs</CardTitle>
                          <Users className="h-4 w-4 text-muted-foreground" />
                        </CardHeader>
                        <CardContent>
                          <div className="text-2xl font-bold">{monitoringStats.users.active}</div>
                          <p className="text-xs text-muted-foreground mt-1">
                            {monitoringStats.users.locked} verrouillés
                            {monitoringStats.users.inactive !== undefined && monitoringStats.users.inactive > 0 && (
                              <span className="ml-2">• {monitoringStats.users.inactive} désactivés</span>
                            )}
                          </p>
                        </CardContent>
                      </Card>

                      <Card>
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                          <CardTitle className="text-sm font-medium">Sessions Actives</CardTitle>
                          <Activity className="h-4 w-4 text-muted-foreground" />
                        </CardHeader>
                        <CardContent>
                          <div className="text-2xl font-bold">{monitoringStats.sessions.active}</div>
                          <p className="text-xs text-muted-foreground mt-1">
                            En cours
                          </p>
                        </CardContent>
                      </Card>
                    </div>
                  )}

                  {/* Liste des alertes */}
                  <Card>
                    <CardHeader>
                      <CardTitle>Alertes de Sécurité</CardTitle>
                    </CardHeader>
                    <CardContent>
                      {monitoringAlerts.length === 0 ? (
                        <div className="text-center py-8 text-muted-foreground">
                          <CheckCircle2 className="h-12 w-12 mx-auto mb-4 text-green-500" />
                          <p>Aucune alerte non résolue</p>
                        </div>
                      ) : (
                        <div className="space-y-4">
                          {monitoringAlerts.map((alert) => (
                            <div
                              key={alert.id}
                              className="border rounded-lg p-4 hover:bg-accent/50 transition-colors"
                            >
                              <div className="flex items-start justify-between">
                                <div className="flex-1">
                                  <div className="flex items-center gap-2 mb-2">
                                    <div className={`w-3 h-3 rounded-full ${getSeverityColor(alert.severity)}`} />
                                    {getSeverityBadge(alert.severity)}
                                    <span className="font-semibold">{alert.title}</span>
                                  </div>
                                  <p className="text-sm text-muted-foreground mb-2">{alert.message}</p>
                                  <div className="flex gap-4 text-xs text-muted-foreground">
                                    <span>
                                      <Clock className="h-3 w-3 inline mr-1" />
                                      {new Date(alert.createdAt).toLocaleString("fr-FR")}
                                    </span>
                                    {alert.ipAddress && (
                                      <span>IP: {alert.ipAddress}</span>
                                    )}
                                  </div>
                                </div>
                                <Button
                                  variant="outline"
                                  size="sm"
                                  onClick={() => {
                                    setSelectedAlert(alert)
                                    setResolveDialogOpen(true)
                                  }}
                                >
                                  Résoudre
                                </Button>
                              </div>
                            </div>
                          ))}
                        </div>
                      )}
                    </CardContent>
                  </Card>
                </>
              )}

              {/* Dialog de résolution */}
              <Dialog open={resolveDialogOpen} onOpenChange={setResolveDialogOpen}>
                <DialogContent>
                  <DialogTitle className="sr-only">Dialogue</DialogTitle>
                  <DialogHeader>
                    <DialogTitle>Résoudre l'alerte</DialogTitle>
                    <DialogDescription>
                      Êtes-vous sûr de vouloir marquer cette alerte comme résolue ?
                    </DialogDescription>
                  </DialogHeader>
                  {selectedAlert && (
                    <div className="space-y-2">
                      <p className="font-semibold">{selectedAlert.title}</p>
                      <p className="text-sm text-muted-foreground">{selectedAlert.message}</p>
                    </div>
                  )}
                  <DialogFooter>
                    <Button variant="outline" onClick={() => setResolveDialogOpen(false)}>
                      Annuler
                    </Button>
                    <Button onClick={handleResolveAlert}>
                      Résoudre
                    </Button>
                  </DialogFooter>
                </DialogContent>
              </Dialog>
            </div>
          )}
        </div>

      {/* Dialog de confirmation de purge des logs */}
      <Dialog open={purgeLogsDialogOpen} onOpenChange={setPurgeLogsDialogOpen}>
        <DialogContent>
          <DialogTitle className="sr-only">Dialogue</DialogTitle>
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
          <DialogTitle className="sr-only">Dialogue</DialogTitle>
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
          <DialogTitle className="sr-only">Dialogue</DialogTitle>
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

      {/* Dialog de confirmation de suppression d'une sauvegarde */}
      <Dialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
        <DialogContent>
          <DialogTitle className="sr-only">Dialogue</DialogTitle>
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <AlertTriangle className="h-5 w-5 text-destructive" />
              Supprimer la sauvegarde
            </DialogTitle>
            <DialogDescription>
              Cette action est irréversible. La sauvegarde sera définitivement supprimée.
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
            </div>
          )}
          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => {
                setDeleteDialogOpen(false)
                setSelectedBackup(null)
              }}
            >
              Annuler
            </Button>
            <Button
              variant="destructive"
              onClick={handleDeleteBackup}
              disabled={deletingBackup}
              className="gap-2"
            >
              <Trash2 className="h-4 w-4" />
              {deletingBackup ? "Suppression..." : "Confirmer la suppression"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Dialog Créer/Modifier utilisateur */}
      <Dialog open={isUserDialogOpen} onOpenChange={setIsUserDialogOpen}>
        <DialogContent>
          <DialogTitle className="sr-only">Dialogue</DialogTitle>
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
                  setUserFormData((prev) => ({ ...prev, login: e.target.value }))
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
                  setUserFormData((prev) => ({ ...prev, password: e.target.value }))
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
                  setUserFormData((prev) => ({ ...prev, role: value }))
                }
                disabled={selectedUser?.login === "Admin"}
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="User">User</SelectItem>
                  <SelectItem value="Super user">Super user</SelectItem>
                  <SelectItem value="Super Admin">Super Admin</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="flex items-center justify-between">
              <Label>Actif</Label>
              <Switch
                checked={userFormData.active}
                onCheckedChange={(checked) =>
                  setUserFormData((prev) => ({ ...prev, active: checked }))
                }
                disabled={selectedUser?.login === "Admin"}
                title={selectedUser?.login === "Admin" ? "Le compte Admin ne peut pas être désactivé" : undefined}
              />
            </div>
            {selectedUser && (
              <div className="space-y-2">
                <Label>Photo de profil</Label>
                <div className="flex items-center gap-4">
                  {userPhotoPreview ? (
                    <Image
                      src={userPhotoPreview}
                      alt="Preview"
                      width={100}
                      height={100}
                      className="rounded-full object-cover"
                      unoptimized
                    />
                  ) : selectedUser.photo ? (
                    <Image
                      src={selectedUser.photo}
                      alt="Photo actuelle"
                      width={100}
                      height={100}
                      className="rounded-full object-cover"
                      unoptimized
                    />
                  ) : (
                    <div className={`w-[100px] h-[100px] rounded-full ${getAvatarColor(selectedUser.login)} text-white text-2xl flex items-center justify-center font-semibold`}>
                      {getInitials(selectedUser.login)}
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
                    {selectedUser.photo && (
                      <Button
                        type="button"
                        variant="outline"
                        size="sm"
                        onClick={async () => {
                          if (!confirm("Êtes-vous sûr de vouloir supprimer la photo de profil ?")) {
                            return
                          }
                          try {
                            const response = await apiFetch(`/api/users/${selectedUser.id}/photo`, {
                              method: "DELETE",
                            })
                            if (response.ok) {
                              setUserPhotoPreview(null)
                              await loadUsers()
                            } else {
                              const error = await response.json()
                              alert(error.error || "Erreur lors de la suppression")
                            }
                          } catch (error) {
                            console.error("Error deleting photo:", error)
                            alert("Erreur lors de la suppression")
                          }
                        }}
                        className="w-full"
                      >
                        <Trash2 className="h-4 w-4 mr-2" />
                        Supprimer la photo
                      </Button>
                    )}
                  </div>
                </div>
              </div>
            )}
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
          <DialogTitle className="sr-only">Dialogue</DialogTitle>
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

