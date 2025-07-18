// components/ComparisonSection.jsx

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { CheckCircle2, XCircle } from 'lucide-react'
import PartnerCards from './PartnerCards'

// --- Data for the comparison lists ---
const ourFeatures = [
  'Total Inhouse Team',
  'Strategy session & extensive pre-campaign research',
  'We are a Official “Google Partner”, Only professional agencies will maintain this title – we are one of them.',
  'In depth customisation for individual client requirements – we do not operate under a “one size fits all” factory approach.',
  'Our Team is Top, Certified in their respective Tasks and understands the agency approach of work',
  'Unbeatable performance milestones.',
  'No hidden fees. Plus all the data is yours!',
  'Let us focus on what we do best, so you can focus on what you do best.',
]

const otherAgenciesDrawbacks = [
  'Outsourcing of work.',
  'Standard “package” approach with every service.',
  'Churn & burn approach to client acquisition',
  'Basic template audit and implementation',
  'Untrained and Intern Level Team',
  'Lack in the communication with the client.',
  'No performance milestone model when it comes to SEO',
  'Hidden fees and holding data hostage on their own accounts',
  'No Strategic Level Implementation - Relying on old school technical Tactics.',
]

const ComparisonSection = () => {
  return (
    <section className='bg-slate-50'>
      <div className='container'>
        {/* Main grid layout for the two columns and the "VS." text */}
        <div className='grid grid-cols-1 lg:grid-cols-[1fr_auto_1fr] gap-8 lg:gap-12 items-start'>
          {/* --- Column 1: UT Digital Media (The "Us" Card) --- */}
          <Card className='bg-white shadow-lg h-full'>
            <CardHeader>
              <CardTitle className='text-2xl sm:text-3xl font-bold text-center text-gray-800'>
                UT Digital Media
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ul className='space-y-4'>
                {ourFeatures.map((feature, index) => (
                  <li key={index} className='flex items-start'>
                    <CheckCircle2 className='h-6 w-6 text-green-500 mr-3 mt-1 flex-shrink-0' />
                    <span className='text-gray-700'>{feature}</span>
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>

          {/* --- Center Column: "VS." --- */}
          <div className='hidden lg:flex items-center justify-center h-full pt-24'>
            <span className='text-3xl font-bold text-gray-300'>VS.</span>
          </div>

          {/* --- Column 2: Other Agencies (The "Them" List) --- */}
          <div className='pt-0 lg:pt-5 h-full'>
            <h3 className='text-2xl sm:text-3xl font-bold text-center text-gray-800 mb-8'>
              Other Agencies
            </h3>
            <ul className='space-y-4'>
              {otherAgenciesDrawbacks.map((drawback, index) => (
                <li key={index} className='flex items-start'>
                  <XCircle className='h-6 w-6 text-red-500 mr-3 mt-1 flex-shrink-0' />
                  <span className='text-gray-700'>{drawback}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
        
      </div>
    </section>
  )
}

export default ComparisonSection
