"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { apiFetch } from "@/lib/api-client"
import { 
  AlertTriangle, 
  Shield, 
  Users, 
  Activity, 
  CheckCircle2,
  XCircle,
  Clock,
  TrendingUp
} from "lucide-react"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"

interface Alert {
  id: string
  type: string
  severity: "low" | "medium" | "high" | "critical"
  title: string
  message: string
  details: any
  userId: string | null
  ipAddress: string | null
  createdAt: string
}

interface MonitoringStats {
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
}

export default function MonitoringPage() {
  const [alerts, setAlerts] = useState<Alert[]>([])
  const [stats, setStats] = useState<MonitoringStats | null>(null)
  const [loading, setLoading] = useState(true)
  const [selectedAlert, setSelectedAlert] = useState<Alert | null>(null)
  const [resolveDialogOpen, setResolveDialogOpen] = useState(false)

  const loadData = async () => {
    setLoading(true)
    try {
      // Charger les alertes avec les statistiques
      const alertsResponse = await apiFetch("/api/alerts?limit=50&stats=true")
      if (alertsResponse.ok) {
        const data = await alertsResponse.json()
        setAlerts(data.alerts || [])
        if (data.stats) {
          // Charger les stats complètes
          const statsResponse = await apiFetch("/api/monitoring/stats")
          if (statsResponse.ok) {
            const statsData = await statsResponse.json()
            setStats(statsData)
          }
        }
      }

      // Charger les statistiques si pas déjà chargées
      if (!stats) {
        const statsResponse = await apiFetch("/api/monitoring/stats")
        if (statsResponse.ok) {
          const statsData = await statsResponse.json()
          setStats(statsData)
        }
      }
    } catch (error) {
      console.error("Error loading monitoring data:", error)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    loadData()
    // Rafraîchir toutes les 30 secondes
    const interval = setInterval(loadData, 30000)
    return () => clearInterval(interval)
  }, [])

  const handleResolveAlert = async () => {
    if (!selectedAlert) return

    try {
      const response = await apiFetch(`/api/alerts/${selectedAlert.id}/resolve`, {
        method: "POST",
      })

      if (response.ok) {
        setResolveDialogOpen(false)
        setSelectedAlert(null)
        await loadData()
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

  if (loading) {
    return (
      <div className="p-6">
        <div className="text-center">Chargement...</div>
      </div>
    )
  }

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold">Monitoring de Sécurité</h1>
        <Button onClick={loadData} variant="outline">
          <Activity className="h-4 w-4 mr-2" />
          Actualiser
        </Button>
      </div>

      {/* Statistiques */}
      {stats && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Alertes Non Résolues</CardTitle>
              <AlertTriangle className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.alerts.unresolved}</div>
              <div className="flex gap-2 mt-2">
                <Badge variant="destructive">{stats.alerts.critical} critiques</Badge>
                <Badge className="bg-orange-500">{stats.alerts.high} élevées</Badge>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Tentatives Échouées (24h)</CardTitle>
              <Shield className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.logs.failedLogins}</div>
              <p className="text-xs text-muted-foreground mt-1">
                {stats.logs.last24Hours} logs au total
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Utilisateurs Actifs</CardTitle>
              <Users className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.users.active}</div>
              <p className="text-xs text-muted-foreground mt-1">
                {stats.users.locked} verrouillés
                {stats.users.inactive !== undefined && stats.users.inactive > 0 && (
                  <span className="ml-2">• {stats.users.inactive} désactivés</span>
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
              <div className="text-2xl font-bold">{stats.sessions.active}</div>
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
          {alerts.length === 0 ? (
            <div className="text-center py-8 text-muted-foreground">
              <CheckCircle2 className="h-12 w-12 mx-auto mb-4 text-green-500" />
              <p>Aucune alerte non résolue</p>
            </div>
          ) : (
            <div className="space-y-4">
              {alerts.map((alert) => (
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
  )
}

