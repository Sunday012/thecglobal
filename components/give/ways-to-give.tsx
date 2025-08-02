"use client"

import { Button } from "@/components/ui/button"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { useEffect, useRef, useState } from "react"

export default function WaysToGive() {
  const [isVisible, setIsVisible] = useState(false)
  const [currentSlide, setCurrentSlide] = useState(0)
  const sectionRef = useRef<HTMLElement>(null)

  const givingMethods = [
    {
      title: "Returning\nGivers",
      description:
        "CONNECT is a safe and easy way to invest in all God is doing through our House here at The Encounter Center Church. Click the link below to create an account or sign into your existing one, and you can start managing your giving online.",
      button: "RETURNING GIVERS",
      hasButton: true,
    },
    {
      title: "Text to Give",
      description:
        "You can give to The Encounter Center Church using your mobile phone! Give instantly from your credit/debit card with a single text message. Send a text with any amount and ECC to 45777. (For example, 50 ECC)",
      hasButton: false,
    },
    {
      title: "Gifts By Mail",
      description:
        "Please make your check payable to: The Encounter Center Church. If you are giving to a Houston location, please indicate the location in the memo field or account number field if using Bill Pay.\n\nWe are unable to split gifts between locations.",
      extraContent: (
        <div className="mt-6">
          <p className="text-[#272f31] font-work-sans font-medium text-sm mb-2">Our mailing address is:</p>
          <p className="text-[#272f31]/70 font-work-sans text-sm mb-4">
            15000 Bellaire Blvd Unit W<br />
            Houston, TX 77083
          </p>
          <div>
            <p className="text-[#272f31] font-work-sans font-medium text-sm mb-1">If you are using a Donor Fund:</p>
            <p className="text-[#272f31]/70 font-work-sans text-sm">
              <strong>The Encounter Center Church's Tax ID:</strong> 27-1721038
              <br />
              <strong>Springfield Location Tax ID:</strong> 82-2413995
            </p>
          </div>
        </div>
      ),
      button: "CONTACT US",
      hasButton: true,
    },
    {
      title: "Giving",
      description: "If you would like to give in other ways, please feel free to contact us for more information.",
      button: "CONTACT US",
      hasButton: true,
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

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % givingMethods.length)
  }

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + givingMethods.length) % givingMethods.length)
  }

  const goToSlide = (index: number) => {
    setCurrentSlide(index)
  }

  return (
    <section ref={sectionRef} className="bg-gray-50 py-20 px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div
          className={`transition-all duration-1000 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}
        >
          <h2 className="text-6xl lg:text-7xl font-montserrat font-bold text-[#272f31] mb-16">Ways to Give</h2>

          {/* Carousel Container */}
          <div className="relative">
            <div className="overflow-hidden">
              <div
                className="flex transition-transform duration-500 ease-in-out"
                style={{ transform: `translateX(-${currentSlide * 100}%)` }}
              >
                {givingMethods.map((method, index) => (
                  <div key={index} className="w-full flex-shrink-0">
                    <div className="grid lg:grid-cols-4 gap-8 px-4">
                      {/* Show current method prominently */}
                      <div className="lg:col-span-4">
                        <div className="bg-white rounded-2xl p-8 max-w-2xl mx-auto">
                          <h3 className="text-4xl lg:text-5xl font-montserrat font-bold text-[#272f31] mb-6 whitespace-pre-line">
                            {method.title}
                          </h3>
                          <p className="text-[#272f31]/70 font-work-sans text-lg leading-relaxed mb-8 whitespace-pre-line">
                            {method.description}
                          </p>
                          {method.extraContent}
                          {method.hasButton && (
                            <Button className="bg-[#0A523B] hover:bg-[#0A523B]/80 text-white font-work-sans font-medium px-6 py-3 rounded-full text-sm tracking-wide mt-6">
                              {method.button}
                            </Button>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Navigation Arrows */}
            <div className="flex justify-center items-center space-x-8 mt-12">
              <button
                onClick={prevSlide}
                className="p-3 text-[#272f31]/70 hover:text-[#272f31] transition-colors"
                aria-label="Previous giving method"
              >
                <ChevronLeft size={32} />
              </button>

              {/* Dots Indicator */}
              <div className="flex space-x-2">
                {givingMethods.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => goToSlide(index)}
                    className={`w-3 h-3 rounded-full transition-colors ${
                      index === currentSlide ? "bg-[#0A523B]" : "bg-[#272f31]/20"
                    }`}
                    aria-label={`Go to slide ${index + 1}`}
                  />
                ))}
              </div>

              <button
                onClick={nextSlide}
                className="p-3 text-[#272f31]/70 hover:text-[#272f31] transition-colors"
                aria-label="Next giving method"
              >
                <ChevronRight size={32} />
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
