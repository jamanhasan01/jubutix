// components/FacebookAdsServices.tsx

import Link from 'next/link'
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'

import { CheckCircle2 } from 'lucide-react'
import Button from '@/app/components/Button';

// --- Data for the service cards ---
const servicesData = [
  {
    title: 'Lead Generation Services',
    highlight: 'B2C',
    description: 'Get in touch with our Lead Generation services. Our main priority is to get maximum quality leads at less cost.',
    features: [
      'Lead Generation for Local Business',
      'Lead Generation using Landing Page',
      'Lead Generation using Instant Forms',
      'Complete Lead Generation Strategy',
    ],
  },
  {
    title: 'Lead Generation',
    highlight: 'B2C',
    description: "Let our experts take charge of your PPC campaign. Don't Settle for LESS, Achieve BIG With Our Performance Marketing Strategies",
    features: [
      'Lead Generation for Local Business',
      'Lead Generation using Landing Page',
      'Lead Generation using Instant Forms',
      'Complete Lead Generation Strategy',
    ],
  },
  {
    title: 'Ecommerce',
    highlight: 'Marketing',
    description: 'From Generating leads from the businesses to Generating sales at better ROAS for your business. We exactly know how meta ecosystem works now.',
    features: [
      'Ads Creation & Brainstorming',
      'Complete Conversion API Setup',
      'UGC Ads Creation',
      'Scaling of Ad Accounts',
    ],
  },
  {
    title: 'Brand',
    highlight: 'Awareness',
    description: 'We understand the Concept of CRO for Landing Pages. We know How to make a website SEO Friendly. Get our Web Development Services.',
    features: [
      'Creatives to run Brand awareness Campaigns',
      'Strategies for Brand Awareness',
      'Video Content and KPIs for Brand Awareness Campaigns',
    ],
  },
];

const FacebookAdsServices = () => {
  return (
    <section className="bg-primary">
      <div className="container ">
        {/* --- Section Title --- */}
        <div className="text-center mb-12">
          <h2 className='text-secondary'>
            Facebook Ads{' '}
            <span className="relative inline-block">
            Service
      
            </span>
          </h2>
        </div>

        {/* --- Services Grid --- */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {servicesData.map((service, index) => (
            <Card key={index} className="relative flex flex-col h-full overflow-hidden hover:shadow-lg transition-shadow duration-300">
              {/* The blue left border effect */}
              <div className="absolute left-0 top-0 h-full w-1.5 bg-primary"></div>
              
              <CardHeader>
                <CardTitle className="text-2xl font-bold text-gray-900">
                  {service.title}{' '}
                  <span className="text-primary">{service.highlight}</span>
                </CardTitle>
              </CardHeader>

              <CardContent className="flex-grow">
                <CardDescription>{service.description}</CardDescription>
                <div className="mt-6">
                  <h4 className="font-semibold text-gray-800">Start with...</h4>
                  <ul className="mt-3 space-y-3 text-gray-600">
                    {service.features.map((feature, idx) => (
                      <li key={idx} className="flex items-start">
                        <CheckCircle2 className="h-5 w-5 text-green-600 mr-2 flex-shrink-0 mt-0.5" />
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </CardContent>

              <CardFooter>
                <Link href="#">
                 <Button text='Learn More ' classname=''>
                  
                </Button>
                </Link>
              </CardFooter>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}

export default FacebookAdsServices