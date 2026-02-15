"use client"

import { Button } from "@/components/ui/button"
import Image from "next/image"
import { useEffect, useRef, useState } from "react"
import Link from "next/link"

export default function Leadership() {
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
    <section ref={sectionRef} className="bg-white py-16 px-4 sm:py-20 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div
          className={`transition-all duration-1000 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}
        >
          <div className="flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between mb-10 sm:mb-16">
            <h2 className="text-4xl sm:text-6xl md:text-7xl font-montserrat font-bold tracking-tighter text-[#272f31]">
              Our Pastors
            </h2>
            <Link href="/leadership" className="w-full sm:w-auto">
              <Button className="w-full sm:w-auto bg-[#0A523B] hover:bg-[#0A523B]/80 text-white font-work-sans font-medium px-8 py-3 rounded-full text-sm tracking-wide">
                SEE OUR LEADERSHIP
              </Button>
            </Link>
          </div>

          <div className="grid grid-cols-1 gap-10 lg:grid-cols-2 lg:gap-12 items-center">
            <div>
              <p className="text-[#272f31]/70 font-work-sans text-xs sm:text-sm uppercase tracking-wide mb-2 sm:mb-4">
                GLOBAL PASTOR
              </p>
              <h3 className="text-2xl sm:text-3xl md:text-4xl font-montserrat font-bold text-[#272f31] mb-4 sm:mb-6">
                Pastor Dr. Michael Aladejana
              </h3>
              <p className="text-[#272f31] font-work-sans text-base sm:text-lg leading-relaxed">
                Pastor Dr. Michael Aladejana is the Lead Pastor and founder of The Encounter Center (TEC) and the TEC Leadership & Bible Institute (TLBI). A passionate preacher, teacher, and mentor, he is dedicated to raising Kingdom influencers who are saved, transformed, and sent. Blending ministry and marketplace impact as a medical doctor . Dr. Michael is committed to equipping believers to live out their God-given purpose in every sphere of life
              </p>
            </div>
            <div className="relative w-full h-96 sm:h-[500px] lg:h-[500px]">
              <Image
                src="/images/connect-leader.jpg"
                alt="Pastor Dr. Michael Aladejana"
                fill
                className="rounded-2xl object-cover object-top"
                sizes="(max-width: 1024px) 100vw, 600px"
                priority={false}
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
