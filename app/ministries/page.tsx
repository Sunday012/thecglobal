import Image from "next/image"
import Link from "next/link"
import Header from "@/components/header"
import Footer from "@/components/footer"

const Arrow = () => <span aria-hidden="true" className="arrow">↗</span>

export default function DiscipleshipPage() {
  return (
    <main className="discipleship-page">
      <Header />

      <section className="discipleship-hero section-pad cream">
        <div className="content">
          <p className="eyebrow dot">Discipleship · Our next chapter</p>
          <div className="discipleship-hero-heading">
            <h1>A place to belong.<br /><em>A space to become.</em></h1>
            <p>Formation that helps you know Jesus, grow through His Word, and live your faith with purpose.</p>
          </div>
          <div className="discipleship-cards">
            <article>
              <span>Sundays · 2027</span>
              <h2>Discipleship<br />Gathering</h2>
              <p>Grow in the Word, pray together, and develop a faith that shapes the way you live.</p>
              <Link href="/contact" className="text-link underline">Register your interest <Arrow /></Link>
            </article>
            <article>
              <span>Tuesdays · 2027</span>
              <h2>Tuesday<br />At the Table</h2>
              <p>A formation gathering for Scripture, conversation, and practical growth in Christ.</p>
              <Link href="/contact" className="text-link underline">Take a seat at the table <Arrow /></Link>
            </article>
          </div>
          <p className="discipleship-note">Participation is through registration. Our team will follow up with gathering details and your next step.</p>
        </div>
      </section>

      <section className="formation-section section-pad">
        <div className="content">
          <p className="eyebrow">01 / A life being formed</p>
          <div className="split formation-intro">
            <h2>More than a meeting.<br /><em>A way of life.</em></h2>
            <p>Discipleship is learning to follow Jesus in everyday life. We create intentional spaces where Scripture becomes practical, prayer becomes natural, and community becomes family.</p>
          </div>
          <div className="formation-pillars">
            <article><span>01</span><h3>Word</h3><p>Know the truth of Scripture and build your life on a foundation that does not move.</p></article>
            <article><span>02</span><h3>Prayer</h3><p>Develop a real relationship with God through worship, intercession, and His presence.</p></article>
            <article><span>03</span><h3>Community</h3><p>Grow alongside people who will encourage you, challenge you, and walk with you.</p></article>
          </div>
        </div>
      </section>

      <section className="gathering-detail section-pad cream">
        <div className="content gathering-detail-grid">
          <div className="gathering-detail-image"><Image src="/images/course.jpg" alt="Disciples studying together" fill sizes="(max-width: 800px) 100vw, 46vw" /></div>
          <div>
            <p className="eyebrow">02 / Sundays</p>
            <h2>Gather around<br /><em>the Word.</em></h2>
            <p>Sunday discipleship gatherings make room for teaching, prayer, reflection, and honest conversation. This is where faith moves beyond information and begins shaping your decisions, relationships, and purpose.</p>
            <ul>
              <li>Scripture-centered teaching</li>
              <li>Prayer and spiritual formation</li>
              <li>Meaningful conversation</li>
              <li>Practical next steps</li>
            </ul>
            <Link href="/contact" className="button primary">Register for Sundays <Arrow /></Link>
          </div>
        </div>
      </section>

      <section className="table-section section-pad">
        <div className="content table-grid">
          <div>
            <p className="eyebrow">03 / Tuesdays</p>
            <h2>Come to<br /><em>the table.</em></h2>
            <p>Tuesday At the Table is a smaller, conversational space to ask questions, study Scripture, and work out what following Jesus looks like in real life.</p>
            <div className="table-details"><span>Conversation</span><span>Scripture</span><span>Growth</span><span>Community</span></div>
            <Link href="/contact" className="text-link underline">Take a seat <Arrow /></Link>
          </div>
          <div className="table-image"><Image src="/images/media.jpg" alt="Community and conversation at The Encounter Center" fill sizes="(max-width: 800px) 100vw, 46vw" /></div>
        </div>
      </section>

      <section className="pathway-section section-pad cream">
        <div className="content">
          <p className="eyebrow">04 / The journey</p>
          <div className="split pathway-heading"><h2>A clear path.<br /><em>A growing faith.</em></h2><p>You do not need to have everything figured out. Start where you are, take the next faithful step, and keep walking with Jesus.</p></div>
          <div className="pathway-grid">
            <article><span>01</span><h3>Encounter</h3><p>Know Jesus personally and experience the grace that makes all things new.</p></article>
            <article><span>02</span><h3>Establish</h3><p>Build strong foundations in Scripture, prayer, identity, and community.</p></article>
            <article><span>03</span><h3>Equip</h3><p>Discover your gifts and grow in the character and confidence to use them.</p></article>
            <article><span>04</span><h3>Live sent</h3><p>Carry the love of Jesus into your home, work, city, and everyday relationships.</p></article>
          </div>
        </div>
      </section>

      <section className="discipleship-cta section-pad">
        <div className="content split">
          <h2>Your next step<br /><em>starts here.</em></h2>
          <div><p>Tell us which gathering you are interested in. Our team will help you find the right place to begin.</p><Link href="/contact" className="button light">Register your interest <Arrow /></Link></div>
        </div>
      </section>

      <Footer />
    </main>
  )
}
