import React, { useState, useEffect } from "react"
import { Plus, Edit, Trash2, CheckCircle, ChevronLeft, ChevronRight, X, CheckSquare, Maximize2 } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { EmptyState } from "@/components/ui/empty-state"
import { useToast } from "@/lib/toast-context"
import { ConfirmDialog } from "@/components/ui/confirm-dialog"
import { apiFetch } from "@/lib/api-client"
import { fetchCSRFToken } from "@/lib/csrf-client"

export interface Task {
    id: string
    agencyId: string
    title: string
    createdAt: string
    createdBy: string
    closedAt: string | null
    closedBy: string | null
    notes: string
    importance: "URGENT" | "CRITIQUE" | "INFO"
    photos: string | null
    creator: {
        id: string
        login: string
    }
    closer: {
        id: string
        login: string
    } | null
}

interface TaskSectionProps {
    agencyId: string
    editing: boolean
}

export function TaskSection({
    agencyId,
    editing,
}: TaskSectionProps) {
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

    const openConfirm = (opts: { title: string; description: string; confirmLabel?: string; variant?: "danger" | "default"; onConfirm: () => void | Promise<void> }) => {
        setConfirmState({ open: true, confirmLabel: "Confirmer", variant: "default", ...opts })
    }

    const [maxPhotosPerTask] = useState(5)

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
        photos: [] as string[],
    })
    const [taskPhotos, setTaskPhotos] = useState<Array<{ path: string; preview?: string }>>([])

    // Viewer d'image
    const [viewingImage, setViewingImage] = useState<string | null>(null)
    const [viewingImageIndex, setViewingImageIndex] = useState<number>(0)
    const [viewingImageList, setViewingImageList] = useState<string[]>([])
    const [viewingImageTaskId, setViewingImageTaskId] = useState<string | null>(null)
    const [imageZoom, setImageZoom] = useState(1)
    const [imagePosition, setImagePosition] = useState({ x: 0, y: 0 })
    const [isImageDragging, setIsImageDragging] = useState(false)
    const [imageDragStart, setImageDragStart] = useState({ x: 0, y: 0 })
    const [imageHasDragged, setImageHasDragged] = useState(false)

    // Filtres
    const [taskFilter, setTaskFilter] = useState<"ALL" | "URGENT" | "CRITIQUE" | "INFO">("ALL")
    const [showClosedTasks, setShowClosedTasks] = useState(true)
    const [expandedTaskNotes, setExpandedTaskNotes] = useState<Record<string, boolean>>({})

    useEffect(() => {
        if (agencyId) {
            loadTasks(agencyId)
        }
    }, [agencyId])

    const loadTasks = async (id: string) => {
        setLoadingTasks(true)
        try {
            const response = await apiFetch(`/api/agencies/${id}/tasks`)
            if (response.ok) {
                const data = await response.json()
                setTasks(data)
            } else {
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
            photos: [],
        })
        setTaskPhotos([])
        setIsTaskDialogOpen(true)
    }

    const handleEditTask = (task: Task) => {
        setEditingTask(task)
        let photos: string[] = []
        if (task.photos) {
            try {
                const parsed = JSON.parse(task.photos)
                if (Array.isArray(parsed)) {
                    photos = parsed
                }
            } catch {
                photos = []
            }
        }
        setTaskFormData({
            title: task.title,
            createdAt: new Date(task.createdAt).toISOString().slice(0, 16),
            notes: task.notes,
            importance: task.importance,
            photos,
        })
        setTaskPhotos(photos.map(path => ({ path })))
        setIsTaskEditDialogOpen(true)
    }

    const handleSaveTask = async () => {
        if (!taskFormData.title.trim() || !taskFormData.notes.trim()) {
            toast({ title: "Veuillez remplir le titre et les notes", variant: "destructive" })
            return
        }

        try {
            const response = await apiFetch(`/api/agencies/${agencyId}/tasks`, {
                method: "POST",
                body: JSON.stringify(taskFormData),
            })

            if (response.ok) {
                await loadTasks(agencyId)
                setIsTaskDialogOpen(false)
                toast({ title: "Tâche créée", variant: "success" })
            } else {
                const error = await response.json()
                toast({ title: error.error || "Erreur de création", variant: "destructive" })
            }
        } catch (error) {
            console.error("Error saving task:", error)
            toast({ title: "Erreur serveur", variant: "destructive" })
        }
    }

    const handleUpdateTask = async () => {
        if (!editingTask || !taskFormData.title.trim() || !taskFormData.notes.trim()) {
            toast({ title: "Veuillez remplir le titre et les notes", variant: "destructive" })
            return
        }

        try {
            const response = await apiFetch(`/api/agencies/${agencyId}/tasks/${editingTask.id}`, {
                method: "PUT",
                body: JSON.stringify(taskFormData),
            })

            if (response.ok) {
                await loadTasks(agencyId)
                setIsTaskEditDialogOpen(false)
                setEditingTask(null)
                toast({ title: "Tâche mise à jour", variant: "success" })
            } else {
                const error = await response.json()
                toast({ title: error.error || "Erreur de mise à jour", variant: "destructive" })
            }
        } catch (error) {
            console.error("Error updating task:", error)
            toast({ title: "Erreur serveur", variant: "destructive" })
        }
    }

    const handleCloseTask = async (task: Task) => {
        try {
            const response = await apiFetch(`/api/agencies/${agencyId}/tasks/${task.id}/close`, {
                method: "POST",
                body: JSON.stringify({ closedAt: new Date().toISOString() }),
            })

            if (response.ok) {
                await loadTasks(agencyId)
                toast({ title: "Tâche clôturée", variant: "success" })
            } else {
                toast({ title: "Erreur de clôture", variant: "destructive" })
            }
        } catch (error) {
            console.error("Error closing task:", error)
            toast({ title: "Erreur serveur", variant: "destructive" })
        }
    }

    const handleDeleteTask = (task: Task) => {
        openConfirm({
            title: "Supprimer la tâche",
            description: "Êtes-vous sûr de vouloir supprimer cette tâche ?",
            variant: "danger",
            onConfirm: async () => {
                setConfirmLoading(true)
                try {
                    const response = await apiFetch(`/api/agencies/${agencyId}/tasks/${task.id}`, { method: "DELETE" })
                    if (response.ok) {
                        await loadTasks(agencyId)
                        toast({ title: "Tâche supprimée", variant: "success" })
                    } else {
                        toast({ title: "Erreur lors de la suppression", variant: "destructive" })
                    }
                } catch (error) {
                    console.error("Error deleting task:", error)
                    toast({ title: "Erreur", variant: "destructive" })
                } finally {
                    setConfirmLoading(false)
                }
            },
        })
    }

    // Fonctions pour la visualisation des photos de tâches
    const openImageViewer = (photoPath: string, photoList: string[], index: number, taskId?: string) => {
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
            setImageDragStart({ x: e.clientX - imagePosition.x, y: e.clientY - imagePosition.y })
        }
    }

    const handleImageMouseMove = (e: React.MouseEvent) => {
        if (isImageDragging && imageZoom > 1) {
            setImagePosition({
                x: e.clientX - imageDragStart.x,
                y: e.clientY - imageDragStart.y
            })
            setImageHasDragged(true)
        }
    }

    const handleImageMouseUp = () => {
        setIsImageDragging(false)
        setTimeout(() => setImageHasDragged(false), 50)
    }

    const handleTaskImageClick = (e: React.MouseEvent) => {
        if (!imageHasDragged && viewingImageList.length > 1 && imageZoom === 1) {
            const rect = e.currentTarget.getBoundingClientRect()
            const x = e.clientX - rect.left
            if (x > rect.width / 2) {
                handleNextImage()
            } else {
                handlePrevImage()
            }
        }
    }

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

    const handleDeleteImage = () => {
        if (!viewingImage || !viewingImageTaskId || !editingTask) {
            toast({ title: "Impossible de supprimer la photo", variant: "destructive" })
            return
        }
        openConfirm({
            title: "Supprimer la photo",
            description: "Êtes-vous sûr de vouloir supprimer cette photo ?",
            variant: "danger",
            onConfirm: async () => {
                try {
                    const currentPhotos = taskFormData.photos || []
                    const updatedPhotos = currentPhotos.filter((_, i) => i !== viewingImageIndex)
                    setTaskFormData((prev) => ({ ...prev, photos: updatedPhotos }))
                    setTaskPhotos((prev) => prev.filter((_, i) => i !== viewingImageIndex))
                    const newList = viewingImageList.filter((_, i) => i !== viewingImageIndex)
                    setViewingImageList(newList)
                    if (newList.length === 0) setViewingImage(null)
                    else {
                        const newIndex = Math.min(viewingImageIndex, newList.length - 1)
                        setViewingImageIndex(newIndex)
                        setViewingImage(newList[newIndex])
                    }
                    toast({ title: "Photo supprimée", variant: "success" })
                } catch (error) {
                    console.error("Error deleting image:", error)
                    toast({ title: "Erreur de suppression", variant: "destructive" })
                }
            },
        })
    }

    const getAvatarColor = (name: string) => {
        const colors = [
            "bg-blue-500", "bg-green-500", "bg-yellow-500", "bg-purple-500",
            "bg-pink-500", "bg-indigo-500", "bg-red-500", "bg-orange-500",
        ]
        const index = name.charCodeAt(0) % colors.length
        return colors[index]
    }

    const getInitials = (name: string) => {
        return name.split(" ").map((n) => n[0]).join("").toUpperCase().slice(0, 2)
    }

    return (
        <div className="space-y-4 pt-2 sm:pt-4">
            {/* En-tête / Filtres */}
            {editing && (
                <Button
                    onClick={handleAddTask}
                    className="w-full sm:w-auto gap-2 mb-4 bg-green-600 hover:bg-green-700 text-white"
                >
                    <Plus className="h-4 w-4" />
                    Ajouter une tâche
                </Button>
            )}

            {/* Filtres Desktop / Mobile (même design pour simplifier) */}
            <div className="mb-4">
                <div className="flex items-center gap-2 mb-2">
                    <span className="text-sm font-medium">Filtres :</span>
                </div>
                <div className="flex gap-2 flex-wrap">
                    <button
                        onClick={() => setTaskFilter("URGENT")}
                        className={`px-3 py-1 rounded-full text-xs font-semibold border ${taskFilter === "URGENT"
                            ? "bg-red-100 text-red-800 border-red-500 dark:bg-red-900/30 dark:text-red-400"
                            : "bg-white text-red-600 border-red-300 dark:bg-gray-800 dark:text-red-400"
                            }`}
                    >
                        URGENT
                    </button>
                    <button
                        onClick={() => setTaskFilter("CRITIQUE")}
                        className={`px-3 py-1 rounded-full text-xs font-semibold border ${taskFilter === "CRITIQUE"
                            ? "bg-orange-100 text-orange-800 border-orange-500 dark:bg-orange-900/30 dark:text-orange-400"
                            : "bg-white text-orange-600 border-orange-300 dark:bg-gray-800 dark:text-orange-400"
                            }`}
                    >
                        CRITIQUE
                    </button>
                    <button
                        onClick={() => setTaskFilter("INFO")}
                        className={`px-3 py-1 rounded-full text-xs font-semibold border ${taskFilter === "INFO"
                            ? "bg-gray-100 text-gray-800 border-gray-500 dark:bg-gray-700 dark:text-gray-300"
                            : "bg-white text-gray-600 border-gray-300 dark:bg-gray-800 dark:text-gray-400"
                            }`}
                    >
                        INFO
                    </button>
                    <button
                        onClick={() => setTaskFilter("ALL")}
                        className={`px-3 py-1 rounded-full text-xs font-semibold border ${taskFilter === "ALL"
                            ? "bg-blue-100 text-blue-800 border-blue-500 dark:bg-blue-900/30 dark:text-blue-400"
                            : "bg-white text-blue-600 border-blue-300 dark:bg-gray-800 dark:text-blue-400"
                            }`}
                    >
                        TOUS
                    </button>
                    <button
                        onClick={() => setShowClosedTasks(!showClosedTasks)}
                        className={`px-3 py-1 rounded-full text-xs font-semibold border ${showClosedTasks
                            ? "bg-white text-green-600 border-green-300 dark:bg-gray-800 dark:text-green-400"
                            : "bg-green-100 text-green-800 border-green-500 dark:bg-green-900/30 dark:text-green-400"
                            }`}
                    >
                        {showClosedTasks ? "Clôturées" : "Non clôturées"}
                    </button>
                </div>
            </div>

            {loadingTasks ? (
                <div className="text-center py-8 text-muted-foreground">Chargement...</div>
            ) : tasks.filter(t => {
                const matchesImportance = taskFilter === "ALL" || t.importance === taskFilter
                const matchesClosed = showClosedTasks || !t.closedAt
                return matchesImportance && matchesClosed
            }).length === 0 ? (
                <EmptyState
                    icon={CheckSquare}
                    title="Aucune tâche"
                    description="Il n'y a aucune tâche correspondant aux critères."
                    action={
                        editing ? (
                            <Button onClick={handleAddTask} size="sm">
                                <Plus className="mr-2 h-4 w-4" />
                                Ajouter une tâche
                            </Button>
                        ) : null
                    }
                />
            ) : (
                <div className="space-y-4">
                    {tasks
                        .filter(t => {
                            const matchesImportance = taskFilter === "ALL" || t.importance === taskFilter
                            const matchesClosed = showClosedTasks || !t.closedAt
                            return matchesImportance && matchesClosed
                        })
                        .map((task) => {
                            const isClosed = !!task.closedAt
                            const createdAt = new Date(task.createdAt)
                            const closedAt = task.closedAt ? new Date(task.closedAt) : null

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
                                    <div className="flex">
                                        <div className={`w-1 ${importanceColor} shrink-0`} />
                                        <div className="flex-1 p-4">
                                            <div className="flex items-start justify-between mb-3">
                                                <h3 className="font-bold text-base flex-1 pr-2">{task.title}</h3>
                                                <div className="flex gap-2 flex-shrink-0">
                                                    <span className={`px-2 py-1 rounded-full text-xs font-semibold text-white ${task.importance === "URGENT" ? "bg-red-500" : task.importance === "CRITIQUE" ? "bg-orange-500" : "bg-gray-500"}`}>
                                                        {task.importance}
                                                    </span>
                                                    {isClosed && (
                                                        <span className="px-2 py-1 rounded-full text-xs font-semibold bg-green-500 text-white">
                                                            Clôturée
                                                        </span>
                                                    )}
                                                </div>
                                            </div>

                                            <div className="mb-4">
                                                <div className={`text-sm text-gray-700 dark:text-gray-300 bg-gray-50 dark:bg-gray-900/50 p-3 rounded-lg whitespace-pre-wrap ${!expandedTaskNotes[task.id] && task.notes.length > 200 ? "line-clamp-3" : ""}`}>
                                                    {task.notes}
                                                </div>
                                                {task.notes.length > 200 && (
                                                    <button
                                                        onClick={() => setExpandedTaskNotes(prev => ({ ...prev, [task.id]: !prev[task.id] }))}
                                                        className="mt-2 text-primary hover:underline text-sm font-medium"
                                                    >
                                                        {expandedTaskNotes[task.id] ? "Réduire" : "Voir plus d'infos"}
                                                    </button>
                                                )}
                                            </div>

                                            {task.photos && JSON.parse(task.photos || "[]").length > 0 && (
                                                <div className="mb-4 flex flex-wrap gap-2">
                                                    {JSON.parse(task.photos || "[]").map((photo: string, idx: number) => (
                                                        <div key={idx} className="relative group rounded-md overflow-hidden bg-gray-100 dark:bg-gray-800 border border-border">
                                                            <img
                                                                src={photo}
                                                                alt={`Photo ${idx + 1}`}
                                                                className="w-16 h-16 sm:w-20 sm:h-20 object-cover cursor-pointer hover:opacity-80 transition-opacity"
                                                                onClick={() => {
                                                                    openImageViewer(
                                                                        photo,
                                                                        JSON.parse(task.photos || "[]"),
                                                                        idx,
                                                                        task.id
                                                                    )
                                                                }}
                                                            />
                                                        </div>
                                                    ))}
                                                </div>
                                            )}

                                            <div className="flex flex-col sm:flex-row sm:items-center justify-between text-xs text-muted-foreground gap-4">
                                                <div className="space-y-1">
                                                    <div className="flex items-center gap-2">
                                                        <div className={`w-5 h-5 rounded-full text-[10px] flex items-center justify-center text-white ${getAvatarColor(task.creator.login)}`}>
                                                            {getInitials(task.creator.login)}
                                                        </div>
                                                        <span>Créée le {createdAt.toLocaleString("fr-FR")} par {task.creator.login}</span>
                                                    </div>
                                                    {isClosed && task.closer && closedAt && (
                                                        <div className="flex items-center gap-2">
                                                            <div className={`w-5 h-5 rounded-full text-[10px] flex items-center justify-center text-white ${getAvatarColor(task.closer.login)}`}>
                                                                {getInitials(task.closer.login)}
                                                            </div>
                                                            <span>Clôturée le {closedAt.toLocaleString("fr-FR")} par {task.closer.login}</span>
                                                        </div>
                                                    )}
                                                </div>

                                                {editing && (
                                                    <div className="flex items-center gap-2 shrink-0">
                                                        {!isClosed && (
                                                            <>
                                                                <Button
                                                                    variant="outline"
                                                                    size="sm"
                                                                    onClick={() => handleCloseTask(task)}
                                                                    className="h-8 gap-1.5 whitespace-nowrap text-green-600 hover:text-green-700 hover:bg-green-50"
                                                                >
                                                                    <CheckCircle className="h-4 w-4" />
                                                                    <span className="hidden sm:inline">Clôturer</span>
                                                                </Button>
                                                                <Button
                                                                    variant="outline"
                                                                    size="sm"
                                                                    onClick={() => handleEditTask(task)}
                                                                    className="h-8 w-8 sm:w-auto p-0 sm:px-3 sm:py-2 gap-1.5"
                                                                >
                                                                    <Edit className="h-4 w-4" />
                                                                    <span className="hidden sm:inline">Modifier</span>
                                                                </Button>
                                                            </>
                                                        )}
                                                        <Button
                                                            variant="outline"
                                                            size="sm"
                                                            onClick={() => handleDeleteTask(task)}
                                                            className="h-8 w-8 sm:w-auto p-0 sm:px-3 sm:py-2 gap-1.5 text-red-600 hover:text-red-700 hover:bg-red-50 border-red-200"
                                                        >
                                                            <Trash2 className="h-4 w-4" />
                                                            <span className="hidden sm:inline">Supprimer</span>
                                                        </Button>
                                                    </div>
                                                )}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            )
                        })}
                </div>
            )}

            {/* Dialog Création / Modification Tâche */}
            <Dialog open={isTaskDialogOpen || isTaskEditDialogOpen} onOpenChange={(open) => {
                if (!open) {
                    setIsTaskDialogOpen(false)
                    setIsTaskEditDialogOpen(false)
                }
            }}>
                <DialogContent className="max-w-[425px]">
                    <DialogTitle className="sr-only">Dialogue</DialogTitle>
                    <DialogHeader>
                        <DialogTitle>{isTaskEditDialogOpen ? "Modifier la tâche" : "Nouvelle tâche"}</DialogTitle>
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
                        <div className="space-y-2">
                            <Label htmlFor="task-photos">Photos (max 5)</Label>
                            <Input
                                id="task-photos"
                                type="file"
                                accept="image/jpeg,image/png"
                                multiple
                                onChange={async (e) => {
                                    const files = Array.from(e.target.files || [])
                                    if ((taskFormData.photos?.length || 0) + files.length > maxPhotosPerTask) {
                                        toast({ title: `Maximum ${maxPhotosPerTask} photo(s) autorisée(s)`, variant: "destructive" })
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
                                                toast({ title: error.error || "Erreur lors de l'upload", variant: "destructive" })
                                            }
                                        } catch (error) {
                                            console.error("Error uploading photo:", error)
                                            toast({ title: "Erreur lors de l'upload", variant: "destructive" })
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
                                            <img
                                                src={photo.preview || photo.path}
                                                alt={`Photo ${index + 1}`}
                                                className="w-20 h-20 object-cover rounded border cursor-pointer hover:opacity-80"
                                                onClick={() => {
                                                    const photos = taskFormData.photos || []
                                                    const index = photos.findIndex(p => p === photo.path)
                                                    openImageViewer(photo.path, photos, index >= 0 ? index : 0)
                                                }}
                                            />
                                            <Button
                                                type="button"
                                                variant="destructive"
                                                size="sm"
                                                className="absolute -top-2 -right-2 h-6 w-6 rounded-full p-0 opacity-0 group-hover:opacity-100 transition-opacity"
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
                        </div>
                    </div>
                    <DialogFooter>
                        <Button variant="outline" onClick={() => {
                            setIsTaskDialogOpen(false)
                            setIsTaskEditDialogOpen(false)
                            setEditingTask(null)
                        }}>
                            Annuler
                        </Button>
                        <Button onClick={isTaskEditDialogOpen ? handleUpdateTask : handleSaveTask}>Enregistrer</Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>

            {/* Dialog pour voir l'image en grand */}
            <Dialog open={!!viewingImage} onOpenChange={(open) => {
                if (!open) {
                    setViewingImage(null)
                    setImageZoom(1)
                    setImagePosition({ x: 0, y: 0 })
                    setImageHasDragged(false)
                }
            }}>
                <DialogContent className="max-w-[95vw] sm:max-w-6xl max-h-[90vh] overflow-hidden p-0">
                    <DialogTitle className="sr-only">Dialogue</DialogTitle>
                    {viewingImage && (
                        <div className="relative w-full h-[85vh] flex items-center justify-center bg-black/90 overflow-hidden">
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

                            {viewingImageList.length > 1 && (
                                <Button
                                    variant="ghost"
                                    size="icon"
                                    className="absolute left-4 top-1/2 -translate-y-1/2 text-white bg-black/50 hover:bg-black/70 rounded-full h-12 w-12"
                                    onClick={(e) => { e.stopPropagation(); handlePrevImage(); }}
                                >
                                    <ChevronLeft className="h-6 w-6" />
                                </Button>
                            )}

                            {viewingImageList.length > 1 && (
                                <Button
                                    variant="ghost"
                                    size="icon"
                                    className="absolute right-4 top-1/2 -translate-y-1/2 text-white bg-black/50 hover:bg-black/70 rounded-full h-12 w-12"
                                    onClick={(e) => { e.stopPropagation(); handleNextImage(); }}
                                >
                                    <ChevronRight className="h-6 w-6" />
                                </Button>
                            )}

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

                            {editingTask && viewingImageTaskId === editingTask.id && (
                                <Button
                                    variant="ghost"
                                    size="icon"
                                    className="absolute top-4 right-16 text-white hover:text-red-400 bg-black/50 hover:bg-red-500/70 rounded-full h-10 w-10"
                                    onClick={handleDeleteImage}
                                >
                                    <Trash2 className="h-5 w-5" />
                                </Button>
                            )}
                        </div>
                    )}
                </DialogContent>
            </Dialog>

            <ConfirmDialog
                open={confirmState.open}
                onOpenChange={(open) => setConfirmState(prev => ({ ...prev, open }))}
                title={confirmState.title}
                description={confirmState.description}
                confirmLabel={confirmState.confirmLabel || "Confirmer"}
                variant={confirmState.variant}
                onConfirm={async () => {
                    await confirmState.onConfirm()
                    setConfirmState(prev => ({ ...prev, open: false }))
                }}
                loading={confirmLoading}
            />
        </div>
    )
}
