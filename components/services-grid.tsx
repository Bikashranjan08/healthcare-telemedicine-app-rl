"use client"

import { useI18n } from "./i18n-provider"

const icons = ["video camera", "stethoscope", "files", "bell", "pill", "alert", "map"]

export function ServicesGrid() {
  const { t } = useI18n()
  return (
    <section className="mx-auto max-w-6xl px-4 py-10">
      <h2 className="mb-6 text-2xl font-semibold">{t.services.title}</h2>
      <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-3">
        {t.services.items.map((label, i) => (
          <div key={label} className="flex items-center gap-4 rounded-lg border border-border bg-card p-4">
            <img
              src={`/.jpg?height=40&width=40&query=${encodeURIComponent(icons[i] || "health icon")}`}
              alt=""
              className="h-10 w-10 rounded-md border border-border"
            />
            <span className="font-medium">{label}</span>
          </div>
        ))}
      </div>
    </section>
  )
}
