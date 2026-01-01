"use client"

import { Sidebar } from "@/components/ui/sidebar"
import { SessionTimeoutWrapper } from "@/components/session-timeout-wrapper"
import { AgencyStats } from "@/components/agency-stats"

export function DashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex h-screen bg-background overflow-hidden">
      <SessionTimeoutWrapper />
      <Sidebar />
      <div className="flex-1 flex flex-col min-h-0" style={{ paddingTop: "env(safe-area-inset-top)" }}>
        <header className="h-16 border-b flex items-center justify-between px-3 sm:px-6">
          <AgencyStats />
          <div className="flex-1" />
        </header>
        <main className="flex-1 h-full overflow-hidden min-h-0 w-full max-w-full">{children}</main>
      </div>
    </div>
  )
}

