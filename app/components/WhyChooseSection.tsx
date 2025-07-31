import { CheckCircle, XCircle } from 'lucide-react'
import Title from './Title'

// Data for the two cards
const whatWeDo = [
  'Custom Strategy per Business',
  'Transparent Reporting',
  'Conversion-First Campaigns',
  'Local + Global Experience (USA/BD)',
]

const whatAgenciesDo = [
  'Cookie-cutter Templates',
  'Confusing Dashboards',
  'Traffic Without Results',
  'Generic Outsourcing',
]

export default function WhyChooseSection() {
  return (
    <section>
      <div className='container'>
        <Title
          title='🧠Why Choose Jubutix?'
          subTitle=' We obsess over what matters most: your ROI.'
        ></Title>
        <div className='grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto'>
          {/* Card 1: What We Do */}
          <div className='bg-white dark:bg-zinc-900 p-6 rounded-xl shadow-lg border border-transparent dark:border-zinc-800'>
            <h3 className='text-xl font-semibold mb-4 flex items-center text-green-600 dark:text-green-500'>
              ✅ What We Do
            </h3>
            <ul className='space-y-3 text-gray-700 dark:text-gray-300'>
              {whatWeDo.map((item) => (
                <li key={item} className='flex items-start'>
                  <CheckCircle className='h-5 w-5 text-green-500 me-3 mt-0.5 flex-shrink-0' />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Card 2: What Most Agencies Do */}
          <div className='bg-white dark:bg-zinc-900 p-6 rounded-xl shadow-lg border border-transparent dark:border-zinc-800'>
            <h3 className='text-xl font-semibold mb-4 flex items-center text-red-600 dark:text-red-500'>
              ❌ What Most Agencies Do
            </h3>
            <ul className='space-y-3 text-gray-700 dark:text-gray-300'>
              {whatAgenciesDo.map((item) => (
                <li key={item} className='flex items-start'>
                  <XCircle className='h-5 w-5 text-red-500 me-3 mt-0.5 flex-shrink-0' />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  )
}
