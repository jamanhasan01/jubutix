'use client'

import React from 'react'
import { motion, Variants } from 'framer-motion'
import { FaQuoteLeft, FaRocket, FaBullseye, FaSearch } from 'react-icons/fa'
import { cn } from '@/lib/utils' // Assuming you have a `lib/utils.ts`
import Title from './Title' // Your custom Title component

// --- Data Arrays ---
// Centralizing data makes the component cleaner and easier to update.
const testimonials = [
  {
    quote: (
      <>
        Jubutix helped us reduce our Google Ads CPA by{' '}
        <strong className='text-secondary dark:text-blue-400'>47%</strong> in the first two months!
      </>
    ),
    author: 'Imran H.',
    role: 'E-commerce Brand Owner',
  },
  {
    quote: (
      <>
        We now rank on Page 1 for{' '}
        <strong className='text-secondary dark:text-blue-400'>12 keywords</strong> — and organic
        traffic has doubled.
      </>
    ),
    author: 'Anika R.',
    role: 'Education Consultant',
  },
]

const keyMetrics = [
  {
    icon: FaBullseye,
    metricText: '+320% ROAS',
    description: 'with Meta Ads',
    iconColor: 'text-green-500',
  },
  {
    icon: FaRocket,
    metricText: '45,000+ Leads',
    description: 'Generated with Google Ads',
    iconColor: 'text-purple-500',
  },
  {
    icon: FaSearch,
    metricText: '0 to Page 1',
    description: 'SEO Rankings in 4 Months',
    iconColor: 'text-orange-500',
  },
]

// --- Animation Variants ---
const cardVariants: Variants = {
  hidden: { opacity: 0, y: 40 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: i * 0.15,
      duration: 0.5,
      ease: 'easeOut',
    },
  }),
}

// --- Reusable Sub-Components ---

// Simplified AnimatedGradientText from Magic UI
const AnimatedGradientText = ({ text }: { text: string }) => (
  <div className='relative inline-block'>
    <span className='bg-gradient-to-r from-blue-600 to-green-400 bg-clip-text text-xl font-bold text-transparent md:text-2xl'>
      {text}
    </span>
  </div>
)

// Reusable card for testimonials
const TestimonialCard = ({
  quote,
  author,
  role,
  custom,
}: {
  quote: React.ReactNode
  author: string
  role: string
  custom: number
}) => (
  <motion.div
    custom={custom}
    initial='hidden'
    whileInView='visible'
    viewport={{ once: true, amount: 0.5 }}
    variants={cardVariants}
    className='flex h-full flex-col justify-between rounded-xl bg-white p-8 shadow-lg transition-shadow duration-300 hover:shadow-primary/10 dark:bg-gray-800'
  >
    <div>
      <FaQuoteLeft className='mb-4 h-6 w-6 text-secondary dark:text-blue-400' />
      <p className='mb-6 text-lg text-gray-600 dark:text-gray-300'>{quote}</p>
    </div>
    <div className='mt-auto border-t border-gray-200 pt-4 dark:border-gray-700'>
      <p className='font-bold text-secondary dark:text-white'>{author}</p>
      <p className='text-sm text-gray-500 dark:text-gray-400'>{role}</p>
    </div>
  </motion.div>
)

// Reusable item for key metrics
const MetricItem = ({
  icon: Icon,
  metricText,
  description,
  iconColor,
}: {
  icon: React.ElementType
  metricText: string
  description: string
  iconColor: string
}) => (
  <div className='flex items-center space-x-4'>
    <div className='flex-shrink-0'>
      <Icon className={cn('h-7 w-7', iconColor)} />
    </div>
    <div>
      <AnimatedGradientText text={metricText} />
      <p className='text-sm text-gray-600 dark:text-gray-400'>{description}</p>
    </div>
  </div>
)

// --- Main Component ---
const ResultsSection = () => {
  return (
    <section className='w-full bg-gray-50 py-24 dark:bg-gray-900/95'>
      <div className='container mx-auto max-w-7xl px-4'>
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 0.5 }}
          className='mb-16 text-center'
        >
          <Title
            title=' Real Results from Real Campaigns'
            subTitle="Don't just take our word for it. See the tangible impact we've made for our clients."
          />
        </motion.div>

        {/* Main Grid Layout */}
        <div className='grid grid-cols-1 gap-8 lg:grid-cols-3 lg:gap-12'>
          {/* Testimonial Cards */}
          {testimonials.map((testimonial, i) => (
            <TestimonialCard key={i} {...testimonial} custom={i} />
          ))}

          {/* Key Achievements Card */}
          <motion.div
            custom={testimonials.length} // Stagger animation after testimonials
            initial='hidden'
            whileInView='visible'
            viewport={{ once: true, amount: 0.5 }}
            variants={cardVariants}
            className='rounded-xl bg-gradient-to-br from-blue-50 to-white p-8 shadow-xl dark:from-gray-800 dark:to-gray-900'
          >
            <h3 className='mb-6 text-2xl font-bold text-secondary dark:text-white'>
              Key Achievements
            </h3>
            <div className='space-y-6'>
              {keyMetrics.map((metric, i) => (
                <MetricItem key={i} {...metric} />
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}

export default ResultsSection
