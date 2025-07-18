// components/GlobalClients.jsx
import Image from 'next/image'
import { Card, CardContent } from '@/components/ui/card'

// --- Client Data ---
// Using the same data structure
const clients = [
  {
    name: 'Client A',
    personUrl: '/person.jpg',
    logo: '/bangladesh.png',
    country: 'U.S.A',
    countryCode: 'us',
  },
  {
    name: 'Client B',
    personUrl: '/person.jpg',
    logo: '/bangladesh.png',
    country: 'Canada',
    countryCode: 'ca',
  },
  {
    name: 'Client C',
    personUrl: '/person.jpg',
    logo: '/bangladesh.png',
    country: 'London',
    countryCode: 'gb',
  },
  {
    name: 'Client D',
    personUrl: '/person.jpg',
    logo: '/bangladesh.png',
    country: 'Dubai',
    countryCode: 'ae',
  },
  {
    name: 'Client E',
    personUrl: '/person.jpg',
    logo: '/bangladesh.png',
    country: 'Pakistan',
    countryCode: 'pk',
  },
  {
    name: 'Client F',
    personUrl: '/person.jpg',
    logo: '/bangladesh.png',
    country: 'India',
    countryCode: 'in',
  },
  {
    name: 'Client G',
    personUrl: '/person.jpg',
    logo: '/bangladesh.png',
    country: 'South Africa',
    countryCode: 'za',
  },
  {
    name: 'Client H',
    personUrl: '/person.jpg',
    logo: '/bangladesh.png',
    country: 'New Zealand',
    countryCode: 'nz',
  },
  {
    name: 'Client I',
    personUrl: '/person.jpg',
    logo: '/bangladesh.png',
    country: 'Saudi Arabia',
    countryCode: 'sa',
  },
  {
    name: 'Client J',
    personUrl: '/person.jpg',
    logo: '/bangladesh.png',
    country: 'Nepal',
    countryCode: 'np',
  },
]

const GlobalClients = () => {
  return (
    <section className='bg-slate-50 '>
      <div className='container'>
        <div className='text-center max-w-3xl mx-auto'>
          <h2 className='text-3xl font-extrabold text-gray-900 sm:text-4xl lg:text-5xl'>
            We serve Clients from{' '}
            <span className='relative inline-block'>
              <span className='relative z-10'>All over the world.</span>
              <span className='absolute left-0 bottom-0 w-full h-3 bg-red-400/80 -skew-x-12 z-0 transform translate-y-1'></span>
            </span>
          </h2>
          <p className='mt-4 text-lg text-gray-600'>
            <span className='font-bold text-blue-600'>100+ Clients</span> from all over the world -
            Some of them are
          </p>
        </div>

        {/* Client Grid */}
        <div className='mt-16 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6 sm:gap-8'>
          {clients.map((client) => (
            // CHANGE: Added a more engaging hover effect
            <Card
              key={client.name}
              className='bg-white overflow-visible hover:shadow-xl hover:scale-105 transition-all duration-300'
            >
              {/* CHANGE: Increased padding and arranged content for a better profile look */}
              <CardContent className='flex flex-col items-center text-center p-2 gap-4'>
                <div className='relative h-28 w-28 rounded-full '>
                  {/* CHANGE: Added border and shadow for a 3D effect */}
                  <div className='relative h-full w-full rounded-full border-4 border-white shadow-md'>
                    <Image
                      src={client.personUrl}
                      alt={`${client.name} profile picture`}
                      fill
                      // CHANGE: 'object-cover' is essential for profile pictures to fill the circle
                      className='object-cover rounded-full'
                    />
                  </div>
                </div>

                {/* CHANGE: Added the client's name for a proper profile */}
                <h3 className='font-bold text-gray-800 text-lg leading-tight'>{client.name}</h3>

                <div className='flex items-center gap-2'>
                  <Image
                    src={client.logo}
                    alt={`${client.country} flag`}
                    width={100}
                    height={100}
                    className='h-6 w-auto rounded-sm'
                  />
                  <span className='text-sm font-medium text-gray-500'>{client.country}</span>
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
