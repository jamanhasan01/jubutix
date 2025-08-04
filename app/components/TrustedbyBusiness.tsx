'use client'

import { motion } from 'framer-motion'
import { MarqueeDemo } from './MarqueeDemo'
import Title from './Title'

const TrustedbyBusiness = () => {
  return (
    <section>
      <div className='container'>
        {/* Animate the Title component */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 0.5 }}
        >
          <Title
            title={'Trusted by Businesses That Want Results'}
            subTitle={
              'Certified by Google and Meta, Jubutix is trusted by 50+ businesses in Bangladesh and beyond..'
            }
          />
        </motion.div>

        {/* Animate the Marquee component with a slight delay */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <MarqueeDemo />
        </motion.div>
      </div>
    </section>
  )
}

export default TrustedbyBusiness
