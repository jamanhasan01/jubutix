import Hero from '@/app/components/Hero'
import metaAdsHero from '../../public/metaAdsHeroImg.png'

import FacebookAdsServices from './components/FacebookAdsServices'
const metaAdsPage = () => {
  return (
    <main>
      <Hero
        heading='Ready to Scale with leading Facebook Ads Agency in India'
        desc='We are full service Facebook Ads Agency'
        img={metaAdsHero}
      />
    
      <FacebookAdsServices/>
    </main>
  )
}

export default metaAdsPage
