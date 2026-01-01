"use client"

import { useState, useEffect } from "react"
import { SessionTimeout } from "./session-timeout"

export function SessionTimeoutWrapper() {
  const [timeoutMinutes, setTimeoutMinutes] = useState(60) // Défaut: 1 minute
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchTimeout = async () => {
      try {
        const response = await fetch("/api/settings", {
          credentials: 'include'
        })
        if (response.ok) {
          const data = await response.json()
          setTimeoutMinutes(data.sessionTimeout || 60)
        } else {
          console.error("Error fetching session timeout:", response.status, response.statusText)
          // Utiliser la valeur par défaut en cas d'erreur
          setTimeoutMinutes(60)
        }
      } catch (error) {
        console.error("Error fetching session timeout:", error)
        // Utiliser la valeur par défaut en cas d'erreur
        setTimeoutMinutes(60)
      } finally {
        setLoading(false)
      }
    }

    fetchTimeout()
  }, [])

  // Ne pas afficher le composant tant que la durée n'est pas chargée
  if (loading) {
    return null
  }

  return <SessionTimeout timeoutMinutes={timeoutMinutes} />
}

