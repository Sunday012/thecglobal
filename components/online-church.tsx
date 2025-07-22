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
    <section ref={sectionRef} className="bg-[#FAE8A1] py-20 px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div
          className={`grid lg:grid-cols-2 gap-12 items-center transition-all duration-1000 ${isVisible ? "opacity-100 translate-x-0" : "opacity-0 translate-x-10"}`}
        >
          <div>
            <h2 className="text-6xl font-rubik font-bold text-[#272f31] mb-4">Join Us</h2>
            <h3 className="text-4xl font-rubik italic text-[#272f31] mb-8">
              in Church <span className="font-rubik not-italic">Online</span>
            </h3>
            <p className="text-[#272f31] font-work-sans text-lg leading-relaxed mb-8">
              Join us every Sunday at 9:30a and 11:45a for our Houston Gatherings or 9:30a and 11:30a for our
              Springfield Gatherings at encounter.online.
            </p>
            <Button
              asChild
              className="bg-[#0A523B] hover:bg-[#0A523B]/80 text-white font-work-sans font-medium px-8 py-4 rounded-full text-lg tracking-wide"
            >
              <a href="/contact">Contact Us</a>
            </Button>
          </div>
          <div className="relative">
            <Image
              src="/placeholder.svg?height=400&width=600"
              alt="Online church service"
              width={600}
              height={400}
              className="rounded-2xl object-cover"
            />
          </div>
        </div>
      </div>
    </section>
  )
}
