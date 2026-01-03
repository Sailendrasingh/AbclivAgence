"use client"

import { useEffect } from "react"
import { useRouter } from "next/navigation"

export default function UtilisateursPage() {
  const router = useRouter()
  
  useEffect(() => {
    router.replace("/dashboard/parametres?tab=utilisateurs")
  }, [router])
  
  return null
}
