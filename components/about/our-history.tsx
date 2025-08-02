"use client"

import Image from "next/image"
import { useEffect, useRef, useState } from "react"

export default function OurHistory() {
  const [isVisible, setIsVisible] = useState(false)
  const sectionRef = useRef<HTMLElement>(null)

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
          <h2 className="text-6xl font-montserrat font-bold text-[#272f31] mb-16 text-center">Our History</h2>

          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h3 className="text-3xl font-rubik font-bold text-[#272f31] mb-8">
                We are: For God. For people.
                <br />
                For the city. For the world.
              </h3>
              <div className="space-y-6 text-[#272f31] font-work-sans text-lg leading-relaxed">
                <p>
                  The Encounter Center Church began with a stirring in the hearts of Pastor John and Sarah Smith for the
                  local church. Born out of the Encounter Movement (a decades-old movement among the collegiate
                  generation), they sought to plant a local community of faith impacted and informed by the DNA of
                  Encounter.
                </p>
                <p>
                  With a small team of people, that vision took flight in 2015, as small gatherings began in homes
                  throughout Houston. The desire was to foster a family of believers connected by a common faith, on
                  mission in the city and the world to amplify the name of Jesus.
                </p>
                <p>
                  And that's exactly what happened. Our first gathering was held on March 20, 2016, in Houston at The
                  Community Center. From there, God faithfully provided, as our little tribe met at various locations
                  all over the city of Houston until we landed in our first permanent gathering site at 15000 Bellaire
                  Blvd. Since then we've added a location in Springfield, Illinois whose weekly gatherings started in
                  September of 2020.
                </p>
                <p>
                  The Encounter Center Church remains a place where the gospel is central and Jesus is always the lead
                  story. We are a Jesus church and want to gather in worship and scatter to shine His light and love
                  throughout Houston, Springfield, and beyond.
                </p>
              </div>
            </div>
            <div className="relative">
              <Image
                src="https://res.cloudinary.com/dzckvrvu9/image/upload/v1752758812/WhatsApp-Image-2024-02-19-at-03.15.22_iei4jc.jpg"
                alt="Church community gathering"
                width={600}
                height={500}
                className="rounded-2xl object-cover"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
