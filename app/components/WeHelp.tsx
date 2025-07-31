'use client'

import React from 'react'
import { BentoCard, BentoGrid } from '@/components/magicui/BentoGrid'
import { FaBox, FaLaptopCode, FaChalkboardTeacher, FaStore, FaHeartbeat } from 'react-icons/fa'

const WeHelpData = [
  {
    name: 'eCommerce Brands',
    description: 'Scaling DTC brands with targeted ad campaigns and conversion optimization.',
    className: 'md:col-span-2',
    background: <div className='h-32 bg-gradient-to-r from-cyan-500 to-blue-500' />,
    Icon: FaBox,
    href: '/services/ecommerce',
    cta: 'Learn More',
  },
  {
    name: 'SaaS & Tech',
    description: 'Driving user acquisition and reducing churn for innovative tech platforms.',
    className: 'md:col-span-1',
    background: <div className='h-32 bg-gradient-to-r from-purple-500 to-pink-500' />,
    Icon: FaLaptopCode,
    href: '/services/saas',
    cta: 'Explore',
  },
  {
    name: 'Coaches & Creators',
    description: 'Building authority and selling out courses with smart funnel strategies.',
    className: 'md:col-span-1',
    background: <div className='h-32 bg-gradient-to-r from-yellow-400 to-orange-500' />,
    Icon: FaChalkboardTeacher,
    href: '/services/coaching',
    cta: 'Start Now',
  },
  {
    name: 'Local Businesses',
    description: 'Dominating local search and attracting foot traffic with geo-targeted SEO.',
    className: 'md:col-span-2',
    background: <div className='h-32 bg-gradient-to-r from-green-500 to-lime-500' />,
    Icon: FaStore,
    href: '/services/local',
    cta: 'Discover',
  },
  {
    name: 'Health & Wellness',
    description: 'Connecting with patients and clients through compliant, empathetic marketing.',
    className: 'md:col-span-1',
    background: <div className='h-32 bg-gradient-to-r from-pink-500 to-red-500' />,
    Icon: FaHeartbeat,
    href: '/services/health',
    cta: 'Get Help',
  },
]

export default function WeHelp() {
  return (
    <section className='py-20 bg-background'>
      <div className='container px-4 mx-auto'>
        <div className='text-center mb-14'>
          <h2 className='text-4xl sm:text-5xl font-bold text-foreground'>
            Built for Growth Leaders
          </h2>
          <p className='mt-4 text-lg max-w-2xl mx-auto text-muted-foreground'>
            We partner with ambitious brands across industries to achieve remarkable results.
          </p>
        </div>

        <BentoGrid className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'>
          {WeHelpData.map((item, index) => (
            <BentoCard
              key={index}
              name={item.name}
              description={item.description}
              className={item.className}
              background={item.background}
              Icon={item.Icon}
              href={item.href}
              cta={item.cta}
            />
          ))}
        </BentoGrid>
      </div>
    </section>
  )
}
