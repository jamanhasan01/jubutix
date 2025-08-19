import Title from '@/app/components/Title'
import Image from 'next/image'
import React from 'react'

export function PpcGoalsSection() {
  return (
    <section className='w-full '>
      <div className='container flex space-x-10'>
    <div className="flex flex-col">
  <Title
    title="We help clients manage their PPC campaigns towards their goals."
    subTitle={`We've built our PPC service based on what gets our clients the best results with years of experience we gathered by managing millions of dollars budget for PPC. Start reaching your target audience today and watch your business soar to new heights.`}
    classname="max-w-2xl text-left"
  />
</div>
        {/* Right Column: Image */}
        <div className='transform rounded-lg bg-white p-2 shadow-lg transition duration-300 hover:scale-105'>
          <Image
            src='/ppc-dashboard.png' // Make sure this path is correct!
            alt='PPC campaign performance dashboard showing metrics like CTR, conversions, and cost per conversion'
            width={600}
            height={350}
            className='rounded-md'
            style={{
              width: '100%',
              height: 'auto',
            }}
          />
        </div>
      </div>
    </section>
  )
}
