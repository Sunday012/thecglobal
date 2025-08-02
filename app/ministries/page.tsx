"use client"

import Header from "@/components/header"
import MinistriesHero from "@/components/ministries/ministries-hero"
import WeAreJesusChurch from "@/components/ministries/we-are-jesus-church"
import UpcomingEvents from "@/components/ministries/upcoming-events"
import NextSteps from "@/components/ministries/next-steps"
import LocationSelector from "@/components/ministries/location-selector"
import FamilyMinistries from "@/components/ministries/family-ministries"
import CareMinistries from "@/components/ministries/care-ministries"
import Footer from "@/components/footer"

export default function MinistriesPage() {
  return (
    <main className="min-h-screen">
      <Header />
      <MinistriesHero />
      <WeAreJesusChurch />
      <UpcomingEvents />
      <NextSteps />
      <LocationSelector />
      <FamilyMinistries />
      <CareMinistries />
      <Footer />
    </main>
  )
}
