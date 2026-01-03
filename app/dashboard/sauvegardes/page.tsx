"use client"

import { useEffect } from "react"
import { useRouter } from "next/navigation"

export default function SauvegardesPage() {
  const router = useRouter()
  
  useEffect(() => {
    router.replace("/dashboard/parametres?tab=sauvegardes")
  }, [router])
  
  return null
}

