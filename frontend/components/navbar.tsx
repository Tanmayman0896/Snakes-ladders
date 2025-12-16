"use client"

import { useRouter } from "next/navigation"
import { useEffect, useState } from "react"

interface NavbarProps {
  role: "admin" | "superadmin"
}

export function Navbar({ role }: NavbarProps) {
  const router = useRouter()
  const [userName, setUserName] = useState("")

  useEffect(() => {
    const userId = localStorage.getItem("userId")
    setUserName(userId || "")
  }, [])

  const handleLogout = () => {
    localStorage.removeItem("userRole")
    localStorage.removeItem("userId")
    router.push("/login")
  }

  return (
    <nav className="bg-white border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex items-center">
            <h1 className="text-xl font-bold text-gray-900">{role === "admin" ? "Admin" : "SuperAdmin"} Portal</h1>
          </div>

          {/* User Info & Logout */}
          <div className="flex items-center gap-4">
            <span className="text-sm text-gray-600">{userName}</span>
            <button
              onClick={handleLogout}
              className="px-4 py-2 bg-gray-200 text-gray-800 rounded text-sm font-medium hover:bg-gray-300 transition-colors"
            >
              Logout
            </button>
          </div>
        </div>
      </div>
    </nav>
  )
}
