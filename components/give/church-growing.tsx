"use client"

import { Button } from "@/components/ui/button"
import Image from "next/image"
import { useEffect, useRef, useState } from "react"

export default function ChurchGrowing() {
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
          <div className="relative rounded-3xl overflow-hidden">
            {/* Background Image */}
            <div className="absolute inset-0">
              <Image
                src="/images/church-night.jpg"
                alt="Aerial view of city"
                fill
                className="object-cover"
              />
              <div className="absolute inset-0 bg-black/50" />
            </div>

            {/* Content */}
            <div className="relative z-10 px-8 lg:px-16 py-16 lg:py-24">
              <div className="max-w-3xl">
                <h2 className="text-5xl lg:text-6xl font-montserrat font-bold text-white mb-8 leading-tight">
                  THE CHURCH IS ALIVE & GROWING STRONGER
                </h2>
                <p className="text-white/90 font-work-sans text-xl leading-relaxed mb-8">
                  Above + Beyond is the opportunity as a House to bring a financial gift above what we normally give so
                  that our House can step into a new season of belief and generosity beyond where we normally could go.
                </p>
                <Button className="bg-[#0A523B] hover:bg-[#0A523B]/80 text-white font-work-sans font-medium px-8 py-4 rounded-full text-lg tracking-wide">
                  Learn More
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
