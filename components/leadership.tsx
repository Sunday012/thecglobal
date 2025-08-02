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
    <section ref={sectionRef} className="bg-white py-20 px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div
          className={`transition-all duration-1000 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}
        >
          <div className="flex items-center justify-between mb-16">
            <h2 className="text-7xl font-montserrat font-bold tracking-tighter text-[#272f31]">Our Leadership</h2>
            <Link href="/leadership">
              <Button className="bg-[#0A523B] hover:bg-[#0A523B]/80 text-white font-work-sans font-medium px-8 py-3 rounded-full text-sm tracking-wide">
                SEE OUR LEADERSHIP
              </Button>
            </Link>
          </div>

          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <p className="text-[#272f31]/70 font-work-sans text-sm uppercase tracking-wide mb-4">GLOBAL PASTOR</p>
              <h3 className="text-4xl font-montserrat font-bold text-[#272f31] mb-6">Pastor Dr. Michael Aladejana</h3>
              <p className="text-[#272f31] font-work-sans text-lg leading-relaxed">
              Pastor Dr. Michael Aladejana is the Lead Pastor and founder of The Encounter Center (TEC) and the TEC Leadership & Bible Institute (TLBI). A passionate preacher, teacher, and mentor, he is dedicated to raising Kingdom influencers who are saved, transformed, and sent. Blending ministry and marketplace impact as a medical doctor . Dr. Michael is committed to equipping believers to live out their God-given purpose in every sphere of life
              </p>
            </div>
            <div className="relative">
              <Image
                src="https://res.cloudinary.com/dzckvrvu9/image/upload/v1752758813/WhatsApp-Image-2024-02-19-at-03.14.43_zgruwp.jpg"
                alt="Pastor John and Sarah Smith"
                width={600}
                height={400}
                className="rounded-2xl object-cover"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
