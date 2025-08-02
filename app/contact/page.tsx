"use client"

import Header from "@/components/header"
import ContactHero from "@/components/contact/contact-hero"
import ContactForm from "@/components/contact/contact-form"
import LocationsContact from "@/components/contact/locations-contact"
import StaffContact from "@/components/contact/staff-contact"
import OfficeHours from "@/components/contact/office-hours"
import ContactCTA from "@/components/contact/contact-cta"
import Footer from "@/components/footer"

export default function ContactPage() {
  return (
    <main className="min-h-screen">
      <Header />
      <ContactHero />
      <ContactForm />
      <LocationsContact />
      <StaffContact />
      <OfficeHours />
      <ContactCTA />
      <Footer />
    </main>
  )
}
