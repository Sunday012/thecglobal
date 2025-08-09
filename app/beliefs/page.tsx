"use client"

import Header from "@/components/header"
import Footer from "@/components/footer"
import BeliefsHero from "@/components/about/beliefs/beliefs-hero"
import CoreBeliefs from "@/components/about/beliefs/core-beliefs"
import ChristianPractices from "@/components/about/beliefs/christian-practices"
import EternalTruths from "@/components/about/beliefs/eternal-truths"

export default function BeliefsPage() {
  return (
    <main className="min-h-screen">
      <Header />
      <BeliefsHero />
      <CoreBeliefs />
      <ChristianPractices />
      <EternalTruths />
      <Footer />
    </main>
  )
}
