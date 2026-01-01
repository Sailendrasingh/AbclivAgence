"use client"

import { useState, useEffect } from "react"
import { DashboardLayout } from "@/components/layout/dashboard-layout"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Save } from "lucide-react"

export default function ParametresPage() {
  const [sessionTimeout, setSessionTimeout] = useState(60) // En minutes, défaut 1 minute
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [userRole, setUserRole] = useState<string | null>(null)

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await fetch("/api/auth/me")
        if (response.ok) {
          const data = await response.json()
          setUserRole(data.role)
        }
      } catch (error) {
        console.error("Error fetching user data:", error)
      }
    }

    fetchUserData()
  }, [])

  useEffect(() => {
    const loadSettings = async () => {
      try {
        const response = await fetch("/api/settings")
        if (response.ok) {
          const data = await response.json()
          setSessionTimeout(data.sessionTimeout || 60)
        }
      } catch (error) {
        console.error("Error loading settings:", error)
      } finally {
        setLoading(false)
      }
    }

    loadSettings()
  }, [])

  const handleSave = async () => {
    if (sessionTimeout < 1) {
      alert("La durée de session doit être d'au moins 1 minute")
      return
    }

    setSaving(true)
    try {
      const response = await fetch("/api/settings", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          sessionTimeout: Number(sessionTimeout), // S'assurer que c'est un nombre
        }),
      })

      const data = await response.json()

      if (response.ok) {
        alert("Paramètres enregistrés avec succès")
      } else {
        console.error("Error response:", data)
        alert(data.error || "Erreur lors de l'enregistrement")
      }
    } catch (error) {
      console.error("Error saving settings:", error)
      alert(`Erreur lors de l'enregistrement des paramètres: ${error instanceof Error ? error.message : "Erreur inconnue"}`)
    } finally {
      setSaving(false)
    }
  }

  // Vérifier que l'utilisateur est Super Admin
  if (userRole !== "Super Admin") {
    return (
      <DashboardLayout>
        <div className="p-6">
          <Card>
            <CardContent className="pt-6">
              <div className="text-center text-muted-foreground">
                <p>Accès refusé. Cette page est réservée aux Super Admin.</p>
              </div>
            </CardContent>
          </Card>
        </div>
      </DashboardLayout>
    )
  }

  return (
    <DashboardLayout>
      <div className="p-3 sm:p-6">
        <div className="flex justify-between items-center mb-4 sm:mb-6">
          <h1 className="text-xl sm:text-2xl font-bold">Paramètres</h1>
        </div>

        {loading ? (
          <div>Chargement...</div>
        ) : (
          <Card>
            <CardHeader>
              <CardTitle>Paramètres de l&apos;application</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="session-timeout">
                  Durée de session (en minutes)
                </Label>
                <Input
                  id="session-timeout"
                  type="number"
                  min="1"
                  value={sessionTimeout}
                  onChange={(e) => setSessionTimeout(parseInt(e.target.value) || 60)}
                  placeholder="60"
                />
                <p className="text-sm text-muted-foreground">
                  Durée d&apos;inactivité avant déconnexion automatique (minimum 1 minute)
                </p>
              </div>
              <Button onClick={handleSave} disabled={saving} className="gap-2">
                <Save className="h-4 w-4" />
                {saving ? "Enregistrement..." : "Enregistrer"}
              </Button>
            </CardContent>
          </Card>
        )}
      </div>
    </DashboardLayout>
  )
}

