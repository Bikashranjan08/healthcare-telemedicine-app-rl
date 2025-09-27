"use client"

import { useEffect, useMemo, useState } from "react"
import { useAuth } from "@/components/auth-context"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
  DialogClose,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"

type Appointment = {
  id: string
  doctorId: string
  doctorName: string
  patientId: string
  patientName: string
  patientEmail: string
  date: string
  time: string
  status: "pending" | "approved" | "rejected"
  createdAt: string
}

type RecordItem = { id: string; name: string; date: string }
type Prescription = {
  id: string
  appointmentId: string
  doctorId: string
  patientId: string
  doctorName: string
  patientName: string
  medicine: string
  instructions: string
  notes?: string
  createdAt: string
}

const APPT_KEY = "ssc_appointments_v1"
const REC_BY_USER_KEY = "ssc_records_by_user_v1"
const PRESC_KEY = "ssc_prescriptions_v1"

export default function DoctorDashboard() {
  const { user } = useAuth()
  const [appointments, setAppointments] = useState<Appointment[]>([])
  const [recordsByUser, setRecordsByUser] = useState<Record<string, RecordItem[]>>({})
  const [openRx, setOpenRx] = useState(false)
  const [rxFor, setRxFor] = useState<Appointment | null>(null)
  const [medicine, setMedicine] = useState("")
  const [instructions, setInstructions] = useState("")
  const [notes, setNotes] = useState("")

  useEffect(() => {
    try {
      const raw = localStorage.getItem(APPT_KEY)
      const list = raw ? (JSON.parse(raw) as Appointment[]) : []
      setAppointments(list)
    } catch {}
    try {
      const raw = localStorage.getItem(REC_BY_USER_KEY)
      setRecordsByUser(raw ? JSON.parse(raw) : {})
    } catch {}
  }, [])

  const myPending = useMemo(
    () => appointments.filter((a) => a.doctorId === user?.id && a.status === "pending"),
    [appointments, user?.id],
  )
  const myToday = useMemo(() => {
    const today = new Date().toISOString().slice(0, 10)
    return appointments.filter((a) => a.doctorId === user?.id && a.status === "approved" && a.date === today)
  }, [appointments, user?.id])

  const updateApptStatus = (id: string, status: Appointment["status"]) => {
    setAppointments((prev) => {
      const next = prev.map((a) => (a.id === id ? { ...a, status } : a))
      try {
        localStorage.setItem(APPT_KEY, JSON.stringify(next))
      } catch {}
      return next
    })
  }

  const sendPrescription = () => {
    if (!rxFor || !medicine.trim()) return
    const p: Prescription = {
      id: crypto.randomUUID(),
      appointmentId: rxFor.id,
      doctorId: rxFor.doctorId,
      patientId: rxFor.patientId,
      doctorName: rxFor.doctorName,
      patientName: rxFor.patientName,
      medicine,
      instructions,
      notes,
      createdAt: new Date().toISOString(),
    }
    try {
      const raw = localStorage.getItem(PRESC_KEY)
      const list = raw ? (JSON.parse(raw) as Prescription[]) : []
      localStorage.setItem(PRESC_KEY, JSON.stringify([p, ...list]))
    } catch {}
    setOpenRx(false)
    setMedicine("")
    setInstructions("")
    setNotes("")
  }

  return (
    <section className="mx-auto max-w-6xl px-4 py-8">
      <h1 className="text-2xl font-semibold">Doctor Dashboard</h1>

      <div className="mt-6 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        <div className="rounded-lg border border-border bg-card p-4">
          <h2 className="font-medium">Pending Appointment Requests</h2>
          <ul className="mt-2 space-y-3">
            {myPending.length === 0 && <li className="text-sm text-muted-foreground">0 requests</li>}
            {myPending.map((a) => {
              const patientRecords = recordsByUser[a.patientId] || []
              return (
                <li key={a.id} className="rounded-md border p-2">
                  <div className="text-sm">
                    <div className="font-medium">
                      {a.patientName} • {a.date} at {a.time}
                    </div>
                    <div className="text-xs text-muted-foreground">{a.patientEmail}</div>
                  </div>
                  <div className="mt-2">
                    <div className="text-xs font-medium">Past Records ({patientRecords.length})</div>
                    <ul className="mt-1 list-disc pl-4 text-xs text-muted-foreground">
                      {patientRecords.slice(0, 3).map((r) => (
                        <li key={r.id}>
                          {r.name} — {r.date}
                        </li>
                      ))}
                      {patientRecords.length > 3 && <li>and more…</li>}
                    </ul>
                  </div>
                  <div className="mt-3 flex gap-2">
                    <Button variant="secondary" onClick={() => updateApptStatus(a.id, "approved")}>
                      Approve
                    </Button>
                    <Button variant="outline" onClick={() => updateApptStatus(a.id, "rejected")}>
                      Reject
                    </Button>
                    <Button
                      variant="outline"
                      onClick={() => {
                        setRxFor(a)
                        setOpenRx(true)
                      }}
                    >
                      Send Prescription
                    </Button>
                  </div>
                </li>
              )
            })}
          </ul>
        </div>

        <div className="rounded-lg border border-border bg-card p-4">
          <h2 className="font-medium">Today's Consultations</h2>
          <ul className="mt-2 space-y-2 text-sm text-muted-foreground">
            {myToday.length === 0 && <li>No consultations scheduled.</li>}
            {myToday.map((a) => (
              <li key={a.id}>
                {a.time} • {a.patientName}
              </li>
            ))}
          </ul>
        </div>

        <div className="rounded-lg border border-border bg-card p-4">
          <h2 className="font-medium">Patient History Search</h2>
          <p className="mt-2 text-sm text-muted-foreground">Search patients by name, ID.</p>
        </div>

        <div className="rounded-lg border border-border bg-card p-4 lg:col-span-3">
          <h2 className="font-medium">Create E-Prescription</h2>
          <p className="mt-2 text-sm text-muted-foreground">
            Use “Send Prescription” on a request to target a patient.
          </p>
        </div>
      </div>

      <Dialog open={openRx} onOpenChange={setOpenRx}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Send E‑Prescription</DialogTitle>
            <DialogDescription>
              {rxFor ? `To ${rxFor.patientName} for appointment on ${rxFor.date} at ${rxFor.time}` : ""}
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-3">
            <Input placeholder="Medicine name" value={medicine} onChange={(e) => setMedicine(e.target.value)} />
            <Input
              placeholder="How to take (dosage)"
              value={instructions}
              onChange={(e) => setInstructions(e.target.value)}
            />
            <Textarea
              placeholder="Notes / report link (optional)"
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
            />
          </div>
          <DialogFooter className="mt-4 flex gap-2">
            <DialogClose asChild>
              <Button variant="outline">Cancel</Button>
            </DialogClose>
            <Button onClick={sendPrescription} disabled={!medicine.trim() || !rxFor}>
              Send
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </section>
  )
}
