"use client"

import Image from "next/image"
import { Button } from "@/components/ui/button"
import { useEffect, useRef, useState } from "react"

export default function LocationPastors() {
  const [isVisible, setIsVisible] = useState(false)
  const sectionRef = useRef<HTMLElement>(null)

  const pastors = [
    {
      names: "Michael + Jennifer Rodriguez",
      title: "Houston City Pastor",
      location: "HOUSTON LOCATION",
      description:
        "Pastor Michael serves as the Houston Location Pastor at The Encounter Center Church. He is passionate about inspiring people to live their lives for what matters most. Michael and his wife Jennifer live in Houston with their three children, Sofia, Diego, and Isabella. He is a graduate of Houston Baptist University where he earned a master's degree in theology.",
      image:
        "https://res.cloudinary.com/dzckvrvu9/image/upload/v1752758816/WhatsApp-Image-2024-02-19-at-03.16.21_gkmxj0.jpg",
    },
    {
      names: "David + Rebecca Thompson",
      title: "Springfield City Pastor",
      location: "SPRINGFIELD LOCATION",
      description:
        "Pastor David serves as the Springfield Location Pastor at The Encounter Center Church. He is passionate about raising up leaders and inspiring people to live wholeheartedly for the things of God. He and Rebecca have been married for 12 years and have three beautiful children. David and Rebecca are originally from Chicago where they pastored for 8 years before relocating to Springfield.",
      image:
        "https://res.cloudinary.com/dzckvrvu9/image/upload/v1752758812/WhatsApp-Image-2024-02-19-at-03.15.22_iei4jc.jpg",
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
    <section ref={sectionRef} className="bg-gray-50 py-20 px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div
          className={`transition-all duration-1000 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}
        >
          <h2 className="text-6xl lg:text-7xl font-montserrat font-bold text-[#272f31] mb-16">Location Pastors</h2>

          <div className="space-y-20">
            {pastors.map((pastor, index) => (
              <div
                key={index}
                className={`grid lg:grid-cols-2 gap-12 items-center ${index % 2 === 1 ? "lg:grid-flow-col-dense" : ""}`}
              >
                <div className={index % 2 === 1 ? "lg:col-start-2" : ""}>
                  <h3 className="text-4xl lg:text-5xl font-montserrat font-bold text-[#272f31] mb-4">{pastor.names}</h3>
                  <p className="text-[#272f31]/70 font-playfair text-lg mb-6 italic">{pastor.title}</p>
                  <p className="text-[#272f31] font-work-sans text-lg leading-relaxed mb-8">{pastor.description}</p>
                  <Button className="bg-[#0A523B] hover:bg-[#0A523B]/80 text-white font-work-sans font-medium px-6 py-3 rounded-full text-sm tracking-wide">
                    {pastor.location}
                  </Button>
                </div>
                <div className={index % 2 === 1 ? "lg:col-start-1 lg:row-start-1" : ""}>
                  <Image
                    src={pastor.image || "/placeholder.svg"}
                    alt={pastor.names}
                    width={600}
                    height={400}
                    className="rounded-2xl object-cover"
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
