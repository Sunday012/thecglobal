"use client"

import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Menu, Search, X } from "lucide-react"
import { useState, useEffect } from "react"
import { Input } from "./ui/input"

export default function Header({ isHomePage = false }) {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)

  useEffect(() => {
    // Only add scroll listener if it's the home page
    if (!isHomePage) {
      setIsScrolled(true) // Default to scrolled state for other pages
      return
    }

    const handleScroll = () => {
      // Adjust this value based on when you want the transition to happen
      // For example, when user scrolls past 80vh (hero section height)
      const scrollThreshold = window.innerHeight * 0.8
      setIsScrolled(window.scrollY > scrollThreshold)
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [isHomePage])

  const navigationItems = [
    { name: "About", href: "/about" },
    { name: "Ministries", href: "/ministries" },
    { name: "Leadership", href: "/leadership" },
    { name: "Contact", href: "/contact", icon: true },
    { name: "Donate", href: "/give" },
  ]

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen)
  }

  return (
    <>
      <header className={`fixed top-0 left-0 right-0 z-40 transition-all duration-500 ${
        isScrolled ? 'animate-slide-down' : ''
      }`}>
        {/* Top Navigation Bar */}
        <nav className={`flex items-center py-4 px-6 lg:px-8 justify-center mb-6 transition-all duration-500 ${
          isScrolled ? 'bg-gray-100' : 'bg-transparent'
        }`}>
          <div className="flex items-center space-x-8">
            {navigationItems.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className={`hover:text-[#0A523B] font-work-sans text-sm font-medium transition-colors flex items-center gap-1 ${
                  isScrolled ? 'text-[#272f31]' : 'text-white'
                }`}
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
          <div className={`flex  rounded-4xl px-4 py-4 items-center justify-between ${
            isScrolled ? "bg-white/20 hover:bg-white/30 border border-white/30 backdrop-blur-sm" : ""
          }`}>
            {/* Logo */}
            <Link href="/" className="flex items-center">
              <Image
                src="https://res.cloudinary.com/dzckvrvu9/image/upload/v1752759233/Asset_40_wntbch.svg"
                alt="The Encounter Center Church"
                width={150}
                height={150}
                className={`mr-4 transition-all duration-500 ${
                  isScrolled ? '' : 'filter brightness-0 invert'
                }`}
              />
            </Link>

            {/* Right Side Actions */}
            <div className="flex items-center space-x-4">
              <Button className={`hover:bg-[#0A523B]/80 font-work-sans font-medium px-6 py-2 rounded-full text-sm tracking-wide transition-all duration-500 ${
                isScrolled ? 'bg-[#0A523B] text-white' : 'bg-white/20 text-white border border-white/30 backdrop-blur-sm'
              }`}>
                UPCOMING EVENTS
              </Button>

              <button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className={`p-2 hover:text-[#0A523B] transition-colors ${
                  isScrolled ? 'text-[#272f31]' : 'text-white'
                }`}
                aria-label="Toggle menu"
              >
                <Menu size={24} />
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Half-Screen Menu Overlay */}
      <div
        className={`fixed top-0 left-0 right-0 bg-black z-50 transition-transform duration-500 ease-in-out ${
          isMenuOpen ? "translate-y-0" : "-translate-y-[200%]"
        }`}
        style={{ height: "75vh" }}
      >
        {/* Menu Header */}
        <div className="flex items-center justify-between p-6 lg:p-8">
          {/* Logo and Search */}
          <div className="flex items-center space-x-8">
            <Image
              src="https://res.cloudinary.com/dzckvrvu9/image/upload/v1752759233/Asset_40_wntbch.svg"
              alt="The Encounter Center Church"
              width={40}
              height={40}
              className="filter brightness-0 invert"
            />
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              <Input
                placeholder="Search Encounter"
                className="bg-transparent border border-gray-600 text-white placeholder:text-gray-400 pl-10 pr-4 py-2 rounded-md w-80"
              />
            </div>
          </div>

          {/* Top Navigation and Close */}
          <div className="flex items-center space-x-8">
            <nav className="flex items-center space-x-6">
              <Link
                href="/about"
                className="text-white hover:text-[#00BCD4] font-work-sans text-sm font-medium transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                ABOUT
              </Link>
              <Link
                href="/houston"
                className="text-white hover:text-[#00BCD4] font-work-sans text-sm font-medium transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                HOUSTON
              </Link>
              <Link
                href="/springfield"
                className="text-white hover:text-[#00BCD4] font-work-sans text-sm font-medium transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                SPRINGFIELD
              </Link>
              <Link
                href="/give"
                className="text-white hover:text-[#00BCD4] font-work-sans text-sm font-medium transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                GIVE
              </Link>
            </nav>
            <button
              onClick={toggleMenu}
              className="p-2 text-white hover:text-[#00BCD4] transition-colors"
              aria-label="Close menu"
            >
              <X size={24} />
            </button>
          </div>
        </div>

        {/* Menu Content */}
        <div className="px-6 lg:px-8 py-8 h-[55vh] overflow-y-auto">
          <div className="max-w-7xl mx-auto">
            {/* Church Title and Tagline */}
            <div className="mb-12">
              <h1 className="text-4xl lg:text-5xl font-rubik font-bold text-white mb-4">The Encounter Center Church</h1>
              <p className="text-xl text-gray-300 font-work-sans">For God. For People. For the City. For the World.</p>
            </div>

            {/* Menu Sections */}
            <div className="grid lg:grid-cols-3 gap-12 mb-16">
              {/* Our House */}
              <div>
                <h3 className="text-gray-400 font-work-sans text-sm uppercase tracking-wide mb-6">Our House</h3>
                <ul className="space-y-4">
                  <li>
                    <Link
                      href="/about"
                      className="text-white hover:text-[#00BCD4] font-rubik text-lg font-medium transition-colors"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      Our Story
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="/beliefs"
                      className="text-white hover:text-[#00BCD4] font-rubik text-lg font-medium transition-colors"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      Our Beliefs
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="/leadership"
                      className="text-white hover:text-[#00BCD4] font-rubik text-lg font-medium transition-colors"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      Our Leadership
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="/join-team"
                      className="text-white hover:text-[#00BCD4] font-rubik text-lg font-medium transition-colors"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      Join Our Team
                    </Link>
                  </li>
                </ul>
              </div>

              {/* Locations */}
              <div>
                <h3 className="text-gray-400 font-work-sans text-sm uppercase tracking-wide mb-6">Locations</h3>
                <ul className="space-y-4">
                  <li>
                    <Link
                      href="/houston"
                      className="text-white hover:text-[#00BCD4] font-rubik text-lg font-medium transition-colors"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      Houston
                    </Link>
                    <p className="text-gray-400 font-work-sans text-sm mt-1">15000 Bellaire Blvd Unit W</p>
                  </li>
                  <li>
                    <Link
                      href="/springfield"
                      className="text-white hover:text-[#00BCD4] font-rubik text-lg font-medium transition-colors"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      Springfield
                    </Link>
                    <p className="text-gray-400 font-work-sans text-sm mt-1">3075 Normandy Rd</p>
                  </li>
                  <li>
                    <Link
                      href="/online"
                      className="text-white hover:text-[#00BCD4] font-rubik text-lg font-medium transition-colors"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      Watch Online
                    </Link>
                  </li>
                </ul>
              </div>

              {/* The Encounter Movement */}
              <div>
                <h3 className="text-gray-400 font-work-sans text-sm uppercase tracking-wide mb-6">
                  The Encounter Movement
                </h3>
                <ul className="space-y-4">
                  <li>
                    <Link
                      href="/conferences"
                      className="text-white hover:text-[#00BCD4] font-rubik text-lg font-medium transition-colors"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      Encounter Conferences
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="/sixsteps"
                      className="text-white hover:text-[#00BCD4] font-rubik text-lg font-medium transition-colors"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      sixstepsrecords
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="/equip"
                      className="text-white hover:text-[#00BCD4] font-rubik text-lg font-medium transition-colors"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      Encounter Equip
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="/publishing"
                      className="text-white hover:text-[#00BCD4] font-rubik text-lg font-medium transition-colors"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      Encounter Publishing
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="/resources"
                      className="text-white hover:text-[#00BCD4] font-rubik text-lg font-medium transition-colors"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      Encounter Resources
                    </Link>
                  </li>
                </ul>
              </div>
            </div>

            {/* Featured Content */}
            <div className="grid lg:grid-cols-2 gap-8 items-center">
              {/* Featured Event Card */}
              <div className="bg-gradient-to-r from-[#0A523B] to-[#FAE8A1] rounded-2xl p-8 relative overflow-hidden">
                <div className="relative z-10">
                  <p className="text-white/80 font-work-sans text-sm uppercase tracking-wide mb-2">UPCOMING EVENT</p>
                  <h4 className="text-3xl font-rubik font-bold text-white mb-4">Encounter 2026</h4>
                  <p className="text-white/90 font-work-sans text-lg mb-6">January 13, 2026</p>
                  <Button className="bg-white text-[#0A523B] hover:bg-white/90 font-work-sans font-medium px-6 py-3 rounded-full text-sm tracking-wide">
                    LEARN MORE
                  </Button>
                </div>
              </div>

              {/* Social Links */}
              <div className="flex flex-col items-start">
                <h4 className="text-gray-400 font-work-sans text-sm uppercase tracking-wide mb-6">Connect With Us</h4>
                <div className="flex space-x-6">
                  <a href="#" className="text-gray-400 hover:text-white transition-colors">
                    <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z" />
                    </svg>
                  </a>
                  <a href="#" className="text-gray-400 hover:text-white transition-colors">
                    <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
                    </svg>
                  </a>
                  <a href="#" className="text-gray-400 hover:text-white transition-colors">
                    <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
                    </svg>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}