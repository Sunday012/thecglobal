"use client"

import { Button } from "@/components/ui/button"
import Image from "next/image"
import { useEffect, useRef, useState } from "react"

export default function WeAreJesusChurch() {
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
          className={`grid lg:grid-cols-2 gap-12 items-center transition-all duration-1000 ${isVisible ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-10"}`}
        >
          <div>
            <h2 className="text-6xl font-rubik font-bold text-gray-800 mb-4">We Are</h2>
            <h3 className="text-4xl font-rubik italic text-gray-700 mb-8">A Jesus Church</h3>
            <p className="text-gray-600 font-work-sans text-lg leading-relaxed mb-8">
              A small tribe of His followers connected by our common faith and a deep desire to see our cities [Houston
              and Springfield] come to know His power and beauty.
            </p>
            <Button className="bg-[#0A523B] hover:bg-[#0A523B]/80 text-white font-work-sans font-medium px-6 py-3 rounded-full text-sm tracking-wide">
              About Us
            </Button>
          </div>
          <div className="relative">
            <Image
              src="https://res.cloudinary.com/dzckvrvu9/image/upload/v1752758815/WhatsApp-Image-2024-02-19-at-03.15.42_z0nnkl.jpg"
              alt="Church worship with raised hands"
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
