'use client'

// 1. Import useRef, useScroll, and useTransform
import { useRef } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import Button from './Button'
import { StaticImageData } from 'next/image'
import { Particles } from '@/components/magicui/particles'

interface heroProps {
  heading: any
  desc: string
  img?: StaticImageData // This prop is in your interface but not used, which is fine.
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
  // 2. Create a ref for the section element
  const targetRef = useRef<HTMLDivElement>(null)

  // 3. Use useScroll to track scroll progress within the targetRef
  const { scrollYProgress } = useScroll({
    target: targetRef,
    offset: ['start start', 'end start'], // Start tracking when the top of the section hits the top of the viewport, end when the bottom of the section hits the top.
  })

  // 4. Use useTransform to create parallax effects
  // For the main text content: move it up faster than the scroll
  const y = useTransform(scrollYProgress, [0, 1], ['0%', '-50%'])
  const opacity = useTransform(scrollYProgress, [0, 0.7, 1], [1, 1, 0]) // Fade out at the end

  // For the background particles: move them down slowly to create depth
  const backgroundY = useTransform(scrollYProgress, [0, 1], ['0%', '20%'])

  return (
    // Attach the ref to the section
    <section ref={targetRef} className='relative w-full isolate overflow-hidden min-h-screen '>
      {/* 5. Apply the background parallax style */}
      <motion.div style={{ y: backgroundY }} className='absolute inset-0 -z-10'>
        <Particles />
      </motion.div>

      <div className='container py-0'>
        <motion.div
          variants={containerVariants}
          initial='hidden'
          animate='visible'
          // 5. Apply the main content parallax styles
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
              className='flex flex-col sm:flex-row items-center justify-center gap-4' // Added mt-8 for spacing
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
