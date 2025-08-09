"use client"

import Header from "@/components/header"
import AboutHero from "@/components/about/about-hero"
import AboutUs from "@/components/about/about-us"
import AboutLeadership from "@/components/about/about-leadership"
import WhatWeBelieve from "@/components/about/what-we-believe"
import Footer from "@/components/footer"
import AboutLocations from "@/components/about/about-location"
import OurCultureDNA from "@/components/about/our-values"
import VisionMission from "@/components/about/our-history"

export default function AboutPage() {
  return (
    <main className="min-h-screen">
      <Header />
      <AboutHero />
      <WhatWeBelieve />
      <VisionMission />
      <AboutLocations />
      <AboutUs />
      <OurCultureDNA />
      <AboutLeadership />
      <Footer />
    </main>
  )
}
