

import { MarqueeDemo } from './MarqueeDemo'
import Title from './Title'

const TrustedbyBusiness = () => {
  return (
   <section>
     <div className='container'>
      <Title
        title={'Trusted by Businesses That Want Results'}
        subTitle={
          'Certified by Google and Meta, Jubutix is trusted by 50+ businesses in Bangladesh and beyond..'
        }
      />
      <MarqueeDemo/>
   
    </div>
   </section>
  )
}

export default TrustedbyBusiness
