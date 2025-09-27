"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { LanguageSwitcher } from "./language-switcher"
import { useI18n } from "./i18n-provider"

export function SiteHeader() {
  const { t } = useI18n()
  return (
    <header className="sticky top-0 z-50 border-b border-border bg-background/80 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3">
        <Link href="/" className="flex items-center gap-2" aria-label="Sehat Saathi Connect home">
          <div className="h-8 w-8 rounded-md bg-primary" />
          <span className="text-lg font-semibold text-balance">Sehat Saathi Connect</span>
        </Link>
        <nav aria-label="Primary" className="hidden items-center gap-6 md:flex">
          <Link className="hover:text-primary" href="/">
            {t.nav.home}
          </Link>
          <Link className="hover:text-primary" href="/about">
            {t.nav.about}
          </Link>
          <Link className="hover:text-primary" href="/services">
            {t.nav.services}
          </Link>
          <Link className="hover:text-primary" href="/find-doctor">
            {t.nav.doctors}
          </Link>
          <Link className="hover:text-primary" href="/blog">
            {t.nav.blog}
          </Link>
          <Link className="hover:text-primary" href="/contact">
            {t.nav.contact}
          </Link>
        </nav>
        <div className="flex items-center gap-3">
          <LanguageSwitcher />
          <Button asChild variant="secondary">
            <Link href="/login">{t.nav.login}</Link>
          </Button>
        </div>
      </div>
      <nav className="md:hidden" aria-label="Mobile">
        <div className="mx-auto grid max-w-6xl grid-cols-3 gap-x-2 px-4 pb-3">
          <Link className="py-2 text-center hover:text-primary" href="/about">
            {t.nav.about}
          </Link>
          <Link className="py-2 text-center hover:text-primary" href="/services">
            {t.nav.services}
          </Link>
          <Link className="py-2 text-center hover:text-primary" href="/find-doctor">
            {t.nav.doctors}
          </Link>
        </div>
      </nav>
    </header>
  )
}
