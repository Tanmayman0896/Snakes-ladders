"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"

export default function LoginPage() {
  const router = useRouter()
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState("")
  const [loading, setLoading] = useState(false)

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setError("")
    setLoading(true)

    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000'}/api/auth/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, password }),
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.message || 'Login failed')
      }

      // Store token and user info
      localStorage.setItem('token', data.data.token)
      localStorage.setItem('userRole', data.data.user.role)
      localStorage.setItem('userId', data.data.user.id)
      localStorage.setItem('username', data.data.user.username)

      // Store team info for participants
      if (data.data.team) {
        localStorage.setItem('teamId', data.data.team.id)
        localStorage.setItem('teamCode', data.data.team.teamCode)
        localStorage.setItem('teamName', data.data.team.teamName)
      }

      // Redirect based on role
      const role = data.data.user.role
      if (role === 'admin') {
        router.push('/admin/dashboard')
      } else if (role === 'superadmin') {
        router.push('/superadmin/dashboard')
      } else if (role === 'participant') {
        router.push('/participant/dashboard')
      }
    } catch (err: any) {
      setError(err.message || 'Invalid credentials')
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-white flex items-center justify-center px-4 sm:px-6 lg:px-8">
      <div className="w-full max-w-md">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Snake & Ladder</h1>
          <p className="text-gray-600">Login to continue</p>
        </div>

        <form onSubmit={handleLogin} className="space-y-6">
          {/* Error Message */}
          {error && (
            <div className="p-3 bg-red-50 border border-red-200 rounded text-red-700 text-sm">
              {error}
            </div>
          )}

          {/* Username Input */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Username
            </label>
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:border-gray-600 focus:ring-1 focus:ring-gray-600"
              placeholder="Enter your username"
              required
            />
          </div>

          {/* Password Input */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Password
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:border-gray-600 focus:ring-1 focus:ring-gray-600"
              placeholder="Enter your password"
              required
            />
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={loading}
            className="w-full px-6 py-3 bg-gray-800 text-white rounded font-medium hover:bg-gray-700 disabled:bg-gray-400 transition-colors"
          >
            {loading ? "Logging in..." : "Login"}
          </button>
        </form>
      </div>
    </div>
  )
}
