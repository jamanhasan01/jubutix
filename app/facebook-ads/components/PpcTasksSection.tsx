// components/PpcTasksSection.tsx
import React from 'react'
import { LayoutList, Brush, Settings, TrendingUp } from 'lucide-react' // Shadcn/UI compatible icons
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card' // Shadcn/UI Card

// Define the type for a single task category
interface FacebookAdTaskCategory {
  title: React.ReactNode
  icon: React.ElementType // Use React.ElementType for Lucide icons
  tasks: string[]
}

// Data for the Facebook Ads Tasks & Optimization section
const facebookAdsTasks: FacebookAdTaskCategory[] = [
  {
    title: (<>Audience & Strategy</>),
    icon: LayoutList,
    tasks: [
      'In-depth customer demographic and psychographic analysis',
      'Development of custom and lookalike audiences',
      'Strategic ad funnel planning and implementation',
      'Competitor analysis for audience insights',
    ],
  },
  {
    title: 'Creative & Copywriting',
    icon: Brush,
    tasks: [
      'Design of high-converting image and video ad creatives',
      'Crafting compelling, benefit-driven ad copy',
      'Extensive A/B testing of ad variations',
      'Implementation of dynamic creative optimization',
    ],
  },
  {
    title: 'Setup & Tracking Precision',
    icon: Settings,
    tasks: [
      'Accurate Facebook Pixel implementation and event setup',
      'Comprehensive conversion tracking configuration',
      'Strategic campaign and ad set structuring',
      'Optimal bidding strategy selection and adjustment',
    ],
  },
  {
    title: 'Optimization & Reporting Excellence',
    icon: TrendingUp,
    tasks: [
      'Daily campaign monitoring and performance adjustments',
      'Cost Per Acquisition (CPA) reduction strategies',
      'Scalable campaign expansion for increased sales volume',
      'Transparent, custom reporting dashboards',
      'Regular strategic review meetings and communication',
    ],
  },
]

export function PpcTasksSection() {
  return (
    <section className='bg-white py-16 md:py-24'>
      <div className='container mx-auto px-4'>
        <h2 className='text-4xl md:text-5xl font-extrabold text-center mb-12 tracking-tight'>
          Comprehensive Facebook Ads <span className='text-primary'>Tasks & Optimization</span>
        </h2>

        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-4 gap-8'>
          {facebookAdsTasks.map((category, index) => (
            <Card
              key={index}
              className='group relative overflow-hidden bg-gradient-to-br from-white to-gray-50 p-6 rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 ease-in-out border-t-4 border-l-4 border-primary/20 hover:border-primary-foreground/50'
            >
              <CardHeader className='p-0 pb-4 flex items-center'>
                <div className='flex-shrink-0 p-3 bg-primary-foreground/10 text-primary-foreground rounded-full group-hover:scale-105 transition-transform duration-300'>
                  <category.icon className='h-6 w-6 text-primary' />
                </div>
                {/* --- FIX IS ON THIS LINE --- */}
                <CardTitle className=' text-xl font-bold w-full text-primary'>
                  {category.title}
                </CardTitle>
              </CardHeader>
              <CardContent className='p-0 text-gray-700 '>
                <ul className='list-disc pl-5 space-y-2 text-sm'>
                  {category.tasks.map((task, taskIndex) => (
                    <li key={taskIndex} className='text-gray-600'>
                      {task}
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
