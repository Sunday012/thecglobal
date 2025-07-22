"use client"
import { Button } from "@/components/ui/button"
import Image from "next/image"

export default function Hero() {
  return (
    <div className="flex items-center justify-center">
    <section className="relative h-screen overflow-hidden rounded-3xl w-[96%]">
      {/* Background Image */}
      <div className="absolute inset-0">
        <Image
          src="https://res.cloudinary.com/dzckvrvu9/image/upload/v1752758815/WhatsApp-Image-2024-02-19-at-03.15.42_z0nnkl.jpg"
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
        <div className="max-w-7xl mx-auto px-6 lg:px-8 w-full">
          <div className="max-w-2xl">
            {/* Main Title */}
            <h1 className="mb-8">
              <div className="text-white font-rubik font-bold text-5xl lg:text-6xl xl:text-7xl leading-tight">
                For God.
              </div>
              <div className="text-white font-rubik font-bold text-5xl lg:text-6xl xl:text-7xl leading-tight">
                For People.
              </div>
              <div className="text-white font-rubik font-bold text-5xl lg:text-6xl xl:text-7xl leading-tight">
                For the City.
              </div>
              <div className="text-white font-rubik font-bold text-5xl lg:text-6xl xl:text-7xl leading-tight">
                For the World.
              </div>
            </h1>

            {/* Description */}
            <p className="text-white/90 font-work-sans text-base lg:text-lg leading-relaxed mb-8 max-w-xl">
              Welcome to a place where the gospel is central and Jesus is always the lead story. We are a Jesus church
              and want to gather in worship and scatter to shine His light and love throughout Houston, Springfield, and
              beyond.
            </p>

            {/* CTA Button */}
            <Button
              size="lg"
              className="bg-[#0A523B] hover:bg-[#0A523B]/80 text-white font-work-sans font-medium px-8 py-4 rounded-full text-base tracking-wide"
            >
              LEARN MORE
            </Button>
          </div>
        </div>
      </div>
    </section>

    </div>
  )
}
