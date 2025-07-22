"use client"

import { Plus, Minus } from "lucide-react"
import { useEffect, useRef, useState } from "react"

export default function OurValues() {
  const [isVisible, setIsVisible] = useState(false)
  const [expandedItems, setExpandedItems] = useState<number[]>([])
  const sectionRef = useRef<HTMLElement>(null)

  const values = [
    {
      title: "Jesus is Our Lead Story",
      content:
        "Everything we do centers around Jesus Christ. He is not just part of our story - He is the main character, the beginning and the end, the reason we exist as a church community.",
    },
    {
      title: "The Gospel is Central",
      content:
        "The good news of Jesus Christ's death and resurrection is at the heart of everything we believe and do. It shapes our worship, our community, and our mission to the world.",
    },
    {
      title: "Worship is a Lifestyle",
      content:
        "Worship isn't confined to Sunday mornings. It's how we live every day - honoring God in our work, relationships, and daily choices. Every moment is an opportunity to worship.",
    },
    {
      title: "Generosity is Normal",
      content:
        "We believe in radical generosity because God has been radically generous to us. Giving of our time, talents, and treasures is not an obligation but a joyful response to God's grace.",
    },
    {
      title: "We Are Family",
      content:
        "The church is more than an organization - we're a family. We care for one another, celebrate together, and support each other through life's challenges and victories.",
    },
    {
      title: "We>Me",
      content:
        "Community comes before individual preferences. We prioritize the good of the whole over personal desires, understanding that we're stronger together than apart.",
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
    <section ref={sectionRef} className="bg-[#FAE8A1] py-20 px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <div
          className={`transition-all duration-1000 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}
        >
          <h2 className="text-[#272f31]/70 font-rubik italic text-2xl mb-12">This is How We Describe Us...</h2>

          <div className="space-y-8">
            {values.map((value, index) => (
              <div key={index} className="border-b border-[#272f31]/20 pb-8">
                <button
                  onClick={() => toggleItem(index)}
                  className="w-full flex items-center justify-between text-left group"
                >
                  <div className="flex items-center space-x-8">
                    <span className="text-[#272f31]/40 font-rubik text-6xl font-light">
                      {String(index + 1).padStart(2, "0")}
                    </span>
                    <h3 className="text-[#272f31] font-rubik font-bold text-2xl lg:text-3xl group-hover:text-[#0A523B] transition-colors">
                      {value.title}
                    </h3>
                  </div>
                  <div className="text-[#272f31] group-hover:text-[#0A523B] transition-colors">
                    {expandedItems.includes(index) ? <Minus size={24} /> : <Plus size={24} />}
                  </div>
                </button>
                {expandedItems.includes(index) && (
                  <div className="mt-6 ml-24 animate-fade-in-up">
                    <p className="text-[#272f31] font-work-sans text-lg leading-relaxed">{value.content}</p>
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
