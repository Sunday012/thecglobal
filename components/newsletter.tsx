"use client"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { useEffect, useRef, useState } from "react"

export default function Newsletter() {
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
      <div className="max-w-4xl mx-auto text-center">
        <div
          className={`transition-all duration-1000 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}
        >
          <p className="text-[#272f31]/70 font-work-sans text-lg mb-4">Sign Up</p>
          <h2 className="text-6xl font-rubik font-bold text-[#272f31] mb-6">Stay Up to Date</h2>
          <p className="text-[#272f31] font-work-sans text-lg mb-12">
            Sign up below for the latest news and updates from The Encounter Center Church.
          </p>

          <div className="flex flex-col md:flex-row gap-4 max-w-4xl mx-auto mb-8">
            <Input
              placeholder="First Name *"
              className="flex-1 bg-[#FAE8A1] border-0 rounded-2xl px-6 py-4 text-[#272f31] placeholder:text-[#272f31]/50"
            />
            <Input
              placeholder="Last Name *"
              className="flex-1 bg-[#FAE8A1] border-0 rounded-2xl px-6 py-4 text-[#272f31] placeholder:text-[#272f31]/50"
            />
            <Input
              placeholder="Email Address *"
              className="flex-1 bg-[#FAE8A1] border-0 rounded-2xl px-6 py-4 text-[#272f31] placeholder:text-[#272f31]/50"
            />
            <Button className="bg-[#0A523B] hover:bg-[#0A523B]/80 text-white font-work-sans font-medium px-8 py-4 rounded-2xl text-sm tracking-wide">
              SIGN UP
            </Button>
          </div>

          <p className="text-[#272f31]/60 font-work-sans text-sm">
            This site is protected by reCAPTCHA and the Google Privacy Policy and Terms of Service apply.
          </p>
        </div>
      </div>
    </section>
  )
}
