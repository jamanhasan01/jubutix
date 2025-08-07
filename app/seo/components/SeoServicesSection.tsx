'use client'

import { Search, LayoutDashboard, TrendingUp, Lightbulb, Cog, Link2 } from 'lucide-react'
import ServiceCard from './ServiceCard'
import Title from '../../components/Title'
// 1. All card content is now stored in this single array of objects.
// This makes it much easier to add, remove, or edit services in the future.
const servicesData = [
  {
    title: 'Keyword Research',
    description:
      "Analyze search intent, clicks metric, search volume, keyword difficulty, etc to find out 'low-hanging fruit' to highly profitable keywords.",
    icon: Search,
  },
  {
    title: 'Website SEO Audit',
    description:
      "Our SEO experts perform manual audits because tools generated audits can't generate critical findings to improve SEO rankings and traffic.",
    icon: LayoutDashboard,
  },
  {
    title: 'On-page SEO',
    description:
      "On-page SEO makes the foundation of higher Google ranks. We apply the same techniques that we've used to rank hundreds of websites.",
    icon: Lightbulb,
  },
  {
    title: 'Technical SEO',
    description:
      "Improve your website's infrastructure and technical elements to help search engines crawl and index your content more effectively.",
    icon: Cog,
  },
  {
    title: 'Link Building',
    description:
      'Acquire high-quality backlinks from authoritative websites to boost your domain authority and improve search engine rankings.',
    icon: Link2,
  },
  {
    title: 'SEO Strategy',
    description:
      'Develop a comprehensive SEO strategy tailored to your business goals to achieve sustainable growth in organic search.',
    icon: TrendingUp,
  },
]

const SeoServicesSection = () => {
  return (
    <section className='bg-background text-foreground'>
      <div className='container'>
        <Title
          title={`Your Competitors Fear Our SEO.
            Find Out Why.`}
          subTitle={`We'll help you steal their rankings, traffic, and market share.
Get a confidential consultation with our tactical SEO experts!`}
        />

        {/* This div is now specifically for the grid of cards */}
        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'>
          {/* 2. We map over the array to dynamically render each ServiceCard. */}
          {servicesData.map((service) => (
            <ServiceCard
              key={service.title} // The key prop is crucial for React's performance
              title={service.title}
              description={service.description}
              // We create the icon element here from the component reference in our array
              icon={<service.icon className='h-8 w-8' />}
            />
          ))}
        </div>
      </div>
    </section>
  )
}

export default SeoServicesSection
