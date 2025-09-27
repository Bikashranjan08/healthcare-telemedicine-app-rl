import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import { GeistMono } from "geist/font/mono"
import { Analytics } from "@vercel/analytics/next"
import "./globals.css"
import { I18nProvider } from "@/components/i18n-provider"
import { SiteHeader } from "@/components/site-header"
import { SiteFooter } from "@/components/site-footer"
import { Suspense } from "react"

export const metadata: Metadata = {
  title: "Sehat Saathi Connect",
  description:
    "A comprehensive health platform connecting patients, doctors, and ASHA workers for consultations, records, and emergency support.",
  generator: "v0.app",
}

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-inter",
})

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className={`${inter.variable} ${GeistMono.variable} antialiased`}>
      <body className="font-sans bg-background text-foreground">
        <Suspense fallback={<div>Loading...</div>}>
          <I18nProvider>
            <SiteHeader />
            <main className="min-h-[calc(100dvh-240px)]">{children}</main>
            <SiteFooter />
          </I18nProvider>
        </Suspense>
        <Analytics />
      </body>
    </html>
  )
}
