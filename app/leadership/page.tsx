import Image from "next/image"
import Link from "next/link"
import Header from "@/components/header"
import Footer from "@/components/footer"

const Arrow = () => <span aria-hidden="true" className="arrow">↗</span>

export default function LeadershipPage() {
  return (
    <main className="leadership-page">
      <Header />

      <section className="leadership-hero section-pad">
        <div className="content leadership-hero-grid">
          <div>
            <p className="eyebrow dot">Our leadership · The Encounter Center Global</p>
            <h1>Called to serve. <em>Committed to people.</em></h1>
            <p>Leadership at TEC is about carrying the heart of Jesus, equipping people, and building a community where lives are transformed.</p>
            <a className="button primary" href="#pastors">Meet our pastors <span>↓</span></a>
          </div>
          <div className="leadership-hero-image">
            <Image src="/images/lead-pastors.jpeg" alt="Dr. Michael and Pastor Christabel Aladejana" fill priority sizes="(max-width: 800px) 100vw, 48vw" />
          </div>
        </div>
      </section>

      <section id="pastors" className="lead-pastor-section section-pad cream">
        <div className="content leadership-profile-grid">
          <div>
            <p className="eyebrow">01 / Global pastor</p>
            <h2>Pastor Dr. Michael <em>Aladejana.</em></h2>
          </div>
          <div className="leadership-biography">
            <p>Dr. Michael Aladejana is the Lead Pastor and founder of The Encounter Center and the TEC Leadership &amp; Bible Institute. He is a preacher, teacher, mentor, and practicing medical doctor with a heart to see people saved, transformed, and sent.</p>
            <p>His ministry equips believers to know their identity in Christ, live boldly, love deeply, and carry the Kingdom into every sphere of life.</p>
          </div>
        </div>
      </section>

      <section className="pastoral-partnership section-pad">
        <div className="content pastoral-partnership-grid">
          <div className="pastoral-couple-image">
            <Image src="/images/lead-pastors.jpeg" alt="Dr. Michael and Pastor Christabel Aladejana" fill sizes="(max-width: 800px) 100vw, 48vw" />
          </div>
          <div>
            <p className="eyebrow">02 / Leading together</p>
            <h2>One heart. <em>One vision.</em></h2>
            <h3>Dr. Michael Aladejana<br />&amp; Pastor Christabel Aladejana</h3>
            <p>Together, they lead with faith, compassion, and a shared commitment to build people. Their heart is to create room for genuine encounters with God and raise disciples who live with purpose.</p>
          </div>
        </div>
      </section>

      <section className="leadership-values-section section-pad cream">
        <div className="content">
          <div className="split leadership-values-heading">
            <div><p className="eyebrow">03 / How we lead</p><h2>Jesus first. <em>People always.</em></h2></div>
            <p>Our leadership culture is grounded in Scripture, shaped by prayer, and expressed through service.</p>
          </div>
          <div className="leadership-values-grid">
            <article><span>01</span><h3>Lead by serving</h3><p>We follow the example of Jesus and use influence to lift others.</p></article>
            <article><span>02</span><h3>Build with integrity</h3><p>Character, accountability, and truth guide every decision we make.</p></article>
            <article><span>03</span><h3>Equip and send</h3><p>We help people discover their calling and live it beyond the church walls.</p></article>
          </div>
        </div>
      </section>

      <section className="leadership-cta section-pad">
        <div className="content split">
          <div><p className="eyebrow">Take your next step</p><h2>Grow with us. <em>Walk with purpose.</em></h2></div>
          <div><p>Discipleship is where faith becomes a shared, everyday life. Come learn, pray, and grow in community.</p><Link className="button light" href="/ministries">Explore discipleship <Arrow /></Link></div>
        </div>
      </section>

      <Footer />
    </main>
  )
}
