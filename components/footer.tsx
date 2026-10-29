import Link from "next/link"
import SiteLogo from "@/components/site-logo"

export default function Footer() {
  return (
    <footer className="site-footer">
      <div className="content footer-grid">
        <SiteLogo />
        <p><em>Saved. Transformed. Sent.</em></p>
        <div>
          <small>© 2026 The Encounter Center Global</small>
          <nav aria-label="Footer navigation">
            <Link href="/about">About</Link>
            <Link href="/ministries">Discipleship</Link>
            <Link href="/contact">Contact</Link>
            <Link href="/give">Give</Link>
          </nav>
        </div>
      </div>
    </footer>
  )
}
