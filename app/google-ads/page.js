import Hero from '@/app/components/Hero'
import React from 'react'
import seoHeroImg from '../../public/seoHeroImg.png'
import { CtaSection } from './components/CtaSection'
import { OptimizationSection } from './components/Optimization-Section'
import Feature from '../seo/components/Feature'
import TrustedbyBusiness from '../components/TrustedbyBusiness'
import { PpcGoalsSection } from './components/PpcGoalsSection'
import { StatsSection } from './components/StatsSection'
import { PpcServicesSection } from './components/PpcServicesSection'
import { CampaignServicesSection } from './components/CampaignServicesSection'
import ContactUsForm from '../components/ContactUsForm'



const seoPage = () => {
  return (
    <main>
      <Hero
        heading='SEO Agency to Scale your Organic Traffic and Sales
with Better ROI.'
        desc='We don’t just increase SEO traffic, we gain competitor
SEO market share'
        img={seoHeroImg}
      />
      <Feature/>
      <TrustedbyBusiness/>
      <PpcGoalsSection/>
      <PpcServicesSection/>
      <CampaignServicesSection/>
      <OptimizationSection/>
      <StatsSection/>
      <CtaSection/>
      <ContactUsForm/>

    </main>
  )
}

export default seoPage
