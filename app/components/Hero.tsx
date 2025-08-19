'use client'

// 1. Import ReactNode, useRef, useScroll, and useTransform
import { useRef, type ReactNode } from 'react' // Import ReactNode
import { motion, useScroll, useTransform } from 'framer-motion'
import Button from './Button'
import { StaticImageData } from 'next/image'
import { Particles } from '@/components/magicui/particles'

interface heroProps {
  heading: ReactNode // Changed from 'any' to 'ReactNode'
  desc: string
  img?: StaticImageData
  btn?: boolean
  btn_text?: string
}

// Initial animation variants (these remain the same)
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

  const { scrollYProgress } = useScroll({
    target: targetRef,
    offset: ['start start', 'end start'],
  })

  const y = useTransform(scrollYProgress, [0, 1], ['0%', '-50%'])
  const opacity = useTransform(scrollYProgress, [0, 0.7, 1], [1, 1, 0])

  const backgroundY = useTransform(scrollYProgress, [0, 1], ['0%', '20%'])

  return (
    <section ref={targetRef} className='relative w-full isolate overflow-hidden min-h-screen'>
      <motion.div style={{ y: backgroundY }} className='absolute inset-0 -z-10'>
        <Particles />
      </motion.div>

      <div className='container py-0'>
        <motion.div
          variants={containerVariants}
          initial='hidden'
          animate='visible'
          style={{ y, opacity }}
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
          {btn == true && (
            <motion.div
              variants={itemVariants}
              className='flex flex-col sm:flex-row items-center justify-center gap-4  mt-5' // Added mt-8 for spacing
            >
              <Button text={`${btn_text ? btn_text : 'Get a Free Audit'}`} classname='' />
            </motion.div>
          )}
        </motion.div>
      </div>
    </section>
  )
}

export default Hero