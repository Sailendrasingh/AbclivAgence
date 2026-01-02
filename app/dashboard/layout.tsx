import { redirect } from "next/navigation"
import { getSession } from "@/lib/session"
import { Sidebar } from "@/components/ui/sidebar"
import { AgencyStats } from "@/components/agency-stats"
import { SessionTimeoutWrapper } from "@/components/session-timeout-wrapper"

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
        <header className="h-16 border-b flex items-center justify-between px-3 sm:px-6">
          <AgencyStats />
          <div className="flex-1" />
        </header>
        <main className="flex-1 overflow-auto">
          {children}
        </main>
      </div>
    </div>
  )
}

