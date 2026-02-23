"use client"

import { Button } from "@/components/ui/button"
import { AlertTriangle } from "lucide-react"

export default function DashboardError({
    error,
    reset,
}: {
    error: Error & { digest?: string }
    reset: () => void
}) {
    return (
        <div className="flex-1 flex flex-col items-center justify-center gap-6 p-8">
            <div className="flex items-center gap-3 text-destructive">
                <AlertTriangle className="h-8 w-8" />
                <h2 className="text-2xl font-bold">Une erreur est survenue</h2>
            </div>
            <p className="text-muted-foreground text-center max-w-md">
                Une erreur inattendue s'est produite lors du chargement de cette page.
                Veuillez réessayer ou contacter l'administrateur si le problème persiste.
            </p>
            {process.env.NODE_ENV === "development" && (
                <pre className="text-xs text-destructive/70 bg-destructive/5 border border-destructive/20 rounded-lg p-4 max-w-lg overflow-auto">
                    {error.message}
                </pre>
            )}
            <Button onClick={reset} variant="outline" size="lg">
                Réessayer
            </Button>
        </div>
    )
}
