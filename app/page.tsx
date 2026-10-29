"use client"

import Image from "next/image"
import { FormEvent, useState } from "react"
import Header from "@/components/header"
import Footer from "@/components/footer"

const Arrow = ({ down = false }: { down?: boolean }) => (
  <span aria-hidden="true" className="arrow">{down ? "↓" : "↗"}</span>
)

const events = [
  { month: "MAR", date: "26", meta: "FRIDAY · 2027", title: "7 Hour Prayer Charge", copy: "A dedicated gathering for prayer." },
  { month: "JUL", date: "30", meta: "FRIDAY · 2027", title: "7 Hour Prayer Charge", copy: "Gather with us for a focused time of prayer." },
  { month: "OCT", date: "02–08", meta: "2027", title: "7 Days Weight of Glory Fast", copy: "Seven days set apart for fasting and prayer." },
  { month: "OCT", date: "08", meta: "FRIDAY · 2027", title: "7 Hour Prayer Charge", copy: "Our October prayer gathering, connected to the Weight of Glory fast." },
  { month: "NOVEMBER", date: "2027", meta: "FRIDAY–SUNDAY · DATES FORTHCOMING", title: "Metamorphosis Conference", copy: "A November weekend for encounter and transformation." },
]

const faqs = [
  ["What is TEC?", "The Encounter Center Global is a Christ-centered community in Houston committed to the gospel, spiritual formation, prayer, and outreach."],
  ["How do I participate in the 2027 gatherings?", "Register your interest using the form below. Our team will follow up with dates, locations, and next steps."],
  ["What happens on Sundays and Tuesdays?", "Sundays are devoted to discipleship and prayer. Tuesdays create space for Scripture, conversation, and practical growth."],
  ["Where do you meet?", "We gather in Houston, Texas. The exact gathering address is shared directly after confirmation."],
  ["Can I bring my children?", "Yes. Tell us about your family needs when you register so our team can help you plan your visit."],
  ["Do I need to serve or give to participate?", "No. Participation is freely open through registration; serving and giving are always voluntary."],
]

export default function HomePage() {
  const [openFaq, setOpenFaq] = useState<number | null>(null)
  const [submitted, setSubmitted] = useState(false)

  const submitForm = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    setSubmitted(true)
  }

  return (
    <main id="home" className="site-shell">
      <Header />

      <section className="hero section-pad"><div className="content">
        <p className="eyebrow dot">The Encounter Center Global · Houston, TX</p>
        <p className="hero-kicker">We exist to see all men</p>
        <h1><span>Saved.</span><em>Transformed.</em><span>Sent.</span></h1>
        <p className="hero-copy">A life rooted in Christ. A community to grow with. A purpose to live out.</p>
        <div className="hero-actions"><a className="button primary" href="#discipleship">Register for discipleship <Arrow /></a><a className="text-link" href="#heart">Explore TEC <Arrow down /></a></div>
        <div className="hero-foot"><span>Faith that shapes everyday life.</span><a href="#discipleship">Discover our next chapter <Arrow down /></a></div>
      </div></section>

      <section id="heart" className="heart section-pad"><div className="content">
        <p className="eyebrow">01 / Our heart</p>
        <div className="split intro-split"><h2>Encounter God.<br />Grow in Christ.<br /><em>Live with purpose.</em></h2><div className="body-copy"><p>We are a Houston community committed to the gospel, spiritual formation, prayer, and outreach. We make room for people to know Christ, grow through His Word, and carry His love into everyday life.</p><p>Our next chapter brings a deeper focus on discipleship: meaningful gatherings, intentional growth, and a shared life of faith.</p><a className="text-link underline" href="#connect">Take your next step <Arrow /></a></div></div>
        <div className="pillars"><article><span>01</span><h3>Saved</h3><p>The grace of Jesus Christ is our starting point. We point people to the life found in Him.</p></article><article><span>02</span><h3>Transformed</h3><p>We grow through Scripture, prayer, and community, learning to follow Jesus in daily life.</p></article><article><span>03</span><h3>Sent</h3><p>We live out our faith through love, service, and outreach wherever God places us.</p></article></div>
      </div></section>

      <section id="discipleship" className="discipleship section-pad cream"><div className="content">
        <p className="eyebrow">02 / Our next chapter · 2027</p>
        <div className="split section-heading"><h2>A place to belong.<br /><em>A space to become.</em></h2><p>Our 2027 gatherings are designed for deeper formation, sustainable participation, and a greater investment in outreach.</p></div>
        <div className="gathering-grid"><article className="card"><span>Sundays · 2027</span><h3>Discipleship<br />Gathering</h3><p>Grow in the Word, pray together, and develop a faith that shapes the way you live.</p><a className="text-link underline" href="#connect">Register your interest <Arrow /></a></article><article className="card"><span>Tuesdays · 2027</span><h3>Tuesday<br />At the Table</h3><p>A formation gathering for Scripture, conversation, and practical growth in Christ.</p><a className="text-link underline" href="#connect">Take a seat at the table <Arrow /></a></article></div>
        <p className="fine-print">Participation is through registration. Our team will follow up with next steps and gathering details. Registration does not assign you to a serving or leadership role.</p>
      </div></section>

      <section className="pastors section-pad"><div className="content pastor-grid"><div className="pastor-image"><Image src="/images/lead-pastors.jpeg" alt="The lead pastors of The Encounter Center Global" fill sizes="(max-width: 800px) 100vw, 40vw" priority /></div><div className="pastor-copy"><p className="eyebrow">The people behind the vision</p><h2>Meet our<br /><em>lead pastors.</em></h2><h3>Dr. Michael Aladejana<br />&amp; Pastor Christabel Aladejana</h3><p>Together, our lead pastors guide The Encounter Center Global in its mission to see all men saved, transformed, and sent.</p><p>The heart of the vision is a community grounded in Christ, growing in faith, and equipped to live with purpose.</p><a className="text-link underline" href="#connect">Connect with TEC <Arrow /></a></div></div></section>

      <section id="events" className="events section-pad cream"><div className="content"><p className="eyebrow">03 / Gather. Pray. Grow.</p><div className="split section-heading"><h2>Mark the moments.<br /><em>Make room for God.</em></h2><p>Our major 2027 gatherings. Event times and participation details will be shared when available.</p></div><div className="event-list">{events.map((event) => <article className="event-row" key={`${event.month}-${event.date}`}><div className="date"><span>{event.month}</span><strong>{event.date}</strong></div><div className="event-info"><span>{event.meta}</span><h3>{event.title}</h3><p>{event.copy}</p></div><a href="#connect" aria-label={`Learn more about ${event.title}`}><Arrow /></a></article>)}</div></div></section>

      <section className="word section-pad"><div className="content split section-heading"><div><p className="eyebrow">04 / Keep growing</p><h2>The Word for<br /><em>everyday life.</em></h2></div><div><p>Explore teaching that helps you know Christ and grow in your walk with Him.</p><a className="button outline" href="#connect">Listen to our latest message <Arrow /></a></div></div></section>

      <section id="partner" className="partner section-pad"><div className="content split"><div><p className="eyebrow">05 / Build with us</p><h2>Partner with<br /><em>the vision.</em></h2></div><div><h3>Help create space for discipleship, prayer, and outreach.</h3><p>Your generosity helps people encounter Christ, grow through discipleship, and experience His love through outreach. Give today and help carry this vision into more lives.</p><a className="button light" href="https://give.tithe.ly/?formId=030ed140-b168-4d91-a818-635037345c77" target="_blank" rel="noreferrer">Give to TEC <Arrow /></a></div></div></section>

      <section className="faq section-pad"><div className="content split faq-grid"><div><p className="eyebrow">A few things you may be wondering</p><h2>Your next step,<br /><em>made clear.</em></h2></div><div className="accordion">{faqs.map(([question, answer], index) => <div className="faq-item" key={question}><button onClick={() => setOpenFaq(openFaq === index ? null : index)} aria-expanded={openFaq === index}><span>{question}</span><b>{openFaq === index ? "−" : "+"}</b></button>{openFaq === index && <p>{answer}</p>}</div>)}</div></div></section>

      <section id="connect" className="connect section-pad cream"><div className="content split connect-grid"><div><p className="eyebrow">06 / Let’s connect</p><h2>Your next step<br /><em>starts here.</em></h2><p>Plan your visit, register your interest in discipleship, or ask a question. Our team will follow up with the details you need.</p><div className="location-note">Houston, Texas<br /><span>Gathering address shared directly after confirmation.</span></div></div><form onSubmit={submitForm}><label>How can we help?<select name="reason" defaultValue="Plan my visit"><option>Plan my visit</option><option>Register for discipleship</option><option>Ask a question</option><option>Partner with TEC</option></select></label><div className="form-row"><label>Full name *<input name="name" required /></label><label>Email *<input type="email" name="email" required /></label></div><div className="form-row"><label>Phone <span>(optional)</span><input type="tel" name="phone" /></label><label>Houston area / neighborhood *<input name="area" required /></label></div><label>Your question, interests, or family needs <span>(optional)</span><textarea name="message" rows={4} /></label><label>Would you like to learn about partnering with TEC? <span>(optional)</span><select name="partner" defaultValue=""><option value="" disabled>Choose an answer</option><option>Yes, please</option><option>Not right now</option></select></label><label className="check"><input type="checkbox" name="whatsapp" /> <span>You may contact me through WhatsApp about my request.<small>Optional; no automatic group enrollment.</small></span></label><label className="check"><input type="checkbox" required /> <span>I agree that TEC may use my details to respond to this request.</span></label>{submitted ? <p className="success" role="status">Thank you. Your request has been received.</p> : <button className="button primary" type="submit">Send my request <Arrow /></button>}</form></div></section>

      <Footer />
    </main>
  )
}
