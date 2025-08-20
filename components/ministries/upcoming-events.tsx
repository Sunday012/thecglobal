"use client"
import { Button } from "@/components/ui/button"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { useEffect, useRef, useState } from "react"

export default function UpcomingEvents() {
  const [isVisible, setIsVisible] = useState(false)
  const sectionRef = useRef<HTMLElement>(null)
  
  const events = [
    {
      date: "15",
      month: "FEB",
      title: "MetCon25",
      time: "All Day Event",
      dates: "February 15-17, 2025",
      dateRange: { start: new Date("2025-02-15"), end: new Date("2025-02-17") },
      tags: ["CONFERENCE", "ALL LOCATIONS"],
      featured: false,
    },
    {
      date: "28",
      month: "AUG",
      title: "CAMPUS INVASION",
      time: "7:00pm - 9:00pm",
      dates: "28th August",
      dateRange: { start: new Date("2024-08-28"), end: new Date("2024-08-28") },
      tags: ["CAMPUS", "YOUTH", "ALL LOCATIONS"],
      featured: false,
    },
    {
      date: "30",
      month: "AUG",
      title: "Faith & Fitness",
      time: "9:00am - 11:00am",
      dates: "30th August",
      dateRange: { start: new Date("2024-08-30"), end: new Date("2024-08-30") },
      tags: ["WELLNESS", "FITNESS", "ALL LOCATIONS"],
      featured: false,
    },
    {
      date: "30",
      month: "AUG",
      title: "Forged Men Talk",
      time: "",
      dates: "30th August",
      dateRange: { start: new Date("2024-08-30"), end: new Date("2024-08-30") },
      tags: ["MEN", "TALK", "ALL LOCATIONS"],
      featured: false,
    },
    {
      date: "29",
      month: "AUG",
      title: "Friday Evening Encounter",
      time: "7:00pm - 9:00pm",
      dates: "29th August",
      dateRange: { start: new Date("2024-08-29"), end: new Date("2024-08-29") },
      tags: ["ENCOUNTER", "FRIDAY", "ALL LOCATIONS"],
      featured: false,
    },
    {
      date: "04",
      month: "OCT",
      title: "7 Days Weight Of Glory Fast",
      time: "",
      dates: "October 04 - October 11",
      dateRange: { start: new Date("2024-10-04"), end: new Date("2024-10-11") },
      tags: ["FAST", "PRAYER", "ALL LOCATIONS"],
      featured: false,
    },
    {
      date: "11",
      month: "OCT",
      title: "7Hour Prayer Charge",
      time: "7:00pm - 2:00am",
      dates: "October 11",
      dateRange: { start: new Date("2024-10-11"), end: new Date("2024-10-11") },
      tags: ["PRAYER", "CHARGE", "ALL LOCATIONS"],
      featured: false,
    },
    {
      date: "25",
      month: "MAR",
      title: "Grace Amplified Tour 2026",
      time: "7:00p - 10:00p CT",
      dates: "Multi-city tour starts March 2026",
      dateRange: { start: new Date("2026-03-25"), end: new Date("2026-03-25") },
      tags: ["TOUR", "WORSHIP", "MULTI-CITY"],
      featured: false,
    },
  ]

  // Function to determine the featured event
  const getFeaturedEvent = () => {
    const today = new Date()
    today.setHours(0, 0, 0, 0) // Reset time for accurate date comparison
    
    // First, check if any event is happening today or during its period
    const currentEvent = events.find(event => {
      const startDate = new Date(event.dateRange.start)
      const endDate = new Date(event.dateRange.end)
      startDate.setHours(0, 0, 0, 0)
      endDate.setHours(23, 59, 59, 999)
      
      return today >= startDate && today <= endDate
    })
    
    if (currentEvent) {
      return currentEvent
    }
    
    // Find the next upcoming event (events that haven't ended yet)
    const upcomingEvents = events.filter(event => {
      const endDate = new Date(event.dateRange.end)
      endDate.setHours(23, 59, 59, 999)
      return endDate >= today // Event hasn't ended yet
    })
    
    if (upcomingEvents.length > 0) {
      // Sort by start date and return the closest one
      upcomingEvents.sort((a, b) => a.dateRange.start.getTime() - b.dateRange.start.getTime())
      return upcomingEvents[0]
    }
    
    // If all events have passed, find the next event by date (regardless of year)
    const allEventsSorted = [...events].sort((a, b) => a.dateRange.start.getTime() - b.dateRange.start.getTime())
    return allEventsSorted[0]
  }

  const featuredEvent = getFeaturedEvent()
  const otherEvents = events.filter(event => event !== featuredEvent)
  
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
          
          {/* Featured Event - Dynamic */}
          <div className="mb-12">
            <div className="bg-gradient-to-r from-[#0A523B] to-[#272f31] rounded-2xl p-8 shadow-lg relative overflow-hidden text-white">
              <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-l from-white/10 to-transparent"></div>
              <div className="relative z-10">
                <div className="flex items-center gap-4 mb-4">
                  <span className="bg-white/20 backdrop-blur-sm text-white px-4 py-2 rounded-full text-sm font-work-sans font-semibold">
                    FEATURED EVENT
                  </span>
                  <span className="bg-white/20 backdrop-blur-sm text-white px-4 py-2 rounded-full text-sm font-work-sans">
                    {featuredEvent.month} {featuredEvent.date}
                  </span>
                </div>
                <h3 className="text-5xl font-rubik font-bold text-white mb-4">{featuredEvent.title}</h3>
                <p className="text-white/90 font-work-sans text-xl mb-8 max-w-2xl">
                  {featuredEvent.title === "MetCon25" 
                    ? "Join us for our flagship conference experience. Three days of powerful worship, transformative teaching, and life-changing encounters with God."
                    : `Join us for ${featuredEvent.title}. ${featuredEvent.time ? `Event time: ${featuredEvent.time}` : "Don't miss this special event!"}`
                  }
                </p>
                <div className="flex flex-wrap gap-4">
                  <Button className="bg-white text-[#0A523B] hover:bg-white/90 font-work-sans font-bold px-8 py-3 rounded-full text-base tracking-wide">
                    REGISTER NOW
                  </Button>
                  <Button variant="outline" className="border-white/30 text-white hover:bg-white/10 font-work-sans font-medium px-8 py-3 rounded-full text-base tracking-wide bg-transparent">
                    LEARN MORE
                  </Button>
                </div>
              </div>
            </div>
          </div>

          {/* Events List */}
          <div className="space-y-6">
            {otherEvents.map((event, index) => (
              <div
                key={index}
                className="flex items-center gap-6 p-6 bg-white rounded-2xl border border-gray-100 transition-all duration-300 hover:shadow-md hover:-translate-y-1"
              >
                <div className="flex-shrink-0">
                  <div className="w-20 h-20 bg-gray-50 rounded-2xl flex flex-col items-center justify-center">
                    <span className="text-2xl font-rubik font-bold text-gray-800">{event.date}</span>
                    <span className="text-xs font-work-sans uppercase tracking-wide text-gray-500">{event.month}</span>
                  </div>
                </div>
                
                <div className="flex-1">
                  <h4 className="text-2xl font-rubik font-bold text-gray-800 mb-2">
                    {event.title}
                  </h4>
                  <p className="text-lg text-gray-600 mb-1 font-work-sans">{event.time}</p>
                  <p className="text-sm text-gray-500 font-work-sans">{event.dates}</p>
                </div>
                
                <div className="flex flex-wrap gap-2">
                  {event.tags.map((tag, tagIndex) => (
                    <span
                      key={tagIndex}
                      className="px-3 py-1 bg-gray-100 text-gray-600 rounded-full text-xs font-work-sans uppercase tracking-wide"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>

          {/* Navigation */}
          <div className="flex justify-center items-center gap-8 mt-16">
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