"use client"
import { useAuth } from "@/components/auth-context"

export default function PatientDashboard() {
  const { user } = useAuth()
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
          <ul className="mt-2 text-sm text-muted-foreground">
            <li>No appointments yet.</li>
          </ul>
        </div>
        <div className="rounded-lg border border-border bg-card p-4">
          <h2 className="font-medium">My Medical Records</h2>
          <p className="mt-2 text-sm text-muted-foreground">Upload and view records.</p>
        </div>
        <div className="rounded-lg border border-border bg-card p-4">
          <h2 className="font-medium">My Prescriptions</h2>
          <p className="mt-2 text-sm text-muted-foreground">View prescribed medicines.</p>
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
