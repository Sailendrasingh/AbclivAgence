"use client"

import { useState, useEffect, useMemo } from "react"
import Link from "next/link"
import {
  ChevronLeft,
  ChevronRight,
  Plus,
  Search,
  ChevronDown,
  ChevronRight as ChevronRightIcon,
  X,
  Calendar as CalendarIcon,
  Trash2,
  Menu,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { createPortal } from "react-dom"
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
  DialogDescription,
} from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { cn } from "@/lib/utils"
import { apiFetch } from "@/lib/api-client"
import { fetchCSRFToken } from "@/lib/csrf-client"

type ViewMode = "month" | "week" | "day" | "agenda"

interface TaskItem {
  id: string
  agencyId: string
  title: string
  createdAt: string
  closedAt: string | null
  importance: string
  notes?: string
  photos?: string | null
  agency: { name: string }
}

const MONTHS = [
  "Janvier", "Février", "Mars", "Avril", "Mai", "Juin",
  "Juillet", "Août", "Septembre", "Octobre", "Novembre", "Décembre",
]
const MONTHS_SHORT = ["Janv.", "Févr.", "Mars", "Avr.", "Mai", "Juin", "Juil.", "Août", "Sept.", "Oct.", "Nov.", "Déc."]
const DAYS_HEADER = ["LUN", "MAR", "MER", "JEU", "VEN", "SAM", "DIM"]
const DAYS_HEADER_LONG = ["Dimanche", "Lundi", "Mardi", "Mercredi", "Jeudi", "Vendredi", "Samedi"]
const HOURS = Array.from({ length: 24 }, (_, i) => i)

function getWeekNumber(d: Date): number {
  const date = new Date(d)
  date.setHours(0, 0, 0, 0)
  date.setDate(date.getDate() + 4 - (date.getDay() || 7))
  const yearStart = new Date(date.getFullYear(), 0, 1)
  return Math.ceil((((date.getTime() - yearStart.getTime()) / 86400000) + 1) / 7)
}

function getMonday(d: Date): Date {
  const date = new Date(d)
  const day = date.getDay()
  const diff = date.getDate() - day + (day === 0 ? -6 : 1)
  date.setDate(diff)
  date.setHours(0, 0, 0, 0)
  return date
}

function toYMD(d: Date): string {
  const y = d.getFullYear()
  const m = String(d.getMonth() + 1).padStart(2, "0")
  const day = String(d.getDate()).padStart(2, "0")
  return `${y}-${m}-${day}`
}

function sameDay(a: Date, b: Date): boolean {
  return a.getFullYear() === b.getFullYear() && a.getMonth() === b.getMonth() && a.getDate() === b.getDate()
}

function formatTime(dateStr: string): string {
  const d = new Date(dateStr)
  let hours = d.getHours()
  const minutes = String(d.getMinutes()).padStart(2, "0")
  const ampm = hours >= 12 ? "PM" : "AM"
  hours = hours % 12
  hours = hours ? hours : 12 // the hour '0' should be '12'
  return `${hours}:${minutes} ${ampm}`
}

function eventStyle(id: string, importance: string, closed: boolean): string {
  if (closed) return "bg-gray-50 text-gray-400 border-gray-100 border-l-gray-400"

  const colors = [
    { bg: "bg-rose-50", text: "text-rose-600", border: "border-rose-100", borderL: "border-l-rose-500" },
    { bg: "bg-emerald-50", text: "text-emerald-600", border: "border-emerald-100", borderL: "border-l-emerald-500" },
    { bg: "bg-purple-50", text: "text-purple-600", border: "border-purple-100", borderL: "border-l-purple-500" },
    { bg: "bg-blue-50", text: "text-blue-600", border: "border-blue-100", borderL: "border-l-blue-500" },
    { bg: "bg-amber-50", text: "text-amber-600", border: "border-amber-100", borderL: "border-l-amber-500" },
  ]

  const hash = id.split("").reduce((acc, char) => acc + char.charCodeAt(0), 0)
  const style = colors[hash % colors.length]

  return `${style.bg} ${style.text} ${style.border} ${style.borderL}`
}

function eventDotColor(id: string, importance: string, closed: boolean): string {
  if (closed) return "bg-gray-400"
  const colors = ["bg-rose-500", "bg-emerald-500", "bg-purple-500", "bg-blue-500", "bg-amber-500"]
  const hash = id.split("").reduce((acc, char) => acc + char.charCodeAt(0), 0)
  return colors[hash % colors.length]
}

export default function CalendrierPage() {
  const [viewMode, setViewMode] = useState<ViewMode>("month")
  const [focusDate, setFocusDate] = useState(() => new Date())
  const [miniCalendarMonth, setMiniCalendarMonth] = useState(() => new Date())
  const [searchQuery, setSearchQuery] = useState("")
  const [showClosed, setShowClosed] = useState(true)
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false)
  const [isMobileSheetOpen, setIsMobileSheetOpen] = useState(false)
  const [mounted, setMounted] = useState(false)
  const [tasks, setTasks] = useState<TaskItem[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const [selectedTask, setSelectedTask] = useState<TaskItem | null>(null)
  const [isEditingTask, setIsEditingTask] = useState(false)
  const [isSaving, setIsSaving] = useState(false)

  const [taskFormData, setTaskFormData] = useState<{
    title: string;
    createdAt: string;
    notes: string;
    importance: string;
    photos: string[];
  }>({
    title: "",
    createdAt: "",
    notes: "",
    importance: "INFO",
    photos: [],
  })

  const [taskPhotos, setTaskPhotos] = useState<{ path: string; preview: string }[]>([])
  const maxPhotosPerTask = 5

  // --- Lightbox States ---
  const [viewingImage, setViewingImage] = useState<string | null>(null)
  const [viewingImageList, setViewingImageList] = useState<string[]>([])
  const [viewingImageIndex, setViewingImageIndex] = useState(0)
  const [viewingImageTaskId, setViewingImageTaskId] = useState<string | null>(null)
  const [imageZoom, setImageZoom] = useState(1)
  const [imagePosition, setImagePosition] = useState({ x: 0, y: 0 })
  const [isImageDragging, setIsImageDragging] = useState(false)
  const [imageDragStart, setImageDragStart] = useState({ x: 0, y: 0 })
  const [imageHasDragged, setImageHasDragged] = useState(false)
  // ----------------------

  useEffect(() => {
    setMounted(true)

    // Set initial mobile view only once on load
    if (typeof window !== 'undefined' && window.innerWidth < 768) {
      setViewMode("agenda")
    }

    const handleResize = () => {
      if (window.innerWidth >= 1024) {
        setSidebarCollapsed(false)
        setIsMobileSheetOpen(false) // Close sheet if we resize to desktop
      }
    }

    handleResize()

    window.addEventListener("resize", handleResize)
    return () => window.removeEventListener("resize", handleResize)
  }, [])

  const openTaskDetails = (task: TaskItem) => {
    setSelectedTask(task)
    setIsEditingTask(false) // On l'ouvre directement en mode édition pour copier agences, mais gardons l'état
    setIsMobileSheetOpen(false) // Close mobile sheet if open

    // Format date for datetime-local
    const d = new Date(task.createdAt)
    const formattedDate = new Date(d.getTime() - d.getTimezoneOffset() * 60000).toISOString().slice(0, 16)

    let photosArr: string[] = []
    try {
      if (task.photos) {
        photosArr = JSON.parse(task.photos)
      }
    } catch (e) { }

    setTaskFormData({
      title: task.title,
      createdAt: formattedDate,
      notes: task.notes || "",
      importance: task.importance,
      photos: photosArr,
    })

    setTaskPhotos(photosArr.map(p => ({
      path: p,
      preview: p
    })))

    // Si on veut directement ouvrir en mode édition comme sur agences :
    setIsEditingTask(true)
  }

  // --- Lightbox Functions ---
  const openImageViewer = (photoPath: string, photoList: string[], index: number, taskId?: string) => {
    console.log("OPEN IMAGE VIEWER CLICKED", photoPath, photoList, index, taskId)
    setViewingImage(photoPath)
    setViewingImageList(photoList)
    setViewingImageIndex(index)
    setViewingImageTaskId(taskId || null)
    setImageZoom(1)
    setImagePosition({ x: 0, y: 0 })
    setImageHasDragged(false)
  }

  const handleImageZoom = (e: React.WheelEvent) => {
    e.preventDefault()
    const delta = e.deltaY > 0 ? -0.1 : 0.1
    const newZoom = Math.max(1, Math.min(5, imageZoom + delta))
    setImageZoom(newZoom)
    if (newZoom === 1) {
      setImagePosition({ x: 0, y: 0 })
    }
  }

  const handleImageMouseDown = (e: React.MouseEvent) => {
    if (imageZoom > 1) {
      setIsImageDragging(true)
      setImageHasDragged(false)
      setImageDragStart({ x: e.clientX - imagePosition.x, y: e.clientY - imagePosition.y })
    } else {
      setImageHasDragged(false)
    }
  }

  const handleImageMouseMove = (e: React.MouseEvent) => {
    if (isImageDragging && imageZoom > 1) {
      setImageHasDragged(true)
      setImagePosition({
        x: e.clientX - imageDragStart.x,
        y: e.clientY - imageDragStart.y,
      })
    }
  }

  const handleImageMouseUp = () => setIsImageDragging(false)

  const handleNextImage = () => {
    if (viewingImageList.length > 0) {
      const nextIndex = (viewingImageIndex + 1) % viewingImageList.length
      setViewingImageIndex(nextIndex)
      setViewingImage(viewingImageList[nextIndex])
      setImageZoom(1)
      setImagePosition({ x: 0, y: 0 })
      setImageHasDragged(false)
    }
  }

  const handlePrevImage = () => {
    if (viewingImageList.length > 0) {
      const prevIndex = (viewingImageIndex - 1 + viewingImageList.length) % viewingImageList.length
      setViewingImageIndex(prevIndex)
      setViewingImage(viewingImageList[prevIndex])
      setImageZoom(1)
      setImagePosition({ x: 0, y: 0 })
      setImageHasDragged(false)
    }
  }

  const handleTaskImageClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!imageHasDragged && viewingImageList.length > 1 && imageZoom === 1) {
      const rect = e.currentTarget.getBoundingClientRect()
      const clickX = e.clientX - rect.left
      const middleX = rect.width / 2

      if (clickX < middleX) {
        handlePrevImage()
      } else {
        handleNextImage()
      }
    } else if (imageZoom > 1 && !imageHasDragged) {
      setImageZoom(1)
      setImagePosition({ x: 0, y: 0 })
    }
  }

  const handleDeleteImage = () => {
    if (!viewingImage || !viewingImageTaskId || !selectedTask) return
    if (confirm("Êtes-vous sûr de vouloir supprimer cette photo ?")) {
      const updatedPhotos = (taskFormData.photos || []).filter((_, i) => i !== viewingImageIndex)
      setTaskFormData((prev) => ({ ...prev, photos: updatedPhotos }))
      setTaskPhotos((prev) => prev.filter((_, i) => i !== viewingImageIndex))

      const newList = viewingImageList.filter((_, i) => i !== viewingImageIndex)
      setViewingImageList(newList)

      if (newList.length === 0) {
        setViewingImage(null)
      } else {
        const newIndex = Math.min(viewingImageIndex, newList.length - 1)
        setViewingImageIndex(newIndex)
        setViewingImage(newList[newIndex])
      }
    }
  }
  // --------------------------

  const handleSaveTask = async () => {
    if (!selectedTask) return
    setIsSaving(true)
    try {
      const res = await apiFetch(`/api/agencies/${selectedTask.agencyId}/tasks/${selectedTask.id}`, {
        method: "PUT",
        body: JSON.stringify({
          title: taskFormData.title,
          createdAt: taskFormData.createdAt ? new Date(taskFormData.createdAt).toISOString() : undefined,
          importance: taskFormData.importance,
          notes: taskFormData.notes,
          photos: taskFormData.photos.length > 0 ? taskFormData.photos : null,
        }),
      })
      if (!res.ok) throw new Error("Erreur lors de la modification")

      const updatedPhotosString = taskFormData.photos.length > 0 ? JSON.stringify(taskFormData.photos) : null
      setTasks(prev => prev.map(t =>
        t.id === selectedTask.id
          ? {
            ...t,
            title: taskFormData.title,
            importance: taskFormData.importance,
            notes: taskFormData.notes,
            photos: updatedPhotosString,
            createdAt: taskFormData.createdAt ? new Date(taskFormData.createdAt).toISOString() : t.createdAt
          }
          : t
      ))
      setIsEditingTask(false)
      setSelectedTask(null)
    } catch (e: any) {
      alert(e.message)
    } finally {
      setIsSaving(false)
    }
  }

  const range = useMemo(() => {
    if (viewMode === "agenda") {
      const start = new Date(focusDate.getFullYear(), focusDate.getMonth(), 1)
      const end = new Date(focusDate.getFullYear(), focusDate.getMonth() + 5, 0)
      return { from: toYMD(start), to: toYMD(end) }
    }
    if (viewMode === "month") {
      const start = new Date(focusDate.getFullYear(), focusDate.getMonth(), 1)
      const end = new Date(focusDate.getFullYear(), focusDate.getMonth() + 1, 0)
      return { from: toYMD(start), to: toYMD(end) }
    }
    if (viewMode === "week" || viewMode === "day") {
      const monday = viewMode === "day" ? getMonday(focusDate) : getMonday(focusDate)
      const sunday = new Date(monday)
      sunday.setDate(sunday.getDate() + 6)
      return { from: toYMD(monday), to: toYMD(sunday) }
    }
    const start = new Date(focusDate.getFullYear(), 0, 1)
    const end = new Date(focusDate.getFullYear(), 11, 31)
    return { from: toYMD(start), to: toYMD(end) }
  }, [viewMode, focusDate])

  useEffect(() => {
    let cancelled = false
    setLoading(true)
    setError(null)
    fetch(`/api/tasks?from=${range.from}&to=${range.to}`, { credentials: "include" })
      .then((res) => {
        if (!res.ok) throw new Error("Erreur chargement des tâches")
        return res.json()
      })
      .then((data) => {
        if (!cancelled) setTasks(Array.isArray(data) ? data : [])
      })
      .catch((e) => {
        if (!cancelled) setError(e.message)
      })
      .finally(() => {
        if (!cancelled) setLoading(false)
      })
    return () => { cancelled = true }
  }, [range.from, range.to])

  const filteredTasks = useMemo(() => {
    let list = tasks
    if (!showClosed) list = list.filter((t) => !t.closedAt)
    const q = searchQuery.trim().toLowerCase()
    if (q) list = list.filter((t) => t.title.toLowerCase().includes(q) || t.agency.name.toLowerCase().includes(q))
    return list
  }, [tasks, showClosed, searchQuery])

  const tasksByDay = useMemo(() => {
    const map: Record<string, TaskItem[]> = {}
    filteredTasks.forEach((t) => {
      const key = toYMD(new Date(t.createdAt))
      if (!map[key]) map[key] = []
      map[key].push(t)
    })
    return map
  }, [filteredTasks])

  const goPrev = () => {
    if (viewMode === "month") setFocusDate((d) => new Date(d.getFullYear(), d.getMonth() - 1))
    else if (viewMode === "day") setFocusDate((d) => { const n = new Date(d); n.setDate(n.getDate() - 1); return n })
    else if (viewMode === "week") setFocusDate((d) => { const n = new Date(d); n.setDate(n.getDate() - 7); return n })
    else setFocusDate((d) => new Date(d.getFullYear(), d.getMonth() - 1))
  }

  const goNext = () => {
    if (viewMode === "month") setFocusDate((d) => new Date(d.getFullYear(), d.getMonth() + 1))
    else if (viewMode === "day") setFocusDate((d) => { const n = new Date(d); n.setDate(n.getDate() + 1); return n })
    else if (viewMode === "week") setFocusDate((d) => { const n = new Date(d); n.setDate(n.getDate() + 7); return n })
    else setFocusDate((d) => new Date(d.getFullYear(), d.getMonth() + 1))
  }

  const goToday = () => setFocusDate(new Date())

  const viewTitle = useMemo(() => {
    if (viewMode === "month") return `${MONTHS[focusDate.getMonth()]} ${focusDate.getFullYear()}`
    if (viewMode === "week") {
      const monday = getMonday(focusDate)
      const sunday = new Date(monday)
      sunday.setDate(sunday.getDate() + 6)
      return `${MONTHS_SHORT[monday.getMonth()]} - ${MONTHS_SHORT[sunday.getMonth()]} ${focusDate.getFullYear()} Semaine ${getWeekNumber(monday)}`
    }
    if (viewMode === "day") return `${focusDate.getDate()} ${MONTHS[focusDate.getMonth()].toLowerCase()} ${focusDate.getFullYear()} Semaine ${getWeekNumber(focusDate)}`
    const endMonth = new Date(focusDate.getFullYear(), focusDate.getMonth() + 5, 1)
    return `${MONTHS_SHORT[focusDate.getMonth()]} - ${MONTHS_SHORT[endMonth.getMonth()]} ${endMonth.getFullYear()}`
  }, [viewMode, focusDate])

  const monthGrid = useMemo(() => {
    const year = focusDate.getFullYear()
    const month = focusDate.getMonth()
    const first = new Date(year, month, 1)
    const startMonday = getMonday(first)
    let current = new Date(startMonday)
    const cells: { date: Date; isCurrentMonth: boolean }[] = []
    for (let i = 0; i < 42; i++) {
      cells.push({ date: new Date(current), isCurrentMonth: current.getMonth() === month })
      current.setDate(current.getDate() + 1)
    }
    return cells
  }, [focusDate])

  const weekDays = useMemo(() => {
    const monday = getMonday(focusDate)
    return Array.from({ length: 7 }, (_, i) => { const d = new Date(monday); d.setDate(d.getDate() + i); return d })
  }, [focusDate])

  const today = new Date()

  const miniCalendarDays = useMemo(() => {
    const y = miniCalendarMonth.getFullYear()
    const m = miniCalendarMonth.getMonth()
    const first = new Date(y, m, 1)
    const startMonday = getMonday(first)
    let current = new Date(startMonday)
    const cells: { date: Date; isCurrentMonth: boolean }[] = []
    for (let i = 0; i < 42; i++) {
      cells.push({ date: new Date(current), isCurrentMonth: current.getMonth() === m })
      current.setDate(current.getDate() + 1)
    }
    return cells
  }, [miniCalendarMonth])

  const agendaGroups = useMemo(() => {
    const sorted = [...filteredTasks].sort(
      (a, b) => new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime()
    )
    const groups: { date: string; label: string; tasks: TaskItem[] }[] = []
    const seen = new Set<string>()
    sorted.forEach((t) => {
      const key = toYMD(new Date(t.createdAt))
      if (!seen.has(key)) {
        seen.add(key)
        const d = new Date(t.createdAt)
        const dayName = DAYS_HEADER_LONG[d.getDay()].slice(0, 3).toUpperCase()
        groups.push({
          date: key,
          label: `${d.getDate()} ${MONTHS_SHORT[d.getMonth()].toUpperCase()}, ${dayName}.`,
          tasks: [],
        })
      }
      const g = groups[groups.length - 1]
      if (g) g.tasks.push(t)
    })
    return groups
  }, [filteredTasks])

  return (
    <div className="flex flex-col lg:flex-row h-full min-h-0 bg-background relative">

      {/* Sidebar gauche type Google Agenda (Desktop Seulement) */}
      <aside
        className={cn(
          "hidden lg:flex flex-col border-r bg-card flex-shrink-0 transition-[width] overflow-hidden",
          sidebarCollapsed ? "w-12" : "w-72"
        )}
      >
        {!sidebarCollapsed && (
          <>
            <div className="p-3">
              <Button asChild className="w-full rounded-full gap-2 h-12 shadow-sm border bg-background hover:bg-muted text-foreground font-medium justify-start px-4">
                <Link href="/dashboard/agences">
                  <Plus className="h-6 w-6 text-blue-600 mr-2" />
                  Créer
                </Link>
              </Button>
            </div>
            <div className="px-3 pb-3">
              <div className="rounded-lg border bg-muted/30 p-2">
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-1 text-sm font-medium">
                    <span>{MONTHS_SHORT[miniCalendarMonth.getMonth()]}</span>
                    <Select
                      value={miniCalendarMonth.getFullYear().toString()}
                      onValueChange={(y) => setMiniCalendarMonth(new Date(parseInt(y), miniCalendarMonth.getMonth(), 1))}
                    >
                      <SelectTrigger className="h-6 px-1.5 border-0 bg-transparent hover:bg-muted text-sm font-medium shadow-none focus:ring-0 gap-1 rounded [&>svg]:opacity-50 [&>svg]:w-3 [&>svg]:h-3">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        {Array.from({ length: 20 }, (_, i) => new Date().getFullYear() - 5 + i).map((year) => (
                          <SelectItem key={year} value={year.toString()}>
                            {year}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="flex gap-0.5">
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-6 w-6"
                      onClick={() => setMiniCalendarMonth((d) => new Date(d.getFullYear(), d.getMonth() - 1))}
                    >
                      <ChevronLeft className="h-3 w-3" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-6 w-6"
                      onClick={() => setMiniCalendarMonth((d) => new Date(d.getFullYear(), d.getMonth() + 1))}
                    >
                      <ChevronRight className="h-3 w-3" />
                    </Button>
                  </div>
                </div>
                <div className="grid grid-cols-7 gap-0.5 text-center text-[10px] text-muted-foreground mb-1">
                  {["L", "M", "M", "J", "V", "S", "D"].map((c, i) => (
                    <span key={i}>{c}</span>
                  ))}
                </div>
                <div className="grid grid-cols-7 gap-0.5">
                  {miniCalendarDays.map((cell, idx) => (
                    <button
                      key={idx}
                      type="button"
                      onClick={() => setFocusDate(cell.date)}
                      className={cn(
                        "h-7 w-7 rounded-full text-xs flex items-center justify-center",
                        !cell.isCurrentMonth && "text-muted-foreground/60",
                        sameDay(cell.date, today) && "bg-blue-600 text-white font-medium",
                        sameDay(cell.date, focusDate) && !sameDay(cell.date, today) && "bg-muted font-medium"
                      )}
                    >
                      {cell.date.getDate()}
                    </button>
                  ))}
                </div>
              </div>
            </div>
            <div className="px-3 pb-3">
              <div className="relative">
                <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  type="search"
                  placeholder="Rechercher..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-8 h-9 text-sm"
                />
              </div>
            </div>
            <div className="px-3 flex-1 min-h-0 overflow-auto">
              <div className="space-y-1">
                <button
                  type="button"
                  className="w-full flex items-center justify-between py-1.5 px-2 rounded text-sm font-medium text-foreground hover:bg-muted/50"
                  onClick={() => setSidebarCollapsed(true)}
                >
                  Tâches
                  <ChevronDown className="h-4 w-4 text-muted-foreground" />
                </button>
                <label className="flex items-center gap-2 py-1.5 px-2 rounded hover:bg-muted/30 cursor-pointer text-sm">
                  <input
                    type="checkbox"
                    checked={showClosed}
                    onChange={(e) => setShowClosed(e.target.checked)}
                    className="rounded border-border"
                  />
                  <span className="text-muted-foreground">Afficher les clôturées</span>
                </label>
              </div>
            </div>
          </>
        )}
        {sidebarCollapsed && (
          <div className="p-2 flex flex-col items-center gap-2">
            <Button variant="ghost" size="icon" onClick={() => setSidebarCollapsed(false)} aria-label="Ouvrir le panneau">
              <ChevronRightIcon className="h-4 w-4" />
            </Button>
            <Button asChild size="icon" className="hidden lg:flex rounded-full h-10 w-10 shadow-sm border bg-background text-blue-600 hover:bg-muted">
              <Link href="/dashboard/agences"><Plus className="h-5 w-5" /></Link>
            </Button>
          </div>
        )}
      </aside>

      {/* Mobile Sidebar (Sheet) */}
      <Sheet open={isMobileSheetOpen} onOpenChange={setIsMobileSheetOpen}>
        <SheetContent side="left" className="w-[300px] p-0 flex flex-col pt-12">
          <SheetHeader className="sr-only">
            <SheetTitle>Menu du Calendrier</SheetTitle>
          </SheetHeader>
          <div className="px-3 pb-3">
            <div className="rounded-lg border bg-muted/30 p-2">
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-1 text-sm font-medium">
                  <span>{MONTHS_SHORT[miniCalendarMonth.getMonth()]}</span>
                  <Select
                    value={miniCalendarMonth.getFullYear().toString()}
                    onValueChange={(y) => setMiniCalendarMonth(new Date(parseInt(y), miniCalendarMonth.getMonth(), 1))}
                  >
                    <SelectTrigger className="h-6 px-1.5 border-0 bg-transparent hover:bg-muted text-sm font-medium shadow-none focus:ring-0 gap-1 rounded [&>svg]:opacity-50 [&>svg]:w-3 [&>svg]:h-3">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {Array.from({ length: 20 }, (_, i) => new Date().getFullYear() - 5 + i).map((year) => (
                        <SelectItem key={year} value={year.toString()}>
                          {year}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div className="flex gap-0.5">
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-6 w-6"
                    onClick={() => setMiniCalendarMonth((d) => new Date(d.getFullYear(), d.getMonth() - 1))}
                  >
                    <ChevronLeft className="h-3 w-3" />
                  </Button>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-6 w-6"
                    onClick={() => setMiniCalendarMonth((d) => new Date(d.getFullYear(), d.getMonth() + 1))}
                  >
                    <ChevronRight className="h-3 w-3" />
                  </Button>
                </div>
              </div>
              <div className="grid grid-cols-7 gap-0.5 text-center text-[10px] text-muted-foreground mb-1">
                {["L", "M", "M", "J", "V", "S", "D"].map((c) => (
                  <span key={c}>{c}</span>
                ))}
              </div>
              <div className="grid grid-cols-7 gap-0.5">
                {miniCalendarDays.map((cell, idx) => (
                  <button
                    key={idx}
                    type="button"
                    onClick={() => {
                      setFocusDate(cell.date);
                      setIsMobileSheetOpen(false);
                      if (window.innerWidth < 768) {
                        setViewMode("day");
                      }
                    }}
                    className={cn(
                      "h-8 w-8 rounded-full text-xs flex items-center justify-center mx-auto",
                      !cell.isCurrentMonth && "text-muted-foreground/60",
                      sameDay(cell.date, today) && "bg-blue-600 text-white font-medium",
                      sameDay(cell.date, focusDate) && !sameDay(cell.date, today) && "bg-muted font-medium"
                    )}
                  >
                    {cell.date.getDate()}
                  </button>
                ))}
              </div>
            </div>
          </div>
          <div className="px-3 pb-3">
            <div className="relative">
              <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                type="search"
                placeholder="Rechercher..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-8 h-10 text-base"
              />
            </div>
          </div>
          <div className="px-4 py-2 flex items-center gap-2 border-b">
            <span className="text-sm font-medium shrink-0">Vue :</span>
            <Select value={viewMode} onValueChange={(v) => {
              setViewMode(v as ViewMode);
              setIsMobileSheetOpen(false);
            }}>
              <SelectTrigger className="flex-1 h-9 bg-background font-medium text-sm">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="month">Mois</SelectItem>
                <SelectItem value="week">Semaine</SelectItem>
                <SelectItem value="day">Jour</SelectItem>
                <SelectItem value="agenda">Planning</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="px-3 py-4 flex-1 overflow-auto">
            <div className="space-y-1">
              <button
                type="button"
                className="w-full flex items-center justify-between py-2 px-3 rounded text-base font-medium text-foreground hover:bg-muted/50"
              >
                Tâches
                <ChevronDown className="h-5 w-5 text-muted-foreground" />
              </button>
              <label className="flex items-center gap-3 py-2 px-3 rounded hover:bg-muted/30 cursor-pointer text-base">
                <input
                  type="checkbox"
                  checked={showClosed}
                  onChange={(e) => setShowClosed(e.target.checked)}
                  className="rounded border-border h-4 w-4"
                />
                <span className="text-muted-foreground">Afficher les clôturées</span>
              </label>
            </div>
          </div>
        </SheetContent>
      </Sheet>

      {/* Floating Action Button (Mobile) */}
      {mounted && typeof document !== "undefined" && createPortal(
        <a
          href="/dashboard/agences"
          className="lg:hidden flex items-center justify-center h-14 w-14 rounded-full shadow-xl shadow-blue-900/20 bg-blue-600 text-white hover:bg-blue-700 transition-all z-[99999]"
          style={{ position: 'fixed', bottom: '24px', right: '24px', margin: 0 }}
        >
          <Plus className="h-6 w-6 text-white" />
        </a>,
        document.body
      )}

      {/* Zone principale */}
      <div className="flex flex-col flex-1 min-w-0 p-0 lg:p-4">
        {/* En-tête (Header) Mobile vs Desktop */}
        <header className="flex items-center justify-between lg:mb-8 flex-shrink-0 px-2 lg:px-4 py-2 lg:py-0 border-b lg:border-none bg-background sticky top-0 z-30 shadow-sm lg:shadow-none">

          <div className="flex items-center gap-2 lg:gap-8">
            <div className="flex items-center gap-1 lg:gap-4">
              {/* Menu Hamburger Only on Mobile */}
              <Button variant="ghost" size="icon" className="lg:hidden shrink-0 h-10 w-10 active:bg-muted rounded-full" onClick={() => setIsMobileSheetOpen(true)}>
                <Menu className="h-6 w-6" />
              </Button>

              {/* Desktop style Month/Date display */}
              <div className="hidden lg:flex flex-col items-center justify-center border rounded-lg bg-card shadow-sm w-12 h-14 overflow-hidden shrink-0">
                <div className="text-[10px] font-bold text-muted-foreground uppercase pt-1 px-1">
                  {MONTHS_SHORT[focusDate.getMonth()].toUpperCase().replace(".", "")}
                </div>
                <div className="text-xl font-bold text-foreground pb-1">
                  {focusDate.getDate()}
                </div>
              </div>

              {/* Mobile style Month/Year Title */}
              <div className="flex flex-col">
                <h1 className="text-xl lg:text-2xl font-normal lg:font-bold text-foreground leading-tight flex items-center gap-0.5">
                  <span className="lg:hidden">{MONTHS_SHORT[focusDate.getMonth()]}</span>
                  <span className="hidden lg:inline">{MONTHS[focusDate.getMonth()]}</span>
                  <Select
                    value={focusDate.getFullYear().toString()}
                    onValueChange={(y) => {
                      const newDate = new Date(focusDate)
                      newDate.setFullYear(parseInt(y))
                      setFocusDate(newDate)
                    }}
                  >
                    <SelectTrigger className="h-auto py-0 px-1 border-0 bg-transparent hover:bg-muted text-xl lg:text-2xl font-normal lg:font-bold shadow-none focus:ring-0 gap-1 rounded [&>svg]:opacity-50 [&>svg]:w-4 [&>svg]:h-4 w-auto">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {Array.from({ length: 20 }, (_, i) => new Date().getFullYear() - 5 + i).map((year) => (
                        <SelectItem key={year} value={year.toString()}>
                          {year}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </h1>
                <p className="hidden lg:block text-sm font-medium text-muted-foreground capitalize">
                  {new Date(range.from).toLocaleDateString("fr-FR", { month: "short", day: "numeric", year: "numeric" })} – {new Date(range.to).toLocaleDateString("fr-FR", { month: "short", day: "numeric", year: "numeric" })}
                </p>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-2 lg:gap-4">
            {/* Desktop Navigation Group */}
            <div className="hidden lg:flex items-center gap-2">
              <div className="flex items-center border rounded-lg overflow-hidden bg-background">
                <Button variant="ghost" size="icon" className="h-10 w-10 border-r rounded-none hover:bg-muted" onClick={goPrev} aria-label="Précédent">
                  <ChevronLeft className="h-4 w-4" />
                </Button>
                <Button variant="ghost" onClick={goToday} className="h-10 px-6 rounded-none border-r font-bold text-sm hover:bg-muted">
                  Aujourd&apos;hui
                </Button>
                <Button variant="ghost" size="icon" className="h-10 w-10 rounded-none hover:bg-muted" onClick={goNext} aria-label="Suivant">
                  <ChevronRight className="h-4 w-4" />
                </Button>
              </div>
              <Select value={viewMode} onValueChange={(v) => setViewMode(v as ViewMode)}>
                <SelectTrigger className="w-[140px] h-10 bg-background font-bold border rounded-lg hover:bg-muted">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="month">Mois</SelectItem>
                  <SelectItem value="week">Semaine</SelectItem>
                  <SelectItem value="day">Jour</SelectItem>
                  <SelectItem value="agenda">Planning</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Mobile Navigation Icons */}
            <div className="flex lg:hidden items-center gap-1">
              <Button variant="ghost" size="icon" className="h-10 w-10 rounded-full" onClick={goToday}>
                <CalendarIcon className="h-5 w-5" />
                <span className="sr-only">Aujourd&apos;hui</span>
              </Button>
              <Button variant="ghost" size="icon" className="h-10 w-10 rounded-full" onClick={goPrev}>
                <ChevronLeft className="h-6 w-6" />
              </Button>
              <Button variant="ghost" size="icon" className="h-10 w-10 rounded-full" onClick={goNext}>
                <ChevronRight className="h-6 w-6" />
              </Button>
            </div>
          </div>
        </header>

        {error && (
          <div className="rounded-lg bg-destructive/10 text-destructive px-4 py-2 text-sm mb-4">{error}</div>
        )}

        {loading ? (
          <div className="flex items-center justify-center py-20 text-muted-foreground text-sm">Chargement…</div>
        ) : (
          <div className="flex-1 min-h-0 overflow-auto">
            {/* Vue Mois */}
            {viewMode === "month" && (
              <div className="h-full border-t border-l flex flex-col bg-background">
                <div className="grid grid-cols-7 border-b bg-background sticky top-0 z-10">
                  {["Lun", "Mar", "Mer", "Jeu", "Ven", "Sam", "Dim"].map((day) => (
                    <div key={day} className="py-4 text-center text-xs font-bold text-muted-foreground border-r tracking-wide uppercase">
                      {day}
                    </div>
                  ))}
                </div>
                <div className="grid grid-cols-7 flex-1">
                  {monthGrid.map((cell, idx) => {
                    const key = toYMD(cell.date)
                    const dayTasks = tasksByDay[key] ?? []
                    const isToday = sameDay(cell.date, today)
                    return (
                      <div
                        key={idx}
                        className={cn(
                          "min-h-[160px] border-b border-r p-2 flex flex-col group transition-colors hover:bg-muted/5",
                          !cell.isCurrentMonth && "bg-muted/5 opacity-50",
                        )}
                      >
                        <div className="flex justify-start mb-1">
                          <span
                            className={cn(
                              "inline-flex h-7 w-7 items-center justify-center rounded-full text-xs font-bold transition-colors",
                              isToday ? "bg-blue-600 text-white shadow-sm" : "text-muted-foreground group-hover:text-foreground"
                            )}
                          >
                            {cell.date.getDate()}
                          </span>
                        </div>
                        <div className="flex flex-col gap-1 overflow-hidden flex-1 px-1">
                          {dayTasks.slice(0, 3).map((t) => (
                            <div
                              key={t.id}
                              onClick={() => openTaskDetails(t)}
                              className={cn(
                                "cursor-pointer text-[10px] lg:text-[11px] px-2 py-2 rounded-md border-y border-r border-l-4 flex items-center justify-between gap-1.5 transition-all hover:brightness-95 shadow-sm",
                                eventStyle(t.id, t.importance, !!t.closedAt)
                              )}
                              title={`${t.title} — ${t.agency.name}`}
                            >
                              <div className="flex items-center gap-1.5 overflow-hidden">
                                {t.closedAt && <span className="h-1.5 w-1.5 rounded-full flex-shrink-0 bg-gray-400" />}
                                <span className="font-bold truncate leading-tight">{t.title}</span>
                              </div>
                              <span className="flex-shrink-0 font-bold opacity-60 tabular-nums whitespace-nowrap text-[9px] lg:text-[10px]">
                                {formatTime(t.createdAt)}
                              </span>
                            </div>
                          ))}
                          {dayTasks.length > 3 && (
                            <button className="text-[10px] font-bold text-muted-foreground hover:text-foreground pl-1 text-left mt-1 underline-offset-2 hover:underline">
                              {dayTasks.length - 3} de plus...
                            </button>
                          )}
                        </div>
                      </div>
                    )
                  })}
                </div>
              </div>
            )}

            {/* Vue Semaine avec créneaux horaires */}
            {viewMode === "week" && (
              <div className="rounded-xl border bg-card overflow-visible">
                <div className="grid grid-cols-8 border-b">
                  <div className="w-14 flex-shrink-0 border-r" />
                  {weekDays.map((d) => (
                    <div
                      key={d.getTime()}
                      className={cn(
                        "py-2 text-center text-xs font-medium border-r last:border-r-0",
                        sameDay(d, today) ? "text-blue-600 dark:text-blue-400 bg-blue-50/30 dark:bg-blue-950/20" : "text-muted-foreground"
                      )}
                    >
                      <div>{DAYS_HEADER[d.getDay() === 0 ? 6 : d.getDay() - 1]}</div>
                      <div className="text-lg font-normal text-foreground">{d.getDate()}</div>
                    </div>
                  ))}
                </div>
                <div className="grid grid-cols-8">
                  <div className="w-14 flex-shrink-0 border-r py-1 text-[10px] text-muted-foreground space-y-0">
                    {HOURS.map((h) => (
                      <div key={h} className="h-12 flex items-start justify-end pr-1">
                        {h}:00
                      </div>
                    ))}
                  </div>
                  {weekDays.map((d) => {
                    const key = toYMD(d)
                    const dayTasks = tasksByDay[key] ?? []
                    const isToday = sameDay(d, today)
                    return (
                      <div
                        key={d.getTime()}
                        className={cn(
                          "border-r last:border-r-0 flex flex-col min-h-0",
                          isToday && "bg-blue-50/20 dark:bg-blue-950/10"
                        )}
                      >
                        <div className="relative flex-1 group">
                          {HOURS.map((h) => (
                            <div key={h} className="h-12 border-b border-dashed border-border/50" />
                          ))}
                          {dayTasks.map((t) => {
                            const d = new Date(t.createdAt)
                            const h = d.getHours()
                            const m = d.getMinutes()
                            // Calendar grid starts at 0:00, not 8:00
                            const top = (h * 48) + ((m / 60) * 48)

                            return (
                              <div
                                key={t.id}
                                onClick={() => openTaskDetails(t)}
                                className={cn("absolute left-1 right-1 cursor-pointer text-[10px] px-1.5 py-1 border-y border-r border-l-4 rounded-md overflow-hidden shadow-sm transition-all hover:z-20 hover:ring-2 ring-primary/20", eventStyle(t.id, t.importance, !!t.closedAt))}
                                style={{ top: `${top}px`, height: '44px', zIndex: 10 }}
                                title={`${t.title} — ${t.agency.name} (${formatTime(t.createdAt)})`}
                              >
                                <div className="font-semibold truncate">{t.title}</div>
                                <div className="truncate opacity-80 mt-0.5">{formatTime(t.createdAt)}</div>
                              </div>
                            )
                          })}
                        </div>
                      </div>
                    )
                  })}
                </div>
              </div>
            )}

            {/* Vue Jour */}
            {viewMode === "day" && (
              <div className="rounded-xl border bg-card overflow-hidden">
                <div className="border-b px-4 py-3 text-lg font-normal">
                  {DAYS_HEADER_LONG[focusDate.getDay()].toUpperCase()}. {focusDate.getDate()}
                </div>
                <div className="flex relative">
                  <div className="w-16 flex-shrink-0 border-r py-2 text-xs text-muted-foreground space-y-0">
                    {HOURS.map((h) => (
                      <div key={h} className="h-12 flex items-start justify-end pr-2">
                        {h}:00
                      </div>
                    ))}
                  </div>
                  <div className="flex-1 relative pt-2">
                    {HOURS.map((h) => (
                      <div key={h} className="h-12 border-b border-dashed border-border/50" />
                    ))}
                    {(tasksByDay[toYMD(focusDate)] ?? []).map((t) => {
                      const d = new Date(t.createdAt)
                      const h = d.getHours()
                      const m = d.getMinutes()
                      const top = (h * 48) + ((m / 60) * 48) + 8 // +8 for pt-2

                      return (
                        <div
                          key={t.id}
                          onClick={() => openTaskDetails(t)}
                          className={cn(
                            "absolute left-2 lg:left-4 right-2 lg:right-4 cursor-pointer text-sm px-3 py-1.5 border-y border-r border-l-4 rounded-md shadow-sm flex flex-col items-start gap-0.5 overflow-hidden hover:z-20 transition-all",
                            eventStyle(t.id, t.importance, !!t.closedAt)
                          )}
                          style={{ top: `${top}px`, height: '46px', zIndex: 10 }}
                          title={`${t.title} — ${t.agency.name} (${formatTime(t.createdAt)})`}
                        >
                          <div className="flex items-center gap-2 w-full">
                            <span className={cn("h-2 w-2 rounded-full flex-shrink-0", eventDotColor(t.id, t.importance, !!t.closedAt))} />
                            <span className="font-medium truncate">{t.title}</span>
                          </div>
                          <span className="text-muted-foreground text-xs truncate ml-4 font-medium opacity-80">{formatTime(t.createdAt)} — {t.agency.name}</span>
                        </div>
                      )
                    })}
                  </div>
                </div>
              </div>
            )}

            {/* Vue Planning (agenda / liste chronologique) */}
            {viewMode === "agenda" && (
              <div className="bg-background">
                <div className="divide-y divide-border/50">
                  {agendaGroups.length === 0 && (
                    <div className="px-4 py-12 flex flex-col items-center justify-center text-center">
                      <div className="h-32 w-32 mb-4 text-muted/30">
                        <CalendarIcon className="w-full h-full" />
                      </div>
                      <p className="text-lg font-medium text-foreground">Rien de prévu sur cette période</p>
                      <p className="text-sm text-muted-foreground mt-1">Génial, profitez de votre temps libre !</p>
                    </div>
                  )}
                  {agendaGroups.map((group) => {
                    const match = group.date.match(/(\d{4})-(\d{2})-(\d{2})/)
                    const d = match ? new Date(parseInt(match[1]), parseInt(match[2]) - 1, parseInt(match[3])) : new Date()
                    const dayNum = d.getDate()
                    const dayShortStr = DAYS_HEADER[d.getDay() === 0 ? 6 : d.getDay() - 1].toLowerCase()
                    const isToday = sameDay(d, today)

                    return (
                      <div key={group.date} className="flex flex-row p-4 min-w-0">
                        {/* Day indicator column */}
                        <div className="flex flex-col items-center flex-shrink-0 w-[50px] mr-3 pt-1">
                          <span className={cn(
                            "text-xs font-semibold uppercase tracking-wider",
                            isToday ? "text-blue-600 dark:text-blue-400" : "text-muted-foreground"
                          )}>
                            {dayShortStr}
                          </span>
                          <span className={cn(
                            "text-2xl font-normal leading-none mt-0.5",
                            isToday ? "flex items-center justify-center w-8 h-8 rounded-full bg-blue-600 text-white" : "text-foreground"
                          )}>
                            {dayNum}
                          </span>
                        </div>

                        {/* Tasks column */}
                        <div className="flex-1 min-w-0 flex flex-col gap-1">
                          {group.tasks.map((t) => (
                            <div
                              key={t.id}
                              onClick={() => openTaskDetails(t)}
                              className="w-full cursor-pointer hover:bg-muted/30 rounded-lg p-3 border shadow-sm transition-colors flex items-center gap-3"
                            >
                              <span className={cn("h-3 w-3 rounded-full flex-shrink-0 shadow-sm", eventDotColor(t.id, t.importance, !!t.closedAt))} />
                              <div className="flex-1 min-w-0">
                                <p className="font-semibold text-foreground text-sm truncate">{t.title}</p>
                                <div className="flex items-center gap-2 mt-0.5 max-w-full">
                                  <span className="text-xs font-medium text-muted-foreground shrink-0 border rounded px-1.5 py-0.5 bg-background shadow-sm tabular-nums">{formatTime(t.createdAt)}</span>
                                  {t.agency.name && <span className="text-xs text-muted-foreground truncate opacity-80">{t.agency.name}</span>}
                                </div>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    )
                  })}
                </div>
              </div>
            )}
          </div>
        )}
      </div>

      <Dialog open={!!viewingImage} onOpenChange={(open) => {
        if (!open) {
          setViewingImage(null)
          setImageZoom(1)
          setImagePosition({ x: 0, y: 0 })
          setImageHasDragged(false)
        }
      }}>
        <DialogContent className="max-w-[95vw] sm:max-w-6xl max-h-[90vh] overflow-hidden p-0 !z-[100]">
          <DialogTitle className="sr-only">Dialogue</DialogTitle>
          {viewingImage && (
            <div className="relative w-full h-[85vh] flex items-center justify-center bg-black/90 overflow-hidden">
              {/* Image avec zoom et drag */}
              <div
                className={`relative w-full h-full flex items-center justify-center ${imageZoom > 1
                  ? "cursor-grab active:cursor-grabbing"
                  : viewingImageList.length > 1
                    ? "cursor-pointer"
                    : ""
                  }`}
                onWheel={handleImageZoom}
                onMouseDown={handleImageMouseDown}
                onMouseMove={handleImageMouseMove}
                onMouseUp={handleImageMouseUp}
                onMouseLeave={handleImageMouseUp}
                onClick={handleTaskImageClick}
                style={{ touchAction: 'none' }}
              >
                <img
                  src={viewingImage}
                  alt={`Photo ${viewingImageIndex + 1}`}
                  className="max-w-full max-h-full object-contain select-none"
                  style={{
                    transform: `scale(${imageZoom}) translate(${imagePosition.x}px, ${imagePosition.y}px)`,
                    transformOrigin: 'center center',
                    transition: imageZoom === 1 ? 'transform 0.2s ease-out' : 'none',
                  }}
                  draggable={false}
                />
              </div>

              {/* Bouton précédent */}
              {viewingImageList.length > 1 && (
                <Button
                  variant="ghost"
                  size="icon"
                  className="absolute left-4 top-1/2 -translate-y-1/2 text-white hover:text-gray-200 bg-black/50 hover:bg-black/70 rounded-full h-12 w-12"
                  onClick={handlePrevImage}
                >
                  <ChevronLeft className="h-6 w-6" />
                </Button>
              )}

              {/* Bouton suivant */}
              {viewingImageList.length > 1 && (
                <Button
                  variant="ghost"
                  size="icon"
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-white hover:text-gray-200 bg-black/50 hover:bg-black/70 rounded-full h-12 w-12"
                  onClick={handleNextImage}
                >
                  <ChevronRight className="h-6 w-6" />
                </Button>
              )}

              {/* Bouton fermer */}
              <Button
                variant="ghost"
                size="icon"
                className="absolute top-4 right-4 text-white hover:text-gray-200 bg-black/50 hover:bg-black/70 rounded-full h-10 w-10"
                onClick={() => {
                  setViewingImage(null)
                  setImageZoom(1)
                  setImagePosition({ x: 0, y: 0 })
                }}
              >
                <X className="h-5 w-5" />
              </Button>

              {/* Bouton supprimer (seulement si en mode édition) */}
              {selectedTask && viewingImageTaskId === selectedTask.id && (
                <Button
                  variant="ghost"
                  size="icon"
                  className="absolute top-4 right-16 text-white hover:text-red-400 bg-black/50 hover:bg-red-500/70 rounded-full h-10 w-10"
                  onClick={handleDeleteImage}
                >
                  <Trash2 className="h-5 w-5" />
                </Button>
              )}

              {/* Indicateur de position (ex: 1/5) */}
              {viewingImageList.length > 1 && (
                <div className="absolute bottom-4 left-1/2 -translate-x-1/2 bg-black/70 text-white px-4 py-2 rounded-lg text-sm font-medium">
                  {viewingImageIndex + 1} / {viewingImageList.length}
                </div>
              )}

              {/* Indicateur de zoom */}
              {imageZoom > 1 && (
                <div className="absolute top-4 left-4 bg-black/70 text-white px-3 py-1 rounded text-sm">
                  {Math.round(imageZoom * 100)}%
                </div>
              )}
            </div>
          )}
        </DialogContent>
      </Dialog>

      <Dialog open={!!selectedTask} onOpenChange={(open) => {
        if (!open) {
          setSelectedTask(null)
          setIsEditingTask(false)
        }
      }}>
        <DialogContent>
          <DialogTitle className="sr-only">Dialogue</DialogTitle>
          <DialogHeader>
            <DialogTitle>Modifier la tâche</DialogTitle>
            <DialogDescription>
              Modifiez les informations de la tâche
            </DialogDescription>
          </DialogHeader>

          {selectedTask && (
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="task-edit-title">Titre *</Label>
                <Input
                  id="task-edit-title"
                  value={taskFormData.title}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) => setTaskFormData((prev) => ({ ...prev, title: e.target.value }))}
                  placeholder="Titre de la tâche..."
                  className="border-orange-500 ring-orange-500 focus-visible:ring-orange-500"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="task-edit-createdAt">Créée le</Label>
                <Input
                  id="task-edit-createdAt"
                  type="datetime-local"
                  value={taskFormData.createdAt}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) => setTaskFormData((prev) => ({ ...prev, createdAt: e.target.value }))}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="task-edit-notes">Notes *</Label>
                <Textarea
                  id="task-edit-notes"
                  value={taskFormData.notes}
                  onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => setTaskFormData((prev) => ({ ...prev, notes: e.target.value }))}
                  placeholder="Notes de la tâche..."
                  rows={4}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="task-edit-importance">Importance</Label>
                <Select
                  value={taskFormData.importance}
                  onValueChange={(value: "URGENT" | "CRITIQUE" | "INFO" | "A FAIRE") =>
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
                    <SelectItem value="A FAIRE">À faire</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="task-edit-photos">Photos (max 5)</Label>
                <Input
                  id="task-edit-photos"
                  type="file"
                  accept="image/jpeg,image/png"
                  multiple
                  onChange={async (e: React.ChangeEvent<HTMLInputElement>) => {
                    const files = Array.from(e.target.files || [])
                    if ((taskFormData.photos?.length || 0) + files.length > maxPhotosPerTask) {
                      alert(`Maximum ${maxPhotosPerTask} photo(s) autorisée(s)`)
                      return
                    }
                    for (const file of files) {
                      const formData = new FormData()
                      formData.append("file", file)
                      const csrfToken = await fetchCSRFToken()
                      if (csrfToken) {
                        formData.append("_csrf", csrfToken)
                      }
                      try {
                        const response = await apiFetch("/api/upload", {
                          method: "POST",
                          body: formData,
                          skipCSRF: true,
                        })
                        if (response.ok) {
                          const data = await response.json()
                          setTaskFormData((prev) => ({
                            ...prev,
                            photos: [...(prev.photos || []), data.path],
                          }))
                          setTaskPhotos((prev) => [...prev, { path: data.path, preview: URL.createObjectURL(file) }])
                        } else {
                          const error = await response.json()
                          alert(error.error || "Erreur lors de l'upload")
                        }
                      } catch (error) {
                        console.error("Error uploading photo:", error)
                        alert("Erreur lors de l'upload")
                      }
                    }
                    e.target.value = ""
                  }}
                  disabled={(taskFormData.photos?.length || 0) >= maxPhotosPerTask}
                />
                {(taskFormData.photos?.length || 0) > 0 && (
                  <div className="flex flex-wrap gap-2 mt-2">
                    {taskPhotos.map((photo, index) => (
                      <div key={index} className="relative group">
                        <button
                          type="button"
                          className="w-20 h-20 rounded border overflow-hidden cursor-pointer hover:opacity-80 relative z-50 p-0"
                          onClick={(e) => {
                            e.preventDefault()
                            e.stopPropagation()
                            openImageViewer(photo.path, taskFormData.photos || [], index, selectedTask?.id)
                          }}
                        >
                          <img
                            src={photo.preview || photo.path}
                            alt={`Photo ${index + 1}`}
                            className="w-full h-full object-cover"
                          />
                        </button>
                        <Button
                          type="button"
                          variant="destructive"
                          size="sm"
                          className="absolute -top-2 -right-2 h-6 w-6 rounded-full p-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
                          onClick={() => {
                            setTaskFormData((prev) => ({
                              ...prev,
                              photos: (prev.photos || []).filter((_, i) => i !== index),
                            }))
                            setTaskPhotos((prev) => prev.filter((_, i) => i !== index))
                          }}
                        >
                          <X className="h-3 w-3" />
                        </Button>
                      </div>
                    ))}
                  </div>
                )}
                {(taskFormData.photos?.length || 0) >= maxPhotosPerTask && (
                  <p className="text-sm text-muted-foreground">Maximum {maxPhotosPerTask} photo(s) atteint</p>
                )}
              </div>
            </div>
          )}

          <DialogFooter>
            <Button variant="outline" onClick={() => {
              setSelectedTask(null)
              setIsEditingTask(false)
            }} disabled={isSaving}>
              Annuler
            </Button>
            <Button onClick={handleSaveTask} disabled={isSaving}>
              {isSaving ? "Enregistrement..." : "Enregistrer"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}
