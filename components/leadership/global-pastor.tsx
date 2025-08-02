"use client"

import Image from "next/image"
import { useEffect, useRef, useState } from "react"

export default function GlobalPastor() {
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
          className={`grid lg:grid-cols-2 gap-12 items-center transition-all duration-1000 ${isVisible ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-10"}`}
        >
          <div className="relative">
            <Image
              src="https://res.cloudinary.com/dzckvrvu9/image/upload/v1752758813/WhatsApp-Image-2024-02-19-at-03.14.43_zgruwp.jpg"
              alt="Pastor John and Sarah Smith"
              width={600}
              height={500}
              className="rounded-2xl object-cover"
            />
          </div>
          <div>
            <p className="text-[#272f31]/70 font-playfair text-lg mb-4 italic">Global Pastor</p>
            <h2 className="text-5xl lg:text-6xl font-montserrat font-bold text-[#272f31] mb-8 leading-tight">
            Pastor Dr. Michael Aladejana
            </h2>
            <p className="text-[#272f31] font-work-sans text-lg leading-relaxed">
            Pastor Dr. Michael Aladejana is the Lead Pastor and founder of The Encounter Center (TEC) and the TEC Leadership & Bible Institute (TLBI). A passionate preacher, teacher, and mentor, he is dedicated to raising Kingdom influencers who are saved, transformed, and sent. Blending ministry and marketplace impact as a medical doctor . Dr. Michael is committed to equipping believers to live out their God-given purpose in every sphere of life.
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}
