"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import Image from "next/image"
import { usePathname, useRouter } from "next/navigation"
import { Button } from "./button"
import { ThemeToggle } from "./theme-toggle"
import { Menu, X, LogOut, User, Building2, Users, FileText, HardDrive, Settings } from "lucide-react"
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
  { href: "/dashboard/utilisateurs", label: "Utilisateurs", adminOnly: true, icon: Users },
  { href: "/dashboard/logs", label: "Logs", adminOnly: true, icon: FileText },
  { href: "/dashboard/sauvegardes", label: "Sauvegardes", adminOnly: true, icon: HardDrive },
  { href: "/dashboard/parametres", label: "Paramètres", adminOnly: true, icon: Settings },
]

export function Sidebar() {
  const [mobileOpen, setMobileOpen] = useState(false)
  const [userRole, setUserRole] = useState<string | null>(null)
  const [userLogin, setUserLogin] = useState<string | null>(null)
  const [mounted, setMounted] = useState(false)
  const pathname = usePathname()
  const router = useRouter()

  useEffect(() => {
    setMounted(true)
  }, [])

  useEffect(() => {
    if (!mounted) return

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
  }, [mounted])

  const handleLogout = async () => {
    await fetch("/api/auth/logout", { method: "POST" })
    router.push("/login")
    router.refresh()
  }

  const menuItems = allMenuItems.filter(
    (item) => !item.adminOnly || userRole === "Super Admin"
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
                className="lg:w-20 lg:h-20"
                style={{ width: "auto", height: "auto" }}
              />
            </div>
            <h2 className="text-base sm:text-lg lg:text-base font-bold text-center">Gestion Agences</h2>
          </div>
          <nav className="space-y-2 flex-1">
            {menuItems.map((item) => {
              const Icon = item.icon
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setMobileOpen(false)}
                  className={cn(
                    "flex items-center gap-3 px-4 py-3 rounded-md transition-colors text-base min-h-[44px]",
                    pathname === item.href
                      ? "bg-primary text-primary-foreground"
                      : "hover:bg-accent"
                  )}
                >
                  <Icon className="h-5 w-5 shrink-0" />
                  <span>{item.label}</span>
                </Link>
              )
            })}
          </nav>
          
          {/* Section utilisateur en bas */}
          <div className="mt-auto pt-4 border-t space-y-2">
            {userLogin && (
              <div className="px-4 py-2 text-base font-medium text-foreground break-words">
                {userLogin}
              </div>
            )}
            <Link
              href="/dashboard/profil"
              onClick={() => setMobileOpen(false)}
              className={cn(
                "flex items-center gap-2 px-4 py-3 rounded-md transition-colors w-full text-base min-h-[44px]",
                pathname === "/dashboard/profil"
                  ? "bg-primary text-primary-foreground"
                  : "hover:bg-accent"
              )}
            >
              <User className="h-5 w-5 shrink-0" />
              <span>Mon profil</span>
            </Link>
            <ThemeToggle />
            <Button
              variant="ghost"
              onClick={handleLogout}
              className="w-full justify-start gap-2 text-base text-muted-foreground hover:text-foreground min-h-[44px]"
            >
              <LogOut className="h-5 w-5 shrink-0" />
              <span>Déconnexion</span>
            </Button>
          </div>
        </div>
      </aside>
    </>
  )
}

