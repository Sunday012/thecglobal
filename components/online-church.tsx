"use client"

import { Button } from "@/components/ui/button"
import Image from "next/image"
import { useEffect, useRef, useState } from "react"

export default function OnlineChurch() {
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
    <section ref={sectionRef} className="py-16 px-4 sm:py-20 sm:px-6 lg:px-16">
      <div className="max-w-7xl mx-auto bg-[#FAE8A1] rounded-2xl">
        <div
          className={`grid grid-cols-1 lg:grid-cols-2 gap-8 sm:gap-12 items-center transition-all duration-1000 ${isVisible ? "opacity-100 translate-x-0" : "opacity-0 translate-x-10"}`}
        >
          <div className="h-full flex flex-col items-start sm:items-end">
            <h2 className="text-4xl sm:text-6xl md:text-7xl lg:text-9xl font-montserrat font-bold text-[#272f31] mb-2 sm:mb-4 -mt-0 sm:-mt-10">
              Join Us
            </h2>
            <h3 className="text-2xl sm:text-4xl md:text-5xl lg:text-6xl font-playfair non-italic text-[#272f31] mb-4 sm:mb-8">
              in Church <span className="italic">Online</span>
            </h3>
            <p className="text-[#272f31] font-work-sans text-base sm:text-lg leading-relaxed mb-6 sm:mb-8 px-0 sm:px-4 text-start md:text-end">
              Be part of TEC wherever you are. Join our live services, and grow in faith from anywhere in the world.
              <br />
              Sundays at 5:30 PM (Houston) | 5:00 PM (Springfield)
            </p>
            <div className="flex flex-col sm:flex-row items-start md:items-end gap-4 w-full sm:w-auto">
              <Button
                asChild
                className="bg-[#0A523B] h-[44px] sm:h-[48px] hover:bg-[#0A523B]/80 text-white font-work-sans font-medium px-6 sm:px-8 py-3 sm:py-4 rounded-full text-base sm:text-lg tracking-wide"
              >
                <a href="/contact">Watch Online</a>
              </Button>
              <Button
                asChild
                className="bg-[#F7B32B] h-[44px] sm:h-[48px] hover:bg-[#F7B32B]/80 text-[#272f31] font-work-sans font-medium px-6 sm:px-8 py-3 sm:py-4 rounded-full text-base sm:text-lg tracking-wide mt-2 sm:mt-0"
              >
                <a href="/plan-visit">Plan Your Visit</a>
              </Button>
            </div>
          </div>
          <div className="relative mt-8 sm:mt-0 w-full h-[320px] sm:w-[400px] sm:h-[400px] md:w-[500px] md:h-[600px] mx-auto">
            <Image
              src="/images/church-sound.jpg"
              alt="Online church service"
              fill
              className="rounded-2xl object-cover"
              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 500px"
              priority={false}
            />
          </div>
        </div>
      </div>
    </section>
  )
}
