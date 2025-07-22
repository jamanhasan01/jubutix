// components/ServicesSection.tsx

import React from 'react'
import Image from 'next/image'

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { CheckCircle2, ArrowRight, Code2 } from 'lucide-react'
import Button from './Button'

// 1. Define the type for a single service object
type Service = {
  title: string
  description: string
  features: string[]
  // The icon can be a string (for a URL) or a React Component
  icon: string | React.ComponentType<{ className?: string }>
}

// 2. Apply the type to your services array
const services: Service[] = [
  {
    icon: '/seo.png', // The path to the image
    title: 'SEO',
    description: "Outperform your biggest rivals with India's leading SEO Company...",
    features: ['Local SEO', 'International SEO', 'Ecommerce SEO', 'Enterprise SEO'],
  },
  {
    icon: '/googleads.png', // The path to the image
    title: 'Google Ads',
    description: 'Let our experts take charge of your PPC campaign...',
    features: ['Google Ads', 'PMax Campaigns', 'Shopping Campaigns', 'Planning & Strategies'],
  },
  {
    icon: '/meta.png', // The path to the image
    title: 'Meta Ads',
    description: 'From Generating leads from the businesses to Generating sales...',
    features: ['Ads Creation & Brainstorming', 'Facebook Ads', 'Instagram Ads'],
  },
  {
    icon: Code2, // The actual component from lucide-react
    title: 'Development',
    description: 'We understand the Concept of CRO for Landing Pages...',
    features: ['High Converting Landing Page', 'SEO Friendly Websites', 'Custom Coded Websites'],
  },
]

const ServicesSection = () => {
  return (
    <section className='bg-primary'>
      <div className='container '>
        {/* Section Header */}
        <div className='text-center max-w-4xl mx-auto mb-12'>
          <h2 className='text-secondary'>
            Our ROI driven Services for both Ecommerce as well as Lead Generation Businesses
          </h2>
          <p className='mt-4 text-white'>
            Honest, 100% transparency and Data Driven Approach is how we operate.
          </p>
        </div>

        {/* Services Grid */}
        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8'>
          {services.map((service) => (
            <Card
              key={service.title}
              className='flex flex-col h-full hover:shadow-lg transition-shadow duration-300'
            >
              <CardHeader className='items-center text-center'>
                {/* 3. Use typeof to safely check the type of the icon */}
                {typeof service.icon === 'string' ? (
                  <Image
                    src={service.icon}
                    alt={`${service.title} icon`}
                    width={64}
                    height={64}
                    className='h-16 w-16'
                  />
                ) : (
                  <service.icon className='h-16 w-16 text-primary' />
                )}
                <CardTitle className='mt-4 text-2xl font-bold text-left text-primary'>
                  {service.title}
                </CardTitle>
              </CardHeader>
              <CardContent className='flex-grow'>
                <CardDescription className='text-base text-gray-600'>
                  {service.description}
                </CardDescription>
                <div className='mt-6'>
                  <h4 className='font-semibold '>Start with...</h4>
                  <ul className='mt-3 space-y-2 text-gray-600'>
                    {service.features.map((feature) => (
                      <li key={feature} className='flex items-start'>
                        <CheckCircle2 className='h-5 w-5 text-primary mr-2 flex-shrink-0 mt-0.5' />
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </CardContent>
              <CardFooter className='justify-center'>
                <Button
                  text='Learn More'
                  icon={
                    <ArrowRight className='h-4 w-4 ml-1 group-hover:translate-x-1 transition-transform'/>
                  }
                ></Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}

export default ServicesSection
