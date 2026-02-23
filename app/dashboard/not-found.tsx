import Link from "next/link"
import { Button } from "@/components/ui/button"
import { FileQuestion } from "lucide-react"

export default function DashboardNotFound() {
    return (
        <div className="flex-1 flex flex-col items-center justify-center gap-6 p-8">
            <FileQuestion className="h-16 w-16 text-muted-foreground/40" />
            <div className="text-center">
                <h2 className="text-2xl font-bold text-foreground">Page introuvable</h2>
                <p className="text-muted-foreground mt-2">
                    La page que vous recherchez n'existe pas ou a été déplacée.
                </p>
            </div>
            <Button asChild variant="outline" size="lg">
                <Link href="/dashboard">Retour au tableau de bord</Link>
            </Button>
        </div>
    )
}
