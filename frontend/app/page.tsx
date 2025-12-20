"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"

export default function Home() {
  const router = useRouter()
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Check if user is already logged in
    const userRole = localStorage.getItem("userRole")
    const token = localStorage.getItem("token")

    if (token && userRole) {
      if (userRole === "admin") {
        router.push("/admin/dashboard")
      } else if (userRole === "superadmin") {
        router.push("/superadmin/dashboard")
      } else if (userRole === "participant") {
        router.push("/participant/dashboard")
      } else {
        router.push("/login")
      }
    } else {
      router.push("/login")
    }
    setLoading(false)
  }, [router])

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-white">
        <div className="text-center">
          <p className="text-gray-600">Loading...</p>
        </div>
      </div>
    )
  }

  return null
}
