import Hero from '@/app/components/Hero'
import metaAdsHero from '../../public/metaAdsHeroImg.png'

import TrustedbyBusiness from '../components/TrustedbyBusiness'
import WhyChooseSection from '../components/WhyChooseSection'
import ReviewsSection from '../components/ReviewSection'
import ContactUsForm from '../components/ContactUsForm'
import { WhyChooseUsFbSection } from './components/WhyChoiceUsFbSection'
import { StatsBanner } from '../components/StatsBanner'
import { OurProcess } from './components/OurProcess'
import { PpcTasksSection } from './components/PpcTasksSection'
import { CtaSection } from '../google-ads/components/CtaSection'
const statsData = [
  {
    value: '+70%',
    label: 'Increase in Social Sales',
  },
  {
    value: '-25%',
    label: 'Reduction in CPA',
  },
  {
    value: '-25%',
    label: 'Reduction in CPA',
  },
  {
    value: '+150%',
    label: 'Growth in Brand Followers',
  },
 
]
const metaAdsPage = () => {
  return (
    <main>
      <Hero
        heading='Scale Your Ecommerce Store with High-Performance Facebook Ads'
        desc='Jubutix helps ecommerce brands drive profitable growth through data-driven Facebook & Instagram campaigns — no wasted ad spend, just sales.'
        img={metaAdsHero}
      />

      <TrustedbyBusiness />
      <WhyChooseSection />
      <OurProcess/>
      <PpcTasksSection/>
      <StatsBanner data={statsData} />
      <ReviewsSection />
      <WhyChooseUsFbSection />
      <CtaSection/>
      <ContactUsForm />
    </main>
  )
}

export default metaAdsPage
