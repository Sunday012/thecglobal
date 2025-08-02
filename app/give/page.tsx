"use client"

import Header from "@/components/header"
import GiveHero from "@/components/give/give-hero"
import WhyWeGive from "@/components/give/why-we-give"
import WaysToGive from "@/components/give/ways-to-give"
import ChurchGrowing from "@/components/give/church-growing"
import GivingFAQ from "@/components/give/giving-faq"
import Footer from "@/components/footer"

export default function GivePage() {
  return (
    <main className="min-h-screen">
      <Header />
      <GiveHero />
      <WhyWeGive />
      <WaysToGive />
      <ChurchGrowing />
      <GivingFAQ />
      <Footer />
    </main>
  )
}
