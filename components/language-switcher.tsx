"use client"

import { useI18n } from "./i18n-provider"

export function LanguageSwitcher() {
  const { locale, setLocale } = useI18n()
  return (
    <label className="inline-flex items-center gap-2" aria-label="Language selector">
      <span className="sr-only">Language</span>
      <select
        className="rounded-md border border-border bg-card px-3 py-2 text-sm"
        value={locale}
        onChange={(e) => setLocale(e.target.value as any)}
        aria-controls="page-content"
      >
        <option value="en">English</option>
        <option value="hi">हिंदी</option>
        <option value="pa">ਪੰਜਾਬੀ</option>
        <option value="or">ଓଡିଆ</option>
      </select>
    </label>
  )
}
