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
    <section ref={sectionRef} className="bg-[#FAE8A1] py-20 px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div
          className={`grid lg:grid-cols-2 gap-12 items-center transition-all duration-1000 ${isVisible ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-10"}`}
        >
          <div className="relative">
            <Image
              src="https://res.cloudinary.com/dzckvrvu9/image/upload/v1752758816/WhatsApp-Image-2024-02-19-at-03.16.21_gkmxj0.jpg"
              alt="Church community giving"
              width={600}
              height={400}
              className="rounded-2xl object-cover"
            />
          </div>
          <div>
            <h2 className="text-6xl font-rubik font-bold text-[#272f31] mb-8">Giving</h2>
            <p className="text-[#272f31] font-work-sans text-lg leading-relaxed mb-6">
              We believe Jesus is a giver and not a taker. Not only has He given us life and breath, but by His death
              and resurrection, He defeated the sin that would rob us of both. So, when it comes to giving, we believe
              percentages are a thing of the past, and obligation is the wrong approach.
            </p>
            <p className="text-[#272f31] font-work-sans text-lg leading-relaxed mb-8">
              Giving is worship—and our worship is a response to the extravagant grace and glory of God.
            </p>
            <div className="space-y-4">
              <Button className="w-full bg-[#0A523B] hover:bg-[#0A523B]/80 text-white font-work-sans font-medium py-4 rounded-full text-lg tracking-wide">
                Give Now
              </Button>
              <div className="flex space-x-4">
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
