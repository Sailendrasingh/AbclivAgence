"use client"

import { useEffect } from "react"
import { useRouter } from "next/navigation"

export default function SauvegardesPage() {
  const router = useRouter()
  
  useEffect(() => {
    router.replace("/dashboard/parametres?tab=sauvegardes")
  }, [router])
  
  return null
  const [backups, setBackups] = useState<Backup[]>([])
  const [loading, setLoading] = useState(true)
  const [creating, setCreating] = useState(false)
  const [restoring, setRestoring] = useState(false)
  const [restoreDialogOpen, setRestoreDialogOpen] = useState(false)
  const [selectedBackup, setSelectedBackup] = useState<Backup | null>(null)
  const [purgeDialogOpen, setPurgeDialogOpen] = useState(false)
  const [purgeConfirmText, setPurgeConfirmText] = useState("")
  const [purging, setPurging] = useState(false)

  useEffect(() => {
    loadBackups()
  }, [])

  const loadBackups = async () => {
    setLoading(true)
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
      setLoading(false)
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
        // Attendre un peu pour que le fichier soit bien écrit
        await new Promise(resolve => setTimeout(resolve, 500))
        // Recharger la liste des sauvegardes
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
        // Recharger la page après restauration
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

  return (
    <DashboardLayout>
      <div className="p-3 sm:p-6">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 sm:gap-0 mb-4 sm:mb-6">
          <h1 className="text-xl sm:text-2xl font-bold">Sauvegardes</h1>
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

        {loading ? (
          <div>Chargement...</div>
        ) : backups.length === 0 ? (
          <Card>
            <CardContent className="pt-6">
              <div className="text-center text-muted-foreground">
                <HardDrive className="h-12 w-12 mx-auto mb-4 opacity-50" />
                <p>Aucune sauvegarde disponible</p>
                <p className="text-sm mt-2">
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
                          <div className="font-medium truncate text-sm sm:text-base">{backup.filename}</div>
                          <div className="text-xs sm:text-sm text-muted-foreground flex flex-wrap gap-1 sm:gap-0">
                            <span>{new Date(backup.date).toLocaleString("fr-FR", {
                              day: "2-digit",
                              month: "2-digit",
                              year: "numeric",
                              hour: "2-digit",
                              minute: "2-digit",
                            })}</span>
                            <span className="hidden sm:inline"> • </span>
                            <span>{backup.sizeFormatted}</span>
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
                <p>
                  • Les sauvegardes sont créées automatiquement quotidiennement
                </p>
                <p>
                  • Les sauvegardes de plus de 10 jours sont automatiquement supprimées
                </p>
                <p>
                  • La restauration remplace complètement la base de données actuelle
                </p>
                <p>
                  • Une sauvegarde de la base actuelle est créée avant chaque restauration
                </p>
              </CardContent>
            </Card>
          </div>
        )}

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
      </div>
    </DashboardLayout>
  )
}

