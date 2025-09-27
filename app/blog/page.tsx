export default function BlogPage() {
  const posts = [
    { title: "Managing Diabetes in Rural Areas", date: "2025-08-12" },
    { title: "How ASHA Workers Support Community Health", date: "2025-07-02" },
    { title: "Understanding Childhood Vaccinations", date: "2025-06-15" },
  ]
  return (
    <section className="mx-auto max-w-4xl px-4 py-10">
      <h1 className="text-3xl font-semibold">Health Blog</h1>
      <ul className="mt-6 grid gap-4">
        {posts.map((p) => (
          <li key={p.title} className="rounded-lg border border-border bg-card p-4">
            <h3 className="text-lg font-medium">{p.title}</h3>
            <p className="text-sm text-muted-foreground">Published on {p.date}</p>
          </li>
        ))}
      </ul>
    </section>
  )
}
