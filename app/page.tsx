import ComparisonSection from './components/ComparisonSection'
import GlobalClients from './components/GlobalClients'
import HallOfTrust from './components/HallOfTrust'
import Hero from './components/Hero'
import PartnerCards from './components/PartnerCards'
import PerformanceHero from './components/PerformanceHero'
import ProcessSection from './components/ProcessSection'
import ServicesSection from './components/ServicesSection'
import StatsSection from './components/StatsSection'

export default function Home() {
  return (
    <div>
      <Hero />
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
