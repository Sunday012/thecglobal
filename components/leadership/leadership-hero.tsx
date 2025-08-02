"use client"

import Image from "next/image"
import { useEffect, useRef, useState } from "react"

export default function LeadershipHero() {
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
    <section ref={sectionRef} className="relative h-screen overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0">
        <Image
          src="/images/building.jpg"
          alt="Jesus Is - Leadership Hero"
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-black/30" />
      </div>

      {/* Content */}
      <div className="relative z-10 h-full flex items-center mt-28">
        <div className="max-w-7xl mx-auto px-6 lg:px-8 w-full">
          <div className="max-w-2xl ml-auto">
            <div
              className={`transition-all duration-1000 ${isVisible ? "opacity-100 translate-x-0" : "opacity-0 translate-x-10"}`}
            >
              <h1 className="text-6xl lg:text-7xl font-montserrat font-bold text-white mb-8 leading-tight">
                Our Leadership
              </h1>
              <p className="text-white font-work-sans text-lg leading-relaxed max-w-xl">
                We may be biased, but we think we have the very best team of people around leading our House week in and
                week out! The Encounter Center Church is led by Pastor John + Sarah Smith, who are supported by an
                incredible team of some of the most gifted, creative, winsome and hard-working people around.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
