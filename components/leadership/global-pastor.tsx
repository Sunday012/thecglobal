"use client"

import Image from "next/image"
import { useEffect, useRef, useState } from "react"

export default function GlobalPastor() {
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
          className={`grid lg:grid-cols-2 gap-12 transition-all duration-1000 ${isVisible ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-10"}`}
        >
<div className="relative h-96 md:h-[700px]">
  <Image
    src="https://res.cloudinary.com/dzckvrvu9/image/upload/v1752758813/WhatsApp-Image-2024-02-19-at-03.14.43_zgruwp.jpg"
    alt="Pastor John and Sarah Smith"
    width={600}
    height={800}
    className="rounded-2xl object-cover w-full h-full"  // Added w-full h-full
  />
</div>
          <div>
            <p className="text-[#272f31]/70 font-playfair text-lg mb-4 italic">Global Pastor</p>
            <h2 className="text-5xl lg:text-6xl font-montserrat font-bold text-[#272f31] mb-8 leading-tight">
            Pastor Dr. Michael Aladejana
            </h2>
            <p className="text-[#272f31] font-work-sans text-lg leading-relaxed">
Dr. Michael Aladejana is the Lead Pastor and founder of The Encounter Center (TEC) and the TEC Leadership & Bible Institute (TLBI) , a thriving, Spirit-led movement committed to the transformation and sending of Kingdom influencers into every sphere of society.
He is a passionate preacher, teacher, and mentor with a burning heart for the Gospel. His message is clear: salvation, transformation, and purpose. With a unique grace to blend ministry and marketplace, Dr. Michael is also a practicing medical doctor, committed to demonstrating the power of God both in the church and in the culture.
Driven by a divine mandate to equip believers to live boldly, love deeply, and lead fearlessly, he continues to raise men and women who know their identity in Christ and walk in the authority of the Kingdom.
He is joyfully married to Pastor Christabel Aladejana, and together they serve as a dynamic force, building lives, shaping destinies, and pointing a generation back to Jesus.
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}
