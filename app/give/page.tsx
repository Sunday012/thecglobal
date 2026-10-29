"use client"

import Image from "next/image"
import Link from "next/link"
import { useState } from "react"
import Header from "@/components/header"
import Footer from "@/components/footer"

const givingUrl = "https://give.tithe.ly/?formId=030ed140-b168-4d91-a818-635037345c77"
const Arrow = () => <span aria-hidden="true" className="arrow">↗</span>

const faqs = [
  ["Can I give once or set up recurring giving?", "Yes. The online giving page allows both one-time and recurring gifts, with a schedule that works for you."],
  ["Are there fees for giving online?", "Bank transfers generally have the lowest processing cost. Card gifts may include a small processing fee, which you can choose to cover."],
  ["Can I update or cancel a recurring gift?", "Yes. Sign in to your giving account at any time to update the amount, frequency, payment method, or recurring status."],
  ["Will I receive a contribution statement?", "Yes. Annual contribution statements are provided for tax purposes, and your online history remains available through your donor account."],
  ["Can I give in another way?", "Yes. You may give by mail or contact our team to discuss another form of generosity."],
]

export default function PartnerPage() {
  const [openFaq, setOpenFaq] = useState<number | null>(null)

  return (
    <main className="partner-page">
      <Header />

      <section className="partner-hero section-pad">
        <div className="content split">
          <div>
            <p className="eyebrow">Partner · Build with us</p>
            <h1>Partner with<br /><em>the vision.</em></h1>
          </div>
          <div className="partner-hero-copy">
            <h2>Help create space for discipleship, prayer, and outreach.</h2>
            <p>Your generosity helps people encounter Christ, grow through discipleship, and experience His love through outreach. Give today and help carry this vision into more lives.</p>
            <a className="button light" href={givingUrl} target="_blank" rel="noreferrer">Give to TEC <Arrow /></a>
          </div>
        </div>
      </section>

      <section className="generosity-section section-pad">
        <div className="content">
          <p className="eyebrow">01 / Why we partner</p>
          <div className="split generosity-intro">
            <h2>Generosity is worship.<br /><em>Impact is shared.</em></h2>
            <div><p>Giving is not a transaction. It is an act of worship and a practical way to participate in what God is building through this house.</p><p>Every gift helps create environments where people can hear the Gospel, be discipled, find community, and carry the love of Jesus into everyday life.</p></div>
          </div>
          <div className="impact-grid">
            <article><span>01</span><h3>Discipleship</h3><p>Forming people through Scripture, prayer, meaningful gatherings, and practical spiritual growth.</p></article>
            <article><span>02</span><h3>Outreach</h3><p>Serving people beyond our walls and making the love of Jesus visible in our city.</p></article>
            <article><span>03</span><h3>Future</h3><p>Building sustainable spaces, resources, and opportunities for the next generation.</p></article>
          </div>
        </div>
      </section>

      <section className="stewardship-section section-pad cream">
        <div className="content stewardship-grid">
          <div className="stewardship-image"><Image src="/images/generosity.jpg" alt="Generosity and partnership at The Encounter Center" fill sizes="(max-width: 800px) 100vw, 48vw" /></div>
          <div>
            <p className="eyebrow">02 / Stewardship</p>
            <h2>Open hands.<br /><em>Faithful hearts.</em></h2>
            <p>We believe everything we have belongs to God. We give freely, steward carefully, and build with transparency so generosity can become lasting Kingdom impact.</p>
            <div className="stewardship-points"><span>Prayerful</span><span>Responsible</span><span>Transparent</span><span>Purposeful</span></div>
            <a className="text-link underline" href={givingUrl} target="_blank" rel="noreferrer">Give securely online <Arrow /></a>
          </div>
        </div>
      </section>

      <section className="giving-options section-pad">
        <div className="content">
          <p className="eyebrow">03 / Ways to give</p>
          <div className="split giving-options-heading"><h2>Simple ways to<br /><em>build with us.</em></h2><p>Choose the giving option that works best for you. If you need help, our team is ready to assist.</p></div>
          <div className="giving-options-grid">
            <article><span>01 / Online</span><h3>Give online</h3><p>Make a secure one-time gift or manage recurring generosity through our online giving platform.</p><a className="text-link underline" href={givingUrl} target="_blank" rel="noreferrer">Open giving <Arrow /></a></article>
            <article><span>02 / Mail</span><h3>Give by mail</h3><p>Make checks payable to The Encounter Center Church and mail them to:</p><address>15000 Bellaire Blvd Unit W<br />Houston, TX 77083</address><small>Tax ID: 27-1721038</small></article>
            <article><span>03 / Other gifts</span><h3>Talk with us</h3><p>For donor funds or another form of generosity, contact our team and we will help with the details.</p><Link className="text-link underline" href="/contact">Contact our team <Arrow /></Link></article>
          </div>
        </div>
      </section>

      <section className="partner-faq section-pad cream">
        <div className="content split partner-faq-grid">
          <div><p className="eyebrow">04 / Giving questions</p><h2>Clear answers.<br /><em>Simple next steps.</em></h2></div>
          <div className="accordion">
            {faqs.map(([question, answer], index) => <div className="faq-item" key={question}><button onClick={() => setOpenFaq(openFaq === index ? null : index)} aria-expanded={openFaq === index}><span>{question}</span><b>{openFaq === index ? "−" : "+"}</b></button>{openFaq === index && <p>{answer}</p>}</div>)}
          </div>
        </div>
      </section>

      <section className="partner-cta section-pad">
        <div className="content split">
          <h2>Carry the vision<br /><em>with us.</em></h2>
          <div><p>Every act of generosity helps make room for another person to encounter Jesus and grow in faith.</p><a className="button light" href={givingUrl} target="_blank" rel="noreferrer">Give to TEC <Arrow /></a></div>
        </div>
      </section>

      <Footer />
    </main>
  )
}
