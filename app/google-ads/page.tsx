import Hero from '@/app/components/Hero'
import React from 'react'
import seoHeroImg from '../../public/seoHeroImg.png'
import { CtaSection } from './components/CtaSection'
import { OptimizationSection } from './components/Optimization-Section'
import Feature from '../seo/components/Feature'
import TrustedbyBusiness from '../components/TrustedbyBusiness'
import { PpcGoalsSection } from './components/PpcGoalsSection'
import { StatsBanner } from '../components/StatsBanner'
import { PpcServicesSection } from './components/PpcServicesSection'
import { CampaignServicesSection } from './components/CampaignServicesSection'
import ContactUsForm from '../components/ContactUsForm'
const statsData = [
  {
    value: '-28%',
    label: 'Decrease in Cost-Per-Conversion',
  },
  {
    value: '+30%',
    label: 'Increase in Conversion Rate',
  },
  {
    value: '+40%',
    label: 'Increase in Click Through Rate',
  },
  {
    value: '-35%',
    label: 'Reduction in Cost Per Click',
  },
];
const seoPage = () => {
  return (
    <main>
      <Hero
        heading='Drive Sales With Google
Ads & PPC Services.'
        desc='Our certified Google Ads experts deliver a 311% average boost in conversions, and you can watch it happen with our visually clear, real-time KPI reports.'
        img={seoHeroImg}
      />
      <Feature />
      <TrustedbyBusiness />
      <PpcGoalsSection />
      <PpcServicesSection />
      <CampaignServicesSection />
      <OptimizationSection />
      <StatsBanner data={statsData}/>
      <CtaSection />
      <ContactUsForm />
    </main>
  )
}

export default seoPage
