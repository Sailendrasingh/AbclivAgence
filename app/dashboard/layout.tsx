import { redirect } from "next/navigation"
import { getSession } from "@/lib/session"
import { Sidebar } from "@/components/ui/sidebar"
import { AgencyStats } from "@/components/agency-stats"
import { SessionTimeoutWrapper } from "@/components/session-timeout-wrapper"
import Image from "next/image"

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const session = await getSession()

  if (!session) {
    redirect("/login")
  }

  return (
    <div className="flex h-screen overflow-hidden bg-background">
      <SessionTimeoutWrapper />
      <Sidebar />
      <div className="flex-1 flex flex-col min-h-0" style={{ paddingTop: "env(safe-area-inset-top)" }}>
        <header className="h-16 border-b flex items-center justify-center relative px-3 sm:px-6">
          {/* Logo en mode mobile - 20% de largeur, centré absolument */}
          <div className="absolute left-1/2 -translate-x-1/2 lg:hidden">
            <div className="w-[20vw] flex justify-center">
              <Image
                src="/logo.png"
                alt="Logo"
                width={80}
                height={80}
                priority
                unoptimized
                className="w-full h-auto"
                style={{ width: "auto", height: "auto", maxHeight: "3rem" }}
              />
            </div>
          </div>
          {/* Statistiques en mode desktop */}
          <div className="hidden lg:block">
            <AgencyStats />
          </div>
        </header>
        <main className="flex-1 overflow-auto w-full min-w-0 max-w-full">
          {children}
        </main>
      </div>
    </div>
  )
}

