'use client'

import { motion } from 'framer-motion'
import Button from './Button'
import { StaticImageData } from 'next/image'

interface heroProps {
  heading: string
  desc: string
  img: StaticImageData
}

// FIX: Add "as const" to the end of the variant objects
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.3,
    },
  },
} as const;

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
      ease: 'easeOut',
    },
  },
} as const;

const Hero = ({ heading, desc }: heroProps) => {
  return (
    <section className='relative isolate overflow-hidden'>


      <div className='container py-0'>
        <motion.div
          variants={containerVariants}
          initial='hidden'
          animate='visible'
          className='min-h-screen flex flex-col items-center justify-center text-center'
        >
          {/* Heading */}
          <motion.h1 variants={itemVariants} className='my-6'>
            {heading}
          </motion.h1>

          {/* Description */}
          <motion.p variants={itemVariants} className='mx-auto max-w-2xl'>
            {desc}
          </motion.p>

          {/* Button Group */}
          <motion.div
            variants={itemVariants}
            className=' flex flex-col sm:flex-row items-center justify-center gap-4'
          >
            <Button text='Get a Free Audit' classname='' />
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}

export default Hero