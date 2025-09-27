import { Hero } from "@/components/hero"
import { HowItWorks } from "@/components/how-it-works"
import { ServicesGrid } from "@/components/services-grid"
import { DoctorsCarousel } from "@/components/doctors-carousel"
import { Testimonials } from "@/components/testimonials"

export default function HomePage() {
  return (
    <>
      <Hero />
      <HowItWorks />
      <ServicesGrid />
      <DoctorsCarousel />
      <Testimonials />
    </>
  )
}
