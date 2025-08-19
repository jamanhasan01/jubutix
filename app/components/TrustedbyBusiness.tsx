'use client'

import { motion } from 'framer-motion'

import Title from './Title'
import {
  ScrollVelocityContainer,
  ScrollVelocityRow,
} from '@/components/magicui/scroll-based-velocity'
import Image from 'next/image'

const TrustedbyBusiness = () => {
  // Array of your logo filenames
  const logos = [
    'conpanyLogo1.jpg',
    'conpanyLogo2.jpg',
    'conpanyLogo3.jpg',
    'conpanyLogo4.jpg',
    'conpanyLogo5.jpg',
    'conpanyLogo6.jpg',
    'conpanyLogo7.jpg',
    'conpanyLogo8.jpg',
    'conpanyLogo9.jpg',
    'conpanyLogo10.jpg',
    'conpanyLogo11.jpg',
    'conpanyLogo12.jpg',
    'conpanyLogo13.jpg',
    'conpanyLogo14.jpg',
    'conpanyLogo15.jpg',
    'conpanyLogo16.jpg',
    'conpanyLogo17.jpg',
  ]
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
              'Certified by Google and Meta, Jubutix is trusted by 50+ businesses in Bangladesh and beyond.'
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
          <ScrollVelocityContainer className='py-12'>
            <ScrollVelocityRow baseVelocity={2} direction={-1}>
              {/* Render the logos twice for a seamless, infinite loop */}
              {[...logos, ...logos].map((logo, index) => (
                <div key={index} className='flex-shrink-0 w-36 mx-4'>
                  <Image
                    src={`/company/${logo}`}
                    alt={`Trusted by company ${index + 1}`}
                    width={140}
                    height={60}
                    className='object-contain h-full w-full'
                  />
                </div>
              ))}
            </ScrollVelocityRow>
          </ScrollVelocityContainer>
        </motion.div>
      </div>
    </section>
  )
}

export default TrustedbyBusiness
