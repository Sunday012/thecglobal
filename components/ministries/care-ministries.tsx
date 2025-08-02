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
    <section ref={sectionRef} className="bg-white py-20 px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div
          className={`grid lg:grid-cols-2 gap-12 items-center transition-all duration-1000 ${isVisible ? "opacity-100 translate-x-0" : "opacity-0 translate-x-10"}`}
        >
          <div>
            <p className="text-gray-500 font-work-sans text-sm mb-4 uppercase tracking-wide">Care</p>
            <h2 className="text-6xl font-rubik font-bold text-gray-800 mb-8">We Are For People</h2>
            <p className="text-gray-600 font-work-sans text-lg leading-relaxed mb-8">
              Our heart is to resource people with the necessary next steps. We have partnered with ministries,
              organizations, and counselors in our area who are trained to meet needs beyond our scope of expertise. We
              invite you to share a care request, a prayer request, or tell us a Jesus story.
            </p>
            <Button className="bg-[#0A523B] hover:bg-[#0A523B]/80 text-white font-work-sans font-medium px-6 py-3 rounded-full text-sm tracking-wide">
              Learn More
            </Button>
          </div>
          <div className="relative">
            <div className="bg-gray-50 border border-gray-100 rounded-2xl p-8 h-96 flex items-center justify-center">
              <div className="text-center">
                <div className="w-16 h-16 bg-gray-200 rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg className="w-8 h-8 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
                    />
                  </svg>
                </div>
                <h3 className="text-2xl font-rubik font-bold text-gray-800 mb-2">Care & Support</h3>
                <p className="text-gray-600 font-work-sans">
                  We're here to walk alongside you in every season of life.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
