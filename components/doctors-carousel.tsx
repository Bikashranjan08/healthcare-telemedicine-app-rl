"use client"

import { Button } from "@/components/ui/button"

const doctors = [
  { name: "Dr. Asha Verma", specialty: "General Physician" },
  { name: "Dr. Rohan Singh", specialty: "Pediatrics" },
  { name: "Dr. Meera Nair", specialty: "Gynecology" },
  { name: "Dr. Kabir Malhotra", specialty: "Cardiology" },
  { name: "Dr. Anjali Rao", specialty: "Dermatology" },
]

export function DoctorsCarousel() {
  return (
    <section className="mx-auto max-w-6xl px-4 py-10">
      <h2 className="mb-4 text-2xl font-semibold">Meet Our Doctors</h2>
      <div className="-mx-4 overflow-x-auto px-4">
        <div className="flex gap-4">
          {doctors.map((d) => (
            <article
              key={d.name}
              className="min-w-[260px] rounded-lg border border-border bg-card p-4"
              aria-label={`${d.name}, ${d.specialty}`}
            >
              <img
                src="/doctor-profile.png"
                alt={`Profile photo of ${d.name}`}
                className="mb-3 h-auto w-full rounded-md border border-border"
              />
              <h3 className="text-lg font-medium">{d.name}</h3>
              <p className="text-sm text-muted-foreground">{d.specialty}</p>
              <div className="mt-3">
                <Button variant="outline" className="w-full bg-transparent">
                  View Profile
                </Button>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
