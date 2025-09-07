"use client"

import Image from "next/image"
import { Button } from "@/components/ui/button"
import { useEffect, useRef, useState } from "react"

export default function AboutLeadership() {
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
    <section
      ref={sectionRef}
      className="bg-white py-12 px-4 sm:py-16 sm:px-6 lg:py-20 lg:px-8"
    >
      <div className="max-w-7xl mx-auto">
        <div
          className={`grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-12 items-center transition-all duration-1000 ${
            isVisible
              ? "opacity-100 translate-x-0"
              : "opacity-0 -translate-x-10"
          }`}
        >
          <div className="relative w-full h-64 sm:h-80 md:h-[400px] lg:h-[500px] flex items-center">
            <Image
              src="https://res.cloudinary.com/dzckvrvu9/image/upload/v1752758813/WhatsApp-Image-2024-02-19-at-03.14.43_zgruwp.jpg"
              alt="Pastor John and Sarah Smith"
              fill
              className="rounded-2xl object-cover object-center"
              sizes="(min-width: 1024px) 600px, 100vw"
              priority
            />
          </div>
          <div>
            <p className="text-[#272f31]/70 font-work-sans text-xs sm:text-sm uppercase tracking-wide mb-2 sm:mb-4">
              Our Leadership
            </p>
            <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-rubik font-bold text-[#272f31] mb-4 sm:mb-8">
              Pastor Dr. Michael Aladejana
            </h2>
            <p className="text-[#272f31] font-work-sans text-base sm:text-lg leading-relaxed mb-6 sm:mb-8">
              Pastor Dr. Michael Aladejana is the Lead Pastor and founder of The Encounter Center (TEC) and the TEC Leadership & Bible Institute (TLBI). A passionate preacher, teacher, and mentor, he is dedicated to raising Kingdom influencers who are saved, transformed, and sent. Blending ministry and marketplace impact as a medical doctor . Dr. Michael is committed to equipping believers to live out their God-given purpose in every sphere of life
            </p>
            <Button className="bg-[#0A523B] hover:bg-[#0A523B]/80 text-white font-work-sans font-medium px-8 py-3 rounded-full text-sm tracking-wide w-full sm:w-auto">
              SEE OUR LEADERSHIP
            </Button>
          </div>
        </div>
      </div>
    </section>
  )
}
