"use client"

import { Clock, Calendar } from "lucide-react"
import { useEffect, useRef, useState } from "react"

export default function OfficeHours() {
  const [isVisible, setIsVisible] = useState(false)
  const sectionRef = useRef<HTMLElement>(null)

  const officeHours = [
    { day: "Monday", hours: "9:00 AM - 5:00 PM" },
    { day: "Tuesday", hours: "9:00 AM - 5:00 PM" },
    { day: "Wednesday", hours: "9:00 AM - 5:00 PM" },
    { day: "Thursday", hours: "9:00 AM - 5:00 PM" },
    { day: "Friday", hours: "9:00 AM - 3:00 PM" },
    { day: "Saturday", hours: "Closed" },
    { day: "Sunday", hours: "8:00 AM - 1:00 PM" },
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
      <div className="max-w-4xl mx-auto">
        <div
          className={`transition-all duration-1000 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}
        >
          <div className="text-center mb-12">
            <h2 className="text-6xl font-montserrat font-bold text-[#272f31] mb-6">
              Office <em className="font-playfair italic">Hours</em>
            </h2>
            <p className="text-[#272f31]/70 font-work-sans text-lg max-w-2xl mx-auto">
              Our office staff is available during these hours to assist you. For urgent pastoral care needs outside
              these hours, please call our main number.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-12">
            <div className="bg-white rounded-2xl p-8 shadow-sm">
              <div className="flex items-center space-x-3 mb-6">
                <Clock className="w-6 h-6 text-[#0A523B]" />
                <h3 className="text-2xl font-montserrat font-bold text-[#272f31]">Weekly Schedule</h3>
              </div>
              <div className="space-y-3">
                {officeHours.map((schedule, index) => (
                  <div
                    key={index}
                    className="flex justify-between items-center py-2 border-b border-gray-100 last:border-b-0"
                  >
                    <span className="text-[#272f31] font-work-sans font-medium">{schedule.day}</span>
                    <span
                      className={`font-work-sans ${schedule.hours === "Closed" ? "text-[#272f31]/50" : "text-[#272f31]"}`}
                    >
                      {schedule.hours}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-white rounded-2xl p-8 shadow-sm">
              <div className="flex items-center space-x-3 mb-6">
                <Calendar className="w-6 h-6 text-[#0A523B]" />
                <h3 className="text-2xl font-montserrat font-bold text-[#272f31]">Important Notes</h3>
              </div>
              <div className="space-y-4">
                <div>
                  <h4 className="text-[#272f31] font-work-sans font-medium mb-2">Emergency Pastoral Care</h4>
                  <p className="text-[#272f31]/70 font-work-sans text-sm">
                    Available 24/7 for urgent spiritual care needs. Call our main number and follow the prompts.
                  </p>
                </div>
                <div>
                  <h4 className="text-[#272f31] font-work-sans font-medium mb-2">Holiday Hours</h4>
                  <p className="text-[#272f31]/70 font-work-sans text-sm">
                    Office hours may vary during holidays. Check our website or call ahead during holiday weeks.
                  </p>
                </div>
                <div>
                  <h4 className="text-[#272f31] font-work-sans font-medium mb-2">Best Times to Visit</h4>
                  <p className="text-[#272f31]/70 font-work-sans text-sm">
                    Tuesday through Thursday, 10 AM - 4 PM are typically our least busy times for walk-in visits.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
