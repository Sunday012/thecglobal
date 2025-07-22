"use client"

import Image from "next/image"
import { useEffect, useRef, useState } from "react"

export default function AboutHero() {
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
    <section ref={sectionRef} className="bg-[#FAE8A1] py-20 px-6 lg:px-8 min-h-screen flex items-center">
      <div className="max-w-7xl mx-auto">
        <div
          className={`grid lg:grid-cols-2 gap-12 items-center transition-all duration-1000 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}
        >
          <div>
            <h1 className="text-8xl lg:text-9xl font-rubik font-bold text-[#272f31] mb-8 leading-none">US</h1>
            <div className="space-y-6">
              <h2 className="text-4xl lg:text-5xl font-rubik italic text-[#272f31] leading-tight">
                Glory of God.
                <br />
                Radical Grace.
                <br />
                Extravagant
                <br />
                Worship.
              </h2>
              <p className="text-[#272f31] font-work-sans text-lg leading-relaxed max-w-xl">
                We are a Jesus Church. A small tribe of His followers connected by our common faith and a deep desire to
                see our cities [Houston and Springfield] come to know His power and beauty. We are not perfect. But
                Jesus is. Thankfully, we are a Jesus church and want to gather in worship and scatter to shine His light
                and love throughout our communities and beyond.
              </p>
            </div>
          </div>
          <div className="relative">
            <Image
              src="https://res.cloudinary.com/dzckvrvu9/image/upload/v1752758815/WhatsApp-Image-2024-02-19-at-03.15.42_z0nnkl.jpg"
              alt="Church worship with raised hands"
              width={1200}
              height={800}
              className="rounded-2xl object-cover"
            />
          </div>
        </div>
      </div>
    </section>
  )
}
