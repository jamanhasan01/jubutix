import ComparisonSection from "./components/ComparisonSection";
import HallOfTrust from "./components/HallOfTrust";
import Hero from "./components/Hero";
import PartnerCards from "./components/PartnerCards";
import PerformanceHero from "./components/PerformanceHero";
import ServicesSection from "./components/ServicesSection";
import StatsSection from "./components/StatsSection";

export default function Home() {
  return <div>
    <Hero/>
    <HallOfTrust/>
    <ServicesSection/>
    <PerformanceHero/>
    <StatsSection/>
    <ComparisonSection/>
    <PartnerCards/>
  </div>
}
