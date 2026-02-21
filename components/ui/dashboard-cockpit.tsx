"use client"

import React, { useEffect, useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Clock, AlertTriangle, ArrowRight, Building, CheckSquare } from "lucide-react"

interface DashboardSummary {
    recentAgencies: {
        id: string
        name: string
        state: string
        updatedAt: string
    }[]
    urgentTasks: {
        id: string
        title: string
        createdAt: string
        importance: string
        agency: { id: string; name: string }
        creator: { login: string }
    }[]
}

export function DashboardCockpit({
    userRole,
    onSelectAgencyId,
}: {
    userRole: string | null
    onSelectAgencyId: (id: string) => void
}) {
    const [data, setData] = useState<DashboardSummary | null>(null)
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        const fetchSummary = async () => {
            try {
                const response = await fetch("/api/dashboard/summary")
                if (response.ok) {
                    setData(await response.json())
                }
            } catch (error) {
                console.error("Erreur lors du chargement du résumé:", error)
            } finally {
                setLoading(false)
            }
        }
        fetchSummary()
    }, [])

    if (loading) {
        return (
            <div className="flex-1 flex flex-col p-6 space-y-6 bg-slate-50 dark:bg-background">
                <div className="h-8 w-64 bg-muted animate-pulse rounded-md" />
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl">
                    <div className="h-64 bg-muted animate-pulse rounded-xl" />
                    <div className="h-64 bg-muted animate-pulse rounded-xl" />
                </div>
            </div>
        )
    }

    return (
        <div className="flex-1 overflow-y-auto p-4 sm:p-6 bg-slate-50 dark:bg-background h-full">
            <div className="max-w-4xl mx-auto space-y-6">
                <div>
                    <h2 className="text-2xl font-bold tracking-tight">Tableau de bord</h2>
                    <p className="text-muted-foreground mt-1">
                        Recherchez ou sélectionnez une agence dans le menu, ou reprenez votre activité récente.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* Agences récentes */}
                    <Card className="shadow-sm">
                        <CardHeader className="pb-3 flex flex-row items-center space-x-2">
                            <Clock className="w-5 h-5 text-blue-500" />
                            <CardTitle className="text-lg">Dernières agences modifiées</CardTitle>
                        </CardHeader>
                        <CardContent>
                            {!data || data.recentAgencies.length === 0 ? (
                                <div className="text-center py-6 text-muted-foreground text-sm">
                                    Aucune agence récente.
                                </div>
                            ) : (
                                <div className="space-y-3">
                                    {data.recentAgencies.map((agency) => (
                                        <div
                                            key={agency.id}
                                            onClick={() => onSelectAgencyId(agency.id)}
                                            className="group flex items-center justify-between p-3 rounded-lg border bg-card hover:bg-accent/50 cursor-pointer transition-colors shadow-sm"
                                        >
                                            <div className="flex items-center space-x-3 overflow-hidden">
                                                <div className="p-2 rounded-full bg-blue-100 dark:bg-blue-900/40 text-blue-600 dark:text-blue-400 shrink-0">
                                                    <Building className="w-4 h-4" />
                                                </div>
                                                <div className="min-w-0">
                                                    <p className="text-sm font-medium truncate">{agency.name}</p>
                                                    <p className="text-xs text-muted-foreground truncate">
                                                        Modifié le {new Date(agency.updatedAt).toLocaleDateString("fr-FR")} à {new Date(agency.updatedAt).toLocaleTimeString("fr-FR", { hour: "2-digit", minute: "2-digit" })}
                                                    </p>
                                                </div>
                                            </div>
                                            <ArrowRight className="w-4 h-4 text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity shrink-0" />
                                        </div>
                                    ))}
                                </div>
                            )}
                        </CardContent>
                    </Card>

                    {/* Tâches urgentes */}
                    <Card className="shadow-sm">
                        <CardHeader className="pb-3 flex flex-row items-center space-x-2">
                            <AlertTriangle className="w-5 h-5 text-amber-500" />
                            <CardTitle className="text-lg">Tâches urgentes</CardTitle>
                        </CardHeader>
                        <CardContent>
                            {!data || data.urgentTasks.length === 0 ? (
                                <div className="text-center py-6 text-muted-foreground text-sm">
                                    Aucune tâche urgente ou critique en cours. 🎉
                                </div>
                            ) : (
                                <div className="space-y-3">
                                    {data.urgentTasks.map((task) => (
                                        <div
                                            key={task.id}
                                            onClick={() => onSelectAgencyId(task.agency.id)}
                                            className="group flex items-center justify-between p-3 rounded-lg border bg-card hover:bg-accent/50 cursor-pointer transition-colors shadow-sm"
                                        >
                                            <div className="flex items-center space-x-3 overflow-hidden">
                                                <div className={`p-2 rounded-full shrink-0 ${task.importance === 'CRITIQUE' ? 'bg-red-100 text-red-600 dark:bg-red-900/40 dark:text-red-400' : 'bg-amber-100 text-amber-600 dark:bg-amber-900/40 dark:text-amber-400'}`}>
                                                    <CheckSquare className="w-4 h-4" />
                                                </div>
                                                <div className="min-w-0">
                                                    <p className={`text-sm font-medium truncate ${task.importance === 'CRITIQUE' ? 'text-red-600 dark:text-red-400' : 'text-amber-600 dark:text-amber-400'}`}>
                                                        {task.title}
                                                    </p>
                                                    <p className="text-xs text-muted-foreground truncate">
                                                        {task.agency.name} • Par {task.creator.login}
                                                    </p>
                                                </div>
                                            </div>
                                            <ArrowRight className="w-4 h-4 text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity shrink-0" />
                                        </div>
                                    ))}
                                </div>
                            )}
                        </CardContent>
                    </Card>
                </div>
            </div>
        </div>
    )
}
