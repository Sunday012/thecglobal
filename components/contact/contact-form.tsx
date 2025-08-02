"use client"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { useEffect, useRef, useState } from "react"

export default function ContactForm() {
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
      <div className="max-w-4xl mx-auto">
        <div
          className={`transition-all duration-1000 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}
        >
          <div className="text-center mb-12">
            <h2 className="text-6xl font-montserrat font-bold text-[#272f31] mb-6">Send Us a Message</h2>
            <p className="text-[#272f31]/70 font-work-sans text-lg max-w-2xl mx-auto">
              Fill out the form below and we'll get back to you as soon as possible. We typically respond within 24
              hours.
            </p>
          </div>

          <form className="space-y-6">
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <label htmlFor="firstName" className="block text-[#272f31] font-work-sans font-medium mb-2">
                  First Name *
                </label>
                <Input
                  id="firstName"
                  name="firstName"
                  required
                  className="bg-[#FAE8A1]/30 border-0 rounded-2xl px-6 py-4 text-[#272f31] placeholder:text-[#272f31]/50 focus:bg-[#FAE8A1]/50 transition-colors"
                  placeholder="Enter your first name"
                />
              </div>
              <div>
                <label htmlFor="lastName" className="block text-[#272f31] font-work-sans font-medium mb-2">
                  Last Name *
                </label>
                <Input
                  id="lastName"
                  name="lastName"
                  required
                  className="bg-[#FAE8A1]/30 border-0 rounded-2xl px-6 py-4 text-[#272f31] placeholder:text-[#272f31]/50 focus:bg-[#FAE8A1]/50 transition-colors"
                  placeholder="Enter your last name"
                />
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <label htmlFor="email" className="block text-[#272f31] font-work-sans font-medium mb-2">
                  Email Address *
                </label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  required
                  className="bg-[#FAE8A1]/30 border-0 rounded-2xl px-6 py-4 text-[#272f31] placeholder:text-[#272f31]/50 focus:bg-[#FAE8A1]/50 transition-colors"
                  placeholder="Enter your email address"
                />
              </div>
              <div>
                <label htmlFor="phone" className="block text-[#272f31] font-work-sans font-medium mb-2">
                  Phone Number
                </label>
                <Input
                  id="phone"
                  name="phone"
                  type="tel"
                  className="bg-[#FAE8A1]/30 border-0 rounded-2xl px-6 py-4 text-[#272f31] placeholder:text-[#272f31]/50 focus:bg-[#FAE8A1]/50 transition-colors"
                  placeholder="Enter your phone number"
                />
              </div>
            </div>

            <div>
              <label htmlFor="subject" className="block text-[#272f31] font-work-sans font-medium mb-2">
                Subject *
              </label>
              <Input
                id="subject"
                name="subject"
                required
                className="bg-[#FAE8A1]/30 border-0 rounded-2xl px-6 py-4 text-[#272f31] placeholder:text-[#272f31]/50 focus:bg-[#FAE8A1]/50 transition-colors"
                placeholder="What's this about?"
              />
            </div>

            <div>
              <label htmlFor="message" className="block text-[#272f31] font-work-sans font-medium mb-2">
                Message *
              </label>
              <Textarea
                id="message"
                name="message"
                required
                rows={6}
                className="bg-[#FAE8A1]/30 border-0 rounded-2xl px-6 py-4 text-[#272f31] placeholder:text-[#272f31]/50 focus:bg-[#FAE8A1]/50 transition-colors resize-none"
                placeholder="Tell us how we can help you..."
              />
            </div>

            <div className="text-center">
              <Button
                type="submit"
                className="bg-[#0A523B] hover:bg-[#0A523B]/80 text-white font-work-sans font-medium px-12 py-4 rounded-full text-lg tracking-wide"
              >
                SEND MESSAGE
              </Button>
            </div>
          </form>
        </div>
      </div>
    </section>
  )
}
