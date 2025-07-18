// components/PartnerCards.jsx

import Image from 'next/image'
import Link from 'next/link'
import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { CheckSquare } from 'lucide-react'

// Data for the partner cards. Easy to edit and scale.
const partnerData = [
  {
    preTitle: 'LEADING GOOGLE PARTNER',
    title: 'Google Official Partners',
    badgeImage: '/badges/google-partner-premier.png', // Replace with your image path
    advantageText:
      'Our Google-certified, award-winning specialists will strategically plan and execute your campaigns for maximum ROI.',
    link: '/contact-us',
  },
  {
    preTitle: 'LEADING META BUSINESS PARTNER',
    title: 'Meta Official Partner',
    badgeImage: '/badges/meta-partner.png', // Replace with your image path
    advantageText:
      'Get your account in the hands of the people who spend big and are recognised by Meta as official Business Partner.',
    link: '/contact-us',
  },
]

const PartnerCards = () => {
  return (
    <section className='bg-slate-50/70 '>
      <div className='container '>
        <div className='grid grid-cols-1 md:grid-cols-2 gap-8'>
          {partnerData.map((partner) => (
            <Card
              key={partner.title}
              className='bg-white p-8 rounded-2xl shadow-sm hover:shadow-xl transition-shadow duration-300'
            >
              <div className='flex flex-col h-full'>
                {/* Top section with titles and badge */}
                <div className='flex justify-between items-start gap-4'>
                  <div>
                    <p className='text-sm font-bold text-blue-600 tracking-wider'>
                      {partner.preTitle}
                    </p>
                    <h3 className='text-2xl lg:text-3xl font-bold text-gray-900 mt-1'>
                      {partner.title}
                    </h3>
                  </div>
                  <Image
                    src={partner.badgeImage}
                    alt={`${partner.title} Badge`}
                    width={100}
                    height={100}
                    className='w-20 h-auto sm:w-24 flex-shrink-0'
                  />
                </div>

                {/* Advantages section */}
                <div className='mt-8 flex-grow'>
                  <p className='font-semibold text-gray-800'>WHAT ARE YOUR ADVANTAGES?</p>
                  <div className='flex items-start mt-3'>
                    <CheckSquare className='h-6 w-6 text-green-600 mr-3 mt-1 flex-shrink-0' />
                    <p className='text-gray-600'>{partner.advantageText}</p>
                  </div>
                </div>

                {/* Talk to Us Button */}
                <div className='mt-8 text-center'>
                  <Button
                    asChild
                    variant='link'
                    className='text-red-500 text-lg font-bold hover:text-red-600'
                  >
                    <Link href={partner.link}>Talk to Us</Link>
                  </Button>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}

export default PartnerCards
