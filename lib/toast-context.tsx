"use client"

import React, { createContext, useCallback, useContext, useState } from "react"

export type ToastVariant = "default" | "success" | "destructive"

export interface ToastData {
  id: string
  title: string
  description?: string
  variant?: ToastVariant
}

interface ToastContextValue {
  toasts: ToastData[]
  toast: (options: Omit<ToastData, "id">) => void
  dismiss: (id: string) => void
}

const ToastContext = createContext<ToastContextValue | null>(null)

const TOAST_DURATION = 5000

export function ToastProvider({ children }: { children: React.ReactNode }) {
  const [toasts, setToasts] = useState<ToastData[]>([])

  const dismiss = useCallback((id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id))
  }, [])

  const toast = useCallback(
    (options: Omit<ToastData, "id">) => {
      const id = `toast-${Date.now()}-${Math.random().toString(36).slice(2)}`
      const entry: ToastData = { ...options, id }
      setToasts((prev) => [...prev, entry])
      setTimeout(() => dismiss(id), TOAST_DURATION)
    },
    [dismiss]
  )

  return (
    <ToastContext.Provider value={{ toasts, toast, dismiss }}>
      {children}
    </ToastContext.Provider>
  )
}

export function useToast() {
  const ctx = useContext(ToastContext)
  if (!ctx) {
    return {
      toasts: [],
      toast: (_options: Omit<ToastData, "id">) => {},
      dismiss: (_id: string) => {},
    }
  }
  return ctx
}
