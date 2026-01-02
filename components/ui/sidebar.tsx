"use client"

import { useState, useEffect, useMemo, useCallback, Suspense } from "react"
import Link from "next/link"
import Image from "next/image"
import { usePathname, useRouter, useSearchParams } from "next/navigation"
import { Button } from "./button"
import { ThemeToggle } from "./theme-toggle"
import { Menu, X, LogOut, User, Building2, Users, FileText, HardDrive, Settings, ChevronDown, ChevronRight, Sliders } from "lucide-react"
import { cn } from "@/lib/utils"
import type { LucideIcon } from "lucide-react"

interface MenuItem {
  href: string
  label: string
  adminOnly: boolean
  icon: LucideIcon
}

const allMenuItems: MenuItem[] = [
  { href: "/dashboard/agences", label: "Agences", adminOnly: false, icon: Building2 },
  { href: "/dashboard/parametres", label: "Paramètres", adminOnly: true, icon: Settings },
]

function SidebarContent() {
  const [mobileOpen, setMobileOpen] = useState(false)
  const [userRole, setUserRole] = useState<string | null>(null)
  const [userLogin, setUserLogin] = useState<string | null>(null)
  const [parametresOpen, setParametresOpen] = useState(false)
  const pathname = usePathname()
  const router = useRouter()
  const searchParams = useSearchParams()
  
  // Récupérer l'onglet actif depuis l'URL (sans state)
  const currentTab = pathname === "/dashboard/parametres" 
    ? (searchParams.get("tab") || "general")
    : "general"
  
  // Sous-pages de Paramètres (mémorisé)
  const parametresSubPages = useMemo(() => [
    { href: "/dashboard/parametres?tab=general", label: "Général", tab: "general", icon: Sliders },
    { href: "/dashboard/parametres?tab=utilisateurs", label: "Utilisateurs", tab: "utilisateurs", icon: Users },
    { href: "/dashboard/parametres?tab=sauvegardes", label: "Sauvegardes", tab: "sauvegardes", icon: HardDrive },
    { href: "/dashboard/parametres?tab=logs", label: "Logs", tab: "logs", icon: FileText },
  ], [])
  
  // Vérifier si on est sur une page Paramètres pour ouvrir automatiquement le menu
  useEffect(() => {
    if (pathname === "/dashboard/parametres") {
      setParametresOpen((prev) => {
        if (!prev) return true
        return prev
      })
    } else {
      setParametresOpen((prev) => {
        if (prev) return false
        return prev
      })
    }
  }, [pathname])

  // Fetch user data UNE SEULE FOIS au montage
  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await fetch("/api/auth/me", {
          credentials: 'include'
        })
        if (response.ok) {
          const data = await response.json()
          setUserRole(data.role)
          setUserLogin(data.login)
        }
      } catch (error) {
        console.error("Error fetching user data:", error)
      }
    }

    fetchUserData()
  }, []) // Dépendances vides = exécution unique au montage

  const handleLogout = useCallback(async () => {
    await fetch("/api/auth/logout", { method: "POST" })
    router.push("/login")
    router.refresh()
  }, [router])

  // Mémoriser menuItems pour éviter les recalculs
  const menuItems = useMemo(() => 
    allMenuItems.filter(
      (item) => !item.adminOnly || userRole === "Super Admin"
    ),
    [userRole]
  )

  return (
    <>
      {/* Menu Burger Mobile */}
      <div className="lg:hidden fixed top-4 left-4 z-50">
        <Button
          variant="ghost"
          size="icon"
          onClick={() => setMobileOpen(!mobileOpen)}
        >
          {mobileOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </Button>
      </div>

      {/* Overlay Mobile */}
      {mobileOpen && (
        <div
          className="lg:hidden fixed inset-0 bg-black/50 z-40"
          onClick={() => setMobileOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside
        className={cn(
          "w-full h-full z-40 transition-transform duration-300 flex flex-col",
          "lg:relative lg:w-48",
          "lg:after:content-[''] lg:after:absolute lg:after:right-0 lg:after:top-0 lg:after:bottom-0 lg:after:w-px lg:after:bg-border lg:after:z-50",
          mobileOpen ? "translate-x-0 fixed left-0 top-0 h-full" : "-translate-x-full lg:translate-x-0"
        )}
      >
        <div className="p-4 sm:p-6 flex-1 flex flex-col lg:overflow-hidden" style={{ paddingTop: "calc(env(safe-area-inset-top) + 1rem)" }}>
          <div className="flex flex-col items-center mb-6">
            <div className="bg-gray-600 dark:bg-transparent rounded-lg p-2 mb-4 w-full flex justify-center">
              <Image
                src="/logo.png"
                alt="Logo"
                width={80}
                height={80}
                priority
                unoptimized
                className="lg:w-20 lg:h-20"
                style={{ width: "auto", height: "auto" }}
              />
            </div>
            <h2 className="text-base sm:text-lg lg:text-base font-bold text-center">Gestion Agences</h2>
          </div>
          <nav className="space-y-1 flex-1">
            {menuItems.map((item) => {
              const Icon = item.icon
              const isParametres = item.href === "/dashboard/parametres"
              
              if (isParametres) {
                return (
                  <div key={item.href} className="space-y-0.5">
                    <div className="border-b border-border/30 my-2"></div>
                    <button
                      onClick={() => {
                        setParametresOpen(!parametresOpen)
                        if (!parametresOpen) {
                          router.push("/dashboard/parametres")
                        }
                      }}
                      className={cn(
                        "w-full flex items-center justify-between gap-3 px-4 py-2.5 rounded-md transition-colors text-sm min-h-[44px] relative",
                        pathname === "/dashboard/parametres"
                          ? "bg-primary/10 text-primary border-l-2 border-l-primary"
                          : "hover:bg-accent/50 text-muted-foreground hover:text-foreground"
                      )}
                    >
                      {pathname === "/dashboard/parametres" && (
                        <div className="absolute left-0 top-0 bottom-0 w-0.5 bg-primary"></div>
                      )}
                      <div className="flex items-center gap-3">
                        <Icon className="h-4 w-4 shrink-0" />
                        <span className="font-medium">{item.label}</span>
                      </div>
                      {parametresOpen ? (
                        <ChevronDown className="h-3.5 w-3.5 shrink-0" />
                      ) : (
                        <ChevronRight className="h-3.5 w-3.5 shrink-0" />
                      )}
                    </button>
                    {parametresOpen && (
                      <div className="pl-4 space-y-0.5 mt-1">
                        {parametresSubPages.map((subPage) => {
                          const isActive = pathname === "/dashboard/parametres" && currentTab === subPage.tab
                          const SubPageIcon = subPage.icon
                          return (
                            <Link
                              key={subPage.href}
                              href={subPage.href}
                              onClick={() => {
                                setMobileOpen(false)
                              }}
                              className={cn(
                                "flex items-center gap-3 px-4 py-2 rounded-md transition-colors text-xs min-h-[36px] relative",
                                isActive
                                  ? "bg-primary/10 text-primary border-l-2 border-l-primary font-medium"
                                  : "hover:bg-accent/30 text-muted-foreground hover:text-foreground"
                              )}
                            >
                              {isActive && (
                                <div className="absolute left-0 top-0 bottom-0 w-0.5 bg-primary"></div>
                              )}
                              <SubPageIcon className="h-3.5 w-3.5 shrink-0" />
                              <span>{subPage.label}</span>
                            </Link>
                          )
                        })}
                      </div>
                    )}
                  </div>
                )
              }
              
              return (
                <div key={item.href}>
                  <div className="border-b border-border/30 my-2"></div>
                  <Link
                    href={item.href}
                    onClick={() => setMobileOpen(false)}
                    className={cn(
                      "flex items-center gap-3 px-4 py-2.5 rounded-md transition-colors text-sm min-h-[44px] relative",
                      pathname === item.href
                        ? "bg-primary/10 text-primary border-l-2 border-l-primary font-medium"
                        : "hover:bg-accent/50 text-muted-foreground hover:text-foreground"
                    )}
                  >
                    {pathname === item.href && (
                      <div className="absolute left-0 top-0 bottom-0 w-0.5 bg-primary"></div>
                    )}
                    <Icon className="h-4 w-4 shrink-0" />
                    <span>{item.label}</span>
                  </Link>
                </div>
              )
            })}
          </nav>
          
          {/* Section utilisateur en bas */}
          <div className="mt-auto pt-4 border-t border-border/30 space-y-1">
            {userLogin && (
              <div className="px-4 py-2 text-xs font-medium text-muted-foreground break-words uppercase tracking-wide">
                {userLogin}
              </div>
            )}
            <div className="border-b border-border/30 my-2"></div>
            <Link
              href="/dashboard/profil"
              onClick={() => setMobileOpen(false)}
              className={cn(
                "flex items-center gap-2 px-4 py-2.5 rounded-md transition-colors w-full text-sm min-h-[44px] relative",
                pathname === "/dashboard/profil"
                  ? "bg-primary/10 text-primary border-l-2 border-l-primary font-medium"
                  : "hover:bg-accent/50 text-muted-foreground hover:text-foreground"
              )}
            >
              {pathname === "/dashboard/profil" && (
                <div className="absolute left-0 top-0 bottom-0 w-0.5 bg-primary"></div>
              )}
              <User className="h-4 w-4 shrink-0" />
              <span>Mon profil</span>
            </Link>
            <ThemeToggle />
            <Button
              variant="ghost"
              onClick={handleLogout}
              className="w-full justify-start gap-2 text-sm text-muted-foreground hover:text-foreground min-h-[44px] hover:bg-accent/50"
            >
              <LogOut className="h-4 w-4 shrink-0" />
              <span>Déconnexion</span>
            </Button>
          </div>
        </div>
      </aside>
    </>
  )
}

export function Sidebar() {
  return (
    <Suspense fallback={
      <aside className="w-full h-full z-40 lg:relative lg:w-48 flex flex-col">
        <div className="p-4 sm:p-6 flex-1 flex flex-col">
          <div className="flex flex-col items-center mb-6">
            <div className="bg-gray-600 dark:bg-transparent rounded-lg p-2 mb-4 w-full flex justify-center">
              <div className="w-20 h-20 bg-gray-400 rounded animate-pulse" />
            </div>
            <h2 className="text-base sm:text-lg lg:text-base font-bold text-center">Gestion Agences</h2>
          </div>
        </div>
      </aside>
    }>
      <SidebarContent />
    </Suspense>
  )
}

