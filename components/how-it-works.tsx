"use client"

import { useI18n } from "./i18n-provider"

export function HowItWorks() {
  const { t } = useI18n()
  return (
    <section className="mx-auto max-w-6xl px-4 py-10">
      <h2 className="mb-6 text-2xl font-semibold">{t.how.title}</h2>
      <ol className="grid gap-4 md:grid-cols-3">
        {t.how.steps.map((s, i) => (
          <li key={i} className="rounded-lg border border-border bg-card p-4">
            <div className="mb-2 inline-flex h-8 w-8 items-center justify-center rounded-full bg-accent text-accent-foreground">
              {i + 1}
            </div>
            <p className="font-medium">{s}</p>
          </li>
        ))}
      </ol>
    </section>
  )
}
