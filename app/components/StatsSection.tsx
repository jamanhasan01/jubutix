// components/StatsSection.jsx

import { TrendingUp, Youtube, Globe, Trophy } from 'lucide-react'

// Data for the stats. This makes it easy to update numbers and text.
const statsData = [
  {
    icon: TrendingUp,
    text: 'Generated over $3.8+ billion in sales & 500K+ Leads for our clients',
  },
  {
    icon: Youtube,
    text: '350K+ Subscribers on Youtube',
  },
  {
    icon: Globe,
    text: '100+ Clients Across Globe',
  },
  {
    icon: Trophy,
    text: 'Won 2+ Awards and counting',
  },
]

const StatsSection = () => {
  return (
    <section className='bg-cyan-50/50 '>
      <div className='container '>
        {/* Section Title */}
        <div className='text-center mb-12'>
          <h1>
            UT digital{' '}
            <span className='relative inline-block'>
              {/* The word "Media" */}
              <span className='relative z-10'>Media</span>
              {/* The red scribble underline effect */}
              <span className='absolute left-0 bottom-0 w-full h-3 bg-red-400/80 -skew-x-12 z-0 transform translate-y-1'></span>
            </span>{' '}
            in Numbers
          </h1>
        </div>

        {/* Stats Grid */}
        <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-y-10'>
          {statsData.map((stat, index) => (
            <div
              key={index}
              className='flex flex-col items-center text-center px-4 
                         lg:[&:not(:last-child)]:border-r lg:border-gray-300/70'
            >
              <stat.icon className='h-14 w-14 text-blue-600 mb-4' strokeWidth={1.5} />
              <p className='text-gray-700 max-w-[200px]'>{stat.text}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default StatsSection
