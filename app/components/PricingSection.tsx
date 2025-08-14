import { Check } from 'lucide-react'
import Button from './Button'

const pricingPlans = [
  {
    name: 'Paid Media Management',
    startingFrom: 'Starting from',
    prices: {
      setup: '$2,500',
      monthly: '$3,000',
    },
    features: [
      'Dedicated Paid Media Manager',
      'Ongoing paid media strategy',
      'Account optimization',
      'Bi-weekly meeting',
      'Writing and testing ad copy',
      'Land page optimizations (every two months)',
      'New display ads (every month)',
      'Monthly reporting deep-dive',
      'Shared Slack channel',
    ],
    footnotes: [
      '*Or 12% of ad spend, whichever is higher.',
      '**Additional ad channels: $1,000 setup and $1,500/mo.',
      '***Pricing is based on a 20% discounted annual plan.',
    ],
    popular: false,
  },
  {
    name: 'SEO Management',
    startingFrom: 'Starting from',
    prices: {
      audit: '$3,000',
      monthly: '$6,000',
    },
    features: [
      'Dedicated SEO Manager',
      'Ongoing SEO strategy',
      'Bi-weekly meetings',
      'Monthly reporting deep-dive',
      'SEO research',
      'Content optimization',
      'Content creation',
      'Link-building',
      'Technical SEO implementation',
      'GEO / AI SEO',
    ],
    footnotes: [
      '*Additional service credits available as needed.',
      '**Pricing is based on a 20% discounted annual plan.',
    ],
    popular: true,
  },
]

export default function PricingSection() {
  return (
    <section className='bg-neutral-50 '>
      <div className='container'>
        <div className='grid grid-cols-1 gap-8 md:grid-cols-2'>
          {pricingPlans.map((plan) => (
            <div
              key={plan.name}
              className={`relative flex h-full flex-col rounded-xl border-2 bg-white p-8 shadow-lg transition-all hover:shadow-xl ${
                plan.popular ? 'border-primary' : 'border-neutral-200'
              }`}
            >
              {plan.popular && (
                <div className='absolute -top-3 left-1/2 -translate-x-1/2 transform rounded-full bg-primary px-4 py-1 text-xs font-semibold text-white'>
                  Most Popular
                </div>
              )}

              <h3 className='text-center text-2xl font-bold text-primary'>{plan.name}</h3>

              <div className='mt-6 text-center'>
                <p className='text-sm uppercase tracking-wider text-neutral-500'>
                  {plan.startingFrom}
                </p>
                <div className='mt-6 grid grid-cols-2 gap-4'>
                  {plan.prices.setup && (
                    <div className='rounded-lg bg-violet-50 p-4'>
                      <p className='text-sm font-medium text-neutral-700'>Setup</p>
                      <p className='text-3xl font-bold text-primary'>{plan.prices.setup}</p>
                    </div>
                  )}
                  {plan.prices.audit && (
                    <div className='rounded-lg bg-violet-50 p-4'>
                      <p className='text-sm font-medium text-neutral-700'>Audit</p>
                      <p className='text-3xl font-bold text-primary'>{plan.prices.audit}</p>
                    </div>
                  )}
                  <div className='rounded-lg bg-violet-100 p-4'>
                    <p className='text-sm font-medium text-neutral-700'>Monthly</p>
                    <p className='text-3xl font-bold text-primary'>{plan.prices.monthly}</p>
                  </div>
                </div>
              </div>

              <div className='my-8 border-t border-neutral-200'></div>

              <ul className='space-y-3'>
                {plan.features.map((feature) => (
                  <li key={feature} className='flex items-start'>
                    <Check className='mr-3 mt-0.5 h-5 w-5 flex-shrink-0 text-primary' />
                    <span className='text-neutral-700'>{feature}</span>
                  </li>
                ))}
              </ul>

              <div className='mt-auto pt-8'>
                <div className='mb-6 space-y-2 text-xs text-neutral-500'>
                  {plan.footnotes.map((note) => (
                    <p key={note}>{note}</p>
                  ))}
                </div>

                <Button text='Book Strategy Call' classname='w-full' />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
