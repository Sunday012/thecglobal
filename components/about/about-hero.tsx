"use client"

import Image from "next/image"
import { useEffect, useRef, useState } from "react"

export default function AboutHero() {
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
      className="bg-white pb-20 px-4 sm:px-6 lg:px-8 min-h-screen flex items-center"
    >
      <div className="w-full max-w-7xl mx-auto mt-44 sm:mt-32 md:mt-40">
        <div
          className={`grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-12 transition-all duration-1000 ${isVisible
              ? "opacity-100 translate-y-0"
              : "opacity-0 translate-y-10"
            }`}
        >
          <div className="flex flex-col justify-center">
            <h1 className="text-6xl sm:text-7xl md:text-8xl lg:text-9xl font-montserrat font-bold text-[#272f31] mb-2 leading-none text-left">
              US
            </h1>
            <div className="space-y-6 flex flex-col items-start">
              <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-6xl font-playfair italic text-[#272f31] leading-tight text-left">
                Real People.
                <br />
                Real Encounters.
                <br />
                Real God.
              </h2>
              <p className="text-[#272f31] font-work-sans text-base sm:text-lg leading-relaxed w-full sm:w-4/5 md:w-3/4 lg:w-[60%] text-left">
                We are a Christ-centered church with one mission:
                To see all men saved, transformed, and sent.
                We exist so people from every background, story, and season can experience the transformative power of God’s love—not religion, not routine. At TEC, every gathering is an invitation to truly know Him. Every moment is sacred. Every heart matters.
                Jesus is the center of it all. We don’t build around personalities or preferences, but around His finished work.
                Our roots are currently in Houston, Texas—and we believe this is just the beginning.
              </p>
            </div>
          </div>
          <div className="relative w-full h-64 sm:h-80 md:h-96 lg:h-auto flex items-center">
            <Image
              src="/images/hands-raised.jpg"
              alt="Church worship with raised hands"
              width={1200}
              height={800}
              className="rounded-2xl object-cover w-full h-full"
              sizes="(max-width: 1024px) 100vw, 50vw"
              priority
            />
          </div>
        </div>
      </div>
    </section>
  )
}
