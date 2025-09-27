"use client"
import { useAuth } from "@/components/auth-context"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

export default function ProfilePage() {
  const { user, updateProfile } = useAuth()
  const [name, setName] = useState(user?.name || "")
  const [email, setEmail] = useState(user?.email || "")

  if (!user) return <main className="p-4">Please login to view your profile.</main>

  return (
    <main className="mx-auto max-w-2xl p-4 space-y-4">
      <h1 className="text-2xl font-semibold">Your Profile</h1>
      <div className="space-y-2">
        <Label htmlFor="name">Name</Label>
        <Input id="name" value={name} onChange={(e) => setName(e.target.value)} />
      </div>
      <div className="space-y-2">
        <Label htmlFor="email">Email</Label>
        <Input id="email" value={email} onChange={(e) => setEmail(e.target.value)} />
      </div>
      <Button onClick={() => updateProfile({ name, email })} className="mt-2">
        Save Changes
      </Button>
    </main>
  )
}
