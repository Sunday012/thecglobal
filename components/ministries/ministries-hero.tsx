"use client"

import { Button } from "@/components/ui/button"
import Image from "next/image"
import { useEffect, useRef, useState } from "react"

export default function MinistriesHero() {
  const [isVisible, setIsVisible] = useState(false)
  const [isHovered, setIsHovered] = useState(false)
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
    <section ref={sectionRef} className="relative h-[70vh] bg-gray-200 flex items-center justify-center overflow-hidden rounded-3xl mx-8 mt-46">
      {/* Background Image */}
      <div className={`absolute rounded-3xl overflow-hidden transition-all duration-700 ease-in-out ${
        isHovered 
          ? "top-0 left-0 w-full h-full rounded-none" 
          : "top-8 left-1/6 w-[70%] h-[60%]"
      }`}>
        <Image
          src="https://res.cloudinary.com/dzckvrvu9/image/upload/v1752758811/WhatsApp-Image-2024-02-19-at-03.17.40-1536x1023_m1hzhh.jpg"
          alt="Houston skyline"
          fill
          className="object-cover"
          priority
        />
        <div className={`absolute inset-0 transition-all duration-700 ${
          isHovered ? "bg-black/30" : "bg-white/20"
        }`} />
      </div>

      {/* City Label */}
      <div className="absolute top-8 left-1/2 transform -translate-x-1/2 z-20">
        <div
          className={`transition-all duration-1000 delay-300 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-4"}`}
        >
          {/* <h2 className="text-xl font-rubik text-gray-600">Houston</h2> */}
        </div>
      </div>

      {/* Watch Latest Talk Button */}
      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-20">
        <div
          className={`transition-all duration-1000 delay-500 ${isVisible ? "opacity-100 scale-100" : "opacity-0 scale-90"}`}
        >
          <Button 
            className={`h-[52px] font-work-sans font-medium px-6 py-3 rounded-full text-sm tracking-wide transition-all duration-500 ease-in-out ${
              isHovered 
                ? "bg-white text-black hover:bg-white/90" 
                : "bg-[#0A523B] hover:bg-[#0A523B]/80 text-white"
            }`}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
          >
            Watch the Latest Talk
          </Button>
        </div>
      </div>

      {/* Main Title */}
      <div className="absolute bottom-0 left-0 right-0 flex items-center justify-center z-10 px-8">
        <div
          className={`transition-all duration-1000 delay-700 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}
        >
          <h1 className={`text-8xl lg:text-[140px] font-montserrat tracking-tighter font-bold leading-none transition-colors duration-500 ease-in-out ${
            isHovered ? "text-white" : "text-black"
          }`}>
            Join Us Sunday
          </h1>
        </div>
      </div>
    </section>
  )
}