"use client"
import { Button } from "@/components/ui/button"
import Image from "next/image"
import { useEffect, useRef, useState } from "react"

export default function NextSteps() {
  const [isVisible, setIsVisible] = useState(false)
  const sectionRef = useRef<HTMLElement>(null)

  const ministries = [
    {
      category: "INTERCESSION & OUTREACH",
      title: "Prayer & Evangelism",
      tagline: "Fueling revival. Reaching the lost.",
      description: "We stand in the gap through bold intercession and step out in faith to share the love of Jesus. Whether praying behind the scenes or hitting the streets, we believe every soul matters.",
      image: "https://res.cloudinary.com/dzckvrvu9/image/upload/v1752758817/WhatsApp-Image-2024-02-19-at-03.15.04-1536x1023_ewhb3o.jpg",
    },
    {
      category: "CREATIVE EXCELLENCE",
      title: "Media & Production",
      tagline: "Creativity with a purpose.",
      description: "We capture moments, tell stories, and support every experience with excellence, both in-house and online. From sound to visuals to live broadcasts, we use our gifts to amplify the message of Jesus.",
      image: "https://res.cloudinary.com/dzckvrvu9/image/upload/v1752758816/WhatsApp-Image-2024-02-19-at-03.16.21_gkmxj0.jpg",
    },
    {
      category: "WORSHIP & MUSIC",
      title: "TEC Voices",
      tagline: "Revealing Jesus through sound and Spirit.",
      description: "Our worship team leads the church into God's presence through anointed music and heartfelt worship. We believe worship is both a lifestyle and a ministry that transforms hearts.",
      image: "https://res.cloudinary.com/dzckvrvu9/image/upload/v1752758812/WhatsApp-Image-2024-02-19-at-03.15.22_iei4jc.jpg",
    },
    {
      category: "WOMEN'S MINISTRY",
      title: "Her Haven",
      tagline: "A safe space for every woman to grow and thrive.",
      description: "Her Haven exists to build up strong women of the Word, equipped for every season of life and service. We gather, grow, and go in grace and power.",
      image: "https://res.cloudinary.com/dzckvrvu9/image/upload/v1752758815/WhatsApp-Image-2024-02-19-at-03.15.59_yr6rbv.jpg",
    },
    {
      category: "STUDENT MINISTRY",
      title: "Campus Ministry",
      tagline: "Revival starts on campus.",
      description: "We're raising bold students who love Jesus, live on mission, and carry the fire of God into their schools. Faith isn't just for Sunday, it's for lecture halls, dorm rooms, and every conversation.",
      image: "https://res.cloudinary.com/dzckvrvu9/image/upload/v1754761106/dom-fou-YRMWVcdyhmI-unsplash_ytqdpx.jpg",
    },
    {
      category: "WELLNESS MINISTRY",
      title: "Faith & Fitness",
      tagline: "Whole health. Holy living.",
      description: "We believe spiritual strength and physical discipline go hand-in-hand. This ministry cultivates a lifestyle of balance, wellness, and wholeness in spirit, soul, and body.",
      image: "https://res.cloudinary.com/dzckvrvu9/image/upload/v1754761106/tim-foster-3wAPJB57w6s-unsplash_ax32zw.jpg",
    },
    {
      category: "GUEST EXPERIENCE",
      title: "Hospitality",
      tagline: "Big smiles, warm hellos, feeling right at home.",
      description: "We're all about making you feel welcomed as family! From the moment you walk in, our team is here to greet you with love and make sure you leave feeling cared for.",
      image: "https://res.cloudinary.com/dzckvrvu9/image/upload/v1752758812/WhatsApp-Image-2024-02-19-at-03.15.22_iei4jc.jpg",
    },
    {
      category: "CHILDREN'S MINISTRY",
      title: "Kid Min",
      tagline: "Where little hearts grow BIG in Jesus!",
      description: "Fun, safe, and packed with Bible stories, games, and laughter, our Kid Min is the place kids can be kids while learning about God's amazing love.",
      image: "https://res.cloudinary.com/dzckvrvu9/image/upload/v1754761108/erika-giraud-4EFeD-VTgu4-unsplash_lrjbgv.jpg",
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
            <p className="text-[#0A523B] font-work-sans text-sm mb-4 uppercase tracking-wide font-semibold">GET INVOLVED</p>
            <h2 className="text-6xl font-rubik font-bold text-[#272f31] mb-8">
              Places to <em className="font-rubik italic text-[#0A523B]">Serve</em>
            </h2>
            <p className="text-gray-600 font-work-sans text-lg max-w-4xl mx-auto">
              Every gift matters, every calling counts. Find where your passion meets God's purpose and join us in
              making a difference in our church and community.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
            {ministries.map((ministry, index) => (
              <div
                key={index}
                className={`bg-white rounded-2xl overflow-hidden shadow-sm group cursor-pointer transition-all duration-500 hover:shadow-xl hover:-translate-y-3 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}
                style={{ transitionDelay: `${index * 100}ms` }}
              >
                <div className="relative h-48">
                  <Image
                    src={ministry.image}
                    alt={ministry.title}
                    fill
                    className="object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />

                  <div className="absolute top-4 left-4 right-4">
                    <span className="inline-block bg-white/20 backdrop-blur-sm text-white text-xs font-work-sans uppercase tracking-wider px-3 py-1 rounded-full">
                      {ministry.category}
                    </span>
                  </div>

                  <div className="absolute bottom-4 left-4 right-4">
                    <h3 className="text-white text-xl font-rubik font-bold mb-1">
                      {ministry.title}
                    </h3>
                    <p className="text-white/90 text-sm font-work-sans italic">
                      {ministry.tagline.length > 30 ? ministry.tagline.substring(0, 30) + "..." : ministry.tagline}
                    </p>
                  </div>
                </div>

                <div className="p-6">
                  <p className="text-gray-600 font-work-sans text-sm leading-relaxed mb-6">
                    {ministry.description.length > 150 ? ministry.description.substring(0, 150) + "..." : ministry.description}
                  </p>

                  {/* <Button className="w-full bg-[#0A523B] hover:bg-[#0A523B]/90 text-white font-work-sans font-medium py-3 rounded-full text-sm tracking-wide transition-all duration-300 group-hover:bg-[#272f31]">
                    JOIN THIS TEAM
                  </Button> */}
                </div>
              </div>
            ))}
          </div>

          <div className="text-center mt-16">
            <p className="text-gray-600 font-work-sans text-lg mb-6">
              Don't see the perfect fit? We'd love to hear about your unique gifts and calling.
            </p>
            <Button className="bg-[#272f31] hover:bg-[#272f31]/90 text-white font-work-sans font-medium px-8 py-4 rounded-full text-lg tracking-wide">
              LET'S TALK
            </Button>
          </div>
        </div>
      </div>
    </section>
  )
}