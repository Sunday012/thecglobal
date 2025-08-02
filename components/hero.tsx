"use client"
import { Button } from "@/components/ui/button"
import Image from "next/image"

export default function Hero() {
  return (
    <section className="relative h-screen w-full">
      {/* Full-Screen Background Image */}
      <div className="absolute inset-0 z-0">
        <Image
          src="/images/thegif.gif"
          alt="Church worship service"
          fill
          className="object-cover"
          priority
        />
        {/* Dark overlay for better text readability */}
        <div className="absolute inset-0 bg-black/40" />
      </div>
      
      {/* Content */}
      <div className="relative z-10 h-full flex items-center">
        <div className="max-w-7xl mx-auto px-6 lg:px-10 w-full">
          <div className="max-w-2xl  mt-32">
            {/* Main Title */}
            <h1 className="mb-8">
              <div className="text-white font-montserrat font-bold text-5xl lg:text-6xl xl:text-7xl leading-tight tracking-tighter">
              Encounter God.
              </div>
              <div className="text-white font-montserrat font-bold text-5xl lg:text-6xl xl:text-7xl leading-tight tracking-tighter">
              Expand His Kingdom. Transform Your World.
              </div>
            </h1>
            
            {/* Description */}
            <p className="text-white/90 font-work-sans text-base lg:text-lg leading-relaxed mb-8 max-w-xl">
            Welcome to The Encounter Center — where Christ is at the center, lives are transformed, and people are empowered to expand God’s kingdom in every sphere of life.
            </p>
            
            {/* CTA Button */}
            <Button
              size="lg"
              className="bg-white/20 hover:bg-white/30 border border-white/30 backdrop-blur-sm h-[52px] text-white font-work-sans font-medium px-8 py-4 rounded-full text-base tracking-wide transition-all duration-300"
            >
              LEARN MORE
            </Button>
          </div>
        </div>
      </div>
    </section>
  )
}