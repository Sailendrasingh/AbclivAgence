"use client"

import { useEffect, useRef } from "react"
import { useRouter } from "next/navigation"

interface SessionTimeoutProps {
  timeoutMinutes: number
}

export function SessionTimeout({ timeoutMinutes }: SessionTimeoutProps) {
  const router = useRouter()
  const timeoutRef = useRef<NodeJS.Timeout | null>(null)
  const lastActivityRef = useRef<number>(Date.now())

  useEffect(() => {
    // Convertir les minutes en millisecondes
    const timeoutMs = timeoutMinutes * 60 * 1000

    const resetTimeout = () => {
      lastActivityRef.current = Date.now()
      
      // Réinitialiser le timer
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current)
      }

      timeoutRef.current = setTimeout(() => {
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
    }
  }, [timeoutMinutes, router])

  return null
}

