"use client"

import React, { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Building2, AlertTriangle, Users, CheckSquare, Clock, ArrowRight, ShieldAlert } from "lucide-react"
import ClientPieChart from "@/components/ui/client-pie-chart"
import ClientBarChart from "@/components/ui/client-bar-chart"

interface DashboardGlobalData {
  error?: string
  globalMetrics: {
    totalAgencies: number
    totalUsers: number | null
    totalTasksOpen: number
    totalAlertsOpen: number | null
  }
  agencyStates: { name: string; value: number }[]
  recentActivity: { date: string; Créées: number; Résolues: number }[]
  urgentTasks: any[]
  recentAlerts: any[]
  recentAgencies: any[]
}

const STATE_COLORS: Record<string, string> = {
  "OK": "#22c55e",
  "INFO": "#3b82f6",
  "ALERTE": "#eab308",
  "FERMÉE": "#64748b"
}

export default function DashboardLanding() {
  const router = useRouter()
  const [data, setData] = useState<DashboardGlobalData | null>(null)
  const [loading, setLoading] = useState(true)
  const [mounted, setMounted] = useState(false)
  const [userRole, setUserRole] = useState<string | null>(null)

  useEffect(() => {
    setMounted(true)

    // 1. Get User Role
    fetch("/api/auth/me")
      .then(res => res.json())
      .then(user => setUserRole(user.role))
      .catch(() => { })

    // 2. Fetch Dashboard Data
    fetch("/api/dashboard/global")
      .then(res => res.json())
      .then(dashboardData => setData(dashboardData))
      .catch(err => console.error(err))
      .finally(() => setLoading(false))
  }, [])

  if (loading) {
    return (
      <div className="flex-1 p-6 space-y-6">
        <h2 className="text-3xl font-bold tracking-tight">Vue d'ensemble</h2>
        <div className="grid gap-6 md:gap-8 md:grid-cols-2 lg:grid-cols-4">
          {[...Array(4)].map((_, i) => (
            <div key={i} className="h-32 bg-muted animate-pulse rounded-xl" />
          ))}
        </div>
        <div className="grid gap-6 md:gap-8 md:grid-cols-2">
          <div className="h-80 bg-muted animate-pulse rounded-xl" />
          <div className="h-80 bg-muted animate-pulse rounded-xl" />
        </div>
      </div>
    )
  }

  if (!data || data.error) {
    return (
      <div className="flex-1 p-6 flex flex-col items-center justify-center gap-4 text-muted-foreground">
        <p>Une erreur est survenue lors du chargement du tableau de bord.</p>
        <Button
          variant="outline"
          onClick={() => {
            setLoading(true)
            fetch("/api/dashboard/global")
              .then((res) => res.json())
              .then((d) => setData(d))
              .catch(() => setData(null))
              .finally(() => setLoading(false))
          }}
        >
          Réessayer
        </Button>
      </div>
    )
  }

  const isAdmin = userRole === "Super Admin"
  const { globalMetrics, agencyStates, recentActivity, urgentTasks, recentAlerts, recentAgencies } = data

  return (
    <div className="flex-1 overflow-y-auto p-6 md:p-8 bg-slate-50 dark:bg-background">
      <div className="max-w-6xl mx-auto flex flex-col" style={{ gap: '2.5rem' }}>
        <div>
          <h2 className="text-3xl font-bold tracking-tight">Vue d'ensemble</h2>
          <p className="text-muted-foreground mt-2">
            Bienvenue sur votre tableau de bord centralisé. Voici l'état actuel de votre parc.
          </p>
        </div>

        {/* KPIs ROW */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4" style={{ gap: '1.5rem' }}>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Agences Totales</CardTitle>
              <Building2 className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{globalMetrics.totalAgencies}</div>
              <p className="text-xs text-muted-foreground mt-1">Équipements et infrastructure gérés</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Tâches Ouvertes</CardTitle>
              <CheckSquare className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{globalMetrics.totalTasksOpen}</div>
              <p className="text-xs text-muted-foreground mt-1">Interventions en cours</p>
            </CardContent>
          </Card>

          {isAdmin && (
            <>
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Utilisateurs Actifs</CardTitle>
                  <Users className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{globalMetrics.totalUsers}</div>
                  <p className="text-xs text-muted-foreground mt-1">Administrateurs et techniciens</p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium text-red-600 dark:text-red-400">Alertes Sécurité</CardTitle>
                  <ShieldAlert className="h-4 w-4 text-red-600 dark:text-red-400" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-red-600 dark:text-red-400">{globalMetrics.totalAlertsOpen || 0}</div>
                  <p className="text-xs text-muted-foreground mt-1">Non résolues à ce jour</p>
                </CardContent>
              </Card>
            </>
          )}
        </div>

        {/* CHARTS ROW */}
        <div className="grid md:grid-cols-2 lg:grid-cols-7" style={{ gap: '1.5rem' }}>
          <Card className="col-span-1 lg:col-span-3">
            <CardHeader className="pb-0">
              <CardTitle>État du Parc</CardTitle>
              <CardDescription>Répartition des agences selon leur statut d'alerte.</CardDescription>
            </CardHeader>
            <CardContent className="w-full flex items-center justify-center p-6 min-h-[300px]">
              {mounted ? <ClientPieChart data={agencyStates} colors={STATE_COLORS} /> : <div className="text-muted-foreground">Chargement des graphiques...</div>}
            </CardContent>
          </Card>

          <Card className="col-span-1 lg:col-span-4">
            <CardHeader className="pb-0">
              <CardTitle>Activité des Tâches</CardTitle>
              <CardDescription>Volume des interventions sur les 7 derniers jours.</CardDescription>
            </CardHeader>
            <CardContent className="w-full flex items-center justify-center p-6 min-h-[300px]">
              {mounted ? <ClientBarChart data={recentActivity} /> : <div className="text-muted-foreground">Chargement des graphiques...</div>}
            </CardContent>
          </Card>
        </div>

        {/* LISTS ROW */}
        <div className="grid md:grid-cols-2" style={{ gap: '1.5rem' }}>
          {/* Tâches Urgentes */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <AlertTriangle className="h-5 w-5 text-amber-500" />
                Tâches Urgentes
              </CardTitle>
              <CardDescription>Les 5 tâches critiques ou urgentes nécessitant une attention.</CardDescription>
            </CardHeader>
            <CardContent>
              {urgentTasks.length === 0 ? (
                <div className="text-sm text-muted-foreground text-center py-4">Aucune tâche urgente.</div>
              ) : (
                <div className="space-y-4">
                  {urgentTasks.map((task) => (
                    <div key={task.id} className="flex items-center justify-between border-b pb-2 last:border-0 last:pb-0">
                      <div>
                        <p className={`text-sm font-medium ${task.importance === 'CRITIQUE' ? 'text-red-500' : 'text-amber-500'}`}>
                          {task.title}
                        </p>
                        <p className="text-xs text-muted-foreground">{task.agency.name} • Créée par {task.creator.login}</p>
                      </div>
                      <button
                        onClick={() => router.push('/dashboard/agences?id=' + task.agency.id)}
                        className="text-primary hover:bg-primary/10 p-2 rounded-full transition-colors"
                      >
                        <ArrowRight className="h-4 w-4" />
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>

          {/* Agences récentes / Feed */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Clock className="h-5 w-5 text-blue-500" />
                Dernières agences modifiées
              </CardTitle>
              <CardDescription>Activité de paramétrage récente sur les infrastructures.</CardDescription>
            </CardHeader>
            <CardContent>
              {recentAgencies.length === 0 ? (
                <div className="text-sm text-muted-foreground text-center py-4">Aucun historique.</div>
              ) : (
                <div className="space-y-4">
                  {recentAgencies.map((agency) => (
                    <div key={agency.id} className="flex items-center justify-between border-b pb-2 last:border-0 last:pb-0">
                      <div>
                        <p className="text-sm font-medium">{agency.name}</p>
                        <p className="text-xs text-muted-foreground">
                          {new Date(agency.updatedAt).toLocaleDateString("fr-FR")} à {new Date(agency.updatedAt).toLocaleTimeString("fr-FR", { hour: "2-digit", minute: "2-digit" })}
                        </p>
                      </div>
                      <button
                        onClick={() => router.push('/dashboard/agences?id=' + agency.id)}
                        className="text-primary hover:bg-primary/10 p-2 rounded-full transition-colors"
                      >
                        <ArrowRight className="h-4 w-4" />
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>

          {/* Admin Alerts Feed */}
          {isAdmin && recentAlerts.length > 0 && (
            <Card className="col-span-1 md:col-span-2 border-red-200 dark:border-red-900/50">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-red-600 dark:text-red-400">
                  <ShieldAlert className="h-5 w-5" />
                  Alertes Sécurité Récents
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {recentAlerts.map(alert => (
                    <div key={alert.id} className="flex items-center justify-between p-3 bg-red-50 dark:bg-red-900/10 text-red-900 dark:text-red-300 shadow-sm border border-red-100 dark:border-red-900/30 rounded-md text-sm">
                      <div className="flex-1">
                        <span className="font-bold mr-2 uppercase text-red-700 dark:text-red-400">[{alert.severity}]</span>
                        <span className="font-medium text-red-900 dark:text-red-300">{alert.title}</span> <span className="hidden sm:inline-block"> : <span className="text-red-800/80 dark:text-red-200/80">{alert.message}</span></span>
                      </div>
                      <span className="text-xs opacity-75">{new Date(alert.createdAt).toLocaleString("fr-FR")}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          )}

        </div>
      </div>
    </div>
  )
}
