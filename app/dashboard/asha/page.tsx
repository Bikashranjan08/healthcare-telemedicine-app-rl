export default function AshaDashboard() {
  return (
    <section className="mx-auto max-w-6xl px-4 py-8">
      <h1 className="text-2xl font-semibold">ASHA Worker Dashboard</h1>
      <div className="mt-6 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        <div className="rounded-lg border border-border bg-card p-4">
          <h2 className="font-medium text-destructive">SOS Alerts</h2>
          <p className="mt-2 text-sm text-muted-foreground">No active alerts.</p>
        </div>
        <div className="rounded-lg border border-border bg-card p-4">
          <h2 className="font-medium">My Assigned Users</h2>
          <p className="mt-2 text-sm text-muted-foreground">List of users you support.</p>
        </div>
        <div className="rounded-lg border border-border bg-card p-4 lg:col-span-2">
          <h2 className="font-medium">View User Health Records</h2>
          <p className="mt-2 text-sm text-muted-foreground">Access authorized records.</p>
        </div>
      </div>
    </section>
  )
}
