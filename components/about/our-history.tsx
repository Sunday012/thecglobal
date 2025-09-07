"use client"
import Image from "next/image"
import { useEffect, useRef, useState } from "react"

export default function VisionMission() {
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
    <section
      ref={sectionRef}
      className="bg-white py-12 px-4 sm:py-16 sm:px-6 lg:py-20 lg:px-8"
    >
      <div className="max-w-7xl mx-auto">
        <div
          className={`transition-all duration-1000 ${
            isVisible
              ? "opacity-100 translate-y-0"
              : "opacity-0 translate-y-10"
          }`}
        >
          <h2 className="text-3xl sm:text-5xl md:text-6xl font-montserrat font-bold text-[#272f31] mb-8 sm:mb-12 md:mb-16 text-center">
            Our Vision & Mission
          </h2>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-12">
            <div>
              <div className="space-y-10 sm:space-y-12">
                {/* Vision Section */}
                <div>
                  <h3 className="text-2xl sm:text-3xl font-rubik font-bold text-[#272f31] mb-4 sm:mb-6">
                    Our Vision
                  </h3>
                  <div className="space-y-4 sm:space-y-6 text-[#272f31] font-work-sans text-base sm:text-lg leading-relaxed">
                    <p>
                      To see lives radically transformed by the presence of God and the power of the Gospel.
                    </p>
                    <p>
                      We envision a global movement of believers who are deeply rooted in Christ, walking in truth, 
                      filled with the Spirit, and sent into the world to reveal Jesus in every sphere of life.
                    </p>
                    <p>
                      We see churches, campuses, cities, and nations awakened by revival, one encounter at a time.
                    </p>
                  </div>
                </div>

                {/* Mission Section */}
                <div>
                  <h3 className="text-2xl sm:text-3xl font-rubik font-bold text-[#272f31] mb-4 sm:mb-6">
                    Our Mission
                  </h3>
                  <div className="space-y-4 sm:space-y-6 text-[#272f31] font-work-sans text-base sm:text-lg leading-relaxed">
                    <p className="font-semibold">
                      To see all men saved, transformed, and sent.
                    </p>
                    <p>
                      We exist to lead people into real encounters with Jesus, disciple them through the Word and Spirit, 
                      and equip them to live out their Kingdom assignment, locally and globally.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="relative w-full h-64 sm:h-80 md:h-[400px] lg:h-[500px] flex items-center">
              <Image
                src="/images/believe-two.jpg"
                alt="Church community gathering"
                fill
                className="rounded-2xl object-cover w-full h-full"
                sizes="(min-width: 1024px) 600px, 100vw"
                priority
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}