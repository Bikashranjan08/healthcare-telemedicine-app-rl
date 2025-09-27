"use client"
import { useEffect, useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

type RecordItem = { id: string; name: string; date: string }

const LS_KEY = "ssc_records_v1"

export default function RecordsPage() {
  const [items, setItems] = useState<RecordItem[]>([])
  const [name, setName] = useState("")

  useEffect(() => {
    try {
      const raw = localStorage.getItem(LS_KEY)
      if (raw) setItems(JSON.parse(raw))
    } catch {}
  }, [])

  const save = (next: RecordItem[]) => {
    setItems(next)
    try {
      localStorage.setItem(LS_KEY, JSON.stringify(next))
    } catch {}
  }

  return (
    <main className="mx-auto max-w-2xl p-4 space-y-4">
      <h1 className="text-2xl font-semibold">Medical Records</h1>
      <div className="flex gap-2">
        <Input placeholder="Record name (e.g., CBC Report)" value={name} onChange={(e) => setName(e.target.value)} />
        <Button
          onClick={() => {
            if (!name.trim()) return
            const next = [{ id: crypto.randomUUID(), name, date: new Date().toISOString().slice(0, 10) }, ...items]
            save(next)
            setName("")
          }}
        >
          Add
        </Button>
      </div>
      <ul className="space-y-2">
        {items.map((rec) => (
          <li key={rec.id} className="flex items-center justify-between rounded border p-2">
            <div>
              <div className="font-medium">{rec.name}</div>
              <div className="text-xs text-muted-foreground">{rec.date}</div>
            </div>
            <Button variant="outline" onClick={() => save(items.filter((r) => r.id !== rec.id))}>
              Remove
            </Button>
          </li>
        ))}
      </ul>
    </main>
  )
}
