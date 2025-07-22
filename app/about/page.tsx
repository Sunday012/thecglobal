"use client"

import Header from "@/components/header"
import AboutHero from "@/components/about/about-hero"
import AboutUs from "@/components/about/about-us"
import OurValues from "@/components/about/our-values"
import AboutLeadership from "@/components/about/about-leadership"
import OurHistory from "@/components/about/our-history"
import WhatWeBelieve from "@/components/about/what-we-believe"
import Footer from "@/components/footer"
import AboutLocations from "@/components/about/about-location"

export default function AboutPage() {
  return (
    <main className="min-h-screen">
      <Header />
      <AboutHero />
      <WhatWeBelieve />
      <OurHistory />
      <AboutLocations />
      <AboutUs />
      <OurValues />
      <AboutLeadership />
      <Footer />
    </main>
  )
}
