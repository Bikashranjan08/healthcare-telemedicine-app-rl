export default function ServicesPage() {
  const services = [
    { title: "Video Consultation", desc: "See a doctor online from anywhere with secure video calls.", href: "/video" },
    { title: "Records Management", desc: "Store and share your medical records securely.", href: "/records" },
    {
      title: "Emergency Support",
      desc: "Activate SOS to alert your ASHA worker and nearest support.",
      href: "/emergency",
    },
    { title: "Symptom Checker", desc: "Get quick guidance and triage suggestions.", href: "/symptoms" },
    { title: "Medicine Reminders", desc: "Never miss a dose with friendly reminders.", href: "/medicine" },
    { title: "Medicine Availability", desc: "Check nearby pharmacies for availability.", href: "/medicine" },
    { title: "Hospital Navigation", desc: "Find and navigate to the right hospital quickly.", href: "/navigation" },
  ]
  return (
    <section className="mx-auto max-w-6xl px-4 py-10">
      <h1 className="text-3xl font-semibold">Services</h1>
      <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {services.map((s) => (
          <article key={s.title} className="rounded-lg border border-border bg-card p-4">
            <h3 className="text-lg font-medium">{s.title}</h3>
            <p className="mt-2 text-sm text-muted-foreground">{s.desc}</p>
            <a
              href={s.href}
              className="mt-4 inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground hover:bg-primary/90 focus:outline-none focus:ring-2 focus:ring-primary/40"
              aria-label={`Open ${s.title}`}
            >
              Open
            </a>
          </article>
        ))}
      </div>
    </section>
  )
}
