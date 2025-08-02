"use client"

import { Button } from "@/components/ui/button"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { useEffect, useRef, useState } from "react"

export default function UpcomingEvents() {
  const [isVisible, setIsVisible] = useState(false)
  const sectionRef = useRef<HTMLElement>(null)

  const events = [
    {
      date: "27",
      month: "JUL",
      title: "Encounter Equip — Theology of Worship (Online)",
      time: "7:00p - 9:00p CT",
      dates: "7/27 + 8/3",
      tags: ["EQUIP", "ALL LOCATIONS"],
      featured: false,
    },
    {
      date: "27",
      month: "JUL",
      title: "Encounter Equip — Theology of Worship",
      time: "7:00p - 9:00p CT",
      dates: "7/27 + 8/3",
      tags: ["EQUIP", "HOUSTON"],
      featured: true,
    },
    {
      date: "27",
      month: "JUL",
      title: "Encounter Equip — Evangelism + World Missions",
      time: "7:00p - 9:00p CT",
      dates: "7/27 + 8/3",
      tags: ["EQUIP", "SPRINGFIELD"],
      featured: false,
    },
    {
      date: "30",
      month: "JUL",
      title: "Welcome to Church",
      time: "11:00a CT",
      dates: "Discover the heartbeat of The Encounter Center Church!",
      tags: ["GENERAL", "WELCOME TO CHURCH", "SPRINGFIELD"],
      featured: false,
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
          <h2 className="text-8xl font-rubik font-bold text-gray-800 mb-16">Upcoming</h2>

          {/* Featured Event */}
          <div className="mb-12">
            <div className="bg-white rounded-2xl p-8 shadow-sm border border-gray-100 relative overflow-hidden">
              <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-l from-gray-50 to-transparent"></div>
              <div className="relative z-10">
                <div className="flex items-center gap-4 mb-4">
                  <span className="bg-[#0A523B] text-white px-3 py-1 rounded-full text-sm font-work-sans">HOUSTON</span>
                </div>
                <h3 className="text-4xl font-rubik font-bold text-gray-800 mb-4">The Encounter</h3>
                <p className="text-gray-600 font-work-sans text-lg mb-6">
                  Join us for a special encounter experience at The Encounter Center Church!
                </p>
                <Button className="bg-[#0A523B] hover:bg-[#0A523B]/80 text-white font-work-sans font-medium px-6 py-3 rounded-full text-sm tracking-wide">
                  LEARN MORE
                </Button>
              </div>
            </div>
          </div>

          {/* Events List */}
          <div className="space-y-6">
            {events.map((event, index) => (
              <div
                key={index}
                className={`flex items-center gap-6 p-6 rounded-2xl transition-all duration-300 hover:shadow-md ${
                  event.featured ? "bg-[#0A523B] text-white" : "bg-white border border-gray-100"
                }`}
              >
                <div className="flex-shrink-0">
                  <div
                    className={`w-20 h-20 rounded-2xl flex flex-col items-center justify-center ${
                      event.featured ? "bg-white text-gray-800" : "bg-gray-50"
                    }`}
                  >
                    <span className="text-2xl font-rubik font-bold">{event.date}</span>
                    <span className="text-xs font-work-sans uppercase tracking-wide text-gray-500">{event.month}</span>
                  </div>
                </div>
                <div className="flex-1">
                  <h4
                    className={`text-xl font-rubik font-bold mb-2 ${event.featured ? "text-white" : "text-gray-800"}`}
                  >
                    {event.title}
                  </h4>
                  <p className={`text-lg mb-1 ${event.featured ? "text-white/90" : "text-gray-600"}`}>{event.time}</p>
                  <p className={`text-sm ${event.featured ? "text-white/80" : "text-gray-500"}`}>{event.dates}</p>
                </div>
                <div className="flex gap-2">
                  {event.tags.map((tag, tagIndex) => (
                    <span
                      key={tagIndex}
                      className={`px-3 py-1 rounded-full text-xs font-work-sans uppercase tracking-wide ${
                        event.featured ? "bg-white/20 text-white" : "bg-gray-100 text-gray-600"
                      }`}
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>

          {/* Navigation */}
          <div className="flex justify-center items-center gap-8 mt-12">
            <button className="p-3 text-gray-400 hover:text-gray-600 transition-colors">
              <ChevronLeft size={32} />
            </button>
            <Button
              variant="outline"
              className="border-gray-300 text-gray-600 hover:bg-gray-50 font-work-sans font-medium py-3 px-8 rounded-full bg-white"
            >
              SEE ALL EVENTS
            </Button>
            <button className="p-3 text-gray-400 hover:text-gray-600 transition-colors">
              <ChevronRight size={32} />
            </button>
          </div>
        </div>
      </div>
    </section>
  )
}
