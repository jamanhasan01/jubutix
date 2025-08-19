import React from 'react'
// Import icons from two different libraries
import {
  Search,
  LayoutTemplate,
  Crosshair,
  RadioReceiver,
  PenSquare,
  GaugeCircle,
  Ratio,
  Monitor,
} from 'lucide-react'
import { SiGoogle } from 'react-icons/si'
import Title from '@/app/components/Title'

// All the data for the service cards is managed here
const servicesData = [
  {
    icon: <Search size={32} />,
    title: 'Keyword Research & Analysis',
    description:
      'Discover the most relevant and high-performing keywords to optimize your campaigns and drive targeted traffic to your website.',
  },
  {
    icon: <LayoutTemplate size={32} />,
    title: 'Landing page optimization',
    description:
      'Maximize your Google Ads conversions with tailored landing pages. Get high-converting landing pages that drive results and boost ROI.',
  },
  {
    icon: <SiGoogle size={32} />,
    title: 'GTM & GA4 Set Up',
    description:
      'This is technical – very important for organizing your all ads campaign codes. It’s also prerequisit for conversion tracking setup.',
  },
  {
    icon: <Crosshair size={32} />,
    title: 'Conversion Tracking Setup',
    description:
      'Accurately measure campaign success. We configure advanced conversion tracking to gauge performance and ROI effectively.',
  },
  {
    icon: <RadioReceiver size={32} />,
    title: 'Button & Form Submission tracking',
    description:
      'Pinpoint engagement. Our setup ensures meticulous tracking of button clicks and form submissions, refining campaign targeting.',
  },
  {
    icon: <PenSquare size={32} />,
    title: 'Compelling Ad Copy',
    description:
      'Draw attention and drive results with compelling ad copy. We craft persuasive copies that boost CTR, and maximize conversions.',
  },
  {
    icon: <GaugeCircle size={32} />,
    title: 'Ad Score Optimization',
    description:
      'We fine-tune ad elements and relevance for a higher Quality Score, reducing costs and enhancing ad placement.',
  },
  {
    icon: <Ratio size={32} />,
    title: 'Conversion Rate Optimization (CRO)',
    description:
      'Our strategies refine user experiences, heightening conversion rates, and driving optimal campaign results.',
  },
  {
    icon: <Monitor size={32} />,
    title: 'Daily Monitoring',
    description:
      'We watch your campaigns daily, making real-time adjustments for peak performance and swift issue resolution.',
  },
]

export function CampaignServicesSection() {
  return (
    <section className='w-full bg-white py-16 md:py-24'>
      <div className='container mx-auto max-w-7xl px-4'>
        <Title title='PC Campaign Management Services Include' subTitle='' />

        {/* Services Grid */}
        <div className='mt-16 grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3'>
          {servicesData.map((service, index) => (
            <div
              key={index}
              className='rounded-lg border border-gray-200 p-6 shadow-sm transition-all duration-300 hover:border-primary hover:shadow-lg'
            >
              <div className='text-primary'>{service.icon}</div>
              <h3 className='mt-5 text-xl font-bold text-gray-900 text-primary'>{service.title}</h3>
              <p className='mt-2 text-base text-gray-600'>{service.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
