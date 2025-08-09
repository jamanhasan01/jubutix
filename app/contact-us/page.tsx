// app/contact/page.tsx

import Hero from '../components/Hero'
import ConnectWithUs from './components/ConnectWithUs'
import ContactInfoSection from './components/ContactInfoSection'
import ContactUsForm from '../components/ContactUsForm'

export default function ContactPage() {
  return (
    <>
      <Hero
        heading='Connect With Jubutix'
        desc="Whether you're ready to grow or just exploring, we're here to help."
      />
      <ContactUsForm />
      <ContactInfoSection />
      <ConnectWithUs />
    </>
  )
}
