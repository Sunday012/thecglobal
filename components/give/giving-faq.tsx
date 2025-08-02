"use client"

import { Plus, Minus } from "lucide-react"
import { useEffect, useRef, useState } from "react"

export default function GivingFAQ() {
  const [isVisible, setIsVisible] = useState(false)
  const [expandedItems, setExpandedItems] = useState<number[]>([])
  const sectionRef = useRef<HTMLElement>(null)

  const faqs = [
    {
      question: "What types of bank accounts can I give from?",
      answer:
        "You can give from most checking and savings accounts. We accept gifts from major banks and credit unions. For security purposes, we use bank-level encryption to protect your financial information.",
    },
    {
      question: "Are there any fees involved with giving online?",
      answer:
        "There are no fees for ACH/bank transfers. Credit and debit card transactions have a small processing fee that you can choose to cover or have deducted from your gift amount.",
    },
    {
      question: "Can I make a one-time or recurring contribution?",
      answer:
        "Yes! You can make both one-time gifts and set up recurring contributions. Recurring gifts can be scheduled weekly, bi-weekly, monthly, or quarterly according to your preference.",
    },
    {
      question: "Can I change my personal information, amount or frequency of my gift once I have it set up?",
      answer:
        "You can log into your giving account at any time to update your personal information, change gift amounts, modify frequency, or pause/cancel recurring gifts.",
    },
    {
      question: "Can I review my donation history online?",
      answer:
        "Yes, your giving account provides a complete history of all your contributions. You can view, print, or download your giving statements for tax purposes at any time.",
    },
    {
      question: "Will I still receive regular contribution statements from the church?",
      answer:
        "Yes, we provide annual giving statements for tax purposes. You can also access your giving history online anytime through your donor account.",
    },
  ]

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
        }
      },
      { threshold: 0.1 },
    )

    if (sectionRef.current) {
      observer.observe(sectionRef.current)
    }

    return () => observer.disconnect()
  }, [])

  const toggleItem = (index: number) => {
    setExpandedItems((prev) => (prev.includes(index) ? prev.filter((i) => i !== index) : [...prev, index]))
  }

  return (
    <section ref={sectionRef} className="bg-gray-100 py-20 px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        <div
          className={`transition-all duration-1000 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}
        >
          <h2 className="text-4xl lg:text-5xl font-playfair font-medium text-[#272f31]/70 mb-16">
            Frequently Asked Questions
          </h2>

          <div className="space-y-8">
            {faqs.map((faq, index) => (
              <div key={index} className="border-b border-[#272f31]/20 pb-8">
                <button
                  onClick={() => toggleItem(index)}
                  className="w-full flex items-center justify-between text-left group"
                >
                  <div className="flex items-center space-x-8">
                    <span className="text-[#272f31]/40 font-playfair text-6xl font-light">
                      {String(index + 1).padStart(2, "0")}
                    </span>
                    <h3 className="text-[#272f31] font-montserrat font-bold text-2xl lg:text-3xl group-hover:text-[#0A523B] transition-colors max-w-4xl">
                      {faq.question}
                    </h3>
                  </div>
                  <div className="text-[#272f31] group-hover:text-[#0A523B] transition-colors flex-shrink-0">
                    {expandedItems.includes(index) ? <Minus size={24} /> : <Plus size={24} />}
                  </div>
                </button>
                {expandedItems.includes(index) && (
                  <div className="mt-6 ml-24 animate-fade-in-up">
                    <p className="text-[#272f31]/80 font-work-sans text-lg leading-relaxed max-w-4xl">{faq.answer}</p>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
