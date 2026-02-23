import React, { useState } from "react"
import { MapPin, Plus, Edit, Trash2 } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { AddressSearch } from "@/components/address-search"
import { useToast } from "@/lib/toast-context"
import { ConfirmDialog } from "@/components/ui/confirm-dialog"
import { apiFetch } from "@/lib/api-client"

export interface Address {
    id: string
    label: string
    street: string
    city: string
    postalCode: string
    latitude?: number
    longitude?: number
    banId?: string | null
    country?: string
}

interface AddressSectionProps {
    agencyId: string
    addresses: Address[]
    editing: boolean
    onUpdate: () => Promise<void>
}

export function AddressSection({
    agencyId,
    addresses,
    editing,
    onUpdate,
}: AddressSectionProps) {
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
        setConfirmState({ open: true, confirmLabel: "Supprimer", variant: "danger", ...opts })
    }

    // États locaux de l'adresse
    const [isAddressDialogOpen, setIsAddressDialogOpen] = useState(false)
    const [selectedAddress, setSelectedAddress] = useState<Address | null>(null)
    const [addressLabel, setAddressLabel] = useState("")
    const [selectedBANAddress, setSelectedBANAddress] = useState<any>(null)
    const [addressMode, setAddressMode] = useState<"ban" | "manual">("ban")
    const [manualStreet, setManualStreet] = useState("")
    const [manualCity, setManualCity] = useState("")
    const [manualPostalCode, setManualPostalCode] = useState("")

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

    const handleDeleteAddress = (addressId: string) => {
        openConfirm({
            title: "Supprimer l'adresse",
            description: "Êtes-vous sûr de vouloir supprimer cette adresse ?",
            onConfirm: async () => {
                setConfirmLoading(true)
                try {
                    const response = await apiFetch(`/api/addresses/${addressId}`, { method: "DELETE" })
                    if (response.ok) {
                        await onUpdate()
                        toast({ title: "Adresse supprimée", variant: "success" })
                    } else {
                        toast({ title: "Erreur lors de la suppression", variant: "destructive" })
                    }
                } catch (error) {
                    console.error("Error deleting address:", error)
                    toast({ title: "Erreur lors de la suppression", variant: "destructive" })
                } finally {
                    setConfirmLoading(false)
                }
            },
        })
    }

    const handleSaveAddress = async () => {
        if (!agencyId || !addressLabel.trim()) {
            toast({ title: "Veuillez saisir un label", variant: "destructive" })
            return
        }

        // Validation selon le mode
        if (addressMode === "ban") {
            if (!selectedBANAddress) {
                toast({ title: "Veuillez sélectionner une adresse via l'API BAN", variant: "destructive" })
                return
            }
        } else {
            if (!manualStreet.trim() || !manualCity.trim() || !manualPostalCode.trim()) {
                toast({ title: "Veuillez remplir tous les champs de l'adresse", variant: "destructive" })
                return
            }
        }

        try {
            let latitude: number | null = null
            let longitude: number | null = null

            // Si mode manuel, géocoder l'adresse pour obtenir les coordonnées GPS
            if (addressMode === "manual") {
                try {
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
                agencyId: agencyId,
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
                toast({ title: error.error || "Erreur lors de la sauvegarde de l'adresse", variant: "destructive" })
                return
            }

            await onUpdate()
            setIsAddressDialogOpen(false)
            setSelectedAddress(null)
            setAddressLabel("")
            setSelectedBANAddress(null)
            setAddressMode("ban")
            setManualStreet("")
            setManualCity("")
            setManualPostalCode("")
            toast({ title: "Adresse sauvegardée", variant: "success" })
        } catch (error) {
            console.error("Error saving address:", error)
            toast({ title: "Erreur lors de la sauvegarde", variant: "destructive" })
        }
    }

    return (
        <>
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
                    {addresses && addresses.length > 0 ? (
                        <div className="grid gap-3 sm:gap-4 auto-rows-fr" style={{ gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 300px), 1fr))' }}>
                            {addresses.map((address) => (
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

            {/* Dialog adresse */}
            <Dialog open={isAddressDialogOpen} onOpenChange={setIsAddressDialogOpen}>
                <DialogContent className="max-w-[95vw] sm:max-w-2xl max-h-[90vh] overflow-y-auto">
                    <DialogTitle className="sr-only">Dialogue</DialogTitle>
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
