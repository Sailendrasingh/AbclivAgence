"use client"

import React, { useState, useEffect, useRef, useCallback, useMemo, startTransition } from "react"
import Image from "next/image"
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
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Plus, Save, MapPin, Mail, Phone, User, Settings, Camera, Edit, Trash2, X, ChevronLeft, ChevronRight, Eye, EyeOff, Clock, ChevronUp, ChevronDown, ArrowLeft, GripVertical, FileText, CheckCircle, ListTodo, Users, CheckSquare, Monitor, Printer, Wifi, Video, AlertCircle } from "lucide-react"
import { Search } from "lucide-react"
import { AddressSection } from "@/components/agences/AddressSection"
import { apiFetch } from "@/lib/api-client"
import { fetchCSRFToken, setCSRFToken } from "@/lib/csrf-client"
import { EmptyState } from "@/components/ui/empty-state"
import { Skeleton } from "@/components/ui/skeleton"
import { DashboardCockpit } from "@/components/ui/dashboard-cockpit"
import { ContactSection, Contact } from "@/components/agences/ContactSection"
import { TaskSection, Task } from "@/components/agences/TaskSection"
import { PhotoSection } from "@/components/agences/PhotoSection"
import { ConfirmDialog } from "@/components/ui/confirm-dialog"
import { useToast } from "@/lib/toast-context"

interface Agency {
  id: string
  name: string
  photo: string | null
  state: string
  codeAgence?: string | null
  codeRayon?: string | null
  dateOuverture?: string | null
  dateFermeture?: string | null
  addresses?: Address[]
  contacts?: Contact[]
  technical?: Technical
  photos?: PhotoGroup[]
}

interface Address {
  id: string
  label: string
  street: string
  city: string
  postalCode: string
  latitude?: number
  longitude?: number
}


interface Technical {
  id: string
  networkIp?: string
  machineBrand?: string
  machineModel?: string
  machineConnection?: string
  machineIp?: string
  machineMac?: string
  wifiRouterBrand?: string
  wifiRouterModel?: string
  wifiRouterIp?: string
  wifiRouterSerial?: string
  mainRouterBrand?: string
  mainRouterModel?: string
  mainRouterIp?: string
  mainRouterSerial?: string
  mainRouterLinkType?: string
  backupRouterBrand?: string
  backupRouterModel?: string
  backupRouterIp?: string
  backupRouterSerial?: string
  recorderBrand?: string
  recorderModel?: string
  recorderSerial?: string
  recorderMac?: string
  recorderIp?: string
  recorderStorage?: string
  technicalNotes?: string
  pcs?: PC[]
  printers?: Printer[]
  wifiAccessPoints?: WifiAccessPoint[]
  cameras?: Camera[]
  dynamicFields?: DynamicField[]
}

interface PC {
  id: string
  name: string
  ip?: string
  mac?: string
  serialNumber?: string
  brand?: string
  model?: string
  purchaseDate?: string
  warrantyDate?: string
  files?: string
  photos?: string
  order?: number
}

interface Printer {
  id: string
  name: string
  ip?: string
  mac?: string
  serialNumber?: string
  brand?: string
  model?: string
  purchaseDate?: string
  warrantyDate?: string
  files?: string
  photos?: string
}

interface WifiAccessPoint {
  id: string
  brand?: string
  model?: string
  ip?: string
  serialNumber?: string
  ssid?: string
  passwordEncrypted?: string
}

interface Camera {
  id: string
  brand?: string
  model?: string
  type?: string
  ip?: string
}

interface DynamicField {
  id: string
  key: string
  value: string
  order: number
}

interface PhotoGroup {
  id: string
  type: string
  title?: string
  photos: string
}

export default function AgencesPage() {
  const [agencies, setAgencies] = useState<Agency[]>([])
  const [selectedAgency, setSelectedAgency] = useState<Agency | null>(null)
  const selectedAgencyRef = useRef<Agency | null>(null)
  const [fullAgencyData, setFullAgencyData] = useState<Agency | null>(null)
  const [loading, setLoading] = useState(true)
  const [loadingDetails, setLoadingDetails] = useState(false)
  const [isMobile, setIsMobile] = useState(false)
  const [showDetailsOnMobile, setShowDetailsOnMobile] = useState(false)
  const [search, setSearch] = useState("")
  const [filter, setFilter] = useState<"ALL" | "OK" | "ALERTE" | "INFO" | "FERMÉE">("ALL")
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false)
  const [newAgencyName, setNewAgencyName] = useState("")
  const [creating, setCreating] = useState(false)
  const [saving, setSaving] = useState(false)
  const [editing, setEditing] = useState(false)
  const [editedName, setEditedName] = useState("")
  const [editedState, setEditedState] = useState<"OK" | "ALERTE" | "INFO" | "FERMÉE">("ALERTE")
  const [editedCodeAgence, setEditedCodeAgence] = useState("")
  const [editedCodeRayon, setEditedCodeRayon] = useState("")
  const [editedDateOuverture, setEditedDateOuverture] = useState("")
  const [editedDateFermeture, setEditedDateFermeture] = useState("")
  const [userRole, setUserRole] = useState<string | null>(null)
  const [maxImageSizeMB, setMaxImageSizeMB] = useState(5) // Taille maximale des images en Mo
  const [maxPhotosPerType, setMaxPhotosPerType] = useState(50) // Nombre max de photos par type
  const [maxPhotosPerTask, setMaxPhotosPerTask] = useState(5) // Nombre max de photos par tâche

  // États pour contacts
  // États pour photos
  const [selectedPhotoTypeTab, setSelectedPhotoTypeTab] = useState<string>("")

  // États pour l'édition du titre d'une photo individuelle

  // États pour la lightbox

  // États pour l'affichage des mots de passe Wifi
  const [visiblePasswords, setVisiblePasswords] = useState<Record<string, boolean>>({})
  const [decryptedPasswords, setDecryptedPasswords] = useState<Record<string, string>>({})

  // États pour technique
  const [editingTechnical, setEditingTechnical] = useState(false)
  const [technicalData, setTechnicalData] = useState<any>({})
  const [isPCDialogOpen, setIsPCDialogOpen] = useState(false)
  const [selectedPC, setSelectedPC] = useState<PC | null>(null)
  const [isPrinterDialogOpen, setIsPrinterDialogOpen] = useState(false)
  const [selectedPrinter, setSelectedPrinter] = useState<Printer | null>(null)
  const [isWifiAPDialogOpen, setIsWifiAPDialogOpen] = useState(false)
  const [selectedWifiAP, setSelectedWifiAP] = useState<WifiAccessPoint | null>(null)
  const [isCameraDialogOpen, setIsCameraDialogOpen] = useState(false)
  const [selectedCamera, setSelectedCamera] = useState<Camera | null>(null)
  const [isDynamicFieldDialogOpen, setIsDynamicFieldDialogOpen] = useState(false)
  const [selectedDynamicField, setSelectedDynamicField] = useState<DynamicField | null>(null)

  // État pour le redimensionnement
  const [masterWidth, setMasterWidth] = useState(33.33)
  const [isMounted, setIsMounted] = useState(false)
  const [isResizing, setIsResizing] = useState(false)
  const containerRef = useRef<HTMLDivElement>(null)
  const detailsScrollRef = useRef<HTMLDivElement>(null)
  const detailsHeaderRef = useRef<HTMLDivElement>(null)
  const detailsTabsRef = useRef<HTMLDivElement>(null)

  // État pour mémoriser l'onglet actif
  const [activeTab, setActiveTab] = useState<"general" | "tasks" | "technical" | "photos">("general")

  // États Dirty State
  const [pendingAgencyToSelect, setPendingAgencyToSelect] = useState<Agency | null>(null)
  const [showDirtyDialog, setShowDirtyDialog] = useState(false)

  // Modale de confirmation (suppressions) et toasts
  const { toast } = useToast()
  const [confirmState, setConfirmState] = useState<{
    open: boolean
    title: string
    description: string
    confirmLabel?: string
    variant?: "danger" | "default"
    onConfirm: () => void | Promise<void>
  }>({ open: false, title: "", description: "", onConfirm: () => { } })
  const [confirmLoading, setConfirmLoading] = useState(false)
  const openConfirm = useCallback(
    (opts: { title: string; description: string; confirmLabel?: string; variant?: "danger" | "default"; onConfirm: () => void | Promise<void> }) => {
      setConfirmState({ open: true, confirmLabel: "Supprimer", variant: "danger", ...opts })
    },
    []
  )
  const showError = useCallback((message: string) => {
    toast({ title: message, variant: "destructive" })
  }, [])

  // États pour l'historique des notes techniques
  const [isNotesHistoryDialogOpen, setIsNotesHistoryDialogOpen] = useState(false)
  const [notesHistory, setNotesHistory] = useState<Array<{
    id: string
    version: number
    notes: string | null
    createdAt: string
    user: { login: string }
  }>>([])
  const [loadingHistory, setLoadingHistory] = useState(false)
  const [latestTechnicalNotes, setLatestTechnicalNotes] = useState<string | null>(null)

  // États pour l'historique des agences
  const [isAgencyHistoryDialogOpen, setIsAgencyHistoryDialogOpen] = useState(false)
  const [agencyHistory, setAgencyHistory] = useState<Array<{
    id: string
    version: number
    data: string
    createdAt: string
    user: { login: string }
  }>>([])
  const [loadingAgencyHistory, setLoadingAgencyHistory] = useState(false)

  const loadAgencies = useCallback(async () => {
    if (!isMounted) return

    setLoading(true)
    try {
      const response = await fetch(
        `/api/agencies?search=${encodeURIComponent(search)}&filter=${filter}`,
        {
          credentials: 'include'
        }
      )

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`)
      }

      const data = await response.json()
      // Trier les agences par nom
      const sortedData = [...data].sort((a, b) => a.name.localeCompare(b.name, 'fr', { sensitivity: 'base' }))
      setAgencies((prevAgencies) => {
        // Préserver la sélection si l'agence existe toujours dans la nouvelle liste
        const currentSelectedId = selectedAgencyRef.current?.id
        if (currentSelectedId && sortedData.some(a => a.id === currentSelectedId)) {
          // L'agence sélectionnée existe toujours, on ne change rien
          return sortedData
        }
        // Si aucune agence n'est sélectionnée ou si l'agence sélectionnée n'existe plus, sélectionner la première
        if (sortedData.length > 0 && !currentSelectedId) {
          setSelectedAgency(sortedData[0])
        }
        return sortedData
      })
    } catch (error) {
      // Gestion silencieuse des erreurs réseau
      // Ne pas afficher d'erreur si c'est une erreur de connexion réseau
      if (error instanceof TypeError && error.message.includes('fetch')) {
        // En cas d'erreur, on garde les données existantes
        // Ne rien faire, les données actuelles restent affichées
      } else {
        // Pour les autres erreurs, on les log en mode développement uniquement
        if (process.env.NODE_ENV === 'development') {
          console.error("Error loading agencies:", error)
        }
      }
    } finally {
      setLoading(false)
    }
  }, [search, filter, isMounted])

  const loadAgenciesRef = useRef(loadAgencies)
  loadAgenciesRef.current = loadAgencies

  // Synchroniser la ref avec l'état selectedAgency
  useEffect(() => {
    selectedAgencyRef.current = selectedAgency
  }, [selectedAgency])

  // Récupération du rôle utilisateur et du token CSRF (prioritaire) — uniquement au montage
  useEffect(() => {
    if (!isMounted) return

    const fetchUserRole = async () => {
      try {
        const response = await apiFetch("/api/auth/me")
        if (response.ok) {
          const data = await response.json()
          setUserRole(data.role)
          if (data.csrfToken) {
            setCSRFToken(data.csrfToken)
          }
        }
      } catch (error) {
        console.error("Error fetching user role:", error)
      }
    }

    const loadSettings = async () => {
      try {
        const response = await apiFetch("/api/settings")
        if (response.ok) {
          const data = await response.json()
          setMaxImageSizeMB(data.maxImageSizeMB || 5)
          setMaxPhotosPerType(data.maxPhotosPerType || 50)
          setMaxPhotosPerTask(data.maxPhotosPerTask || 5)
        }
      } catch (error) {
        console.error("Error loading settings:", error)
      }
    }

    Promise.all([fetchUserRole(), loadSettings()]).then(() => {
      loadAgenciesRef.current()
    })
  }, [isMounted])

  // Marquer le composant comme monté et charger masterWidth depuis localStorage
  useEffect(() => {
    const saved = localStorage.getItem("masterWidth")
    if (saved) {
      const width = parseFloat(saved)
      if (!isNaN(width) && width >= 20 && width <= 60) {
        setMasterWidth(width)
      }
    }
    setIsMounted(true)
  }, [])

  // Détecter si on est sur mobile - après le montage pour éviter les différences d'hydratation
  useEffect(() => {
    if (!isMounted) return

    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768) // Breakpoint md de Tailwind
    }

    checkMobile()
    window.addEventListener("resize", checkMobile)
    return () => window.removeEventListener("resize", checkMobile)
  }, [isMounted])

  // Gestion du redimensionnement
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!isResizing || !containerRef.current) return

      const container = containerRef.current
      const rect = container.getBoundingClientRect()
      const containerWidth = rect.width
      const mouseX = e.clientX - rect.left
      const newWidth = (mouseX / containerWidth) * 100

      // Limites : entre 20% et 60%
      const clampedWidth = Math.max(20, Math.min(60, newWidth))
      setMasterWidth(clampedWidth)
      // Sauvegarder dans localStorage
      localStorage.setItem("masterWidth", clampedWidth.toString())
    }

    const handleMouseUp = () => {
      setIsResizing(false)
    }

    if (isResizing) {
      document.addEventListener("mousemove", handleMouseMove)
      document.addEventListener("mouseup", handleMouseUp)
      document.body.style.cursor = "col-resize"
      document.body.style.userSelect = "none"
    }

    return () => {
      document.removeEventListener("mousemove", handleMouseMove)
      document.removeEventListener("mouseup", handleMouseUp)
      document.body.style.cursor = ""
      document.body.style.userSelect = ""
    }
  }, [isResizing])

  useEffect(() => {
    // Debounce pour éviter trop d'appels API lors de la saisie
    const timeoutId = setTimeout(() => {
      loadAgencies()
    }, 300) // Attendre 300ms après la dernière frappe

    return () => clearTimeout(timeoutId)
  }, [search, filter, loadAgencies])

  useEffect(() => {
    if (selectedAgency) {
      // Sur mobile, charger les détails seulement si on affiche la vue détails
      if (isMobile && !showDetailsOnMobile) {
        return
      }
      loadAgencyDetails(selectedAgency.id)
    }
  }, [selectedAgency, isMobile, showDetailsOnMobile])

  // Initialiser les données d'édition après le chargement des détails en mode mobile
  useEffect(() => {
    if (isMobile && editing && fullAgencyData && selectedAgency?.id === fullAgencyData.id) {
      setEditingTechnical(true)
      if (fullAgencyData.technical) {
        const notesToUse = latestTechnicalNotes !== null ? latestTechnicalNotes : (fullAgencyData.technical.technicalNotes || "")
        setTechnicalData({
          networkIp: fullAgencyData.technical.networkIp || "",
          machineBrand: fullAgencyData.technical.machineBrand || "",
          machineModel: fullAgencyData.technical.machineModel || "",
          machineConnection: fullAgencyData.technical.machineConnection || "",
          machineIp: fullAgencyData.technical.machineIp || "",
          machineMac: fullAgencyData.technical.machineMac || "",
          wifiRouterBrand: fullAgencyData.technical.wifiRouterBrand || "",
          wifiRouterModel: fullAgencyData.technical.wifiRouterModel || "",
          wifiRouterIp: fullAgencyData.technical.wifiRouterIp || "",
          wifiRouterSerial: fullAgencyData.technical.wifiRouterSerial || "",
          mainRouterBrand: fullAgencyData.technical.mainRouterBrand || "",
          mainRouterModel: fullAgencyData.technical.mainRouterModel || "",
          mainRouterIp: fullAgencyData.technical.mainRouterIp || "",
          mainRouterSerial: fullAgencyData.technical.mainRouterSerial || "",
          mainRouterLinkType: fullAgencyData.technical.mainRouterLinkType || "",
          backupRouterBrand: fullAgencyData.technical.backupRouterBrand || "",
          backupRouterModel: fullAgencyData.technical.backupRouterModel || "",
          backupRouterIp: fullAgencyData.technical.backupRouterIp || "",
          backupRouterSerial: fullAgencyData.technical.backupRouterSerial || "",
          recorderBrand: fullAgencyData.technical.recorderBrand || "",
          recorderModel: fullAgencyData.technical.recorderModel || "",
          recorderSerial: fullAgencyData.technical.recorderSerial || "",
          recorderMac: fullAgencyData.technical.recorderMac || "",
          recorderIp: fullAgencyData.technical.recorderIp || "",
          recorderStorage: fullAgencyData.technical.recorderStorage || "",
          technicalNotes: notesToUse,
        })
      } else {
        setTechnicalData({})
      }
    }
  }, [isMobile, editing, fullAgencyData, selectedAgency, latestTechnicalNotes])

  // Initialiser l'onglet de type de photo sélectionné quand les photos changent
  useEffect(() => {
    if (fullAgencyData?.photos && fullAgencyData.photos.length > 0) {
      const photoTypes = [...new Set(fullAgencyData.photos.map(pg => pg.type))].sort()
      if (photoTypes.length > 0 && (!selectedPhotoTypeTab || !photoTypes.includes(selectedPhotoTypeTab))) {
        setSelectedPhotoTypeTab(photoTypes[0])
      }
    } else {
      setSelectedPhotoTypeTab("")
    }
  }, [fullAgencyData?.photos, selectedPhotoTypeTab])

  // Réinitialiser la recherche de photos uniquement lors du changement d'agence
  useEffect(() => {
  }, [selectedAgency?.id])

  // Initialiser les données techniques quand fullAgencyData change et que le mode édition est actif
  useEffect(() => {
    if (editing) {
      if (fullAgencyData?.technical) {
        // Utiliser latestTechnicalNotes si disponible, sinon utiliser technicalNotes de la base
        const notesToUse = latestTechnicalNotes !== null ? latestTechnicalNotes : (fullAgencyData.technical.technicalNotes || "")

        setTechnicalData({
          networkIp: fullAgencyData.technical.networkIp || "",
          machineBrand: fullAgencyData.technical.machineBrand || "",
          machineModel: fullAgencyData.technical.machineModel || "",
          machineConnection: fullAgencyData.technical.machineConnection || "",
          machineIp: fullAgencyData.technical.machineIp || "",
          machineMac: fullAgencyData.technical.machineMac || "",
          wifiRouterBrand: fullAgencyData.technical.wifiRouterBrand || "",
          wifiRouterModel: fullAgencyData.technical.wifiRouterModel || "",
          wifiRouterIp: fullAgencyData.technical.wifiRouterIp || "",
          wifiRouterSerial: fullAgencyData.technical.wifiRouterSerial || "",
          mainRouterBrand: fullAgencyData.technical.mainRouterBrand || "",
          mainRouterModel: fullAgencyData.technical.mainRouterModel || "",
          mainRouterIp: fullAgencyData.technical.mainRouterIp || "",
          mainRouterSerial: fullAgencyData.technical.mainRouterSerial || "",
          mainRouterLinkType: fullAgencyData.technical.mainRouterLinkType || "",
          backupRouterBrand: fullAgencyData.technical.backupRouterBrand || "",
          backupRouterModel: fullAgencyData.technical.backupRouterModel || "",
          backupRouterIp: fullAgencyData.technical.backupRouterIp || "",
          backupRouterSerial: fullAgencyData.technical.backupRouterSerial || "",
          recorderBrand: fullAgencyData.technical.recorderBrand || "",
          recorderModel: fullAgencyData.technical.recorderModel || "",
          recorderSerial: fullAgencyData.technical.recorderSerial || "",
          recorderMac: fullAgencyData.technical.recorderMac || "",
          recorderIp: fullAgencyData.technical.recorderIp || "",
          recorderStorage: fullAgencyData.technical.recorderStorage || "",
          technicalNotes: notesToUse,
        })
      } else {
        // Initialiser avec des valeurs vides si aucune donnée technique n'existe
        setTechnicalData({
          networkIp: "",
          machineBrand: "",
          machineModel: "",
          machineConnection: "",
          machineIp: "",
          machineMac: "",
          wifiRouterBrand: "",
          wifiRouterModel: "",
          wifiRouterIp: "",
          wifiRouterSerial: "",
          mainRouterBrand: "",
          mainRouterModel: "",
          mainRouterIp: "",
          mainRouterSerial: "",
          mainRouterLinkType: "",
          backupRouterBrand: "",
          backupRouterModel: "",
          backupRouterIp: "",
          backupRouterSerial: "",
          recorderBrand: "",
          recorderModel: "",
          recorderSerial: "",
          recorderMac: "",
          recorderIp: "",
          recorderStorage: "",
          technicalNotes: "",
        })
      }
      setEditingTechnical(true)
    } else if (!editing) {
      setEditingTechnical(false)
      setTechnicalData({})
    }
  }, [editing, fullAgencyData, latestTechnicalNotes])

  const loadAgencyDetails = useCallback(async (agencyId: string) => {
    // Ne pas réinitialiser fullAgencyData immédiatement pour garder l'ancien contenu visible
    setLoadingDetails(true)
    try {
      const response = await fetch(`/api/agencies/${agencyId}`)

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}))
        throw new Error(errorData.error || `HTTP error! status: ${response.status}`)
      }

      const data = await response.json()

      // S'assurer que les contacts ont un champ order (rétrocompatibilité)
      if (data.contacts && Array.isArray(data.contacts)) {
        data.contacts = data.contacts.map((contact: any, index: number) => ({
          ...contact,
          order: contact.order !== undefined ? contact.order : index
        }))
      }

      // S'assurer que les PC ont un champ order (rétrocompatibilité)
      if (data.technical?.pcs && Array.isArray(data.technical.pcs)) {
        data.technical.pcs = data.technical.pcs.map((pc: any, index: number) => ({
          ...pc,
          order: pc.order !== undefined ? pc.order : index
        }))
        console.log("[loadAgencyDetails] PCs chargés:", data.technical.pcs.map((p: any) => ({ id: p.id, name: p.name, order: p.order })))
      }

      // Petit délai pour permettre la transition visuelle
      await new Promise(resolve => setTimeout(resolve, 100))
      setFullAgencyData(data)
      setEditedName(data.name)

      setEditedState(data.state as "OK" | "ALERTE" | "INFO" | "FERMÉE")
      setEditedCodeAgence(data.codeAgence || "")
      setEditedCodeRayon(data.codeRayon || "")
      setEditedDateOuverture(data.dateOuverture ? new Date(data.dateOuverture).toISOString().split('T')[0] : "")
      setEditedDateFermeture(data.dateFermeture ? new Date(data.dateFermeture).toISOString().split('T')[0] : "")

      // Récupérer la dernière version de l'historique des notes techniques
      if (data.technical?.id) {
        try {
          const historyResponse = await fetch(`/api/technical/${data.technical.id}/history`)
          if (historyResponse.ok) {
            const history = await historyResponse.json()
            if (history.length > 0) {
              // La première entrée est la plus récente (triée par version desc)
              setLatestTechnicalNotes(history[0].notes)
            } else {
              // Pas d'historique, utiliser la valeur de la base
              setLatestTechnicalNotes(data.technical.technicalNotes)
            }
          } else {
            // En cas d'erreur, utiliser la valeur de la base
            setLatestTechnicalNotes(data.technical.technicalNotes)
          }
        } catch (error) {
          // En cas d'erreur, utiliser la valeur de la base
          setLatestTechnicalNotes(data.technical.technicalNotes)
        }
      } else {
        setLatestTechnicalNotes(null)
      }
    } catch (error) {
      // Gestion silencieuse des erreurs réseau
      console.error("Error loading agency details:", error)
      if (error instanceof TypeError && error.message.includes('fetch')) {
        // En cas d'erreur, on garde les données existantes
        // L'utilisateur peut continuer à travailler avec les données déjà chargées
      } else {
        // Pour les autres erreurs, on les log en mode développement uniquement
        if (process.env.NODE_ENV === 'development') {
          console.error("Error loading agency details:", error)
        }
        // En cas d'erreur, réinitialiser fullAgencyData pour éviter un état bloqué
        setFullAgencyData(null)
      }
    } finally {
      setLoadingDetails(false)
    }
  }, [isMobile])

  const handleCreateAgency = async () => {
    if (!newAgencyName.trim()) {
      return
    }

    setCreating(true)
    try {
      const response = await apiFetch("/api/agencies", {
        method: "POST",
        body: JSON.stringify({
          name: newAgencyName,
          state: "ALERTE",
        }),
      })

      if (!response.ok) {
        const error = await response.json()
        toast({ title: error.error || "Erreur lors de la création", variant: "destructive" })
        return
      }

      const newAgency = await response.json()
      setAgencies([...agencies, newAgency])
      setSelectedAgency(newAgency)
      setIsCreateDialogOpen(false)
      setNewAgencyName("")

      // Déclencher le rafraîchissement des statistiques
      window.dispatchEvent(new CustomEvent('agencyStatsRefresh'))
      toast({ title: "Agence créée", variant: "success" })
    } catch (error) {
      console.error("Error creating agency:", error)
      toast({ title: "Erreur lors de la création de l'agence", variant: "destructive" })
    } finally {
      setCreating(false)
    }
  }

  const handleSaveAgency = async () => {
    if (!selectedAgency || !editedName.trim()) {
      return
    }

    setSaving(true)
    try {
      // Sauvegarder d'abord l'agence
      const bodyData = {
        name: editedName,
        state: editedState,
        codeAgence: editedCodeAgence || null,
        codeRayon: editedCodeRayon || null,
        dateOuverture: editedDateOuverture || null,
        dateFermeture: editedDateFermeture || null,
        validatedAt: new Date().toISOString(),
      }

      const response = await apiFetch(`/api/agencies/${selectedAgency.id}`, {
        method: "PUT",
        body: JSON.stringify(bodyData),
      })

      if (!response.ok) {
        let errorMessage = "Erreur lors de la sauvegarde de l'agence"
        try {
          const error = await response.json()
          errorMessage = error.error || errorMessage
        } catch {
          // Si la réponse n'est pas du JSON valide, utiliser le message par défaut
          errorMessage = `Erreur serveur (${response.status})`
        }
        toast({ title: errorMessage, variant: "destructive" })
        return
      }

      // Si des données techniques ont été modifiées, les sauvegarder aussi
      // Ne sauvegarder que si editingTechnical est vrai ET qu'on a des données techniques existantes ou des données à créer
      if (editingTechnical && (fullAgencyData?.technical || Object.keys(technicalData).length > 0)) {
        try {
          console.log("Saving technical data from handleSaveAgency, technicalData:", technicalData)

          // S'assurer que technicalNotes est toujours inclus
          const technicalNotesValue = technicalData.technicalNotes !== undefined
            ? technicalData.technicalNotes
            : (fullAgencyData?.technical?.technicalNotes ?? "")

          console.log("technicalNotesValue:", technicalNotesValue)

          // Si technicalData est vide mais qu'on a des notes, créer un objet avec les notes
          const dataToSend = Object.keys(technicalData).length > 0
            ? {
              ...technicalData,
              technicalNotes: technicalNotesValue,
            }
            : {
              technicalNotes: technicalNotesValue,
            }

          console.log("dataToSend from handleSaveAgency:", dataToSend)

          // Ne créer de nouvelles données techniques que si elles n'existent pas ET qu'on a des données à sauvegarder
          if (fullAgencyData?.technical) {
            // Mise à jour de données existantes
            const technicalBody = {
              technicalId: fullAgencyData.technical.id,
              ...dataToSend,
            }

            console.log("technicalBody from handleSaveAgency (PUT):", technicalBody)

            const technicalResponse = await fetch("/api/technical", {
              method: "PUT",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify(technicalBody),
            })

            if (!technicalResponse.ok) {
              const error = await technicalResponse.json()
              console.error("Error saving technical data:", error)
              // Ne pas bloquer la sauvegarde de l'agence si la sauvegarde technique échoue
              toast({ title: "L'agence a été sauvegardée mais une erreur est survenue lors de la sauvegarde des données techniques", variant: "destructive" })
            } else {
              const technicalResponseData = await technicalResponse.json()
              // Mettre à jour latestTechnicalNotes avec la nouvelle valeur sauvegardée
              if (technicalResponseData.technicalNotes !== undefined) {
                setLatestTechnicalNotes(technicalResponseData.technicalNotes)
              }
            }
          } else if (Object.keys(dataToSend).length > 0 && Object.values(dataToSend).some(v => v !== "" && v !== null)) {
            // Création de nouvelles données techniques seulement si on a des données non vides
            const technicalBody = {
              agencyId: selectedAgency.id,
              ...dataToSend,
            }

            console.log("technicalBody from handleSaveAgency (POST):", technicalBody)

            const technicalResponse = await fetch("/api/technical", {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify(technicalBody),
            })

            if (!technicalResponse.ok) {
              const error = await technicalResponse.json()
              console.error("Error creating technical data:", error)
              // Ne pas bloquer la sauvegarde de l'agence si la sauvegarde technique échoue
              toast({ title: "L'agence a été sauvegardée mais une erreur est survenue lors de la création des données techniques", variant: "destructive" })
            } else {
              const technicalResponseData = await technicalResponse.json()
              // Mettre à jour latestTechnicalNotes avec la nouvelle valeur sauvegardée
              if (technicalResponseData.technicalNotes !== undefined) {
                setLatestTechnicalNotes(technicalResponseData.technicalNotes)
              }
            }
          }
        } catch (error) {
          console.error("Error saving technical data:", error)
          toast({ title: "L'agence a été sauvegardée mais une erreur est survenue lors de la sauvegarde des données techniques", variant: "destructive" })
        }
      }

      // Recharger les données
      await loadAgencies()
      await loadAgencyDetails(selectedAgency.id)
      setEditing(false)
      setEditingTechnical(false)
      setTechnicalData({})

      // Déclencher le rafraîchissement des statistiques (surtout si l'état a changé)
      window.dispatchEvent(new CustomEvent('agencyStatsRefresh'))
      toast({ title: "Agence enregistrée", variant: "success" })
    } catch (error) {
      console.error("Error saving agency:", error)
      toast({ title: "Erreur lors de la sauvegarde", variant: "destructive" })
    } finally {
      setSaving(false)
    }
  }

  const toggleState = useCallback(() => {
    setEditedState((prev) => {
      if (prev === "OK") return "ALERTE"
      if (prev === "ALERTE") return "INFO"
      if (prev === "INFO") return "FERMÉE"
      return "OK"
    })
  }, [])

  const handleDeleteAgency = (agencyId: string, agencyName: string) => {
    openConfirm({
      title: "Supprimer l'agence",
      description: `Êtes-vous sûr de vouloir supprimer l'agence « ${agencyName} » ?`,
      confirmLabel: "Supprimer",
      onConfirm: async () => {
        setConfirmLoading(true)
        try {
          const response = await apiFetch(`/api/agencies/${agencyId}`, { method: "DELETE" })
          if (response.ok) {
            setAgencies(agencies.filter((a) => a.id !== agencyId))
            if (selectedAgency?.id === agencyId) {
              const remainingAgencies = agencies.filter((a) => a.id !== agencyId)
              if (remainingAgencies.length > 0) setSelectedAgency(remainingAgencies[0])
              else { setSelectedAgency(null); setFullAgencyData(null) }
            }
            window.dispatchEvent(new CustomEvent('agencyStatsRefresh'))
            toast({ title: "Agence supprimée", variant: "success" })
          } else {
            const error = await response.json()
            toast({ title: error.error || "Erreur lors de la suppression", variant: "destructive" })
          }
        } catch (error) {
          console.error("Error deleting agency:", error)
          toast({ title: "Erreur lors de la suppression", variant: "destructive" })
        } finally {
          setConfirmLoading(false)
        }
      },
    })
  }

  const handleEditAgencyFromMaster = async (agency: Agency) => {
    // Empêcher les utilisateurs de type "User" d'éditer
    if (userRole === "User") {
      return
    }

    setSelectedAgency(agency)

    // En mode mobile, charger les détails complets et ouvrir la vue des détails
    if (isMobile) {
      setShowDetailsOnMobile(true)
      setLoadingDetails(true)
      await loadAgencyDetails(agency.id)
      setLoadingDetails(false)
    }

    setEditing(true)
    setEditedName(agency.name)
    setEditedState(agency.state as "OK" | "ALERTE" | "INFO" | "FERMÉE")

    // Attendre que les données complètes soient chargées avant d'initialiser
    if (isMobile) {
      // Les données seront initialisées après le chargement via useEffect
      return
    }

    setEditedCodeAgence(fullAgencyData?.codeAgence || "")
    setEditedCodeRayon(fullAgencyData?.codeRayon || "")
    setEditedDateOuverture(fullAgencyData?.dateOuverture ? new Date(fullAgencyData.dateOuverture).toISOString().split('T')[0] : "")
    setEditedDateFermeture(fullAgencyData?.dateFermeture ? new Date(fullAgencyData.dateFermeture).toISOString().split('T')[0] : "")
    // Activer le mode édition technique et initialiser les données
    setEditingTechnical(true)
    // Initialiser les données techniques si elles existent
    if (fullAgencyData?.technical) {
      // Utiliser latestTechnicalNotes si disponible, sinon utiliser technicalNotes de la base
      const notesToUse = latestTechnicalNotes !== null ? latestTechnicalNotes : (fullAgencyData.technical.technicalNotes || "")

      setTechnicalData({
        networkIp: fullAgencyData.technical.networkIp || "",
        machineBrand: fullAgencyData.technical.machineBrand || "",
        machineModel: fullAgencyData.technical.machineModel || "",
        machineConnection: fullAgencyData.technical.machineConnection || "",
        machineIp: fullAgencyData.technical.machineIp || "",
        machineMac: fullAgencyData.technical.machineMac || "",
        wifiRouterBrand: fullAgencyData.technical.wifiRouterBrand || "",
        wifiRouterModel: fullAgencyData.technical.wifiRouterModel || "",
        wifiRouterIp: fullAgencyData.technical.wifiRouterIp || "",
        wifiRouterSerial: fullAgencyData.technical.wifiRouterSerial || "",
        mainRouterBrand: fullAgencyData.technical.mainRouterBrand || "",
        mainRouterModel: fullAgencyData.technical.mainRouterModel || "",
        mainRouterIp: fullAgencyData.technical.mainRouterIp || "",
        mainRouterSerial: fullAgencyData.technical.mainRouterSerial || "",
        mainRouterLinkType: fullAgencyData.technical.mainRouterLinkType || "",
        backupRouterBrand: fullAgencyData.technical.backupRouterBrand || "",
        backupRouterModel: fullAgencyData.technical.backupRouterModel || "",
        backupRouterIp: fullAgencyData.technical.backupRouterIp || "",
        backupRouterSerial: fullAgencyData.technical.backupRouterSerial || "",
        recorderBrand: fullAgencyData.technical.recorderBrand || "",
        recorderModel: fullAgencyData.technical.recorderModel || "",
        recorderSerial: fullAgencyData.technical.recorderSerial || "",
        recorderMac: fullAgencyData.technical.recorderMac || "",
        recorderIp: fullAgencyData.technical.recorderIp || "",
        recorderStorage: fullAgencyData.technical.recorderStorage || "",
        technicalNotes: notesToUse,
      })
    } else {
      // Initialiser avec des valeurs vides si aucune donnée technique n'existe
      setTechnicalData({
        networkIp: "",
        machineBrand: "",
        machineModel: "",
        machineConnection: "",
        machineIp: "",
        machineMac: "",
        wifiRouterBrand: "",
        wifiRouterModel: "",
        wifiRouterIp: "",
        wifiRouterSerial: "",
        mainRouterBrand: "",
        mainRouterModel: "",
        mainRouterIp: "",
        mainRouterSerial: "",
        mainRouterLinkType: "",
        backupRouterBrand: "",
        backupRouterModel: "",
        backupRouterIp: "",
        backupRouterSerial: "",
        recorderBrand: "",
        recorderModel: "",
        recorderSerial: "",
        recorderMac: "",
        recorderIp: "",
        recorderStorage: "",
        technicalNotes: "",
      })
    }
  }

















  // Calculer la distance entre deux points tactiles


















  // Fonctions pour technique
  const handleSaveTechnical = async () => {
    if (!selectedAgency) return

    try {
      console.log("technicalData before sending:", technicalData)

      // S'assurer que technicalNotes est toujours inclus, même s'il est vide
      // Si technicalNotes n'est pas dans technicalData, on le récupère de fullAgencyData
      const technicalNotesValue = technicalData.technicalNotes !== undefined
        ? technicalData.technicalNotes
        : (fullAgencyData?.technical?.technicalNotes ?? "")

      // Vérifier que seul le Super Admin peut supprimer les notes techniques
      const hasExistingNotes = fullAgencyData?.technical?.technicalNotes && fullAgencyData.technical.technicalNotes.trim() !== ""
      const isDeletingNotes = technicalNotesValue === "" || technicalNotesValue === null || technicalNotesValue === undefined

      if (isDeletingNotes && hasExistingNotes && userRole !== "Super Admin") {
        showError("Seul le Super Admin peut supprimer les notes techniques")
        return
      }

      const dataToSend = {
        ...technicalData,
        technicalNotes: technicalNotesValue,
      }

      console.log("dataToSend:", dataToSend)

      const body = fullAgencyData?.technical
        ? {
          technicalId: fullAgencyData.technical.id,
          ...dataToSend,
        }
        : {
          agencyId: selectedAgency.id,
          ...dataToSend,
        }

      console.log("Saving technical data:", body)

      const response = await apiFetch("/api/technical", {
        method: fullAgencyData?.technical ? "PUT" : "POST",
        body: JSON.stringify(body),
      })

      console.log("Response status:", response.status)

      if (response.ok) {
        const result = await response.json()
        await loadAgencyDetails(selectedAgency.id)
        // Mettre à jour latestTechnicalNotes avec la nouvelle valeur sauvegardée
        if (result.technicalNotes !== undefined) {
          setLatestTechnicalNotes(result.technicalNotes)
        }
        setEditingTechnical(false)
        setTechnicalData({})
      } else {
        const error = await response.json()
        console.error("Error saving technical:", error)
        showError(error.error || "Erreur lors de la sauvegarde")
      }
    } catch (error) {
      console.error("Error saving technical:", error)
      showError("Erreur lors de la sauvegarde")
    }
  }

  const handleAddPC = () => {
    setSelectedPC(null)
    setIsPCDialogOpen(true)
  }

  const handleEditPC = (pc: PC) => {
    setSelectedPC(pc)
    setIsPCDialogOpen(true)
  }

  const [draggedPCId, setDraggedPCId] = useState<string | null>(null)
  const [dragOverIndex, setDragOverIndex] = useState<number | null>(null)

  const handleMovePC = async (draggedId: string, targetId: string) => {
    if (!selectedAgency || !fullAgencyData?.technical?.pcs) {
      return
    }

    // S'assurer que les PC ont un champ order (rétrocompatibilité)
    const pcsWithOrder = fullAgencyData.technical.pcs.map((pc, index) => ({
      ...pc,
      order: pc.order !== undefined ? pc.order : index
    }))
    const pcs = [...pcsWithOrder].sort((a, b) => (a.order || 0) - (b.order || 0))

    const draggedIndex = pcs.findIndex((p) => p.id === draggedId)
    const targetIndex = pcs.findIndex((p) => p.id === targetId)

    if (draggedIndex === -1 || targetIndex === -1 || draggedIndex === targetIndex) {
      return
    }

    // Réordonner les PC
    const newPcs = [...pcs]
    const [removed] = newPcs.splice(draggedIndex, 1)
    newPcs.splice(targetIndex, 0, removed)

    try {
      // Mettre à jour tous les ordres
      await Promise.all(
        newPcs.map((pc, index) =>
          apiFetch(`/api/pcs/${pc.id}`, {
            method: "PUT",
            body: JSON.stringify({ order: index }),
          })
        )
      )

      await loadAgencyDetails(selectedAgency.id)
    } catch (error) {
      console.error("[handleMovePC] Erreur:", error)
      showError("Erreur lors du déplacement")
    }
  }

  const handleDeletePC = (pcId: string) => {
    openConfirm({
      title: "Supprimer le PC",
      description: "Êtes-vous sûr de vouloir supprimer ce PC ?",
      onConfirm: async () => {
        setConfirmLoading(true)
        try {
          const response = await apiFetch(`/api/pcs/${pcId}`, { method: "DELETE" })
          if (response.ok) {
            await loadAgencyDetails(selectedAgency!.id)
            toast({ title: "PC supprimé", variant: "success" })
          } else {
            showError("Erreur lors de la suppression")
          }
        } catch (error) {
          console.error("Error deleting PC:", error)
          showError("Erreur lors de la suppression")
        } finally {
          setConfirmLoading(false)
        }
      },
    })
  }

  const handleSavePC = async (pcData: any) => {
    if (!selectedAgency) {
      showError("Aucune agence sélectionnée")
      return
    }

    // Si les données techniques n'existent pas, les créer d'abord
    let technicalId = fullAgencyData?.technical?.id

    if (!technicalId) {
      try {
        // Créer les données techniques vides
        const technicalResponse = await fetch("/api/technical", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            agencyId: selectedAgency.id,
          }),
        })

        if (!technicalResponse.ok) {
          const error = await technicalResponse.json()
          showError(error.error || "Erreur lors de la création des données techniques")
          return
        }

        const technical = await technicalResponse.json()
        technicalId = technical.id
        // Recharger les détails de l'agence pour avoir les données techniques
        await loadAgencyDetails(selectedAgency.id)
      } catch (error) {
        console.error("Error creating technical data:", error)
        showError("Erreur lors de la création des données techniques")
        return
      }
    }

    try {
      const url = selectedPC ? `/api/pcs/${selectedPC.id}` : "/api/pcs"
      const method = selectedPC ? "PUT" : "POST"

      const response = await apiFetch(url, {
        method,
        body: JSON.stringify({
          technicalId: technicalId,
          ...pcData,
        }),
      })

      if (response.ok) {
        await loadAgencyDetails(selectedAgency.id)
        setIsPCDialogOpen(false)
        setSelectedPC(null)
      } else {
        const error = await response.json()
        showError(error.error || "Erreur lors de la sauvegarde")
      }
    } catch (error) {
      console.error("Error saving PC:", error)
      showError("Erreur lors de la sauvegarde")
    }
  }

  const handleAddPrinter = () => {
    setSelectedPrinter(null)
    setIsPrinterDialogOpen(true)
  }

  const handleEditPrinter = (printer: Printer) => {
    setSelectedPrinter(printer)
    setIsPrinterDialogOpen(true)
  }

  const handleDeletePrinter = (printerId: string) => {
    openConfirm({
      title: "Supprimer l'imprimante",
      description: "Êtes-vous sûr de vouloir supprimer cette imprimante ?",
      onConfirm: async () => {
        setConfirmLoading(true)
        try {
          const response = await apiFetch(`/api/printers/${printerId}`, { method: "DELETE" })
          if (response.ok) {
            await loadAgencyDetails(selectedAgency!.id)
            toast({ title: "Imprimante supprimée", variant: "success" })
          } else {
            showError("Erreur lors de la suppression")
          }
        } catch (error) {
          console.error("Error deleting printer:", error)
          showError("Erreur lors de la suppression")
        } finally {
          setConfirmLoading(false)
        }
      },
    })
  }

  const handleSavePrinter = async (printerData: any) => {
    if (!selectedAgency || !fullAgencyData?.technical) return

    try {
      const url = selectedPrinter ? `/api/printers/${selectedPrinter.id}` : "/api/printers"
      const method = selectedPrinter ? "PUT" : "POST"

      const response = await apiFetch(url, {
        method,
        body: JSON.stringify({
          technicalId: fullAgencyData.technical.id,
          ...printerData,
        }),
      })

      if (response.ok) {
        await loadAgencyDetails(selectedAgency.id)
        setIsPrinterDialogOpen(false)
        setSelectedPrinter(null)
      } else {
        const error = await response.json()
        showError(error.error || "Erreur lors de la sauvegarde")
      }
    } catch (error) {
      console.error("Error saving printer:", error)
      showError("Erreur lors de la sauvegarde")
    }
  }

  // Handlers mémorisés pour améliorer les performances
  const handleOpenCreateDialog = useCallback(() => setIsCreateDialogOpen(true), [])
  const handleClearSearch = useCallback(() => setSearch(""), [])
  const handleSetFilterAll = useCallback(() => setFilter("ALL"), [])
  const handleSetFilterOK = useCallback(() => setFilter("OK"), [])
  const handleSetFilterINFO = useCallback(() => setFilter("INFO"), [])
  const handleSetFilterALERTE = useCallback(() => setFilter("ALERTE"), [])
  const handleSetFilterFERMEE = useCallback(() => setFilter("FERMÉE"), [])
  const handleSearchChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => setSearch(e.target.value), [])

  // Calcul du "Dirty State" pour avertir l'utilisateur des modifications non enregistrées
  const isDirty = useMemo(() => {
    if (!editing && !editingTechnical && !isMobile) return false

    // Comparaison des champs de base
    if (editing && fullAgencyData) {
      if (editedName !== fullAgencyData.name) return true
      if (editedState !== fullAgencyData.state) return true
      if (editedCodeAgence !== (fullAgencyData.codeAgence || "")) return true
      if (editedCodeRayon !== (fullAgencyData.codeRayon || "")) return true
      const oldOuverture = fullAgencyData.dateOuverture ? new Date(fullAgencyData.dateOuverture).toISOString().split('T')[0] : ""
      if (editedDateOuverture !== oldOuverture) return true
      const oldFermeture = fullAgencyData.dateFermeture ? new Date(fullAgencyData.dateFermeture).toISOString().split('T')[0] : ""
      if (editedDateFermeture !== oldFermeture) return true
    }

    // Comparaison des champs techniques
    if (editingTechnical) {
      const hasTechData = fullAgencyData?.technical
      const keys = ["networkIp", "machineBrand", "machineModel", "machineConnection", "machineIp", "machineMac", "wifiRouterBrand", "wifiRouterModel", "wifiRouterIp", "wifiRouterSerial", "mainRouterBrand", "mainRouterModel", "mainRouterIp", "mainRouterSerial", "mainRouterLinkType", "backupRouterBrand", "backupRouterModel", "backupRouterIp", "backupRouterSerial", "recorderBrand", "recorderModel", "recorderSerial", "recorderMac", "recorderIp", "recorderStorage"]

      for (const key of keys) {
        const tVal = technicalData[key] || ""
        const fVal = hasTechData ? ((fullAgencyData?.technical as any)?.[key] || "") : ""
        if (tVal !== fVal) return true
      }

      const notesToUse = hasTechData ? (latestTechnicalNotes !== null ? latestTechnicalNotes : (fullAgencyData.technical?.technicalNotes || "")) : ""
      if ((technicalData.technicalNotes || "") !== notesToUse) return true
    }

    return false
  }, [editing, editingTechnical, editedName, editedState, editedCodeAgence, editedCodeRayon, editedDateOuverture, editedDateFermeture, technicalData, fullAgencyData, latestTechnicalNotes, isMobile])

  // Handler mémorisé pour la sélection d'agence
  const handleSelectAgency = useCallback((agency: Agency) => {
    if (isDirty) {
      setPendingAgencyToSelect(agency)
      setShowDirtyDialog(true)
      return
    }

    startTransition(() => {
      setSelectedAgency(agency)
      setEditing(false)
      setEditingTechnical(false)
      setTechnicalData({})
      setEditedCodeAgence("")
      setEditedCodeRayon("")
      setEditedDateOuverture("")
      setEditedDateFermeture("")
    })
    // Sur mobile, afficher les détails (hors transition pour réactivité)
    if (isMobile) {
      setShowDetailsOnMobile(true)
      loadAgencyDetails(agency.id)
    }
  }, [isMobile, loadAgencyDetails, isDirty])

  return (
    <>
      <div ref={containerRef} className="flex h-full w-full max-w-full min-w-0 overflow-hidden">
        {/* Zone Master */}
        <div
          className={`h-full flex flex-col overflow-hidden border-r ${isMobile && showDetailsOnMobile ? "hidden" : ""
            } ${isMobile ? "w-full min-w-0 max-w-full" : ""}`}
          style={isMobile ? { width: "100%", minWidth: "0", maxWidth: "100%" } : { width: `${masterWidth}%`, minWidth: "200px", maxWidth: "60%" }}
          suppressHydrationWarning
        >
          {/* Partie fixe : Titre, recherche et filtres */}
          <div className="flex-shrink-0 p-2 sm:p-4 space-y-2 sm:space-y-4 border-b">
            <div className="flex items-center justify-between mb-2 gap-2">
              <h2 className="text-base sm:text-lg font-semibold truncate">Agences</h2>
              {(userRole === "Admin" || userRole === "Super Admin") && (
                <Button
                  onClick={handleOpenCreateDialog}
                  size="sm"
                  className="gap-1 sm:gap-2 shrink-0"
                >
                  <Plus className="h-3 w-3 sm:h-4 sm:w-4" />
                  <span className="hidden sm:inline">Ajouter</span>
                </Button>
              )}
            </div>
            <div className="space-y-2">
              <div className="relative">
                <Input
                  type="text"
                  placeholder="Rechercher..."
                  value={search}
                  onChange={handleSearchChange}
                  className="w-full min-h-[44px] text-foreground pr-10"
                />
                {search && (
                  <button
                    type="button"
                    onClick={handleClearSearch}
                    className="absolute right-2 top-1/2 -translate-y-1/2 p-1 rounded-md hover:bg-muted transition-colors min-h-[44px] flex items-center justify-center"
                    aria-label="Réinitialiser la recherche"
                  >
                    <X className="h-4 w-4 text-muted-foreground hover:text-foreground" />
                  </button>
                )}
              </div>
              <div className="flex gap-1 sm:gap-2 overflow-x-auto pb-1 scrollbar-hide">
                <button
                  onClick={handleSetFilterAll}
                  className={`px-3 sm:px-3 py-2 sm:py-1 text-sm sm:text-sm rounded whitespace-nowrap shrink-0 min-h-[44px] ${filter === "ALL" ? "bg-primary text-primary-foreground" : "bg-muted"
                    }`}
                >
                  Tous
                </button>
                <button
                  onClick={handleSetFilterOK}
                  className={`px-3 sm:px-3 py-2 sm:py-1 text-sm sm:text-sm rounded whitespace-nowrap shrink-0 min-h-[44px] ${filter === "OK" ? "bg-primary text-primary-foreground" : "bg-muted"
                    }`}
                >
                  OK
                </button>
                <button
                  onClick={handleSetFilterINFO}
                  className={`px-3 sm:px-3 py-2 sm:py-1 text-sm sm:text-sm rounded whitespace-nowrap shrink-0 min-h-[44px] ${filter === "INFO"
                    ? "bg-primary text-primary-foreground"
                    : "bg-muted"
                    }`}
                >
                  INFO
                </button>
                <button
                  onClick={handleSetFilterALERTE}
                  className={`px-3 sm:px-3 py-2 sm:py-1 text-sm sm:text-sm rounded whitespace-nowrap shrink-0 min-h-[44px] ${filter === "ALERTE"
                    ? "bg-primary text-primary-foreground"
                    : "bg-muted"
                    }`}
                >
                  ALERTE
                </button>
                <button
                  onClick={handleSetFilterFERMEE}
                  className={`px-3 sm:px-3 py-2 sm:py-1 text-sm sm:text-sm rounded whitespace-nowrap shrink-0 min-h-[44px] ${filter === "FERMÉE"
                    ? "bg-primary text-primary-foreground"
                    : "bg-muted"
                    }`}
                >
                  FERMÉE
                </button>
              </div>
            </div>
          </div>

          {/* Partie scrollable : Liste des agences */}
          <div className="flex-1 overflow-y-auto min-h-0">
            <div className="p-2 sm:p-4" style={{ paddingBottom: '120px' }}>
              {loading ? (
                <div className="space-y-2">
                  {Array.from({ length: 15 }).map((_, i) => (
                    <div key={i} className="flex items-center space-x-4 p-3 border rounded">
                      <div className="space-y-2 flex-1">
                        <Skeleton className="h-4 w-3/4" />
                        <Skeleton className="h-3 w-1/4" />
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="space-y-2">
                  {agencies.map((agency) => {
                    const isSelected = selectedAgency?.id === agency.id
                    return (
                      <div
                        key={agency.id}
                        className={`p-3 sm:p-3 border rounded transition-all duration-700 ease-in-out ${isSelected ? "bg-accent" : "bg-background"
                          }`}
                        style={{
                          transitionProperty: 'background-color',
                          transitionTimingFunction: 'cubic-bezier(0.4, 0, 0.2, 1)'
                        }}
                      >
                        <div className="flex items-center justify-between gap-1 sm:gap-2">
                          <div
                            onClick={() => handleSelectAgency(agency)}
                            className="cursor-pointer flex-1 min-w-0"
                          >
                            <div className="font-semibold text-base sm:text-base truncate">{agency.name}</div>
                            <div
                              className={`text-sm sm:text-sm ${agency.state === "OK"
                                ? "text-green-600"
                                : agency.state === "INFO"
                                  ? "text-yellow-600"
                                  : agency.state === "FERMÉE"
                                    ? "text-gray-600"
                                    : "text-red-600"
                                }`}
                            >
                              {agency.state}
                            </div>
                          </div>
                          {userRole !== "User" && (
                            <div className="flex gap-1 sm:gap-2 shrink-0">
                              <Button
                                variant="ghost"
                                size="sm"
                                onClick={(e) => {
                                  e.stopPropagation()
                                  handleEditAgencyFromMaster(agency)
                                }}
                                className="text-blue-600 hover:text-blue-700 hover:bg-blue-50 h-8 w-8 sm:h-9 sm:w-9 p-0"
                              >
                                <Edit className="h-3 w-3 sm:h-4 sm:w-4" />
                              </Button>
                              {userRole === "Super Admin" && (
                                <Button
                                  variant="ghost"
                                  size="sm"
                                  onClick={(e) => {
                                    e.stopPropagation()
                                    handleDeleteAgency(agency.id, agency.name)
                                  }}
                                  className="text-red-600 hover:text-red-700 hover:bg-red-50 h-8 w-8 sm:h-9 sm:w-9 p-0"
                                >
                                  <Trash2 className="h-3 w-3 sm:h-4 sm:w-4" />
                                </Button>
                              )}
                            </div>
                          )}
                        </div>
                      </div>
                    )
                  })}
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Barre de redimensionnement */}
        {!isMobile && (
          <div
            onMouseDown={(e) => {
              e.preventDefault()
              setIsResizing(true)
            }}
            className="w-1 bg-transparent hover:bg-border cursor-col-resize transition-colors flex-shrink-0"
            style={{ minWidth: "4px" }}
          />
        )}

        {/* Zone Détails */}
        <div
          className={`h-full flex flex-col overflow-hidden transition-opacity duration-300 ${isMobile && !showDetailsOnMobile ? "hidden" : ""
            }`}
          style={{
            width: isMobile ? "100%" : `${100 - masterWidth}%`,
            minWidth: isMobile ? "auto" : "300px"
          }}
          suppressHydrationWarning
        >
          {loadingDetails && !fullAgencyData ? (
            <div className="p-6 flex flex-col h-full space-y-6">
              <div className="flex flex-col sm:flex-row items-start sm:items-center space-y-2 sm:space-y-0 sm:space-x-4 mb-2">
                <Skeleton className="h-8 w-64" />
                <Skeleton className="h-8 w-24" />
              </div>
              <div className="flex space-x-2 border-b pb-2">
                <Skeleton className="h-10 w-24" />
                <Skeleton className="h-10 w-24" />
                <Skeleton className="h-10 w-24" />
                <Skeleton className="h-10 w-24" />
              </div>
              <div className="grid grid-cols-1 xl:grid-cols-2 gap-4 mt-4">
                {Array.from({ length: 4 }).map((_, i) => (
                  <Skeleton key={i} className="h-40 w-full rounded-xl" />
                ))}
              </div>
            </div>
          ) : fullAgencyData && selectedAgency ? (
            <div className={`flex-1 flex flex-col min-h-0 transition-opacity duration-300 ${loadingDetails ? 'opacity-60' : 'opacity-100'}`}>
              <>
                {/* En-tête avec nom et état - Fixe */}
                <div ref={detailsHeaderRef} className="flex-shrink-0 bg-background pb-2 sm:pb-4 pt-3 sm:pt-6 px-3 sm:px-6 border-b flex flex-col sm:flex-row items-center sm:items-center justify-between gap-2 sm:gap-4 relative" style={{ backgroundColor: 'hsl(var(--background))' }}>
                  {/* Bouton Retour sur mobile - positionné à gauche */}
                  {isMobile && (
                    <Button
                      variant="ghost"
                      size="sm"
                      aria-label="Retour à la liste des agences"
                      onClick={() => {
                        setShowDetailsOnMobile(false)
                        setSelectedAgency(null)
                        setFullAgencyData(null)
                      }}
                      className="absolute left-3 top-3 sm:relative sm:left-auto sm:top-auto shrink-0"
                    >
                      <ArrowLeft className="h-4 w-4" />
                    </Button>
                  )}
                  {/* Contenu centré en mobile, normal en desktop */}
                  <div className={`flex items-center gap-2 sm:gap-4 min-w-0 ${isMobile ? 'flex-col flex-1 w-full' : 'flex-1'}`}>
                    {editing ? (
                      <div className={`flex items-center gap-2 min-w-0 ${isMobile ? 'flex-col w-full' : 'flex-1'}`}>
                        <Input
                          value={editedName}
                          onChange={(e) => setEditedName(e.target.value)}
                          className={`text-base sm:text-2xl font-bold min-w-0 min-h-[44px] ${isMobile ? 'w-full text-center' : 'flex-1'}`}
                        />
                        {isDirty && (
                          <div className="flex items-center gap-1.5 bg-amber-100 text-amber-800 dark:bg-amber-900/40 dark:text-amber-300 px-3 py-1.5 rounded-full text-xs font-semibold shrink-0 animate-in fade-in-50">
                            <AlertCircle className="h-3.5 w-3.5" />
                            <span>Modifications non enregistrées</span>
                          </div>
                        )}
                      </div>
                    ) : (
                      <h2 className={`text-base sm:text-2xl font-bold ${isMobile ? 'text-center w-full mb-2' : 'truncate'}`}>{fullAgencyData.name}</h2>
                    )}
                    {/* En mode mobile : état + Historique + Modifier sur une ligne */}
                    {isMobile && !editing && (
                      <div className="flex gap-2 w-full">
                        <Button
                          onClick={toggleState}
                          variant={
                            editedState === "OK"
                              ? "default"
                              : editedState === "INFO"
                                ? "secondary"
                                : editedState === "FERMÉE"
                                  ? "outline"
                                  : "destructive"
                          }
                          size="sm"
                          className="pointer-events-none flex-1"
                          style={
                            editedState === "OK"
                              ? { backgroundColor: "#22c55e", color: "#fff" }
                              : editedState === "INFO"
                                ? { backgroundColor: "#fbbf24", color: "#000" }
                                : editedState === "FERMÉE"
                                  ? { backgroundColor: "#9ca3af", color: "#fff" }
                                  : undefined
                          }
                        >
                          {editedState === "OK"
                            ? "✓ OK"
                            : editedState === "INFO"
                              ? "ℹ INFO"
                              : editedState === "FERMÉE"
                                ? "🔒 FERMÉE"
                                : "⚠ ALERTE"}
                        </Button>
                        {userRole === "Super Admin" && (
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={async () => {
                              if (!selectedAgency) return
                              setLoadingAgencyHistory(true)
                              setIsAgencyHistoryDialogOpen(true)
                              try {
                                const response = await fetch(
                                  `/api/agencies/${selectedAgency.id}/history`
                                )
                                if (response.ok) {
                                  const data = await response.json()
                                  setAgencyHistory(data)
                                }
                              } catch (error) {
                                console.error("Error loading agency history:", error)
                              } finally {
                                setLoadingAgencyHistory(false)
                              }
                            }}
                            className="gap-2 flex-1"
                          >
                            <Clock className="h-4 w-4" />
                            <span className="hidden xs:inline">Historique</span>
                          </Button>
                        )}
                        {userRole !== "User" && (
                          <Button
                            onClick={() => {
                              setEditing(true)
                              setEditedName(fullAgencyData.name)
                              setEditedState(fullAgencyData.state as "OK" | "ALERTE" | "INFO" | "FERMÉE")
                              setEditedCodeAgence(fullAgencyData.codeAgence || "")
                              setEditedCodeRayon(fullAgencyData.codeRayon || "")
                              setEditedDateOuverture(fullAgencyData.dateOuverture ? new Date(fullAgencyData.dateOuverture).toISOString().split('T')[0] : "")
                              setEditedDateFermeture(fullAgencyData.dateFermeture ? new Date(fullAgencyData.dateFermeture).toISOString().split('T')[0] : "")
                              setEditingTechnical(true)
                              if (fullAgencyData?.technical) {
                                const notesToUse = latestTechnicalNotes !== null ? latestTechnicalNotes : (fullAgencyData.technical.technicalNotes || "")
                                setTechnicalData({
                                  networkIp: fullAgencyData.technical.networkIp || "",
                                  machineBrand: fullAgencyData.technical.machineBrand || "",
                                  machineModel: fullAgencyData.technical.machineModel || "",
                                  machineConnection: fullAgencyData.technical.machineConnection || "",
                                  machineIp: fullAgencyData.technical.machineIp || "",
                                  machineMac: fullAgencyData.technical.machineMac || "",
                                  wifiRouterBrand: fullAgencyData.technical.wifiRouterBrand || "",
                                  wifiRouterModel: fullAgencyData.technical.wifiRouterModel || "",
                                  wifiRouterIp: fullAgencyData.technical.wifiRouterIp || "",
                                  wifiRouterSerial: fullAgencyData.technical.wifiRouterSerial || "",
                                  mainRouterBrand: fullAgencyData.technical.mainRouterBrand || "",
                                  mainRouterModel: fullAgencyData.technical.mainRouterModel || "",
                                  mainRouterIp: fullAgencyData.technical.mainRouterIp || "",
                                  mainRouterSerial: fullAgencyData.technical.mainRouterSerial || "",
                                  mainRouterLinkType: fullAgencyData.technical.mainRouterLinkType || "",
                                  backupRouterBrand: fullAgencyData.technical.backupRouterBrand || "",
                                  backupRouterModel: fullAgencyData.technical.backupRouterModel || "",
                                  backupRouterIp: fullAgencyData.technical.backupRouterIp || "",
                                  backupRouterSerial: fullAgencyData.technical.backupRouterSerial || "",
                                  recorderBrand: fullAgencyData.technical.recorderBrand || "",
                                  recorderModel: fullAgencyData.technical.recorderModel || "",
                                  recorderSerial: fullAgencyData.technical.recorderSerial || "",
                                  recorderMac: fullAgencyData.technical.recorderMac || "",
                                  recorderIp: fullAgencyData.technical.recorderIp || "",
                                  recorderStorage: fullAgencyData.technical.recorderStorage || "",
                                  technicalNotes: notesToUse,
                                })
                              } else {
                                setTechnicalData({})
                              }
                            }}
                            className="gap-2 flex-1"
                          >
                            <Edit className="h-4 w-4" />
                            <span className="hidden xs:inline">Modifier</span>
                          </Button>
                        )}
                      </div>
                    )}
                    {/* En mode desktop : layout horizontal normal */}
                    {!isMobile && (
                      <>
                        <Button
                          onClick={toggleState}
                          variant={
                            editedState === "OK"
                              ? "default"
                              : editedState === "INFO"
                                ? "secondary"
                                : editedState === "FERMÉE"
                                  ? "outline"
                                  : "destructive"
                          }
                          size="sm"
                          className={editing ? "" : "pointer-events-none"}
                          style={
                            editedState === "OK"
                              ? { backgroundColor: "#22c55e", color: "#fff" }
                              : editedState === "INFO"
                                ? { backgroundColor: "#fbbf24", color: "#000" }
                                : editedState === "FERMÉE"
                                  ? { backgroundColor: "#9ca3af", color: "#fff" }
                                  : undefined
                          }
                        >
                          {editedState === "OK"
                            ? "✓ OK"
                            : editedState === "INFO"
                              ? "ℹ INFO"
                              : editedState === "FERMÉE"
                                ? "🔒 FERMÉE"
                                : "⚠ ALERTE"}
                        </Button>
                        {!editing && userRole === "Super Admin" && (
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={async () => {
                              if (!selectedAgency) return
                              setLoadingAgencyHistory(true)
                              setIsAgencyHistoryDialogOpen(true)
                              try {
                                const response = await fetch(
                                  `/api/agencies/${selectedAgency.id}/history`
                                )
                                if (response.ok) {
                                  const data = await response.json()
                                  setAgencyHistory(data)
                                }
                              } catch (error) {
                                console.error("Error loading agency history:", error)
                              } finally {
                                setLoadingAgencyHistory(false)
                              }
                            }}
                            className="gap-2"
                          >
                            <Clock className="h-4 w-4" />
                            Historique
                          </Button>
                        )}
                      </>
                    )}
                  </div>
                  {/* Bouton Modifier à droite en mode desktop non-édition */}
                  {!editing && !isMobile && userRole !== "User" && (
                    <div className="flex gap-2">
                      <Button
                        onClick={() => {
                          setEditing(true)
                          setEditedName(fullAgencyData.name)
                          setEditedState(fullAgencyData.state as "OK" | "ALERTE" | "INFO" | "FERMÉE")
                          setEditedCodeAgence(fullAgencyData.codeAgence || "")
                          setEditedCodeRayon(fullAgencyData.codeRayon || "")
                          setEditedDateOuverture(fullAgencyData.dateOuverture ? new Date(fullAgencyData.dateOuverture).toISOString().split('T')[0] : "")
                          setEditedDateFermeture(fullAgencyData.dateFermeture ? new Date(fullAgencyData.dateFermeture).toISOString().split('T')[0] : "")
                          setEditingTechnical(true)
                          if (fullAgencyData?.technical) {
                            const notesToUse = latestTechnicalNotes !== null ? latestTechnicalNotes : (fullAgencyData.technical.technicalNotes || "")
                            setTechnicalData({
                              networkIp: fullAgencyData.technical.networkIp || "",
                              machineBrand: fullAgencyData.technical.machineBrand || "",
                              machineModel: fullAgencyData.technical.machineModel || "",
                              machineConnection: fullAgencyData.technical.machineConnection || "",
                              machineIp: fullAgencyData.technical.machineIp || "",
                              machineMac: fullAgencyData.technical.machineMac || "",
                              wifiRouterBrand: fullAgencyData.technical.wifiRouterBrand || "",
                              wifiRouterModel: fullAgencyData.technical.wifiRouterModel || "",
                              wifiRouterIp: fullAgencyData.technical.wifiRouterIp || "",
                              wifiRouterSerial: fullAgencyData.technical.wifiRouterSerial || "",
                              mainRouterBrand: fullAgencyData.technical.mainRouterBrand || "",
                              mainRouterModel: fullAgencyData.technical.mainRouterModel || "",
                              mainRouterIp: fullAgencyData.technical.mainRouterIp || "",
                              mainRouterSerial: fullAgencyData.technical.mainRouterSerial || "",
                              mainRouterLinkType: fullAgencyData.technical.mainRouterLinkType || "",
                              backupRouterBrand: fullAgencyData.technical.backupRouterBrand || "",
                              backupRouterModel: fullAgencyData.technical.backupRouterModel || "",
                              backupRouterIp: fullAgencyData.technical.backupRouterIp || "",
                              backupRouterSerial: fullAgencyData.technical.backupRouterSerial || "",
                              recorderBrand: fullAgencyData.technical.recorderBrand || "",
                              recorderModel: fullAgencyData.technical.recorderModel || "",
                              recorderSerial: fullAgencyData.technical.recorderSerial || "",
                              recorderMac: fullAgencyData.technical.recorderMac || "",
                              recorderIp: fullAgencyData.technical.recorderIp || "",
                              recorderStorage: fullAgencyData.technical.recorderStorage || "",
                              technicalNotes: notesToUse,
                            })
                          } else {
                            setTechnicalData({})
                          }
                        }}
                        className="gap-2"
                      >
                        <Edit className="h-4 w-4" />
                        <span className="hidden sm:inline">Modifier</span>
                      </Button>
                    </div>
                  )}
                  {/* Boutons Annuler/Enregistrer à droite en mode édition */}
                  {editing && (
                    <div className="flex gap-2">
                      <Button
                        variant="outline"
                        onClick={() => {
                          setEditing(false)
                          setEditingTechnical(false)
                          setEditedName(fullAgencyData.name)
                          setEditedState(fullAgencyData.state as "OK" | "ALERTE" | "INFO" | "FERMÉE")
                          setEditedCodeAgence(fullAgencyData?.codeAgence || "")
                          setEditedCodeRayon(fullAgencyData?.codeRayon || "")
                          setEditedDateOuverture(fullAgencyData?.dateOuverture ? new Date(fullAgencyData.dateOuverture).toISOString().split('T')[0] : "")
                          setEditedDateFermeture(fullAgencyData?.dateFermeture ? new Date(fullAgencyData.dateFermeture).toISOString().split('T')[0] : "")
                          setTechnicalData({})
                        }}
                      >
                        Annuler
                      </Button>
                      <Button onClick={handleSaveAgency} className="gap-2" disabled={saving}>
                        {saving ? (
                          <>
                            <span className="inline-block h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent" aria-hidden />
                            Enregistrement…
                          </>
                        ) : (
                          <>
                            <Save className="h-4 w-4" />
                            Enregistrer
                          </>
                        )}
                      </Button>
                    </div>
                  )}
                </div>

                {/* Onglets + contenu */}
                <Tabs
                  value={activeTab}
                  onValueChange={(value) => setActiveTab(value as "general" | "tasks" | "technical" | "photos")}
                  className="w-full flex-1 flex flex-col overflow-hidden min-h-0"
                >
                  {/* Onglets - Fixe */}
                  <div ref={detailsTabsRef} className="flex-shrink-0 bg-background pb-2 px-3 sm:px-6 border-b overflow-x-auto" style={{ backgroundColor: 'hsl(var(--background))' }}>
                    <TabsList className="bg-background w-full sm:w-auto" style={{ backgroundColor: 'hsl(var(--background))' }}>
                      <TabsTrigger value="general" className="text-sm sm:text-sm min-h-[44px]">
                        <FileText className="h-4 w-4 sm:h-4 sm:w-4 mr-2 sm:mr-2" />
                        Général
                      </TabsTrigger>
                      <TabsTrigger value="tasks" className="text-sm sm:text-sm min-h-[44px]">
                        <ListTodo className="h-4 w-4 sm:h-4 sm:w-4 mr-2 sm:mr-2" />
                        Tâches
                      </TabsTrigger>
                      <TabsTrigger value="technical" className="text-sm sm:text-sm min-h-[44px]">
                        <Settings className="h-4 w-4 sm:h-4 sm:w-4 mr-2 sm:mr-2" />
                        <span className="hidden sm:inline">Technique</span>
                        <span className="sm:hidden">Tech</span>
                      </TabsTrigger>
                      <TabsTrigger value="photos" className="text-sm sm:text-sm min-h-[44px]">
                        <Camera className="h-4 w-4 sm:h-4 sm:w-4 mr-2 sm:mr-2" />
                        Photos
                      </TabsTrigger>
                    </TabsList>
                  </div>

                  {/* Contenu scrollable */}
                  <div
                    ref={detailsScrollRef}
                    className="flex-1 overflow-y-auto min-h-0"
                  >
                    <div className="px-3 sm:px-6" style={{ paddingBottom: '120px' }}>
                      <TabsContent value="general" className="space-y-3 sm:space-y-4 pt-2 sm:pt-4 mt-0">
                        <Card>
                          <CardHeader className="p-4 sm:p-6">
                            <CardTitle className="text-base sm:text-lg">Informations générales</CardTitle>
                          </CardHeader>
                          <CardContent className="space-y-3 sm:space-y-4 p-4 sm:p-6">
                            {/* Photo principale centrée en haut */}
                            {(fullAgencyData.photo ||
                              (fullAgencyData.photos && fullAgencyData.photos.find(pg => pg.type === "Agence"))) && (
                                <div className="flex justify-center mb-4 sm:mb-6">
                                  {fullAgencyData.photo ? (
                                    <div className="relative w-full max-w-full sm:max-w-md h-48 sm:h-64">
                                      <Image
                                        src={fullAgencyData.photo}
                                        alt={fullAgencyData.name}
                                        fill
                                        className="object-contain rounded-lg shadow-md"
                                        unoptimized
                                        priority
                                      />
                                    </div>
                                  ) : (
                                    (() => {
                                      const agencyPhotoGroup = fullAgencyData.photos?.find(pg => pg.type === "Agence")
                                      if (agencyPhotoGroup) {
                                        const photos = JSON.parse(agencyPhotoGroup.photos || "[]")
                                        if (photos.length > 0) {
                                          const photoPath = typeof photos[0] === "string" ? photos[0] : photos[0].path
                                          return (
                                            <div className="relative w-full max-w-full sm:max-w-md h-48 sm:h-64">
                                              <Image
                                                src={photoPath}
                                                alt={fullAgencyData.name}
                                                fill
                                                className="object-contain rounded-lg shadow-md"
                                                unoptimized
                                                priority
                                              />
                                            </div>
                                          )
                                        }
                                      }
                                      return null
                                    })()
                                  )}
                                </div>
                              )}
                            <div>
                              <Label>Nom de l&apos;agence</Label>
                              {editing ? (
                                <Input
                                  value={editedName}
                                  onChange={(e) => setEditedName(e.target.value)}
                                  className="mt-1"
                                />
                              ) : (
                                <div className="mt-1">{fullAgencyData.name}</div>
                              )}
                            </div>
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 sm:gap-4">
                              <div>
                                <Label>Code Agence</Label>
                                {editing ? (
                                  <Input
                                    value={editedCodeAgence}
                                    onChange={(e) => setEditedCodeAgence(e.target.value)}
                                    className="mt-1"
                                  />
                                ) : (
                                  <div className="mt-1">{fullAgencyData.codeAgence || "-"}</div>
                                )}
                              </div>
                              <div>
                                <Label>Code Rayon</Label>
                                {editing ? (
                                  <Input
                                    value={editedCodeRayon}
                                    onChange={(e) => setEditedCodeRayon(e.target.value)}
                                    className="mt-1"
                                  />
                                ) : (
                                  <div className="mt-1">{fullAgencyData.codeRayon || "-"}</div>
                                )}
                              </div>
                            </div>
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 sm:gap-4">
                              <div>
                                <Label>Date ouverture</Label>
                                {editing ? (
                                  <Input
                                    type="date"
                                    value={editedDateOuverture}
                                    onChange={(e) => setEditedDateOuverture(e.target.value)}
                                    className="mt-1"
                                  />
                                ) : (
                                  <div className="mt-1">
                                    {fullAgencyData.dateOuverture
                                      ? new Date(fullAgencyData.dateOuverture).toLocaleDateString("fr-FR")
                                      : "-"}
                                  </div>
                                )}
                              </div>
                              <div>
                                <Label>Date fermeture</Label>
                                {editing ? (
                                  <Input
                                    type="date"
                                    value={editedDateFermeture}
                                    onChange={(e) => setEditedDateFermeture(e.target.value)}
                                    className="mt-1"
                                  />
                                ) : (
                                  <div className="mt-1">
                                    {fullAgencyData.dateFermeture
                                      ? new Date(fullAgencyData.dateFermeture).toLocaleDateString("fr-FR")
                                      : "-"}
                                  </div>
                                )}
                              </div>
                            </div>
                          </CardContent>
                        </Card>

                        {/* Section Adresses Modularisée */}
                        <AddressSection
                          agencyId={fullAgencyData.id}
                          addresses={fullAgencyData.addresses || []}
                          editing={editing}
                          onUpdate={() => loadAgencyDetails(fullAgencyData.id)}
                        />

                        {/* Section Contacts Modularisée */}
                        <ContactSection
                          agencyId={fullAgencyData.id}
                          contacts={fullAgencyData.contacts || []}
                          editing={editing}
                          userRole={userRole}
                          onUpdate={() => loadAgencyDetails(fullAgencyData.id)}
                        />
                      </TabsContent>

                      <TabsContent value="tasks" className="space-y-0 pt-0 mt-0">
                        <TaskSection
                          agencyId={fullAgencyData.id}
                          editing={editing}
                        />
                      </TabsContent>

                      <TabsContent value="technical" className="space-y-2 sm:space-y-4 pt-2 sm:pt-4 mt-0">
                        {!fullAgencyData?.technical && !editing && !editingTechnical ? (
                          <Card>
                            <CardContent className="p-6">
                              <div className="text-center text-muted-foreground">
                                Aucune information technique enregistrée
                              </div>
                            </CardContent>
                          </Card>
                        ) : (
                          <>
                            {/* Réseau */}
                            <Card>
                              <CardHeader>
                                <CardTitle>Réseau</CardTitle>
                              </CardHeader>
                              <CardContent>
                                <div className="space-y-2">
                                  <Label>Adresse IP LAN (CIDR)</Label>
                                  {editingTechnical ? (
                                    <Input
                                      value={technicalData.networkIp || ""}
                                      onChange={(e) =>
                                        setTechnicalData({ ...technicalData, networkIp: e.target.value })
                                      }
                                      placeholder="192.168.1.0/24"
                                    />
                                  ) : (
                                    <div>{fullAgencyData.technical?.networkIp || "Non renseigné"}</div>
                                  )}
                                </div>
                              </CardContent>
                            </Card>

                            {/* PC */}
                            <Card>
                              <CardHeader>
                                <div className="flex items-center justify-between">
                                  <CardTitle className="flex items-center gap-2">
                                    <Image
                                      src="/computer.png"
                                      alt="PC"
                                      width={100}
                                      height={100}
                                      className="max-w-[60px] max-h-[60px] sm:max-w-[100px] sm:max-h-[100px] object-contain"
                                      style={{ width: "auto", height: "auto" }}
                                      unoptimized
                                    />
                                  </CardTitle>
                                  {editing && (
                                    <Button onClick={handleAddPC} size="sm" className="gap-2">
                                      <Plus className="h-4 w-4" />
                                      Ajouter
                                    </Button>
                                  )}
                                </div>
                              </CardHeader>
                              <CardContent>
                                {fullAgencyData.technical?.pcs && fullAgencyData.technical.pcs.length > 0 ? (
                                  <div className="space-y-2 sm:space-y-4">
                                    {(() => {
                                      // S'assurer que les PC ont un champ order (rétrocompatibilité)
                                      const pcsWithOrder = fullAgencyData.technical.pcs.map((pc, index) => ({
                                        ...pc,
                                        order: pc.order !== undefined ? pc.order : index
                                      }))
                                      const sortedPCs = [...pcsWithOrder].sort((a, b) => (a.order || 0) - (b.order || 0))
                                      return sortedPCs.map((pc, index) => (
                                        <div
                                          key={pc.id}
                                          onDragOver={(e) => {
                                            e.preventDefault()
                                            e.dataTransfer.dropEffect = "move"
                                            setDragOverIndex(index)
                                          }}
                                          onDragLeave={() => {
                                            setDragOverIndex(null)
                                          }}
                                          onDrop={(e) => {
                                            e.preventDefault()
                                            setDragOverIndex(null)
                                            if (draggedPCId && draggedPCId !== pc.id) {
                                              handleMovePC(draggedPCId, pc.id)
                                            }
                                            setDraggedPCId(null)
                                          }}
                                          className={`border p-3 sm:p-4 rounded-lg space-y-2 sm:space-y-3 ${draggedPCId === pc.id ? "opacity-50" : ""
                                            } ${dragOverIndex === index ? "border-primary border-2" : ""
                                            }`}
                                        >
                                          <div className="flex items-start justify-between">
                                            {editing && (
                                              <div
                                                className="mr-2 text-muted-foreground cursor-move"
                                                draggable={true}
                                                onDragStart={(e) => {
                                                  setDraggedPCId(pc.id)
                                                  e.dataTransfer.effectAllowed = "move"
                                                }}
                                                onDragEnd={() => {
                                                  setDraggedPCId(null)
                                                  setDragOverIndex(null)
                                                }}
                                              >
                                                <GripVertical className="h-5 w-5" />
                                              </div>
                                            )}
                                            <div className="flex-1">
                                              <div className="font-semibold text-base sm:text-lg mb-2">{pc.name}</div>
                                              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 sm:gap-3 text-sm sm:text-sm">
                                                {pc.brand && (
                                                  <div>
                                                    <span className="font-medium">Marque:</span> {pc.brand}
                                                  </div>
                                                )}
                                                {pc.model && (
                                                  <div>
                                                    <span className="font-medium">Modèle:</span> {pc.model}
                                                  </div>
                                                )}
                                                {pc.ip && (
                                                  <div>
                                                    <span className="font-medium">IP:</span> {pc.ip}
                                                  </div>
                                                )}
                                                {pc.mac && (
                                                  <div>
                                                    <span className="font-medium">MAC:</span> {pc.mac}
                                                  </div>
                                                )}
                                                {pc.serialNumber && (
                                                  <div>
                                                    <span className="font-medium">N° série:</span> {pc.serialNumber}
                                                  </div>
                                                )}
                                                {pc.purchaseDate && (
                                                  <div>
                                                    <span className="font-medium">Date achat:</span>{" "}
                                                    {new Date(pc.purchaseDate).toLocaleDateString("fr-FR")}
                                                  </div>
                                                )}
                                                {pc.warrantyDate && (
                                                  <div>
                                                    <span className="font-medium">Date garantie:</span>{" "}
                                                    {new Date(pc.warrantyDate).toLocaleDateString("fr-FR")}
                                                  </div>
                                                )}
                                              </div>
                                              {pc.files && (
                                                <div className="mt-2 text-sm">
                                                  <span className="font-medium">Fichiers:</span>{" "}
                                                  {(() => {
                                                    try {
                                                      const files = JSON.parse(pc.files)
                                                      return Array.isArray(files) ? files.join(", ") : pc.files
                                                    } catch {
                                                      return pc.files
                                                    }
                                                  })()}
                                                </div>
                                              )}
                                              {pc.photos && (
                                                <div className="mt-2">
                                                  <span className="font-medium text-sm">Photos:</span>
                                                  <div className="flex gap-2 mt-1">
                                                    {(() => {
                                                      try {
                                                        const photos = JSON.parse(pc.photos || "[]")
                                                        return Array.isArray(photos) && photos.length > 0
                                                          ? photos.map((photo: string, idx: number) => (
                                                            <div key={idx} className="relative w-20 h-20">
                                                              <Image
                                                                src={photo}
                                                                alt={`Photo ${idx + 1}`}
                                                                fill
                                                                className="object-cover rounded border"
                                                                unoptimized
                                                              />
                                                            </div>
                                                          ))
                                                          : null
                                                      } catch {
                                                        return null
                                                      }
                                                    })()}
                                                  </div>
                                                </div>
                                              )}
                                            </div>
                                            {editing && (
                                              <div className="flex gap-2 ml-4">
                                                <Button
                                                  variant="ghost"
                                                  size="sm"
                                                  onClick={() => handleEditPC(pc)}
                                                  onMouseDown={(e) => e.stopPropagation()}
                                                >
                                                  <Edit className="h-4 w-4" />
                                                </Button>
                                                <Button
                                                  variant="ghost"
                                                  size="sm"
                                                  onClick={() => handleDeletePC(pc.id)}
                                                  onMouseDown={(e) => e.stopPropagation()}
                                                >
                                                  <Trash2 className="h-4 w-4" />
                                                </Button>
                                              </div>
                                            )}
                                          </div>
                                        </div>
                                      ))
                                    })()}
                                  </div>
                                ) : (
                                  <EmptyState
                                    icon={Monitor}
                                    title="Aucun PC"
                                    description="Aucun ordinateur n'a été ajouté à cette agence."
                                    action={
                                      editing ? (
                                        <Button onClick={handleAddPC} size="sm">
                                          <Plus className="mr-2 h-4 w-4" />
                                          Ajouter un PC
                                        </Button>
                                      ) : null
                                    }
                                  />
                                )}
                              </CardContent>
                            </Card>

                            {/* Imprimantes */}
                            <Card>
                              <CardHeader>
                                <div className="flex items-center justify-between">
                                  <CardTitle className="flex items-center gap-2">
                                    <Image
                                      src="/printer.png"
                                      alt="Imprimantes"
                                      width={100}
                                      height={100}
                                      className="max-w-[60px] max-h-[60px] sm:max-w-[100px] sm:max-h-[100px] object-contain"
                                      style={{ width: "auto", height: "auto" }}
                                      unoptimized
                                    />
                                  </CardTitle>
                                  {editing && (
                                    <Button onClick={handleAddPrinter} size="sm" className="gap-2">
                                      <Plus className="h-4 w-4" />
                                      Ajouter
                                    </Button>
                                  )}
                                </div>
                              </CardHeader>
                              <CardContent>
                                {fullAgencyData.technical?.printers &&
                                  fullAgencyData.technical.printers.length > 0 ? (
                                  <div className="space-y-2 sm:space-y-4">
                                    {fullAgencyData.technical.printers.map((printer) => (
                                      <div
                                        key={printer.id}
                                        className="border p-3 sm:p-4 rounded-lg space-y-2 sm:space-y-3"
                                      >
                                        <div className="flex items-start justify-between">
                                          <div className="flex-1">
                                            <div className="font-semibold text-base sm:text-lg mb-2">{printer.name}</div>
                                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 sm:gap-3 text-sm sm:text-sm">
                                              {printer.brand && (
                                                <div>
                                                  <span className="font-medium">Marque:</span> {printer.brand}
                                                </div>
                                              )}
                                              {printer.model && (
                                                <div>
                                                  <span className="font-medium">Modèle:</span> {printer.model}
                                                </div>
                                              )}
                                              {printer.ip && (
                                                <div>
                                                  <span className="font-medium">IP:</span> {printer.ip}
                                                </div>
                                              )}
                                              {printer.mac && (
                                                <div>
                                                  <span className="font-medium">MAC:</span> {printer.mac}
                                                </div>
                                              )}
                                              {printer.serialNumber && (
                                                <div>
                                                  <span className="font-medium">N° série:</span> {printer.serialNumber}
                                                </div>
                                              )}
                                              {printer.purchaseDate && (
                                                <div>
                                                  <span className="font-medium">Date achat:</span>{" "}
                                                  {new Date(printer.purchaseDate).toLocaleDateString("fr-FR")}
                                                </div>
                                              )}
                                              {printer.warrantyDate && (
                                                <div>
                                                  <span className="font-medium">Date garantie:</span>{" "}
                                                  {new Date(printer.warrantyDate).toLocaleDateString("fr-FR")}
                                                </div>
                                              )}
                                            </div>
                                            {printer.files && (
                                              <div className="mt-2 text-sm">
                                                <span className="font-medium">Fichiers:</span>{" "}
                                                {(() => {
                                                  try {
                                                    const files = JSON.parse(printer.files)
                                                    return Array.isArray(files) ? files.join(", ") : printer.files
                                                  } catch {
                                                    return printer.files
                                                  }
                                                })()}
                                              </div>
                                            )}
                                            {printer.photos && (
                                              <div className="mt-2">
                                                <span className="font-medium text-sm">Photos:</span>
                                                <div className="flex gap-2 mt-1">
                                                  {(() => {
                                                    try {
                                                      const photos = JSON.parse(printer.photos || "[]")
                                                      return Array.isArray(photos) && photos.length > 0
                                                        ? photos.map((photo: string, idx: number) => (
                                                          <div key={idx} className="relative w-20 h-20">
                                                            <Image
                                                              src={photo}
                                                              alt={`Photo ${idx + 1}`}
                                                              fill
                                                              className="object-cover rounded"
                                                              unoptimized
                                                            />
                                                          </div>
                                                        ))
                                                        : null
                                                    } catch {
                                                      return null
                                                    }
                                                  })()}
                                                </div>
                                              </div>
                                            )}
                                          </div>
                                          {editing && (
                                            <div className="flex gap-2 ml-4">
                                              <Button
                                                variant="ghost"
                                                size="sm"
                                                onClick={() => handleEditPrinter(printer)}
                                              >
                                                <Edit className="h-4 w-4" />
                                              </Button>
                                              <Button
                                                variant="ghost"
                                                size="sm"
                                                onClick={() => handleDeletePrinter(printer.id)}
                                              >
                                                <Trash2 className="h-4 w-4" />
                                              </Button>
                                            </div>
                                          )}
                                        </div>
                                      </div>
                                    ))}
                                  </div>
                                ) : (
                                  <EmptyState
                                    icon={Printer}
                                    title="Aucune imprimante"
                                    description="Aucune imprimante n'a été ajoutée à cette agence."
                                    action={
                                      editing ? (
                                        <Button onClick={handleAddPrinter} size="sm">
                                          <Plus className="mr-2 h-4 w-4" />
                                          Ajouter une imprimante
                                        </Button>
                                      ) : null
                                    }
                                  />
                                )}
                              </CardContent>
                            </Card>

                            {/* Machine à affranchir */}
                            <Card>
                              <CardHeader>
                                <CardTitle className="flex items-center gap-2">
                                  <img
                                    src="/machineAffranchir.png"
                                    alt="Machine à affranchir"
                                    className="max-w-[100px] max-h-[100px] object-contain w-auto h-auto"
                                  />
                                </CardTitle>
                              </CardHeader>
                              <CardContent className="space-y-3 sm:space-y-4 p-4 sm:p-6">
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 sm:gap-4">
                                  <div className="space-y-2">
                                    <Label>Marque</Label>
                                    {editingTechnical ? (
                                      <Input
                                        value={technicalData.machineBrand || ""}
                                        onChange={(e) =>
                                          setTechnicalData({ ...technicalData, machineBrand: e.target.value })
                                        }
                                      />
                                    ) : (
                                      <div>{fullAgencyData.technical?.machineBrand || "Non renseigné"}</div>
                                    )}
                                  </div>
                                  <div className="space-y-2">
                                    <Label>Modèle</Label>
                                    {editingTechnical ? (
                                      <Input
                                        value={technicalData.machineModel || ""}
                                        onChange={(e) =>
                                          setTechnicalData({ ...technicalData, machineModel: e.target.value })
                                        }
                                      />
                                    ) : (
                                      <div>{fullAgencyData.technical?.machineModel || "Non renseigné"}</div>
                                    )}
                                  </div>
                                  <div className="space-y-2">
                                    <Label>Connexion</Label>
                                    {editingTechnical ? (
                                      <Select
                                        value={technicalData.machineConnection || ""}
                                        onValueChange={(value) =>
                                          setTechnicalData({ ...technicalData, machineConnection: value })
                                        }
                                      >
                                        <SelectTrigger>
                                          <SelectValue placeholder="Sélectionner" />
                                        </SelectTrigger>
                                        <SelectContent>
                                          <SelectItem value="Wifi">Wifi</SelectItem>
                                          <SelectItem value="Filaire">Filaire</SelectItem>
                                        </SelectContent>
                                      </Select>
                                    ) : (
                                      <div>{fullAgencyData.technical?.machineConnection || "Non renseigné"}</div>
                                    )}
                                  </div>
                                  <div className="space-y-2">
                                    <Label>IP</Label>
                                    {editingTechnical ? (
                                      <Input
                                        value={technicalData.machineIp || ""}
                                        onChange={(e) =>
                                          setTechnicalData({ ...technicalData, machineIp: e.target.value })
                                        }
                                      />
                                    ) : (
                                      <div>{fullAgencyData.technical?.machineIp || "Non renseigné"}</div>
                                    )}
                                  </div>
                                  <div className="space-y-2">
                                    <Label>MAC</Label>
                                    {editingTechnical ? (
                                      <Input
                                        value={technicalData.machineMac || ""}
                                        onChange={(e) =>
                                          setTechnicalData({ ...technicalData, machineMac: e.target.value })
                                        }
                                      />
                                    ) : (
                                      <div>{fullAgencyData.technical?.machineMac || "Non renseigné"}</div>
                                    )}
                                  </div>
                                </div>
                              </CardContent>
                            </Card>

                            {/* Wifi */}
                            <Card>
                              <CardHeader>
                                <CardTitle className="flex items-center gap-2">
                                  <Image
                                    src="/wifi.png"
                                    alt="Wifi"
                                    width={100}
                                    height={100}
                                    className="max-w-[100px] max-h-[100px] object-contain"
                                    style={{ width: "auto", height: "auto" }}
                                    unoptimized
                                  />
                                </CardTitle>
                              </CardHeader>
                              <CardContent className="space-y-3 sm:space-y-4 p-4 sm:p-6">
                                <div>
                                  <Label className="mb-2 block">Routeur Wifi</Label>
                                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 sm:gap-4">
                                    <div className="space-y-2">
                                      <Label>Marque</Label>
                                      {editingTechnical ? (
                                        <Input
                                          value={technicalData.wifiRouterBrand || ""}
                                          onChange={(e) =>
                                            setTechnicalData({ ...technicalData, wifiRouterBrand: e.target.value })
                                          }
                                        />
                                      ) : (
                                        <div>{fullAgencyData.technical?.wifiRouterBrand || "Non renseigné"}</div>
                                      )}
                                    </div>
                                    <div className="space-y-2">
                                      <Label>Modèle</Label>
                                      {editingTechnical ? (
                                        <Input
                                          value={technicalData.wifiRouterModel || ""}
                                          onChange={(e) =>
                                            setTechnicalData({ ...technicalData, wifiRouterModel: e.target.value })
                                          }
                                        />
                                      ) : (
                                        <div>{fullAgencyData.technical?.wifiRouterModel || "Non renseigné"}</div>
                                      )}
                                    </div>
                                    <div className="space-y-2">
                                      <Label>IP</Label>
                                      {editingTechnical ? (
                                        <Input
                                          value={technicalData.wifiRouterIp || ""}
                                          onChange={(e) =>
                                            setTechnicalData({ ...technicalData, wifiRouterIp: e.target.value })
                                          }
                                        />
                                      ) : (
                                        <div>{fullAgencyData.technical?.wifiRouterIp || "Non renseigné"}</div>
                                      )}
                                    </div>
                                    <div className="space-y-2">
                                      <Label>N° série</Label>
                                      {editingTechnical ? (
                                        <Input
                                          value={technicalData.wifiRouterSerial || ""}
                                          onChange={(e) =>
                                            setTechnicalData({
                                              ...technicalData,
                                              wifiRouterSerial: e.target.value,
                                            })
                                          }
                                        />
                                      ) : (
                                        <div>{fullAgencyData.technical?.wifiRouterSerial || "Non renseigné"}</div>
                                      )}
                                    </div>
                                  </div>
                                </div>
                                <div>
                                  <div className="flex items-center justify-between mb-2">
                                    <Label>Points d&apos;accès Wifi</Label>
                                    {editing && (
                                      <Button onClick={() => setIsWifiAPDialogOpen(true)} size="sm" className="gap-2">
                                        <Plus className="h-4 w-4" />
                                        Ajouter
                                      </Button>
                                    )}
                                  </div>
                                  {fullAgencyData.technical?.wifiAccessPoints &&
                                    fullAgencyData.technical.wifiAccessPoints.length > 0 ? (
                                    <div className="space-y-2 sm:space-y-4">
                                      {fullAgencyData.technical.wifiAccessPoints.map((ap) => (
                                        <div
                                          key={ap.id}
                                          className="border p-3 sm:p-4 rounded-lg space-y-2 sm:space-y-3"
                                        >
                                          <div className="flex items-start justify-between">
                                            <div className="flex-1">
                                              <div className="font-semibold text-base sm:text-lg mb-2">
                                                {ap.ssid || "Point d'accès sans nom"}
                                              </div>
                                              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 sm:gap-3 text-sm sm:text-sm">
                                                {ap.brand && (
                                                  <div>
                                                    <span className="font-medium">Marque:</span> {ap.brand}
                                                  </div>
                                                )}
                                                {ap.model && (
                                                  <div>
                                                    <span className="font-medium">Modèle:</span> {ap.model}
                                                  </div>
                                                )}
                                                {ap.ip && (
                                                  <div>
                                                    <span className="font-medium">IP:</span> {ap.ip}
                                                  </div>
                                                )}
                                                {ap.serialNumber && (
                                                  <div>
                                                    <span className="font-medium">N° série:</span> {ap.serialNumber}
                                                  </div>
                                                )}
                                                {ap.passwordEncrypted && (
                                                  <div className="col-span-2">
                                                    <span className="font-medium">Mot de passe:</span>{" "}
                                                    <span className="inline-flex items-center gap-1">
                                                      {visiblePasswords[ap.id] ? (
                                                        <span>{decryptedPasswords[ap.id] || "••••••••"}</span>
                                                      ) : (
                                                        <span>••••••••</span>
                                                      )}
                                                      <button
                                                        type="button"
                                                        onClick={async () => {
                                                          if (!visiblePasswords[ap.id] && !decryptedPasswords[ap.id]) {
                                                            // Récupérer le mot de passe décrypté
                                                            try {
                                                              const response = await fetch(`/api/wifi-access-points/${ap.id}/password`)
                                                              if (response.ok) {
                                                                const data = await response.json()
                                                                setDecryptedPasswords((prev) => ({
                                                                  ...prev,
                                                                  [ap.id]: data.password || "",
                                                                }))
                                                              }
                                                            } catch (error) {
                                                              console.error("Error fetching password:", error)
                                                            }
                                                          }
                                                          setVisiblePasswords((prev) => ({
                                                            ...prev,
                                                            [ap.id]: !prev[ap.id],
                                                          }))
                                                        }}
                                                        className="ml-1 p-1 hover:bg-gray-100 dark:hover:bg-gray-800 rounded transition-colors"
                                                        title={visiblePasswords[ap.id] ? "Masquer le mot de passe" : "Afficher le mot de passe"}
                                                      >
                                                        {visiblePasswords[ap.id] ? (
                                                          <EyeOff className="h-4 w-4" />
                                                        ) : (
                                                          <Eye className="h-4 w-4" />
                                                        )}
                                                      </button>
                                                    </span>
                                                  </div>
                                                )}
                                              </div>
                                            </div>
                                            {editing && (
                                              <div className="flex gap-2">
                                                <Button
                                                  variant="ghost"
                                                  size="sm"
                                                  onClick={() => {
                                                    setSelectedWifiAP(ap)
                                                    setIsWifiAPDialogOpen(true)
                                                  }}
                                                >
                                                  <Edit className="h-4 w-4" />
                                                </Button>
                                                <Button
                                                  variant="ghost"
                                                  size="sm"
                                                  onClick={() => openConfirm({
                                                    title: "Supprimer le point d'accès",
                                                    description: "Supprimer ce point d'accès ?",
                                                    onConfirm: async () => {
                                                      setConfirmLoading(true)
                                                      try {
                                                        const response = await apiFetch(`/api/wifi-access-points/${ap.id}`, { method: "DELETE" })
                                                        if (response.ok) {
                                                          await loadAgencyDetails(selectedAgency!.id)
                                                          toast({ title: "Point d'accès supprimé", variant: "success" })
                                                        } else showError("Erreur lors de la suppression")
                                                      } catch (error) {
                                                        console.error("Error deleting wifi AP:", error)
                                                        showError("Erreur lors de la suppression")
                                                      } finally {
                                                        setConfirmLoading(false)
                                                      }
                                                    },
                                                  })}
                                                >
                                                  <Trash2 className="h-4 w-4" />
                                                </Button>
                                              </div>
                                            )}
                                          </div>
                                        </div>
                                      ))}
                                    </div>
                                  ) : (
                                    <div className="text-muted-foreground">Aucun point d&apos;accès enregistré</div>
                                  )}
                                </div>
                              </CardContent>
                            </Card>

                            {/* Routeurs */}
                            <Card>
                              <CardHeader>
                                <CardTitle>Routeurs</CardTitle>
                              </CardHeader>
                              <CardContent className="space-y-3 sm:space-y-6">
                                <div>
                                  <Label className="mb-2 block">Routeur Principal</Label>
                                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 sm:gap-4">
                                    <div className="space-y-2">
                                      <Label>Marque</Label>
                                      {editingTechnical ? (
                                        <Input
                                          value={technicalData.mainRouterBrand || ""}
                                          onChange={(e) =>
                                            setTechnicalData({ ...technicalData, mainRouterBrand: e.target.value })
                                          }
                                        />
                                      ) : (
                                        <div>{fullAgencyData.technical?.mainRouterBrand || "Non renseigné"}</div>
                                      )}
                                    </div>
                                    <div className="space-y-2">
                                      <Label>Modèle</Label>
                                      {editingTechnical ? (
                                        <Input
                                          value={technicalData.mainRouterModel || ""}
                                          onChange={(e) =>
                                            setTechnicalData({ ...technicalData, mainRouterModel: e.target.value })
                                          }
                                        />
                                      ) : (
                                        <div>{fullAgencyData.technical?.mainRouterModel || "Non renseigné"}</div>
                                      )}
                                    </div>
                                    <div className="space-y-2">
                                      <Label>IP</Label>
                                      {editingTechnical ? (
                                        <Input
                                          value={technicalData.mainRouterIp || ""}
                                          onChange={(e) =>
                                            setTechnicalData({ ...technicalData, mainRouterIp: e.target.value })
                                          }
                                        />
                                      ) : (
                                        <div>{fullAgencyData.technical?.mainRouterIp || "Non renseigné"}</div>
                                      )}
                                    </div>
                                    <div className="space-y-2">
                                      <Label>N° série</Label>
                                      {editingTechnical ? (
                                        <Input
                                          value={technicalData.mainRouterSerial || ""}
                                          onChange={(e) =>
                                            setTechnicalData({ ...technicalData, mainRouterSerial: e.target.value })
                                          }
                                        />
                                      ) : (
                                        <div>{fullAgencyData.technical?.mainRouterSerial || "Non renseigné"}</div>
                                      )}
                                    </div>
                                    <div className="space-y-2 col-span-2">
                                      <Label>Type lien</Label>
                                      {editingTechnical ? (
                                        <Input
                                          value={technicalData.mainRouterLinkType || ""}
                                          onChange={(e) =>
                                            setTechnicalData({
                                              ...technicalData,
                                              mainRouterLinkType: e.target.value,
                                            })
                                          }
                                        />
                                      ) : (
                                        <div>{fullAgencyData.technical?.mainRouterLinkType || "Non renseigné"}</div>
                                      )}
                                    </div>
                                  </div>
                                </div>
                                <div>
                                  <Label className="mb-2 block">Routeur Secours</Label>
                                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 sm:gap-4">
                                    <div className="space-y-2">
                                      <Label>Marque</Label>
                                      {editingTechnical ? (
                                        <Input
                                          value={technicalData.backupRouterBrand || ""}
                                          onChange={(e) =>
                                            setTechnicalData({ ...technicalData, backupRouterBrand: e.target.value })
                                          }
                                        />
                                      ) : (
                                        <div>{fullAgencyData.technical?.backupRouterBrand || "Non renseigné"}</div>
                                      )}
                                    </div>
                                    <div className="space-y-2">
                                      <Label>Modèle</Label>
                                      {editingTechnical ? (
                                        <Input
                                          value={technicalData.backupRouterModel || ""}
                                          onChange={(e) =>
                                            setTechnicalData({ ...technicalData, backupRouterModel: e.target.value })
                                          }
                                        />
                                      ) : (
                                        <div>{fullAgencyData.technical?.backupRouterModel || "Non renseigné"}</div>
                                      )}
                                    </div>
                                    <div className="space-y-2">
                                      <Label>IP</Label>
                                      {editingTechnical ? (
                                        <Input
                                          value={technicalData.backupRouterIp || ""}
                                          onChange={(e) =>
                                            setTechnicalData({ ...technicalData, backupRouterIp: e.target.value })
                                          }
                                        />
                                      ) : (
                                        <div>{fullAgencyData.technical?.backupRouterIp || "Non renseigné"}</div>
                                      )}
                                    </div>
                                    <div className="space-y-2">
                                      <Label>N° série</Label>
                                      {editingTechnical ? (
                                        <Input
                                          value={technicalData.backupRouterSerial || ""}
                                          onChange={(e) =>
                                            setTechnicalData({
                                              ...technicalData,
                                              backupRouterSerial: e.target.value,
                                            })
                                          }
                                        />
                                      ) : (
                                        <div>{fullAgencyData.technical?.backupRouterSerial || "Non renseigné"}</div>
                                      )}
                                    </div>
                                  </div>
                                </div>
                              </CardContent>
                            </Card>

                            {/* Vidéo protection */}
                            <Card>
                              <CardHeader>
                                <CardTitle>Vidéo protection</CardTitle>
                              </CardHeader>
                              <CardContent className="space-y-3 sm:space-y-4 p-4 sm:p-6">
                                <div>
                                  <Label className="mb-2 block">Enregistreur</Label>
                                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 sm:gap-4">
                                    <div className="space-y-2">
                                      <Label>Marque</Label>
                                      {editingTechnical ? (
                                        <Input
                                          value={technicalData.recorderBrand || ""}
                                          onChange={(e) =>
                                            setTechnicalData({ ...technicalData, recorderBrand: e.target.value })
                                          }
                                        />
                                      ) : (
                                        <div>{fullAgencyData.technical?.recorderBrand || "Non renseigné"}</div>
                                      )}
                                    </div>
                                    <div className="space-y-2">
                                      <Label>Modèle</Label>
                                      {editingTechnical ? (
                                        <Input
                                          value={technicalData.recorderModel || ""}
                                          onChange={(e) =>
                                            setTechnicalData({ ...technicalData, recorderModel: e.target.value })
                                          }
                                        />
                                      ) : (
                                        <div>{fullAgencyData.technical?.recorderModel || "Non renseigné"}</div>
                                      )}
                                    </div>
                                    <div className="space-y-2">
                                      <Label>N° série</Label>
                                      {editingTechnical ? (
                                        <Input
                                          value={technicalData.recorderSerial || ""}
                                          onChange={(e) =>
                                            setTechnicalData({ ...technicalData, recorderSerial: e.target.value })
                                          }
                                        />
                                      ) : (
                                        <div>{fullAgencyData.technical?.recorderSerial || "Non renseigné"}</div>
                                      )}
                                    </div>
                                    <div className="space-y-2">
                                      <Label>MAC</Label>
                                      {editingTechnical ? (
                                        <Input
                                          value={technicalData.recorderMac || ""}
                                          onChange={(e) =>
                                            setTechnicalData({ ...technicalData, recorderMac: e.target.value })
                                          }
                                        />
                                      ) : (
                                        <div>{fullAgencyData.technical?.recorderMac || "Non renseigné"}</div>
                                      )}
                                    </div>
                                    <div className="space-y-2">
                                      <Label>IP</Label>
                                      {editingTechnical ? (
                                        <Input
                                          value={technicalData.recorderIp || ""}
                                          onChange={(e) =>
                                            setTechnicalData({ ...technicalData, recorderIp: e.target.value })
                                          }
                                        />
                                      ) : (
                                        <div>{fullAgencyData.technical?.recorderIp || "Non renseigné"}</div>
                                      )}
                                    </div>
                                    <div className="space-y-2">
                                      <Label>Stockage</Label>
                                      {editingTechnical ? (
                                        <Input
                                          value={technicalData.recorderStorage || ""}
                                          onChange={(e) =>
                                            setTechnicalData({ ...technicalData, recorderStorage: e.target.value })
                                          }
                                        />
                                      ) : (
                                        <div>{fullAgencyData.technical?.recorderStorage || "Non renseigné"}</div>
                                      )}
                                    </div>
                                  </div>
                                </div>
                                <div>
                                  <div className="flex items-center justify-between mb-2">
                                    <Label>Caméras</Label>
                                    {editing && (
                                      <Button onClick={() => setIsCameraDialogOpen(true)} size="sm" className="gap-2">
                                        <Plus className="h-4 w-4" />
                                        Ajouter
                                      </Button>
                                    )}
                                  </div>
                                  {fullAgencyData.technical?.cameras &&
                                    fullAgencyData.technical.cameras.length > 0 ? (
                                    <div className="space-y-2">
                                      {fullAgencyData.technical.cameras.map((camera) => (
                                        <div
                                          key={camera.id}
                                          className="border p-3 rounded flex items-center justify-between"
                                        >
                                          <div>
                                            <div className="font-semibold">
                                              {camera.brand} {camera.model}
                                            </div>
                                            <div className="text-sm text-muted-foreground">
                                              {camera.type} {camera.ip && `- ${camera.ip}`}
                                            </div>
                                          </div>
                                          {editing && (
                                            <div className="flex gap-2">
                                              <Button
                                                variant="ghost"
                                                size="sm"
                                                onClick={() => {
                                                  setSelectedCamera(camera)
                                                  setIsCameraDialogOpen(true)
                                                }}
                                              >
                                                <Edit className="h-4 w-4" />
                                              </Button>
                                              <Button
                                                variant="ghost"
                                                size="sm"
                                                onClick={() => openConfirm({
                                                  title: "Supprimer la caméra",
                                                  description: "Supprimer cette caméra ?",
                                                  onConfirm: async () => {
                                                    setConfirmLoading(true)
                                                    try {
                                                      const response = await apiFetch(`/api/cameras/${camera.id}`, { method: "DELETE" })
                                                      if (response.ok) {
                                                        await loadAgencyDetails(selectedAgency!.id)
                                                        toast({ title: "Caméra supprimée", variant: "success" })
                                                      } else showError("Erreur lors de la suppression")
                                                    } catch (error) {
                                                      console.error("Error deleting camera:", error)
                                                      showError("Erreur lors de la suppression")
                                                    } finally {
                                                      setConfirmLoading(false)
                                                    }
                                                  },
                                                })}
                                              >
                                                <Trash2 className="h-4 w-4" />
                                              </Button>
                                            </div>
                                          )}
                                        </div>
                                      ))}
                                    </div>
                                  ) : (
                                    <div className="text-muted-foreground">Aucune caméra enregistrée</div>
                                  )}
                                </div>
                              </CardContent>
                            </Card>

                            {/* Notes techniques */}
                            <Card>
                              <CardHeader>
                                <div className="flex items-center justify-between">
                                  <CardTitle>Notes techniques</CardTitle>
                                  {fullAgencyData.technical?.id && (
                                    <Button
                                      variant="outline"
                                      size="sm"
                                      onClick={async () => {
                                        if (!fullAgencyData.technical?.id) return
                                        setLoadingHistory(true)
                                        setIsNotesHistoryDialogOpen(true)
                                        try {
                                          const response = await fetch(
                                            `/api/technical/${fullAgencyData.technical.id}/history`
                                          )
                                          if (response.ok) {
                                            const data = await response.json()
                                            setNotesHistory(data)
                                          }
                                        } catch (error) {
                                          console.error("Error loading history:", error)
                                        } finally {
                                          setLoadingHistory(false)
                                        }
                                      }}
                                    >
                                      Historique
                                    </Button>
                                  )}
                                </div>
                              </CardHeader>
                              <CardContent>
                                {editing || editingTechnical ? (
                                  <Textarea
                                    value={technicalData.technicalNotes || ""}
                                    onChange={(e) => {
                                      const newValue = e.target.value
                                      // Empêcher les non-Super Admin de vider les notes si elles existent déjà
                                      const hasExistingNotes = fullAgencyData?.technical?.technicalNotes && fullAgencyData.technical.technicalNotes.trim() !== ""
                                      if (newValue === "" && hasExistingNotes && userRole !== "Super Admin") {
                                        showError("Seul le Super Admin peut supprimer les notes techniques")
                                        return
                                      }
                                      setTechnicalData({ ...technicalData, technicalNotes: newValue })
                                    }}
                                    placeholder="Notes techniques..."
                                    rows={6}
                                  />
                                ) : (
                                  <div className="whitespace-pre-wrap min-h-[100px] p-4 bg-muted/50 rounded-md">
                                    {latestTechnicalNotes !== null && latestTechnicalNotes !== ""
                                      ? latestTechnicalNotes
                                      : (fullAgencyData.technical?.technicalNotes && fullAgencyData.technical.technicalNotes !== ""
                                        ? fullAgencyData.technical.technicalNotes
                                        : "Aucune note")}
                                  </div>
                                )}
                              </CardContent>
                            </Card>

                            {/* Champs dynamiques */}
                            <Card>
                              <CardHeader>
                                <div className="flex items-center justify-between">
                                  <CardTitle>Champs dynamiques</CardTitle>
                                  {editing && (
                                    <Button
                                      onClick={() => setIsDynamicFieldDialogOpen(true)}
                                      size="sm"
                                      className="gap-2"
                                    >
                                      <Plus className="h-4 w-4" />
                                      Ajouter
                                    </Button>
                                  )}
                                </div>
                              </CardHeader>
                              <CardContent>
                                {fullAgencyData.technical?.dynamicFields &&
                                  fullAgencyData.technical.dynamicFields.length > 0 ? (
                                  <div className="space-y-2">
                                    {fullAgencyData.technical.dynamicFields
                                      .sort((a, b) => a.order - b.order)
                                      .map((field) => (
                                        <div
                                          key={field.id}
                                          className="border p-3 rounded flex items-center justify-between"
                                        >
                                          <div>
                                            <span className="font-semibold">{field.key}:</span> {field.value}
                                          </div>
                                          {editing && (
                                            <div className="flex gap-2">
                                              <Button
                                                variant="ghost"
                                                size="sm"
                                                onClick={() => {
                                                  setSelectedDynamicField(field)
                                                  setIsDynamicFieldDialogOpen(true)
                                                }}
                                              >
                                                <Edit className="h-4 w-4" />
                                              </Button>
                                              <Button
                                                variant="ghost"
                                                size="sm"
                                                onClick={() => openConfirm({
                                                  title: "Supprimer le champ",
                                                  description: "Supprimer ce champ ?",
                                                  onConfirm: async () => {
                                                    setConfirmLoading(true)
                                                    try {
                                                      const response = await apiFetch(`/api/dynamic-fields/${field.id}`, { method: "DELETE" })
                                                      if (response.ok) {
                                                        await loadAgencyDetails(selectedAgency!.id)
                                                        toast({ title: "Champ supprimé", variant: "success" })
                                                      } else showError("Erreur lors de la suppression")
                                                    } catch (error) {
                                                      console.error("Error deleting dynamic field:", error)
                                                      showError("Erreur lors de la suppression")
                                                    } finally {
                                                      setConfirmLoading(false)
                                                    }
                                                  },
                                                })}
                                              >
                                                <Trash2 className="h-4 w-4" />
                                              </Button>
                                            </div>
                                          )}
                                        </div>
                                      ))}
                                  </div>
                                ) : (
                                  <div className="text-muted-foreground">Aucun champ dynamique</div>
                                )}
                              </CardContent>
                            </Card>
                          </>
                        )}
                      </TabsContent>

                      <TabsContent value="photos" className="space-y-2 sm:space-y-4 pt-2 sm:pt-4 mt-0">
                        <PhotoSection
                          agencyId={selectedAgency!.id}
                          photos={fullAgencyData.photos || []}
                          editing={editing}
                          maxImageSizeMB={maxImageSizeMB}
                          onUpdate={async () => {
                            await loadAgencyDetails(selectedAgency!.id)
                          }}
                        />
                      </TabsContent>
                    </div>
                  </div>
                </Tabs>
              </>
            </div>
          ) : selectedAgency ? (
            <div className="p-6 flex items-center justify-center h-full text-muted-foreground">
              <div className="animate-pulse">Chargement des détails...</div>
            </div>
          ) : (
            <DashboardCockpit
              userRole={userRole}
              onSelectAgencyId={(id) => {
                const agency = agencies.find((a) => a.id === id)
                if (agency) handleSelectAgency(agency)
              }}
            />
          )}
        </div>
      </div>

      {/* Dialog de création agence */}
      <Dialog open={isCreateDialogOpen} onOpenChange={setIsCreateDialogOpen}>
        <DialogContent className="max-w-[95vw] sm:max-w-lg">
          <DialogTitle className="sr-only">Dialogue</DialogTitle>
          <DialogHeader>
            <DialogTitle>Nouvelle agence</DialogTitle>
            <DialogDescription>
              Créez une nouvelle agence. Le nom est obligatoire.
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="agency-name">Nom de l&apos;agence *</Label>
              <Input
                id="agency-name"
                value={newAgencyName}
                onChange={(e) => setNewAgencyName(e.target.value)}
                placeholder="Nom de l'agence"
                onKeyDown={(e) => {
                  if (e.key === "Enter" && newAgencyName.trim()) {
                    handleCreateAgency()
                  }
                }}
              />
            </div>
          </div>
          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => {
                setIsCreateDialogOpen(false)
                setNewAgencyName("")
              }}
            >
              Annuler
            </Button>
            <Button
              onClick={handleCreateAgency}
              disabled={!newAgencyName.trim() || creating}
            >
              {creating ? "Création..." : "Créer"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Dialog PC */}
      <Dialog open={isPCDialogOpen} onOpenChange={setIsPCDialogOpen}>
        <DialogContent className="max-w-[95vw] sm:max-w-2xl max-h-[90vh] overflow-y-auto">
          <DialogTitle className="sr-only">Dialogue</DialogTitle>
          <DialogHeader>
            <DialogTitle>{selectedPC ? "Modifier le PC" : "Nouveau PC"}</DialogTitle>
          </DialogHeader>
          <PCDialogForm
            pc={selectedPC}
            onSave={handleSavePC}
            onCancel={() => {
              setIsPCDialogOpen(false)
              setSelectedPC(null)
            }}
          />
        </DialogContent>
      </Dialog>

      {/* Dialog Imprimante */}
      <Dialog open={isPrinterDialogOpen} onOpenChange={setIsPrinterDialogOpen}>
        <DialogContent className="max-w-[95vw] sm:max-w-2xl max-h-[90vh] overflow-y-auto">
          <DialogTitle className="sr-only">Dialogue</DialogTitle>
          <DialogHeader>
            <DialogTitle>
              {selectedPrinter ? "Modifier l'imprimante" : "Nouvelle imprimante"}
            </DialogTitle>
          </DialogHeader>
          <PrinterDialogForm
            printer={selectedPrinter}
            onSave={handleSavePrinter}
            onCancel={() => {
              setIsPrinterDialogOpen(false)
              setSelectedPrinter(null)
            }}
          />
        </DialogContent>
      </Dialog>

      {/* Dialog Point d'accès Wifi */}
      <Dialog open={isWifiAPDialogOpen} onOpenChange={setIsWifiAPDialogOpen}>
        <DialogContent>
          <DialogTitle className="sr-only">Dialogue</DialogTitle>
          <DialogHeader>
            <DialogTitle>
              {selectedWifiAP ? "Modifier le point d'accès" : "Nouveau point d'accès Wifi"}
            </DialogTitle>
          </DialogHeader>
          <WifiAPDialogForm
            wifiAP={selectedWifiAP}
            technicalId={fullAgencyData?.technical?.id}
            onSave={async (data) => {
              if (!fullAgencyData?.technical) return
              try {
                const url = selectedWifiAP
                  ? `/api/wifi-access-points/${selectedWifiAP.id}`
                  : "/api/wifi-access-points"
                const method = selectedWifiAP ? "PUT" : "POST"

                const response = await fetch(url, {
                  method,
                  headers: { "Content-Type": "application/json" },
                  body: JSON.stringify({
                    technicalId: fullAgencyData.technical.id,
                    ...data,
                  }),
                })

                if (response.ok) {
                  await loadAgencyDetails(selectedAgency!.id)
                  setIsWifiAPDialogOpen(false)
                  setSelectedWifiAP(null)
                } else {
                  const error = await response.json()
                  showError(error.error || "Erreur lors de la sauvegarde")
                }
              } catch (error) {
                console.error("Error saving wifi AP:", error)
                showError("Erreur lors de la sauvegarde")
              }
            }}
            onCancel={() => {
              setIsWifiAPDialogOpen(false)
              setSelectedWifiAP(null)
            }}
          />
        </DialogContent>
      </Dialog>

      {/* Dialog Caméra */}
      <Dialog open={isCameraDialogOpen} onOpenChange={setIsCameraDialogOpen}>
        <DialogContent>
          <DialogTitle className="sr-only">Dialogue</DialogTitle>
          <DialogHeader>
            <DialogTitle>{selectedCamera ? "Modifier la caméra" : "Nouvelle caméra"}</DialogTitle>
          </DialogHeader>
          <CameraDialogForm
            camera={selectedCamera}
            technicalId={fullAgencyData?.technical?.id}
            onSave={async (data) => {
              if (!fullAgencyData?.technical) return
              try {
                const url = selectedCamera ? `/api/cameras/${selectedCamera.id}` : "/api/cameras"
                const method = selectedCamera ? "PUT" : "POST"

                const response = await fetch(url, {
                  method,
                  headers: { "Content-Type": "application/json" },
                  body: JSON.stringify({
                    technicalId: fullAgencyData.technical.id,
                    ...data,
                  }),
                })

                if (response.ok) {
                  await loadAgencyDetails(selectedAgency!.id)
                  setIsCameraDialogOpen(false)
                  setSelectedCamera(null)
                } else {
                  const error = await response.json()
                  showError(error.error || "Erreur lors de la sauvegarde")
                }
              } catch (error) {
                console.error("Error saving camera:", error)
                showError("Erreur lors de la sauvegarde")
              }
            }}
            onCancel={() => {
              setIsCameraDialogOpen(false)
              setSelectedCamera(null)
            }}
          />
        </DialogContent>
      </Dialog>

      {/* Dialog Champ dynamique */}
      <Dialog open={isDynamicFieldDialogOpen} onOpenChange={setIsDynamicFieldDialogOpen}>
        <DialogContent>
          <DialogTitle className="sr-only">Dialogue</DialogTitle>
          <DialogHeader>
            <DialogTitle>
              {selectedDynamicField ? "Modifier le champ" : "Nouveau champ dynamique"}
            </DialogTitle>
          </DialogHeader>
          <DynamicFieldDialogForm
            field={selectedDynamicField}
            technicalId={fullAgencyData?.technical?.id}
            maxOrder={
              fullAgencyData?.technical?.dynamicFields
                ? Math.max(...fullAgencyData.technical.dynamicFields.map((f) => f.order), 0)
                : 0
            }
            onSave={async (data) => {
              if (!fullAgencyData?.technical) return
              try {
                const url = selectedDynamicField
                  ? `/api/dynamic-fields/${selectedDynamicField.id}`
                  : "/api/dynamic-fields"
                const method = selectedDynamicField ? "PUT" : "POST"

                const response = await fetch(url, {
                  method,
                  headers: { "Content-Type": "application/json" },
                  body: JSON.stringify({
                    technicalId: fullAgencyData.technical.id,
                    ...data,
                  }),
                })

                if (response.ok) {
                  await loadAgencyDetails(selectedAgency!.id)
                  setIsDynamicFieldDialogOpen(false)
                  setSelectedDynamicField(null)
                } else {
                  const error = await response.json()
                  showError(error.error || "Erreur lors de la sauvegarde")
                }
              } catch (error) {
                console.error("Error saving dynamic field:", error)
                showError("Erreur lors de la sauvegarde")
              }
            }}
            onCancel={() => {
              setIsDynamicFieldDialogOpen(false)
              setSelectedDynamicField(null)
            }}
          />
        </DialogContent>
      </Dialog>

      {/* Dialog Historique Notes techniques */}
      <Dialog open={isNotesHistoryDialogOpen} onOpenChange={setIsNotesHistoryDialogOpen}>
        <DialogContent className="max-w-[95vw] sm:max-w-3xl max-h-[90vh] overflow-y-auto">
          <DialogTitle className="sr-only">Dialogue</DialogTitle>
          <DialogHeader>
            <DialogTitle>Historique des notes techniques</DialogTitle>
            <DialogDescription>
              Consultez et restaurez les versions précédentes des notes techniques (maximum 100 versions)
            </DialogDescription>
          </DialogHeader>
          <div className="overflow-y-auto max-h-[60vh] space-y-4">
            {loadingHistory ? (
              <div className="text-center py-8">Chargement...</div>
            ) : notesHistory.length === 0 ? (
              <div className="text-center py-8 text-muted-foreground">
                Aucun historique disponible
              </div>
            ) : (
              notesHistory.map((entry) => (
                <Card key={entry.id}>
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <div>
                        <CardTitle className="text-sm">
                          Version {entry.version}
                        </CardTitle>
                        <p className="text-xs text-muted-foreground mt-1">
                          Par {entry.user.login} le{" "}
                          {new Date(entry.createdAt).toLocaleString("fr-FR", {
                            day: "2-digit",
                            month: "2-digit",
                            year: "numeric",
                            hour: "2-digit",
                            minute: "2-digit",
                          })}
                        </p>
                      </div>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => {
                          if (!fullAgencyData?.technical?.id) return
                          openConfirm({
                            title: "Restaurer la version",
                            description: `Êtes-vous sûr de vouloir restaurer la version ${entry.version} ?`,
                            confirmLabel: "Restaurer",
                            variant: "default",
                            onConfirm: async () => {
                              setConfirmLoading(true)
                              try {
                                const response = await apiFetch(
                                  `/api/technical/${fullAgencyData!.technical!.id}/history/restore`,
                                  {
                                    method: "POST",
                                    body: JSON.stringify({ version: entry.version }),
                                  }
                                )
                                if (response.ok) {
                                  setIsNotesHistoryDialogOpen(false)
                                  if (selectedAgency) loadAgencyDetails(selectedAgency.id)
                                  toast({ title: "Version restaurée", variant: "success" })
                                } else {
                                  const error = await response.json()
                                  showError(error.error || "Erreur lors de la restauration")
                                }
                              } catch (error) {
                                console.error("Error restoring version:", error)
                                showError("Erreur lors de la restauration")
                              } finally {
                                setConfirmLoading(false)
                              }
                            },
                          })
                        }}
                      >
                        Restaurer
                      </Button>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="whitespace-pre-wrap text-sm">
                      {entry.notes || "Aucune note"}
                    </div>
                  </CardContent>
                </Card>
              ))
            )}
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsNotesHistoryDialogOpen(false)}>
              Fermer
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Dialog Historique Agences */}
      <Dialog open={isAgencyHistoryDialogOpen} onOpenChange={setIsAgencyHistoryDialogOpen}>
        <DialogContent className="max-w-[95vw] sm:max-w-3xl max-h-[90vh] overflow-y-auto">
          <DialogTitle className="sr-only">Dialogue</DialogTitle>
          <DialogHeader>
            <DialogTitle>Historique de l&apos;agence</DialogTitle>
            <DialogDescription>
              Consultez et restaurez les versions précédentes de l&apos;agence (maximum 100 versions)
            </DialogDescription>
          </DialogHeader>
          <div className="overflow-y-auto max-h-[60vh] space-y-4">
            {loadingAgencyHistory ? (
              <div className="text-center py-8">Chargement...</div>
            ) : agencyHistory.length === 0 ? (
              <div className="text-center py-8 text-muted-foreground">
                Aucun historique disponible
              </div>
            ) : (
              agencyHistory.map((entry) => {
                let agencyData: any = {}
                try {
                  agencyData = JSON.parse(entry.data)
                } catch (e) {
                  console.error("Error parsing agency data:", e)
                }
                return (
                  <Card key={entry.id}>
                    <CardHeader>
                      <div className="flex items-center justify-between">
                        <div>
                          <CardTitle className="text-sm">
                            Version {entry.version}
                          </CardTitle>
                          <p className="text-xs text-muted-foreground mt-1">
                            Par {entry.user.login} le{" "}
                            {new Date(entry.createdAt).toLocaleString("fr-FR", {
                              day: "2-digit",
                              month: "2-digit",
                              year: "numeric",
                              hour: "2-digit",
                              minute: "2-digit",
                            })}
                          </p>
                        </div>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => {
                            if (!selectedAgency) return
                            openConfirm({
                              title: "Restaurer la version de l'agence",
                              description: `Êtes-vous sûr de vouloir restaurer la version ${entry.version} ? Cette action est irréversible.`,
                              confirmLabel: "Restaurer",
                              variant: "default",
                              onConfirm: async () => {
                                setConfirmLoading(true)
                                try {
                                  const response = await apiFetch(
                                    `/api/agencies/${selectedAgency.id}/history/restore`,
                                    {
                                      method: "POST",
                                      body: JSON.stringify({ version: entry.version }),
                                    }
                                  )
                                  if (response.ok) {
                                    setIsAgencyHistoryDialogOpen(false)
                                    await loadAgencyDetails(selectedAgency.id)
                                    await loadAgencies()
                                    toast({ title: "Version restaurée", variant: "success" })
                                  } else {
                                    const error = await response.json()
                                    showError(error.error || "Erreur lors de la restauration")
                                  }
                                } catch (error) {
                                  console.error("Error restoring version:", error)
                                  showError("Erreur lors de la restauration")
                                } finally {
                                  setConfirmLoading(false)
                                }
                              },
                            })
                          }}
                        >
                          Restaurer
                        </Button>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4 text-sm">
                        {/* Informations générales */}
                        <div className="space-y-2">
                          <h4 className="font-semibold text-base mb-2">Informations générales</h4>
                          <div>
                            <span className="font-medium">Nom:</span> {agencyData.name || "N/A"}
                          </div>
                          {agencyData.photo && (
                            <div>
                              <span className="font-medium">Photo:</span> {agencyData.photo}
                            </div>
                          )}
                          <div>
                            <span className="font-medium">État:</span> {agencyData.state || "N/A"}
                          </div>
                          {agencyData.codeAgence && (
                            <div>
                              <span className="font-medium">Code Agence:</span> {agencyData.codeAgence}
                            </div>
                          )}
                          {agencyData.codeRayon && (
                            <div>
                              <span className="font-medium">Code Rayon:</span> {agencyData.codeRayon}
                            </div>
                          )}
                          {agencyData.dateOuverture && (
                            <div>
                              <span className="font-medium">Date ouverture:</span>{" "}
                              {new Date(agencyData.dateOuverture).toLocaleDateString("fr-FR")}
                            </div>
                          )}
                          {agencyData.dateFermeture && (
                            <div>
                              <span className="font-medium">Date fermeture:</span>{" "}
                              {new Date(agencyData.dateFermeture).toLocaleDateString("fr-FR")}
                            </div>
                          )}
                          {agencyData.validatedAt && (
                            <div>
                              <span className="font-medium">Validé le:</span>{" "}
                              {new Date(agencyData.validatedAt).toLocaleDateString("fr-FR")}
                            </div>
                          )}
                        </div>

                        {/* Adresses */}
                        {agencyData.addresses && Array.isArray(agencyData.addresses) && agencyData.addresses.length > 0 && (
                          <div className="space-y-2">
                            <h4 className="font-semibold text-base mb-2">Adresses ({agencyData.addresses.length})</h4>
                            {agencyData.addresses.map((addr: any, idx: number) => (
                              <div key={addr.id || idx} className="border-l-2 border-blue-200 pl-3 py-1">
                                <div className="font-medium">{addr.label || "Adresse"}</div>
                                <div className="text-muted-foreground">
                                  {addr.street && <div>{addr.street}</div>}
                                  {addr.city && addr.postalCode && (
                                    <div>{addr.postalCode} {addr.city}</div>
                                  )}
                                  {addr.country && (
                                    <div className="text-xs text-muted-foreground">{addr.country}</div>
                                  )}
                                  {addr.latitude && addr.longitude && (
                                    <div className="text-xs text-muted-foreground mt-1">
                                      Coordonnées: {addr.latitude}, {addr.longitude}
                                    </div>
                                  )}
                                  {addr.banId && (
                                    <div className="text-xs text-muted-foreground mt-1">
                                      BAN ID: {addr.banId}
                                    </div>
                                  )}
                                </div>
                              </div>
                            ))}
                          </div>
                        )}

                        {/* Contacts */}
                        {agencyData.contacts && Array.isArray(agencyData.contacts) && agencyData.contacts.length > 0 && (
                          <div className="space-y-2">
                            <h4 className="font-semibold text-base mb-2">Contacts ({agencyData.contacts.length})</h4>
                            {agencyData.contacts.map((contact: any, idx: number) => (
                              <div key={contact.id || idx} className="border-l-2 border-green-200 pl-3 py-1">
                                <div className="font-medium">{contact.managerName || "Contact"}</div>
                                {contact.postNumber && (
                                  <div className="text-muted-foreground">Poste: {contact.postNumber}</div>
                                )}
                                {contact.agentNumber && (
                                  <div className="text-muted-foreground">Agent: {contact.agentNumber}</div>
                                )}
                                {contact.directLine && (
                                  <div className="text-muted-foreground">Ligne directe: {contact.directLine}</div>
                                )}
                                {contact.emails && contact.emails.length > 0 && (
                                  <div className="text-muted-foreground">
                                    Emails: {Array.isArray(contact.emails) ? contact.emails.join(", ") : contact.emails}
                                  </div>
                                )}
                                {contact.note && (
                                  <div className="text-muted-foreground text-xs mt-1">Note: {contact.note}</div>
                                )}
                              </div>
                            ))}
                          </div>
                        )}

                        {/* Technique */}
                        {agencyData.technical && (
                          <div className="space-y-2">
                            <h4 className="font-semibold text-base mb-2">Technique</h4>
                            {agencyData.technical.networkIp && (
                              <div>
                                <span className="font-medium">Adresse IP LAN (CIDR):</span> {agencyData.technical.networkIp}
                              </div>
                            )}
                            {/* Machine à affranchir */}
                            {(agencyData.technical.machineBrand || agencyData.technical.machineModel || agencyData.technical.machineConnection || agencyData.technical.machineIp || agencyData.technical.machineMac) && (
                              <div className="border-l-2 border-orange-200 pl-3 py-2">
                                <div className="font-medium mb-1">Machine à affranchir</div>
                                {agencyData.technical.machineBrand && <div className="text-xs text-muted-foreground">Marque: {agencyData.technical.machineBrand}</div>}
                                {agencyData.technical.machineModel && <div className="text-xs text-muted-foreground">Modèle: {agencyData.technical.machineModel}</div>}
                                {agencyData.technical.machineConnection && <div className="text-xs text-muted-foreground">Connexion: {agencyData.technical.machineConnection}</div>}
                                {agencyData.technical.machineIp && <div className="text-xs text-muted-foreground">IP: {agencyData.technical.machineIp}</div>}
                                {agencyData.technical.machineMac && <div className="text-xs text-muted-foreground">MAC: {agencyData.technical.machineMac}</div>}
                              </div>
                            )}
                            {/* Routeur WiFi */}
                            {(agencyData.technical.wifiRouterBrand || agencyData.technical.wifiRouterModel || agencyData.technical.wifiRouterIp || agencyData.technical.wifiRouterSerial) && (
                              <div className="border-l-2 border-purple-200 pl-3 py-2">
                                <div className="font-medium mb-1">Routeur WiFi</div>
                                {agencyData.technical.wifiRouterBrand && <div className="text-xs text-muted-foreground">Marque: {agencyData.technical.wifiRouterBrand}</div>}
                                {agencyData.technical.wifiRouterModel && <div className="text-xs text-muted-foreground">Modèle: {agencyData.technical.wifiRouterModel}</div>}
                                {agencyData.technical.wifiRouterIp && <div className="text-xs text-muted-foreground">IP: {agencyData.technical.wifiRouterIp}</div>}
                                {agencyData.technical.wifiRouterSerial && <div className="text-xs text-muted-foreground">N° série: {agencyData.technical.wifiRouterSerial}</div>}
                              </div>
                            )}
                            {/* Routeur principal */}
                            {(agencyData.technical.mainRouterBrand || agencyData.technical.mainRouterModel || agencyData.technical.mainRouterIp || agencyData.technical.mainRouterSerial || agencyData.technical.mainRouterLinkType) && (
                              <div className="border-l-2 border-blue-200 pl-3 py-2">
                                <div className="font-medium mb-1">Routeur principal</div>
                                {agencyData.technical.mainRouterBrand && <div className="text-xs text-muted-foreground">Marque: {agencyData.technical.mainRouterBrand}</div>}
                                {agencyData.technical.mainRouterModel && <div className="text-xs text-muted-foreground">Modèle: {agencyData.technical.mainRouterModel}</div>}
                                {agencyData.technical.mainRouterIp && <div className="text-xs text-muted-foreground">IP: {agencyData.technical.mainRouterIp}</div>}
                                {agencyData.technical.mainRouterSerial && <div className="text-xs text-muted-foreground">N° série: {agencyData.technical.mainRouterSerial}</div>}
                                {agencyData.technical.mainRouterLinkType && <div className="text-xs text-muted-foreground">Type de liaison: {agencyData.technical.mainRouterLinkType}</div>}
                              </div>
                            )}
                            {/* Routeur secours */}
                            {(agencyData.technical.backupRouterBrand || agencyData.technical.backupRouterModel || agencyData.technical.backupRouterIp || agencyData.technical.backupRouterSerial) && (
                              <div className="border-l-2 border-yellow-200 pl-3 py-2">
                                <div className="font-medium mb-1">Routeur secours</div>
                                {agencyData.technical.backupRouterBrand && <div className="text-xs text-muted-foreground">Marque: {agencyData.technical.backupRouterBrand}</div>}
                                {agencyData.technical.backupRouterModel && <div className="text-xs text-muted-foreground">Modèle: {agencyData.technical.backupRouterModel}</div>}
                                {agencyData.technical.backupRouterIp && <div className="text-xs text-muted-foreground">IP: {agencyData.technical.backupRouterIp}</div>}
                                {agencyData.technical.backupRouterSerial && <div className="text-xs text-muted-foreground">N° série: {agencyData.technical.backupRouterSerial}</div>}
                              </div>
                            )}
                            {/* Enregistreur vidéo */}
                            {(agencyData.technical.recorderBrand || agencyData.technical.recorderModel || agencyData.technical.recorderSerial || agencyData.technical.recorderMac || agencyData.technical.recorderIp || agencyData.technical.recorderStorage) && (
                              <div className="border-l-2 border-red-200 pl-3 py-2">
                                <div className="font-medium mb-1">Enregistreur vidéo</div>
                                {agencyData.technical.recorderBrand && <div className="text-xs text-muted-foreground">Marque: {agencyData.technical.recorderBrand}</div>}
                                {agencyData.technical.recorderModel && <div className="text-xs text-muted-foreground">Modèle: {agencyData.technical.recorderModel}</div>}
                                {agencyData.technical.recorderSerial && <div className="text-xs text-muted-foreground">N° série: {agencyData.technical.recorderSerial}</div>}
                                {agencyData.technical.recorderMac && <div className="text-xs text-muted-foreground">MAC: {agencyData.technical.recorderMac}</div>}
                                {agencyData.technical.recorderIp && <div className="text-xs text-muted-foreground">IP: {agencyData.technical.recorderIp}</div>}
                                {agencyData.technical.recorderStorage && <div className="text-xs text-muted-foreground">Stockage: {agencyData.technical.recorderStorage}</div>}
                              </div>
                            )}
                            {agencyData.technical.technicalNotes && (
                              <div>
                                <span className="font-medium">Notes techniques:</span>
                                <div className="text-muted-foreground whitespace-pre-wrap mt-1 p-2 bg-muted rounded">
                                  {agencyData.technical.technicalNotes}
                                </div>
                              </div>
                            )}
                            {agencyData.technical.pcs && Array.isArray(agencyData.technical.pcs) && agencyData.technical.pcs.length > 0 && (
                              <div>
                                <span className="font-medium">PCs ({agencyData.technical.pcs.length}):</span>
                                <div className="ml-4 mt-1 space-y-2">
                                  {agencyData.technical.pcs.map((pc: any, idx: number) => (
                                    <div key={pc.id || idx} className="text-muted-foreground border-l-2 border-gray-200 pl-2">
                                      <div className="font-medium">• {pc.name || "PC"}</div>
                                      {pc.ip && <div className="text-xs ml-2">IP: {pc.ip}</div>}
                                      {pc.mac && <div className="text-xs ml-2">MAC: {pc.mac}</div>}
                                      {pc.brand && <div className="text-xs ml-2">Marque: {pc.brand}</div>}
                                      {pc.model && <div className="text-xs ml-2">Modèle: {pc.model}</div>}
                                      {pc.serialNumber && <div className="text-xs ml-2">N° série: {pc.serialNumber}</div>}
                                      {pc.purchaseDate && <div className="text-xs ml-2">Achat: {new Date(pc.purchaseDate).toLocaleDateString("fr-FR")}</div>}
                                      {pc.warrantyDate && <div className="text-xs ml-2">Garantie: {new Date(pc.warrantyDate).toLocaleDateString("fr-FR")}</div>}
                                    </div>
                                  ))}
                                </div>
                              </div>
                            )}
                            {agencyData.technical.printers && Array.isArray(agencyData.technical.printers) && agencyData.technical.printers.length > 0 && (
                              <div>
                                <span className="font-medium">Imprimantes ({agencyData.technical.printers.length}):</span>
                                <div className="ml-4 mt-1 space-y-2">
                                  {agencyData.technical.printers.map((printer: any, idx: number) => (
                                    <div key={printer.id || idx} className="text-muted-foreground border-l-2 border-gray-200 pl-2">
                                      <div className="font-medium">• {printer.name || "Imprimante"}</div>
                                      {printer.ip && <div className="text-xs ml-2">IP: {printer.ip}</div>}
                                      {printer.mac && <div className="text-xs ml-2">MAC: {printer.mac}</div>}
                                      {printer.brand && <div className="text-xs ml-2">Marque: {printer.brand}</div>}
                                      {printer.model && <div className="text-xs ml-2">Modèle: {printer.model}</div>}
                                      {printer.serialNumber && <div className="text-xs ml-2">N° série: {printer.serialNumber}</div>}
                                      {printer.purchaseDate && <div className="text-xs ml-2">Achat: {new Date(printer.purchaseDate).toLocaleDateString("fr-FR")}</div>}
                                      {printer.warrantyDate && <div className="text-xs ml-2">Garantie: {new Date(printer.warrantyDate).toLocaleDateString("fr-FR")}</div>}
                                    </div>
                                  ))}
                                </div>
                              </div>
                            )}
                            {agencyData.technical.wifiAccessPoints && Array.isArray(agencyData.technical.wifiAccessPoints) && agencyData.technical.wifiAccessPoints.length > 0 && (
                              <div>
                                <span className="font-medium">Points d'accès WiFi ({agencyData.technical.wifiAccessPoints.length}):</span>
                                <div className="ml-4 mt-1 space-y-2">
                                  {agencyData.technical.wifiAccessPoints.map((ap: any, idx: number) => (
                                    <div key={ap.id || idx} className="text-muted-foreground border-l-2 border-gray-200 pl-2">
                                      <div className="font-medium">• Point d'accès {idx + 1}</div>
                                      {ap.brand && <div className="text-xs ml-2">Marque: {ap.brand}</div>}
                                      {ap.model && <div className="text-xs ml-2">Modèle: {ap.model}</div>}
                                      {ap.ip && <div className="text-xs ml-2">IP: {ap.ip}</div>}
                                      {ap.ssid && <div className="text-xs ml-2">SSID: {ap.ssid}</div>}
                                      {ap.serialNumber && <div className="text-xs ml-2">N° série: {ap.serialNumber}</div>}
                                    </div>
                                  ))}
                                </div>
                              </div>
                            )}
                            {agencyData.technical.cameras && Array.isArray(agencyData.technical.cameras) && agencyData.technical.cameras.length > 0 && (
                              <div>
                                <span className="font-medium">Caméras ({agencyData.technical.cameras.length}):</span>
                                <div className="ml-4 mt-1 space-y-2">
                                  {agencyData.technical.cameras.map((camera: any, idx: number) => (
                                    <div key={camera.id || idx} className="text-muted-foreground border-l-2 border-gray-200 pl-2">
                                      <div className="font-medium">• Caméra {idx + 1}</div>
                                      {camera.brand && <div className="text-xs ml-2">Marque: {camera.brand}</div>}
                                      {camera.model && <div className="text-xs ml-2">Modèle: {camera.model}</div>}
                                      {camera.type && <div className="text-xs ml-2">Type: {camera.type}</div>}
                                      {camera.ip && <div className="text-xs ml-2">IP: {camera.ip}</div>}
                                    </div>
                                  ))}
                                </div>
                              </div>
                            )}
                            {agencyData.technical.dynamicFields && Array.isArray(agencyData.technical.dynamicFields) && agencyData.technical.dynamicFields.length > 0 && (
                              <div>
                                <span className="font-medium">Champs dynamiques ({agencyData.technical.dynamicFields.length}):</span>
                                <div className="ml-4 mt-1 space-y-1">
                                  {agencyData.technical.dynamicFields.map((field: any, idx: number) => (
                                    <div key={field.id || idx} className="text-muted-foreground">
                                      • {field.label || "Champ"}: {field.value || "N/A"}
                                    </div>
                                  ))}
                                </div>
                              </div>
                            )}
                          </div>
                        )}

                        {/* Photos */}
                        {agencyData.photos && Array.isArray(agencyData.photos) && agencyData.photos.length > 0 && (
                          <div className="space-y-2">
                            <h4 className="font-semibold text-base mb-2">Groupes de photos ({agencyData.photos.length})</h4>
                            {agencyData.photos.map((photoGroup: any, idx: number) => {
                              let photosCount = 0
                              try {
                                const photos = JSON.parse(photoGroup.photos || "[]")
                                photosCount = Array.isArray(photos) ? photos.length : 0
                              } catch {
                                photosCount = 0
                              }
                              return (
                                <div key={photoGroup.id || idx} className="border-l-2 border-purple-200 pl-3 py-1">
                                  <div className="font-medium">
                                    {photoGroup.type || "Type inconnu"}
                                    {photoGroup.title && ` - ${photoGroup.title}`}
                                  </div>
                                  <div className="text-muted-foreground text-xs">
                                    {photosCount} photo{photosCount > 1 ? "s" : ""}
                                  </div>
                                </div>
                              )
                            })}
                          </div>
                        )}
                      </div>
                    </CardContent>
                  </Card>
                )
              })
            )}
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsAgencyHistoryDialogOpen(false)}>
              Fermer
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <Dialog open={showDirtyDialog} onOpenChange={setShowDirtyDialog}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2 text-amber-600">
              <AlertCircle className="h-5 w-5" />
              Modifications non sauvegardées
            </DialogTitle>
            <DialogDescription>
              Vous avez des modifications en cours qui seront perdues si vous changez d'agence.
            </DialogDescription>
          </DialogHeader>
          <div className="py-4 text-sm text-foreground">
            Voulez-vous abandonner ces modifications et changer d'agence ?
          </div>
          <DialogFooter className="gap-2 sm:gap-0">
            <Button variant="outline" onClick={() => setShowDirtyDialog(false)}>
              Annuler
            </Button>
            <Button
              variant="default"
              className="bg-amber-600 hover:bg-amber-700"
              onClick={() => {
                setShowDirtyDialog(false)
                if (pendingAgencyToSelect) {
                  startTransition(() => {
                    setSelectedAgency(pendingAgencyToSelect)
                    setEditing(false)
                    setEditingTechnical(false)
                    setTechnicalData({})
                    setEditedCodeAgence("")
                    setEditedCodeRayon("")
                    setEditedDateOuverture("")
                    setEditedDateFermeture("")
                  })
                  if (isMobile) {
                    setShowDetailsOnMobile(true)
                    loadAgencyDetails(pendingAgencyToSelect.id)
                  }
                  setPendingAgencyToSelect(null)
                }
              }}
            >
              Abandonner les modifications
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <ConfirmDialog
        open={confirmState.open}
        onOpenChange={(open) => !open && setConfirmState((p) => ({ ...p, open: false }))}
        title={confirmState.title}
        description={confirmState.description}
        confirmLabel={confirmState.confirmLabel}
        variant={confirmState.variant}
        onConfirm={confirmState.onConfirm}
        loading={confirmLoading}
      />
    </>
  )
}

// Composants de formulaires pour les dialogs
function PCDialogForm({
  pc,
  onSave,
  onCancel,
}: {
  pc: PC | null
  onSave: (data: any) => void
  onCancel: () => void
}) {
  const [formData, setFormData] = useState({
    name: pc?.name || "",
    ip: pc?.ip || "",
    mac: pc?.mac || "",
    serialNumber: pc?.serialNumber || "",
    brand: pc?.brand || "",
    model: pc?.model || "",
    purchaseDate: pc?.purchaseDate || "",
    warrantyDate: pc?.warrantyDate || "",
  })

  return (
    <div className="space-y-4 py-4">
      <div className="space-y-2">
        <Label>Nom *</Label>
        <Input
          value={formData.name}
          onChange={(e) => setFormData((prev) => ({ ...prev, name: e.target.value }))}
          required
        />
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label>IP</Label>
          <Input
            value={formData.ip}
            onChange={(e) => setFormData((prev) => ({ ...prev, ip: e.target.value }))}
          />
        </div>
        <div className="space-y-2">
          <Label>MAC</Label>
          <Input
            value={formData.mac}
            onChange={(e) => setFormData((prev) => ({ ...prev, mac: e.target.value }))}
          />
        </div>
        <div className="space-y-2">
          <Label>N° série</Label>
          <Input
            value={formData.serialNumber}
            onChange={(e) => setFormData((prev) => ({ ...prev, serialNumber: e.target.value }))}
          />
        </div>
        <div className="space-y-2">
          <Label>Marque</Label>
          <Input
            value={formData.brand}
            onChange={(e) => setFormData((prev) => ({ ...prev, brand: e.target.value }))}
          />
        </div>
        <div className="space-y-2">
          <Label>Modèle</Label>
          <Input
            value={formData.model}
            onChange={(e) => setFormData((prev) => ({ ...prev, model: e.target.value }))}
          />
        </div>
        <div className="space-y-2">
          <Label>Date achat</Label>
          <Input
            type="date"
            value={formData.purchaseDate}
            onChange={(e) => setFormData((prev) => ({ ...prev, purchaseDate: e.target.value }))}
          />
        </div>
        <div className="space-y-2">
          <Label>Date garantie</Label>
          <Input
            type="date"
            value={formData.warrantyDate}
            onChange={(e) => setFormData((prev) => ({ ...prev, warrantyDate: e.target.value }))}
          />
        </div>
      </div>
      <DialogFooter>
        <Button variant="outline" onClick={onCancel}>
          Annuler
        </Button>
        <Button onClick={() => onSave(formData)} disabled={!formData.name}>
          Enregistrer
        </Button>
      </DialogFooter>
    </div>
  )
}

function PrinterDialogForm({
  printer,
  onSave,
  onCancel,
}: {
  printer: Printer | null
  onSave: (data: any) => void
  onCancel: () => void
}) {
  const [formData, setFormData] = useState({
    name: printer?.name || "",
    ip: printer?.ip || "",
    mac: printer?.mac || "",
    serialNumber: printer?.serialNumber || "",
    brand: printer?.brand || "",
    model: printer?.model || "",
    purchaseDate: printer?.purchaseDate || "",
    warrantyDate: printer?.warrantyDate || "",
  })

  return (
    <div className="space-y-4 py-4">
      <div className="space-y-2">
        <Label>Nom *</Label>
        <Input
          value={formData.name}
          onChange={(e) => setFormData((prev) => ({ ...prev, name: e.target.value }))}
          required
        />
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label>IP</Label>
          <Input
            value={formData.ip}
            onChange={(e) => setFormData((prev) => ({ ...prev, ip: e.target.value }))}
          />
        </div>
        <div className="space-y-2">
          <Label>MAC</Label>
          <Input
            value={formData.mac}
            onChange={(e) => setFormData((prev) => ({ ...prev, mac: e.target.value }))}
          />
        </div>
        <div className="space-y-2">
          <Label>N° série</Label>
          <Input
            value={formData.serialNumber}
            onChange={(e) => setFormData((prev) => ({ ...prev, serialNumber: e.target.value }))}
          />
        </div>
        <div className="space-y-2">
          <Label>Marque</Label>
          <Input
            value={formData.brand}
            onChange={(e) => setFormData((prev) => ({ ...prev, brand: e.target.value }))}
          />
        </div>
        <div className="space-y-2">
          <Label>Modèle</Label>
          <Input
            value={formData.model}
            onChange={(e) => setFormData((prev) => ({ ...prev, model: e.target.value }))}
          />
        </div>
        <div className="space-y-2">
          <Label>Date achat</Label>
          <Input
            type="date"
            value={formData.purchaseDate}
            onChange={(e) => setFormData((prev) => ({ ...prev, purchaseDate: e.target.value }))}
          />
        </div>
        <div className="space-y-2">
          <Label>Date garantie</Label>
          <Input
            type="date"
            value={formData.warrantyDate}
            onChange={(e) => setFormData((prev) => ({ ...prev, warrantyDate: e.target.value }))}
          />
        </div>
      </div>
      <DialogFooter>
        <Button variant="outline" onClick={onCancel}>
          Annuler
        </Button>
        <Button onClick={() => onSave(formData)} disabled={!formData.name}>
          Enregistrer
        </Button>
      </DialogFooter>
    </div>
  )
}

function WifiAPDialogForm({
  wifiAP,
  technicalId,
  onSave,
  onCancel,
}: {
  wifiAP: WifiAccessPoint | null
  technicalId?: string
  onSave: (data: any) => void
  onCancel: () => void
}) {
  const [formData, setFormData] = useState({
    brand: wifiAP?.brand || "",
    model: wifiAP?.model || "",
    ip: wifiAP?.ip || "",
    serialNumber: wifiAP?.serialNumber || "",
    ssid: wifiAP?.ssid || "",
    password: "",
  })

  return (
    <div className="space-y-4 py-4">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label>Marque</Label>
          <Input
            value={formData.brand}
            onChange={(e) => setFormData((prev) => ({ ...prev, brand: e.target.value }))}
          />
        </div>
        <div className="space-y-2">
          <Label>Modèle</Label>
          <Input
            value={formData.model}
            onChange={(e) => setFormData((prev) => ({ ...prev, model: e.target.value }))}
          />
        </div>
        <div className="space-y-2">
          <Label>IP</Label>
          <Input
            value={formData.ip}
            onChange={(e) => setFormData((prev) => ({ ...prev, ip: e.target.value }))}
          />
        </div>
        <div className="space-y-2">
          <Label>N° série</Label>
          <Input
            value={formData.serialNumber}
            onChange={(e) => setFormData((prev) => ({ ...prev, serialNumber: e.target.value }))}
          />
        </div>
        <div className="space-y-2">
          <Label>Nom SSID</Label>
          <Input
            value={formData.ssid}
            onChange={(e) => setFormData((prev) => ({ ...prev, ssid: e.target.value }))}
          />
        </div>
        <div className="space-y-2">
          <Label>Mot de passe</Label>
          <Input
            type="password"
            value={formData.password}
            onChange={(e) => setFormData((prev) => ({ ...prev, password: e.target.value }))}
            placeholder={wifiAP ? "Laisser vide pour ne pas modifier" : ""}
          />
        </div>
      </div>
      <DialogFooter>
        <Button variant="outline" onClick={onCancel}>
          Annuler
        </Button>
        <Button onClick={() => onSave(formData)}>Enregistrer</Button>
      </DialogFooter>
    </div>
  )
}

function CameraDialogForm({
  camera,
  technicalId,
  onSave,
  onCancel,
}: {
  camera: Camera | null
  technicalId?: string
  onSave: (data: any) => void
  onCancel: () => void
}) {
  const [formData, setFormData] = useState({
    brand: camera?.brand || "",
    model: camera?.model || "",
    type: camera?.type || "",
    ip: camera?.ip || "",
  })

  return (
    <div className="space-y-4 py-4">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label>Marque</Label>
          <Input
            value={formData.brand}
            onChange={(e) => setFormData((prev) => ({ ...prev, brand: e.target.value }))}
          />
        </div>
        <div className="space-y-2">
          <Label>Modèle</Label>
          <Input
            value={formData.model}
            onChange={(e) => setFormData((prev) => ({ ...prev, model: e.target.value }))}
          />
        </div>
        <div className="space-y-2">
          <Label>Type</Label>
          <Input
            value={formData.type}
            onChange={(e) => setFormData((prev) => ({ ...prev, type: e.target.value }))}
          />
        </div>
        <div className="space-y-2">
          <Label>IP (si applicable)</Label>
          <Input
            value={formData.ip}
            onChange={(e) => setFormData((prev) => ({ ...prev, ip: e.target.value }))}
          />
        </div>
      </div>
      <DialogFooter>
        <Button variant="outline" onClick={onCancel}>
          Annuler
        </Button>
        <Button onClick={() => onSave(formData)}>Enregistrer</Button>
      </DialogFooter>
    </div>
  )
}

function DynamicFieldDialogForm({
  field,
  technicalId,
  maxOrder,
  onSave,
  onCancel,
}: {
  field: DynamicField | null
  technicalId?: string
  maxOrder: number
  onSave: (data: any) => void
  onCancel: () => void
}) {
  const [formData, setFormData] = useState({
    key: field?.key || "",
    value: field?.value || "",
    order: field?.order ?? maxOrder + 1,
  })

  return (
    <div className="space-y-4 py-4">
      <div className="space-y-2">
        <Label>Clé *</Label>
        <Input
          value={formData.key}
          onChange={(e) => setFormData((prev) => ({ ...prev, key: e.target.value }))}
          required
        />
      </div>
      <div className="space-y-2">
        <Label>Valeur *</Label>
        <Input
          value={formData.value}
          onChange={(e) => setFormData((prev) => ({ ...prev, value: e.target.value }))}
          required
        />
      </div>
      <div className="space-y-2">
        <Label>Ordre</Label>
        <Input
          type="number"
          value={formData.order}
          onChange={(e) => setFormData((prev) => ({ ...prev, order: parseInt(e.target.value) || 0 }))}
        />
      </div>
      <DialogFooter>
        <Button variant="outline" onClick={onCancel}>
          Annuler
        </Button>
        <Button onClick={() => onSave(formData)} disabled={!formData.key || formData.value === undefined}>
          Enregistrer
        </Button>
      </DialogFooter>
    </div>
  )
}
