"use client"

import Image from "next/image"
import { Button } from "@/components/ui/button"
import { useEffect, useRef, useState } from "react"
import Link from "next/link"

export default function WhatWeBelieve() {
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
      className="bg-white py-2 px-4 sm:py-16 sm:px-6 lg:py-20 lg:px-8"
    >
      <div className="max-w-7xl mx-auto">
        <div
          className={`flex flex-col lg:flex-row-reverse gap-8 md:gap-12 items-center transition-all duration-1000 ${
            isVisible
              ? "opacity-100 translate-x-0"
              : "opacity-0 -translate-x-10"
          }`}
        >

          <div>
            <p className="text-[#272f31]/70 font-playfair text-xs sm:text-sm uppercase tracking-wide mb-2 sm:mb-4">
              Our Theological Truths
            </p>
            <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-montserrat font-bold text-[#272f31] mb-4 sm:mb-8">
              What We Believe
            </h2>
            <p className="text-[#272f31] font-work-sans text-base sm:text-lg leading-relaxed mb-6 sm:mb-8">
              We live in shifting times but are rooted in eternal truths, the teachings of Holy Scripture. Here at The
              Encounter Center Church we are guided by certain foundational beliefs and shaping values.
            </p>
            <Link
              href="/beliefs"
              className="bg-[#0A523B] hover:bg-[#0A523B]/80 text-white font-work-sans font-medium px-6 sm:px-8 py-2.5 sm:py-3 rounded-full text-xs sm:text-sm tracking-wide inline-block"
            >
              LEARN MORE
            </Link>
          </div>
          <div className="relative w-full h-64 sm:h-80 md:h-[400px] lg:h-[500px] flex items-center">
            <Image
              src="/images/believe-one.jpg"
              alt="Pastor speaking at podium"
              fill
              className="rounded-2xl object-cover object-center"
              sizes="(min-width: 1024px) 600px, 100vw"
              priority
            />
          </div>
        </div>
      </div>
    </section>
  )
}
