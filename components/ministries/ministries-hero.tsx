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
    <section ref={sectionRef} className="relative h-[70vh] bg-gray-200 flex items-center justify-center overflow-hidden rounded-3xl mx-4 md:mx-8 mt-46">
      {/* Background Image */}
      <div className={`absolute rounded-3xl overflow-hidden transition-all duration-700 ease-in-out ${
        isHovered 
          ? "top-0 left-0 w-full h-full rounded-none" 
          : "md:top-8 md:left-1/6 md:w-[70%] md:h-[60%] top-0 left-0 w-full h-full"
      }`}>
        <Image
          src="/images/serve.jpg"
          alt="Houston skyline"
          fill
          className="object-cover object-top"
          priority
        />
        <div className={`absolute inset-0 transition-all duration-700 ${
          isHovered ? "bg-black/30" : "md:bg-white/20 bg-black/40"
        }`} />
      </div>

      {/* City Label - Hidden on mobile */}
      <div className="absolute top-8 left-1/2 transform -translate-x-1/2 z-20 hidden md:block">
        <div
          className={`transition-all duration-1000 delay-300 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-4"}`}
        >
          {/* <h2 className="text-xl font-rubik text-gray-600">Houston</h2> */}
        </div>
      </div>

      {/* Watch Latest Talk Button */}
      <div className="absolute w-full top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-20">
        <div
          className={`transition-all flex items-center justify-center duration-1000 delay-500 ${isVisible ? "opacity-100 scale-100" : "opacity-0 scale-90"}`}
        >
          <Button 
            className={`h-[40px] md:h-[52px] font-work-sans font-medium px-4 md:px-6 py-2 md:py-3 rounded-full text-xs md:text-sm tracking-wide transition-all duration-500 ease-in-out ${
              isHovered 
                ? "bg-white text-black hover:bg-white/90" 
                : "md:bg-[#0A523B] md:hover:bg-[#0A523B]/80 md:text-white bg-white text-black hover:bg-white/90"
            }`}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
          >
            Walk With Us
          </Button>
          
        </div>
        <div className="w-full flex md:hidden mt-5 items-center justify-center z-10 px-4 md:px-8">
        <div
          className={`transition-all w-full duration-1000 delay-700 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}
        >
          <h1 className={`text-4xl sm:text-6xl md:text-8xl lg:text-[120px] text-center w-full font-montserrat tracking-tighter font-bold leading-none transition-colors duration-500 ease-in-out ${
            isHovered ? "text-white" : "md:text-black text-white"
          }`}>
            Join a Serve Team
          </h1>
        </div>
      </div>
      </div>

      {/* Main Title */}
      <div className="absolute bottom-0 left-0 right-0 hidden md:flex items-center justify-center z-10 px-4 md:px-8">
        <div
          className={`transition-all duration-1000 delay-700 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}
        >
          <h1 className={`text-4xl sm:text-6xl md:text-8xl lg:text-[120px] text-center font-montserrat tracking-tighter font-bold leading-none transition-colors duration-500 ease-in-out ${
            isHovered ? "text-white" : "md:text-black text-white"
          }`}>
            Join a Serve Team
          </h1>
        </div>
      </div>
    </section>
  )
}