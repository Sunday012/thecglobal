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
    <section ref={sectionRef} className="bg-white py-20 px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div
          className={`transition-all duration-1000 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}
        >
          <h2 className="text-6xl font-montserrat font-bold text-[#272f31] mb-16 text-center">Our Vision & Mission</h2>
          
          <div className="grid lg:grid-cols-2 gap-12">
            <div>
              <div className="space-y-12">
                {/* Vision Section */}
                <div>
                  <h3 className="text-3xl font-rubik font-bold text-[#272f31] mb-6">
                    Our Vision
                  </h3>
                  <div className="space-y-6 text-[#272f31] font-work-sans text-lg leading-relaxed">
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
                  <h3 className="text-3xl font-rubik font-bold text-[#272f31] mb-6">
                    Our Mission
                  </h3>
                  <div className="space-y-6 text-[#272f31] font-work-sans text-lg leading-relaxed">
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

            <div className="h-96 md:h-[500px] relative">
              <Image
                src="https://res.cloudinary.com/dzckvrvu9/image/upload/v1752758812/WhatsApp-Image-2024-02-19-at-03.15.22_iei4jc.jpg"
                alt="Church community gathering"
                width={600}
                height={800}
                className="rounded-2xl object-cover w-full h-full"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}