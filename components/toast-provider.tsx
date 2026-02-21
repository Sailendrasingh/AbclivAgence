"use client"

import { ToastProvider } from "@/lib/toast-context"
import { Toaster } from "@/components/ui/toaster"

export function DashboardToastProvider({ children }: { children: React.ReactNode }) {
  return (
    <ToastProvider>
      {children}
      <Toaster />
    </ToastProvider>
  )
}
