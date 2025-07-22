"use client"

import Image from "next/image"
import { Button } from "@/components/ui/button"
import { useEffect, useRef, useState } from "react"

export default function WhatWeBelieve() {
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
              src="https://res.cloudinary.com/dzckvrvu9/image/upload/v1752758815/WhatsApp-Image-2024-02-19-at-03.15.59_yr6rbv.jpg"
              alt="Pastor speaking at podium"
              width={600}
              height={400}
              className="rounded-2xl object-cover"
            />
          </div>
          <div>
            <p className="text-[#272f31]/70 font-work-sans text-sm uppercase tracking-wide mb-4">
              Our Theological Truths
            </p>
            <h2 className="text-5xl font-rubik font-bold text-[#272f31] mb-8">What We Believe</h2>
            <p className="text-[#272f31] font-work-sans text-lg leading-relaxed mb-8">
              We live in shifting times but are rooted in eternal truths, the teachings of Holy Scripture. Here at The
              Encounter Center Church we are guided by certain foundational beliefs and shaping values.
            </p>
            <Button className="bg-[#0A523B] hover:bg-[#0A523B]/80 text-white font-work-sans font-medium px-8 py-3 rounded-full text-sm tracking-wide">
              LEARN MORE
            </Button>
          </div>
        </div>
      </div>
    </section>
  )
}
