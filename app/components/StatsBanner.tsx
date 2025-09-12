import React from 'react'

interface StateItems {
  value: string
  label: string
}

interface stateSectionProp {
  data: StateItems[],
  bg?:string
}

export function StatsBanner({ data ,bg}: stateSectionProp) {
  return (
    <section className={`w-full bg-slate-50 ${bg} mb-20` }>
      <div className='container'>
        {/* Grid layout for the stats */}
        <div className='grid grid-cols-2 gap-8 text-center md:grid-cols-4'>
          {data?.map((stat, index) => (
            <div key={index} className='flex flex-col items-center justify-center'>
              <p className='text-4xl font-bold text-primary lg:text-5xl'>{stat.value}</p>
              <p className='mt-2 text-sm text-gray-600 md:text-base'>{stat.label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
