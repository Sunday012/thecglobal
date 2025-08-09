"use client"

import { useEffect, useRef, useState } from "react"

export default function ChristianPractices() {
  const [isVisible, setIsVisible] = useState(false)
  const sectionRef = useRef<HTMLElement>(null)

  const practices = [
    {
      title: "Water Baptism",
      content:
        "Following faith in the Lord Jesus Christ, the new convert is commanded by the Word of God to be baptized in water in the Name of the Father and of the Son and of the Holy Spirit (Matthew 28:19; Acts 2:38; Mark 16:16; Acts 8:12, 36-38; 10:47-48).",
    },
    {
      title: "The Lord's Supper",
      content:
        "A unique time of communion in the presence of God when the elements of bread and grape juice (the Body and Blood of the Lord Jesus Christ) are taken in remembrance of Jesus' sacrifice on the Cross (Matthew 26:26-29; I Corinthians 10:16, 11:23-25).",
    },
    {
      title: "Marriage",
      content:
        "We believe marriage is defined in the Bible as a covenant, a sacred bond between one man and one woman, instituted by and publicly entered into before God (Matthew 19:4-6).",
    },
    {
      title: "Healing of the Sick",
      content:
        "Healing of the sick is illustrated in the life and ministry of Jesus, and included in the commission of Jesus to His disciples. It is given as a sign, which is to follow believers. It is also a part of Jesus' work on the Cross and one of the gifts of the Spirit. (Psalm 103:2-3; Isaiah 53:5; Matthew 8:16-17; Mark 16:17-18; Acts 8:6-7; James 5:14-16; I Corinthians 12:9, 28; Romans 11:29).",
    },
  ]

  const provision = [
    {
      category: "Spiritual",
      description: "(John 3:3-11; II Corinthians 5:17-21; Romans 10:9-10)",
    },
    {
      category: "Mental and Emotional",
      description: "(II Timothy 1:7, 2:11; Philippians 4:7-8; Romans 12:2; Isaiah 26:3)",
    },
    {
      category: "Physical",
      description: "(Isaiah 53:4,5; Matthew 8:17; I Peter 2:24)",
    },
    {
      category: "Financial",
      description:
        "(Joshua 1:8; Malachi 3:10-11; Luke 6:38; II Corinthians 9:6-10; Deuteronomy 28:1-14; Psalm 34:10, 84:11; Philippians 4:19)",
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
    <section ref={sectionRef} className="bg-[#FAE8A1] py-20 px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        <div
          className={`transition-all duration-1000 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}
        >
          <h2 className="text-5xl lg:text-6xl font-montserrat font-bold text-[#272f31] mb-16 text-center">
            Christian Practices
          </h2>

          <div className="grid lg:grid-cols-2 gap-8 mb-16">
            {practices.map((practice, index) => (
              <div
                key={index}
                className={`bg-white rounded-2xl p-6 transition-all duration-500 hover:shadow-lg ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}
                style={{ transitionDelay: `${index * 100}ms` }}
              >
                <h3 className="text-xl font-montserrat font-bold text-[#0A523B] mb-4">{practice.title}</h3>
                <p className="text-[#272f31] font-work-sans text-sm leading-relaxed">{practice.content}</p>
              </div>
            ))}
          </div>

          {/* God's Will for Provision */}
          <div className="bg-white rounded-2xl p-8">
            <h3 className="text-2xl font-montserrat font-bold text-[#0A523B] mb-6">GOD'S WILL FOR PROVISION</h3>
            <p className="text-[#272f31] font-work-sans text-lg leading-relaxed mb-8">
              It is the Father's will for believers to become whole, healthy and successful in all areas of life. But
              because of the fall, many may not receive the full benefits of God's will while on Earth. That fact,
              though, should never prevent all believers from seeking the full benefits of Christ's provision in order
              to better serve others.
            </p>
            <div className="grid md:grid-cols-2 gap-6">
              {provision.map((item, index) => (
                <div key={index} className="flex items-start space-x-3">
                  <div className="w-3 h-3 bg-[#0A523B] rounded-full mt-2 flex-shrink-0"></div>
                  <div>
                    <h4 className="text-lg font-montserrat font-bold text-[#272f31] mb-2">{item.category}</h4>
                    <p className="text-[#272f31]/70 font-work-sans text-sm">{item.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
