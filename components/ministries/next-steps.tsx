"use client"

import { Button } from "@/components/ui/button"
import Image from "next/image"
import { useEffect, useRef, useState } from "react"

export default function NextSteps() {
  const [isVisible, setIsVisible] = useState(false)
  const sectionRef = useRef<HTMLElement>(null)

  const steps = [
    {
      category: "LEARNING TO FOLLOW JESUS",
      title: "I'm New to Faith",
      description:
        "Take this step if you recently put your faith in Jesus or if you are exploring what it means to follow Him.",
      image:
        "https://res.cloudinary.com/dzckvrvu9/image/upload/v1752758817/WhatsApp-Image-2024-02-19-at-03.15.04-1536x1023_ewhb3o.jpg",
    },
    {
      category: "FIND YOUR PLACE",
      title: "I Want to Get Connected",
      description: "Take this step if you are looking to build community where you live.",
      image:
        "https://res.cloudinary.com/dzckvrvu9/image/upload/v1752758816/WhatsApp-Image-2024-02-19-at-03.16.21_gkmxj0.jpg",
    },
    {
      category: "BECOME A DOOR HOLDER",
      title: "I Want to Start Serving",
      description: "Take this step if you want to start serving and help make a way for people to experience Jesus.",
      image:
        "https://res.cloudinary.com/dzckvrvu9/image/upload/v1752758812/WhatsApp-Image-2024-02-19-at-03.15.22_iei4jc.jpg",
    },
    {
      category: "PRACTICAL, THEOLOGICAL, DISCIPLESHIP",
      title: "I Want to Grow In My Faith",
      description:
        "Take this step if you are looking to become theologically discipled and equipped to live the Christian life.",
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
    <section ref={sectionRef} className="bg-white py-20 px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div
          className={`transition-all duration-1000 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}
        >
          <div className="text-center mb-16">
            <p className="text-gray-500 font-work-sans text-sm mb-4 uppercase tracking-wide">FIND YOUR PLACE</p>
            <h2 className="text-6xl font-rubik font-bold text-gray-800 mb-8">
              Next <em className="font-rubik italic">Steps</em>
            </h2>
            <p className="text-gray-600 font-work-sans text-lg max-w-4xl mx-auto">
              Looking to find your place, or learn more about walking with Jesus? Check out these ways to get involved
              at The Encounter Center Church.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {steps.map((step, index) => (
              <div
                key={index}
                className={`bg-white border border-gray-100 rounded-2xl overflow-hidden group cursor-pointer transition-all duration-500 hover:shadow-lg hover:-translate-y-2 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}
                style={{ transitionDelay: `${index * 150}ms` }}
              >
                <div className="relative aspect-square">
                  <Image
                    src={step.image || "/placeholder.svg"}
                    alt={step.title}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                  <div className="absolute top-4 left-4 right-4">
                    <p className="text-white/80 font-work-sans text-xs uppercase tracking-wide">{step.category}</p>
                  </div>
                  <div className="absolute bottom-4 left-4 right-4">
                    <Button className="w-full bg-[#0A523B] hover:bg-[#0A523B]/80 text-white font-work-sans font-medium py-3 rounded-full text-sm tracking-wide">
                      LEARN MORE
                    </Button>
                  </div>
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-rubik font-bold text-gray-800 mb-3">{step.title}</h3>
                  <p className="text-gray-600 font-work-sans text-sm leading-relaxed">{step.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
