"use client"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { useEffect, useRef, useState } from "react"

export default function AboutLocations() {
  const [isVisible, setIsVisible] = useState(false)
  const [currentLocation, setCurrentLocation] = useState(0)
  const sectionRef = useRef<HTMLElement>(null)

  const locations = [
    {
      city: "Houston",
      subtitle: "JOIN US IN HOUSTON",
      description:
        "Located in the heart of Houston, our Sunday gatherings are a space where you and your family can encounter God together, through heartfelt worship, powerful teaching, and genuine community.",
      schedule: [
        "Sunday at 5:30 PM – Worship Gathering",
        "Tuesday at 7:30 PM – Bible Study"
      ],
      callToAction: "Come as you are. There's a seat for you. We can't wait to worship with you!",
      image:
        "/images/houston.jpg",
      address: "15000 Bellaire Blvd Unit W",
    },
    {
      city: "Springfield",
      subtitle: "JOIN US IN SPRINGFIELD",
      description:
        "Located in the heart of Springfield, our Sunday gatherings are a space where you and your family can encounter God together, through heartfelt worship, powerful teaching, and genuine community.",
      schedule: [
        "Sunday at 5:00 PM – Worship Gathering"
      ],
      callToAction: "Come as you are. There's a seat for you. We can't wait to worship with you!",
      image: "/images/springfield.jpg",
      address: "3075 Normandy Rd",
    },
  ]

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

  const nextLocation = () => {
    setCurrentLocation((prev) => (prev + 1) % locations.length)
  }

  const prevLocation = () => {
    setCurrentLocation((prev) => (prev - 1 + locations.length) % locations.length)
  }

  const current = locations[currentLocation]

  return (
    <section ref={sectionRef} className="bg-white py-12 px-4 sm:py-16 sm:px-6 lg:py-20 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div
          className={`transition-all duration-1000 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}
        >
          <h2 className="text-3xl sm:text-5xl md:text-6xl font-montserrat font-bold text-[#272f31] mb-10 sm:mb-14 md:mb-16 text-center lg:text-left">
            Our Cities + Locations
          </h2>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-12">
            <div className="flex flex-col justify-center text-left">
              <p className="text-[#272f31]/70 font-work-sans text-xs sm:text-sm uppercase tracking-wide mb-2 sm:mb-4">
                {current.subtitle}
              </p>
              <h3 className="text-3xl sm:text-4xl md:text-5xl font-rubik font-bold text-[#272f31] mb-4 sm:mb-8">
                {current.city}
              </h3>
              <p className="text-[#272f31] font-work-sans text-base sm:text-lg leading-relaxed mb-4 sm:mb-6">
                {current.description}
              </p>
              
              <div className="mb-4 sm:mb-6">
                <p className="text-[#272f31] font-work-sans font-semibold text-base sm:text-lg mb-2 sm:mb-3">
                  We meet every:
                </p>
                {current.schedule.map((time, index) => (
                  <p key={index} className="text-[#272f31] font-work-sans text-base sm:text-lg mb-1 sm:mb-2">
                    <span className="font-semibold">{time.split(' – ')[0]}</span> – {time.split(' – ')[1]}
                  </p>
                ))}
              </div>
              
              <p className="text-[#272f31] font-work-sans text-base sm:text-lg leading-relaxed">
                {current.callToAction}
              </p>
            </div>
            <div className="relative w-full h-56 sm:h-72 md:h-96 lg:h-auto aspect-[3/2] rounded-2xl overflow-hidden">
              <Image
                src={current.image || "/placeholder.svg"}
                alt={`${current.city} location`}
                fill
                className="object-cover rounded-2xl"
                sizes="(max-width: 1024px) 100vw, 600px"
                priority
              />
            </div>
          </div>

          <div className="flex justify-center space-x-6 sm:space-x-8 mt-8 sm:mt-12">
            <button
              onClick={prevLocation}
              className="p-2 sm:p-3 text-[#272f31]/70 hover:text-[#272f31] transition-colors"
              aria-label="Previous location"
            >
              <ChevronLeft size={28} className="sm:hidden" />
              <ChevronLeft size={32} className="hidden sm:inline" />
            </button>
            <button
              onClick={nextLocation}
              className="p-2 sm:p-3 text-[#272f31]/70 hover:text-[#272f31] transition-colors"
              aria-label="Next location"
            >
              <ChevronRight size={28} className="sm:hidden" />
              <ChevronRight size={32} className="hidden sm:inline" />
            </button>
          </div>
        </div>
      </div>
    </section>
  )
}