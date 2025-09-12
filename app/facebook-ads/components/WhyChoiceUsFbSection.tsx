// components/WhyChooseUs.tsx
import Title from '@/app/components/Title'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { FaUsers, FaHeart, FaDollarSign, FaVideo, FaSyncAlt, FaChartPie } from 'react-icons/fa'

interface FeatureProps {
  icon: React.ElementType
  title: React.ReactNode // This part is correct from the previous fix
  description: string
}

const features: FeatureProps[] = [
  {
    icon: FaUsers,
    title: (
      <>
        Precision
        Audience
        Targeting
      </>
    ),
    description:
      "Leverage Facebook's robust targeting capabilities to reach your ideal customer segments with unparalleled accuracy.",
  },
  {
    icon: FaHeart,
    title: (
      <>
        Enhanced
        Brand
        Engagement
      </>
    ),
    description:
      'Craft compelling narratives and visuals that resonate with your audience, fostering deeper connections and brand loyalty.',
  },
  {
    icon: FaDollarSign,
    title: (
      <>
        Optimized
        Sales
        Conversions
      </>
    ),
    description:
      'Our campaigns are strategically designed to convert social engagement into direct purchases and measurable revenue.',
  },
  {
    icon: FaVideo,
    title: (
      <>
        Dynamic
        Creative
        Development
      </>
    ),
    description:
      'Develop high-performing ad creatives, including engaging videos and dynamic product ads, to capture attention.',
  },
  {
    icon: FaSyncAlt,
    title: (
      <>
        Continuous
        Performance
        Optimization
      </>
    ),
    description:
      'We rigorously monitor and refine your campaigns daily, ensuring optimal performance and adaptation to market shifts.',
  },
  {
    icon: FaChartPie,
    title: (
      <>
        Efficient
        Budget
        Allocation
      </>
    ),
    description:
      'Strategic management of your ad budget ensures maximum reach and impact, driving the best possible return on your investment.',
  },
]

export function WhyChooseUsFbSection() {
  return (
    <div className='container'>
      <Title
        title=' Why Choose Jubutix for Your Facebook Ads?'
        subTitle='We create, manage, and optimize Facebook Ad campaigns to help you increase brand visibility, drive traffic, and boost sales volume.'
      />

      <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'>
        {features.map((feature, index) => (
          <Card
            key={index}
            // --- CHANGE IS HERE ---
            // Removed 'items-center' and 'text-center' for left alignment
            className='flex flex-col p-6 border-none shadow-md rounded-lg'
          >
            <CardHeader className='p-0'> {/* Removed padding from header for better alignment */}
              <feature.icon className='text-4xl text-primary dark:text-blue-400 mb-3' />
              <CardTitle className='text-xl font-bold w-full text-primary'>
                {feature.title}
              </CardTitle>
            </CardHeader>
            <CardContent className='p-0'> {/* Removed padding from content */}
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