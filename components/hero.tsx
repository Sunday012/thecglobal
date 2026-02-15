"use client"
import { Button } from "@/components/ui/button"

export default function Hero() {
  return (
    <section className="relative min-h-[80vh] h-screen w-full flex items-center bg-white">

      {/* Content */}
      <div className="relative z-10 h-full flex items-center w-full">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-10 w-full">
          <div className="max-w-2xl mt-24 sm:mt-32">
            {/* Main Title */}
            <h1 className="mb-6 sm:mb-8">
              <div className="text-black font-montserrat font-bold text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl leading-tight tracking-tighter">
                Encounter God.
              </div>
              <div className="text-black font-montserrat font-bold text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl leading-tight tracking-tighter whitespace-nowrap">
                Expand His Kingdom.
              </div>
              <div className="text-black font-montserrat font-bold text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl leading-tight tracking-tighter">
                Transform Your World.
              </div>
            </h1>

            {/* Description */}
            <p className="text-gray-600 font-work-sans text-sm sm:text-base lg:text-lg leading-relaxed mb-6 sm:mb-8 max-w-xl">
              Welcome to The Encounter Center — where Christ is at the center, lives are transformed, and people are empowered to expand God’s kingdom in every sphere of life.
            </p>

            {/* CTA Button */}
            <Button
              size="lg"
              className="bg-black hover:bg-gray-800 text-white font-work-sans font-medium h-[48px] sm:h-[52px] px-6 sm:px-8 py-3 sm:py-4 rounded-full text-base tracking-wide transition-all duration-300"
            >
              LEARN MORE
            </Button>
          </div>
        </div>
      </div>
    </section>
  )
}