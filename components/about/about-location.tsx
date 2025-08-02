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
      subtitle: "LOCATED AT THE ENCOUNTER CENTER",
      description:
        "Located in the heart of Houston, our Sunday gatherings are a space for you and your family to join in the fellowship of the people of God, be enriched by the teachings of the Word of God, and lift your voices in joyful song to the praises of God. We gather at 9:30a and 11:45a every Sunday at The Encounter Center.",
      image:
        "/images/houston.jpg",
      address: "15000 Bellaire Blvd Unit W",
    },
    {
      city: "Springfield",
      subtitle: "LOCATED AT THE ENCOUNTER CENTER",
      description:
        "Located in Springfield, Illinois, our Sunday gatherings are a space for you and your family to join in the fellowship of the people of God, be enriched by the teachings of the Word of God, and lift your voices in joyful song to the praises of God. We gather at 9:30a and 11:30a every Sunday at The Encounter Center.",
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
    <section ref={sectionRef} className="bg-white py-20 px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div
          className={`transition-all duration-1000 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}
        >
          <h2 className="text-6xl font-montserrat font-bold text-[#272f31] mb-16">Our Cities + Locations</h2>

          <div className="grid lg:grid-cols-2 gap-12">
            <div>
              <p className="text-[#272f31]/70 font-work-sans text-sm uppercase tracking-wide mb-4">
                {current.subtitle}
              </p>
              <h3 className="text-5xl font-rubik font-bold text-[#272f31] mb-8">{current.city}</h3>
              <p className="text-[#272f31] font-work-sans text-lg leading-relaxed mb-8">{current.description}</p>
              <Button className="bg-[#0A523B] hover:bg-[#0A523B]/80 text-white font-work-sans font-medium px-8 py-3 rounded-full text-sm tracking-wide">
                LEARN MORE
              </Button>
            </div>
            <div className="relative aspect-[3/2] rounded-2xl overflow-hidden">
              <Image
                src={current.image || "/placeholder.svg"}
                alt={`${current.city} location`}
                fill
                className="object-cover rounded-2xl"
                sizes="(min-width: 1024px) 600px, 100vw"
                priority
              />
            </div>
          </div>

          <div className="flex justify-center space-x-8 mt-12">
            <button onClick={prevLocation} className="p-3 text-[#272f31]/70 hover:text-[#272f31] transition-colors">
              <ChevronLeft size={32} />
            </button>
            <button onClick={nextLocation} className="p-3 text-[#272f31]/70 hover:text-[#272f31] transition-colors">
              <ChevronRight size={32} />
            </button>
          </div>
        </div>
      </div>
    </section>
  )
}
