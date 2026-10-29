"use client"

import Image from "next/image"
import Link from "next/link"
import { useState } from "react"
import Header from "@/components/header"
import Footer from "@/components/footer"

const values = [
  ["Jesus Always", "Everything starts and ends with Him. No hype, just Jesus."],
  ["Word + Spirit", "We teach truth and follow the Spirit. Both matter. Always."],
  ["Presence over performance", "We host God, not a show. If He is not in it, we do not want it."],
  ["Disciples, not just attenders", "We do not do passive Christianity. We raise leaders and send them out."],
  ["Excellence is our worship", "God gave His best, so we bring ours to every detail and every person."],
  ["Family vibes", "We do life together with real love, real accountability, and real growth."],
  ["Bold faith. Real power.", "We pray with expectation for healing, breakthrough, and transformed lives."],
  ["Kingdom everywhere", "Church is not only a Sunday gathering. We carry Jesus into every sphere of life."],
]

const Arrow = () => <span aria-hidden="true" className="arrow">↗</span>

export default function AboutPage() {
  const [openValue, setOpenValue] = useState<number | null>(0)

  return (
    <main className="our-heart-page">
      <Header />

      <section className="heart-hero section-pad">
        <div className="content">
          <p className="eyebrow dot">Our heart · The Encounter Center Global</p>
          <div className="heart-hero-copy">
            <h1><span>Our heart.</span><em>His presence.</em><span>Your purpose.</span></h1>
            <p>Jesus at the center. People saved, transformed, and sent.</p>
            <a href="#mission" className="button primary">Discover our heart <Arrow /></a>
          </div>
        </div>
      </section>

      <section id="mission" className="heart-mission section-pad cream">
        <div className="content">
          <p className="eyebrow">01 / Why we exist</p>
          <div className="split heart-intro">
            <h2>Encounter God.<br />Grow in Christ.<br /><em>Live with purpose.</em></h2>
            <div>
              <p>Jesus is the center of it all. We do not build around personalities or preferences, but around His finished work and the transforming power of His presence.</p>
              <p>Our roots are in Houston, Texas—and we believe this is only the beginning. We are building a community deeply rooted in Christ, filled with the Spirit, and sent to reveal Jesus in every sphere of life.</p>
            </div>
          </div>
          <div className="heart-pillars">
            <article><span>01</span><h3>Saved</h3><p>We point people to the grace, freedom, and new life found in Jesus Christ.</p></article>
            <article><span>02</span><h3>Transformed</h3><p>We grow through Scripture, prayer, the Spirit, and a genuine life of community.</p></article>
            <article><span>03</span><h3>Sent</h3><p>We carry the love and power of Jesus into our homes, work, cities, and world.</p></article>
          </div>
        </div>
      </section>

      <section className="vision-section section-pad">
        <div className="content vision-grid">
          <div className="vision-image"><Image src="/images/believe-two.jpg" alt="The Encounter Center community gathering" fill sizes="(max-width: 800px) 100vw, 48vw" /></div>
          <div className="vision-copy">
            <p className="eyebrow">02 / Vision &amp; mission</p>
            <h2>A movement shaped by<br /><em>His presence.</em></h2>
            <div className="vision-block"><span>Our vision</span><p>To see lives radically transformed by the presence of God and the power of the Gospel—churches, campuses, cities, and nations awakened by revival, one encounter at a time.</p></div>
            <div className="vision-block"><span>Our mission</span><p>To lead people into real encounters with Jesus, disciple them through the Word and Spirit, and equip them to live out their Kingdom assignment locally and globally.</p></div>
          </div>
        </div>
      </section>

      <section className="beliefs-section section-pad cream">
        <div className="content beliefs-grid">
          <div>
            <p className="eyebrow">03 / What we believe</p>
            <h2>Rooted in truth.<br /><em>Alive in the Spirit.</em></h2>
            <p>We live in shifting times but remain rooted in eternal truth—the teaching of Holy Scripture. Our faith is grounded in Jesus, shaped by the Word, and expressed through a life led by the Holy Spirit.</p>
            <Link href="/beliefs" className="button outline">Explore our beliefs <Arrow /></Link>
          </div>
          <div className="beliefs-image"><Image src="/images/believe-one.jpg" alt="Teaching the Word at The Encounter Center" fill sizes="(max-width: 800px) 100vw, 48vw" /></div>
        </div>
      </section>

      <section className="values-section section-pad">
        <div className="content values-grid">
          <div className="values-heading">
            <p className="eyebrow">04 / Our culture &amp; DNA</p>
            <h2>What makes us,<br /><em>us.</em></h2>
            <p>We are more than a Sunday gathering. We are a movement marked by presence, power, family, and purpose.</p>
          </div>
          <div className="values-list">
            {values.map(([title, copy], index) => (
              <article key={title} className="value-item">
                <button onClick={() => setOpenValue(openValue === index ? null : index)} aria-expanded={openValue === index}>
                  <span className="value-number">{String(index + 1).padStart(2, "0")}</span>
                  <strong>{title}</strong>
                  <b>{openValue === index ? "−" : "+"}</b>
                </button>
                {openValue === index && <p>{copy}</p>}
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="houston-section section-pad">
        <div className="content houston-grid">
          <div>
            <p className="eyebrow">05 / Our home</p>
            <h2>Rooted in Houston.<br /><em>Room for you.</em></h2>
            <p>Our gatherings are a space for you and your family to encounter God through heartfelt worship, Scripture, prayer, and genuine community.</p>
            <div className="schedule"><span>Sundays</span><strong>5:30 PM · Worship gathering</strong><span>Tuesdays</span><strong>7:30 PM · Bible study</strong></div>
            <Link href="/contact" className="button light">Plan your visit <Arrow /></Link>
          </div>
          <div className="houston-image"><Image src="/images/houston.jpg" alt="The Encounter Center community in Houston" fill sizes="(max-width: 800px) 100vw, 48vw" /></div>
        </div>
      </section>

      <section className="heart-leadership section-pad">
        <div className="content leadership-grid">
          <div className="leadership-image"><Image src="/images/lead-pastors.jpeg" alt="Dr. Michael and Pastor Christabel Aladejana" fill sizes="(max-width: 800px) 100vw, 42vw" /></div>
          <div>
            <p className="eyebrow">06 / Our leadership</p>
            <h2>Meet our<br /><em>lead pastors.</em></h2>
            <h3>Dr. Michael Aladejana<br />&amp; Pastor Christabel Aladejana</h3>
            <p>Our lead pastors guide The Encounter Center Global in its mission to see all men saved, transformed, and sent. Their heart is to build a community grounded in Christ, growing in faith, and equipped to live with purpose.</p>
            <Link href="/leadership" className="text-link underline">Meet our leadership <Arrow /></Link>
          </div>
        </div>
      </section>

      <section className="heart-cta section-pad">
        <div className="content split">
          <h2>Your story has a place<br /><em>in this house.</em></h2>
          <div><p>Come as you are. There is a seat for you, a community to grow with, and a next step waiting.</p><Link href="/contact" className="button light">Connect with TEC <Arrow /></Link></div>
        </div>
      </section>

      <Footer />
    </main>
  )
}
