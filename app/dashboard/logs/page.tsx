"use client"

import { useEffect } from "react"
import { useRouter } from "next/navigation"

export default function LogsPage() {
  const router = useRouter()
  
  useEffect(() => {
    router.replace("/dashboard/parametres?tab=logs")
  }, [router])
  
  return null
  const [logs, setLogs] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [purgeDialogOpen, setPurgeDialogOpen] = useState(false)
  const [purgeConfirmText, setPurgeConfirmText] = useState("")
  const [purging, setPurging] = useState(false)

  useEffect(() => {
    loadLogs()
  }, [])

  const loadLogs = async () => {
    setLoading(true)
    try {
      const response = await fetch("/api/logs")
      const data = await response.json()
      setLogs(data)
    } catch (error) {
      console.error("Error loading logs:", error)
    } finally {
      setLoading(false)
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

  const handlePurgeAll = async () => {
    if (purgeConfirmText !== "PURGER") {
      alert('Veuillez saisir "PURGER" pour confirmer')
      return
    }

    setPurging(true)
    try {
      const response = await fetch("/api/logs", {
        method: "DELETE",
      })

      if (response.ok) {
        const result = await response.json()
        alert(result.message || `${result.deletedCount} log(s) supprimé(s)`)
        setPurgeDialogOpen(false)
        setPurgeConfirmText("")
        await loadLogs()
      } else {
        const error = await response.json()
        alert(error.error || "Erreur lors de la purge des logs")
      }
    } catch (error) {
      console.error("Error purging logs:", error)
      alert("Erreur lors de la purge des logs")
    } finally {
      setPurging(false)
    }
  }

  return (
    <DashboardLayout>
      <div className="p-3 sm:p-6">
        <h1 className="text-xl sm:text-2xl font-bold mb-3">Logs</h1>
        <div className="mb-4 sm:mb-6 space-y-2 md:space-y-0 md:flex md:flex-row md:gap-2 md:items-center">
          {logs.length > 0 && (
            <Button
              variant="destructive"
              onClick={() => setPurgeDialogOpen(true)}
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
        {loading ? (
          <div>Chargement...</div>
        ) : (
          <div className="space-y-2">
            {logs.map((log) => (
              <div key={log.id} className="border p-4 rounded">
                <div className="font-semibold">{log.action}</div>
                <div className="text-sm text-muted-foreground">
                  {new Date(log.createdAt).toLocaleString("fr-FR")} - {log.user?.login || "Anonyme"}
                </div>
                {log.details && (
                  <div className="text-sm mt-2">{log.details}</div>
                )}
              </div>
            ))}
          </div>
        )}

        {/* Dialog de confirmation de purge */}
        <Dialog open={purgeDialogOpen} onOpenChange={setPurgeDialogOpen}>
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
                {purging ? "Suppression..." : "Purger tous les logs"}
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
    </DashboardLayout>
  )
}

