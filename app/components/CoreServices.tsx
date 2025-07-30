'use client'

import Link from 'next/link'
import { BsGraphUpArrow } from 'react-icons/bs'
import { FaFire } from 'react-icons/fa'
import { TfiSearch } from 'react-icons/tfi'
import Title from './Title'
import { BorderBeam } from '@/components/magicui/border-beam'

type Service = {
  id: number
  icon: React.ComponentType<{ className?: string }>
  iconColor: string
  title: string
  description: string
  linkText: string
  href: string
  beamColorFrom: string
  beamColorTo: string
  beamDelay: number
}

const servicesData: Service[] = [
  {
    id: 1,
    icon: BsGraphUpArrow,
    iconColor: 'text-violet-500 bg-violet-100',
    title: 'Google Ads Management',
    description: 'Targeted campaigns that get your business in front of ready-to-buy customers.',
    linkText: 'Explore Google Ads',
    href: '/services/google-ads',
    beamColorFrom: '#9333ea', // Purple
    beamColorTo: '#3b82f6', // Blue
    beamDelay: 0,
  },
  {
    id: 2,
    icon: FaFire,
    iconColor: 'text-orange-500 bg-orange-100',
    title: 'Facebook & Instagram Ads',
    description: 'Reach your ideal audience with engaging creatives and smart funnel strategies.',
    linkText: 'Explore Meta Ads',
    href: '/services/meta-ads',
    beamColorFrom: '#f97316', // Orange
    beamColorTo: '#ec4899', // Pink
    beamDelay: 2,
  },
  {
    id: 3,
    icon: TfiSearch,
    iconColor: 'text-pink-500 bg-pink-100',
    title: 'SEO Services',
    description: 'Climb the rankings and drive long-term traffic with ethical, white-hat SEO.',
    linkText: 'Explore SEO Services',
    href: '/services/seo',
    beamColorFrom: '#ec4899', // Pink
    beamColorTo: '#14b8a6', // Teal
    beamDelay: 4,
  },
]

const CoreServices = () => {
  return (
    <section className='font-sans py-16 sm:py-24 bg-gray-50'>
      <div className='container'>
        <Title
          title={'What We Do'}
          subTitle={"We provide the expertise to elevate your brand's digital presence."}
        />

        <div className='mt-16 grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3'>
          {servicesData.map((service) => (
            <article
              key={service.id}
              // 👇 FIX: Add `overflow-hidden` here to contain the animation
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
                  className={`inline-flex items-center justify-center w-12 h-12 rounded-lg ${service.iconColor}`}
                >
                  <service.icon className='w-6 h-6' />
                </div>
                <h3 className='mt-5 text-xl font-semibold text-gray-900'>{service.title}</h3>
                <p className='mt-2 text-base text-gray-600'>{service.description}</p>
              </div>

              <Link
                href={service.href}
                className='text-gray-700 font-semibold inline-block mt-6 hover:text-teal-600 transition-colors'
              >
                [{service.linkText} →]
              </Link>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}

export default CoreServices
