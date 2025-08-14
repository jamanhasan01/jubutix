import { TrendingUp, Filter, TrendingDown } from 'lucide-react'

const originalFeatures = [
  {
    name: 'Search Engine Optimisation',
    description:
      'We handle everything SEO-related. From technical audits and AI SEO analysis to keyword research and content optimization.',
    icon: TrendingUp,
  },
  {
    name: 'Drive More Traffic & Leads',
    description:
      'Get more rankings, traffic and sales. The right strategy will make a big difference in ranking your business higher on the search engines!',
    icon: Filter,
  },
  {
    name: 'Reduce Acquisition Costs',
    description:
      'Minimise unnecessary costs on lead acquisition, allowing you to invest your hard-earned money to other parts of your business.',
    icon: TrendingDown,
  },
]

export default function SecretSauceSection() {
  return (
    <section className='bg-background py-16 sm:py-24'>
      <div className='mx-auto max-w-7xl px-6 lg:px-8'>
        <div className='mx-auto grid max-w-2xl grid-cols-1 gap-x-8 gap-y-16 sm:gap-y-20 lg:mx-0 lg:max-w-none lg:grid-cols-2'>
          {/* Left Column: Original Text Content */}
          <div className='lg:pr-8 lg:pt-4'>
            <div className='lg:max-w-lg'>
              <h2 className='text-3xl font-bold tracking-tight text-primary sm:text-4xl'>
                The Secret Sauce That Makes <br />
                Our SEO Company Superior
              </h2>
              <p className='mt-6 text-lg leading-7 text-muted-foreground'>
                Most SEO agencies will offer you rubbish things: backlinks, directory submission,
                forum submission, social bookmarking, blog commenting,...the list is endless. But
                they don&apos;t tell you what they will deliver in terms of results.
              </p>
              <p className='mt-4 text-lg leading-7 text-muted-foreground'>
                Unfortunately, these are waste of time and money. We will ask you to forget
                everything you think you know about SEO and how other companies work. Our secret
                sauce is that we make your website super useful for your visitors, customers, and
                clients. We make sure that they get exactly what they are looking for. That makes us
                skyrocket your profit.
              </p>
              <p className='mt-4 text-lg leading-7 text-muted-foreground'>
                However, to protect our ability to outperform all other SEO companies, we never
                disclose our methodology during the build-out phase.
              </p>
            </div>
          </div>

          {/* Right Column: Original Features (Static) */}
          <div className='flex flex-col gap-10 sm:gap-12'>
            {originalFeatures.map((feature) => (
              <div key={feature.name} className='relative pl-16'>
                <dt className='text-2xl font-semibold leading-7 text-foreground'>
                  <div className='absolute left-0 top-0 flex h-10 w-10 items-center justify-center rounded-lg bg-gray-100 dark:bg-gray-800'>
                    <feature.icon className='h-6 w-6 text-primary' aria-hidden='true' />
                  </div>
                  {feature.name}
                </dt>
                <dd className='mt-2 text-base leading-7 text-muted-foreground'>
                  {feature.description}
                </dd>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
