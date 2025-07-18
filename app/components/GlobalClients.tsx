// components/GlobalClients.jsx
import Image from 'next/image'
import { Card, CardContent } from '@/components/ui/card'

// --- Client Data ---
// Add your clients here. Match the countryCode with your flag SVG filename.
const clients = [
  { name: 'Client A', logoUrl: '/logos/placeholder.svg', country: 'U.S.A', countryCode: 'us' },
  { name: 'Client B', logoUrl: '/logos/placeholder.svg', country: 'Canada', countryCode: 'ca' },
  { name: 'Client C', logoUrl: '/logos/placeholder.svg', country: 'London', countryCode: 'gb' },
  { name: 'Client D', logoUrl: '/logos/placeholder.svg', country: 'Dubai', countryCode: 'ae' },
  { name: 'Client E', logoUrl: '/logos/placeholder.svg', country: 'Pakistan', countryCode: 'pk' },
  { name: 'Client F', logoUrl: '/logos/placeholder.svg', country: 'India', countryCode: 'in' },
  {
    name: 'Client G',
    logoUrl: '/logos/placeholder.svg',
    country: 'South Africa',
    countryCode: 'za',
  },
  {
    name: 'Client H',
    logoUrl: '/logos/placeholder.svg',
    country: 'New Zealand',
    countryCode: 'nz',
  },
  {
    name: 'Client I',
    logoUrl: '/logos/placeholder.svg',
    country: 'Saudi Arabia',
    countryCode: 'sa',
  },
  { name: 'Client J', logoUrl: '/logos/placeholder.svg', country: 'Nepal', countryCode: 'np' },
]

const GlobalClients = () => {
  return (
    <section className='bg-white'>
      <div className='container '>
        {/* Section Header */}
        <h1>
          We serve Clients from{' '}
          <span className='relative inline-block'>
            <span className='relative z-10'>All over the world.</span>
            {/* The red scribble underline effect */}
            <span className='absolute left-0 bottom-0 w-full h-3 bg-red-600 -skew-x-12 z-0 transform translate-y-1'></span>
          </span>
        </h1>
        <p className='mt-4 text-lg text-gray-600'>
          <span className='font-bold text-primary'>100+ Clients</span> from all over the world -
          Some of them are
        </p>

        {/* Client Grid */}
        <div className='mt-12 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 sm:gap-6'>
          {clients.map((client) => (
            <Card key={client.name} className='hover:shadow-md transition-shadow'>
              <CardContent className='flex flex-col items-center justify-center p-6 gap-4'>
                <div className='relative h-16 w-full'>
                  <Image
                    src={client.logoUrl}
                    alt={`${client.name} logo`}
                    fill
                    className='object-contain'
                  />
                </div>
                <div className='flex items-center gap-2 pt-2 border-t w-full justify-center'>
                  <Image
                    src={`/flags/${client.countryCode}.svg`}
                    alt={`${client.country} flag`}
                    width={20}
                    height={20}
                    className='h-4 w-auto rounded-sm'
                  />
                  <span className='text-xs font-medium text-muted-foreground'>
                    {client.country}
                  </span>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}

export default GlobalClients
