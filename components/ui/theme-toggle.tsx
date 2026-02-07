"use client"

import { useState, useEffect } from "react"
import { Button } from "./button"
import { Moon, Sun } from "lucide-react"

// Fonction utilitaire pour récupérer le thème stocké avec gestion d'erreurs
const getStoredTheme = (): "light" | "dark" | null => {
  try {
    return localStorage.getItem("theme") as "light" | "dark" | null
  } catch {
    return null
  }
}

// Fonction utilitaire pour sauvegarder le thème avec gestion d'erreurs
const setStoredTheme = (theme: "light" | "dark"): void => {
  try {
    localStorage.setItem("theme", theme)
  } catch {
    // localStorage non disponible, ignorer silencieusement
  }
}

// Fonction pour obtenir le thème système
const getSystemTheme = (): "light" | "dark" => {
  if (typeof window === "undefined") return "light"
  return window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light"
}

export function ThemeToggle({ compact = false }: { compact?: boolean }) {
  const [theme, setTheme] = useState<"light" | "dark">("light")
  const [mounted, setMounted] = useState(false)

  // Initialisation du thème au montage
  useEffect(() => {
    setMounted(true)
    const stored = getStoredTheme()
    const systemTheme = getSystemTheme()
    const initialTheme = stored || systemTheme
    setTheme(initialTheme)
    
    // S'assurer que la classe est appliquée (au cas où le script inline n'aurait pas fonctionné)
    if (initialTheme === "dark") {
      document.documentElement.classList.add("dark")
    } else {
      document.documentElement.classList.remove("dark")
    }
  }, [])

  // Écouter les changements de préférence système (seulement si aucune préférence stockée)
  useEffect(() => {
    const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)")
    
    const handleChange = (e: MediaQueryListEvent | MediaQueryList) => {
      const stored = getStoredTheme()
      // Ne mettre à jour que si l'utilisateur n'a pas de préférence stockée
      if (!stored) {
        const newTheme = e.matches ? "dark" : "light"
        setTheme(newTheme)
        if (newTheme === "dark") {
          document.documentElement.classList.add("dark")
        } else {
          document.documentElement.classList.remove("dark")
        }
      }
    }

    // Écouter les changements
    if (mediaQuery.addEventListener) {
      mediaQuery.addEventListener("change", handleChange)
    } else {
      // Fallback pour les navigateurs plus anciens
      mediaQuery.addListener(handleChange)
    }

    return () => {
      if (mediaQuery.removeEventListener) {
        mediaQuery.removeEventListener("change", handleChange)
      } else {
        mediaQuery.removeListener(handleChange)
      }
    }
  }, [])

  const toggleTheme = () => {
    const newTheme = theme === "light" ? "dark" : "light"
    setTheme(newTheme)
    setStoredTheme(newTheme)
    
    if (newTheme === "dark") {
      document.documentElement.classList.add("dark")
    } else {
      document.documentElement.classList.remove("dark")
    }
  }

  // Éviter le flash pendant l'hydratation - toujours retourner le même contenu initial
  // Le contenu sera mis à jour après l'hydratation via useEffect
  const btnClass = compact
    ? "h-10 w-10 p-0 rounded-full"
    : "w-full justify-start gap-2 text-base min-h-[44px]"

  return (
    <Button 
      variant="ghost" 
      onClick={toggleTheme} 
      aria-label="Basculer le thème"
      className={btnClass}
      suppressHydrationWarning
    >
      {!mounted ? (
        // Contenu par défaut pour éviter les différences d'hydratation
        <>
          <Moon className="h-5 w-5 shrink-0" />
          {!compact && <span>Sombre</span>}
        </>
      ) : theme === "light" ? (
        <>
          <Moon className="h-5 w-5 shrink-0" />
          {!compact && <span>Sombre</span>}
        </>
      ) : (
        <>
          <Sun className="h-5 w-5 shrink-0" />
          {!compact && <span>Clair</span>}
        </>
      )}
    </Button>
  )
}

