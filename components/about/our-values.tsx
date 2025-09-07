"use client"
import { Plus, Minus } from "lucide-react"
import { useEffect, useRef, useState } from "react"

export default function OurCultureDNA() {
  const [isVisible, setIsVisible] = useState(false)
  const [expandedItems, setExpandedItems] = useState<number[]>([])
  const sectionRef = useRef<HTMLElement>(null)

  const values = [
    {
      title: "Jesus Always",
      content:
        "Everything starts and ends with Him. No hype, just Jesus.",
    },
    {
      title: "Word + Spirit",
      content:
        "We teach truth. We flow with the Spirit. Both matters. Always.",
    },
    {
      title: "Presence > Performance",
      content:
        "We host God, not a show. If He's not in it, we don't want it.",
    },
    {
      title: "Disciples, Not Just Attenders",
      content:
        "We don't do passive Christianity. We raise leaders and send them out.",
    },
    {
      title: "Excellence is Our Worship",
      content:
        "God gave His best, we give ours. From music to media to greeting at the door.",
    },
    {
      title: "Family Vibes",
      content:
        "We do life together. Real love. Real accountability. Real growth.",
    },
    {
      title: "Bold Faith. Real Power.",
      content:
        "Miracles, healing, breakthrough? We expect them.",
    },
    {
      title: "Kingdom Everywhere",
      content:
        "Church isn't just a Sunday thing. We take Jesus into every space, school, work, media, business, and more.",
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

  const toggleItem = (index: number) => {
    setExpandedItems((prev) => (prev.includes(index) ? prev.filter((i) => i !== index) : [...prev, index]))
  }

  return (
    <section
      ref={sectionRef}
      className="bg-[#FAE8A1] py-12 px-4 sm:py-16 sm:px-6 md:py-20 md:px-8"
    >
      <div className="max-w-4xl mx-auto">
        <div
          className={`transition-all duration-1000 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}
        >
          <h2 className="text-[#272f31] font-rubik font-bold text-3xl sm:text-4xl md:text-5xl lg:text-6xl mb-4 sm:mb-6">
            Our Culture & DNA
          </h2>
          <h3 className="text-[#272f31]/70 font-rubik italic text-lg sm:text-xl md:text-2xl mb-4 sm:mb-8">
            What makes us, us.
          </h3>
          <p className="text-[#272f31] font-work-sans text-base sm:text-lg md:text-xl mb-8 sm:mb-12 md:mb-16 leading-relaxed">
            We're not just a church. We're a movement marked by presence, power, and purpose. Here's what we bleed:
          </p>
          
          <div className="space-y-6 sm:space-y-8">
            {values.map((value, index) => (
              <div key={index} className="border-b border-[#272f31]/20 pb-6 sm:pb-8">
                <button
                  onClick={() => toggleItem(index)}
                  className="w-full flex flex-row sm:items-center justify-between text-left group"
                >
                  <div className="flex items-center space-x-4 sm:space-x-8">
                    <span className="text-[#272f31]/40 font-rubik text-3xl sm:text-4xl md:text-6xl font-light">
                      {String(index + 1).padStart(2, "0")}
                    </span>
                    <h4 className="text-[#272f31] font-rubik font-bold text-lg sm:text-xl md:text-2xl lg:text-3xl group-hover:text-[#0A523B] transition-colors">
                      {value.title}
                    </h4>
                  </div>
                  <div className="mt-2 sm:mt-0 text-[#272f31] group-hover:text-[#0A523B] transition-colors flex-shrink-0">
                    {expandedItems.includes(index) ? <Minus size={24} /> : <Plus size={24} />}
                  </div>
                </button>
                {expandedItems.includes(index) && (
                  <div className="mt-4 sm:mt-6 ml-8 sm:ml-24 animate-fade-in-up">
                    <p className="text-[#272f31] font-work-sans text-base sm:text-lg leading-relaxed">{value.content}</p>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}