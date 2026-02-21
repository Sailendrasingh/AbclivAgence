"use client"

import { useEffect, useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { apiFetch } from "@/lib/api-client"
import { setCSRFToken } from "@/lib/csrf-client"
import { ThemeToggle } from "@/components/ui/theme-toggle"

function IconLock({ className }: { className?: string }) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
      <rect width="18" height="11" x="3" y="11" rx="2" ry="2" />
      <path d="M7 11V7a5 5 0 0 1 10 0v4" />
    </svg>
  )
}

function IconShieldCheck({ className }: { className?: string }) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
      <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10" />
    </svg>
  )
}

function IconLoader2({ className }: { className?: string }) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
      <path d="M21 12a9 9 0 1 1-6.219-8.56" />
    </svg>
  )
}

export default function LoginContent() {
  const [hydrated, setHydrated] = useState(false)
  const [login, setLogin] = useState("")
  const [password, setPassword] = useState("")
  const [twoFactorToken, setTwoFactorToken] = useState("")
  const [needsTwoFactor, setNeedsTwoFactor] = useState(false)
  const [error, setError] = useState("")
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    setHydrated(true)
  }, [])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError("")
    setLoading(true)

    try {
      const response = await apiFetch("/api/auth/login", {
        method: "POST",
        skipCSRF: true,
        body: JSON.stringify({ login, password, twoFactorToken }),
      })

      const data = await response.json()

      if (data.needsTwoFactor) {
        setNeedsTwoFactor(true)
        setLoading(false)
        return
      }

      if (!response.ok) {
        if (data.requiresTwoFactorSetup && data.userId) {
          setError(data.error || "L'authentification à deux facteurs (2FA) est obligatoire pour les Super Admin. Veuillez activer le 2FA depuis votre profil.")
          setLoading(false)
          return
        }
        setError(data.error || `Erreur de connexion (${response.status})`)
        setLoading(false)
        return
      }

      if (data.csrfToken) {
        setCSRFToken(data.csrfToken)
      }

      await new Promise(resolve => setTimeout(resolve, 100))

      if (data.requiresTwoFactorSetup) {
        window.location.href = "/dashboard/setup-2fa"
      } else {
        window.location.href = "/dashboard/agences"
      }
    } catch (err) {
      setError("Erreur de connexion")
    } finally {
      setLoading(false)
    }
  }

  const formContent = hydrated ? (
    <form onSubmit={handleSubmit} className="space-y-5" suppressHydrationWarning>
      <div className="space-y-2" suppressHydrationWarning>
        <Label htmlFor="login" className="text-foreground font-medium">
          Identifiant
        </Label>
        <Input
          id="login"
          type="text"
          value={login}
          onChange={(e) => setLogin(e.target.value)}
          required
          disabled={loading}
          className="h-11 border-border bg-background/50 transition-colors focus:ring-2 focus:ring-primary/20"
          placeholder="Votre identifiant"
          suppressHydrationWarning
        />
      </div>
      <div className="space-y-2" suppressHydrationWarning>
        <Label htmlFor="password" className="text-foreground font-medium">
          Mot de passe
        </Label>
        <Input
          id="password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          disabled={loading}
          className="h-11 border-border bg-background/50 transition-colors focus:ring-2 focus:ring-primary/20"
          placeholder="••••••••"
          suppressHydrationWarning
        />
      </div>
      {needsTwoFactor && (
        <div className="space-y-2 animate-in fade-in slide-in-from-top-2 duration-300" suppressHydrationWarning>
          <Label htmlFor="twoFactorToken" className="text-foreground font-medium flex items-center gap-2">
            <IconShieldCheck className="h-4 w-4 text-primary" />
            Code 2FA
          </Label>
          <Input
            id="twoFactorToken"
            type="text"
            value={twoFactorToken}
            onChange={(e) => setTwoFactorToken(e.target.value)}
            placeholder="000000"
            maxLength={6}
            required
            disabled={loading}
            className="h-11 border-border bg-background/50 text-center text-lg tracking-[0.4em] focus:ring-2 focus:ring-primary/20"
            suppressHydrationWarning
          />
        </div>
      )}
      {error && (
        <div className="rounded-lg bg-destructive/10 border border-destructive/20 px-3 py-2.5 text-sm text-destructive animate-in fade-in duration-200" suppressHydrationWarning>
          {error}
        </div>
      )}
      <Button
        type="submit"
        className="w-full h-11 text-base font-semibold bg-primary hover:bg-primary/90 text-primary-foreground shadow-md hover:shadow-lg transition-all duration-200"
        disabled={loading}
        suppressHydrationWarning
      >
        {loading ? (
          <>
            <IconLoader2 className="mr-2 h-5 w-5 animate-spin" />
            Connexion en cours...
          </>
        ) : (
          <>
            <IconLock className="mr-2 h-4 w-4" />
            Se connecter
          </>
        )}
      </Button>
    </form>
  ) : (
    <div className="space-y-4" suppressHydrationWarning>
      <div className="h-10 bg-muted/40 rounded-lg animate-pulse" />
      <div className="h-10 bg-muted/30 rounded-lg animate-pulse" />
      <div className="h-11 bg-muted/30 rounded-lg animate-pulse" />
    </div>
  )

  return (
    <div className="relative min-h-screen flex flex-col md:flex-row" suppressHydrationWarning>
      <div className="absolute top-4 right-4 z-20">
        <ThemeToggle compact />
      </div>
      <div className="hidden md:flex md:w-1/2 min-h-screen bg-gradient-to-br from-primary/90 via-primary/80 to-primary/70 p-12 flex-col justify-between relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_80%_at_50%_-20%,rgba(255,255,255,0.15),transparent)]" />
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-white/5 rounded-full -translate-x-1/2 translate-y-1/2" />
        <div className="absolute top-1/2 left-0 w-64 h-64 bg-white/5 rounded-full -translate-y-1/2 -translate-x-1/2" />
        <div className="relative z-10">
          <div className="flex flex-col xl:flex-row items-start xl:items-center gap-4 xl:gap-6">
            <div className="w-48 h-48 lg:w-64 lg:h-64 shrink-0 rounded-xl bg-[#000000a8] backdrop-blur flex items-center justify-center overflow-hidden" suppressHydrationWarning>
              <img src="/logo.png" alt="" className="object-contain w-full h-full p-3" suppressHydrationWarning />
            </div>
            <span className="text-4xl lg:text-5xl font-bold text-white leading-tight break-words hyphens-auto">Gestion Agences</span>
          </div>
        </div>
        <div className="relative z-10 space-y-4">
          <h1 className="text-3xl font-bold text-white leading-tight">Bienvenue</h1>
          <p className="text-white/90 text-lg max-w-sm">
            Connectez-vous pour accéder à l'application de gestion des agences.
          </p>
        </div>
        <div className="relative z-10 text-white/60 text-sm">
          Application sécurisée · Authentification 2FA
        </div>
      </div>

      <div className="md:hidden pt-6 pb-2 px-6 text-center bg-gradient-to-b from-primary/20 to-transparent dark:from-primary/10">
        <div className="flex justify-center mb-2">
          <div className="w-48 h-16 shrink-0 rounded-2xl bg-black/10 dark:bg-white/10 flex items-center justify-center overflow-hidden" suppressHydrationWarning>
            <img src="/logo.png" alt="Logo Gestion Agences" className="object-contain w-full h-full p-3" suppressHydrationWarning />
          </div>
        </div>
        <h1 className="text-xl font-bold text-foreground">Gestion Agences</h1>
        <p className="text-muted-foreground text-sm mt-1">Connectez-vous pour continuer</p>
      </div>

      <div className="flex-1 min-h-screen md:min-h-0 flex items-start md:items-center justify-center p-4 md:p-6 bg-muted/30 dark:bg-background">
        <Card className="w-full max-w-md border-border/80 shadow-xl bg-card/95 dark:bg-card backdrop-blur-sm mt-2 md:mt-0">
          <CardHeader className="space-y-1.5 pb-4">
            <div className="flex items-center gap-2 text-primary">
              <IconLock className="h-5 w-5" />
              <CardTitle className="text-2xl">Connexion</CardTitle>
            </div>
            <CardDescription>
              Saisissez vos identifiants pour accéder à votre compte
            </CardDescription>
          </CardHeader>
          <CardContent>
            {formContent}
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
