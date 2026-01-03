"use client"

import { useEffect } from "react"
import { useRouter } from "next/navigation"

export default function LogsPage() {
  const router = useRouter()
  
  useEffect(() => {
    router.replace("/dashboard/parametres?tab=logs")
  }, [router])
  
  return null
}

