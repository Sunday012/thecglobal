"use client"

import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Facebook, Instagram, Youtube } from "lucide-react"

export default function Footer() {
  return (
    <footer className="bg-[#FAE8A1] py-20 px-6 lg:px-8 relative overflow-hidden">
      <div className="max-w-7xl mx-auto relative z-10">
        <div className="grid lg:grid-cols-4 gap-12 mb-16">
          {/* Newsletter Signup */}
          <div>
            <h3 className="text-[#272f31]/70 font-work-sans text-sm uppercase tracking-wide mb-4">
              Stay up to date with Encounter
            </h3>
            <h4 className="text-[#272f31] font-rubik font-bold text-xl mb-6">
              Sign up for email updates from The Encounter Center Church
            </h4>
            <div className="space-y-4">
              <Input
                placeholder="Email address"
                className="bg-white border-0 rounded-lg px-4 py-3 text-[#272f31] placeholder:text-[#272f31]/50"
              />
              <Button className="bg-[#0A523B] hover:bg-[#0A523B]/80 text-white font-work-sans font-medium px-6 py-3 rounded-full text-sm tracking-wide">
                SUBMIT
              </Button>
            </div>
          </div>

          {/* Our House */}
          <div>
            <h3 className="text-[#272f31]/70 font-work-sans text-sm uppercase tracking-wide mb-4">Our House</h3>
            <ul className="space-y-3">
              <li>
                <a
                  href="#"
                  className="text-[#272f31] font-rubik font-bold text-lg hover:text-[#0A523B] transition-colors"
                >
                  Our Story
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-[#272f31] font-rubik font-bold text-lg hover:text-[#0A523B] transition-colors"
                >
                  Our Beliefs
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-[#272f31] font-rubik font-bold text-lg hover:text-[#0A523B] transition-colors"
                >
                  Our Leadership
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-[#0A523B] font-rubik font-bold text-lg hover:text-[#272f31] transition-colors"
                >
                  Join Our Team
                </a>
              </li>
            </ul>
          </div>

          {/* Locations */}
          <div>
            <h3 className="text-[#272f31]/70 font-work-sans text-sm uppercase tracking-wide mb-4">Locations</h3>
            <ul className="space-y-3">
              <li>
                <a
                  href="#"
                  className="text-[#272f31] font-rubik font-bold text-lg hover:text-[#0A523B] transition-colors"
                >
                  15000 Bellaire Blvd Unit W<br />
                  Houston, Texas 77083
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-[#272f31] font-rubik font-bold text-lg hover:text-[#0A523B] transition-colors"
                >
                  3075 Normandy Rd
                  <br />
                  Springfield, IL 62703
                </a>
              </li>
            </ul>
          </div>

          {/* The Encounter Movement */}
          <div>
            <h3 className="text-[#272f31]/70 font-work-sans text-sm uppercase tracking-wide mb-4">
              The Encounter Movement
            </h3>
            <ul className="space-y-3">
              <li>
                <a
                  href="#"
                  className="text-[#272f31] font-rubik font-bold text-lg hover:text-[#0A523B] transition-colors"
                >
                  Encounter Conferences
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-[#272f31] font-rubik font-bold text-lg hover:text-[#0A523B] transition-colors"
                >
                  sixstepsrecords
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-[#272f31] font-rubik font-bold text-lg hover:text-[#0A523B] transition-colors"
                >
                  Encounter Equip
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-[#272f31] font-rubik font-bold text-lg hover:text-[#0A523B] transition-colors"
                >
                  Encounter Publishing
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-[#272f31] font-rubik font-bold text-lg hover:text-[#0A523B] transition-colors"
                >
                  Encounter Resources
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Footer */}
        <div className="border-t border-[#272f31]/20 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-[#272f31]/60 font-work-sans text-sm mb-4 md:mb-0">© 2025 The Encounter Center Church</p>
            <div className="flex space-x-6 mb-4 md:mb-0">
              <a href="#" className="text-[#272f31]/60 font-work-sans text-sm hover:text-[#272f31] transition-colors">
                Cookie Policy
              </a>
              <a href="#" className="text-[#272f31]/60 font-work-sans text-sm hover:text-[#272f31] transition-colors">
                Terms + Conditions
              </a>
              <a href="#" className="text-[#272f31]/60 font-work-sans text-sm hover:text-[#272f31] transition-colors">
                SMS Terms + Conditions
              </a>
            </div>
            <div className="flex space-x-4">
              <a href="#" className="text-[#272f31]/60 hover:text-[#272f31] transition-colors">
                <Facebook size={20} />
              </a>
              <a href="#" className="text-[#272f31]/60 hover:text-[#272f31] transition-colors">
                <Instagram size={20} />
              </a>
              <a href="#" className="text-[#272f31]/60 hover:text-[#272f31] transition-colors">
                <Youtube size={20} />
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Large Background Text */}
      <div className="absolute bottom-0 left-0 right-0 pointer-events-none overflow-hidden">
        <div className="text-white/50 font-rubik font-bold text-[12rem] lg:text-[16rem] xl:text-[20rem] leading-none whitespace-nowrap">
          the encounter center church
        </div>
      </div>
    </footer>
  )
}
