"use client"

import { useMemo, useState } from "react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
  DialogClose,
} from "@/components/ui/dialog"
import { useAuth } from "@/components/auth-context"

type Doctor = { id: string; name: string; specialty: string; language: string; email?: string }

const seededDoctors: Doctor[] = [
  { id: "asha-verma", name: "Dr. Asha Verma", specialty: "General Physician", language: "English" },
  { id: "rohan-singh", name: "Dr. Rohan Singh", specialty: "Pediatrics", language: "Hindi" },
  { id: "meera-nair", name: "Dr. Meera Nair", specialty: "Gynecology", language: "English" },
  { id: "kabir-malhotra", name: "Dr. Kabir Malhotra", specialty: "Cardiology", language: "Punjabi" },
  { id: "anjali-rao", name: "Dr. Anjali Rao", specialty: "Dermatology", language: "Odia" },
]

function getDoctors(): Doctor[] {
  try {
    const raw = localStorage.getItem("ssc_doctors_v1")
    const extra = raw ? (JSON.parse(raw) as Doctor[]) : []
    // merge on name+specialty for seeds
    const byKey = new Map<string, Doctor>()
    const keyFor = (d: Doctor) => `${d.name}|${d.specialty}`
    ;[...seededDoctors, ...extra].forEach((d) => byKey.set(keyFor(d), d))
    return Array.from(byKey.values())
  } catch {
    return seededDoctors
  }
}

export default function FindDoctorPage() {
  const { user } = useAuth()
  const [q, setQ] = useState("")
  const [spec, setSpec] = useState<string>("all")
  const [lang, setLang] = useState<string>("all")
  const [doctors, setDoctors] = useState<Doctor[]>(() => getDoctors())

  const [open, setOpen] = useState(false)
  const [selected, setSelected] = useState<Doctor | null>(null)
  const [date, setDate] = useState<string>("")
  const [time, setTime] = useState<string>("09:00")

  const results = useMemo(() => {
    return doctors.filter((d) => {
      const matchQ = q ? (d.name + " " + d.specialty).toLowerCase().includes(q.toLowerCase()) : true
      const matchSpec = spec === "all" ? true : d.specialty === spec
      const matchLang = lang === "all" ? true : d.language === lang
      return matchQ && matchSpec && matchLang
    })
  }, [q, spec, lang, doctors])

  const specialties = Array.from(new Set(doctors.map((d) => d.specialty)))
  const languages = Array.from(new Set(doctors.map((d) => d.language)))

  const createAppointment = () => {
    if (!user || !selected || !date || !time) return
    const appt = {
      id: crypto.randomUUID(),
      doctorId: selected.id,
      doctorName: selected.name,
      patientId: user.id,
      patientName: user.name,
      patientEmail: user.email,
      date,
      time,
      status: "pending" as "pending" | "approved" | "rejected",
      createdAt: new Date().toISOString(),
    }
    try {
      const KEY = "ssc_appointments_v1"
      const raw = localStorage.getItem(KEY)
      const list = raw ? (JSON.parse(raw) as any[]) : []
      localStorage.setItem(KEY, JSON.stringify([appt, ...list]))
    } catch {}
    setOpen(false)
  }

  return (
    <section className="mx-auto max-w-6xl px-4 py-10">
      <h1 className="text-3xl font-semibold">Find a Doctor</h1>
      <div className="mt-4 grid gap-3 md:grid-cols-3">
        <Input
          value={q}
          onChange={(e) => setQ(e.target.value)}
          placeholder="Search by name or specialty"
          aria-label="Search doctors"
        />
        <Select value={spec} onValueChange={setSpec}>
          <SelectTrigger>
            <SelectValue placeholder="Specialty" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All specialties</SelectItem>
            {specialties.map((s) => (
              <SelectItem key={s} value={s}>
                {s}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        <Select value={lang} onValueChange={setLang}>
          <SelectTrigger>
            <SelectValue placeholder="Language" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All languages</SelectItem>
            {languages.map((l) => (
              <SelectItem key={l} value={l}>
                {l}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {results.map((d) => (
          <article key={d.id} className="rounded-lg border border-border bg-card p-4">
            <img
              src="/doctor-profile.png"
              alt={`Profile photo of ${d.name}`}
              className="mb-3 h-auto w-full rounded-md border border-border"
            />
            <h3 className="text-lg font-medium">{d.name}</h3>
            <p className="text-sm text-muted-foreground">
              {d.specialty} • {d.language}
            </p>
            <div className="mt-3 flex gap-2">
              <Button variant="outline">View Profile</Button>
              <Button
                variant="secondary"
                onClick={() => {
                  setSelected(d)
                  setOpen(true)
                }}
              >
                Book
              </Button>
            </div>
          </article>
        ))}
      </div>

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Book Appointment</DialogTitle>
            <DialogDescription>Select preferred date and time and send request to the doctor.</DialogDescription>
          </DialogHeader>
          <div className="grid gap-3">
            <Input type="date" value={date} onChange={(e) => setDate(e.target.value)} aria-label="Appointment date" />
            <Input type="time" value={time} onChange={(e) => setTime(e.target.value)} aria-label="Appointment time" />
          </div>
          <DialogFooter className="mt-4 flex gap-2">
            <DialogClose asChild>
              <Button variant="outline">Cancel</Button>
            </DialogClose>
            <Button onClick={createAppointment} disabled={!selected || !date || !time || !user}>
              Send Request
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </section>
  )
}
