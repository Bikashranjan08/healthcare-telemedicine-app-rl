"use client"
import { useEffect, useState } from "react"
import { useAuth } from "@/components/auth-context"

type Appointment = {
  id: string
  doctorId: string
  doctorName: string
  patientId: string
  date: string
  time: string
  status: "pending" | "approved" | "rejected"
}
type Prescription = {
  id: string
  patientId: string
  doctorName: string
  medicine: string
  instructions: string
  createdAt: string
}

export default function PatientDashboard() {
  const { user } = useAuth()
  const [appts, setAppts] = useState<Appointment[]>([])
  const [presc, setPresc] = useState<Prescription[]>([])

  useEffect(() => {
    try {
      const raw = localStorage.getItem("ssc_appointments_v1")
      const list = raw ? (JSON.parse(raw) as Appointment[]) : []
      setAppts(user ? list.filter((a) => a.patientId === user.id) : [])
    } catch {}
    try {
      const raw = localStorage.getItem("ssc_prescriptions_v1")
      const list = raw ? (JSON.parse(raw) as Prescription[]) : []
      setPresc(user ? list.filter((p) => p.patientId === user.id) : [])
    } catch {}
  }, [user]) // Updated dependency array to use the entire user object

  return (
    <section className="mx-auto max-w-6xl px-4 py-8">
      <div className="mb-4 rounded-lg border border-border bg-card p-4">
        <p className="text-sm text-muted-foreground">
          Welcome{user?.name ? `, ${user.name}` : ""}! Explore your health tools and upcoming appointments below.
        </p>
      </div>
      <h1 className="text-2xl font-semibold">Patient Dashboard</h1>
      <div className="mt-6 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        <div className="rounded-lg border border-border bg-card p-4">
          <h2 className="font-medium">Upcoming Appointments</h2>
          <ul className="mt-2 space-y-1 text-sm text-muted-foreground">
            {appts.length === 0 && <li>No appointments yet.</li>}
            {appts.map((a) => (
              <li key={a.id}>
                {a.date} {a.time} • {a.doctorName} • {a.status}
              </li>
            ))}
          </ul>
        </div>
        <div className="rounded-lg border border-border bg-card p-4">
          <h2 className="font-medium">My Medical Records</h2>
          <p className="mt-2 text-sm text-muted-foreground">Upload and view records.</p>
        </div>
        <div className="rounded-lg border border-border bg-card p-4">
          <h2 className="font-medium">My Prescriptions</h2>
          <ul className="mt-2 space-y-1 text-sm text-muted-foreground">
            {presc.length === 0 && <li>No prescriptions yet.</li>}
            {presc.map((p) => (
              <li key={p.id}>
                {new Date(p.createdAt).toLocaleDateString()} • {p.medicine} — {p.instructions} (by {p.doctorName})
              </li>
            ))}
          </ul>
        </div>
        <div className="rounded-lg border border-border bg-card p-4">
          <h2 className="font-medium">Messages from my ASHA worker</h2>
          <p className="mt-2 text-sm text-muted-foreground">No messages yet.</p>
        </div>
        <div className="rounded-lg border border-border bg-card p-4">
          <h2 className="font-medium">Medicine Availability</h2>
          <p className="mt-2 text-sm text-muted-foreground">Check nearby pharmacies.</p>
        </div>
        <div className="rounded-lg border border-border bg-card p-4">
          <h2 className="font-medium text-destructive">Emergency mode</h2>
          <p className="mt-2 text-sm text-muted-foreground">Configure SOS contacts.</p>
        </div>
        <div className="rounded-lg border border-border bg-card p-4 lg:col-span-3">
          <h2 className="font-medium">Hospital Navigation</h2>
          <p className="mt-2 text-sm text-muted-foreground">Find the nearest hospital route.</p>
        </div>
      </div>
    </section>
  )
}
