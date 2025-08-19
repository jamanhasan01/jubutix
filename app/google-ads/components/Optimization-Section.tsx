import Button from '@/app/components/Button'
import Title from '@/app/components/Title'

import React from 'react'

// Helper component for the checkmark icon
const CheckIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg
    {...props}
    fill='none'
    stroke='currentColor'
    viewBox='0 0 24 24'
    xmlns='http://www.w3.org/2000/svg'
  >
    <path strokeLinecap='round' strokeLinejoin='round' strokeWidth='2' d='M5 13l4 4L19 7'></path>
  </svg>
)

// Array of tasks for easier management
const optimizationTasks = [
  'Existing account audit',
  'Conversion tracking setup (in right way)',
  'Audience Creation Opportunities',
  'Remarketing list Creation',
  'Top notch Campaign Structure',
  'Selection of Right Bidding strategy',
  'Ad copywriting and testing',
  'SQRs mining and keyword sculpting',
  'Bid adjustments according to Requirement',
  'New keyword expansions using Different methods',
  'Custom reporting dashboard',
  'Landing page design and build along with CRO',
  'Google display network Strategies',
  'Conversion rate optimization at each level in the funnel.',
  'Google Merchant Center Optimization (if Reqd)',
  'Negative keyword Like Pro',
  'UTM Tracking and CRM Level tracking setup',
  'Sales level tracking',
  'Real time communication with team',
  'Regular review Meeting',
  'Frequent Strategic Meetings to setup realistic Goals.',
]

export function OptimizationSection() {
  return (
    <section>
      <div className='container '>
        {/* Left Column: Content */}

        <Title
          title='Complete Google Ads Tasks and Optimization'
          subTitle=' Take your Google Ads Game to a next level with the help of Jubutix. We know how to
            setup, Optimize and Scale Accounts.'
        />

        {/* Right Column: Task List */}
        <div className='rounded-lg border bg-gray-50/50 p-6 shadow-sm '>
          <h3 className='mb-4 text-center text-2xl font-bold text-primary mb-10'>
            Process & Steps We Follow
          </h3>
          <div className='grid grid-cols-1 gap-x-6 gap-y-3 sm:grid-cols-2'>
            {optimizationTasks.map((task, index) => (
              <div key={index} className='flex items-center'>
                <CheckIcon className='h-5 w-5 flex-shrink-0 text-green-500' />
                <span className='ml-3 text-lg text-gray-700'>{task}</span>
              </div>
            ))}
          </div>
          <div className='flex justify-center mt-10'>
            <Button text='GET A FREE QUOTE NOW' />
          </div>
        </div>
      </div>
    </section>
  )
}
