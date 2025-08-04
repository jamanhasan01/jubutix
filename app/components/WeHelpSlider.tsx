'use client'

import React, { useRef } from 'react'
import { motion } from 'framer-motion'
import Autoplay from 'embla-carousel-autoplay'
import { BentoCard } from '@/components/magicui/BentoGrid'
import { FaBox, FaLaptopCode, FaChalkboardTeacher, FaStore, FaHeartbeat } from 'react-icons/fa'
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@/components/ui/carousel'
import Title from './Title'

// --- Data (No changes needed here) ---
const WeHelpData = [
  {
    name: 'eCommerce Brands',
    description: 'Scaling DTC brands with targeted ad campaigns and conversion optimization.',
    background: <div className='h-32 bg-gradient-to-r from-cyan-500 to-blue-500' />,
    Icon: FaBox,
    href: '/services/ecommerce',
    cta: 'Learn More',
  },
  {
    name: 'SaaS & Tech',
    description: 'Driving user acquisition and reducing churn for innovative tech platforms.',
    background: <div className='h-32 bg-gradient-to-r from-purple-500 to-pink-500' />,
    Icon: FaLaptopCode,
    href: '/services/saas',
    cta: 'Explore',
  },
  {
    name: 'Coaches & Creators',
    description: 'Building authority and selling out courses with smart funnel strategies.',
    background: <div className='h-32 bg-gradient-to-r from-yellow-400 to-orange-500' />,
    Icon: FaChalkboardTeacher,
    href: '/services/coaching',
    cta: 'Start Now',
  },
  {
    name: 'Local Businesses',
    description: 'Dominating local search and attracting foot traffic with geo-targeted SEO.',
    background: <div className='h-32 bg-gradient-to-r from-green-500 to-lime-500' />,
    Icon: FaStore,
    href: '/services/local',
    cta: 'Discover',
  },
  {
    name: 'Health & Wellness',
    description: 'Connecting with patients and clients through compliant, empathetic marketing.',
    background: <div className='h-32 bg-gradient-to-r from-pink-500 to-red-500' />,
    Icon: FaHeartbeat,
    href: '/services/health',
    cta: 'Get Help',
  },
]

// --- Animation Variant ---
const sectionVariants = {
  hidden: { opacity: 0, y: 50 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: 'easeOut',
    },
  },
} as const

// --- Main Slider Component ---
export default function WeHelpSlider() {
  const plugin = useRef(Autoplay({ delay: 3000, stopOnInteraction: true }))

  return (
    <section className=' bg-background'>
      <div className='container'>
        <motion.div
          className='text-center mb-14'
          initial='hidden'
          whileInView='visible'
          viewport={{ once: true, amount: 0.5 }}
          variants={sectionVariants}
        >
          <Title
            title='Built for Growth Leaders'
            subTitle='          We partner with ambitious brands across industries to achieve remarkable results.'
          ></Title>
        </motion.div>

        <motion.div
          initial='hidden'
          whileInView='visible'
          viewport={{ once: true, amount: 0.2 }}
          variants={sectionVariants}
        >
          <Carousel
            plugins={[plugin.current]}
            onMouseEnter={() => plugin.current.stop()}
            onMouseLeave={() => plugin.current.reset()}
            opts={{
              align: 'start',
              loop: true,
            }}
            className='container py-0' 
          >
            <CarouselContent>
              {WeHelpData.map((item, index) => (
                <CarouselItem key={index} className='basis-full md:basis-1/2 lg:basis-1/3'>
                  <div className='p-1 h-full'>
                    {/* The BentoCard component works perfectly here! */}
                    <BentoCard
                      name={item.name}
                      description={item.description}
                      className='h-full flex flex-col' // Ensure consistent height
                      background={item.background}
                      Icon={item.Icon}
                      href={item.href}
                      cta={item.cta}
                    />
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious  />
            <CarouselNext />
          </Carousel>
        </motion.div>
      </div>
    </section>
  )
}
