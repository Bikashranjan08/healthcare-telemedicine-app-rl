"use client"

import { useMemo, useState } from "react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

const allDoctors = [
  { name: "Dr. Asha Verma", specialty: "General Physician", language: "English" },
  { name: "Dr. Rohan Singh", specialty: "Pediatrics", language: "Hindi" },
  { name: "Dr. Meera Nair", specialty: "Gynecology", language: "English" },
  { name: "Dr. Kabir Malhotra", specialty: "Cardiology", language: "Punjabi" },
  { name: "Dr. Anjali Rao", specialty: "Dermatology", language: "Odia" },
]

export default function FindDoctorPage() {
  const [q, setQ] = useState("")
  const [spec, setSpec] = useState<string>("all")
  const [lang, setLang] = useState<string>("all")

  const results = useMemo(() => {
    return allDoctors.filter((d) => {
      const matchQ = q ? (d.name + " " + d.specialty).toLowerCase().includes(q.toLowerCase()) : true
      const matchSpec = spec === "all" ? true : d.specialty === spec
      const matchLang = lang === "all" ? true : d.language === lang
      return matchQ && matchSpec && matchLang
    })
  }, [q, spec, lang])

  const specialties = Array.from(new Set(allDoctors.map((d) => d.specialty)))
  const languages = Array.from(new Set(allDoctors.map((d) => d.language)))

  return (
    <section className="mx-auto max-w-6xl px-4 py-10">
      <h1 className="text-3xl font-semibold">Find a Doctor</h1>
      <div className="mt-4 grid gap-3 md:grid-cols-3">
        <Input
          value={q}
          onChange={(e) => setQ(e.target.value)}
          placeholder="Search by name or specialty"
          aria-label="Search doctors"
        />
        <Select value={spec} onValueChange={setSpec}>
          <SelectTrigger>
            <SelectValue placeholder="Specialty" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All specialties</SelectItem>
            {specialties.map((s) => (
              <SelectItem key={s} value={s}>
                {s}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        <Select value={lang} onValueChange={setLang}>
          <SelectTrigger>
            <SelectValue placeholder="Language" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All languages</SelectItem>
            {languages.map((l) => (
              <SelectItem key={l} value={l}>
                {l}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {results.map((d) => (
          <article key={d.name} className="rounded-lg border border-border bg-card p-4">
            <img
              src="/doctor-profile.png"
              alt={`Profile photo of ${d.name}`}
              className="mb-3 h-auto w-full rounded-md border border-border"
            />
            <h3 className="text-lg font-medium">{d.name}</h3>
            <p className="text-sm text-muted-foreground">
              {d.specialty} • {d.language}
            </p>
            <div className="mt-3 flex gap-2">
              <Button variant="outline">View Profile</Button>
              <Button variant="secondary">Book</Button>
            </div>
          </article>
        ))}
      </div>
    </section>
  )
}
