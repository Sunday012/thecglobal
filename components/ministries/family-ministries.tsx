"use client"

import Image from "next/image"
import { useEffect, useRef, useState } from "react"

export default function FamilyMinistries() {
  const [isVisible, setIsVisible] = useState(false)
  const sectionRef = useRef<HTMLElement>(null)

  const ministries = [
    {
      name: "encounter kids",
      ageRange: "6 WEEKS - 5TH GRADE",
      description:
        "We want to lean in with the families of our House who are raising a generation of children to know and walk in a relationship with Jesus. We want to see the children in our encounter kids environment not only bloom and grow physically but also in faith as they learn foundational truths about who Jesus is.",
      image:
        "https://res.cloudinary.com/dzckvrvu9/image/upload/v1752758816/WhatsApp-Image-2024-02-19-at-03.16.21_gkmxj0.jpg",
    },
    {
      name: "Encounter Kids",
      ageRange: "K-5TH",
      description:
        "Jesus is our lead story. In fact, He's our only story – even in Encounter Kids. We want to lean in with the families of our House who are raising a generation of children to know and walk in a relationship with Jesus.",
      image:
        "https://res.cloudinary.com/dzckvrvu9/image/upload/v1752758812/WhatsApp-Image-2024-02-19-at-03.15.22_iei4jc.jpg",
    },
    {
      name: "Encounter Students",
      ageRange: "MIDDLE - HIGH SCHOOL",
      description:
        "Encounter Students exists to awaken and inspire a generation of middle and high school students to live their lives for what matters most, the fame and renown of Jesus.",
      image:
        "https://res.cloudinary.com/dzckvrvu9/image/upload/v1752758815/WhatsApp-Image-2024-02-19-at-03.15.59_yr6rbv.jpg",
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
            <p className="text-gray-500 font-work-sans text-sm mb-4 uppercase tracking-wide">EXPERIENCING JESUS</p>
            <h2 className="text-6xl font-rubik font-bold text-gray-800 mb-8">
              A Place <em className="font-rubik italic">For Families</em>
            </h2>
            <p className="text-gray-600 font-work-sans text-lg max-w-4xl mx-auto">
              We want to provide a space for your family to experience Jesus. He is our lead story in every room of our
              House. We want to lean in with the families of our House who are raising the next generation to know and
              walk in relationship with Him.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {ministries.map((ministry, index) => (
              <div
                key={index}
                className={`bg-white border border-gray-100 rounded-2xl overflow-hidden group cursor-pointer transition-all duration-500 hover:shadow-lg hover:-translate-y-2 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}
                style={{ transitionDelay: `${index * 200}ms` }}
              >
                <div className="relative aspect-[4/3]">
                  <Image
                    src={ministry.image || "/placeholder.svg"}
                    alt={ministry.name}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                  <div className="absolute top-4 left-4">
                    <span className="bg-white/90 text-gray-700 px-3 py-1 rounded-full text-xs font-work-sans uppercase tracking-wide">
                      {ministry.ageRange}
                    </span>
                  </div>
                  <div className="absolute bottom-4 left-4">
                    <h3 className="text-white font-rubik font-bold text-2xl">{ministry.name}</h3>
                  </div>
                </div>
                <div className="p-6">
                  <p className="text-gray-600 font-work-sans text-sm leading-relaxed">{ministry.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
