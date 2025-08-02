"use client"

import { useEffect, useRef, useState } from "react"

export default function OurBoard() {
  const [isVisible, setIsVisible] = useState(false)
  const sectionRef = useRef<HTMLElement>(null)

  const boardMembers = [
    {
      name: "Dr. James Patterson",
      role: "Founder – Encounter Global Institute",
    },
    {
      name: "Pastor John Smith",
      role: "Original Visionary – Encounter Movement and Pastor – The Encounter Center Church",
    },
    {
      name: "Sarah Smith",
      role: "Chief Strategist – Encounter Movement",
    },
    {
      name: "Dr. Marcus Williams",
      role: "Business Development – Williams & Associates",
    },
    {
      name: "Dr. Rebecca Martinez",
      role: "President/Founder – Martinez Theological Seminary",
    },
    {
      name: "Rev. Timothy Johnson",
      role: "Campus Pastor – Grace Fellowship (Retired)",
    },
    {
      name: "Elder Robert Davis",
      role: "Chairman Emeritus – Davis Foundation",
    },
    {
      name: "Pastor Maria Gonzalez",
      role: "Minister to Families – Community Baptist Church (Retired)",
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
    <section ref={sectionRef} className="bg-white py-20 px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        <div
          className={`transition-all duration-1000 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}
        >
          <h2 className="text-4xl lg:text-5xl font-playfair font-bold text-[#272f31] mb-8 italic">Our Board</h2>
          <p className="text-[#272f31] font-work-sans text-lg leading-relaxed mb-8 max-w-4xl">
            The Encounter Center Church is governed by a board of directors made up of individuals with a long history
            with the ministry of The Encounter Center. Their integrity, wisdom, experience and spiritual maturity are
            exceptional. As well, they are fully engaged with all God is doing through The Encounter Center to serve the
            collegiate generation and build up the local church. They prayerfully provide guidance and discernment for
            all that happens in and through the ministries of The Encounter Center.
          </p>

          <p className="text-[#272f31] font-work-sans text-lg leading-relaxed mb-12 max-w-4xl">
            Below is a list of the current members of The Encounter Center Board.
          </p>

          <div className="grid md:grid-cols-2 gap-x-12 gap-y-8">
            {boardMembers.map((member, index) => (
              <div key={index} className="flex items-start">
                <div className="w-3 h-3 bg-[#00BCD4] rounded-full mt-2 mr-4 flex-shrink-0"></div>
                <div>
                  <h3 className="text-xl font-montserrat font-bold text-[#272f31] mb-1">{member.name}</h3>
                  <p className="text-[#272f31]/70 font-work-sans text-sm">{member.role}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
