"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { useI18n } from "./i18n-provider"

export function Hero() {
  const { t } = useI18n()
  return (
    <section className="mx-auto max-w-6xl px-4 py-10 md:py-16">
      <div className="grid items-center gap-8 md:grid-cols-2">
        <div>
          <h1 className="text-pretty text-3xl font-semibold md:text-4xl">{t.hero.title}</h1>
          <p className="mt-3 text-lg text-muted-foreground">{t.hero.subtitle}</p>
          <div className="mt-6 flex flex-wrap gap-3">
            <Button asChild variant="secondary" className="min-w-44">
              <Link href="/find-doctor">{t.hero.book}</Link>
            </Button>
            <Button asChild variant="destructive" className="min-w-40" aria-label="Emergency SOS">
              <Link href="/dashboard/patient">{t.hero.sos}</Link>
            </Button>
          </div>
        </div>
        <div aria-hidden="true" className="order-first md:order-last">
          <img
            src="/doctor-consultation-illustration.png"
            alt="Illustration of a doctor consulting with a patient online"
            className="h-auto w-full rounded-lg border border-border"
          />
        </div>
      </div>
    </section>
  )
}
