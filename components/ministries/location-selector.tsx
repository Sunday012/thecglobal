"use client"

import { Button } from "@/components/ui/button"
import Image from "next/image"
import { useEffect, useRef, useState } from "react"

export default function LocationSelector() {
  const [isVisible, setIsVisible] = useState(false)
  const sectionRef = useRef<HTMLElement>(null)

  const locations = [
    {
      name: "Houston",
      address: "15000 Bellaire Blvd Unit W, Houston, TX 77083",
      neighborhood: "Located near Southwest Houston",
      times: ["9:30A", "11:45A"],
      image:
        "https://res.cloudinary.com/dzckvrvu9/image/upload/v1752758811/WhatsApp-Image-2024-02-19-at-03.17.40-1536x1023_m1hzhh.jpg",
    },
    {
      name: "Springfield",
      address: "3075 Normandy Rd, Springfield, IL 62703",
      neighborhood: "Located near North Springfield",
      times: ["9:30A", "11:30A"],
      image: "/placeholder.svg?height=300&width=500",
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

  return (
    <section ref={sectionRef} className="bg-white py-20 px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div
          className={`transition-all duration-1000 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}
        >
          <h2 className="text-6xl font-rubik font-bold text-gray-800 mb-16">Select Your Location</h2>

          <div className="grid md:grid-cols-2 gap-8">
            {locations.map((location, index) => (
              <div
                key={index}
                className={`bg-white border border-gray-100 rounded-2xl overflow-hidden group cursor-pointer transition-all duration-500 hover:shadow-lg hover:-translate-y-2 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}
                style={{ transitionDelay: `${index * 200}ms` }}
              >
                <div className="relative aspect-[4/3]">
                  <Image
                    src={location.image || "/placeholder.svg"}
                    alt={location.name}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute top-4 left-4">
                    <span className="bg-white/90 text-gray-700 px-3 py-1 rounded-full text-sm font-work-sans">
                      THIS WEEK
                    </span>
                  </div>
                  <div className="absolute top-4 right-4 flex gap-2">
                    {location.times.map((time, timeIndex) => (
                      <span
                        key={timeIndex}
                        className="bg-white/90 text-gray-700 px-3 py-1 rounded-full text-sm font-work-sans"
                      >
                        {time}
                      </span>
                    ))}
                  </div>
                </div>
                <div className="p-6">
                  <h3 className="text-3xl font-rubik font-bold text-gray-800 mb-2">{location.name}</h3>
                  <p className="text-gray-600 font-work-sans text-lg mb-1">{location.address}</p>
                  <p className="text-gray-500 font-work-sans text-sm mb-6">{location.neighborhood}</p>
                  <Button className="w-full bg-[#0A523B] hover:bg-[#0A523B]/80 text-white font-work-sans font-medium py-3 rounded-full text-sm tracking-wide">
                    VIEW LOCATION
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
