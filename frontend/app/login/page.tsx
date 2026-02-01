"use client"

import React, {useState} from "react"
import {useRouter} from "next/navigation"
import {apiService} from "@/lib/service";
import {FaLock, FaUser} from 'react-icons/fa';
import {HiEye, HiEyeOff} from 'react-icons/hi';
import {mayak, oskariG2} from "@/app/fonts";
import Image from "next/image";
import {useIsMobile} from "@/hooks/use-mobile";

const shimmer = (w: number, h: number) => `
<svg width="${w}" height="${h}" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
  <defs>
    <linearGradient id="g">
      <stop stop-color="#333" offset="20%" />
      <stop stop-color="#222" offset="50%" />
      <stop stop-color="#333" offset="70%" />
    </linearGradient>
  </defs>
  <rect width="${w}" height="${h}" fill="#333" />
  <rect id="r" width="${w}" height="${h}" fill="url(#g)" />
  <animate xlink:href="#r" attributeName="x" from="-${w}" to="${w}" dur="1s" repeatCount="indefinite"  />
</svg>`;

const toBase64 = (str: string) =>
  typeof window === "undefined"
    ? Buffer.from(str).toString("base64")
    : window.btoa(str);

export default function LoginPage() {
  const router = useRouter()
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState("")
  const [loading, setLoading] = useState(false)
  const [showPassword, setShowPassword] = useState(false)
  const isMobile = useIsMobile()

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setError("")
    setLoading(true)

    try {
      const {data} = await apiService.login(username, password);

      // Store token and user info
      localStorage.setItem('token', data.token)
      localStorage.setItem('userRole', data.user.role)
      localStorage.setItem('userId', data.user.id)
      localStorage.setItem('username', data.user.username)

      // Store team info for participants
      if (data.team) {
        localStorage.setItem('teamId', data.team.id)
        localStorage.setItem('teamCode', data.team.teamCode)
        localStorage.setItem('teamName', data.team.teamName)
      }

      // Redirect based on role
      const role = data.user.role
      if (role === 'admin') {
        router.push('/admin/dashboard')
      } else if (role === 'superadmin') {
        router.push('/superadmin/dashboard')
      } else if (role === 'participant') {
        router.push('/participant/dashboard')
      }
    } catch (err: any) {
      console.log('err', err)
      setError(err.message || 'Invalid credentials')
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen w-full flex items-center justify-center overflow-hidden">
      <div
        className="flex flex-col items-center justify-center px-6 py-8 mx-8 rounded-[2.5rem]"
        style={{
          background: 'rgba(255,255,255,0.10)',
          border: '0.6px solid #FFFFFF',
          boxShadow: '0 2px 32px 0 rgba(0,0,0,0.18)',
          backdropFilter: 'blur(8px)',
        }}
      >
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className={`text-3xl font-extrabold tracking-wide mb-2 text-white ${mayak.className}`}>Welcome!</h1>
          <p className={`text-gray-300 text-sm ${oskariG2.className}`}>Please sign in to your account</p>
        </div>
        <form onSubmit={handleLogin} className="w-full flex flex-col gap-3 text-xs">
          {/* Error Message */}
          {error && (
            <div className="p-3 bg-red-50 border border-red-200 rounded text-red-700 text-sm text-center">
              {error}
            </div>
          )}
          <div className="relative">
            <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400">
              <FaUser/>
            </span>
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="w-full pl-12 pr-4 py-3 rounded-full outline-0 shadow-none bg-[#232323] text-white placeholder-gray-400 border-none focus:ring-2 focus:ring-yellow-500"
              placeholder="Username"
              required
              autoComplete="username"
            />
          </div>
          <div className="relative">
            <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400">
              <FaLock/>
            </span>
            <input
              type={showPassword ? "text" : "password"}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full pl-12 pr-12 py-3 rounded-full shadow-none bg-[#232323] text-white placeholder-gray-400 border-none focus:ring-2 focus:ring-yellow-500"
              placeholder="Password"
              required
              autoComplete="current-password"
            />
            <button
              type="button"
              className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 text-lg focus:outline-none"
              onClick={() => setShowPassword((v) => !v)}
              tabIndex={-1}
            >
              {showPassword ? <HiEyeOff/> : <HiEye/>}
            </button>
          </div>
          <button
            type="submit"
            disabled={loading}
            className="w-16 h-7 mx-auto flex items-center justify-center rounded-[1.3rem] border-2 border-yellow-500 text-yellow-500 bg-transparent cursor-pointer hover:bg-[#242323] hover:text-black transition-colors duration-200 text-2xl mt-2 disabled:opacity-60 disabled:cursor-not-allowed"
            style={{boxShadow: '0 0 0 2px rgba(255,193,7,0.08)'}}
          >
            <Image src={"/arrowButton.svg"} alt={"Arrow Button"} width={30} height={18}/>
          </button>
        </form>
      </div>
      <div className="fixed inset-0 -z-10 w-screen h-screen">
        <Image
          src={isMobile ? "/loginMobile.svg" : "/login.svg"}
          fill
          priority
          className="w-full h-full min-w-full min-h-full object-cover object-top"
          placeholder={`data:image/svg+xml;base64,${toBase64(shimmer(1920, 1080))}`}
          alt="Login Background"
          draggable="false"
        />
      </div>
    </div>
  )
}
