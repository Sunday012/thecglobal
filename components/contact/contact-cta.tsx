"use client"

import { Button } from "@/components/ui/button"
import { Facebook, Instagram, Youtube, Twitter } from "lucide-react"
import { useEffect, useRef, useState } from "react"

export default function ContactCTA() {
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
    <section ref={sectionRef} className="bg-[#0A523B] py-20 px-6 lg:px-8">
      <div className="max-w-4xl mx-auto text-center">
        <div
          className={`transition-all duration-1000 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}
        >
          <h2 className="text-5xl lg:text-6xl font-montserrat font-bold text-white mb-6 leading-tight">
            We Can't Wait to <em className="font-playfair italic">Meet You</em>
          </h2>
          <p className="text-white/90 font-work-sans text-xl leading-relaxed mb-12 max-w-3xl mx-auto">
            Whether you're new to faith, new to the area, or just looking for a church home, we'd love to welcome you
            into our community. Come as you are – you belong here.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
            <Button className="bg-[#FAE8A1] hover:bg-[#FAE8A1]/80 text-[#272f31] font-work-sans font-medium px-8 py-4 rounded-full text-lg tracking-wide">
              PLAN YOUR VISIT
            </Button>
            <Button
              variant="outline"
              className="border-white text-white hover:bg-white hover:text-[#0A523B] font-work-sans font-medium px-8 py-4 rounded-full text-lg tracking-wide bg-transparent"
            >
              WATCH ONLINE
            </Button>
          </div>

          <div>
            <p className="text-white/70 font-work-sans text-sm mb-6 uppercase tracking-wide">Follow Us</p>
            <div className="flex justify-center space-x-6">
              <a
                href="#"
                className="w-12 h-12 bg-white/10 rounded-full flex items-center justify-center text-white hover:bg-white hover:text-[#0A523B] transition-all duration-300 hover:scale-110"
              >
                <Facebook size={20} />
              </a>
              <a
                href="#"
                className="w-12 h-12 bg-white/10 rounded-full flex items-center justify-center text-white hover:bg-white hover:text-[#0A523B] transition-all duration-300 hover:scale-110"
              >
                <Instagram size={20} />
              </a>
              <a
                href="#"
                className="w-12 h-12 bg-white/10 rounded-full flex items-center justify-center text-white hover:bg-white hover:text-[#0A523B] transition-all duration-300 hover:scale-110"
              >
                <Youtube size={20} />
              </a>
              <a
                href="#"
                className="w-12 h-12 bg-white/10 rounded-full flex items-center justify-center text-white hover:bg-white hover:text-[#0A523B] transition-all duration-300 hover:scale-110"
              >
                <Twitter size={20} />
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
