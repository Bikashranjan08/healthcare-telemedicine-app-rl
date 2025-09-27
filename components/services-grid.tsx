"use client"

import Link from "next/link"
import { useI18n } from "./i18n-provider"

const icons = ["video camera", "stethoscope", "files", "bell", "pill", "alert", "map"]
const paths = ["/video", "/find-doctor", "/records", "/emergency", "/medicine", "/symptoms", "/navigation"]

export function ServicesGrid() {
  const { t } = useI18n()
  return (
    <section className="mx-auto max-w-6xl px-4 py-10">
      <h2 className="mb-6 text-2xl font-semibold">{t.services.title}</h2>
      <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-3">
        {t.services.items.map((label: string, i: number) => {
          const href = paths[i] || "/"
          return (
            <Link
              key={label}
              href={href}
              className="flex items-center gap-4 rounded-lg border border-border bg-card p-4 hover:bg-accent focus:outline-none focus:ring-2 focus:ring-primary/40"
              aria-label={`Go to ${label}`}
            >
              <img
                src={"/placeholder.svg?height=40&width=40&query=health%20icon"}
                alt=""
                className="h-10 w-10 rounded-md border border-border"
              />
              <span className="font-medium">{label}</span>
            </Link>
          )
        })}
      </div>
    </section>
  )
}
