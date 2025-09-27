"use client"

import { useState } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { useAuth } from "@/components/auth-context"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

type Role = "patient" | "doctor" | "asha"

export default function LoginPage() {
  const [role, setRole] = useState<Role>("patient")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const router = useRouter()
  const { login } = useAuth()

  return (
    <section className="mx-auto max-w-md px-4 py-10">
      <Card>
        <CardHeader>
          <CardTitle>Login / Register</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="mb-4 grid grid-cols-3 gap-2">
            <Button variant={role === "patient" ? "secondary" : "outline"} onClick={() => setRole("patient")}>
              I am a Patient
            </Button>
            <Button variant={role === "doctor" ? "secondary" : "outline"} onClick={() => setRole("doctor")}>
              I am a Doctor
            </Button>
            <Button variant={role === "asha" ? "secondary" : "outline"} onClick={() => setRole("asha")}>
              I am an ASHA Worker
            </Button>
          </div>
          <form
            className="grid gap-3"
            onSubmit={(e) => {
              e.preventDefault()
              if (!email || !password) return
              const name = email.split("@")[0] || "User"
              login({ id: crypto.randomUUID(), name, email, role })
              router.push(`/dashboard/${role}`)
            }}
          >
            <Input placeholder="Email" type="email" required value={email} onChange={(e) => setEmail(e.target.value)} />
            <Input
              placeholder="Password"
              type="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <div className="flex items-center gap-2 text-xs text-muted-foreground">
              <span>Role:</span>
              <span className="font-medium">{role}</span>
            </div>
            <div className="flex gap-2">
              <Button type="submit" variant="secondary" className="flex-1">
                Login
              </Button>
              <Link href={`/register?role=${role}`} className="flex-1">
                <Button type="button" variant="outline" className="w-full bg-transparent">
                  Register
                </Button>
              </Link>
            </div>
          </form>
        </CardContent>
      </Card>
    </section>
  )
}
