"use client"

import type React from "react"

import { useState } from "react"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"

export default function ContactPage() {
  const [submitted, setSubmitted] = useState(false)

  function onSubmit(e: React.FormEvent) {
    e.preventDefault()
    setSubmitted(true)
  }

  return (
    <section className="mx-auto max-w-6xl px-4 py-10">
      <h1 className="text-3xl font-semibold">Contact Us</h1>
      <div className="mt-6 grid gap-8 md:grid-cols-2">
        <form onSubmit={onSubmit} className="grid gap-3">
          <label className="grid gap-1">
            <span className="text-sm">Your Name</span>
            <Input required name="name" />
          </label>
          <label className="grid gap-1">
            <span className="text-sm">Email</span>
            <Input required type="email" name="email" />
          </label>
          <label className="grid gap-1">
            <span className="text-sm">Message</span>
            <Textarea required name="message" rows={5} />
          </label>
          <Button type="submit" variant="secondary" className="w-fit">
            Send
          </Button>
          {submitted && <p className="text-sm text-accent-foreground">Thanks! We’ll reach out soon.</p>}
        </form>
        <div>
          <h2 className="mb-2 text-xl font-medium">Our Office</h2>
          <p className="text-sm text-muted-foreground">123 Health Street, New Delhi</p>
          <div className="mt-3 overflow-hidden rounded-md border border-border">
            <iframe
              title="Office location map"
              width="100%"
              height="300"
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              src="https://www.openstreetmap.org/export/embed.html?bbox=77.2%2C28.6%2C77.3%2C28.7&layer=mapnik"
            />
          </div>
        </div>
      </div>
    </section>
  )
}
