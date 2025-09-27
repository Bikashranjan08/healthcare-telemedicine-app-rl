"use client"

import type React from "react"
import { createContext, useContext, useEffect, useMemo, useState } from "react"

export type UserRole = "patient" | "doctor" | "asha" | "admin"
export type AppUser = { id: string; name: string; email: string; role: UserRole }

type AuthContextValue = {
  user: AppUser | null
  login: (user: AppUser) => void
  logout: () => void
  updateProfile: (partial: Partial<AppUser>) => void
}

const AuthContext = createContext<AuthContextValue | undefined>(undefined)
const LS_KEY = "ssc_auth_user_v1"

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<AppUser | null>(null)

  useEffect(() => {
    try {
      const raw = localStorage.getItem(LS_KEY)
      if (raw) setUser(JSON.parse(raw))
    } catch {}
  }, [])

  const persist = (u: AppUser | null) => {
    try {
      if (u) localStorage.setItem(LS_KEY, JSON.stringify(u))
      else localStorage.removeItem(LS_KEY)
    } catch {}
  }

  const login = (u: AppUser) => {
    setUser(u)
    persist(u)
  }
  const logout = () => {
    setUser(null)
    persist(null)
  }
  const updateProfile = (partial: Partial<AppUser>) => {
    setUser((prev) => {
      if (!prev) return prev
      const next = { ...prev, ...partial }
      persist(next)
      return next
    })
  }

  const value = useMemo(() => ({ user, login, logout, updateProfile }), [user])
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export function useAuth() {
  const ctx = useContext(AuthContext)
  if (!ctx) throw new Error("useAuth must be used within AuthProvider")
  return ctx
}
