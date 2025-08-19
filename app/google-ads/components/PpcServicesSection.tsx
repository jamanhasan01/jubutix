import React from 'react'
import { Hand, ThumbsUp, Send, CheckCircle2 } from 'lucide-react'
import Title from '@/app/components/Title'

// Data for the feature cards - easy to update!
const serviceFeatures = [
  {
    icon: <ThumbsUp size={28} />,
    title: 'Low Barrier to Entry',
    description: "Even if you're behind, you can get your PPC campaign up and running in no time.",
  },
  {
    icon: <ThumbsUp size={28} />, // Using ThumbsUp again as per image, change if needed
    title: 'Improved Brand Visibility',
    description: 'PPC services guarantee your products and services appear prominently.',
  },
  {
    icon: <Send size={28} />,
    title: 'Increase Conversions & Sales',
    description: 'Transform clicks into customers, driving growth and revenue.',
  },
  {
    icon: <CheckCircle2 size={28} />,
    title: 'Get results instantly',
    description: 'Google ads bring instant website traffic, unlike organic listings.',
  },
]

export function PpcServicesSection() {
  return (
    <section className='w-full '>
      <div className='container'>
        <Title
          title=' Our PPC Management Services Helps Your Business'
          subTitle={`jubutix is a paid advertising company that can help you amplify your message across different channels and measure it against your business goals. We don't rely on assumptions or pure speculation – we use data to drive our decisions.
          `}
        />

        {/* Features Grid Section */}
        <div className='mt-16 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4'>
          {serviceFeatures.map((feature, index) => (
            <div
              key={index}
              className='flex flex-col items-center rounded-lg bg-slate-50 p-8 text-center transition-transform duration-300 hover:-translate-y-2 hover:shadow-xl'
            >
              <div className='flex h-14 w-14 items-center justify-center rounded-full bg-primary text-white'>
                {feature.icon}
              </div>
              <h3 className='mt-5 text-xl font-bold text-gray-800'>{feature.title}</h3>
              <p className='mt-2 text-base text-gray-600'>{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
