export function Testimonials() {
  const items = [
    { quote: "Easy to use and very helpful in my village.", author: "Ritika, Odisha" },
    { quote: "Connected me to a doctor in minutes.", author: "Gurpreet, Punjab" },
    { quote: "Reminders keep my medicines on track.", author: "Amit, Delhi" },
  ]
  return (
    <section className="mx-auto max-w-6xl px-4 py-10">
      <h2 className="mb-6 text-2xl font-semibold">What patients say</h2>
      <div className="grid gap-4 md:grid-cols-3">
        {items.map((t) => (
          <figure key={t.author} className="rounded-lg border border-border bg-card p-4">
            <blockquote className="text-pretty">“{t.quote}”</blockquote>
            <figcaption className="mt-3 text-sm text-muted-foreground">— {t.author}</figcaption>
          </figure>
        ))}
      </div>
    </section>
  )
}
