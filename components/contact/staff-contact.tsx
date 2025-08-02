"use client"

import { Mail, Phone } from "lucide-react"
import { useEffect, useRef, useState } from "react"

export default function StaffContact() {
  const [isVisible, setIsVisible] = useState(false)
  const sectionRef = useRef<HTMLElement>(null)

  const staffContacts = [
    {
      name: "Pastor John Smith",
      title: "Global Pastor",
      email: "john@encountercenter.org",
      phone: "(713) 555-0101",
      description: "General inquiries, pastoral care, and leadership questions",
    },
    {
      name: "Sarah Smith",
      title: "Chief Strategist",
      email: "sarah@encountercenter.org",
      phone: "(713) 555-0102",
      description: "Operations, events, and strategic planning",
    },
    {
      name: "Michael Rodriguez",
      title: "Houston Pastor",
      email: "michael@encountercenter.org",
      phone: "(713) 555-0103",
      description: "Houston location specific inquiries and pastoral care",
    },
    {
      name: "David Thompson",
      title: "Springfield Pastor",
      email: "david@encountercenter.org",
      phone: "(217) 555-0104",
      description: "Springfield location specific inquiries and pastoral care",
    },
    {
      name: "Ministry Team",
      title: "General Ministry",
      email: "ministry@encountercenter.org",
      phone: "(713) 555-0105",
      description: "Volunteer opportunities, small groups, and ministry involvement",
    },
    {
      name: "Prayer Team",
      title: "Prayer Requests",
      email: "prayer@encountercenter.org",
      phone: "(713) 555-0106",
      description: "Prayer requests, spiritual guidance, and pastoral support",
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
      <div className="max-w-7xl mx-auto">
        <div
          className={`transition-all duration-1000 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}
        >
          <div className="text-center mb-16">
            <h2 className="text-6xl font-montserrat font-bold text-[#272f31] mb-6">
              Connect With Our <em className="font-playfair italic">Team</em>
            </h2>
            <p className="text-[#272f31]/70 font-work-sans text-lg max-w-3xl mx-auto">
              Need to reach someone specific? Our team is here to help with your questions, prayer requests, and
              ministry needs.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {staffContacts.map((staff, index) => (
              <div
                key={index}
                className={`bg-gray-50 rounded-2xl p-6 transition-all duration-500 hover:shadow-lg hover:-translate-y-2 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}
                style={{ transitionDelay: `${index * 100}ms` }}
              >
                <h3 className="text-xl font-montserrat font-bold text-[#272f31] mb-2">{staff.name}</h3>
                <p className="text-[#0A523B] font-work-sans font-medium text-sm mb-4">{staff.title}</p>
                <p className="text-[#272f31]/70 font-work-sans text-sm mb-6 leading-relaxed">{staff.description}</p>

                <div className="space-y-3">
                  <a
                    href={`mailto:${staff.email}`}
                    className="flex items-center space-x-3 text-[#272f31] hover:text-[#0A523B] transition-colors group"
                  >
                    <Mail className="w-4 h-4 group-hover:scale-110 transition-transform" />
                    <span className="font-work-sans text-sm">{staff.email}</span>
                  </a>
                  <a
                    href={`tel:${staff.phone}`}
                    className="flex items-center space-x-3 text-[#272f31] hover:text-[#0A523B] transition-colors group"
                  >
                    <Phone className="w-4 h-4 group-hover:scale-110 transition-transform" />
                    <span className="font-work-sans text-sm">{staff.phone}</span>
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
