"use client"

import Image from "next/image"
import { Button } from "@/components/ui/button"
import { useEffect, useRef, useState } from "react"

export default function AboutUs() {
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
    <section ref={sectionRef} className="relative py-20 px-6 lg:px-8 overflow-hidden">
      <div className="absolute inset-0">
        <Image
          src="https://res.cloudinary.com/dzckvrvu9/image/upload/v1752758813/WhatsApp-Image-2024-02-19-at-03.16.43_flkzu9.jpg"
          alt="Church interior with worship"
          fill
          className="object-cover"
        />
        <div className="absolute inset-0 bg-black/50" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto">
        <div
          className={`max-w-2xl transition-all duration-1000 ${isVisible ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-10"}`}
        >
          <p className="text-white/80 font-work-sans text-lg mb-4">We are a Jesus Church</p>
          <h2 className="text-8xl font-rubik font-bold text-white mb-8 leading-none">US</h2>
          <p className="text-white/90 font-work-sans text-lg leading-relaxed mb-8 max-w-xl">
            Our church is more than a place, it's a people in every place living for the One whose fame outshines every
            name. This is US. The core values + standards that guide our tribe in everything we do.
          </p>
          <Button className="bg-[#0A523B] hover:bg-[#0A523B]/80 text-white font-work-sans font-medium px-8 py-4 rounded-full text-lg tracking-wide">
            Download US booklet
          </Button>
        </div>
      </div>
    </section>
  )
}
