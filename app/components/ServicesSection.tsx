// components/ServicesSection.jsx

import Image from 'next/image'
import { Button } from '@/components/ui/button'
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { CheckCircle2, ArrowRight, Code2 } from 'lucide-react'

// --- Services Data ---
// This structure makes it easy to add or modify services in the future.
const services = [
  {
    iconType: 'image',
    icon: '/seo.png', // Replace with your actual icon path
    title: 'SEO',
    description:
      "Outperform your biggest rivals with India's leading SEO Company. Generate incredible leads through the power of SEO. We know what GOOGLE wants to get you in SERPs.",
    features: ['Local SEO', 'International SEO', 'Ecommerce SEO', 'Enterprise SEO'],
  },
  {
    iconType: 'image',
    icon: '/googleads.png', // Replace with your actual icon path
    title: 'Google Ads',
    description:
      "Let our experts take charge of your PPC campaign. Don't Settle For LESS, Achieve BIG With Our Performance Marketing Strategies.",
    features: ['Google Ads', 'PMax Campaigns', 'Shopping Campaigns', 'Planning & Strategies'],
  },
  {
    iconType: 'image',
    icon: '/meta.png', // Replace with your actual icon path
    title: 'Meta Ads',
    description:
      'From Generating leads from the businesses to Generating sales at better ROAS for your business. We exactly know how meta ecosystem works now.',
    features: ['Ads Creation & Brainstorming', 'Facebook Ads', 'Instagram Ads'],
  },
  {
    iconType: 'image',
    icon: '/development.png', // Using a lucide-react icon as an example
    title: 'Development',
    description:
      'We understand the Concept of CRO for Landing Pages. We know How to make a website SEO Friendly. Get our Web Development Services.',
    features: ['High Converting Landing Page', 'SEO Friendly Websites', 'Custom Coded Websites'],
  },
]

const ServicesSection = () => {
  return (
    <section className=''>
      <div className='container'>
        {/* Section Header */}
        <div className='text-center max-w-4xl mx-auto mb-12'>
          <h1>
            Our ROI driven Services for both Ecommerce as well as{' '}
            <span className='text-red-600'>Lead Generation Businesses!</span>
          </h1>
          <p className='mt-4 text-lg text-gray-600'>
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
              <CardHeader className='items-center'>
                {service.iconType === 'image' ? (
                  <Image
                    src={service.icon}
                    alt={`${service.title} icon`}
                    width={64}
                    height={64}
                    className='h-16 w-16'
                  />
                ) : (
                  <service.icon className='h-16 w-16 text-blue-600' />
                )}
                <CardTitle className='mt-4 text-2xl font-bold'>{service.title}</CardTitle>
              </CardHeader>
              <CardContent className='flex-grow'>
                <CardDescription className='text-base text-gray-600'>
                  {service.description}
                </CardDescription>
                <div className='mt-6'>
                  <h4 className='font-semibold text-gray-800'>Start with...</h4>
                  <ul className='mt-3 space-y-2 text-gray-600'>
                    {service.features.map((feature) => (
                      <li key={feature} className='flex items-start'>
                        <CheckCircle2 className='h-5 w-5 text-blue-500 mr-2 flex-shrink-0 mt-0.5' />
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </CardContent>
              <CardFooter className='justify-center'>
                <Button variant='link' className='text-blue-600 font-semibold group'>
                  Learn More
                  <ArrowRight className='h-4 w-4 ml-1 group-hover:translate-x-1 transition-transform' />
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}

export default ServicesSection
