"use client"

import Image from "next/image"
import { FormEvent, useState } from "react"
import Header from "@/components/header"
import Footer from "@/components/footer"

const visitFaqs = [
  ["What should I wear?", "Come as you are. There is no dress code—we simply want you to feel comfortable and welcome."],
  ["Can I bring my children?", "Yes. Tell us about your family in the form and our team will share the details you need before your visit."],
  ["What happens after I submit?", "A member of our team will contact you with gathering details, answer your questions, and help you feel prepared."],
  ["Do I need to be a member?", "Not at all. Whether you are exploring faith, new to Houston, or looking for a church home, you are welcome."],
]

export default function ContactPage() {
  const [openFaq, setOpenFaq] = useState<number | null>(null)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitStatus, setSubmitStatus] = useState<"idle" | "success" | "error">("idle")

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    setIsSubmitting(true)
    setSubmitStatus("idle")

    const formElement = event.currentTarget
    const form = new FormData(formElement)
    const fullName = String(form.get("fullName") || "").trim()
    const [firstName, ...remainingNames] = fullName.split(/\s+/)
    const lastName = remainingNames.join(" ") || "Not provided"
    const area = String(form.get("area") || "")
    const needs = String(form.get("needs") || "")
    const partnering = String(form.get("partnering") || "Not selected")
    const whatsapp = form.get("whatsapp") ? "Yes" : "No"

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          firstName,
          lastName,
          email: form.get("email"),
          phone: form.get("phone"),
          subject: form.get("reason"),
          message: [
            `Houston area / neighborhood: ${area}`,
            `Interested in partnering: ${partnering}`,
            `WhatsApp contact permitted: ${whatsapp}`,
            "",
            needs || "I would like help planning my visit.",
          ].join("\n"),
        }),
      })

      if (!response.ok) throw new Error("Unable to submit request")
      formElement.reset()
      setSubmitStatus("success")
    } catch {
      setSubmitStatus("error")
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <main className="visit-page">
      <Header />

      <section className="visit-hero section-pad cream">
        <div className="content visit-grid">
          <div className="visit-intro">
            <p className="eyebrow">06 / Let&apos;s connect</p>
            <h1>Your next step <em>starts here.</em></h1>
            <p>Plan your visit and let us help make your first gathering feel simple, personal, and welcoming.</p>
            <div className="visit-location-note">
              <strong>Houston, Texas</strong>
              <span>Gathering details are shared directly after confirmation.</span>
            </div>
          </div>

          <form className="visit-form" onSubmit={handleSubmit}>
            <label>
              How can we help?
              <select name="reason" defaultValue="Plan my visit" required>
                <option>Plan my visit</option>
                <option>Register for discipleship</option>
                <option>Ask a question</option>
                <option>Prayer request</option>
              </select>
            </label>

            <div className="visit-form-row">
              <label>Full name *<input name="fullName" autoComplete="name" required /></label>
              <label>Email *<input name="email" type="email" autoComplete="email" required /></label>
            </div>
            <div className="visit-form-row">
              <label>Phone <span>(optional)</span><input name="phone" type="tel" autoComplete="tel" /></label>
              <label>Houston area / neighborhood *<input name="area" required /></label>
            </div>

            <label>
              Your questions, interests, or family needs <span>(optional)</span>
              <textarea name="needs" rows={5} />
            </label>

            <label>
              Would you like to learn about partnering with TEC? <span>(optional)</span>
              <select name="partnering" defaultValue="">
                <option value="" disabled>Choose an answer</option>
                <option>Yes, please</option>
                <option>Maybe later</option>
                <option>Not at this time</option>
              </select>
            </label>

            <label className="visit-check">
              <input name="whatsapp" type="checkbox" />
              <span>You may contact me through WhatsApp about my request.</span>
            </label>
            <label className="visit-check">
              <input name="consent" type="checkbox" required />
              <span>I agree that TEC may use my details to respond to this request.</span>
            </label>

            {submitStatus === "success" && <p className="visit-form-message success">Thank you. Our team will be in touch soon.</p>}
            {submitStatus === "error" && <p className="visit-form-message error">We couldn&apos;t send your request. Please try again.</p>}

            <button className="button primary" type="submit" disabled={isSubmitting}>
              {isSubmitting ? "Sending…" : "Send my request"}<span>↗</span>
            </button>
          </form>
        </div>
      </section>

      <section className="visit-expect section-pad">
        <div className="content">
          <div className="split visit-section-heading">
            <div>
              <p className="eyebrow">01 / Your first visit</p>
              <h2>Come as you are. <em>Leave encouraged.</em></h2>
            </div>
            <p>From the moment you arrive, our heart is to help you feel at home and make room for a meaningful encounter with God.</p>
          </div>
          <div className="visit-pillars">
            <article><span>01</span><h3>A warm welcome</h3><p>Friendly faces, clear directions, and people ready to help you settle in.</p></article>
            <article><span>02</span><h3>Worship &amp; the Word</h3><p>A Christ-centered gathering shaped by prayer, worship, and practical teaching.</p></article>
            <article><span>03</span><h3>Real community</h3><p>Space to meet people, ask questions, and take your next step at your own pace.</p></article>
          </div>
        </div>
      </section>

      <section className="visit-houston section-pad">
        <div className="content visit-houston-grid">
          <div className="visit-houston-image">
            <Image src="/images/houston.jpg" alt="Houston city skyline" fill sizes="(max-width: 800px) 100vw, 50vw" />
          </div>
          <div>
            <p className="eyebrow">02 / Houston, Texas</p>
            <h2>A place to belong. <em>A space to become.</em></h2>
            <p>We gather to know Christ, grow through His Word, and carry His love into everyday life.</p>
            <div className="visit-schedule">
              <div><span>Sundays</span><strong>Discipleship Gathering</strong></div>
              <div><span>Tuesdays</span><strong>Tuesday at the Table</strong></div>
            </div>
          </div>
        </div>
      </section>

      <section className="visit-faq section-pad cream">
        <div className="content split faq-grid">
          <div>
            <p className="eyebrow">A few things you may be wondering</p>
            <h2>Your visit, <em>made clear.</em></h2>
          </div>
          <div className="accordion">
            {visitFaqs.map(([question, answer], index) => (
              <div className="faq-item" key={question}>
                <button type="button" onClick={() => setOpenFaq(openFaq === index ? null : index)} aria-expanded={openFaq === index}>
                  <span>{question}</span><b>{openFaq === index ? "−" : "+"}</b>
                </button>
                {openFaq === index && <p>{answer}</p>}
              </div>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </main>
  )
}
