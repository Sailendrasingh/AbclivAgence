"use client"

import { useToast } from "@/lib/toast-context"
import { cn } from "@/lib/utils"
import { CheckCircle2, X, AlertCircle } from "lucide-react"
import { useEffect, useRef } from "react"

export function Toaster() {
  const { toasts, dismiss } = useToast()
  const listRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (toasts.length === 0) return
    const last = listRef.current?.querySelector("[data-toast]:last-of-type")
    if (last instanceof HTMLElement) {
      last.focus({ preventScroll: true })
    }
  }, [toasts.length])

  if (toasts.length === 0) return null

  return (
    <div
      ref={listRef}
      className="fixed bottom-0 right-0 z-[100] flex max-h-screen w-full flex-col gap-2 p-4 sm:max-w-[420px] sm:bottom-4 sm:right-4"
      aria-live="polite"
      aria-label="Notifications"
    >
      {toasts.map((t) => (
        <ToastItem key={t.id} data={t} onDismiss={() => dismiss(t.id)} />
      ))}
    </div>
  )
}

function ToastItem({
  data,
  onDismiss,
}: {
  data: { id: string; title: string; description?: string; variant?: "default" | "success" | "destructive" }
  onDismiss: () => void
}) {
  const isDestructive = data.variant === "destructive"
  const isSuccess = data.variant === "success"

  return (
    <div
      data-toast
      role="status"
      tabIndex={0}
      className={cn(
        "flex w-full items-start gap-3 rounded-lg border bg-background p-4 shadow-lg animate-in slide-in-from-bottom-4",
        isDestructive && "border-destructive/50 bg-destructive/5",
        isSuccess && "border-green-500/50 bg-green-500/5"
      )}
    >
      {isDestructive && <AlertCircle className="h-5 w-5 shrink-0 text-destructive" aria-hidden />}
      {isSuccess && <CheckCircle2 className="h-5 w-5 shrink-0 text-green-600 dark:text-green-500" aria-hidden />}
      <div className="flex-1 space-y-1">
        <p className={cn(
          "text-sm font-medium",
          isDestructive && "text-destructive",
          isSuccess && "text-green-700 dark:text-green-400"
        )}>
          {data.title}
        </p>
        {data.description && (
          <p className="text-sm text-muted-foreground">{data.description}</p>
        )}
      </div>
      <button
        type="button"
        onClick={onDismiss}
        className="shrink-0 rounded-md p-1 opacity-70 hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring"
        aria-label="Fermer la notification"
      >
        <X className="h-4 w-4" />
      </button>
    </div>
  )
}
