import React from 'react'
import Hero from '../components/Hero'
import Feature from './components/Feature'
import ClientLogos from '../components/ClientLogos'
import SeoServicesSection from './components/SeoServicesSection'

const SeoPage = () => {
  return (
    <main>
      <Hero
        heading='Best SEO Service Agency
with 1000+ Success Stories'
        desc='Beat your competition with the best SEO company in Bangladesh! Don’t be fed up with so-called SEO experts (who make more excuses than results)! Let our SEO services be your secret weapon!'
        btn_text='Talk With Our Award-Winne'
      />
      <Feature />
      <ClientLogos />
      <SeoServicesSection />
    </main>
  )
}

export default SeoPage
