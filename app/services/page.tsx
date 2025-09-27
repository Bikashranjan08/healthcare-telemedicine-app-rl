export default function ServicesPage() {
  const services = [
    { title: "Video Consultation", desc: "See a doctor online from anywhere with secure video calls." },
    { title: "Records Management", desc: "Store and share your medical records securely." },
    { title: "Emergency Support", desc: "Activate SOS to alert your ASHA worker and nearest support." },
    { title: "Symptom Checker", desc: "Get quick guidance and triage suggestions." },
    { title: "Medicine Reminders", desc: "Never miss a dose with friendly reminders." },
    { title: "Medicine Availability", desc: "Check nearby pharmacies for availability." },
    { title: "Hospital Navigation", desc: "Find and navigate to the right hospital quickly." },
  ]
  return (
    <section className="mx-auto max-w-6xl px-4 py-10">
      <h1 className="text-3xl font-semibold">Services</h1>
      <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {services.map((s) => (
          <article key={s.title} className="rounded-lg border border-border bg-card p-4">
            <h3 className="text-lg font-medium">{s.title}</h3>
            <p className="mt-2 text-sm text-muted-foreground">{s.desc}</p>
          </article>
        ))}
      </div>
    </section>
  )
}
