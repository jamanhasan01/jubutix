import { TrendingUp, Youtube, Globe, Trophy } from 'lucide-react'

const statsData = [
  {
    icon: TrendingUp,
    text: 'Generated over $3.8+ billion in sales & 500K+ Leads for our clients',
    color: 'text-green-500',
  },
  {
    icon: Youtube,
    text: '350K+ Subscribers on Youtube',
    color: 'text-red-600',
  },
  {
    icon: Globe,
    text: '100+ Clients Across Globe',
    color: 'text-blue-500',
  },
  {
    icon: Trophy,
    text: 'Won 2+ Awards and counting',
    color: 'text-yellow-500',
  },
]

const StatsSection = () => {
  return (
    <section className='bg-primary '>
      <div className='container '>
        <div className='text-center mb-12'>
          <h1>
            UT digital <span className='relative z-10'>Media </span>
            in Numbers
          </h1>
        </div>

        <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-y-10'>
          {statsData.map((stat, index) => (
            <div
              key={index}
              className='flex flex-col items-center text-center px-4 
                         lg:[&:not(:last-child)]:border-r lg:border-gray-300/70'
            >
              <stat.icon className={`h-14 w-14 ${stat.color} mb-4`} strokeWidth={1.5} />
              <p className='text-white'>{stat.text}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default StatsSection
