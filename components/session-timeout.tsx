"use client"

import { useEffect, useRef, useState } from "react"
import { useRouter } from "next/navigation"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { AlertTriangle } from "lucide-react"

interface SessionTimeoutProps {
  timeoutMinutes: number
}

export function SessionTimeout({ timeoutMinutes }: SessionTimeoutProps) {
  const router = useRouter()
  const timeoutRef = useRef<NodeJS.Timeout | null>(null)
  const alertTimeoutRef = useRef<NodeJS.Timeout | null>(null)
  const countdownRef = useRef<NodeJS.Timeout | null>(null)
  const lastActivityRef = useRef<number>(Date.now())
  const [showAlert, setShowAlert] = useState(false)
  const [countdown, setCountdown] = useState(30)

  useEffect(() => {
    // Convertir les minutes en millisecondes
    const timeoutMs = timeoutMinutes * 60 * 1000
    const alertBeforeMs = 30 * 1000 // 30 secondes avant expiration

    const resetTimeout = () => {
      lastActivityRef.current = Date.now()
      
      // Réinitialiser les timers
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current)
      }
      if (alertTimeoutRef.current) {
        clearTimeout(alertTimeoutRef.current)
      }
      if (countdownRef.current) {
        clearInterval(countdownRef.current)
      }

      // Fermer l'alerte si elle est ouverte
      setShowAlert(false)
      setCountdown(30)

      // Timer pour afficher l'alerte 30 secondes avant expiration
      const alertTime = Math.max(0, timeoutMs - alertBeforeMs)
      if (alertTime > 0) {
        alertTimeoutRef.current = setTimeout(() => {
          setShowAlert(true)
          setCountdown(30)

          // Compte à rebours
          countdownRef.current = setInterval(() => {
            setCountdown((prev) => {
              if (prev <= 1) {
                clearInterval(countdownRef.current!)
                return 0
              }
              return prev - 1
            })
          }, 1000)
        }, alertTime)
      }

      // Timer pour déconnecter l'utilisateur après expiration
      timeoutRef.current = setTimeout(() => {
        // Fermer l'alerte si elle est ouverte
        setShowAlert(false)
        if (countdownRef.current) {
          clearInterval(countdownRef.current)
        }
        
        // Déconnecter l'utilisateur après expiration du timeout d'inactivité
        fetch("/api/auth/logout", { method: "POST" })
          .then(() => {
            router.push("/login")
            router.refresh()
          })
          .catch((error) => {
            console.error("Error during logout:", error)
            // Forcer la redirection même en cas d'erreur
            router.push("/login")
          })
      }, timeoutMs)
    }

    // Événements qui indiquent une activité utilisateur
    const events = ["mousedown", "mousemove", "keypress", "scroll", "touchstart", "click"]
    
    const handleActivity = () => {
      resetTimeout()
    }

    // Ajouter les écouteurs d'événements
    events.forEach((event) => {
      document.addEventListener(event, handleActivity, true)
    })

    // Initialiser le timer
    resetTimeout()

    // Nettoyage
    return () => {
      events.forEach((event) => {
        document.removeEventListener(event, handleActivity, true)
      })
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current)
      }
      if (alertTimeoutRef.current) {
        clearTimeout(alertTimeoutRef.current)
      }
      if (countdownRef.current) {
        clearInterval(countdownRef.current)
      }
    }
  }, [timeoutMinutes, router])

  const handleExtendSession = () => {
    // Réinitialiser le timeout en simulant une activité
    const events = ["mousedown", "mousemove", "keypress", "scroll", "touchstart", "click"]
    events.forEach((event) => {
      const syntheticEvent = new Event(event, { bubbles: true })
      document.dispatchEvent(syntheticEvent)
    })
  }

  return (
    <Dialog open={showAlert} onOpenChange={(open) => {
      if (!open) {
        // Si l'utilisateur ferme le dialog, on prolonge la session
        handleExtendSession()
      }
    }}>
      <DialogContent className="sm:max-w-md" onEscapeKeyDown={(e) => {
        e.preventDefault()
        handleExtendSession()
      }} onPointerDownOutside={(e) => {
        e.preventDefault()
        handleExtendSession()
      }}>
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <AlertTriangle className="h-5 w-5 text-orange-500" />
            Session sur le point d'expirer
          </DialogTitle>
          <DialogDescription>
            Votre session va expirer dans <strong>{countdown} seconde{countdown > 1 ? 's' : ''}</strong> en raison de l'inactivité.
          </DialogDescription>
        </DialogHeader>
        <div className="py-4">
          <p className="text-sm text-muted-foreground">
            Cliquez sur "Prolonger la session" pour continuer à travailler, ou vous serez automatiquement déconnecté.
          </p>
        </div>
        <DialogFooter>
          <Button onClick={handleExtendSession} className="w-full">
            Prolonger la session
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}

