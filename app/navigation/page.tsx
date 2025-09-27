"use client"
import { Card } from "@/components/ui/card"

const facilities = [
  { name: "City Hospital", type: "Hospital", distance: "1.2 km" },
  { name: "Green Clinic", type: "Clinic", distance: "2.1 km" },
  { name: "Good Health Pharmacy", type: "Pharmacy", distance: "2.5 km" },
]

export default function NavigationPage() {
  return (
    <main className="mx-auto max-w-2xl p-4 space-y-4">
      <h1 className="text-2xl font-semibold">Healthcare Navigation</h1>
      <p className="text-muted-foreground">Find nearby hospitals, clinics, and pharmacies (demo list).</p>
      <div className="space-y-2">
        {facilities.map((f) => (
          <Card key={f.name} className="p-3">
            <div className="font-medium">{f.name}</div>
            <div className="text-sm text-muted-foreground">
              {f.type} • {f.distance}
            </div>
          </Card>
        ))}
      </div>
    </main>
  )
}
