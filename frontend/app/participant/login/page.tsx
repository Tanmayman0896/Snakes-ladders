"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"

export default function ParticipantLoginPage() {
  const router = useRouter()
  const [participantId, setParticipantId] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState("")
  const [loading, setLoading] = useState(false)

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault()
    setError("")
    setLoading(true)

    // TODO: Replace with actual backend call
    // For now, just a placeholder
    if (participantId && password) {
      localStorage.setItem("userRole", "participant")
      localStorage.setItem("userId", participantId)
      router.push("/participant/dashboard")
    } else {
      setError("Invalid credentials")
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-white flex items-center justify-center px-4 sm:px-6 lg:px-8">
      <div className="w-full max-w-md">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Snake & Ladder</h1>
        </div>

        <form onSubmit={handleLogin} className="space-y-6">
          {/* Back Button */}
          <button
            type="button"
            onClick={() => router.push("/login")}
            className="text-sm text-gray-600 hover:text-gray-900 underline"
          >
            ← Back to login type selection
          </button>

          {/* Title */}
          <div className="text-center">
            <h2 className="text-xl font-bold text-gray-900">Participant Login</h2>
          </div>

          {/* Error Message */}
          {error && <div className="p-3 bg-red-50 border border-red-200 rounded text-red-700 text-sm">{error}</div>}

          {/* Participant ID Input */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Participant ID</label>
            <input
              type="text"
              value={participantId}
              onChange={(e) => setParticipantId(e.target.value)}
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
      </div>
    </div>
  )
}
