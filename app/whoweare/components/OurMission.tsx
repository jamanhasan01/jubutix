import { BarChart, Handshake, Target } from 'lucide-react'

const stats = [
  {
    icon: Target,
    value: '98%',
    label: 'Client ROI Focus',
  },
  {
    icon: Handshake,
    value: '100+',
    label: 'Successful Partnerships',
  },
  {
    icon: BarChart,
    value: '$10M+',
    label: 'Managed Ad Spend',
  },
]

const OurMission = () => {
  return (
    <section className=''>
      <div className='container pt-36'>
        <div className='grid grid-cols-1 lg:grid-cols-2 gap-12 items-center'>
          {/* Left Column: Text Content */}
          <div className='space-y-6'>
            <p className='font-semibold text-secondary'>Our Philosophy</p>
            <h1 className=''>
              More Than an Agency, We are Your Growth Engine.
            </h1>
            <p className='text-lg text-gray-600'>
              We founded our agency on a simple belief: digital marketing should drive tangible
              results, not just clicks and impressions. We reject the one-size-fits-all approach,
              instead becoming a true extension of your team.
            </p>
            <p className='text-lg text-gray-600'>
              Our decisions are guided by data, our strategies are built on transparency, and our
              success is measured by yours.
            </p>
          </div>

          {/* Right Column: Stats */}
          <div className='grid grid-cols-1 gap-8 sm:grid-cols-3 lg:grid-cols-1'>
            {stats.map((stat) => (
              <div
                key={stat.label}
                className='bg-slate-100/70 p-6 rounded-lg flex items-center gap-6'
              >
                <stat.icon className='h-12 w-12 text-secondary flex-shrink-0' />
                <div>
                  <p className='text-4xl font-bold text-primary'>{stat.value}</p>
                  <p className='text-base text-gray-600'>{stat.label}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

export default OurMission
