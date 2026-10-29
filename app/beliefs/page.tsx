"use client"

import { useState } from "react"
import Link from "next/link"
import Header from "@/components/header"
import Footer from "@/components/footer"

const coreBeliefs = [
  ["The Holy Bible", "The Bible is the inspired, infallible, and authoritative Word of God—the final foundation for doctrine and life. (2 Timothy 3:16; 2 Peter 1:20–21)"],
  ["The Trinity", "There is one God, eternally existing in three persons: Father, Son, and Holy Spirit—coequal and co-eternal. (Matthew 3:16–17; 28:19)"],
  ["Jesus Christ", "Jesus Christ is fully God and fully man. He lived without sin, died for humanity, rose from the dead, ascended to the Father, and will return in power and glory. (John 1:1,14; Philippians 2:5–6)"],
  ["The Virgin Birth", "Jesus Christ was conceived by the Holy Spirit and born of the virgin Mary; therefore, He is the Son of God. (Matthew 1:18,25; Luke 1:35)"],
  ["Redemption", "Humanity was created good but fell through sin. Our only hope of redemption is Jesus Christ, the Son of God. (Genesis 1:26–31; Romans 5:12–21)"],
  ["Regeneration", "To know God, every person must be made new by the Holy Spirit. (John 6:44; Titus 3:5)"],
  ["Salvation", "We are saved by grace through faith in the death, burial, and resurrection of Jesus—not by human works. (Ephesians 2:8–9; Romans 10:9–10)"],
  ["Repentance", "Repentance is turning away from sin and choosing to follow Christ, receiving forgiveness and new life. (Acts 2:21; 3:19; 1 John 1:9)"],
  ["Sanctification", "Sanctification is the continuing work of the Word and the Holy Spirit, forming the character of Christ in believers. (1 Thessalonians 4:3; Romans 12:1–2)"],
  ["The Blood of Jesus", "The sinless blood Jesus shed on the cross is fully sufficient to cleanse humanity from sin and its penalty. (1 John 1:7; Romans 5:9)"],
  ["Christ in Every Believer", "Believers receive Jesus Christ and surrender their lives to Him as Savior and Lord through the indwelling Holy Spirit. (John 1:12; Romans 8:11)"],
  ["Baptism in the Holy Spirit", "The Father gives the Holy Spirit to empower the Church to live boldly and carry the Gospel throughout the earth. (Acts 1:5; 2:1–4)"],
  ["The Gifts of the Spirit", "The Holy Spirit gives gifts that build the Church, confirm the Gospel, and operate in harmony with Scripture. (1 Corinthians 12–14; 1 Peter 4:10)"],
  ["The Church", "The Church is the Body of Christ and the dwelling place of God through the Spirit, united in Jesus and sent to fulfill His Great Commission. (Ephesians 1:22; 2:19–22)"],
]

const practices = [
  ["Water Baptism", "Following faith in Jesus, believers are commanded to be baptized in water in the name of the Father, Son, and Holy Spirit. (Matthew 28:19; Acts 2:38)"],
  ["The Lord's Supper", "Communion remembers and proclaims the sacrifice of Jesus through the bread and the cup. (Matthew 26:26–29; 1 Corinthians 11:23–25)"],
  ["Marriage", "We believe marriage is a sacred biblical covenant between one man and one woman, instituted before God. (Matthew 19:4–6)"],
  ["Healing of the Sick", "Healing is revealed in the ministry of Jesus, included in His commission, and expressed through the gifts and prayer of the Church. (Isaiah 53:5; James 5:14–16)"],
]

const eternalTruths = [
  ["Resurrection", "Jesus Christ physically rose from the dead in a glorified body. Both the saved and the lost will also be raised. (Luke 24:36–39; 1 Corinthians 15:42–44)"],
  ["Heaven", "Heaven is the eternal dwelling place of all who believe the Gospel of Jesus Christ. (John 17:24; 2 Corinthians 5:1)"],
  ["Hell", "Scripture teaches final judgment and eternal separation from God for those who reject Him. (Matthew 25:41; Revelation 20:12–15)"],
  ["The Second Coming", "Jesus Christ will physically and visibly return to establish His Kingdom at a time known only to God. (Acts 1:9–11; Revelation 1:7)"],
]

function BeliefList({ items, start = 1 }: { items: string[][]; start?: number }) {
  const [openItem, setOpenItem] = useState<number | null>(null)

  return (
    <div className="belief-list">
      {items.map(([title, content], index) => (
        <article className={openItem === index ? "open" : ""} key={title}>
          <button type="button" onClick={() => setOpenItem(openItem === index ? null : index)} aria-expanded={openItem === index}>
            <span className="belief-number">{String(start + index).padStart(2, "0")}</span>
            <strong>{title}</strong>
            <b>{openItem === index ? "−" : "+"}</b>
          </button>
          {openItem === index && <p>{content}</p>}
        </article>
      ))}
    </div>
  )
}

export default function BeliefsPage() {
  return (
    <main className="beliefs-page">
      <Header />

      <section className="beliefs-hero section-pad">
        <div className="content">
          <p className="eyebrow dot">What we believe · The Encounter Center Global</p>
          <div className="beliefs-hero-grid">
            <h1>Rooted in truth. <em>Alive in faith.</em></h1>
            <div><p>Times may change, but the truth of God does not. Our beliefs are grounded in Scripture, centered on Jesus, and lived through the power of the Holy Spirit.</p><a className="text-link underline" href="#core">Explore our beliefs <span>↓</span></a></div>
          </div>
        </div>
      </section>

      <section id="core" className="core-beliefs-section section-pad cream">
        <div className="content beliefs-section-grid">
          <div className="beliefs-section-title"><p className="eyebrow">01 / Our foundation</p><h2>Core <em>beliefs.</em></h2><p>The essential truths that shape our understanding of God, salvation, the Church, and the Christian life.</p></div>
          <BeliefList items={coreBeliefs} />
        </div>
      </section>

      <section className="practices-section section-pad">
        <div className="content beliefs-section-grid">
          <div className="beliefs-section-title"><p className="eyebrow">02 / Faith in practice</p><h2>Believed. <em>Lived.</em></h2><p>Faith moves beyond words into worship, obedience, covenant, prayer, and care for people.</p></div>
          <BeliefList items={practices} start={15} />
        </div>
      </section>

      <section className="eternal-section section-pad">
        <div className="content beliefs-section-grid">
          <div className="beliefs-section-title"><p className="eyebrow">03 / Our eternal hope</p><h2>Jesus reigns. <em>Hope remains.</em></h2><p>Our confidence reaches beyond this present life to resurrection, eternity, and the return of Jesus.</p></div>
          <BeliefList items={eternalTruths} start={19} />
        </div>
      </section>

      <section className="beliefs-cta section-pad">
        <div className="content split">
          <div><p className="eyebrow">Truth that transforms</p><h2>Know the Word. <em>Walk it out.</em></h2></div>
          <div><p>These beliefs are not only statements to affirm. They shape how we follow Jesus, love people, and live with purpose.</p><Link className="button light" href="/ministries">Grow through discipleship <span aria-hidden="true">↗</span></Link></div>
        </div>
      </section>

      <Footer />
    </main>
  )
}
