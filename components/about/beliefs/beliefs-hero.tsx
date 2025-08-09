"use client"

import { useEffect, useRef, useState } from "react"
import Image from "next/image"

export default function BeliefsHero() {
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
    <section ref={sectionRef} className="relative min-h-[80vh] flex items-center justify-center px-6 lg:px-8 py-20">
      {/* Background Image */}
      <div className="absolute inset-0">
        <Image
          src="https://res.cloudinary.com/dzckvrvu9/image/upload/v1754758500/awmleer-6XcziMmkNgQ-unsplash_nuiqye.jpg"
          alt="Church worship with raised hands"
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-black/50" />
      </div>

      {/* Content */}
      <div className="relative z-10 max-w-4xl mx-auto mt-24 text-center">
        <div
          className={`transition-all duration-1000 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}
        >
          <h1 className="text-6xl lg:text-8xl font-montserrat font-bold text-white mb-8 leading-tight">
            What We Believe
          </h1>
          <p className="text-white/90 font-work-sans text-xl lg:text-2xl leading-relaxed max-w-3xl mx-auto">
            We live in shifting times but are rooted in eternal truths, the teachings of Holy Scripture. Here at The
            Encounter Center Church we are guided by certain foundational beliefs and shaping values.
          </p>
        </div>
      </div>
    </section>
  )
}
