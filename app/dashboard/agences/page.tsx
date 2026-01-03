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
import { Plus, Save, MapPin, Mail, Phone, User, Settings, Camera, Edit, Trash2, X, ChevronLeft, ChevronRight, Eye, EyeOff, Clock, ChevronUp, ChevronDown, ArrowLeft, GripVertical, FileText, CheckCircle, ListTodo } from "lucide-react"
import { Search } from "lucide-react"
import { AddressSearch } from "@/components/address-search"
import { apiFetch } from "@/lib/api-client"
import { fetchCSRFToken, setCSRFToken } from "@/lib/csrf-client"

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

interface Contact {
  id: string
  postNumber: string
  agentNumber: string
  directLine: string
  emails: string
  managerName: string
  note?: string
  order?: number
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

interface Task {
  id: string
  agencyId: string
  title: string
  createdAt: string
  createdBy: string
  closedAt: string | null
  closedBy: string | null
  notes: string
  importance: "URGENT" | "CRITIQUE" | "INFO"
  creator: {
    id: string
    login: string
  }
  closer: {
    id: string
    login: string
  } | null
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
  const [editing, setEditing] = useState(false)
  const [editedName, setEditedName] = useState("")
  const [editedState, setEditedState] = useState<"OK" | "ALERTE" | "INFO" | "FERMÉE">("ALERTE")
  const [editedCodeAgence, setEditedCodeAgence] = useState("")
  const [editedCodeRayon, setEditedCodeRayon] = useState("")
  const [editedDateOuverture, setEditedDateOuverture] = useState("")
  const [editedDateFermeture, setEditedDateFermeture] = useState("")
  const [userRole, setUserRole] = useState<string | null>(null)
  
  // États pour adresses
  const [isAddressDialogOpen, setIsAddressDialogOpen] = useState(false)
  const [selectedAddress, setSelectedAddress] = useState<Address | null>(null)
  const [addressLabel, setAddressLabel] = useState("")
  const [selectedBANAddress, setSelectedBANAddress] = useState<any>(null)
  const [addressMode, setAddressMode] = useState<"ban" | "manual">("ban")
  const [manualStreet, setManualStreet] = useState("")
  const [manualCity, setManualCity] = useState("")
  const [manualPostalCode, setManualPostalCode] = useState("")
  
  // États pour contacts
  const [isContactDialogOpen, setIsContactDialogOpen] = useState(false)
  const [selectedContact, setSelectedContact] = useState<Contact | null>(null)
  const [contactPostNumber, setContactPostNumber] = useState("")
  const [contactAgentNumber, setContactAgentNumber] = useState("")
  const [contactDirectLine, setContactDirectLine] = useState("")
  const [contactEmails, setContactEmails] = useState<string[]>([])
  const [contactEmailInput, setContactEmailInput] = useState("")
  const [contactManagerName, setContactManagerName] = useState("")
  const [contactNote, setContactNote] = useState("")
  
  // États pour photos
  const [isPhotoDialogOpen, setIsPhotoDialogOpen] = useState(false)
  const [selectedPhotoGroup, setSelectedPhotoGroup] = useState<PhotoGroup | null>(null)
  const [photoGroupType, setPhotoGroupType] = useState("")
  const [photoGroupTitle, setPhotoGroupTitle] = useState("")
  const [selectedPhotoTypeTab, setSelectedPhotoTypeTab] = useState<string>("")
  const [photoFiles, setPhotoFiles] = useState<File[]>([])
  const [photoSearch, setPhotoSearch] = useState("")
  
  // États pour l'édition du titre d'une photo individuelle
  const [isEditPhotoTitleDialogOpen, setIsEditPhotoTitleDialogOpen] = useState(false)
  const [editingPhotoUrl, setEditingPhotoUrl] = useState("")
  const [editingPhotoGroupId, setEditingPhotoGroupId] = useState("")
  const [editingPhotoTitle, setEditingPhotoTitle] = useState("")
  const [editingPhotoCreatedAt, setEditingPhotoCreatedAt] = useState("")

  // États pour la lightbox
  const [lightboxOpen, setLightboxOpen] = useState(false)
  const [lightboxPhotos, setLightboxPhotos] = useState<Array<{ url: string; title?: string; createdAt?: string | null; type: string }>>([])
  const [lightboxCurrentIndex, setLightboxCurrentIndex] = useState(0)
  const [zoomLevel, setZoomLevel] = useState(1)
  const [zoomPosition, setZoomPosition] = useState({ x: 0, y: 0 })
  const [isDragging, setIsDragging] = useState(false)
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 })
  const [hasDragged, setHasDragged] = useState(false)
  const [touchStartDistance, setTouchStartDistance] = useState(0)
  const [touchStartZoom, setTouchStartZoom] = useState(1)

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
  
  // États pour les tâches
  const [tasks, setTasks] = useState<Task[]>([])
  const [loadingTasks, setLoadingTasks] = useState(false)
  const [isTaskDialogOpen, setIsTaskDialogOpen] = useState(false)
  const [isTaskEditDialogOpen, setIsTaskEditDialogOpen] = useState(false)
  const [editingTask, setEditingTask] = useState<Task | null>(null)
  const [taskFormData, setTaskFormData] = useState({
    title: "",
    createdAt: "",
    notes: "",
    importance: "INFO" as "URGENT" | "CRITIQUE" | "INFO",
  })
  const [taskFilter, setTaskFilter] = useState<"ALL" | "URGENT" | "CRITIQUE" | "INFO">("ALL")
  const [expandedTaskNotes, setExpandedTaskNotes] = useState<Record<string, boolean>>({})
  const [expandedContactNotes, setExpandedContactNotes] = useState<Record<string, boolean>>({})

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

  // Synchroniser la ref avec l'état selectedAgency
  useEffect(() => {
    selectedAgencyRef.current = selectedAgency
  }, [selectedAgency])

  // Récupération du rôle utilisateur et du token CSRF (prioritaire)
  useEffect(() => {
    if (!isMounted) return

    const fetchUserRole = async () => {
      try {
        // Récupérer le token CSRF en premier pour éviter les erreurs 403
        const response = await apiFetch("/api/auth/me")
        if (response.ok) {
          const data = await response.json()
          setUserRole(data.role)
          
          // Stocker le token CSRF si disponible (prioritaire)
          if (data.csrfToken) {
            setCSRFToken(data.csrfToken)
            console.log("[AGENCES] Token CSRF récupéré et stocké")
          } else {
            console.warn("[AGENCES] Aucun token CSRF reçu de /api/auth/me")
          }
        }
      } catch (error) {
        console.error("Error fetching user role:", error)
      }
    }

    // Exécuter fetchUserRole en premier, puis loadAgencies
    fetchUserRole().then(() => {
      loadAgencies()
    })
  }, [loadAgencies, isMounted])

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
    setPhotoSearch("")
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
      
      // Charger les tâches
      if (agencyId) {
        await loadTasks(agencyId)
      }
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
        alert(error.error || "Erreur lors de la création")
        return
      }

      const newAgency = await response.json()
      setAgencies([...agencies, newAgency])
      setSelectedAgency(newAgency)
      setIsCreateDialogOpen(false)
      setNewAgencyName("")
      
      // Déclencher le rafraîchissement des statistiques
      window.dispatchEvent(new CustomEvent('agencyStatsRefresh'))
    } catch (error) {
      console.error("Error creating agency:", error)
      alert("Erreur lors de la création de l'agence")
    } finally {
      setCreating(false)
    }
  }

  const handleSaveAgency = async () => {
    if (!selectedAgency || !editedName.trim()) {
      return
    }

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
        alert(errorMessage)
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
              alert("L'agence a été sauvegardée mais une erreur est survenue lors de la sauvegarde des données techniques")
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
              alert("L'agence a été sauvegardée mais une erreur est survenue lors de la création des données techniques")
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
          // Ne pas bloquer la sauvegarde de l'agence si la sauvegarde technique échoue
          alert("L'agence a été sauvegardée mais une erreur est survenue lors de la sauvegarde des données techniques")
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
    } catch (error) {
      console.error("Error saving agency:", error)
      alert("Erreur lors de la sauvegarde")
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

  const handleDeleteAgency = async (agencyId: string, agencyName: string) => {
    if (!confirm(`Êtes-vous sûr de vouloir supprimer l'agence "${agencyName}" ?`)) {
      return
    }

    try {
      const response = await apiFetch(`/api/agencies/${agencyId}`, {
        method: "DELETE",
      })

      if (response.ok) {
        // Retirer l'agence de la liste
        setAgencies(agencies.filter((a) => a.id !== agencyId))
        
        // Si l'agence supprimée était sélectionnée, sélectionner la première disponible
        if (selectedAgency?.id === agencyId) {
          const remainingAgencies = agencies.filter((a) => a.id !== agencyId)
          if (remainingAgencies.length > 0) {
            setSelectedAgency(remainingAgencies[0])
          } else {
            setSelectedAgency(null)
            setFullAgencyData(null)
          }
        }
        
        // Déclencher le rafraîchissement des statistiques
        window.dispatchEvent(new CustomEvent('agencyStatsRefresh'))
      } else {
        const error = await response.json()
        alert(error.error || "Erreur lors de la suppression")
      }
    } catch (error) {
      console.error("Error deleting agency:", error)
      alert("Erreur lors de la suppression")
    }
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

  // Fonctions pour adresses
  const handleAddAddress = () => {
    setSelectedAddress(null)
    setAddressLabel("")
    setSelectedBANAddress(null)
    setAddressMode("ban")
    setManualStreet("")
    setManualCity("")
    setManualPostalCode("")
    setIsAddressDialogOpen(true)
  }

  const handleEditAddress = (address: Address) => {
    setSelectedAddress(address)
    setAddressLabel(address.label)
    setSelectedBANAddress({
      label: address.label,
      street: address.street,
      city: address.city,
      postalCode: address.postalCode,
      latitude: address.latitude,
      longitude: address.longitude,
    })
    setAddressMode("manual") // En mode édition, on affiche les champs manuels
    setManualStreet(address.street)
    setManualCity(address.city)
    setManualPostalCode(address.postalCode)
    setIsAddressDialogOpen(true)
  }

  const handleDeleteAddress = async (addressId: string) => {
    if (!confirm("Êtes-vous sûr de vouloir supprimer cette adresse ?")) return

    try {
      const response = await apiFetch(`/api/addresses/${addressId}`, {
        method: "DELETE",
      })

      if (response.ok) {
        await loadAgencyDetails(selectedAgency!.id)
      } else {
        alert("Erreur lors de la suppression")
      }
    } catch (error) {
      console.error("Error deleting address:", error)
      alert("Erreur lors de la suppression")
    }
  }

  const handleSaveAddress = async () => {
    if (!selectedAgency || !addressLabel.trim()) {
      alert("Veuillez saisir un label")
      return
    }

    // Validation selon le mode
    if (addressMode === "ban") {
      if (!selectedBANAddress) {
        alert("Veuillez sélectionner une adresse via l'API BAN")
        return
      }
    } else {
      if (!manualStreet.trim() || !manualCity.trim() || !manualPostalCode.trim()) {
        alert("Veuillez remplir tous les champs de l'adresse (rue, ville, code postal)")
        return
      }
    }

    try {
      let latitude: number | null = null
      let longitude: number | null = null

      // Si mode manuel, géocoder l'adresse pour obtenir les coordonnées GPS
      if (addressMode === "manual") {
        try {
          // Construire la requête de géocodage avec l'adresse complète
          const geocodeQuery = `${manualStreet.trim()}, ${manualPostalCode.trim()} ${manualCity.trim()}`
          const geocodeResponse = await fetch(`/api/ban/search?q=${encodeURIComponent(geocodeQuery)}&limit=1`)
          
          if (geocodeResponse.ok) {
            const geocodeData = await geocodeResponse.json()
            if (geocodeData.features && geocodeData.features.length > 0) {
              const feature = geocodeData.features[0]
              latitude = feature.geometry.coordinates[1]
              longitude = feature.geometry.coordinates[0]
            }
          }
        } catch (error) {
          console.error("Error geocoding address:", error)
          // On continue même si le géocodage échoue
        }
      }

      const addressData: {
        agencyId: string
        label: string
        street: string
        city: string
        postalCode: string
        latitude: number | null
        longitude: number | null
        banId?: string | null
        country?: string
      } = {
        agencyId: selectedAgency.id,
        label: addressLabel,
        street: addressMode === "ban" ? (selectedBANAddress.street || "") : manualStreet.trim(),
        city: addressMode === "ban" ? selectedBANAddress.city : manualCity.trim(),
        postalCode: addressMode === "ban" ? selectedBANAddress.postalCode : manualPostalCode.trim(),
        latitude: addressMode === "ban" ? selectedBANAddress.latitude : latitude,
        longitude: addressMode === "ban" ? selectedBANAddress.longitude : longitude,
        banId: addressMode === "ban" ? (selectedBANAddress.id || null) : null,
        country: "France",
      }

      const url = selectedAddress
        ? `/api/addresses/${selectedAddress.id}`
        : "/api/addresses"
      const method = selectedAddress ? "PUT" : "POST"

      const response = await apiFetch(url, {
        method,
        body: JSON.stringify(addressData),
      })

      if (!response.ok) {
        const error = await response.json()
        alert(error.error || "Erreur lors de la sauvegarde de l'adresse")
        return
      }

      await loadAgencyDetails(selectedAgency.id)
      setIsAddressDialogOpen(false)
      setSelectedAddress(null)
      setAddressLabel("")
      setSelectedBANAddress(null)
      setAddressMode("ban")
      setManualStreet("")
      setManualCity("")
      setManualPostalCode("")
    } catch (error) {
      console.error("Error saving address:", error)
      alert("Erreur lors de la sauvegarde")
    }
  }

  // Fonctions pour contacts
  const handleAddContact = () => {
    setSelectedContact(null)
    setContactPostNumber("")
    setContactAgentNumber("")
    setContactDirectLine("")
    setContactEmails([])
    setContactEmailInput("")
    setContactManagerName("")
    setContactNote("")
    setIsContactDialogOpen(true)
  }

  const handleEditContact = (contact: Contact) => {
    setSelectedContact(contact)
    setContactPostNumber(contact.postNumber)
    setContactAgentNumber(contact.agentNumber)
    setContactDirectLine(contact.directLine)
    setContactEmails(JSON.parse(contact.emails || "[]"))
    setContactEmailInput("")
    setContactManagerName(contact.managerName)
    setContactNote(contact.note || "")
    setIsContactDialogOpen(true)
  }

  const handleDeleteContact = async (contactId: string) => {
    if (!confirm("Êtes-vous sûr de vouloir supprimer ce contact ?")) return

    try {
      const response = await apiFetch(`/api/contacts/${contactId}`, {
        method: "DELETE",
      })

      if (response.ok) {
        await loadAgencyDetails(selectedAgency!.id)
      } else {
        alert("Erreur lors de la suppression")
      }
    } catch (error) {
      console.error("Error deleting contact:", error)
      alert("Erreur lors de la suppression")
    }
  }

  const handleMoveContact = async (draggedId: string, targetId: string) => {
    if (!selectedAgency || !fullAgencyData?.contacts) {
      return
    }

    // S'assurer que les contacts ont un champ order (rétrocompatibilité)
    const contactsWithOrder = fullAgencyData.contacts.map((contact, index) => ({
      ...contact,
      order: contact.order !== undefined ? contact.order : index
    }))
    const contacts = [...contactsWithOrder].sort((a, b) => (a.order || 0) - (b.order || 0))
    
    const draggedIndex = contacts.findIndex((c) => c.id === draggedId)
    const targetIndex = contacts.findIndex((c) => c.id === targetId)

    if (draggedIndex === -1 || targetIndex === -1 || draggedIndex === targetIndex) {
      return
    }

    // Réordonner les contacts
    const newContacts = [...contacts]
    const [removed] = newContacts.splice(draggedIndex, 1)
    newContacts.splice(targetIndex, 0, removed)

    try {
      // Mettre à jour tous les ordres
      await Promise.all(
        newContacts.map((contact, index) =>
          fetch(`/api/contacts/${contact.id}`, {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ order: index }),
          })
        )
      )

      await loadAgencyDetails(selectedAgency.id)
    } catch (error) {
      console.error("[handleMoveContact] Erreur:", error)
      alert("Erreur lors du déplacement")
    }
  }

  const handleAddEmail = () => {
    if (contactEmailInput.trim() && !contactEmails.includes(contactEmailInput.trim())) {
      setContactEmails([...contactEmails, contactEmailInput.trim()])
      setContactEmailInput("")
    }
  }

  const handleRemoveEmail = (email: string) => {
    setContactEmails(contactEmails.filter((e) => e !== email))
  }

  const handleSaveContact = async () => {
    if (!selectedAgency || !contactManagerName) {
      alert("Veuillez saisir le nom du contact")
      return
    }

    try {
      const contactData = {
        agencyId: selectedAgency.id,
        postNumber: contactPostNumber || null,
        agentNumber: contactAgentNumber || null,
        directLine: contactDirectLine || null,
        emails: contactEmails.length > 0 ? contactEmails : null,
        managerName: contactManagerName,
        note: contactNote || null,
        validatedAt: new Date().toISOString(),
      }

      const url = selectedContact
        ? `/api/contacts/${selectedContact.id}`
        : "/api/contacts"
      const method = selectedContact ? "PUT" : "POST"

      const response = await apiFetch(url, {
        method,
        body: JSON.stringify(contactData),
      })

      if (!response.ok) {
        const error = await response.json()
        alert(error.error || "Erreur lors de la sauvegarde du contact")
        return
      }

      await loadAgencyDetails(selectedAgency.id)
      setIsContactDialogOpen(false)
      setSelectedContact(null)
      // Réinitialiser les champs
      setContactPostNumber("")
      setContactAgentNumber("")
      setContactDirectLine("")
      setContactEmails([])
      setContactEmailInput("")
      setContactManagerName("")
      setContactNote("")
    } catch (error: any) {
      console.error("Error saving contact:", error)
      alert(error.message || "Erreur lors de la sauvegarde")
    }
  }

  // Fonctions pour tâches
  const loadTasks = async (agencyId: string) => {
    setLoadingTasks(true)
    try {
      const response = await apiFetch(`/api/agencies/${agencyId}/tasks`)
      if (response.ok) {
        const data = await response.json()
        setTasks(data)
      } else {
        console.error("Error loading tasks")
        setTasks([])
      }
    } catch (error) {
      console.error("Error loading tasks:", error)
      setTasks([])
    } finally {
      setLoadingTasks(false)
    }
  }

  const handleAddTask = () => {
    setTaskFormData({
      title: "",
      createdAt: new Date().toISOString().slice(0, 16),
      notes: "",
      importance: "INFO",
    })
    setIsTaskDialogOpen(true)
  }

  const handleEditTask = (task: Task) => {
    setEditingTask(task)
    setTaskFormData({
      title: task.title,
      createdAt: new Date(task.createdAt).toISOString().slice(0, 16),
      notes: task.notes,
      importance: task.importance,
    })
    setIsTaskEditDialogOpen(true)
  }

  const handleSaveTask = async () => {
    if (!selectedAgency || !taskFormData.title.trim()) {
      alert("Veuillez remplir le titre")
      return
    }

    if (!taskFormData.notes.trim()) {
      alert("Veuillez remplir les notes")
      return
    }

    try {
      const response = await apiFetch(`/api/agencies/${selectedAgency.id}/tasks`, {
        method: "POST",
        body: JSON.stringify({
          title: taskFormData.title,
          createdAt: taskFormData.createdAt,
          notes: taskFormData.notes,
          importance: taskFormData.importance,
        }),
      })

      if (response.ok) {
        await loadTasks(selectedAgency.id)
        setIsTaskDialogOpen(false)
        setTaskFormData({
          title: "",
          createdAt: "",
          notes: "",
          importance: "INFO",
        })
      } else {
        const error = await response.json()
        alert(error.error || "Erreur lors de la création de la tâche")
      }
    } catch (error) {
      console.error("Error saving task:", error)
      alert("Erreur lors de la création de la tâche")
    }
  }

  const handleUpdateTask = async () => {
    if (!selectedAgency || !editingTask || !taskFormData.title.trim()) {
      alert("Veuillez remplir le titre")
      return
    }

    if (!taskFormData.notes.trim()) {
      alert("Veuillez remplir les notes")
      return
    }

    try {
      const response = await apiFetch(`/api/agencies/${selectedAgency.id}/tasks/${editingTask.id}`, {
        method: "PUT",
        body: JSON.stringify({
          title: taskFormData.title,
          createdAt: taskFormData.createdAt,
          notes: taskFormData.notes,
          importance: taskFormData.importance,
        }),
      })

      if (response.ok) {
        await loadTasks(selectedAgency.id)
        setIsTaskEditDialogOpen(false)
        setEditingTask(null)
        setTaskFormData({
          title: "",
          createdAt: "",
          notes: "",
          importance: "INFO",
        })
      } else {
        const error = await response.json()
        alert(error.error || "Erreur lors de la modification de la tâche")
      }
    } catch (error) {
      console.error("Error updating task:", error)
      alert("Erreur lors de la modification de la tâche")
    }
  }

  const handleCloseTask = async (task: Task) => {
    if (!selectedAgency) return

    try {
      const response = await apiFetch(`/api/agencies/${selectedAgency.id}/tasks/${task.id}/close`, {
        method: "POST",
        body: JSON.stringify({
          closedAt: new Date().toISOString(),
        }),
      })

      if (response.ok) {
        await loadTasks(selectedAgency.id)
      } else {
        const error = await response.json()
        alert(error.error || "Erreur lors de la clôture de la tâche")
      }
    } catch (error) {
      console.error("Error closing task:", error)
      alert("Erreur lors de la clôture de la tâche")
    }
  }

  const handleDeleteTask = async (task: Task) => {
    if (!confirm("Êtes-vous sûr de vouloir supprimer cette tâche ?")) return

    if (!selectedAgency) return

    try {
      const response = await apiFetch(`/api/agencies/${selectedAgency.id}/tasks/${task.id}`, {
        method: "DELETE",
      })

      if (response.ok) {
        await loadTasks(selectedAgency.id)
      } else {
        const error = await response.json()
        alert(error.error || "Erreur lors de la suppression de la tâche")
      }
    } catch (error) {
      console.error("Error deleting task:", error)
      alert("Erreur lors de la suppression de la tâche")
    }
  }

  // Fonctions pour photos
  const handleAddPhotoGroup = () => {
    setSelectedPhotoGroup(null)
    setPhotoGroupType("")
    setPhotoGroupTitle("")
    setPhotoFiles([])
    setIsPhotoDialogOpen(true)
  }

  const handleEditPhotoGroup = (photoGroup: PhotoGroup) => {
    setSelectedPhotoGroup(photoGroup)
    setPhotoGroupType(photoGroup.type)
    setPhotoGroupTitle(photoGroup.title || "")
    setPhotoFiles([])
    setIsPhotoDialogOpen(true)
  }

  // Fonctions pour la lightbox
  const handlePreviousPhoto = () => {
    if (lightboxPhotos.length === 0) return
    setLightboxCurrentIndex((prev) => (prev - 1 + lightboxPhotos.length) % lightboxPhotos.length)
    // Réinitialiser le zoom lors du changement de photo
    setZoomLevel(1)
    setZoomPosition({ x: 0, y: 0 })
    setHasDragged(false)
  }

  const handleNextPhoto = () => {
    if (lightboxPhotos.length === 0) return
    setLightboxCurrentIndex((prev) => (prev + 1) % lightboxPhotos.length)
    // Réinitialiser le zoom lors du changement de photo
    setZoomLevel(1)
    setZoomPosition({ x: 0, y: 0 })
    setHasDragged(false)
  }

  const handleZoom = (e: React.WheelEvent<HTMLDivElement>) => {
    e.preventDefault()
    e.stopPropagation()
    
    const delta = e.deltaY > 0 ? -0.2 : 0.2
    const newZoom = Math.max(1, Math.min(5, zoomLevel + delta))
    
    if (newZoom !== zoomLevel) {
      // Calculer la position du zoom par rapport au curseur pour zoomer vers le point de la souris
      const rect = e.currentTarget.getBoundingClientRect()
      const centerX = rect.width / 2
      const centerY = rect.height / 2
      const mouseX = e.clientX - rect.left
      const mouseY = e.clientY - rect.top
      
      // Calculer le décalage depuis le centre en pourcentage
      const offsetX = ((mouseX - centerX) / rect.width) * 100
      const offsetY = ((mouseY - centerY) / rect.height) * 100
      
      // Ajuster la position pour zoomer vers le curseur
      const zoomChange = newZoom - zoomLevel
      const newX = zoomPosition.x - (offsetX * zoomChange / newZoom)
      const newY = zoomPosition.y - (offsetY * zoomChange / newZoom)
      
      setZoomLevel(newZoom)
      setZoomPosition({ x: newX, y: newY })
    }
  }

  const handleMouseDown = (e: React.MouseEvent<HTMLDivElement>) => {
    // Ne permettre le drag que si zoomé
    if (zoomLevel > 1 && e.button === 0) {
      e.preventDefault()
      e.stopPropagation()
      setIsDragging(true)
      setHasDragged(false)
      setDragStart({ x: e.clientX, y: e.clientY })
    }
  }

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (isDragging && zoomLevel > 1) {
      e.preventDefault()
      e.stopPropagation()
      
      const rect = e.currentTarget.getBoundingClientRect()
      const deltaX = e.clientX - dragStart.x
      const deltaY = e.clientY - dragStart.y
      
      // Seulement considérer comme drag si le mouvement est significatif (> 5px)
      if (Math.abs(deltaX) > 5 || Math.abs(deltaY) > 5) {
        setHasDragged(true)
        
        const deltaXPercent = (deltaX / rect.width) * 100
        const deltaYPercent = (deltaY / rect.height) * 100
        
        setZoomPosition(prev => ({
          x: prev.x + deltaXPercent,
          y: prev.y + deltaYPercent
        }))
        
        setDragStart({ x: e.clientX, y: e.clientY })
      }
    }
  }

  const handleMouseUp = (e: React.MouseEvent<HTMLDivElement>) => {
    if (isDragging) {
      e.preventDefault()
      e.stopPropagation()
      setIsDragging(false)
      
      // Réinitialiser hasDragged après un court délai pour permettre le clic
      setTimeout(() => setHasDragged(false), 100)
    }
  }

  // Calculer la distance entre deux points tactiles
  const getTouchDistance = (touch1: React.Touch, touch2: React.Touch): number => {
    const dx = touch2.clientX - touch1.clientX
    const dy = touch2.clientY - touch1.clientY
    return Math.sqrt(dx * dx + dy * dy)
  }

  // Gestionnaires d'événements tactiles pour mobile
  const handleTouchStart = (e: React.TouchEvent<HTMLDivElement>) => {
    if (e.touches.length === 1) {
      // Un seul doigt : drag si zoomé
      if (zoomLevel > 1) {
        e.preventDefault()
        e.stopPropagation()
        const touch = e.touches[0]
        setIsDragging(true)
        setHasDragged(false)
        setDragStart({ x: touch.clientX, y: touch.clientY })
      }
    } else if (e.touches.length === 2) {
      // Deux doigts : pinch-to-zoom
      e.preventDefault()
      e.stopPropagation()
      const distance = getTouchDistance(e.touches[0], e.touches[1])
      setTouchStartDistance(distance)
      setTouchStartZoom(zoomLevel)
      setIsDragging(false)
    }
  }

  const handleTouchMove = (e: React.TouchEvent<HTMLDivElement>) => {
    if (e.touches.length === 1 && isDragging && zoomLevel > 1) {
      // Un seul doigt : drag
      e.preventDefault()
      e.stopPropagation()
      
      const touch = e.touches[0]
      const rect = e.currentTarget.getBoundingClientRect()
      const deltaX = touch.clientX - dragStart.x
      const deltaY = touch.clientY - dragStart.y
      
      // Seulement considérer comme drag si le mouvement est significatif (> 5px)
      if (Math.abs(deltaX) > 5 || Math.abs(deltaY) > 5) {
        setHasDragged(true)
        
        const deltaXPercent = (deltaX / rect.width) * 100
        const deltaYPercent = (deltaY / rect.height) * 100
        
        setZoomPosition(prev => ({
          x: prev.x + deltaXPercent,
          y: prev.y + deltaYPercent
        }))
        
        setDragStart({ x: touch.clientX, y: touch.clientY })
      }
    } else if (e.touches.length === 2 && touchStartDistance > 0) {
      // Deux doigts : pinch-to-zoom
      e.preventDefault()
      e.stopPropagation()
      
      const distance = getTouchDistance(e.touches[0], e.touches[1])
      const scale = distance / touchStartDistance
      const newZoom = Math.max(1, Math.min(5, touchStartZoom * scale))
      
      // Calculer le centre du pinch pour zoomer vers ce point
      const centerX = (e.touches[0].clientX + e.touches[1].clientX) / 2
      const centerY = (e.touches[0].clientY + e.touches[1].clientY) / 2
      const rect = e.currentTarget.getBoundingClientRect()
      const offsetX = ((centerX - rect.left) / rect.width - 0.5) * 100
      const offsetY = ((centerY - rect.top) / rect.height - 0.5) * 100
      
      const zoomChange = newZoom - zoomLevel
      const newX = zoomPosition.x - (offsetX * zoomChange / newZoom)
      const newY = zoomPosition.y - (offsetY * zoomChange / newZoom)
      
      setZoomLevel(newZoom)
      setZoomPosition({ x: newX, y: newY })
    }
  }

  const handleTouchEnd = (e: React.TouchEvent<HTMLDivElement>) => {
    if (e.touches.length === 0) {
      // Plus de touches : arrêter drag ou zoom
      if (isDragging) {
        setIsDragging(false)
        setTimeout(() => setHasDragged(false), 100)
      }
      setTouchStartDistance(0)
      setTouchStartZoom(1)
    } else if (e.touches.length === 1 && touchStartDistance > 0) {
      // Passage de 2 doigts à 1 doigt : arrêter le zoom, commencer le drag si zoomé
      setTouchStartDistance(0)
      setTouchStartZoom(1)
      if (zoomLevel > 1) {
        const touch = e.touches[0]
        setIsDragging(true)
        setHasDragged(false)
        setDragStart({ x: touch.clientX, y: touch.clientY })
      }
    }
  }

  const handleImageClick = (e: React.MouseEvent) => {
    // Ne pas déclencher le clic si on vient de faire un drag
    if (hasDragged) {
      e.stopPropagation()
      return
    }
    
    e.stopPropagation()
    // Si zoomé, réinitialiser le zoom, sinon photo suivante
    if (zoomLevel > 1) {
      setZoomLevel(1)
      setZoomPosition({ x: 0, y: 0 })
      setHasDragged(false)
    } else {
      handleNextPhoto()
    }
  }

  const handleDeletePhotoGroup = async (photoGroupId: string) => {
    if (!confirm("Êtes-vous sûr de vouloir supprimer ce groupe de photos ?")) return

    try {
      const response = await apiFetch(`/api/photos/${photoGroupId}`, {
        method: "DELETE",
      })

      if (response.ok) {
        await loadAgencyDetails(selectedAgency!.id)
      } else {
        alert("Erreur lors de la suppression")
      }
    } catch (error) {
      console.error("Error deleting photo group:", error)
      alert("Erreur lors de la suppression")
    }
  }

  const handleSavePhotoTitle = async () => {
    if (!editingPhotoGroupId || !editingPhotoUrl || !fullAgencyData) {
      alert("Données manquantes")
      return
    }

    try {
      // Récupérer le groupe de photos
      const photoGroup = fullAgencyData.photos?.find((pg) => pg.id === editingPhotoGroupId)
      if (!photoGroup) {
        alert("Groupe de photos non trouvé")
        return
      }

      // Mettre à jour le titre et la date de création de la photo spécifique
      const photos = JSON.parse(photoGroup.photos || "[]")
      // Convertir la date du format "YYYY-MM-DD" en ISO string
      const createdAtISO = editingPhotoCreatedAt 
        ? new Date(editingPhotoCreatedAt + "T00:00:00").toISOString()
        : null
      
      const updatedPhotos = photos.map((p: string | { path: string; createdAt?: string; title?: string }) => {
        const path = typeof p === "string" ? p : p.path
        if (path === editingPhotoUrl) {
          // Mettre à jour le titre et la date de création de cette photo
          if (typeof p === "string") {
            return { 
              path: p, 
              title: editingPhotoTitle || null,
              createdAt: createdAtISO || new Date().toISOString()
            }
          } else {
            return { 
              ...p, 
              title: editingPhotoTitle || null,
              createdAt: createdAtISO || p.createdAt || new Date().toISOString()
            }
          }
        }
        return p
      })

      // Mettre à jour le groupe avec les photos modifiées
      const response = await apiFetch(`/api/photos/${editingPhotoGroupId}`, {
        method: "PUT",
        body: JSON.stringify({
          type: photoGroup.type,
          title: photoGroup.title,
          photos: updatedPhotos,
        }),
      })

      if (response.ok) {
        await loadAgencyDetails(selectedAgency!.id)
        setIsEditPhotoTitleDialogOpen(false)
        setEditingPhotoUrl("")
        setEditingPhotoGroupId("")
        setEditingPhotoTitle("")
        setEditingPhotoCreatedAt("")
      } else {
        const error = await response.json()
        alert(error.error || "Erreur lors de la mise à jour du titre")
      }
    } catch (error) {
      console.error("Error saving photo title:", error)
      alert("Erreur lors de la mise à jour du titre")
    }
  }

  const handleDeletePhoto = async (photoGroupId: string, photoUrl: string) => {
    if (!confirm("Êtes-vous sûr de vouloir supprimer cette photo ?")) return

    if (!fullAgencyData) {
      alert("Données de l'agence non disponibles")
      return
    }

    try {
      // Récupérer le groupe de photos
      const photoGroup = fullAgencyData.photos?.find((pg) => pg.id === photoGroupId)
      if (!photoGroup) {
        alert("Groupe de photos non trouvé")
        return
      }

      // Retirer la photo du tableau
      const photos = JSON.parse(photoGroup.photos || "[]")
      // Normaliser : gérer les strings et les objets
      const updatedPhotos = photos.filter((p: string | { path: string; createdAt?: string; title?: string }) => {
        const path = typeof p === "string" ? p : p.path
        return path !== photoUrl
      })

      // Si c'est la photo de l'agence et qu'on supprime la dernière photo
      if (photoGroup.type === "Agence" && updatedPhotos.length === 0) {
        // Supprimer le groupe entier
        await handleDeletePhotoGroup(photoGroupId)
        return
      }

      // Mettre à jour le groupe avec les photos restantes
      const response = await apiFetch(`/api/photos/${photoGroupId}`, {
        method: "PUT",
        body: JSON.stringify({
          type: photoGroup.type,
          title: photoGroup.title,
          photos: updatedPhotos,
        }),
      })

      if (response.ok) {
        await loadAgencyDetails(selectedAgency!.id)
        await loadAgencies()
      } else {
        const error = await response.json()
        alert(error.error || "Erreur lors de la suppression de la photo")
      }
    } catch (error) {
      console.error("Error deleting photo:", error)
      alert("Erreur lors de la suppression de la photo")
    }
  }

  const handleSavePhotoGroup = async () => {
    if (!selectedAgency || !photoGroupType) {
      alert("Veuillez sélectionner un type de groupe")
      return
    }

    // Vérifier la taille des fichiers avant l'upload
    const MAX_SIZE = 5 * 1024 * 1024 // 5 MB
    const oversizedFiles = photoFiles.filter((file) => file.size > MAX_SIZE)
    
    if (oversizedFiles.length > 0) {
      alert(
        `Les fichiers suivants dépassent la taille maximale de 5 MB :\n${oversizedFiles.map((f) => f.name).join("\n")}\n\nLa taille maximale autorisée est de 5 MB par fichier.`
      )
      return
    }

    try {
      let photos: Array<string | { path: string; createdAt: string }> = []

      // Uploader les nouveaux fichiers
      if (photoFiles.length > 0) {
        const uploadPromises = photoFiles.map(async (file) => {
          const formData = new FormData()
          formData.append("file", file)

          const response = await apiFetch("/api/upload", {
            method: "POST",
            body: formData,
          })

          if (response.ok) {
            const data = await response.json()
            // Retourner un objet avec path et createdAt
            return { path: data.path, createdAt: data.createdAt }
          } else {
            // Gérer les erreurs du serveur (taille, type, etc.)
            const error = await response.json()
            throw new Error(error.error || "Erreur lors de l'upload")
          }
        })

        try {
          const uploadedPhotos = await Promise.all(uploadPromises)
          photos = uploadedPhotos.filter((p) => p !== null)
        } catch (uploadError: any) {
          // Gérer les erreurs d'upload (fichier trop volumineux, etc.)
          const errorMessage = uploadError?.message || "Erreur lors de l'upload"
          if (errorMessage.includes("5 MB") || errorMessage.includes("trop volumineux")) {
            alert("La taille maximale autorisée est de 5 MB par fichier. Veuillez réduire la taille de vos photos.")
          } else {
            alert(`Erreur lors de l'upload : ${errorMessage}`)
          }
          return
        }
      } else if (selectedPhotoGroup) {
        // En mode édition sans nouveaux fichiers, garder les photos existantes
        const existingPhotos = JSON.parse(selectedPhotoGroup.photos || "[]")
        // Normaliser : si c'est un array de strings, les convertir en objets
        photos = existingPhotos.map((p: string | { path: string; createdAt?: string }) => {
          if (typeof p === "string") {
            return { path: p, createdAt: new Date().toISOString() } // Date par défaut pour anciennes photos
          }
          return p
        })
      }

      // Cas spécial : Photo de l'agence - une seule photo (géré côté serveur aussi)
      if (photoGroupType === "Agence" && photos.length > 0) {
        const firstPhoto = photos[0]
        // Normaliser le format en préservant la date de création si elle existe
        const normalizedPhoto = typeof firstPhoto === "string" 
          ? { path: firstPhoto, createdAt: new Date().toISOString() } // Seulement si c'est une ancienne photo sans date
          : firstPhoto // Conserver la date createdAt si elle existe déjà
        photos = [normalizedPhoto]
      }

      const photoGroupData = {
        agencyId: selectedAgency.id,
        type: photoGroupType,
        title: photoGroupTitle || null,
        photos,
      }

      const url = selectedPhotoGroup
        ? `/api/photos/${selectedPhotoGroup.id}`
        : "/api/photos"
      const method = selectedPhotoGroup ? "PUT" : "POST"

      const response = await apiFetch(url, {
        method,
        body: JSON.stringify(photoGroupData),
      })

      if (response.ok) {
        await loadAgencyDetails(selectedAgency.id)
        await loadAgencies() // Recharger pour mettre à jour la photo dans la liste
        setIsPhotoDialogOpen(false)
        setSelectedPhotoGroup(null)
        setPhotoGroupType("")
        setPhotoGroupTitle("")
        setPhotoFiles([])
      } else {
        const error = await response.json()
        alert(error.error || "Erreur lors de la sauvegarde")
      }
    } catch (error) {
      console.error("Error saving photo group:", error)
      alert("Erreur lors de la sauvegarde")
    }
  }

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
        alert("Seul le Super Admin peut supprimer les notes techniques")
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
        alert(error.error || "Erreur lors de la sauvegarde")
      }
    } catch (error) {
      console.error("Error saving technical:", error)
      alert("Erreur lors de la sauvegarde")
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
  const [draggedContactId, setDraggedContactId] = useState<string | null>(null)
  const [dragOverContactIndex, setDragOverContactIndex] = useState<number | null>(null)

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
          fetch(`/api/pcs/${pc.id}`, {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ order: index }),
          })
        )
      )

      await loadAgencyDetails(selectedAgency.id)
    } catch (error) {
      console.error("[handleMovePC] Erreur:", error)
      alert("Erreur lors du déplacement")
    }
  }

  const handleDeletePC = async (pcId: string) => {
    if (!confirm("Êtes-vous sûr de vouloir supprimer ce PC ?")) return

    try {
      const response = await apiFetch(`/api/pcs/${pcId}`, { method: "DELETE" })
      if (response.ok) {
        await loadAgencyDetails(selectedAgency!.id)
      } else {
        alert("Erreur lors de la suppression")
      }
    } catch (error) {
      console.error("Error deleting PC:", error)
      alert("Erreur lors de la suppression")
    }
  }

  const handleSavePC = async (pcData: any) => {
    if (!selectedAgency) {
      alert("Aucune agence sélectionnée")
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
          alert(error.error || "Erreur lors de la création des données techniques")
          return
        }

        const technical = await technicalResponse.json()
        technicalId = technical.id
        // Recharger les détails de l'agence pour avoir les données techniques
        await loadAgencyDetails(selectedAgency.id)
      } catch (error) {
        console.error("Error creating technical data:", error)
        alert("Erreur lors de la création des données techniques")
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
        alert(error.error || "Erreur lors de la sauvegarde")
      }
    } catch (error) {
      console.error("Error saving PC:", error)
      alert("Erreur lors de la sauvegarde")
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

  const handleDeletePrinter = async (printerId: string) => {
    if (!confirm("Êtes-vous sûr de vouloir supprimer cette imprimante ?")) return

    try {
      const response = await apiFetch(`/api/printers/${printerId}`, { method: "DELETE" })
      if (response.ok) {
        await loadAgencyDetails(selectedAgency!.id)
      } else {
        alert("Erreur lors de la suppression")
      }
    } catch (error) {
      console.error("Error deleting printer:", error)
      alert("Erreur lors de la suppression")
    }
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
        alert(error.error || "Erreur lors de la sauvegarde")
      }
    } catch (error) {
      console.error("Error saving printer:", error)
      alert("Erreur lors de la sauvegarde")
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
  
  // Handler mémorisé pour la sélection d'agence
  const handleSelectAgency = useCallback((agency: Agency) => {
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
  }, [isMobile, loadAgencyDetails])

  return (
    <>
      <div ref={containerRef} className="flex h-full w-full max-w-full min-w-0 overflow-hidden">
        {/* Zone Master */}
        <div
          className={`h-full flex flex-col overflow-hidden border-r ${
            isMobile && showDetailsOnMobile ? "hidden" : ""
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
                className={`px-3 sm:px-3 py-2 sm:py-1 text-sm sm:text-sm rounded whitespace-nowrap shrink-0 min-h-[44px] ${
                  filter === "ALL" ? "bg-primary text-primary-foreground" : "bg-muted"
                }`}
              >
                Tous
              </button>
              <button
                onClick={handleSetFilterOK}
                className={`px-3 sm:px-3 py-2 sm:py-1 text-sm sm:text-sm rounded whitespace-nowrap shrink-0 min-h-[44px] ${
                  filter === "OK" ? "bg-primary text-primary-foreground" : "bg-muted"
                }`}
              >
                OK
              </button>
              <button
                onClick={handleSetFilterINFO}
                className={`px-3 sm:px-3 py-2 sm:py-1 text-sm sm:text-sm rounded whitespace-nowrap shrink-0 min-h-[44px] ${
                  filter === "INFO"
                    ? "bg-primary text-primary-foreground"
                    : "bg-muted"
                }`}
              >
                INFO
              </button>
              <button
                onClick={handleSetFilterALERTE}
                className={`px-3 sm:px-3 py-2 sm:py-1 text-sm sm:text-sm rounded whitespace-nowrap shrink-0 min-h-[44px] ${
                  filter === "ALERTE"
                    ? "bg-primary text-primary-foreground"
                    : "bg-muted"
                }`}
              >
                ALERTE
              </button>
              <button
                onClick={handleSetFilterFERMEE}
                className={`px-3 sm:px-3 py-2 sm:py-1 text-sm sm:text-sm rounded whitespace-nowrap shrink-0 min-h-[44px] ${
                  filter === "FERMÉE"
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
            <div>Chargement...</div>
          ) : (
            <div className="space-y-2">
                {agencies.map((agency) => {
                const isSelected = selectedAgency?.id === agency.id
                return (
                <div
                  key={agency.id}
                  className={`p-3 sm:p-3 border rounded transition-all duration-700 ease-in-out ${
                    isSelected ? "bg-accent" : "bg-background"
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
                        className={`text-sm sm:text-sm ${
                          agency.state === "OK" 
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
        className={`h-full flex flex-col overflow-hidden transition-opacity duration-300 ${
        isMobile && !showDetailsOnMobile ? "hidden" : ""
        }`}
        style={{ 
          width: isMobile ? "100%" : `${100 - masterWidth}%`,
          minWidth: isMobile ? "auto" : "300px"
        }}
        suppressHydrationWarning
      >
        {loadingDetails && !fullAgencyData ? (
          <div className="p-6 flex items-center justify-center h-full">
            <div className="text-muted-foreground animate-pulse">Chargement des détails...</div>
          </div>
        ) : fullAgencyData ? (
          <div className={`flex-1 flex flex-col min-h-0 transition-opacity duration-300 ${loadingDetails ? 'opacity-60' : 'opacity-100'}`}>
          <>
            {/* En-tête avec nom et état - Fixe */}
            <div ref={detailsHeaderRef} className="flex-shrink-0 bg-background pb-2 sm:pb-4 pt-3 sm:pt-6 px-3 sm:px-6 border-b flex flex-col sm:flex-row items-center sm:items-center justify-between gap-2 sm:gap-4 relative" style={{ backgroundColor: 'hsl(var(--background))' }}>
              {/* Bouton Retour sur mobile - positionné à gauche */}
              {isMobile && (
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => {
                    setShowDetailsOnMobile(false)
                    setSelectedAgency(null)
                  }}
                  className="absolute left-3 top-3 sm:relative sm:left-auto sm:top-auto shrink-0"
                >
                  <ArrowLeft className="h-4 w-4" />
                </Button>
              )}
              {/* Contenu centré en mobile, normal en desktop */}
              <div className={`flex items-center gap-2 sm:gap-4 min-w-0 ${isMobile ? 'flex-col flex-1 w-full' : 'flex-1'}`}>
                {editing ? (
                  <Input
                    value={editedName}
                    onChange={(e) => setEditedName(e.target.value)}
                    className={`text-base sm:text-2xl font-bold min-w-0 min-h-[44px] ${isMobile ? 'w-full text-center' : 'flex-1'}`}
                  />
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
                  <Button onClick={handleSaveAgency} className="gap-2">
                    <Save className="h-4 w-4" />
                    Enregistrer
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

                {/* Section Adresses */}
                <Card>
                  <CardHeader className="p-4 sm:p-6">
                    <div className="flex items-center justify-between gap-2">
                      <CardTitle className="text-base sm:text-lg">Adresses</CardTitle>
                      {editing && (
                        <Button onClick={handleAddAddress} size="sm" className="gap-1 sm:gap-2 shrink-0">
                          <Plus className="h-3 w-3 sm:h-4 sm:w-4" />
                          <span className="hidden sm:inline">Ajouter</span>
                        </Button>
                      )}
                    </div>
                  </CardHeader>
                  <CardContent className="p-4 sm:p-6">
                    {fullAgencyData.addresses && fullAgencyData.addresses.length > 0 ? (
                      <div className="grid gap-3 sm:gap-4 auto-rows-fr" style={{ gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 300px), 1fr))' }}>
                        {fullAgencyData.addresses.map((address) => (
                          <Card key={address.id} className="bg-slate-50 dark:bg-slate-800/50 w-full h-full flex flex-col">
                            <CardHeader className="p-3 sm:p-4">
                              <div className="flex items-start justify-between">
                                <CardTitle className="text-base font-semibold flex-1">
                                  {address.label}
                                </CardTitle>
                                {editing && (
                                  <div className="flex gap-1 shrink-0">
                                    <Button
                                      variant="ghost"
                                      size="sm"
                                      onClick={() => handleEditAddress(address)}
                                      className="h-8 w-8 p-0"
                                    >
                                      <Edit className="h-4 w-4" />
                                    </Button>
                                    <Button
                                      variant="ghost"
                                      size="sm"
                                      onClick={() => handleDeleteAddress(address.id)}
                                      className="h-8 w-8 p-0 text-destructive hover:text-destructive"
                                    >
                                      <Trash2 className="h-4 w-4" />
                                    </Button>
                                  </div>
                                )}
                              </div>
                            </CardHeader>
                            <CardContent className="p-3 sm:p-4 pt-0 flex-1 flex flex-col">
                              <div className="space-y-2 text-sm flex-1">
                                <div className="flex items-center gap-2">
                                  <MapPin className="h-4 w-4 text-muted-foreground shrink-0" />
                                  <span className="text-muted-foreground">{address.street}</span>
                                </div>
                                <div className="text-muted-foreground">
                                  {address.postalCode} {address.city}
                                </div>
                                {address.latitude && address.longitude && (
                                  <Button
                                    variant="outline"
                                    size="sm"
                                    className="mt-2"
                                    onClick={() => {
                                      window.open(
                                        `https://www.google.com/maps?q=${address.latitude},${address.longitude}`,
                                        "_blank"
                                      )
                                    }}
                                  >
                                    <MapPin className="h-4 w-4 mr-2" />
                                    Voir sur Google Maps
                                  </Button>
                                )}
                              </div>
                            </CardContent>
                          </Card>
                        ))}
                      </div>
                    ) : (
                      <div className="text-muted-foreground">
                        Aucune adresse enregistrée
                      </div>
                    )}
                  </CardContent>
                </Card>

                {/* Section Contacts */}
                <Card>
                  <CardHeader className="p-4 sm:p-6">
                    <div className="flex items-center justify-between gap-2">
                      <CardTitle className="text-base sm:text-lg">Contacts</CardTitle>
                      {editing && (
                        <Button onClick={handleAddContact} size="sm" className="gap-1 sm:gap-2 shrink-0">
                          <Plus className="h-3 w-3 sm:h-4 sm:w-4" />
                          <span className="hidden sm:inline">Ajouter</span>
                        </Button>
                      )}
                    </div>
                  </CardHeader>
                  <CardContent className="p-4 sm:p-6">
                    {fullAgencyData.contacts && fullAgencyData.contacts.length > 0 ? (
                      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4">
                        {(() => {
                          const sortedContacts = [...fullAgencyData.contacts].sort((a, b) => (a.order || 0) - (b.order || 0))
                          return sortedContacts.map((contact, index) => {
                            const emails = JSON.parse(contact.emails || "[]")
                            return (
                              <Card
                                key={contact.id}
                                draggable={editing}
                                onDragStart={(e) => {
                                  setDraggedContactId(contact.id)
                                  e.dataTransfer.effectAllowed = "move"
                                }}
                                onDragEnd={() => {
                                  setDraggedContactId(null)
                                  setDragOverContactIndex(null)
                                }}
                                onDragOver={(e) => {
                                  e.preventDefault()
                                  e.dataTransfer.dropEffect = "move"
                                  setDragOverContactIndex(index)
                                }}
                                onDragLeave={() => {
                                  setDragOverContactIndex(null)
                                }}
                                onDrop={(e) => {
                                  e.preventDefault()
                                  setDragOverContactIndex(null)
                                  if (draggedContactId && draggedContactId !== contact.id) {
                                    handleMoveContact(draggedContactId, contact.id)
                                  }
                                  setDraggedContactId(null)
                                }}
                                className={`bg-slate-50 dark:bg-slate-800/50 ${
                                  draggedContactId === contact.id ? "opacity-50" : ""
                                } ${
                                  dragOverContactIndex === index ? "border-primary border-2" : ""
                                } ${editing ? "cursor-move" : ""}`}
                              >
                                <CardHeader className="p-3 sm:p-4">
                                  <div className="flex items-start justify-between gap-2">
                                    {editing && (
                                      <div className="text-muted-foreground cursor-move shrink-0">
                                        <GripVertical className="h-4 w-4" />
                                      </div>
                                    )}
                                    <CardTitle className="text-base font-semibold flex-1">
                                      {contact.managerName}
                                    </CardTitle>
                                    {editing && (
                                      <div className="flex gap-1 shrink-0">
                                        <Button
                                          variant="ghost"
                                          size="sm"
                                          onClick={() => handleEditContact(contact)}
                                          className="h-8 w-8 p-0"
                                        >
                                          <Edit className="h-4 w-4" />
                                        </Button>
                                        <Button
                                          variant="ghost"
                                          size="sm"
                                          onClick={() => handleDeleteContact(contact.id)}
                                          className="h-8 w-8 p-0 text-destructive hover:text-destructive"
                                        >
                                          <Trash2 className="h-4 w-4" />
                                        </Button>
                                      </div>
                                    )}
                                  </div>
                                </CardHeader>
                                <CardContent className="p-3 sm:p-4 pt-0">
                                  <div className="space-y-2 text-sm">
                                    {contact.postNumber && (
                                      <div className="flex items-center gap-2">
                                        <Phone className="h-4 w-4 text-muted-foreground shrink-0" />
                                        <span><strong>Poste:</strong> {contact.postNumber}</span>
                                      </div>
                                    )}
                                    {contact.agentNumber && (
                                      <div className="flex items-center gap-2">
                                        <User className="h-4 w-4 text-muted-foreground shrink-0" />
                                        <span><strong>Agent:</strong> {contact.agentNumber}</span>
                                      </div>
                                    )}
                                    {contact.directLine && (
                                      <div className="flex items-center gap-2">
                                        <Phone className="h-4 w-4 text-muted-foreground shrink-0" />
                                        <span><strong>Ligne directe:</strong> {contact.directLine}</span>
                                      </div>
                                    )}
                                    {emails.length > 0 && (
                                      <div className="flex items-start gap-2">
                                        <Mail className="h-4 w-4 text-muted-foreground shrink-0 mt-0.5" />
                                        <div className="flex-1">
                                          <strong>Emails:</strong>
                                          <div className="mt-1 space-y-1">
                                            {emails.map((email: string, emailIndex: number) => (
                                              <div key={emailIndex} className="text-muted-foreground break-all">
                                                {email}
                                              </div>
                                            ))}
                                          </div>
                                        </div>
                                      </div>
                                    )}
                                    {contact.note && (
                                      <div className="mt-3 pt-3 border-t">
                                        <div className="flex items-start gap-2">
                                          <FileText className="h-4 w-4 text-muted-foreground shrink-0 mt-0.5" />
                                          <div className="flex-1">
                                            <strong>Note:</strong>
                                            <div className="mt-1">
                                              <div 
                                                className={`text-muted-foreground transition-all ${
                                                  !expandedContactNotes[contact.id] 
                                                    ? "overflow-hidden" 
                                                    : ""
                                                }`}
                                                style={!expandedContactNotes[contact.id] ? {
                                                  lineHeight: '1.5rem',
                                                  whiteSpace: 'normal',
                                                  wordBreak: 'break-word',
                                                  display: '-webkit-box',
                                                  WebkitLineClamp: 5,
                                                  WebkitBoxOrient: 'vertical',
                                                  maxHeight: '7.5rem'
                                                } : {
                                                  lineHeight: '1.5rem',
                                                  whiteSpace: 'pre-wrap',
                                                  wordBreak: 'break-word'
                                                }}
                                              >
                                                {contact.note}
                                              </div>
                                              {(contact.note.split('\n').length > 5 || contact.note.length > 300) && (
                                                <button
                                                  onClick={() => setExpandedContactNotes(prev => ({
                                                    ...prev,
                                                    [contact.id]: !prev[contact.id]
                                                  }))}
                                                  className="text-sm text-primary hover:underline mt-1"
                                                >
                                                  {expandedContactNotes[contact.id] ? (
                                                    "Réduire"
                                                  ) : (
                                                    "Voir plus"
                                                  )}
                                                </button>
                                              )}
                                            </div>
                                          </div>
                                        </div>
                                      </div>
                                    )}
                                  </div>
                                </CardContent>
                              </Card>
                            )
                          })
                        })()}
                      </div>
                    ) : (
                      <div className="text-muted-foreground">
                        Aucun contact enregistré
                      </div>
                    )}
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="tasks" className="space-y-2 sm:space-y-4 pt-2 sm:pt-4 mt-0">
                {/* Bouton Ajouter - Pleine largeur sur mobile */}
                <Button 
                  onClick={handleAddTask} 
                  disabled={!editing}
                  className="w-full sm:w-auto gap-2 mb-4 bg-green-600 hover:bg-green-700 text-white"
                >
                  <Plus className="h-4 w-4" />
                  Ajouter une tâche
                </Button>

                {/* Filtres - Visibles uniquement sur mobile */}
                <div className="sm:hidden mb-4">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="text-sm font-medium">Filtres :</span>
                  </div>
                  <div className="flex gap-2 flex-wrap">
                    <button
                      onClick={() => setTaskFilter("URGENT")}
                      className={`px-3 py-1 rounded-full text-xs font-semibold border ${
                        taskFilter === "URGENT"
                          ? "bg-red-100 text-red-800 border-red-500 dark:bg-red-900/30 dark:text-red-400"
                          : "bg-white text-red-600 border-red-300 dark:bg-gray-800 dark:text-red-400"
                      }`}
                    >
                      URGENT
                    </button>
                    <button
                      onClick={() => setTaskFilter("CRITIQUE")}
                      className={`px-3 py-1 rounded-full text-xs font-semibold border ${
                        taskFilter === "CRITIQUE"
                          ? "bg-orange-100 text-orange-800 border-orange-500 dark:bg-orange-900/30 dark:text-orange-400"
                          : "bg-white text-orange-600 border-orange-300 dark:bg-gray-800 dark:text-orange-400"
                      }`}
                    >
                      CRITIQUE
                    </button>
                    <button
                      onClick={() => setTaskFilter("INFO")}
                      className={`px-3 py-1 rounded-full text-xs font-semibold border ${
                        taskFilter === "INFO"
                          ? "bg-gray-100 text-gray-800 border-gray-500 dark:bg-gray-700 dark:text-gray-300"
                          : "bg-white text-gray-600 border-gray-300 dark:bg-gray-800 dark:text-gray-400"
                      }`}
                    >
                      INFO
                    </button>
                    <button
                      onClick={() => setTaskFilter("ALL")}
                      className={`px-3 py-1 rounded-full text-xs font-semibold border ${
                        taskFilter === "ALL"
                          ? "bg-blue-100 text-blue-800 border-blue-500 dark:bg-blue-900/30 dark:text-blue-400"
                          : "bg-white text-blue-600 border-blue-300 dark:bg-gray-800 dark:text-blue-400"
                      }`}
                    >
                      TOUS
                    </button>
                  </div>
                </div>

                {/* Filtres Desktop */}
                <div className="hidden sm:block mb-4">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="text-sm font-medium">Filtres :</span>
                  </div>
                  <div className="flex gap-2 flex-wrap">
                    <button
                      onClick={() => setTaskFilter("URGENT")}
                      className={`px-3 py-1 rounded-full text-xs font-semibold border ${
                        taskFilter === "URGENT"
                          ? "bg-red-100 text-red-800 border-red-500 dark:bg-red-900/30 dark:text-red-400"
                          : "bg-white text-red-600 border-red-300 dark:bg-gray-800 dark:text-red-400"
                      }`}
                    >
                      URGENT
                    </button>
                    <button
                      onClick={() => setTaskFilter("CRITIQUE")}
                      className={`px-3 py-1 rounded-full text-xs font-semibold border ${
                        taskFilter === "CRITIQUE"
                          ? "bg-orange-100 text-orange-800 border-orange-500 dark:bg-orange-900/30 dark:text-orange-400"
                          : "bg-white text-orange-600 border-orange-300 dark:bg-gray-800 dark:text-orange-400"
                      }`}
                    >
                      CRITIQUE
                    </button>
                    <button
                      onClick={() => setTaskFilter("INFO")}
                      className={`px-3 py-1 rounded-full text-xs font-semibold border ${
                        taskFilter === "INFO"
                          ? "bg-gray-100 text-gray-800 border-gray-500 dark:bg-gray-700 dark:text-gray-300"
                          : "bg-white text-gray-600 border-gray-300 dark:bg-gray-800 dark:text-gray-400"
                      }`}
                    >
                      INFO
                    </button>
                    <button
                      onClick={() => setTaskFilter("ALL")}
                      className={`px-3 py-1 rounded-full text-xs font-semibold border ${
                        taskFilter === "ALL"
                          ? "bg-blue-100 text-blue-800 border-blue-500 dark:bg-blue-900/30 dark:text-blue-400"
                          : "bg-white text-blue-600 border-blue-300 dark:bg-gray-800 dark:text-blue-400"
                      }`}
                    >
                      TOUS
                    </button>
                  </div>
                </div>

                {loadingTasks ? (
                  <div className="text-center py-8 text-muted-foreground">Chargement...</div>
                ) : tasks.filter(t => taskFilter === "ALL" || t.importance === taskFilter).length === 0 ? (
                  <div className="text-center py-8 text-muted-foreground">Aucune tâche</div>
                ) : (
                  <>
                    {/* Vue mobile - Cartes */}
                    <div className="sm:hidden space-y-4">
                      {tasks
                        .filter(t => taskFilter === "ALL" || t.importance === taskFilter)
                        .map((task) => {
                          const isClosed = !!task.closedAt
                          const createdAt = new Date(task.createdAt)
                          const closedAt = task.closedAt ? new Date(task.closedAt) : null
                          
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

                          const importanceColor = task.importance === "URGENT" 
                            ? "bg-red-500" 
                            : task.importance === "CRITIQUE" 
                            ? "bg-orange-500" 
                            : "bg-gray-500"

                          return (
                            <div
                              key={task.id}
                              className="bg-card dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 overflow-hidden"
                            >
                              {/* Barre colorée à gauche */}
                              <div className="flex">
                                <div className={`w-1 ${importanceColor}`} />
                                <div className="flex-1 p-4">
                                  {/* En-tête avec badges */}
                                  <div className="flex items-start justify-between mb-3">
                                    <h3 className="font-bold text-base flex-1 pr-2">{task.title}</h3>
                                    <div className="flex gap-2 flex-shrink-0">
                                      <span
                                        className={`px-2 py-1 rounded-full text-xs font-semibold text-white ${
                                          task.importance === "URGENT"
                                            ? "bg-red-500"
                                            : task.importance === "CRITIQUE"
                                            ? "bg-orange-500"
                                            : "bg-gray-500"
                                        }`}
                                      >
                                        {task.importance}
                                      </span>
                                      {isClosed && (
                                        <span className="px-2 py-1 rounded-full text-xs font-semibold bg-green-500 text-white">
                                          Clôturée
                                        </span>
                                      )}
                                    </div>
                                  </div>

                                  {/* Description */}
                                  <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">{task.notes}</p>

                                  {/* Informations de création */}
                                  {!isClosed ? (
                                    <div className="flex items-center gap-2 mb-2">
                                      <div className={`w-8 h-8 rounded-full ${getAvatarColor(task.creator.login)} text-white text-xs flex items-center justify-center font-semibold`}>
                                        {getInitials(task.creator.login)}
                                      </div>
                                      <div className="flex-1">
                                        <div className="text-sm font-medium">{task.creator.login}</div>
                                        <div className="text-xs text-gray-500 dark:text-gray-400">
                                          {createdAt.toLocaleDateString("fr-FR", { day: "2-digit", month: "2-digit", year: "numeric" })} {createdAt.toLocaleTimeString("fr-FR", { hour: "2-digit", minute: "2-digit" })}
                                        </div>
                                      </div>
                                      <span className="text-xs text-gray-400 dark:text-gray-500">Non clôturée</span>
                                    </div>
                                  ) : (
                                    <div className="flex items-start gap-4 flex-wrap">
                                      <div className="flex-1 min-w-[200px]">
                                        <div className="text-xs text-gray-500 dark:text-gray-400 mb-1">Créée par :</div>
                                        <div className="flex items-center gap-2">
                                          <div className={`w-6 h-6 rounded-full ${getAvatarColor(task.creator.login)} text-white text-xs flex items-center justify-center font-semibold`}>
                                            {getInitials(task.creator.login)}
                                          </div>
                                          <span className="text-sm">{task.creator.login}</span>
                                          <span className="text-xs text-gray-500 dark:text-gray-400">
                                            {createdAt.toLocaleDateString("fr-FR", { day: "2-digit", month: "2-digit", year: "numeric" })} {createdAt.toLocaleTimeString("fr-FR", { hour: "2-digit", minute: "2-digit" })}
                                          </span>
                                        </div>
                                      </div>
                                      {task.closer && closedAt && (
                                        <div className="flex-1 min-w-[200px]">
                                          <div className="text-xs text-green-600 dark:text-green-400 mb-1">Clôturée par :</div>
                                          <div className="flex items-center gap-2">
                                            <div className={`w-6 h-6 rounded-full ${getAvatarColor(task.closer.login)} text-white text-xs flex items-center justify-center font-semibold`}>
                                              {getInitials(task.closer.login)}
                                            </div>
                                            <span className="text-sm">{task.closer.login}</span>
                                            <span className="text-xs text-gray-500 dark:text-gray-400">
                                              {closedAt.toLocaleDateString("fr-FR", { day: "2-digit", month: "2-digit", year: "numeric" })} {closedAt.toLocaleTimeString("fr-FR", { hour: "2-digit", minute: "2-digit" })}
                                            </span>
                                          </div>
                                        </div>
                                      )}
                                    </div>
                                  )}

                                  {/* Boutons d'action */}
                                  <div className="flex gap-2 mt-4">
                                    {userRole !== "User" && (
                                      <>
                                        <Button
                                          variant="default"
                                          size="sm"
                                          onClick={() => handleEditTask(task)}
                                          disabled={isClosed || !editing}
                                          className="flex-1"
                                        >
                                          <Edit className="h-4 w-4 mr-1" />
                                          Modifier
                                        </Button>
                                        <Button
                                          variant="outline"
                                          size="sm"
                                          onClick={() => handleCloseTask(task)}
                                          disabled={isClosed || !editing}
                                          className="flex-1 bg-green-50 hover:bg-green-100 text-green-700 border-green-300"
                                        >
                                          <CheckCircle className="h-4 w-4 mr-1" />
                                          Clôturer
                                        </Button>
                                      </>
                                    )}
                                    {userRole === "Super Admin" && (
                                      <Button
                                        variant="outline"
                                        size="sm"
                                        onClick={() => handleDeleteTask(task)}
                                        disabled={!editing}
                                        className="flex-1 bg-red-50 hover:bg-red-100 text-red-700 border-red-300"
                                      >
                                        <Trash2 className="h-4 w-4 mr-1" />
                                        Supprimer
                                      </Button>
                                    )}
                                  </div>
                                </div>
                              </div>
                            </div>
                          )
                        })}
                      <div className="text-center text-sm text-gray-500 dark:text-gray-400 py-4">
                        Faites défiler pour voir plus de tâches
                        <ChevronDown className="h-4 w-4 mx-auto mt-1" />
                      </div>
                    </div>

                    {/* Vue desktop - Cartes */}
                    <div className="hidden sm:block">
                      <div className="space-y-4">
                        {tasks
                          .filter(t => taskFilter === "ALL" || t.importance === taskFilter)
                          .map((task) => {
                            const isClosed = !!task.closedAt
                            const createdAt = new Date(task.createdAt)
                            const closedAt = task.closedAt ? new Date(task.closedAt) : null
                            
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

                            const importanceColor = task.importance === "URGENT" 
                              ? "bg-red-500" 
                              : task.importance === "CRITIQUE" 
                              ? "bg-orange-500" 
                              : "bg-gray-500"

                            return (
                              <div
                                key={task.id}
                                className="bg-card dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 overflow-hidden"
                              >
                                {/* Barre colorée à gauche */}
                                <div className="flex">
                                  <div className={`w-1 ${importanceColor}`} />
                                  <div className="flex-1 p-4">
                                    {/* En-tête avec badges */}
                                    <div className="flex items-start justify-between mb-3">
                                      <h3 className="font-bold text-base flex-1 pr-2">{task.title}</h3>
                                      <div className="flex gap-2 flex-shrink-0">
                                        <span
                                          className={`px-2 py-1 rounded-full text-xs font-semibold text-white ${
                                            task.importance === "URGENT"
                                              ? "bg-red-500"
                                              : task.importance === "CRITIQUE"
                                              ? "bg-orange-500"
                                              : "bg-gray-500"
                                          }`}
                                        >
                                          {task.importance}
                                        </span>
                                        {isClosed && (
                                          <span className="px-2 py-1 rounded-full text-xs font-semibold bg-green-500 text-white">
                                            Clôturée
                                          </span>
                                        )}
                                      </div>
                                    </div>

                                    {/* Description */}
                                    <div className="mb-4">
                                      <p 
                                        className={`text-sm text-gray-600 dark:text-gray-400 pr-2 transition-all ${
                                          expandedTaskNotes[task.id] 
                                            ? 'max-h-none' 
                                            : 'max-h-[5rem] overflow-y-auto'
                                        }`}
                                        style={{ lineHeight: '1.25rem' }}
                                      >
                                        {task.notes}
                                      </p>
                                      {task.notes.length > 100 && (
                                        <button
                                          onClick={() => setExpandedTaskNotes(prev => ({
                                            ...prev,
                                            [task.id]: !prev[task.id]
                                          }))}
                                          className="mt-2 text-xs text-primary hover:underline flex items-center gap-1"
                                        >
                                          {expandedTaskNotes[task.id] ? (
                                            <>
                                              <ChevronUp className="h-3 w-3" />
                                              Réduire
                                            </>
                                          ) : (
                                            <>
                                              <ChevronDown className="h-3 w-3" />
                                              Voir plus
                                            </>
                                          )}
                                        </button>
                                      )}
                                    </div>

                                    {/* Informations de création */}
                                    {!isClosed ? (
                                      <div className="flex items-center gap-2 mb-2">
                                        <div className={`w-8 h-8 rounded-full ${getAvatarColor(task.creator.login)} text-white text-xs flex items-center justify-center font-semibold`}>
                                          {getInitials(task.creator.login)}
                                        </div>
                                        <div className="flex-1">
                                          <div className="text-sm font-medium">{task.creator.login}</div>
                                          <div className="text-xs text-gray-500 dark:text-gray-400">
                                            {createdAt.toLocaleDateString("fr-FR", { day: "2-digit", month: "2-digit", year: "numeric" })} {createdAt.toLocaleTimeString("fr-FR", { hour: "2-digit", minute: "2-digit" })}
                                          </div>
                                        </div>
                                        <span className="text-xs text-gray-400 dark:text-gray-500">Non clôturée</span>
                                      </div>
                                    ) : (
                                      <div className="flex items-start gap-4 flex-wrap">
                                        <div className="flex-1 min-w-[200px]">
                                          <div className="text-xs text-gray-500 dark:text-gray-400 mb-1">Créée par :</div>
                                          <div className="flex items-center gap-2">
                                            <div className={`w-6 h-6 rounded-full ${getAvatarColor(task.creator.login)} text-white text-xs flex items-center justify-center font-semibold`}>
                                              {getInitials(task.creator.login)}
                                            </div>
                                            <span className="text-sm">{task.creator.login}</span>
                                            <span className="text-xs text-gray-500 dark:text-gray-400">
                                              {createdAt.toLocaleDateString("fr-FR", { day: "2-digit", month: "2-digit", year: "numeric" })} {createdAt.toLocaleTimeString("fr-FR", { hour: "2-digit", minute: "2-digit" })}
                                            </span>
                                          </div>
                                        </div>
                                        {task.closer && closedAt && (
                                          <div className="flex-1 min-w-[200px]">
                                            <div className="text-xs text-green-600 dark:text-green-400 mb-1">Clôturée par :</div>
                                            <div className="flex items-center gap-2">
                                              <div className={`w-6 h-6 rounded-full ${getAvatarColor(task.closer.login)} text-white text-xs flex items-center justify-center font-semibold`}>
                                                {getInitials(task.closer.login)}
                                              </div>
                                              <span className="text-sm">{task.closer.login}</span>
                                              <span className="text-xs text-gray-500 dark:text-gray-400">
                                                {closedAt.toLocaleDateString("fr-FR", { day: "2-digit", month: "2-digit", year: "numeric" })} {closedAt.toLocaleTimeString("fr-FR", { hour: "2-digit", minute: "2-digit" })}
                                              </span>
                                            </div>
                                          </div>
                                        )}
                                      </div>
                                    )}

                                    {/* Boutons d'action */}
                                    <div className="flex gap-2 mt-4">
                                      {userRole !== "User" && (
                                        <>
                                          <Button
                                            variant="default"
                                            size="sm"
                                            onClick={() => handleEditTask(task)}
                                            disabled={isClosed || !editing}
                                            className="flex-1"
                                          >
                                            <Edit className="h-4 w-4 mr-1" />
                                            Modifier
                                          </Button>
                                          <Button
                                            variant="outline"
                                            size="sm"
                                            onClick={() => handleCloseTask(task)}
                                            disabled={isClosed || !editing}
                                            className="flex-1 bg-green-50 hover:bg-green-100 text-green-700 border-green-300"
                                          >
                                            <CheckCircle className="h-4 w-4 mr-1" />
                                            Clôturer
                                          </Button>
                                        </>
                                      )}
                                      {userRole === "Super Admin" && (
                                        <Button
                                          variant="outline"
                                          size="sm"
                                          onClick={() => handleDeleteTask(task)}
                                          disabled={!editing}
                                          className="flex-1 bg-red-50 hover:bg-red-100 text-red-700 border-red-300"
                                        >
                                          <Trash2 className="h-4 w-4 mr-1" />
                                          Supprimer
                                        </Button>
                                      )}
                                    </div>
                                  </div>
                                </div>
                              </div>
                            )
                          })}
                      </div>
                    </div>
                  </>
                )}

                {/* Légende - Desktop uniquement */}
                <div className="hidden sm:flex mt-4 flex-wrap gap-4 text-xs text-muted-foreground">
                  <div className="flex items-center gap-2">
                    <span className="px-2 py-1 rounded bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400 font-semibold">URGENT</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="px-2 py-1 rounded bg-orange-100 text-orange-800 dark:bg-orange-900/30 dark:text-orange-400 font-semibold">CRITIQUE</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="px-2 py-1 rounded bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-300 font-semibold">INFO</span>
                  </div>
                </div>
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
                                draggable={editing}
                                onDragStart={(e) => {
                                  setDraggedPCId(pc.id)
                                  e.dataTransfer.effectAllowed = "move"
                                }}
                                onDragEnd={() => {
                                  setDraggedPCId(null)
                                  setDragOverIndex(null)
                                }}
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
                                className={`border p-3 sm:p-4 rounded-lg space-y-2 sm:space-y-3 ${
                                  draggedPCId === pc.id ? "opacity-50" : ""
                                } ${
                                  dragOverIndex === index ? "border-primary border-2" : ""
                                } ${editing ? "cursor-move" : ""}`}
                              >
                                <div className="flex items-start justify-between">
                                  {editing && (
                                    <div className="mr-2 text-muted-foreground cursor-move">
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
                                                    <div key={idx} className="relative w-full h-32">
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
                                      >
                                        <Edit className="h-4 w-4" />
                                      </Button>
                                      <Button
                                        variant="ghost"
                                        size="sm"
                                        onClick={() => handleDeletePC(pc.id)}
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
                          <div className="text-muted-foreground">Aucun PC enregistré</div>
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
                          <div className="text-muted-foreground">Aucune imprimante enregistrée</div>
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
                                          onClick={async () => {
                                            if (!confirm("Supprimer ce point d'accès ?")) return
                                            try {
                                              const response = await fetch(`/api/wifi-access-points/${ap.id}`, {
                                                method: "DELETE",
                                              })
                                              if (response.ok) {
                                                await loadAgencyDetails(selectedAgency!.id)
                                              }
                                            } catch (error) {
                                              console.error("Error deleting wifi AP:", error)
                                            }
                                          }}
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
                                        onClick={async () => {
                                          if (!confirm("Supprimer cette caméra ?")) return
                                          try {
                                            const response = await fetch(`/api/cameras/${camera.id}`, {
                                              method: "DELETE",
                                            })
                                            if (response.ok) {
                                              await loadAgencyDetails(selectedAgency!.id)
                                            }
                                          } catch (error) {
                                            console.error("Error deleting camera:", error)
                                          }
                                        }}
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
                                alert("Seul le Super Admin peut supprimer les notes techniques")
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
                                        onClick={async () => {
                                          if (!confirm("Supprimer ce champ ?")) return
                                          try {
                                            const response = await fetch(`/api/dynamic-fields/${field.id}`, {
                                              method: "DELETE",
                                            })
                                            if (response.ok) {
                                              await loadAgencyDetails(selectedAgency!.id)
                                            }
                                          } catch (error) {
                                            console.error("Error deleting dynamic field:", error)
                                          }
                                        }}
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
                <Card>
                  <CardHeader>
                    <div className="flex flex-col gap-4">
                      <div className="flex items-center justify-between">
                        <CardTitle>Photos</CardTitle>
                        {editing && (
                          <Button onClick={handleAddPhotoGroup} size="sm" className="gap-2">
                            <Plus className="h-4 w-4" />
                            Ajouter
                          </Button>
                        )}
                      </div>
                      {/* Champ de recherche */}
                      <div className="relative">
                        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                        <Input
                          type="text"
                          placeholder="Rechercher par libellé ou type de photo..."
                          value={photoSearch}
                          onChange={(e) => setPhotoSearch(e.target.value)}
                          className="pl-9 pr-9"
                        />
                        {photoSearch && (
                          <button
                            type="button"
                            onClick={() => setPhotoSearch("")}
                            className="absolute right-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground hover:text-foreground transition-colors"
                            aria-label="Effacer la recherche"
                          >
                            <X className="h-4 w-4" />
                          </button>
                        )}
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    {fullAgencyData.photos && fullAgencyData.photos.length > 0 ? (
                      (() => {
                        // Normaliser le terme de recherche (minuscules, sans accents)
                        const normalizeSearch = (text: string) => {
                          return text.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "")
                        }
                        const searchTerm = normalizeSearch(photoSearch)

                        // Grouper toutes les photos par type (toutes les photos d'un même type ensemble)
                        const photosByType = fullAgencyData.photos.reduce((acc, photoGroup) => {
                          const type = photoGroup.type
                          const photos = JSON.parse(photoGroup.photos || "[]")
                          if (!acc[type]) {
                            acc[type] = []
                          }
                          // Ajouter toutes les photos du groupe avec leur titre et date
                          photos.forEach((photo: string | { path: string; createdAt?: string; title?: string }) => {
                            // Normaliser : gérer les strings (ancien format) et les objets (nouveau format)
                            const photoPath = typeof photo === "string" ? photo : photo.path
                            const createdAt = typeof photo === "string" ? null : (photo.createdAt || null)
                            // Utiliser le titre de la photo si disponible, sinon celui du groupe (rétrocompatibilité)
                            const photoTitle = typeof photo === "object" && photo.title !== undefined 
                              ? photo.title 
                              : (photoGroup.title || "")
                            
                            // Filtrer selon la recherche : par libellé (title) ou par type
                            const matchesSearch = !searchTerm || 
                              normalizeSearch(photoTitle).includes(searchTerm) ||
                              normalizeSearch(type).includes(searchTerm)
                            
                            if (matchesSearch) {
                              acc[type].push({
                                url: photoPath,
                                title: photoTitle,
                                createdAt: createdAt,
                                type: photoGroup.type,
                                photoGroupId: photoGroup.id,
                              })
                            }
                          })
                          return acc
                        }, {} as Record<string, Array<{ url: string; title?: string; createdAt: string | null; type: string; photoGroupId: string }>>)

                        // Filtrer les types qui ont des photos après le filtrage
                        const photoTypes = Object.keys(photosByType)
                          .filter(type => photosByType[type].length > 0)
                          .sort()
                        const defaultTab = photoTypes.length > 0 ? photoTypes[0] : ""
                        
                        // Initialiser le tab sélectionné si vide ou si le type n'existe plus
                        if (!selectedPhotoTypeTab || !photoTypes.includes(selectedPhotoTypeTab)) {
                          if (defaultTab && selectedPhotoTypeTab !== defaultTab) {
                            setSelectedPhotoTypeTab(defaultTab)
                          }
                        }

                        // Si aucune photo ne correspond à la recherche
                        if (photoTypes.length === 0) {
                          return (
                            <div className="text-muted-foreground text-center py-8">
                              {photoSearch ? (
                                <>Aucune photo ne correspond à la recherche &quot;{photoSearch}&quot;</>
                              ) : (
                                <>Aucune photo enregistrée</>
                              )}
                            </div>
                          )
                        }

                        return (
                          <Tabs 
                            value={selectedPhotoTypeTab || defaultTab} 
                            onValueChange={setSelectedPhotoTypeTab}
                            className="w-full"
                          >
                            <div className="w-full mb-4 clear-both">
                              <TabsList className="bg-background w-full sm:w-auto flex flex-wrap gap-1 sm:gap-0 sm:inline-flex h-auto sm:h-10" style={{ backgroundColor: 'hsl(var(--background))' }}>
                                {photoTypes.map((type) => (
                                  <TabsTrigger 
                                    key={type} 
                                    value={type}
                                    className="text-xs sm:text-sm min-h-[44px] flex-shrink-0"
                                  >
                                    {type} ({photosByType[type].length})
                                  </TabsTrigger>
                                ))}
                              </TabsList>
                            </div>
                            
                            {photoTypes.map((type) => {
                              const photos = photosByType[type]
                              return (
                                <TabsContent key={type} value={type} className="mt-0 clear-both">
                                  <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-2">
                                    {photos.map((photo, index) => {
                                      // Trouver le PhotoGroup qui contient cette photo
                                      const photoGroup = fullAgencyData.photos?.find(
                                        (pg) => pg.id === photo.photoGroupId
                                      )
                                      const photoIndex = photoGroup
                                        ? JSON.parse(photoGroup.photos || "[]").findIndex((p: string | { path: string; createdAt?: string }) => {
                                            const path = typeof p === "string" ? p : p.path
                                            return path === photo.url
                                          })
                                        : -1

                                      return (
                                        <div
                                          key={`${photo.photoGroupId}-${index}`}
                                          className="relative flex flex-col aspect-square w-full bg-gray-100 dark:bg-secondary rounded overflow-hidden group"
                                        >
                                          {/* Image cliquable pour lightbox */}
                                          <div
                                            className="flex-1 flex items-center justify-center overflow-hidden cursor-pointer hover:opacity-80 transition-opacity"
                                            onClick={() => {
                                              // Récupérer toutes les photos du même type pour la lightbox
                                              const allPhotosOfType = fullAgencyData.photos
                                                ?.filter((pg) => pg.type === type)
                                                .flatMap((pg) => {
                                                  const pgPhotos = JSON.parse(pg.photos || "[]")
                                                  return pgPhotos.map((p: string | { path: string; createdAt?: string; title?: string }) => {
                                                    const path = typeof p === "string" ? p : p.path
                                                    const createdAt = typeof p === "string" ? null : (p.createdAt || null)
                                                    const photoTitle = typeof p === "object" && p.title !== undefined 
                                                      ? p.title 
                                                      : (pg.title || "")
                                                    return {
                                                      url: path,
                                                      title: photoTitle,
                                                      createdAt: createdAt,
                                                      type: pg.type,
                                                    }
                                                  })
                                                }) || []

                                              // Trouver l'index de la photo cliquée
                                              const currentIndex = allPhotosOfType.findIndex((p) => p.url === photo.url)
                                              setLightboxPhotos(allPhotosOfType)
                                              setLightboxCurrentIndex(currentIndex >= 0 ? currentIndex : 0)
                                              setZoomLevel(1)
                                              setZoomPosition({ x: 0, y: 0 })
                                              setHasDragged(false)
                                              setLightboxOpen(true)
                                            }}
                                          >
                                            <div className="relative w-full h-full">
                                              <Image
                                                src={photo.url}
                                                alt={`${type} ${index + 1}`}
                                                fill
                                                className="object-contain"
                                                unoptimized
                                              />
                                            </div>
                                          </div>
                                          {/* Titre et date en bas */}
                                          {(photo.title || photo.createdAt) && (
                                            <div className="bg-black/60 text-white text-xs px-2 py-1 flex items-center justify-between gap-2">
                                              <span className="truncate flex-1">{photo.title || ""}</span>
                                              {photo.createdAt && (
                                                <span className="text-white/80 text-[10px] whitespace-nowrap">
                                                  {new Date(photo.createdAt).toLocaleDateString("fr-FR", {
                                                    day: "2-digit",
                                                    month: "2-digit",
                                                    year: "numeric"
                                                  })}
                                                </span>
                                              )}
                                            </div>
                                          )}
                                          {/* Boutons d'action en mode édition */}
                                          {editing && (
                                            <div className="absolute top-2 right-2 flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                                              <Button
                                                variant="secondary"
                                                size="sm"
                                                className="h-6 w-6 p-0"
                                                onClick={(e) => {
                                                  e.stopPropagation()
                                                  // Ouvrir le dialog d'édition du titre et de la date de cette photo spécifique
                                                  setEditingPhotoUrl(photo.url)
                                                  setEditingPhotoGroupId(photoGroup?.id || "")
                                                  setEditingPhotoTitle(photo.title || "")
                                                  // Initialiser la date de création : utiliser createdAt si disponible, sinon date du jour
                                                  const photoCreatedAt = photo.createdAt 
                                                    ? new Date(photo.createdAt).toISOString().split('T')[0]
                                                    : new Date().toISOString().split('T')[0]
                                                  setEditingPhotoCreatedAt(photoCreatedAt)
                                                  setIsEditPhotoTitleDialogOpen(true)
                                                }}
                                                title="Modifier le titre"
                                              >
                                                <Edit className="h-3 w-3" />
                                              </Button>
                                              <Button
                                                variant="destructive"
                                                size="sm"
                                                className="h-6 w-6 p-0"
                                                onClick={(e) => {
                                                  e.stopPropagation()
                                                  handleDeletePhoto(photoGroup?.id || "", photo.url)
                                                }}
                                                title="Supprimer la photo"
                                              >
                                                <Trash2 className="h-3 w-3" />
                                              </Button>
                                            </div>
                                          )}
                                        </div>
                                      )
                                    })}
                                  </div>
                                </TabsContent>
                              )
                            })}
                          </Tabs>
                        )
                      })()
                    ) : (
                      <div className="text-muted-foreground">
                        Aucune photo enregistrée
                      </div>
                    )}
                  </CardContent>
                </Card>
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
            <div className="p-6 flex items-center justify-center h-full text-muted-foreground">
              Sélectionnez une agence
            </div>
          )}
        </div>
      </div>
      
      {/* Dialog de création agence */}
      <Dialog open={isCreateDialogOpen} onOpenChange={setIsCreateDialogOpen}>
        <DialogContent className="max-w-[95vw] sm:max-w-lg">
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

      {/* Dialog adresse */}
      <Dialog open={isAddressDialogOpen} onOpenChange={setIsAddressDialogOpen}>
        <DialogContent className="max-w-[95vw] sm:max-w-2xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>
              {selectedAddress ? "Modifier l'adresse" : "Nouvelle adresse"}
            </DialogTitle>
            <DialogDescription>
              Recherchez une adresse via l&apos;API BAN ou saisissez-la manuellement.
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-4">
            {/* Choix du mode */}
            <div className="space-y-2">
              <Label>Mode de saisie</Label>
              <div className="flex gap-4">
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="radio"
                    name="addressMode"
                    value="ban"
                    checked={addressMode === "ban"}
                    onChange={(e) => {
                      setAddressMode("ban")
                      setSelectedBANAddress(null)
                    }}
                  />
                  <span>Recherche API BAN</span>
                </label>
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="radio"
                    name="addressMode"
                    value="manual"
                    checked={addressMode === "manual"}
                    onChange={(e) => {
                      setAddressMode("manual")
                      setSelectedBANAddress(null)
                    }}
                  />
                  <span>Saisie manuelle</span>
                </label>
              </div>
            </div>

            {/* Mode BAN */}
            {addressMode === "ban" && (
              <div className="space-y-2">
                <Label>Recherche d&apos;adresse (API BAN) *</Label>
                <AddressSearch
                  onSelect={(address) => {
                    setSelectedBANAddress(address)
                    if (!addressLabel) {
                      setAddressLabel(address.label)
                    }
                  }}
                />
              </div>
            )}

            {/* Mode manuel */}
            {addressMode === "manual" && (
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="manual-street">Rue *</Label>
                  <Input
                    id="manual-street"
                    value={manualStreet}
                    onChange={(e) => setManualStreet(e.target.value)}
                    placeholder="Ex: 23-25 Rue Jean-Jacques Rousseau"
                  />
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 sm:gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="manual-postal-code">Code postal *</Label>
                    <Input
                      id="manual-postal-code"
                      value={manualPostalCode}
                      onChange={(e) => setManualPostalCode(e.target.value)}
                      placeholder="Ex: 75001"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="manual-city">Ville *</Label>
                    <Input
                      id="manual-city"
                      value={manualCity}
                      onChange={(e) => setManualCity(e.target.value)}
                      placeholder="Ex: Paris"
                    />
                  </div>
                </div>
              </div>
            )}

            <div className="space-y-2">
              <Label htmlFor="address-label">Label *</Label>
              <Input
                id="address-label"
                value={addressLabel}
                onChange={(e) => setAddressLabel(e.target.value)}
                placeholder="Label de l'adresse"
              />
            </div>
          </div>
          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => {
                setIsAddressDialogOpen(false)
                setSelectedAddress(null)
                setAddressLabel("")
                setSelectedBANAddress(null)
                setAddressMode("ban")
                setManualStreet("")
                setManualCity("")
                setManualPostalCode("")
              }}
            >
              Annuler
            </Button>
            <Button
              onClick={handleSaveAddress}
              disabled={
                !addressLabel.trim() ||
                (addressMode === "ban" && !selectedBANAddress) ||
                (addressMode === "manual" && (!manualStreet.trim() || !manualCity.trim() || !manualPostalCode.trim()))
              }
            >
              Enregistrer
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Dialog contact */}
      <Dialog open={isContactDialogOpen} onOpenChange={setIsContactDialogOpen}>
        <DialogContent className="max-w-[95vw] sm:max-w-2xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>
              {selectedContact ? "Modifier le contact" : "Nouveau contact"}
            </DialogTitle>
            <DialogDescription>
              Remplissez tous les champs obligatoires selon le format requis.
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-4 max-h-[70vh] overflow-y-auto">
            <div className="space-y-2">
              <Label htmlFor="contact-manager">Nom *</Label>
              <Input
                id="contact-manager"
                value={contactManagerName}
                onChange={(e) => setContactManagerName(e.target.value)}
                placeholder="Nom"
              />
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="contact-post">Numéro de poste (6 chiffres)</Label>
                <Input
                  id="contact-post"
                  value={contactPostNumber}
                  onChange={(e) => setContactPostNumber(e.target.value)}
                  placeholder="000000"
                  maxLength={6}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="contact-agent">Numéro d&apos;agent (4 chiffres)</Label>
                <Input
                  id="contact-agent"
                  value={contactAgentNumber}
                  onChange={(e) => setContactAgentNumber(e.target.value)}
                  placeholder="0000"
                  maxLength={4}
                />
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="contact-direct">Ligne directe</Label>
              <Input
                id="contact-direct"
                value={contactDirectLine}
                onChange={(e) => setContactDirectLine(e.target.value)}
                placeholder="00 00 00 00 00 ou 0000000000"
              />
            </div>
            <div className="space-y-2">
              <Label>Emails</Label>
              <div className="flex gap-2">
                <Input
                  value={contactEmailInput}
                  onChange={(e) => setContactEmailInput(e.target.value)}
                  placeholder="email@example.com"
                  onKeyDown={(e) => {
                    if (e.key === "Enter") {
                      e.preventDefault()
                      handleAddEmail()
                    }
                  }}
                />
                <Button type="button" onClick={handleAddEmail} variant="outline">
                  Ajouter
                </Button>
              </div>
              {contactEmails.length > 0 && (
                <div className="flex flex-wrap gap-2 mt-2">
                  {contactEmails.map((email, index) => (
                    <div
                      key={index}
                      className="flex items-center gap-1 px-2 py-1 bg-accent rounded"
                    >
                      <span className="text-sm">{email}</span>
                      <Button
                        type="button"
                        variant="ghost"
                        size="sm"
                        onClick={() => handleRemoveEmail(email)}
                        className="h-5 w-5 p-0"
                      >
                        <X className="h-3 w-3" />
                      </Button>
                    </div>
                  ))}
                </div>
              )}
            </div>
            <div className="space-y-2">
              <Label htmlFor="contact-note">Note</Label>
              <Textarea
                id="contact-note"
                value={contactNote}
                onChange={(e) => setContactNote(e.target.value)}
                placeholder="Note optionnelle"
                rows={3}
                maxLength={1000}
              />
              {contactNote.length > 100 && (
                <p className={`text-xs mt-1 ${
                  contactNote.length > 1000 
                    ? "text-destructive" 
                    : contactNote.length > 900 
                    ? "text-orange-600 dark:text-orange-400" 
                    : "text-muted-foreground"
                }`}>
                  {contactNote.length} / 1000 caractères
                </p>
              )}
            </div>
          </div>
          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => {
                setIsContactDialogOpen(false)
                setSelectedContact(null)
              }}
            >
              Annuler
            </Button>
            <Button
              onClick={handleSaveContact}
              disabled={!contactManagerName}
            >
              Enregistrer
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Dialog photos */}
      <Dialog open={isPhotoDialogOpen} onOpenChange={setIsPhotoDialogOpen}>
        <DialogContent className="max-w-[95vw] sm:max-w-2xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>
              {selectedPhotoGroup ? "Modifier le groupe de photos" : "Nouveau groupe de photos"}
            </DialogTitle>
            <DialogDescription>
              Sélectionnez un type et uploadez des photos (jpeg, png, max 5 MB).
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="photo-type">Type de photos *</Label>
              <Select value={photoGroupType} onValueChange={setPhotoGroupType}>
                <SelectTrigger id="photo-type">
                  <SelectValue placeholder="Sélectionner un type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Bureau">Photos Bureau</SelectItem>
                  <SelectItem value="Connexion">Photos Connexion</SelectItem>
                  <SelectItem value="Armoire électrique">
                    Photos Armoire électrique
                  </SelectItem>
                  <SelectItem value="Agence">Photos de l&apos;agence</SelectItem>
                  <SelectItem value="Divers">Photos Divers</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="photo-title">Titre</Label>
              <Input
                id="photo-title"
                value={photoGroupTitle}
                onChange={(e) => setPhotoGroupTitle(e.target.value)}
                placeholder="Titre du groupe de photos (optionnel)"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="photo-files">Photos (jpeg, png, max 5 MB)</Label>
              <Input
                id="photo-files"
                type="file"
                accept="image/jpeg,image/png"
                multiple
                onChange={(e) => {
                  const files = Array.from(e.target.files || [])
                  const MAX_SIZE = 5 * 1024 * 1024 // 5 MB
                  
                  // Vérifier la taille de chaque fichier
                  const validFiles: File[] = []
                  const invalidFiles: string[] = []
                  
                  files.forEach((file) => {
                    if (file.size > MAX_SIZE) {
                      invalidFiles.push(file.name)
                    } else {
                      validFiles.push(file)
                    }
                  })
                  
                  // Afficher un message d'erreur si des fichiers sont trop volumineux
                  if (invalidFiles.length > 0) {
                    alert(
                      `Les fichiers suivants dépassent la taille maximale de 5 MB et n'ont pas été ajoutés :\n${invalidFiles.join("\n")}\n\nLa taille maximale autorisée est de 5 MB par fichier.`
                    )
                  }
                  
                  setPhotoFiles(validFiles)
                }}
              />
              {photoFiles.length > 0 && (
                <div className="text-sm text-muted-foreground">
                  {photoFiles.length} fichier(s) sélectionné(s)
                </div>
              )}
            </div>
            {selectedPhotoGroup && (
              <div className="space-y-2">
                <Label>Photos existantes</Label>
                <div className="grid grid-cols-3 gap-2">
                  {JSON.parse(selectedPhotoGroup.photos || "[]").map(
                    (photo: string | { path: string; createdAt?: string }, index: number) => {
                      // Normaliser : gérer les strings (ancien format) et les objets (nouveau format)
                      const photoPath = typeof photo === "string" ? photo : photo.path
                      return (
                        <div key={index} className="relative w-full h-24">
                          <Image
                            src={photoPath}
                            alt={`Photo ${index + 1}`}
                            fill
                            className="object-cover rounded border"
                            unoptimized
                          />
                          {typeof photo === "object" && photo.createdAt && (
                            <div className="absolute bottom-0 left-0 right-0 bg-black/60 text-white text-[10px] px-1 py-0.5 text-center">
                              {new Date(photo.createdAt).toLocaleDateString("fr-FR", {
                                day: "2-digit",
                                month: "2-digit",
                                year: "numeric"
                              })}
                            </div>
                          )}
                        </div>
                      )
                    }
                  )}
                </div>
              </div>
            )}
          </div>
          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => {
                setIsPhotoDialogOpen(false)
                setSelectedPhotoGroup(null)
                setPhotoGroupType("")
                setPhotoGroupTitle("")
                setPhotoFiles([])
              }}
            >
              Annuler
            </Button>
            <Button onClick={handleSavePhotoGroup} disabled={!photoGroupType}>
              Enregistrer
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Dialog édition titre photo individuelle */}
      <Dialog open={isEditPhotoTitleDialogOpen} onOpenChange={setIsEditPhotoTitleDialogOpen}>
        <DialogContent className="max-w-[95vw] sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Modifier la photo</DialogTitle>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="edit-photo-title">Titre</Label>
              <Input
                id="edit-photo-title"
                value={editingPhotoTitle}
                onChange={(e) => setEditingPhotoTitle(e.target.value)}
                placeholder="Titre de la photo (optionnel)"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="edit-photo-date">Date de création</Label>
              <Input
                id="edit-photo-date"
                type="date"
                value={editingPhotoCreatedAt}
                onChange={(e) => setEditingPhotoCreatedAt(e.target.value)}
              />
            </div>
            {editingPhotoUrl && (
              <div className="space-y-2">
                <Label>Aperçu</Label>
                <div className="relative aspect-square w-full bg-gray-100 dark:bg-secondary rounded overflow-hidden">
                  <Image
                    src={editingPhotoUrl}
                    alt="Aperçu"
                    fill
                    className="object-contain"
                    unoptimized
                  />
                </div>
              </div>
            )}
          </div>
          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => {
                setIsEditPhotoTitleDialogOpen(false)
                setEditingPhotoUrl("")
                setEditingPhotoGroupId("")
                setEditingPhotoTitle("")
                setEditingPhotoCreatedAt("")
              }}
            >
              Annuler
            </Button>
            <Button onClick={handleSavePhotoTitle}>
              Enregistrer
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Dialog PC */}
      <Dialog open={isPCDialogOpen} onOpenChange={setIsPCDialogOpen}>
        <DialogContent className="max-w-[95vw] sm:max-w-2xl max-h-[90vh] overflow-y-auto">
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
                  alert(error.error || "Erreur lors de la sauvegarde")
                }
              } catch (error) {
                console.error("Error saving wifi AP:", error)
                alert("Erreur lors de la sauvegarde")
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
                  alert(error.error || "Erreur lors de la sauvegarde")
                }
              } catch (error) {
                console.error("Error saving camera:", error)
                alert("Erreur lors de la sauvegarde")
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
                  alert(error.error || "Erreur lors de la sauvegarde")
                }
              } catch (error) {
                console.error("Error saving dynamic field:", error)
                alert("Erreur lors de la sauvegarde")
              }
            }}
            onCancel={() => {
              setIsDynamicFieldDialogOpen(false)
              setSelectedDynamicField(null)
            }}
          />
        </DialogContent>
      </Dialog>

      {/* Lightbox pour les photos - Plein écran */}
      {lightboxOpen && lightboxPhotos.length > 0 && (
        <div
          className="fixed inset-0 z-[9999] bg-black flex items-center justify-center"
          onClick={(e) => {
            // Fermer si on clique en dehors de la photo
            if (e.target === e.currentTarget) {
              setLightboxOpen(false)
            }
          }}
        >
          <div className="relative w-full h-full flex items-center justify-center">
            {/* Flèche gauche */}
            <button
              onClick={(e) => {
                e.stopPropagation()
                handlePreviousPhoto()
              }}
              className="absolute left-4 z-10 p-2 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors"
              aria-label="Photo précédente"
            >
              <ChevronLeft className="h-8 w-8" />
            </button>

            {/* Photo agrandie - Plein écran */}
            <div className="relative w-full h-full flex flex-col items-center justify-center">
              <div className="relative w-full h-full flex items-center justify-center overflow-hidden">
                <div 
                  className="relative w-full h-full"
                  onWheel={handleZoom}
                  onMouseDown={handleMouseDown}
                  onMouseMove={handleMouseMove}
                  onMouseUp={handleMouseUp}
                  onMouseLeave={handleMouseUp}
                  onTouchStart={handleTouchStart}
                  onTouchMove={handleTouchMove}
                  onTouchEnd={handleTouchEnd}
                  onClick={handleImageClick}
                  style={{
                    transform: `scale(${zoomLevel}) translate(${zoomPosition.x}%, ${zoomPosition.y}%)`,
                    transformOrigin: 'center center',
                    transition: (zoomLevel === 1 && !isDragging) ? 'transform 0.2s ease-out' : 'none',
                    cursor: zoomLevel > 1 ? (isDragging ? 'grabbing' : 'grab') : 'zoom-in',
                    touchAction: 'none'
                  }}
                >
                  <Image
                    src={lightboxPhotos[lightboxCurrentIndex].url}
                    alt={`Photo ${lightboxCurrentIndex + 1}`}
                    fill
                    className="object-contain pointer-events-none"
                    unoptimized
                  />
                </div>
                {/* Titre en bas, centré */}
                {lightboxPhotos[lightboxCurrentIndex].title && (
                  <div className="absolute bottom-4 left-1/2 -translate-x-1/2 bg-black/70 text-white px-6 py-3 rounded-lg text-center text-sm font-medium z-20">
                    {lightboxPhotos[lightboxCurrentIndex].title}
                  </div>
                )}
              </div>
            </div>

            {/* Flèche droite */}
            <button
              onClick={(e) => {
                e.stopPropagation()
                handleNextPhoto()
              }}
              className="absolute right-4 z-10 p-2 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors"
              aria-label="Photo suivante"
            >
              <ChevronRight className="h-8 w-8" />
            </button>

            {/* Bouton fermer */}
            <button
              onClick={(e) => {
                e.stopPropagation()
                setLightboxOpen(false)
              }}
              className="absolute top-4 right-4 z-10 p-2 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors"
              aria-label="Fermer"
            >
              <X className="h-6 w-6" />
            </button>
          </div>
        </div>
      )}

      {/* Dialog Création Tâche */}
      <Dialog open={isTaskDialogOpen} onOpenChange={setIsTaskDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Nouvelle tâche</DialogTitle>
            <DialogDescription>
              Créez une nouvelle tâche pour cette agence
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="task-title">Titre *</Label>
              <Input
                id="task-title"
                value={taskFormData.title}
                onChange={(e) => setTaskFormData((prev) => ({ ...prev, title: e.target.value }))}
                placeholder="Titre de la tâche..."
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="task-createdAt">Créée le</Label>
              <Input
                id="task-createdAt"
                type="datetime-local"
                value={taskFormData.createdAt}
                onChange={(e) => setTaskFormData((prev) => ({ ...prev, createdAt: e.target.value }))}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="task-notes">Notes *</Label>
              <Textarea
                id="task-notes"
                value={taskFormData.notes}
                onChange={(e) => setTaskFormData((prev) => ({ ...prev, notes: e.target.value }))}
                placeholder="Notes de la tâche..."
                rows={4}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="task-importance">Importance</Label>
              <Select
                value={taskFormData.importance}
                onValueChange={(value: "URGENT" | "CRITIQUE" | "INFO") =>
                  setTaskFormData((prev) => ({ ...prev, importance: value }))
                }
              >
                <SelectTrigger id="task-importance">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="URGENT">URGENT</SelectItem>
                  <SelectItem value="CRITIQUE">CRITIQUE</SelectItem>
                  <SelectItem value="INFO">INFO</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsTaskDialogOpen(false)}>
              Annuler
            </Button>
            <Button onClick={handleSaveTask}>Enregistrer</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Dialog Modification Tâche */}
      <Dialog open={isTaskEditDialogOpen} onOpenChange={setIsTaskEditDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Modifier la tâche</DialogTitle>
            <DialogDescription>
              Modifiez les informations de la tâche
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="task-edit-title">Titre *</Label>
              <Input
                id="task-edit-title"
                value={taskFormData.title}
                onChange={(e) => setTaskFormData((prev) => ({ ...prev, title: e.target.value }))}
                placeholder="Titre de la tâche..."
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="task-edit-createdAt">Créée le</Label>
              <Input
                id="task-edit-createdAt"
                type="datetime-local"
                value={taskFormData.createdAt}
                onChange={(e) => setTaskFormData((prev) => ({ ...prev, createdAt: e.target.value }))}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="task-edit-notes">Notes *</Label>
              <Textarea
                id="task-edit-notes"
                value={taskFormData.notes}
                onChange={(e) => setTaskFormData((prev) => ({ ...prev, notes: e.target.value }))}
                placeholder="Notes de la tâche..."
                rows={4}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="task-edit-importance">Importance</Label>
              <Select
                value={taskFormData.importance}
                onValueChange={(value: "URGENT" | "CRITIQUE" | "INFO") =>
                  setTaskFormData((prev) => ({ ...prev, importance: value }))
                }
              >
                <SelectTrigger id="task-edit-importance">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="URGENT">URGENT</SelectItem>
                  <SelectItem value="CRITIQUE">CRITIQUE</SelectItem>
                  <SelectItem value="INFO">INFO</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => {
              setIsTaskEditDialogOpen(false)
              setEditingTask(null)
              setTaskFormData({
                title: "",
                createdAt: "",
                notes: "",
                importance: "INFO",
              })
            }}>
              Annuler
            </Button>
            <Button onClick={handleUpdateTask}>Enregistrer</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Dialog Historique Notes techniques */}
      <Dialog open={isNotesHistoryDialogOpen} onOpenChange={setIsNotesHistoryDialogOpen}>
        <DialogContent className="max-w-[95vw] sm:max-w-3xl max-h-[90vh] overflow-y-auto">
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
                        onClick={async () => {
                          if (!fullAgencyData?.technical?.id) return
                          if (
                            !confirm(
                              `Êtes-vous sûr de vouloir restaurer la version ${entry.version} ?`
                            )
                          )
                            return

                          try {
                            const response = await fetch(
                              `/api/technical/${fullAgencyData.technical.id}/history/restore`,
                              {
                                method: "POST",
                                headers: { "Content-Type": "application/json" },
                                body: JSON.stringify({ version: entry.version }),
                              }
                            )

                            if (response.ok) {
                              setIsNotesHistoryDialogOpen(false)
                              // Recharger les données de l'agence
                              if (selectedAgency) {
                                loadAgencyDetails(selectedAgency.id)
                              }
                            } else {
                              const error = await response.json()
                              alert(error.error || "Erreur lors de la restauration")
                            }
                          } catch (error) {
                            console.error("Error restoring version:", error)
                            alert("Erreur lors de la restauration")
                          }
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
                          onClick={async () => {
                            if (!selectedAgency) return
                            if (
                              !confirm(
                                `Êtes-vous sûr de vouloir restaurer la version ${entry.version} ? Cette action est irréversible.`
                              )
                            )
                              return

                            try {
                              const response = await fetch(
                                `/api/agencies/${selectedAgency.id}/history/restore`,
                                {
                                  method: "POST",
                                  headers: { "Content-Type": "application/json" },
                                  body: JSON.stringify({ version: entry.version }),
                                }
                              )

                              if (response.ok) {
                                setIsAgencyHistoryDialogOpen(false)
                                // Recharger les données de l'agence
                                if (selectedAgency) {
                                  await loadAgencyDetails(selectedAgency.id)
                                  await loadAgencies()
                                }
                              } else {
                                const error = await response.json()
                                alert(error.error || "Erreur lors de la restauration")
                              }
                            } catch (error) {
                              console.error("Error restoring version:", error)
                              alert("Erreur lors de la restauration")
                            }
                          }}
                        >
                          Restaurer
                        </Button>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-2 text-sm">
                        <div>
                          <span className="font-medium">Nom:</span> {agencyData.name || "N/A"}
                        </div>
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
