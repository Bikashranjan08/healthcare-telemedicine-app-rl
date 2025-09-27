"use client"
import { Button } from "@/components/ui/button"
import Link from "next/link"

export default function VideoPage() {
  return (
    <main className="mx-auto max-w-3xl p-4 space-y-4">
      <h1 className="text-2xl font-semibold">Video Consultation</h1>
      <p className="text-muted-foreground">
        This demo does not connect real video yet. You can schedule a consultation or start a mock call.
      </p>
      <div className="flex gap-2">
        <Link href="/find-doctor">
          <Button>Find Doctor & Schedule</Button>
        </Link>
        <Button variant="secondary" onClick={() => alert("Starting mock call...")}>
          Start Mock Call
        </Button>
      </div>
    </main>
  )
}
