"use client"

import { Button } from "@/components/ui/button"
import Image from "next/image"
import { useEffect, useRef, useState } from "react"

export default function Giving() {
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
    <section ref={sectionRef} className="bg-white py-12 px-4 sm:py-16 sm:px-6 lg:py-20 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div
          className={`grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center transition-all duration-1000 ${isVisible ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-10"}`}
        >
          <div className="relative w-full h-64 sm:h-96 md:h-[500px] lg:h-[700px]">
            <Image
              src="/images/hug.jpg"
              alt="Church community giving"
              fill
              className="rounded-2xl object-cover"
              sizes="(max-width: 1024px) 100vw, 600px"
              priority={false}
            />
          </div>
          <div>
            <h2 className="text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-montserrat tracking-tighter font-bold text-[#272f31] mb-6 sm:mb-8">
              Giving
            </h2>
            <p className="text-[#272f31] font-work-sans text-base sm:text-lg leading-relaxed mb-4 sm:mb-6">
              We believe Jesus is a giver and not a taker. Not only has He given us life and breath, but by His death
              and resurrection, He defeated the sin that would rob us of both. So, when it comes to giving, we believe
              percentages are a thing of the past, and obligation is the wrong approach.
            </p>
            <p className="text-[#272f31] font-work-sans text-base sm:text-lg leading-relaxed mb-6 sm:mb-8">
              Giving is worship—and our worship is a response to the extravagant grace and glory of God.
            </p>
            <div className="space-y-3 sm:space-y-4">
              <Button className="w-full bg-[#0A523B] hover:bg-[#0A523B]/80 h-[48px] sm:h-[52px] text-white font-work-sans font-medium py-3 sm:py-4 rounded-full text-base sm:text-lg tracking-wide">
                Give Now
              </Button>
              <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
                <Button
                  variant="outline"
                  className="flex-1 border-[#272f31] text-[#272f31] hover:bg-[#272f31] hover:text-white font-work-sans font-medium py-3 rounded-full bg-transparent"
                >
                  ADDITIONAL GIVING OPTIONS
                </Button>
                <Button className="flex-1 bg-[#272f31] hover:bg-[#0A523B] text-white font-work-sans font-medium py-3 rounded-full">
                  RETURNING GIVERS
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
