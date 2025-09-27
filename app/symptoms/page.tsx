"use client"
import { useState } from "react"
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"

export default function SymptomsPage() {
  const [symptoms, setSymptoms] = useState("")
  const [result, setResult] = useState<string | null>(null)

  return (
    <main className="mx-auto max-w-2xl p-4 space-y-4">
      <h1 className="text-2xl font-semibold">Symptom Checker</h1>
      <Textarea
        value={symptoms}
        onChange={(e) => setSymptoms(e.target.value)}
        placeholder="Describe your symptoms..."
        className="min-h-40"
      />
      <div className="flex gap-2">
        <Button
          onClick={() => {
            if (!symptoms.trim()) return
            // naive triage suggestion demo
            const low = /cold|cough|sneeze|runny|mild/i.test(symptoms)
            const high = /chest pain|severe|bleeding|unconscious|stroke|attack/i.test(symptoms)
            if (high) setResult("High urgency. Consider using Emergency SOS and seek immediate care.")
            else if (low) setResult("Likely mild. You can rest, hydrate, and monitor. Book a consultation if needed.")
            else setResult("We recommend booking a video consultation for guidance.")
          }}
        >
          Check
        </Button>
        <Button
          variant="secondary"
          onClick={() => {
            setSymptoms("")
            setResult(null)
          }}
        >
          Reset
        </Button>
      </div>
      {result && <div className="rounded-md border p-3">{result}</div>}
    </main>
  )
}
