"use client"

import dynamic from "next/dynamic"

const LoginContent = dynamic(() => import("./LoginContent"), { ssr: true })

export default function LoginPage() {
  return <LoginContent />
}
