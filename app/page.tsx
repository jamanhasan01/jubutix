
import homeHeroImg from '../public/homeHeroImg.png'
import Hero from './components/Hero'

export default function Home() {
  return (
    <div>
      <Hero
        heading={'Grow your Business & Revenue with the champions '}
        desc={'From leads to Sales we are here to deliver the transformative Results.'}
        img={homeHeroImg}
      />
  
    </div>
  )
}
