"use client"

import { Button } from "@/components/ui/button"
import { MapPin, Clock, Phone } from "lucide-react"
import { useEffect, useRef, useState } from "react"

export default function LocationsContact() {
  const [isVisible, setIsVisible] = useState(false)
  const sectionRef = useRef<HTMLElement>(null)

  const locations = [
    {
      city: "Houston",
      address: "15000 Bellaire Blvd Unit W",
      fullAddress: "Houston, Texas 77083",
      phone: "(713) 555-0123",
      email: "houston@encountercenter.org",
      serviceTimes: ["Sunday 9:30 AM", "Sunday 11:45 AM"],
      mapUrl: "https://maps.google.com/?q=15000+Bellaire+Blvd+Unit+W+Houston+TX+77083",
    },
    {
      city: "Springfield",
      address: "3075 Normandy Rd",
      fullAddress: "Springfield, IL 62703",
      phone: "(217) 555-0123",
      email: "springfield@encountercenter.org",
      serviceTimes: ["Sunday 9:30 AM", "Sunday 11:30 AM"],
      mapUrl: "https://maps.google.com/?q=3075+Normandy+Rd+Springfield+IL+62703",
    },
  ]

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
    <section ref={sectionRef} className="bg-gray-50 py-20 px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div
          className={`transition-all duration-1000 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}
        >
          <div className="text-center mb-16">
            <h2 className="text-6xl font-montserrat font-bold text-[#272f31] mb-6">
              Our <em className="font-playfair italic">Locations</em>
            </h2>
            <p className="text-[#272f31]/70 font-work-sans text-lg max-w-3xl mx-auto">
              We have two locations serving Houston and Springfield. Each location offers the same heart for worship and
              community, tailored to serve their local neighborhoods.
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-12">
            {locations.map((location, index) => (
              <div
                key={index}
                className={`bg-white rounded-2xl p-8 shadow-sm transition-all duration-500 hover:shadow-lg hover:-translate-y-2 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}
                style={{ transitionDelay: `${index * 200}ms` }}
              >
                <h3 className="text-4xl font-montserrat font-bold text-[#272f31] mb-6">{location.city}</h3>

                <div className="space-y-4 mb-8">
                  <div className="flex items-start space-x-3">
                    <MapPin className="w-5 h-5 text-[#0A523B] mt-1 flex-shrink-0" />
                    <div>
                      <p className="text-[#272f31] font-work-sans font-medium">{location.address}</p>
                      <p className="text-[#272f31]/70 font-work-sans text-sm">{location.fullAddress}</p>
                    </div>
                  </div>

                  <div className="flex items-center space-x-3">
                    <Phone className="w-5 h-5 text-[#0A523B] flex-shrink-0" />
                    <a
                      href={`tel:${location.phone}`}
                      className="text-[#272f31] font-work-sans hover:text-[#0A523B] transition-colors"
                    >
                      {location.phone}
                    </a>
                  </div>

                  <div className="flex items-start space-x-3">
                    <Clock className="w-5 h-5 text-[#0A523B] mt-1 flex-shrink-0" />
                    <div>
                      <p className="text-[#272f31] font-work-sans font-medium mb-1">Service Times:</p>
                      {location.serviceTimes.map((time, timeIndex) => (
                        <p key={timeIndex} className="text-[#272f31]/70 font-work-sans text-sm">
                          {time}
                        </p>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="space-y-3">
                  <Button
                    asChild
                    className="w-full bg-[#0A523B] hover:bg-[#0A523B]/80 text-white font-work-sans font-medium py-3 rounded-full text-sm tracking-wide"
                  >
                    <a href={location.mapUrl} target="_blank" rel="noopener noreferrer">
                      GET DIRECTIONS
                    </a>
                  </Button>
                  <Button
                    asChild
                    variant="outline"
                    className="w-full border-[#272f31] text-[#272f31] hover:bg-[#272f31] hover:text-white font-work-sans font-medium py-3 rounded-full bg-transparent"
                  >
                    <a href={`mailto:${location.email}`}>EMAIL THIS LOCATION</a>
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
