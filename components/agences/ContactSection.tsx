import React, { useState } from "react"
import { Plus, Edit, Trash2, GripVertical, Phone, User, Mail, FileText, Users } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { EmptyState } from "@/components/ui/empty-state"
import { useToast } from "@/lib/toast-context"
import { ConfirmDialog } from "@/components/ui/confirm-dialog"
import { apiFetch } from "@/lib/api-client"

export interface Contact {
    id: string
    postNumber: string
    agentNumber: string
    directLine: string
    emails: string
    managerName: string
    note?: string
    order?: number
}

interface ContactSectionProps {
    agencyId: string
    contacts: Contact[]
    editing: boolean
    userRole: string | null
    onUpdate: () => Promise<void>
}

export function ContactSection({
    agencyId,
    contacts: initialContacts,
    editing,
    userRole,
    onUpdate,
}: ContactSectionProps) {
    const { toast } = useToast()

    const [confirmState, setConfirmState] = useState<{
        open: boolean
        title: string
        description: string
        confirmLabel?: string
        variant?: "danger" | "default"
        onConfirm: () => void | Promise<void>
    }>({ open: false, title: "", description: "", onConfirm: () => { } })

    const openConfirm = (opts: { title: string; description: string; confirmLabel?: string; variant?: "danger" | "default"; onConfirm: () => void | Promise<void> }) => {
        setConfirmState({ open: true, confirmLabel: "Supprimer", variant: "danger", ...opts })
    }

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
    const [confirmLoading, setConfirmLoading] = useState(false)

    // États d'UI pour le drag & drop et l'affichage des notes longues
    const [draggedContactId, setDraggedContactId] = useState<string | null>(null)
    const [dragOverContactIndex, setDragOverContactIndex] = useState<number | null>(null)
    const [expandedContactNotes, setExpandedContactNotes] = useState<Record<string, boolean>>({})

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

    const handleDeleteContact = (contactId: string) => {
        openConfirm({
            title: "Supprimer le contact",
            description: "Êtes-vous sûr de vouloir supprimer ce contact ?",
            onConfirm: async () => {
                setConfirmLoading(true)
                try {
                    const response = await apiFetch(`/api/contacts/${contactId}`, { method: "DELETE" })
                    if (response.ok) {
                        await onUpdate()
                        toast({ title: "Contact supprimé", variant: "success" })
                    } else {
                        toast({ title: "Erreur lors de la suppression", variant: "destructive" })
                    }
                } catch (error) {
                    console.error("Error deleting contact:", error)
                    toast({ title: "Erreur lors de la suppression", variant: "destructive" })
                } finally {
                    setConfirmLoading(false)
                }
            },
        })
    }

    const handleMoveContact = async (draggedId: string, targetId: string) => {
        if (!agencyId || !initialContacts) {
            return
        }

        // S'assurer que les contacts ont un champ order (rétrocompatibilité)
        const contactsWithOrder = initialContacts.map((contact, index) => ({
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
                    apiFetch(`/api/contacts/${contact.id}`, {
                        method: "PUT",
                        body: JSON.stringify({ order: index }),
                    })
                )
            )

            await onUpdate()
        } catch (error) {
            console.error("[handleMoveContact] Erreur:", error)
            toast({ title: "Erreur lors du déplacement", variant: "destructive" })
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
        if (!agencyId || !contactManagerName) {
            toast({ title: "Veuillez saisir le nom du contact", variant: "destructive" })
            return
        }

        try {
            const contactData = {
                agencyId: agencyId,
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
                toast({ title: error.error || "Erreur lors de la sauvegarde du contact", variant: "destructive" })
                return
            }

            await onUpdate()
            setIsContactDialogOpen(false)
            toast({ title: "Contact sauvegardé avec succès", variant: "success" })
        } catch (error) {
            console.error("Error saving contact:", error)
            toast({ title: "Erreur de connexion", variant: "destructive" })
        }
    }

    return (
        <>
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
                    {initialContacts && initialContacts.length > 0 ? (
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4">
                            {(() => {
                                const sortedContacts = [...initialContacts].sort((a, b) => (a.order || 0) - (b.order || 0))
                                return sortedContacts.map((contact, index) => {
                                    const emails = JSON.parse(contact.emails || "[]")
                                    return (
                                        <Card
                                            key={contact.id}
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
                                            className={`bg-slate-50 dark:bg-slate-800/50 ${draggedContactId === contact.id ? "opacity-50" : ""
                                                } ${dragOverContactIndex === index ? "border-primary border-2" : ""
                                                }`}
                                        >
                                            <CardHeader className="p-3 sm:p-4">
                                                <div className="flex items-start justify-between gap-2">
                                                    {editing && (
                                                        <div
                                                            className="text-muted-foreground cursor-move shrink-0"
                                                            draggable={true}
                                                            onDragStart={(e) => {
                                                                setDraggedContactId(contact.id)
                                                                e.dataTransfer.effectAllowed = "move"
                                                            }}
                                                            onDragEnd={() => {
                                                                setDraggedContactId(null)
                                                                setDragOverContactIndex(null)
                                                            }}
                                                        >
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
                                                                onMouseDown={(e) => e.stopPropagation()}
                                                                className="h-8 w-8 p-0"
                                                            >
                                                                <Edit className="h-4 w-4" />
                                                            </Button>
                                                            <Button
                                                                variant="ghost"
                                                                size="sm"
                                                                onClick={() => handleDeleteContact(contact.id)}
                                                                onMouseDown={(e) => e.stopPropagation()}
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
                                                                            className={`text-muted-foreground transition-all ${!expandedContactNotes[contact.id]
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
                        <EmptyState
                            icon={Users}
                            title="Aucun contact"
                            description="Cette agence n'a pas encore de contact enregistré."
                            action={
                                editing ? (
                                    <Button onClick={handleAddContact} size="sm">
                                        <Plus className="mr-2 h-4 w-4" />
                                        Ajouter un contact
                                    </Button>
                                ) : null
                            }
                        />
                    )}
                </CardContent>
            </Card>

            {/* Dialog Contact */}
            <Dialog open={isContactDialogOpen} onOpenChange={setIsContactDialogOpen}>
                <DialogContent className="max-w-[425px]">
                    <DialogHeader>
                        <DialogTitle>
                            {selectedContact ? "Modifier un contact" : "Ajouter un contact"}
                        </DialogTitle>
                        <DialogDescription>
                            {selectedContact
                                ? "Modifiez les informations du contact"
                                : "Remplissez les informations du nouveau contact"}
                        </DialogDescription>
                    </DialogHeader>
                    <div className="grid gap-4 py-4 max-h-[60vh] overflow-y-auto">
                        <div className="grid gap-2">
                            <Label>Nom du contact *</Label>
                            <Input
                                value={contactManagerName}
                                onChange={(e) => setContactManagerName(e.target.value)}
                                placeholder="Ex: Jean Dupont"
                            />
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                            <div className="grid gap-2">
                                <Label>Numéro de poste</Label>
                                <Input
                                    value={contactPostNumber}
                                    onChange={(e) => setContactPostNumber(e.target.value)}
                                />
                            </div>
                            <div className="grid gap-2">
                                <Label>Numéro d'agent</Label>
                                <Input
                                    value={contactAgentNumber}
                                    onChange={(e) => setContactAgentNumber(e.target.value)}
                                />
                            </div>
                        </div>
                        <div className="grid gap-2">
                            <Label>Ligne directe</Label>
                            <Input
                                value={contactDirectLine}
                                onChange={(e) => setContactDirectLine(e.target.value)}
                            />
                        </div>
                        <div className="grid gap-2">
                            <Label>Emails</Label>
                            <div className="flex gap-2 mb-2">
                                <Input
                                    type="email"
                                    value={contactEmailInput}
                                    onChange={(e) => setContactEmailInput(e.target.value)}
                                    onKeyDown={(e) => {
                                        if (e.key === "Enter") {
                                            e.preventDefault()
                                            handleAddEmail()
                                        }
                                    }}
                                    placeholder="email@exemple.com"
                                />
                                <Button type="button" onClick={handleAddEmail} variant="secondary">
                                    Ajouter
                                </Button>
                            </div>
                            {contactEmails.length > 0 && (
                                <div className="flex flex-wrap gap-2 mt-2">
                                    {contactEmails.map((email, i) => (
                                        <span
                                            key={i}
                                            className="inline-flex items-center gap-1 px-2 py-1 rounded-md bg-secondary text-secondary-foreground text-sm"
                                        >
                                            {email}
                                            <button
                                                type="button"
                                                onClick={() => handleRemoveEmail(email)}
                                                className="text-muted-foreground hover:text-foreground ml-1"
                                            >
                                                <Trash2 className="h-3 w-3" />
                                            </button>
                                        </span>
                                    ))}
                                </div>
                            )}
                        </div>
                        <div className="grid gap-2">
                            <Label>Note</Label>
                            <Textarea
                                value={contactNote}
                                onChange={(e) => setContactNote(e.target.value)}
                                rows={3}
                            />
                        </div>
                    </div>
                    <DialogFooter>
                        <Button variant="outline" onClick={() => setIsContactDialogOpen(false)}>
                            Annuler
                        </Button>
                        <Button onClick={handleSaveContact}>
                            Enregistrer
                        </Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>

            {/* Dialog de confirmation intégré */}
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
