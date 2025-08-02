"use client"

import Image from "next/image"
import { useEffect, useRef, useState } from "react"

export default function WhyWeGive() {
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
          <h2 className="text-6xl lg:text-7xl font-montserrat font-bold text-[#272f31] mb-16 text-center">
            Why We Give
          </h2>

          <div className="grid lg:grid-cols-2 gap-12">
            <div className="relative">
              <Image
                src="/images/the-church.jpg"
                alt="Church worship crowd with raised hands"
                width={600}
                height={400}
                className="rounded-2xl object-cover"
              />
            </div>
            <div className="space-y-6">
              <p className="text-[#272f31] font-work-sans text-lg leading-relaxed">
                At The Encounter Center Church, we don't say, "we're going to take the offering". Simply stated: God is
                not a taker. God is a giver. So we give the offering. Here's the truth: there's nothing you and I have
                that God needs.
              </p>
              <p className="text-[#272f31] font-work-sans text-lg leading-relaxed">
                God doesn't want to take the offering.
              </p>
              <p className="text-[#272f31] font-work-sans text-lg leading-relaxed">
                God doesn't want to take our money.
              </p>
              <p className="text-[#272f31] font-work-sans text-lg leading-relaxed">
                Because, God doesn't need our money.
              </p>
              <p className="text-[#272f31] font-work-sans text-lg leading-relaxed">
                On the other hand, God has let go of everything. He sent His Son to give us life and breath and freedom.
                To set us free from our chains, from our bondage, from what enslaved us. To deliver us out of death and
                into life. To give us Himself. So in response to all He's done we say, "God I want the world to know
                about Jesus. So I'm going to give into our House. I'm going to give into The Encounter Center Church
                because I believe here my money will be multiplied to help the city and the world come to know Jesus. At
                the end of the day, when I stand in heaven I'm going to know that money wasn't lost. That money was
                gained because it multiplied itself over and over again into people's lives."
              </p>
              <p className="text-[#272f31] font-work-sans text-lg leading-relaxed">
                So the prayer is that God would take our hearts today. Capture us today. Awaken us to that fact that He
                loves us and cares for us. There's nothing we have that He doesn't already have a million times over
                more than we have. And there's nothing we have that didn't come from Him first. Then, we will have this
                great privilege and ability to respond by joining Him with our time, our energy, our gifts, our
                opportunities, and our money. We have this opportunity to lean into the things that last forever and
                sewing into what God is doing here in this House.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
