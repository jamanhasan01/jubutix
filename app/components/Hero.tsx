'use client'

import { useRef, type ReactNode } from 'react'
import { motion } from 'framer-motion'
import Button from './Button'
import { StaticImageData } from 'next/image'
import { Particles } from '@/components/magicui/particles'
import { BlobShape } from './BlobShape'

// 1. Import the new Card components and some icons
import InfoCard, { CardIcon } from './InfoCard'
import { ArrowUp, BarChart3, Link } from 'lucide-react'


interface heroProps {
  heading: ReactNode
  desc: string
  img?: StaticImageData
  btn?: boolean
  btn_text?: string
}

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.3,
    },
  },
} as const

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
} as const

const Hero = ({ heading, desc, btn = true, btn_text }: heroProps) => {
  const targetRef = useRef<HTMLDivElement>(null)

  // Motion hooks remain the same
  // ...

  return (
    <section ref={targetRef} className='relative w-full isolate overflow-hidden min-h-screen'>
      <motion.div /* ... */ className='absolute inset-0 -z-10'>
        <Particles />
      </motion.div>

      <div className='container py-0'>
        <motion.div
          initial='hidden'
          animate='visible'
          // ...
          className='min-h-screen flex flex-col md:flex-row items-center gap-8'
        >
          {/* ====== Left Column (Wrapped in motion.div for animations) ====== */}
          <motion.div
            variants={containerVariants}
            className='w-full md:w-3/5 flex flex-col items-center md:items-start text-center md:text-left'
          >
<motion.h1
  variants={itemVariants}
  className='my-6 text-6xl font-extrabold bg-gradient-to-r from-red-500 via- to-orange-500 bg-clip-text text-transparent'
>
  {heading}
</motion.h1>
            <motion.p variants={itemVariants} className='mx-auto md:mx-0 max-w-2xl'>
              {desc}
            </motion.p>
            {btn && (
              <motion.div variants={itemVariants} className='mt-8'>
                <Button text={`${btn_text ? btn_text : 'Get a Free Audit'}`} classname='' />
              </motion.div>
            )}
          </motion.div>

          {/* ====== Right Column (Blob Shape and Info Cards) ====== */}
          <motion.div
            variants={containerVariants}
            // 2. Add `relative` to make this the positioning container
            className='w-full md:w-2/5 h-[500px] flex items-center justify-center relative mt-20'
          >
            <BlobShape />

            {/* 3. Place the InfoCards here */}
            <InfoCard
              variants={itemVariants}
              icon={<CardIcon icon={ArrowUp} bgColor='bg-emerald-100' color='text-emerald-500' />}
              title='8 Keywords Moved Up'
              subtitle='Click to see results'
              className='top-30 right-10' // Position top-right
            />
            <InfoCard
              variants={itemVariants}
              icon={<CardIcon icon={BarChart3} bgColor='bg-blue-100' color='text-blue-500' />}
              title='14 High-Traffic Keywords Found'
              subtitle='Based on project analysis'
              className='left-0 top-1/2 -translate-y-1/2' // Position middle-left
            />
            <InfoCard
              variants={itemVariants}
              icon={<CardIcon icon={Link} bgColor='bg-purple-100' color='text-purple-500' />}
              title='80 New Backlinks Found'
              subtitle='Based on daily analysis'
              className='bottom-30 right-1/4' // Position bottom-ish
            />
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}

export default Hero