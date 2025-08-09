"use client"

import { useEffect, useRef, useState } from "react"

export default function EternalTruths() {
  const [isVisible, setIsVisible] = useState(false)
  const sectionRef = useRef<HTMLElement>(null)

  const eternalTruths = [
    {
      title: "RESURRECTION",
      content:
        "Jesus Christ was physically resurrected from the dead in a glorified body three days after His death on the cross. In addition, both the saved and the lost will be resurrected; they that are saved to the resurrection of life and they that are lost to the resurrection of eternal damnation (Luke 24:16, 36, 39; John 2:19-21, 20:26-28, 21:4; Acts 24:15; I Corinthians 15:42, 44; Philippians 1:21-23, 3:21).",
    },
    {
      title: "HEAVEN",
      content:
        "Heaven is the eternal dwelling place for all believers in the Gospel of Jesus Christ (Matthew 5:3, 12, 20, 6:20, 19:21, 25:34; John 17:24; II Corinthians 5:1; Hebrews 11:16; I Peter 1:4).",
    },
    {
      title: "HELL",
      content:
        "After living one life on earth, the unbelievers will be judged by God and sent to Hell where they will be eternally tormented with the Devil and the Fallen Angels (Matthew 25:41; Mark 9:43-48; Hebrews 9:27; Revelation 14:9-11, 20:12-15, 21:8).",
    },
    {
      title: "SECOND COMING",
      content:
        "Jesus Christ will physically and visibly return to earth for the second time to establish His Kingdom. This will occur at a date undisclosed by the Scriptures (Matthew 24:30, 26:63-64; Acts 1:9-11; I Thessalonians 4:15-17; II Thessalonians 1:7-8; Revelation 1:7).",
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
          <h2 className="text-5xl lg:text-6xl font-montserrat font-bold text-[#272f31] mb-16 text-center">
            Eternal Truths
          </h2>

          <div className="grid lg:grid-cols-2 gap-8">
            {eternalTruths.map((truth, index) => (
              <div
                key={index}
                className={`bg-gray-50 rounded-2xl p-6 transition-all duration-500 hover:shadow-lg ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}
                style={{ transitionDelay: `${index * 150}ms` }}
              >
                <h3 className="text-xl font-montserrat font-bold text-[#0A523B] mb-4">{truth.title}</h3>
                <p className="text-[#272f31] font-work-sans text-sm leading-relaxed">{truth.content}</p>
              </div>
            ))}
          </div>

          {/* Call to Action */}
          <div className="text-center mt-16">
            <div className="bg-[#0A523B] rounded-2xl p-8 text-white">
              <h3 className="text-3xl font-montserrat font-bold mb-4">
                Glory of God. Radical Grace. Extravagant Worship.
              </h3>
              <p className="text-white/90 font-work-sans text-lg leading-relaxed max-w-3xl mx-auto">
                These beliefs form the foundation of our faith and guide everything we do at The Encounter Center
                Church. We invite you to explore these truths and discover how they can transform your life.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
