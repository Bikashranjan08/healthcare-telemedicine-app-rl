"use client"
import { useEffect, useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

type Reminder = { id: string; name: string; time: string }
type MedItem = {
  id: string
  name: string
  description: string
  howToTake: string
  whenToTake: string
  symptoms: string
  price: string
}

const LS_KEY = "ssc_meds_v1"
const PHARM_KEY = "ssc_pharmacy_medicines_v1"

const seededMeds: MedItem[] = [
  {
    id: "paracetamol-500",
    name: "Paracetamol 500mg",
    description: "Analgesic/antipyretic used to reduce fever and relieve pain.",
    howToTake: "1 tablet with water",
    whenToTake: "Every 6-8 hours as needed; do not exceed 4g/day",
    symptoms: "Fever, headache, mild pain",
    price: "₹20 per strip",
  },
  {
    id: "amoxicillin-500",
    name: "Amoxicillin 500mg",
    description: "Antibiotic for bacterial infections; use only if prescribed.",
    howToTake: "1 capsule",
    whenToTake: "Every 8 hours for 5-7 days",
    symptoms: "Bacterial infection as diagnosed",
    price: "₹120 per strip",
  },
  {
    id: "cetirizine-10",
    name: "Cetirizine 10mg",
    description: "Antihistamine that relieves allergy symptoms.",
    howToTake: "1 tablet",
    whenToTake: "Once daily at night",
    symptoms: "Allergic rhinitis, itching",
    price: "₹15 per strip",
  },
]

export default function MedicinePage() {
  const [items, setItems] = useState<Reminder[]>([])
  const [name, setName] = useState("")
  const [time, setTime] = useState("08:00")

  const [catalog, setCatalog] = useState<MedItem[]>([])
  const [query, setQuery] = useState("")

  useEffect(() => {
    try {
      const raw = localStorage.getItem(LS_KEY)
      if (raw) setItems(JSON.parse(raw))
    } catch {}
    try {
      const raw = localStorage.getItem(PHARM_KEY)
      const stored = raw ? (JSON.parse(raw) as MedItem[]) : null
      const initial = stored && stored.length ? stored : seededMeds
      setCatalog(initial)
      if (!stored) localStorage.setItem(PHARM_KEY, JSON.stringify(initial))
    } catch {}
  }, [])

  const save = (next: Reminder[]) => {
    setItems(next)
    try {
      localStorage.setItem(LS_KEY, JSON.stringify(next))
    } catch {}
  }

  const filtered = catalog.filter((m) =>
    (m.name + " " + m.description + " " + m.symptoms).toLowerCase().includes(query.toLowerCase()),
  )

  return (
    <main className="mx-auto max-w-5xl p-4 space-y-8">
      <section>
        <h1 className="text-2xl font-semibold">Medicine Availability</h1>
        <p className="text-sm text-muted-foreground">
          Local pharmacy inventory with description, usage, and price details.
        </p>
        <div className="mt-4">
          <Input
            placeholder="Search medicines by name, symptom, or description"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
        </div>
        <div className="mt-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {filtered.map((m) => (
            <article key={m.id} className="rounded-lg border border-border bg-card p-4">
              <h3 className="text-lg font-medium">{m.name}</h3>
              <div className="mt-1 text-sm text-muted-foreground">{m.description}</div>
              <div className="mt-3 grid gap-1 text-sm">
                <div>
                  <span className="font-medium">How to take: </span>
                  {m.howToTake}
                </div>
                <div>
                  <span className="font-medium">When to take: </span>
                  {m.whenToTake}
                </div>
                <div>
                  <span className="font-medium">Symptoms: </span>
                  {m.symptoms}
                </div>
              </div>
              <div className="mt-3 font-medium">{m.price}</div>
            </article>
          ))}
        </div>
      </section>

      <section className="space-y-4">
        <h2 className="text-xl font-semibold">My Medicine Reminders</h2>
        <div className="grid gap-2 sm:grid-cols-3">
          <Input placeholder="Medicine name" value={name} onChange={(e) => setName(e.target.value)} />
          <Input type="time" value={time} onChange={(e) => setTime(e.target.value)} />
          <Button
            onClick={() => {
              if (!name.trim()) return
              const next = [{ id: crypto.randomUUID(), name, time }, ...items]
              save(next)
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
      </section>
    </main>
  )
}
