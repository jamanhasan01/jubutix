// components/ProcessSection.jsx

import Image from 'next/image'
import { CheckCircle2 } from 'lucide-react'

// The steps for our process. Easy to edit here.
const processSteps = [
  'Step 1 - Defining Objective',
  'Step 2 - Understanding Target Group',
  'Step 3 - Competitor Analysis',
  'Step 4 - Defining KPIs for Tracking',
  'Step 5 - Executing the Plan',
  'Step 6 - Analyzing / Adjusting & Reporting',
]

const ProcessSection = () => {
  return (
    <section className='bg-[#f0f7ed]'>
      <div className='container'>
        <div className='grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center'>
          {/* --- Left Column: The Process List --- */}
          <div>
            <h2 className=' mb-8'>Our <span className='text-red-600'>Process:</span></h2>
            <ul className='space-y-4'>
              {processSteps.map((step, index) => (
                <li key={index} className='flex items-center'>
                  <CheckCircle2 className='h-6 w-6 text-blue-600 mr-3 flex-shrink-0' />
                  <span className='text-base font-semibold text-gray-700'>{step}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* --- Right Column: The Process Graphic --- */}
          <div className='flex items-center justify-center'>
            <Image
              src='/brand.png' // The image you prepared in Step 1
              alt='A diagram illustrating our 6-step digital marketing process'
              width={600}
              height={450}
              className='w-full h-auto max-w-2xl'
            />
          </div>
        </div>
      </div>
    </section>
  )
}

export default ProcessSection
