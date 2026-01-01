"use client"

import { useState, useEffect } from "react"
import { CheckCircle2, Info, AlertTriangle, XCircle } from "lucide-react"

interface AgencyStats {
  ok: number
  info: number
  alerte: number
  fermee: number
}

export function AgencyStats() {
  const [stats, setStats] = useState<AgencyStats>({ ok: 0, info: 0, alerte: 0, fermee: 0 })
  const [loading, setLoading] = useState(true)
  const [displayStats, setDisplayStats] = useState<AgencyStats>({ ok: 0, info: 0, alerte: 0, fermee: 0 })
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  useEffect(() => {
    if (!mounted) return

    const fetchStats = async () => {
      try {
        const response = await fetch("/api/agencies", {
          credentials: 'include'
        })
        if (response.ok) {
          const agencies = await response.json()
          const counts = {
            ok: agencies.filter((a: any) => a.state === "OK").length,
            info: agencies.filter((a: any) => a.state === "INFO").length,
            alerte: agencies.filter((a: any) => a.state === "ALERTE").length,
            fermee: agencies.filter((a: any) => a.state === "FERMÉE").length,
          }
          setStats(counts)
        }
      } catch (error) {
        console.error("Error fetching agency stats:", error)
      } finally {
        setLoading(false)
      }
    }

    // Chargement initial
    fetchStats()

    // Écouter les événements personnalisés pour rafraîchir les stats
    const handleRefresh = () => {
      fetchStats()
    }
    
    window.addEventListener('agencyStatsRefresh', handleRefresh)

    return () => {
      window.removeEventListener('agencyStatsRefresh', handleRefresh)
    }
  }, [mounted])

  // Animation des nombres avec transition
  useEffect(() => {
    if (!mounted) return
    const timer = setTimeout(() => {
      setDisplayStats(stats)
    }, 100)
    return () => clearTimeout(timer)
  }, [stats, mounted])

  // Éviter l'erreur d'hydratation en retournant un contenu cohérent
  // Toujours retourner la même structure pour éviter les différences serveur/client
  if (!mounted) {
    return (
      <div className="flex items-center gap-3 sm:gap-6" suppressHydrationWarning>
        <div className="flex items-center gap-2">
          <CheckCircle2 className="h-4 w-4 sm:h-5 sm:w-5 text-green-600 dark:text-green-400" />
          <span className="text-sm sm:text-base font-medium">
            <span className="font-bold text-green-600 dark:text-green-400">0</span>
            <span className="hidden sm:inline ml-1">OK</span>
          </span>
        </div>
        <div className="flex items-center gap-2">
          <Info className="h-4 w-4 sm:h-5 sm:w-5 text-yellow-600 dark:text-yellow-400" />
          <span className="text-sm sm:text-base font-medium">
            <span className="font-bold text-yellow-600 dark:text-yellow-400">0</span>
            <span className="hidden sm:inline ml-1">INFO</span>
          </span>
        </div>
        <div className="flex items-center gap-2">
          <AlertTriangle className="h-4 w-4 sm:h-5 sm:w-5 text-red-600 dark:text-red-400" />
          <span className="text-sm sm:text-base font-medium">
            <span className="font-bold text-red-600 dark:text-red-400">0</span>
            <span className="hidden sm:inline ml-1">ALERTE</span>
          </span>
        </div>
        <div className="flex items-center gap-2">
          <XCircle className="h-4 w-4 sm:h-5 sm:w-5 text-gray-600 dark:text-gray-400" />
          <span className="text-sm sm:text-base font-medium">
            <span className="font-bold text-gray-600 dark:text-gray-400">0</span>
            <span className="hidden sm:inline ml-1">FERMÉE</span>
          </span>
        </div>
      </div>
    )
  }

  if (loading) {
    return (
      <div className="flex items-center gap-3 sm:gap-6">
        <div className="flex items-center gap-2">
          <CheckCircle2 className="h-4 w-4 sm:h-5 sm:w-5 text-green-600 dark:text-green-400" />
          <span className="text-sm sm:text-base font-medium">
            <span className="font-bold text-green-600 dark:text-green-400">0</span>
            <span className="hidden sm:inline ml-1">OK</span>
          </span>
        </div>
        <div className="flex items-center gap-2">
          <Info className="h-4 w-4 sm:h-5 sm:w-5 text-yellow-600 dark:text-yellow-400" />
          <span className="text-sm sm:text-base font-medium">
            <span className="font-bold text-yellow-600 dark:text-yellow-400">0</span>
            <span className="hidden sm:inline ml-1">INFO</span>
          </span>
        </div>
        <div className="flex items-center gap-2">
          <AlertTriangle className="h-4 w-4 sm:h-5 sm:w-5 text-red-600 dark:text-red-400" />
          <span className="text-sm sm:text-base font-medium">
            <span className="font-bold text-red-600 dark:text-red-400">0</span>
            <span className="hidden sm:inline ml-1">ALERTE</span>
          </span>
        </div>
        <div className="flex items-center gap-2">
          <XCircle className="h-4 w-4 sm:h-5 sm:w-5 text-gray-600 dark:text-gray-400" />
          <span className="text-sm sm:text-base font-medium">
            <span className="font-bold text-gray-600 dark:text-gray-400">0</span>
            <span className="hidden sm:inline ml-1">FERMÉE</span>
          </span>
        </div>
      </div>
    )
  }

  return (
    <div className="flex items-center gap-3 sm:gap-6">
      <div className="flex items-center gap-2 agency-stat-item" style={{ animationDelay: '0ms' }}>
        <CheckCircle2 className="h-4 w-4 sm:h-5 sm:w-5 text-green-600 dark:text-green-400" />
        <span className="text-sm sm:text-base font-medium">
          <span className="font-bold text-green-600 dark:text-green-400 transition-all duration-300 inline-block">
            {displayStats.ok}
          </span>
          <span className="hidden sm:inline ml-1">OK</span>
        </span>
      </div>
      <div className="flex items-center gap-2 agency-stat-item" style={{ animationDelay: '150ms' }}>
        <Info className="h-4 w-4 sm:h-5 sm:w-5 text-yellow-600 dark:text-yellow-400" />
        <span className="text-sm sm:text-base font-medium">
          <span className="font-bold text-yellow-600 dark:text-yellow-400 transition-all duration-300 inline-block">
            {displayStats.info}
          </span>
          <span className="hidden sm:inline ml-1">INFO</span>
        </span>
      </div>
      <div className="flex items-center gap-2 agency-stat-item" style={{ animationDelay: '300ms' }}>
        <AlertTriangle className="h-4 w-4 sm:h-5 sm:w-5 text-red-600 dark:text-red-400" />
        <span className="text-sm sm:text-base font-medium">
          <span className="font-bold text-red-600 dark:text-red-400 transition-all duration-300 inline-block">
            {displayStats.alerte}
          </span>
          <span className="hidden sm:inline ml-1">ALERTE</span>
        </span>
      </div>
      <div className="flex items-center gap-2 agency-stat-item" style={{ animationDelay: '450ms' }}>
        <XCircle className="h-4 w-4 sm:h-5 sm:w-5 text-gray-600 dark:text-gray-400" />
        <span className="text-sm sm:text-base font-medium">
          <span className="font-bold text-gray-600 dark:text-gray-400 transition-all duration-300 inline-block">
            {displayStats.fermee}
          </span>
          <span className="hidden sm:inline ml-1">FERMÉE</span>
        </span>
      </div>
    </div>
  )
}

