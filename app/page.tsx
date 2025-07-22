"use client"

import { useState, useEffect } from "react"
import SplashScreen from "@/components/splash-screen"
import Header from "@/components/header"
import Hero from "@/components/hero"
import Locations from "@/components/locations"
import OnlineChurch from "@/components/online-church"
import Leadership from "@/components/leadership"
import EquipSection from "@/components/equip-section"
import Newsletter from "@/components/newsletter"
import Giving from "@/components/giving"
import Movement from "@/components/movement"
import Footer from "@/components/footer"

export default function HomePage() {
  const [showSplash, setShowSplash] = useState(true)

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowSplash(false)
    }, 3000)

    return () => clearTimeout(timer)
  }, [])

  if (showSplash) {
    return <SplashScreen />
  }

  return (
    <main className="min-h-screen">
      <Header />
      <Hero />
      <Locations />
      <OnlineChurch />
      <Leadership />
      <EquipSection />
      <Newsletter />
      <Giving />
      <Movement />
      <Footer />
    </main>
  )
}
