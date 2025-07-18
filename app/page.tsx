import ComparisonSection from './components/ComparisonSection'
import GlobalClients from './components/GlobalClients'
import HallOfTrust from './components/HallOfTrust'
import Hero from './components/Hero'
import PartnerCards from './components/PartnerCards'
import PerformanceHero from './components/PerformanceHero'
import ProcessSection from './components/ProcessSection'
import ServicesSection from './components/ServicesSection'
import StatsSection from './components/StatsSection'

import homeHeroImg from '../public/homeHeroImg.png'

export default function Home() {
  return (
    <div>
      <Hero
        heading={'Grow your Business & Revenue with the champions of Digital Marketing.'}
        desc={'From leads to Sales we are here to deliver the transformative Results.'}
        img={homeHeroImg}
      />
      <HallOfTrust />
      <ServicesSection />
      <PerformanceHero />
      <StatsSection />
      <ComparisonSection />
      <PartnerCards />
      <ProcessSection />
      <GlobalClients />
    </div>
  )
}
