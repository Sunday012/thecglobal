"use client"

import Link from "next/link"
import { useState } from "react"
import SiteLogo from "@/components/site-logo"

const Arrow = () => <span aria-hidden="true" className="arrow">↗</span>

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false)
  const closeMenu = () => setMenuOpen(false)

  return (
    <header className="site-header">
      <div className="nav-wrap">
        <SiteLogo />
        <nav className={menuOpen ? "nav-links open" : "nav-links"} aria-label="Main navigation">
          <Link href="/about" onClick={closeMenu}>Our heart</Link>
          <Link href="/ministries" onClick={closeMenu}>Discipleship</Link>
          <Link href="/#events" onClick={closeMenu}>2027 events</Link>
          <Link href="/give" onClick={closeMenu}>Partner</Link>
          <Link href="/contact" onClick={closeMenu} className="nav-cta">Plan your visit <Arrow /></Link>
        </nav>
        <button
          className="menu-button"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-expanded={menuOpen}
          aria-label="Toggle navigation"
        >
          {menuOpen ? "Close" : "Menu"}
        </button>
      </div>
    </header>
  )
}
