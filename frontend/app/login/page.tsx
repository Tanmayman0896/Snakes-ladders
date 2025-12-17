"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"

export default function LoginPage() {
  const router = useRouter()
  const [loginType, setLoginType] = useState<"admin" | "superadmin" | null>(null)
  const [teamId, setTeamId] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState("")
  const [loading, setLoading] = useState(false)

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault()
    setError("")
    setLoading(true)

    // Simple mock authentication (replace with actual backend call)
    if (loginType === "admin") {
      if (teamId === "ADMIN001" && password === "admin123") {
        localStorage.setItem("userRole", "admin")
        localStorage.setItem("userId", "ADMIN001")
        router.push("/admin/dashboard")
      } else {
        setError("Invalid admin credentials")
        setLoading(false)
      }
    } else if (loginType === "superadmin") {
      if (teamId === "SUPER001" && password === "super123") {
        localStorage.setItem("userRole", "superadmin")
        localStorage.setItem("userId", "SUPER001")
        router.push("/superadmin/dashboard")
      } else {
        setError("Invalid superadmin credentials")
        setLoading(false)
      }
    }
  }

  return (
    <div className="min-h-screen bg-white flex items-center justify-center px-4 sm:px-6 lg:px-8">
      <div className="w-full max-w-md">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Snake & Ladder</h1>
        </div>

        {/* Login Type Selection */}
        {!loginType ? (
          <div className="space-y-4">
            <p className="text-center text-gray-700 font-medium mb-6">Select Login Type</p>
            <button
              onClick={() => setLoginType("admin")}
              className="w-full px-6 py-3 bg-gray-800 text-white rounded border border-gray-800 hover:bg-gray-700 transition-colors font-medium"
            >
              Admin Login
            </button>
            <button
              onClick={() => setLoginType("superadmin")}
              className="w-full px-6 py-3 bg-gray-600 text-white rounded border border-gray-600 hover:bg-gray-500 transition-colors font-medium"
            >
              SuperAdmin Login
            </button>
            <button
              onClick={() => router.push("/participant/login")}
              className="w-full px-6 py-3 bg-gray-400 text-white rounded border border-gray-400 hover:bg-gray-500 transition-colors font-medium"
            >
              Participant Login
            </button>
          </div>
        ) : (
          <form onSubmit={handleLogin} className="space-y-6">
            {/* Back Button */}
            <button
              type="button"
              onClick={() => {
                setLoginType(null)
                setTeamId("")
                setPassword("")
                setError("")
              }}
              className="text-sm text-gray-600 hover:text-gray-900 underline"
            >
              ← Back to login type selection
            </button>

            {/* Title */}
            <div className="text-center">
              <h2 className="text-xl font-bold text-gray-900">
                {loginType === "admin" ? "Admin" : "SuperAdmin"} Login
              </h2>
            </div>

            {/* Error Message */}
            {error && <div className="p-3 bg-red-50 border border-red-200 rounded text-red-700 text-sm">{error}</div>}

            {/* ID Input */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                {loginType === "admin" ? "Admin ID" : "SuperAdmin ID"}
              </label>
              <input
                type="text"
                value={teamId}
                onChange={(e) => setTeamId(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:border-gray-600 focus:ring-1 focus:ring-gray-600"
                required
              />
            </div>

            {/* Password Input */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Password</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:border-gray-600 focus:ring-1 focus:ring-gray-600"
                required
              />
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={loading}
              className="w-full px-6 py-2 bg-gray-800 text-white rounded font-medium hover:bg-gray-700 disabled:bg-gray-400 transition-colors"
            >
              {loading ? "Logging in..." : "Login"}
            </button>
          </form>
        )}
      </div>
    </div>
  )
}
