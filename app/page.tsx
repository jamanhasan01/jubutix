import homeHeroImg from '../public/homeHeroImg.png'
import CoreServices from './components/CoreServices'
import Hero from './components/Hero'
import TrustedbyBusiness from './components/TrustedbyBusiness'
import WeHelp from './components/WeHelp'
import WhyChooseSection from './components/WhyChooseSection'
export default function HomePage() {
  return (
    <div>
      <Hero
        heading={'Grow your Business & Revenue with the champions '}
        desc={'From leads to Sales we are here to deliver the transformative Results.'}
        img={homeHeroImg}
      />
      <TrustedbyBusiness />
      <CoreServices />
      <WeHelp/>
      <WhyChooseSection/>
    </div>
  )
}
