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
              src="https://res.cloudinary.com/dzckvrvu9/image/upload/v1752758817/WhatsApp-Image-2024-02-19-at-03.15.04-1536x1023_ewhb3o.jpg"
              alt="Pastor John and Sarah Smith"
              width={600}
              height={500}
              className="rounded-2xl object-cover"
            />
          </div>
          <div>
            <p className="text-[#272f31]/70 font-playfair text-lg mb-4 italic">Global Pastor</p>
            <h2 className="text-5xl lg:text-6xl font-montserrat font-bold text-[#272f31] mb-8 leading-tight">
              John + Sarah Smith
            </h2>
            <p className="text-[#272f31] font-work-sans text-lg leading-relaxed">
              Pastor John is the Visionary Architect and Director of The Encounter Center, comprised of Encounter
              Conferences, The Encounter Center Church, Encounter Publishing and sixstepsrecords, and the founder of
              Encounter Global Institute. Sarah is the Chief Strategist, Director of Operations and Artist Management
              for sixstepsrecords, co-founder of the Encounter Movement, and leads The GROVE, a gathering for the women
              of Houston and Springfield.
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}
