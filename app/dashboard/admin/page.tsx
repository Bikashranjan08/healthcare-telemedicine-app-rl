export default function AdminDashboard() {
  return (
    <section className="mx-auto max-w-6xl px-4 py-8">
      <h1 className="text-2xl font-semibold">Admin Dashboard</h1>
      <div className="mt-6 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        <div className="rounded-lg border border-border bg-card p-4">
          <h2 className="font-medium">User Management</h2>
          <p className="mt-2 text-sm text-muted-foreground">View, edit, and deactivate users.</p>
        </div>
        <div className="rounded-lg border border-border bg-card p-4">
          <h2 className="font-medium">Doctor & ASHA Approvals</h2>
          <p className="mt-2 text-sm text-muted-foreground">Review pending verification.</p>
        </div>
        <div className="rounded-lg border border-border bg-card p-4">
          <h2 className="font-medium">Website Analytics</h2>
          <p className="mt-2 text-sm text-muted-foreground">Traffic and usage insights.</p>
        </div>
      </div>
    </section>
  )
}
