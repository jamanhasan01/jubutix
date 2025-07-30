import Hero from '@/app/components/Hero'
import React from 'react'
import seoHeroImg from '../../public/seoHeroImg.png'
import HallOfTrust from '@/app/components/HallOfTrust'
import ResultsSection from './components/ResultsSection'

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
      <HallOfTrust/>
      <ResultsSection/>

    </main>
  )
}

export default seoPage
