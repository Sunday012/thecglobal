"use client"

import { Button } from "@/components/ui/button"
import { useEffect, useRef, useState } from "react"

export default function CareMinistries() {
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
    <section ref={sectionRef} className="bg-white py-16 px-4 sm:py-20 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div
          className={`grid grid-cols-1 lg:grid-cols-2 gap-8 sm:gap-12 items-center transition-all duration-1000 ${isVisible ? "opacity-100 translate-x-0" : "opacity-0 translate-x-10"}`}
        >
          <div>
            <p className="text-gray-500 font-work-sans text-xs sm:text-sm mb-2 sm:mb-4 uppercase tracking-wide">Care</p>
            <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-rubik font-bold text-gray-800 mb-4 sm:mb-8">We Are For People</h2>
            <p className="text-gray-600 font-work-sans text-base sm:text-lg leading-relaxed mb-6 sm:mb-8">
              Our heart is to resource people with the necessary next steps. We have partnered with ministries,
              organizations, and counselors in our area who are trained to meet needs beyond our scope of expertise. We
              invite you to share a care request, a prayer request, or tell us a Jesus story.
            </p>
            <Button className="bg-[#0A523B] hover:bg-[#0A523B]/80 text-white font-work-sans font-medium px-4 sm:px-6 py-2 sm:py-3 rounded-full text-xs sm:text-sm tracking-wide">
              Learn More
            </Button>
          </div>
          <div className="relative h-60 sm:h-80 md:h-96 rounded-2xl overflow-hidden">
            <img
              src="/images/pastors.jpg"
              alt="Care and Support"
              className="object-cover w-full h-full"
            />
          </div>
        </div>
      </div>
    </section>
  )
}
