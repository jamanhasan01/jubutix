// components/HallOfTrust.jsx
import Image from 'next/image'

// --- Logo Data ---
// Replace these with your actual client logos and names.
// It's best to host your logos in the /public directory.
const logos = [
  { name: 'Client 1', logo: '/logo1.png' },
  { name: 'Client 1', logo: '/logo1.png' },
  { name: 'Client 1', logo: '/logo1.png' },
  { name: 'Client 1', logo: '/logo1.png' },
  { name: 'Client 2', logo: '/logo2.png' },
  { name: 'Client 2', logo: '/logo2.png' },
  { name: 'Client 2', logo: '/logo2.png' },
  { name: 'Client 2', logo: '/logo2.png' },
  { name: 'Client 3', logo: '/logo3.png' },
  { name: 'Client 3', logo: '/logo3.png' },
  { name: 'Client 4', logo: '/logo4.png' },
  { name: 'Client 4', logo: '/logo4.png' },
]

const HallOfTrust = () => {
  return (
    <section className=' '>
      <div className='container'>
        {/* --- Section Header --- */}
        <div className='text-center'>
          <h2>
            Hall of Trust
          </h2>
          <p className='mt-4 text-center mx-auto'>
            We aren&apos;t just your agency - we are your partner in growth.
          </p>
        </div>

        {/* --- Logo Grid --- */}
        <div className='mt-12'>
          <div className='grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6  border-gray-200 gap-2'>
            {logos.map((company,i) => (
              <div
                key={i}
                className='flex items-center justify-center p-6 border-r border-b border-gray-200 bg-white'
              >
                <Image
                  src={company.logo}
                  alt={company.name}
                  width={158}
                  height={48}
                  className='max-h-12 w-full object-contain'
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

export default HallOfTrust
