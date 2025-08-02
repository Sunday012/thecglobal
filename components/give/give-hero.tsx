"use client"

import { Button } from "@/components/ui/button"
import Image from "next/image"
import { useEffect, useRef, useState } from "react"

export default function GiveHero() {
  const [isVisible, setIsVisible] = useState(false)
  const sectionRef = useRef<HTMLElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
        }
      },
      { threshold: 0.1 },
    )

    if (sectionRef.current) {
      observer.observe(sectionRef.current)
    }

    return () => observer.disconnect()
  }, [])

  return (
    <section ref={sectionRef} className="relative min-h-screen flex items-center justify-center px-6 lg:px-8 py-20">
      {/* Background Image */}
      <div className="absolute inset-0">
        <Image
          src="/images/generosity.jpg"
          alt="Worship with raised hands"
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-r from-amber-200/30 to-orange-300/30" />
      </div>

      {/* Content Card */}
      <div className="relative z-10 max-w-7xl mx-auto w-full mt-32 flex justify-end">
        <div
          className={`bg-white rounded-3xl p-8 lg:p-12 max-w-lg shadow-2xl transition-all duration-1000 ${isVisible ? "opacity-100 translate-x-0" : "opacity-0 translate-x-10"}`}
        >
          <h1 className="text-4xl lg:text-5xl font-montserrat font-bold text-[#272f31] mb-6 leading-tight">
            Heartbeat of Generosity
          </h1>
          <p className="text-[#272f31]/80 font-work-sans text-lg leading-relaxed mb-8">
            God is moving in powerful ways in our midst. Thank you for being a part of all that He is doing in and
            through our House in these days.
          </p>
          <Button className="bg-[#0A523B] hover:bg-[#0A523B]/80 text-white font-work-sans font-medium px-8 py-4 rounded-full text-lg tracking-wide">
            GIVE ONLINE
          </Button>
        </div>
      </div>
    </section>
  )
}
