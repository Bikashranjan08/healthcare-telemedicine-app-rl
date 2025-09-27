"use client"
import { useAuth } from "@/components/auth-context"
import { useRouter, useSearchParams } from "next/navigation"
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"

export default function RegisterPage() {
  const { login } = useAuth()
  const router = useRouter()
  const params = useSearchParams()
  const roleFromQuery = (params.get("role") || "patient") as "patient" | "doctor" | "asha" | "admin"

  async function onSubmit(formData: FormData) {
    const email = String(formData.get("email") || "")
    const name = String(formData.get("name") || "")
    const role = String(formData.get("role") || roleFromQuery) as any
    const specialty = String(formData.get("specialty") || "")
    const language = String(formData.get("language") || "")

    if (!email || !name) return
    const newUser = { id: crypto.randomUUID(), name, email, role }
    login(newUser)

    if (role === "doctor") {
      try {
        const DOCTORS_KEY = "ssc_doctors_v1"
        const raw = localStorage.getItem(DOCTORS_KEY)
        const list = raw ? (JSON.parse(raw) as any[]) : []
        const exists = list.some((d) => d.email === email)
        const toAdd = {
          id: newUser.id,
          name,
          email,
          specialty: specialty || "General Physician",
          language: language || "English",
        }
        const next = exists ? list : [toAdd, ...list]
        localStorage.setItem(DOCTORS_KEY, JSON.stringify(next))
      } catch {}
    }

    router.push(`/dashboard/${role}`)
  }

  return (
    <section className="mx-auto max-w-md px-4 py-10">
      <Card>
        <CardHeader>
          <CardTitle>Create your account</CardTitle>
        </CardHeader>
        <CardContent>
          <form action={onSubmit} className="space-y-4">
            <Input name="name" placeholder="Full name" required />
            <Input name="email" placeholder="Email" type="email" required />
            <Input name="password" placeholder="Password" type="password" required />
            <select
              name="role"
              defaultValue={roleFromQuery}
              className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
              aria-label="Select role"
            >
              <option value="patient">Patient</option>
              <option value="doctor">Doctor</option>
              <option value="asha">ASHA Worker</option>
              <option value="admin">Admin</option>
            </select>
            <Input name="specialty" placeholder="Doctor specialty (if Doctor)" />
            <Input name="language" placeholder="Language (if Doctor)" />
            <Button type="submit" className="w-full">
              Register
            </Button>
          </form>
        </CardContent>
      </Card>
    </section>
  )
}
