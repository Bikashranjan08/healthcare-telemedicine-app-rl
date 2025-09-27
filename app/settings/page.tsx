"use client"
import { useAuth } from "@/components/auth-context"

export default function SettingsPage() {
  const { user } = useAuth()
  if (!user) return <main className="p-4">Please login to view settings.</main>
  return (
    <main className="mx-auto max-w-2xl p-4 space-y-4">
      <h1 className="text-2xl font-semibold">Settings</h1>
      <p className="text-muted-foreground">Manage notification preferences and privacy here. (Coming soon)</p>
    </main>
  )
}
