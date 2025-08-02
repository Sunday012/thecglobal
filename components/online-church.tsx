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
    <section ref={sectionRef} className="py-20 px-6 lg:px-16">
      <div className="max-w-7xl mx-auto bg-[#FAE8A1] rounded-2xl">
        <div
          className={`grid lg:grid-cols-2 gap-12 items-center transition-all duration-1000 ${isVisible ? "opacity-100 translate-x-0" : "opacity-0 translate-x-10"}`}
        >
          <div className="h-full flex flex-col items-end">
            <h2 className="text-9xl font-montserrat font-bold text-[#272f31] mb-4 -mt-10">Join Us</h2>
            <h3 className="text-6xl font-playfair non-italic text-[#272f31] mb-8">
              in Church <span className="italic">Online</span>
            </h3>
            <p className="text-[#272f31] font-work-sans text-lg leading-relaxed mb-8 px-4 text-end">
            Be part of TEC wherever you are. Join our live services,and grow in faith from anywhere in the world.
Sundays at 5:30 PM (Houston) | 5:00 PM (Springfield)
            </p>
            <Button
              asChild
              className="bg-[#0A523B] hover:bg-[#0A523B]/80 text-white font-work-sans font-medium px-8 py-4 rounded-full text-lg tracking-wide"
            >
              <a href="/contact">Contact Us</a>
            </Button>
          </div>
          <div className="relative -mt-10 w-[500px] h-[600px]">
            <Image
              src="/images/church-sound.jpg"
              alt="Online church service"
              width={800}
              height={800}
              className="rounded-2xl object-cover h-full w-full"
            />
          </div>
        </div>
      </div>
    </section>
  )
}
