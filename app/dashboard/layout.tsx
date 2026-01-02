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
    <div className="flex h-screen overflow-hidden bg-background w-full max-w-full">
      <SessionTimeoutWrapper />
      <Sidebar />
      <div className="flex-1 flex flex-col min-h-0 w-full min-w-0 max-w-full overflow-hidden" style={{ paddingTop: "env(safe-area-inset-top)" }}>
        <header className="h-auto min-h-[4rem] border-b flex flex-col lg:flex-row items-center justify-center lg:justify-between relative px-3 sm:px-6 py-2 lg:py-0 w-full max-w-full min-w-0 overflow-x-hidden">
          {/* Logo en mode mobile - 20% de largeur, centré */}
          <div className="lg:hidden mb-2 w-full flex justify-center">
            <div className="bg-gray-600 dark:bg-transparent rounded-lg p-2 w-[20vw] max-w-[20vw] flex justify-center">
              <Image
                src="/logo.png"
                alt="Logo"
                width={80}
                height={80}
                priority
                unoptimized
                className="w-full h-auto max-w-full"
                style={{ width: "auto", height: "auto", maxHeight: "3rem" }}
              />
            </div>
          </div>
          {/* Statistiques - centrées en mobile, à gauche en desktop */}
          <div className="flex items-center justify-center lg:justify-start w-full lg:w-auto min-w-0 max-w-full">
            <AgencyStats />
          </div>
          <div className="hidden lg:block flex-1" />
        </header>
        <main className="flex-1 overflow-auto w-full min-w-0 max-w-full overflow-x-hidden">
          {children}
        </main>
      </div>
    </div>
  )
}

