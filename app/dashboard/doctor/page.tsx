export default function DoctorDashboard() {
  return (
    <section className="mx-auto max-w-6xl px-4 py-8">
      <h1 className="text-2xl font-semibold">Doctor Dashboard</h1>
      <div className="mt-6 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        <div className="rounded-lg border border-border bg-card p-4">
          <h2 className="font-medium">Pending Appointment Requests</h2>
          <p className="mt-2 text-sm text-muted-foreground">0 requests</p>
        </div>
        <div className="rounded-lg border border-border bg-card p-4">
          <h2 className="font-medium">Today's Consultations</h2>
          <p className="mt-2 text-sm text-muted-foreground">No consultations scheduled.</p>
        </div>
        <div className="rounded-lg border border-border bg-card p-4">
          <h2 className="font-medium">Patient History Search</h2>
          <p className="mt-2 text-sm text-muted-foreground">Search patients by name, ID.</p>
        </div>
        <div className="rounded-lg border border-border bg-card p-4 lg:col-span-3">
          <h2 className="font-medium">Create E-Prescription</h2>
          <p className="mt-2 text-sm text-muted-foreground">Start a new e-prescription.</p>
        </div>
      </div>
    </section>
  )
}
