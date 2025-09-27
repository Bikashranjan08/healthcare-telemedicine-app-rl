"use client"
import { Button } from "@/components/ui/button"
import { useEffect, useState } from "react"
import { useAuth } from "@/components/auth-context"

type Alert = { id: string; userName: string; userId: string; createdAt: number; resolved?: boolean }

const LS_KEY = "ssc_sos_alerts_v1"

export default function EmergencyPage() {
  const { user } = useAuth()
  const [sent, setSent] = useState(false)

  useEffect(() => {
    if (!sent) return
    const t = setTimeout(() => setSent(false), 5000)
    return () => clearTimeout(t)
  }, [sent])

  const sendAlert = () => {
    const raw = localStorage.getItem(LS_KEY)
    const list: Alert[] = raw ? JSON.parse(raw) : []
    list.unshift({
      id: crypto.randomUUID(),
      userName: user?.name || "Unknown User",
      userId: user?.id || "anonymous",
      createdAt: Date.now(),
    })
    localStorage.setItem(LS_KEY, JSON.stringify(list))
    setSent(true)
  }

  return (
    <main className="mx-auto max-w-xl p-4 space-y-4">
      <h1 className="text-2xl font-semibold">Emergency SOS</h1>
      <p className="text-muted-foreground">
        Press the button to alert your assigned ASHA worker and list this alert in the ASHA dashboard.
      </p>
      <Button size="lg" variant="destructive" className="w-full h-16 text-lg" onClick={sendAlert}>
        Send SOS Alert
      </Button>
      {sent && <div className="rounded border p-3">Alert sent! Your ASHA worker has been notified (demo).</div>}
    </main>
  )
}
