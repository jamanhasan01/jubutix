// components/seo-result-section.tsx

import React from 'react'
import { Card, CardContent, CardFooter } from '@/components/ui/card'
import Title from '../../components/Title'
import Button from '../../components/Button'

export function SeoResultSection() {
  return (
    <section className='w-full'>
      <div className='container '>
        <div className='grid gap-12 lg:grid-cols-2 lg:gap-20'>
          {/* Left Column: Text Content */}
          <div className='flex flex-col justify-left'>
            <Title
              title='We Generated 364% More Revenue for Rokomari.com'
              subTitle='How much revenue does SEO marketing really produce? Yes, it depends. But we have already proven to generate more sales and growth than the average SEO agencies. This is our strength that differentiates between a strong SEO company and a weak one.'
              classname='text-left'
            />

            <Button text='I Want Similar Result' />
          </div>

          {/* Right Column: Chart & Testimonial */}
          <div className='relative flex items-center justify-center p-6'>
            {/* SVG Chart */}
            <div className='w-full max-w-lg mx-auto'>
              <svg viewBox='0 0 400 250' className='w-full h-auto'>
                {/* Gradient Definition */}
                <defs>
                  <linearGradient id='chartGradient' x1='0' y1='0' x2='0' y2='1'>
                    <stop offset='5%' stopColor='#60a5fa' stopOpacity={0.4} />
                    <stop offset='95%' stopColor='#60a5fa' stopOpacity={0} />
                  </linearGradient>
                </defs>

                {/* Grid Lines */}
                <g className='text-gray-200 stroke-current' strokeWidth='1'>
                  {[...Array(11)].map((_, i) => (
                    <line key={`h-line-${i}`} x1='0' y1={i * 25} x2='400' y2={i * 25} />
                  ))}
                  {[...Array(17)].map((_, i) => (
                    <line key={`v-line-${i}`} x1={i * 25} y1='0' x2={i * 25} y2='250' />
                  ))}
                </g>

                {/* Data Path - Area */}
                <path
                  d='M 25 220 L 75 180 L 125 160 L 175 125 L 225 110 L 275 80 L 325 50 L 375 20 L 375 250 L 25 250 Z'
                  fill='url(#chartGradient)'
                />

                {/* Data Path - Line */}
                <path
                  d='M 25 220 L 75 180 L 125 160 L 175 125 L 225 110 L 275 80 L 325 50 L 375 20'
                  fill='none'
                  stroke='#3b82f6'
                  strokeWidth='3'
                />

                {/* Data Points */}
                <g fill='#3b82f6' stroke='#ffffff' strokeWidth='2'>
                  <circle cx='25' cy='220' r='5' />
                  <circle cx='75' cy='180' r='5' />
                  <circle cx='125' cy='160' r='5' />
                  <circle cx='175' cy='125' r='5' />
                  <circle cx='225' cy='110' r='5' />
                  <circle cx='275' cy='80' r='5' />
                  <circle cx='325' cy='50' r='5' />
                  <circle cx='375' cy='20' r='5' />
                </g>
              </svg>
            </div>

            {/* Testimonial Card */}
            <Card className='absolute bottom-4 right-0 md:bottom-4 md:right-4 w-full max-w-[280px] bg-white/80 backdrop-blur-sm shadow-xl'>
              <CardContent className='p-2'>
                <blockquote className='text-sm text-gray-800'>
                  &ldquo;Sales! Sales! and Sales! Our ROI has greatly improved. Thanks, Bizcope
                  team!&rdquo;
                </blockquote>
              </CardContent>
              <CardFooter className='p-2 pt-0'>
                <p className='text-xs font-semibold text-gray-900'>Mahmudul Sadi, Rokomari</p>
              </CardFooter>
            </Card>
          </div>
        </div>
      </div>
    </section>
  )
}
