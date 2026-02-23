import React, { useState } from "react"
import Image from "next/image"
import { Search, X, ChevronLeft, ChevronRight, Edit, Trash2, Plus } from "lucide-react"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog"

import { useToast } from "@/lib/toast-context"
import { ConfirmDialog } from "@/components/ui/confirm-dialog"
import { apiFetch } from "@/lib/api-client"

export interface PhotoGroup {
    id: string
    type: string
    title?: string
    photos: string // JSON string
    agencyId?: string
}

interface PhotoSectionProps {
    agencyId: string
    photos: PhotoGroup[]
    editing: boolean
    maxImageSizeMB?: number
    onUpdate: () => Promise<void>
}

export function PhotoSection({
    agencyId,
    photos,
    editing,
    maxImageSizeMB = 5,
    onUpdate,
}: PhotoSectionProps) {
    const { toast } = useToast()

    // Confirm dialog state
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
        setConfirmState({ open: true, confirmLabel: "Supprimer", variant: "danger", ...opts })
    }

    const showError = (message: string) => toast({ title: message, variant: "destructive" })

    // Search and tabs
    const [photoSearch, setPhotoSearch] = useState("")
    const [selectedPhotoTypeTab, setSelectedPhotoTypeTab] = useState("")

    // Add/Edit photo group dialog
    const [isPhotoDialogOpen, setIsPhotoDialogOpen] = useState(false)
    const [selectedPhotoGroup, setSelectedPhotoGroup] = useState<PhotoGroup | null>(null)
    const [photoGroupType, setPhotoGroupType] = useState("")
    const [photoGroupTitle, setPhotoGroupTitle] = useState("")
    const [photoFiles, setPhotoFiles] = useState<File[]>([])

    // Edit individual photo title
    const [isEditPhotoTitleDialogOpen, setIsEditPhotoTitleDialogOpen] = useState(false)
    const [editingPhotoUrl, setEditingPhotoUrl] = useState("")
    const [editingPhotoGroupId, setEditingPhotoGroupId] = useState("")
    const [editingPhotoTitle, setEditingPhotoTitle] = useState("")
    const [editingPhotoCreatedAt, setEditingPhotoCreatedAt] = useState("")

    // Lightbox constraints
    const [lightboxOpen, setLightboxOpen] = useState(false)
    const [lightboxPhotos, setLightboxPhotos] = useState<Array<{ url: string; title?: string; createdAt?: string | null; type: string }>>([])
    const [lightboxCurrentIndex, setLightboxCurrentIndex] = useState(0)

    // Zoom / Drag state
    const [zoomLevel, setZoomLevel] = useState(1)
    const [zoomPosition, setZoomPosition] = useState({ x: 0, y: 0 })
    const [isDragging, setIsDragging] = useState(false)
    const [dragStart, setDragStart] = useState({ x: 0, y: 0 })
    const [hasDragged, setHasDragged] = useState(false)
    const [touchStartDistance, setTouchStartDistance] = useState(0)
    const [touchStartZoom, setTouchStartZoom] = useState(1)

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
        setZoomLevel(1)
        setZoomPosition({ x: 0, y: 0 })
        setHasDragged(false)
    }

    const handleNextPhoto = () => {
        if (lightboxPhotos.length === 0) return
        setLightboxCurrentIndex((prev) => (prev + 1) % lightboxPhotos.length)
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
            const rect = e.currentTarget.getBoundingClientRect()
            const centerX = rect.width / 2
            const centerY = rect.height / 2
            const mouseX = e.clientX - rect.left
            const mouseY = e.clientY - rect.top

            const offsetX = ((mouseX - centerX) / rect.width) * 100
            const offsetY = ((mouseY - centerY) / rect.height) * 100

            const zoomChange = newZoom - zoomLevel
            const newX = zoomPosition.x - (offsetX * zoomChange / newZoom)
            const newY = zoomPosition.y - (offsetY * zoomChange / newZoom)

            setZoomLevel(newZoom)
            setZoomPosition({ x: newX, y: newY })
        }
    }

    const handleMouseDown = (e: React.MouseEvent<HTMLDivElement>) => {
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

            if (Math.abs(deltaX) > 5 || Math.abs(deltaY) > 5) {
                setHasDragged(true)
                const deltaXPercent = (deltaX / rect.width) * 100
                const deltaYPercent = (deltaY / rect.height) * 100
                setZoomPosition(prev => ({ x: prev.x + deltaXPercent, y: prev.y + deltaYPercent }))
                setDragStart({ x: e.clientX, y: e.clientY })
            }
        }
    }

    const handleMouseUp = (e: React.MouseEvent<HTMLDivElement>) => {
        if (isDragging) {
            e.preventDefault()
            e.stopPropagation()
            setIsDragging(false)
            setTimeout(() => setHasDragged(false), 100)
        }
    }

    const getTouchDistance = (touch1: React.Touch, touch2: React.Touch): number => {
        const dx = touch2.clientX - touch1.clientX
        const dy = touch2.clientY - touch1.clientY
        return Math.sqrt(dx * dx + dy * dy)
    }

    const handleTouchStart = (e: React.TouchEvent<HTMLDivElement>) => {
        if (e.touches.length === 1) {
            if (zoomLevel > 1) {
                e.preventDefault()
                e.stopPropagation()
                const touch = e.touches[0]
                setIsDragging(true)
                setHasDragged(false)
                setDragStart({ x: touch.clientX, y: touch.clientY })
            }
        } else if (e.touches.length === 2) {
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
            e.preventDefault()
            e.stopPropagation()
            const touch = e.touches[0]
            const rect = e.currentTarget.getBoundingClientRect()
            const deltaX = touch.clientX - dragStart.x
            const deltaY = touch.clientY - dragStart.y
            if (Math.abs(deltaX) > 5 || Math.abs(deltaY) > 5) {
                setHasDragged(true)
                const deltaXPercent = (deltaX / rect.width) * 100
                const deltaYPercent = (deltaY / rect.height) * 100
                setZoomPosition(prev => ({ x: prev.x + deltaXPercent, y: prev.y + deltaYPercent }))
                setDragStart({ x: touch.clientX, y: touch.clientY })
            }
        } else if (e.touches.length === 2 && touchStartDistance > 0) {
            e.preventDefault()
            e.stopPropagation()
            const currentDistance = getTouchDistance(e.touches[0], e.touches[1])
            const distanceRatio = currentDistance / touchStartDistance
            const newZoom = Math.max(1, Math.min(5, touchStartZoom * distanceRatio))
            if (newZoom !== zoomLevel) {
                setZoomLevel(newZoom)
            }
        }
    }

    const handleTouchEnd = (e: React.TouchEvent<HTMLDivElement>) => {
        if (e.touches.length === 0) {
            if (isDragging) {
                setIsDragging(false)
                setTimeout(() => setHasDragged(false), 100)
            }
            setTouchStartDistance(0)
            setTouchStartZoom(1)
        } else if (e.touches.length === 1 && touchStartDistance > 0) {
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
        if (hasDragged) {
            e.stopPropagation()
            return
        }
        e.stopPropagation()
        if (zoomLevel > 1) {
            setZoomLevel(1)
            setZoomPosition({ x: 0, y: 0 })
            setHasDragged(false)
        } else {
            handleNextPhoto()
        }
    }

    const handleDeletePhotoGroup = (photoGroupId: string) => {
        openConfirm({
            title: "Supprimer le groupe de photos",
            description: "Êtes-vous sûr de vouloir supprimer ce groupe de photos ?",
            onConfirm: async () => {
                setConfirmLoading(true)
                try {
                    const response = await apiFetch(`/api/photos/${photoGroupId}`, { method: "DELETE" })
                    if (response.ok) {
                        await onUpdate()
                        toast({ title: "Groupe de photos supprimé", variant: "success" })
                    } else {
                        showError("Erreur lors de la suppression")
                    }
                } catch (error) {
                    console.error("Error deleting photo group:", error)
                    showError("Erreur lors de la suppression")
                } finally {
                    setConfirmLoading(false)
                }
            },
        })
    }

    const handleSavePhotoTitle = async () => {
        if (!editingPhotoGroupId || !editingPhotoUrl) {
            showError("Données manquantes")
            return
        }
        try {
            const photoGroup = photos?.find((pg) => pg.id === editingPhotoGroupId)
            if (!photoGroup) {
                showError("Groupe de photos non trouvé")
                return
            }

            const pgPhotos = JSON.parse(photoGroup.photos || "[]")
            const createdAtISO = editingPhotoCreatedAt ? new Date(editingPhotoCreatedAt + "T00:00:00").toISOString() : null

            const updatedPhotos = pgPhotos.map((p: string | { path: string; createdAt?: string; title?: string }) => {
                const path = typeof p === "string" ? p : p.path
                if (path === editingPhotoUrl) {
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

            const response = await apiFetch(`/api/photos/${editingPhotoGroupId}`, {
                method: "PUT",
                body: JSON.stringify({
                    type: photoGroup.type,
                    title: photoGroup.title,
                    photos: updatedPhotos,
                }),
            })

            if (response.ok) {
                await onUpdate()
                setIsEditPhotoTitleDialogOpen(false)
                setEditingPhotoUrl("")
                setEditingPhotoGroupId("")
                setEditingPhotoTitle("")
                setEditingPhotoCreatedAt("")
            } else {
                const error = await response.json()
                showError(error.error || "Erreur lors de la mise à jour du titre")
            }
        } catch (error) {
            console.error("Error saving photo title:", error)
            showError("Erreur lors de la mise à jour du titre")
        }
    }

    const handleDeletePhoto = (photoGroupId: string, photoUrl: string) => {
        openConfirm({
            title: "Supprimer la photo",
            description: "Êtes-vous sûr de vouloir supprimer cette photo ?",
            onConfirm: async () => {
                setConfirmLoading(true)
                try {
                    const photoGroup = photos?.find((pg) => pg.id === photoGroupId)
                    if (!photoGroup) {
                        showError("Groupe de photos non trouvé")
                        return
                    }
                    const pgPhotos = JSON.parse(photoGroup.photos || "[]")
                    const updatedPhotos = pgPhotos.filter((p: string | { path: string }) => {
                        const path = typeof p === "string" ? p : p.path
                        return path !== photoUrl
                    })

                    if (photoGroup.type === "Agence" && updatedPhotos.length === 0) {
                        await apiFetch(`/api/photos/${photoGroupId}`, { method: "DELETE" })
                        await onUpdate()
                        toast({ title: "Photo supprimée", variant: "success" })
                        return
                    }

                    const response = await apiFetch(`/api/photos/${photoGroupId}`, {
                        method: "PUT",
                        body: JSON.stringify({
                            type: photoGroup.type,
                            title: photoGroup.title,
                            photos: updatedPhotos,
                        }),
                    })
                    if (response.ok) {
                        await onUpdate()
                        toast({ title: "Photo supprimée", variant: "success" })
                    } else {
                        const error = await response.json()
                        showError(error.error || "Erreur lors de la suppression de la photo")
                    }
                } catch (error) {
                    console.error("Error deleting photo:", error)
                    showError("Erreur lors de la suppression de la photo")
                } finally {
                    setConfirmLoading(false)
                }
            },
        })
    }

    const handleSavePhotoGroup = async () => {
        if (!agencyId || !photoGroupType) {
            showError("Veuillez sélectionner un type de groupe")
            return
        }

        const MAX_SIZE = maxImageSizeMB * 1024 * 1024
        const oversizedFiles = photoFiles.filter((file) => file.size > MAX_SIZE)

        if (oversizedFiles.length > 0) {
            showError(`Certains fichiers dépassent la taille maximale (${maxImageSizeMB} MB)`)
            return
        }

        try {
            const uploadedFilePaths: Array<{ path: string; createdAt: string }> = []
            // Upload les nouvelles photos
            for (const file of photoFiles) {
                const formData = new FormData()
                formData.append("file", file)
                const fetchCSRFToken = async () => {
                    try {
                        const response = await fetch("/api/csrf-token")
                        const data = await response.json()
                        return data.csrfToken
                    } catch {
                        return null
                    }
                }
                const csrfToken = await fetchCSRFToken()
                if (csrfToken) {
                    formData.append("_csrf", csrfToken)
                }
                const response = await apiFetch("/api/upload", {
                    method: "POST",
                    body: formData,
                    skipCSRF: true,
                })
                if (response.ok) {
                    const data = await response.json()
                    uploadedFilePaths.push({
                        path: data.path,
                        createdAt: new Date().toISOString()
                    })
                } else {
                    showError(`Erreur lors de l'upload de ${file.name}`)
                    return
                }
            }

            let url = "/api/photos"
            let method = "POST"
            let currentPhotos: any[] = []

            if (selectedPhotoGroup) {
                url = `/api/photos/${selectedPhotoGroup.id}`
                method = "PUT"
                currentPhotos = JSON.parse(selectedPhotoGroup.photos || "[]")
            } else {
                const existingGroup = photos?.find((pg) => pg.type === photoGroupType)
                if (existingGroup) {
                    url = `/api/photos/${existingGroup.id}`
                    method = "PUT"
                    currentPhotos = JSON.parse(existingGroup.photos || "[]")
                }
            }

            const allPhotos = [...currentPhotos, ...uploadedFilePaths]

            const response = await apiFetch(url, {
                method,
                body: JSON.stringify({
                    agencyId: agencyId,
                    type: photoGroupType,
                    title: photoGroupTitle || photoGroupType,
                    photos: allPhotos,
                }),
            })

            if (response.ok) {
                await onUpdate()
                setIsPhotoDialogOpen(false)
                setSelectedPhotoGroup(null)
                setPhotoGroupType("")
                setPhotoGroupTitle("")
                setPhotoFiles([])
                toast({ title: "Photos sauvegardées", variant: "success" })
            } else {
                const error = await response.json()
                showError(error.error || "Erreur lors de la sauvegarde du groupe de photos")
            }
        } catch (error) {
            console.error("Error saving photo group:", error)
            showError("Erreur lors de la sauvegarde du groupe de photos")
        }
    }

    // Processing the list of photos for UI
    const normalizeSearch = (text: string) => {
        return text.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "")
    }
    const searchTerm = normalizeSearch(photoSearch)

    const photosByType = photos.reduce((acc, photoGroup) => {
        const type = photoGroup.type
        const pgPhotos = JSON.parse(photoGroup.photos || "[]")
        if (!acc[type]) acc[type] = []
        pgPhotos.forEach((photo: string | { path: string; createdAt?: string; title?: string }) => {
            const photoPath = typeof photo === "string" ? photo : photo.path
            const createdAt = typeof photo === "string" ? null : (photo.createdAt || null)
            const photoTitle = typeof photo === "object" && photo.title !== undefined ? photo.title : (photoGroup.title || "")

            const matchesSearch = !searchTerm || normalizeSearch(photoTitle + " " + type).includes(searchTerm)

            if (matchesSearch) {
                acc[type].push({
                    url: photoPath,
                    title: photoTitle,
                    createdAt,
                    type: photoGroup.type,
                    photoGroupId: photoGroup.id,
                })
            }
        })
        return acc
    }, {} as Record<string, Array<{ url: string; title?: string; createdAt: string | null; type: string; photoGroupId: string }>>)

    const photoTypes = Object.keys(photosByType).filter(type => photosByType[type].length > 0).sort()
    const defaultTab = photoTypes.length > 0 ? photoTypes[0] : ""
    const activeTab = selectedPhotoTypeTab && photoTypes.includes(selectedPhotoTypeTab) ? selectedPhotoTypeTab : defaultTab

    return (
        <>
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
                                >
                                    <X className="h-4 w-4" />
                                </button>
                            )}
                        </div>
                    </div>
                </CardHeader>
                <CardContent>
                    {photos && photos.length > 0 ? (
                        photoTypes.length === 0 ? (
                            <div className="text-muted-foreground text-center py-8">
                                {photoSearch ? `Aucune photo ne correspond à la recherche "${photoSearch}"` : "Aucune photo enregistrée"}
                            </div>
                        ) : (
                            <Tabs value={activeTab} onValueChange={setSelectedPhotoTypeTab} className="w-full">
                                <div className="w-full mb-4 clear-both">
                                    <TabsList className="bg-background w-full sm:w-auto flex flex-wrap gap-1 sm:gap-0 sm:inline-flex h-auto sm:h-10" style={{ backgroundColor: 'hsl(var(--background))' }}>
                                        {photoTypes.map((type) => (
                                            <TabsTrigger key={type} value={type} className="text-xs sm:text-sm min-h-[44px] flex-shrink-0">
                                                {type} ({photosByType[type].length})
                                            </TabsTrigger>
                                        ))}
                                    </TabsList>
                                </div>

                                {photoTypes.map((type) => (
                                    <TabsContent key={type} value={type} className="mt-0 clear-both">
                                        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-2">
                                            {photosByType[type].map((photo, index) => {
                                                const photoGroup = photos?.find((pg) => pg.id === photo.photoGroupId)
                                                return (
                                                    <div key={`${photo.photoGroupId}-${index}`} className="relative flex flex-col aspect-square w-full bg-gray-100 dark:bg-secondary rounded overflow-hidden group">
                                                        <div
                                                            className="flex-1 flex items-center justify-center overflow-hidden cursor-pointer hover:opacity-80 transition-opacity"
                                                            onClick={() => {
                                                                const allPhotosOfType = photos?.filter((pg) => pg.type === type).flatMap((pg) => {
                                                                    const pgPhotos = JSON.parse(pg.photos || "[]")
                                                                    return pgPhotos.map((p: string | { path: string; createdAt?: string; title?: string }) => {
                                                                        const path = typeof p === "string" ? p : p.path
                                                                        const createdAt = typeof p === "string" ? null : (p.createdAt || null)
                                                                        const photoTitle = typeof p === "object" && p.title !== undefined ? p.title : (pg.title || "")
                                                                        return { url: path, title: photoTitle, createdAt, type: pg.type }
                                                                    })
                                                                }) || []
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
                                                                <Image src={photo.url} alt={`${type} ${index + 1}`} fill className="object-contain" unoptimized />
                                                            </div>
                                                        </div>
                                                        {(photo.title || photo.createdAt) && (
                                                            <div className="bg-black/60 text-white text-xs px-2 py-1 flex items-center justify-between gap-2">
                                                                <span className="truncate flex-1">{photo.title || ""}</span>
                                                                {photo.createdAt && (
                                                                    <span className="text-white/80 text-[10px] whitespace-nowrap">
                                                                        {new Date(photo.createdAt).toLocaleDateString("fr-FR", { day: "2-digit", month: "2-digit", year: "numeric" })}
                                                                    </span>
                                                                )}
                                                            </div>
                                                        )}
                                                        {editing && (
                                                            <div className="absolute top-2 right-2 flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                                                                <Button
                                                                    variant="secondary" size="sm" className="h-6 w-6 p-0"
                                                                    onClick={(e) => {
                                                                        e.stopPropagation()
                                                                        setEditingPhotoUrl(photo.url)
                                                                        setEditingPhotoGroupId(photoGroup?.id || "")
                                                                        setEditingPhotoTitle(photo.title || "")
                                                                        const photoCreatedAt = photo.createdAt ? new Date(photo.createdAt).toISOString().split('T')[0] : new Date().toISOString().split('T')[0]
                                                                        setEditingPhotoCreatedAt(photoCreatedAt)
                                                                        setIsEditPhotoTitleDialogOpen(true)
                                                                    }}
                                                                >
                                                                    <Edit className="h-3 w-3" />
                                                                </Button>
                                                                <Button
                                                                    variant="destructive" size="sm" className="h-6 w-6 p-0"
                                                                    onClick={(e) => {
                                                                        e.stopPropagation()
                                                                        handleDeletePhoto(photoGroup?.id || "", photo.url)
                                                                    }}
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
                                ))}
                            </Tabs>
                        )
                    ) : (
                        <div className="text-muted-foreground">Aucune photo enregistrée</div>
                    )}
                </CardContent>
            </Card>

            {/* Lightbox */}
            {lightboxOpen && lightboxPhotos.length > 0 && (
                <div className="fixed inset-0 z-[9999] bg-black flex items-center justify-center" onClick={(e) => { if (e.target === e.currentTarget) setLightboxOpen(false) }}>
                    <div className="relative w-full h-full flex items-center justify-center">
                        {lightboxPhotos.length > 1 && (
                            <button
                                onClick={(e) => { e.stopPropagation(); handlePreviousPhoto() }}
                                className="absolute left-4 z-10 p-2 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors"
                            >
                                <ChevronLeft className="h-8 w-8" />
                            </button>
                        )}

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
                                    <Image src={lightboxPhotos[lightboxCurrentIndex].url} alt={`Photo ${lightboxCurrentIndex + 1}`} fill className="object-contain pointer-events-none" unoptimized />
                                </div>
                                {lightboxPhotos[lightboxCurrentIndex].title && (
                                    <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 bg-black/70 text-white px-4 py-2 rounded-lg pointer-events-none select-none max-w-[80vw] text-center">
                                        <p className="font-medium">{lightboxPhotos[lightboxCurrentIndex].title}</p>
                                        {lightboxPhotos[lightboxCurrentIndex].createdAt && (
                                            <p className="text-xs text-white/70 mt-1">
                                                {new Date(lightboxPhotos[lightboxCurrentIndex].createdAt!).toLocaleDateString("fr-FR", { day: "2-digit", month: "2-digit", year: "numeric" })}
                                            </p>
                                        )}
                                    </div>
                                )}
                            </div>
                        </div>

                        {lightboxPhotos.length > 1 && (
                            <button
                                onClick={(e) => { e.stopPropagation(); handleNextPhoto() }}
                                className="absolute right-4 z-10 p-2 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors"
                            >
                                <ChevronRight className="h-8 w-8" />
                            </button>
                        )}

                        <button
                            onClick={(e) => { e.stopPropagation(); setLightboxOpen(false) }}
                            className="absolute top-4 right-4 z-10 p-2 rounded-full bg-black/50 hover:bg-black/70 text-white transition-colors"
                        >
                            <X className="h-6 w-6" />
                        </button>

                        {lightboxPhotos.length > 1 && (
                            <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 text-white/70 text-sm select-none">
                                {lightboxCurrentIndex + 1} / {lightboxPhotos.length}
                            </div>
                        )}
                    </div>
                </div>
            )}

            {/* Dialog Photos */}
            <Dialog open={isPhotoDialogOpen} onOpenChange={setIsPhotoDialogOpen}>
                <DialogContent className="max-w-[95vw] sm:max-w-2xl max-h-[90vh] overflow-y-auto">
                    <DialogTitle className="sr-only">Dialogue</DialogTitle>
                    <DialogHeader>
                        <DialogTitle>{selectedPhotoGroup ? "Modifier le groupe de photos" : "Nouveau groupe de photos"}</DialogTitle>
                        <DialogDescription>Sélectionnez un type et uploadez des photos (jpeg, png, max {maxImageSizeMB} MB).</DialogDescription>
                    </DialogHeader>
                    <div className="space-y-4 py-4">
                        <div className="space-y-2">
                            <Label htmlFor="photo-type">Type de photos *</Label>
                            <Select value={photoGroupType} onValueChange={setPhotoGroupType}>
                                <SelectTrigger id="photo-type"><SelectValue placeholder="Sélectionner un type" /></SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="Bureau">Photos Bureau</SelectItem>
                                    <SelectItem value="Connexion">Photos Connexion</SelectItem>
                                    <SelectItem value="Armoire électrique">Photos Armoire électrique</SelectItem>
                                    <SelectItem value="Agence">Photos de l&apos;agence</SelectItem>
                                    <SelectItem value="Divers">Photos Divers</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="photo-title">Titre</Label>
                            <Input id="photo-title" value={photoGroupTitle} onChange={(e) => setPhotoGroupTitle(e.target.value)} placeholder="Titre du groupe de photos (optionnel)" />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="photo-files">Photos (jpeg, png, max {maxImageSizeMB} MB)</Label>
                            <Input
                                id="photo-files" type="file" accept="image/jpeg,image/png" multiple
                                onChange={(e) => {
                                    const files = Array.from(e.target.files || [])
                                    const MAX_SIZE = maxImageSizeMB * 1024 * 1024
                                    const validFiles: File[] = []
                                    const invalidFiles: string[] = []
                                    files.forEach((file) => {
                                        if (file.size > MAX_SIZE) invalidFiles.push(file.name)
                                        else validFiles.push(file)
                                    })
                                    if (invalidFiles.length > 0) {
                                        showError(`Les fichiers suivants dépassent la taille maximale :\n${invalidFiles.join("\n")}`)
                                    }
                                    setPhotoFiles(validFiles)
                                }}
                            />
                            {photoFiles.length > 0 && <div className="text-sm text-muted-foreground">{photoFiles.length} fichier(s) sélectionné(s)</div>}
                        </div>
                        {selectedPhotoGroup && (
                            <div className="space-y-2">
                                <Label>Photos existantes</Label>
                                <div className="grid grid-cols-3 gap-2">
                                    {JSON.parse(selectedPhotoGroup.photos || "[]").map((photo: string | { path: string; createdAt?: string }, index: number) => {
                                        const photoPath = typeof photo === "string" ? photo : photo.path
                                        return (
                                            <div key={index} className="relative w-full h-24">
                                                <Image src={photoPath} alt={`Photo ${index + 1}`} fill className="object-cover rounded border" unoptimized />
                                                {typeof photo === "object" && photo.createdAt && (
                                                    <div className="absolute bottom-0 left-0 right-0 bg-black/60 text-white text-[10px] px-1 py-0.5 text-center">
                                                        {new Date(photo.createdAt).toLocaleDateString("fr-FR", { day: "2-digit", month: "2-digit", year: "numeric" })}
                                                    </div>
                                                )}
                                            </div>
                                        )
                                    })}
                                </div>
                            </div>
                        )}
                    </div>
                    <DialogFooter>
                        <Button variant="outline" onClick={() => { setIsPhotoDialogOpen(false); setSelectedPhotoGroup(null); setPhotoGroupType(""); setPhotoGroupTitle(""); setPhotoFiles([]) }}>Annuler</Button>
                        <Button onClick={handleSavePhotoGroup} disabled={!photoGroupType}>Enregistrer</Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>

            {/* Dialog Edit Photo */}
            <Dialog open={isEditPhotoTitleDialogOpen} onOpenChange={setIsEditPhotoTitleDialogOpen}>
                <DialogContent className="max-w-[95vw] sm:max-w-md">
                    <DialogTitle className="sr-only">Dialogue</DialogTitle>
                    <DialogHeader><DialogTitle>Modifier la photo</DialogTitle></DialogHeader>
                    <div className="space-y-4 py-4">
                        <div className="space-y-2">
                            <Label htmlFor="edit-photo-title">Titre</Label>
                            <Input id="edit-photo-title" value={editingPhotoTitle} onChange={(e) => setEditingPhotoTitle(e.target.value)} placeholder="Titre de la photo (optionnel)" />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="edit-photo-date">Date de création</Label>
                            <Input id="edit-photo-date" type="date" value={editingPhotoCreatedAt} onChange={(e) => setEditingPhotoCreatedAt(e.target.value)} />
                        </div>
                        {editingPhotoUrl && (
                            <div className="space-y-2">
                                <Label>Aperçu</Label>
                                <div className="relative aspect-square w-full bg-gray-100 dark:bg-secondary rounded overflow-hidden">
                                    <Image src={editingPhotoUrl} alt="Aperçu" fill className="object-contain" unoptimized />
                                </div>
                            </div>
                        )}
                    </div>
                    <DialogFooter>
                        <Button variant="outline" onClick={() => { setIsEditPhotoTitleDialogOpen(false); setEditingPhotoUrl(""); setEditingPhotoGroupId(""); setEditingPhotoTitle(""); setEditingPhotoCreatedAt("") }}>Annuler</Button>
                        <Button onClick={handleSavePhotoTitle}>Enregistrer</Button>
                    </DialogFooter>
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
        </>
    )
}
