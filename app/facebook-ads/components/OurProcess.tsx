// components/OurProcess.tsx
import Title from '@/app/components/Title'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
// --- Icons have been updated ---
import { FaSearch, FaLightbulb, FaCogs, FaChartBar } from 'react-icons/fa'

interface FeatureProps {
  icon: React.ElementType
  title: React.ReactNode
  description: string
}

// --- The features array has been replaced with the new content ---
const features: FeatureProps[] = [
  {
    icon: FaSearch,
    title: <>1. Discovery & Strategy</>,
    description:
      'We initiate by conducting an in-depth analysis of your e-commerce store, identifying unique selling propositions, target demographics, and overarching business objectives.',
  },
  {
    icon: FaLightbulb,
    title: <>2. Creative & Funnel Design</>,
    description:
      'Our team develops high-impact ad creatives and compelling copy, meticulously designing the customer journey through a tailored ad funnel for optimal conversion.',
  },
  {
    icon: FaCogs,
    title: <>3. Setup & Launch</>,
    description:
      'We meticulously configure all technical aspects, including Facebook Pixel implementation and precise sales tracking, ensuring flawless campaign execution prior to launch.',
  },
  {
    icon: FaChartBar,
    title: <>4. Optimize & Report</>,
    description:
      'Post-launch, we provide continuous monitoring, A/B testing, and granular adjustments to maximize performance, accompanied by transparent, regular performance reports.',
  },
]

export function OurProcess() {
  return (
    <div className='container'>
      {/* --- Title and Subtitle updated to match the new section --- */}
      <Title
        title='Our Facebook Ads Management Process'
        subTitle='A proven, data-driven approach to scaling your brand and maximizing ROI through strategic advertising.'
      />

      {/* --- Grid layout updated to handle 4 items --- */}
      <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6'>
        {features.map((feature, index) => (
          <Card key={index} className='flex flex-col p-6 border-none shadow-md rounded-lg'>
            <CardHeader className='p-0'>
              <feature.icon className='text-4xl text-primary dark:text-blue-400 mb-3' />
              <CardTitle className='text-xl font-bold w-full text-primary'>
                {feature.title}
              </CardTitle>
            </CardHeader>
            <CardContent className='p-0 mt-4'>
              {' '}
              {/* Added margin-top for spacing */}
              <CardDescription className='text-gray-600 text-base dark:text-gray-400'>
                {feature.description}
              </CardDescription>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}
