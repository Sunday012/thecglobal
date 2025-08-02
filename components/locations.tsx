"use client"

import Image from "next/image"
import { useEffect, useRef, useState } from "react"

export default function Locations() {
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
          className={`transition-all duration-1000 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}
        >
          <h2 className="text-6xl font-montserrat font-bold text-[#272f31] mb-4">
            Select a <em className="font-playfair italic">City</em>
          </h2>
          <p className="text-[#272f31] font-work-sans text-lg mb-16 max-w-3xl">
            Our roots are in Houston and Springfield though we consider the world our neighborhood. Select a city below
            to join us in person.
          </p>

          <div className="grid lg:grid-cols-2 gap-8">
            <div className="relative group cursor-pointer">
              <div className="relative aspect-[4/5] rounded-2xl overflow-hidden">
                <Image
                  src="/images/houston.jpg"
                  alt="Houston"
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                <div className="absolute bottom-8 left-8">
                  <h3 className="text-white font-rubik font-bold text-4xl">Houston</h3>
                  <p className="text-white/80 font-work-sans text-lg mt-2">15000 Bellaire Blvd Unit W</p>
                </div>
              </div>
            </div>

            <div className="relative group cursor-pointer">
              <div className="relative aspect-[4/5] rounded-2xl overflow-hidden">
                <Image
                  src="/images/springfield.jpg"
                  alt="Springfield"
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                <div className="absolute bottom-8 left-8">
                  <h3 className="text-white font-rubik font-bold text-4xl">Springfield</h3>
                  <p className="text-white/80 font-work-sans text-lg mt-2">3075 Normandy Rd</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
