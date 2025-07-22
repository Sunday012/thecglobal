"use client"

import { useEffect, useState } from "react"
import Image from "next/image"

export default function SplashScreen() {
  const [fadeOut, setFadeOut] = useState(false)

  useEffect(() => {
    const timer = setTimeout(() => {
      setFadeOut(true)
    }, 2500)

    return () => clearTimeout(timer)
  }, [])

  return (
    <div
      className={`fixed inset-0 z-50 flex items-center justify-center bg-[#0A523B] transition-opacity duration-1000 ${
        fadeOut ? "opacity-0" : "opacity-100"
      }`}
    >
      <div className="text-center">
        <div className="animate-pulse mb-8">
          <Image
            src="https://res.cloudinary.com/dzckvrvu9/image/upload/v1752759233/Asset_40_wntbch.svg"
            alt="The Encounter Center Church"
            width={120}
            height={120}
            className="mx-auto filter brightness-0 invert"
          />
        </div>
        <div className="animate-fade-in-up">
          <h1 className="text-white font-rubik font-bold text-4xl lg:text-6xl mb-4">The Encounter Center</h1>
          <p className="text-white/80 font-work-sans text-lg">Welcome to our digital home</p>
        </div>
      </div>
    </div>
  )
}
