"use client"

import { useEffect, useRef, useState } from "react"
import { Phone, Mail, MapPin } from "lucide-react"
import Image from "next/image"

export default function ContactHero() {
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
    <section ref={sectionRef} className="bg-black py-20 px-6 lg:px-8 min-h-screen flex items-center">
      <div className="max-w-7xl mx-auto w-full mt-32">
        <div
          className={`transition-all duration-1000 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}
        >
          {/* Main Hero Content */}
          <div className="mb-12">
            <h1 className="text-6xl lg:text-8xl xl:text-9xl font-montserrat font-bold text-white mb-8 leading-none">
              Get In Touch With Us
            </h1>
            <p className="text-white/90 font-work-sans text-xl lg:text-2xl leading-relaxed max-w-4xl mb-12">
              We'd love to connect with you! Whether you're new to our community, have questions about faith, or want to
              get involved, our team is here to help you take your next step.
            </p>
          </div>

          {/* Image Section */}
          <div className="mb-16">
            <div className="relative aspect-video max-w-4xl rounded-2xl overflow-hidden">
              <Image
                src="https://res.cloudinary.com/dzckvrvu9/image/upload/v1752758817/WhatsApp-Image-2024-02-19-at-03.15.04-1536x1023_ewhb3o.jpg"
                alt="Pastor John and Sarah Smith - Connect with our leadership team"
                fill
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
              <div className="absolute bottom-6 left-6">
                <h3 className="text-white font-montserrat font-bold text-2xl mb-2">Connect With Our Leadership</h3>
                <p className="text-white/90 font-work-sans text-lg">Pastor John + Sarah Smith</p>
              </div>
            </div>
          </div>

          {/* Quick Contact Options */}
          <div className="grid md:grid-cols-3 gap-8 max-w-5xl">
            <div className="group cursor-pointer">
              <div className="flex items-center space-x-4 p-6 rounded-2xl bg-white/5 hover:bg-white/10 transition-all duration-300 border border-white/10">
                <div className="w-12 h-12 bg-[#FAE8A1] rounded-full flex items-center justify-center group-hover:scale-110 transition-transform">
                  <Phone className="w-6 h-6 text-black" />
                </div>
                <div>
                  <h3 className="text-white font-montserrat font-bold text-lg mb-1">Call Us</h3>
                  <p className="text-white/70 font-work-sans">
                    <a href="tel:+1-713-555-0123" className="hover:text-[#FAE8A1] transition-colors">
                      (713) 555-0123
                    </a>
                  </p>
                </div>
              </div>
            </div>

            <div className="group cursor-pointer">
              <div className="flex items-center space-x-4 p-6 rounded-2xl bg-white/5 hover:bg-white/10 transition-all duration-300 border border-white/10">
                <div className="w-12 h-12 bg-[#FAE8A1] rounded-full flex items-center justify-center group-hover:scale-110 transition-transform">
                  <Mail className="w-6 h-6 text-black" />
                </div>
                <div>
                  <h3 className="text-white font-montserrat font-bold text-lg mb-1">Email Us</h3>
                  <p className="text-white/70 font-work-sans">
                    <a href="mailto:hello@encountercenter.org" className="hover:text-[#FAE8A1] transition-colors">
                      hello@encountercenter.org
                    </a>
                  </p>
                </div>
              </div>
            </div>

            <div className="group cursor-pointer">
              <div className="flex items-center space-x-4 p-6 rounded-2xl bg-white/5 hover:bg-white/10 transition-all duration-300 border border-white/10">
                <div className="w-12 h-12 bg-[#FAE8A1] rounded-full flex items-center justify-center group-hover:scale-110 transition-transform">
                  <MapPin className="w-6 h-6 text-black" />
                </div>
                <div>
                  <h3 className="text-white font-montserrat font-bold text-lg mb-1">Visit Us</h3>
                  <p className="text-white/70 font-work-sans">Houston & Springfield</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
