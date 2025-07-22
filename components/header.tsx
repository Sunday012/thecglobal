"use client"

import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Menu } from "lucide-react"
import { useState } from "react"

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  const navigationItems = [
    { name: "About", href: "/about" },
    { name: "Ministries", href: "/ministries" },
    { name: "Leadership", href: "/leadership" },
    { name: "Contact", href: "/contact", icon: true },
    { name: "Donate", href: "/give" },
  ]

  return (
    <header className=" animate-slide-down">
        {/* Top Navigation Bar */}
        <nav className="flex items-center py-4 px-6 lg:px-8 bg-[#FAE8A1] justify-center mb-6">
          <div className="flex items-center space-x-8">
            {navigationItems.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className="text-[#272f31] hover:text-[#0A523B] font-work-sans text-sm font-medium transition-colors flex items-center gap-1"
              >
                {item.icon && (
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
                    <circle cx="12" cy="10" r="3" />
                  </svg>
                )}
                {item.name}
              </Link>
            ))}
          </div>
        </nav>
      <div className="max-w-7xl mx-auto py-4 px-6 lg:px-8">

        {/* Main Header */}
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center">
            <Image
              src="https://res.cloudinary.com/dzckvrvu9/image/upload/v1752759233/Asset_40_wntbch.svg"
              alt="The Encounter Center Church"
              width={200}
              height={200}
              className="mr-4"
            />
            {/* <span className="text-2xl font-rubik font-normal text-[#272f31]">the encounter center</span> */}
          </Link>

          {/* Right Side Actions */}
          <div className="flex items-center space-x-4">
            <Button className="bg-[#0A523B] hover:bg-[#0A523B]/80 text-white font-work-sans font-medium px-6 py-2 rounded-full text-sm tracking-wide">
              UPCOMING EVENTS
            </Button>

            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="p-2 text-[#272f31] hover:text-[#0A523B] transition-colors"
              aria-label="Toggle menu"
            >
              <Menu size={24} />
            </button>
          </div>
        </div>
      </div>
    </header>
  )
}
