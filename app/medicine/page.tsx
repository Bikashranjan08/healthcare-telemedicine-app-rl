"use client"
import { useEffect, useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

type Reminder = { id: string; name: string; time: string }

const LS_KEY = "ssc_meds_v1"

export default function MedicinePage() {
  const [items, setItems] = useState<Reminder[]>([])
  const [name, setName] = useState("")
  const [time, setTime] = useState("08:00")

  useEffect(() => {
    try {
      const raw = localStorage.getItem(LS_KEY)
      if (raw) setItems(JSON.parse(raw))
    } catch {}
  }, [])

  const save = (next: Reminder[]) => {
    setItems(next)
    try {
      localStorage.setItem(LS_KEY, JSON.stringify(next))
    } catch {}
  }

  return (
    <main className="mx-auto max-w-2xl p-4 space-y-4">
      <h1 className="text-2xl font-semibold">Medicine Manager</h1>
      <div className="grid gap-2 sm:grid-cols-3">
        <Input placeholder="Medicine name" value={name} onChange={(e) => setName(e.target.value)} />
        <Input type="time" value={time} onChange={(e) => setTime(e.target.value)} />
        <Button
          onClick={() => {
            if (!name.trim()) return
            save([{ id: crypto.randomUUID(), name, time }, ...items])
            setName("")
          }}
        >
          Add Reminder
        </Button>
      </div>
      <ul className="space-y-2">
        {items.map((r) => (
          <li key={r.id} className="flex items-center justify-between rounded border p-2">
            <div>
              <div className="font-medium">{r.name}</div>
              <div className="text-xs text-muted-foreground">Time: {r.time}</div>
            </div>
            <Button variant="outline" onClick={() => save(items.filter((x) => x.id !== r.id))}>
              Remove
            </Button>
          </li>
        ))}
      </ul>
    </main>
  )
}
