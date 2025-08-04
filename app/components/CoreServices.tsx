'use client'

import { motion } from 'framer-motion' // Import motion
import Link from 'next/link'
import { BsGraphUpArrow } from 'react-icons/bs'
import { FaFire } from 'react-icons/fa'
import { TfiSearch } from 'react-icons/tfi'
import Title from './Title'
import { BorderBeam } from '@/components/magicui/border-beam'

// --- Service Type and Data (No changes needed here) ---
type Service = {
  id: number
  icon: React.ComponentType<{ className?: string }>
  iconColor: string
  title: string
  description: string
  features: string[]
  linkText: string
  href: string
  beamColorFrom: string
  beamColorTo: string
  beamDelay: number
}
const servicesData: Service[] = [
  {
    id: 1,
    icon: TfiSearch,
    iconColor: 'text-pink-500 bg-pink-100 p-3',
    title: 'SEO Services',
    description:
      'Rank higher, get found, and stay ahead of the competition with white-hat SEO strategies.',
    features: [
      'Keyword Research & Content Planning',
      'On-Page & Technical SEO',
      'High-Authority Link Building',
      'Local, eCommerce & National SEO',
    ],
    linkText: 'Explore SEO Services',
    href: '/services/seo',
    beamColorFrom: '#ec4899', // Pink
    beamColorTo: '#14b8a6', // Teal
    beamDelay: 0,
  },
  {
    id: 2,
    icon: BsGraphUpArrow,
    iconColor: 'text-violet-500 bg-violet-100 p-3',
    title: 'Google Ads',
    description: 'Drive instant, high-converting traffic using Google’s full suite of ads.',
    features: [
      'Search, Shopping, Display, YouTube',
      'Campaign Setup, Bidding & Optimization',
      'Conversion Tracking, GA4, GTM',
    ],
    linkText: 'Explore Google Ads Services',
    href: '/services/google-ads',
    beamColorFrom: '#9333ea', // Purple
    beamColorTo: '#3b82f6', // Blue
    beamDelay: 2,
  },
  {
    id: 3,
    icon: FaFire,
    iconColor: 'text-orange-500 bg-orange-100 p-3',
    title: 'Facebook & Instagram Ads',
    description: 'Engage your ideal customers where they scroll most.',
    features: [
      'Paid Social Funnel Strategy',
      'A/B Testing & Retargeting',
      'Lead Generation & Catalog Ads',
    ],
    linkText: 'Explore Facebook Ads Services',
    href: '/services/meta-ads',
    beamColorFrom: '#f97316', // Orange
    beamColorTo: '#ec4899', // Pink
    beamDelay: 4,
  },
]

// --- Animation Variants ---
const containerVariant = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2, // This will make the cards animate in one by one
    },
  },
}

const cardVariant = {
  hidden: { opacity: 0, y: 50 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
}

// --- Main Component ---
const CoreServices = () => {
  return (
    <section className='bg-gray-50'>
      <div className='container'>
        {/* Animate the Title component */}
        <motion.div
          initial='hidden'
          whileInView='visible'
          viewport={{ once: true, amount: 0.5 }}
          variants={cardVariant} // Reuse card variant for a consistent effect
        >
          <Title
            title={'What We Do Best'}
            subTitle={
              'We help your business grow fast — with clarity, transparency, and real results.'
            }
          />
        </motion.div>

        {/* Animate the grid container to stagger its children */}
        <motion.div
          className='mt-16 grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3'
          variants={containerVariant}
          initial='hidden'
          whileInView='visible'
          viewport={{ once: true, amount: 0.2 }}
        >
          {servicesData.map((service) => (
            // Convert article to motion.article and apply the card variant
            <motion.article
              key={service.id}
              variants={cardVariant}
              className='relative overflow-hidden flex flex-col bg-white p-8 rounded-2xl shadow-lg hover:shadow-2xl transition-shadow duration-300'
            >
              <BorderBeam
                size={250}
                duration={12}
                delay={service.beamDelay}
                colorFrom={service.beamColorFrom}
                colorTo={service.beamColorTo}
              />
              <div className='flex-grow'>
                <div
                  className={`inline-flex items-center justify-center rounded-lg ${service.iconColor}`}
                >
                  <service.icon className='w-6 h-6' />
                </div>
                <h3 className='mt-6 mb-2 text-xl font-semibold text-gray-900'>{service.title}</h3>
                <p className='mt-2 text-base text-gray-600'>{service.description}</p>
                <ul className='mt-6 space-y-2 text-gray-600 list-disc list-inside text-sm'>
                  {service.features.map((feature, index) => (
                    <li key={index}>{feature}</li>
                  ))}
                </ul>
              </div>
              <Link
                href={service.href}
                className='text-gray-700 font-semibold inline-block mt-8 hover:text-secondary transition-colors group'
              >
                {service.linkText}{' '}
                <span className='inline-block transition-transform group-hover:translate-x-1 motion-reduce:transform-none'>
                  →
                </span>
              </Link>
            </motion.article>
          ))}
        </motion.div>
      </div>
    </section>
  )
}

export default CoreServices