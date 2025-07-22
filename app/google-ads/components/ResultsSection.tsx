
'use client' 

import React from 'react'
import Image from 'next/image'


import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@/components/ui/carousel'
import { CheckCircle2 } from 'lucide-react'
import Button from '@/app/components/Button'

const strategies = [
  'Complete Audit',
  'Data Driven Approach',
  'Customised Strategy',
  'Improvement in User Experience',
  'Advanced Content Strategies',
  'Competitor Keywords and Strategy Gap',
  'Backlink Campaigns',
  'Most indepth Keyword research',
]

const resultImages = [
  { src: '/results/result-1.png', alt: 'Dashboard showing SEO results' },
  { src: '/results/result-2.png', alt: 'Dashboard showing PPC campaign performance' },
  { src: '/results/result-3.png', alt: 'Dashboard showing social media engagement' },
]

const ResultsSection = () => {
  return (
    <section className='bg-primary '>
      <div className='container '>
        {/* --- Main Section Title --- */}
        <div className='text-center mb-12'>
          <h1 className='text-secondary'>
            <span className='relative inline-block'>Results</span> we Deliver
          </h1>
        </div>

        {/* --- Main Grid Layout --- */}
        <div className='grid grid-cols-1 lg:grid-cols-2 gap-12 items-center'>
          {/* --- Left Column: Text Content --- */}
          <div className='space-y-6'>
            <h3 className='text-secondary'>
              Our Strategies that can deliver{' '}
              Results like these :
            </h3>
            <p className='text-white'>
              We have dedicated strategies for different kind of website. We Setup KPIs, analyse the
              website thoroughly from SEO perfective and then craft strategies using our years of
              experience to Boost SEO game.
            </p>
            {/* --- Two-Column Checklist --- */}
            <div className='grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-3 pt-2'>
              {strategies.map((item) => (
                <div key={item} className='flex items-center'>
                  <CheckCircle2 className='h-5 w-5 text-green-500 mr-2 flex-shrink-0' />
                  <span className='text-white'>{item}</span>
                </div>
              ))}
            </div>
            <div className='pt-4'>
              <Button text=' GET A FREE QUOTE NOW' classname='!text-primary bg-secondary'/>
            </div>
          </div>

          {/* --- Right Column: Image Carousel --- */}
          <div>
            <Carousel className='w-full max-w-xl mx-auto' opts={{ loop: true }}>
              <CarouselContent>
                {resultImages.map((image, index) => (
                  <CarouselItem key={index}>
                    <div className='p-1'>
                      <Image
                        src={image.src}
                        alt={image.alt}
                        width={800}
                        height={600}
                        className='w-full h-auto rounded-lg border border-gray-200 shadow-md'
                      />
                    </div>
                  </CarouselItem>
                ))}
              </CarouselContent>
              <CarouselPrevious className='hidden sm:flex' />
              <CarouselNext className='hidden sm:flex' />
            </Carousel>
          </div>
        </div>
      </div>
    </section>
  )
}

export default ResultsSection
