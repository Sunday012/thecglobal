"use client"

import Header from "@/components/header"
import LeadershipHero from "@/components/leadership/leadership-hero"
import GlobalPastor from "@/components/leadership/global-pastor"
import LocationPastors from "@/components/leadership/location-pastors"
import OurBoard from "@/components/leadership/our-board"
import LeadershipValues from "@/components/leadership/leadership-values"
import Footer from "@/components/footer"

export default function LeadershipPage() {
  return (
    <main className="min-h-screen">
      <Header />
      <LeadershipHero />
      <GlobalPastor />
      <LocationPastors />
      <OurBoard />
      <LeadershipValues />
      <Footer />
    </main>
  )
}
