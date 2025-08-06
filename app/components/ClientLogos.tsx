// app/components/ClientLogos.tsx

import Image from 'next/image'
import Title from './Title'

const ClientLogos = () => {
  // Array of your logo filenames
  const logos = [
    'conpanyLogo1.jpg',
    'conpanyLogo2.jpg',
    'conpanyLogo3.jpg',
    'conpanyLogo4.jpg',
    'conpanyLogo5.jpg',
    'conpanyLogo6.jpg',
    'conpanyLogo7.jpg',
    'conpanyLogo8.jpg',
    'conpanyLogo9.jpg',
    'conpanyLogo10.jpg',
    'conpanyLogo11.jpg',
    'conpanyLogo12.jpg',
    'conpanyLogo13.jpg',
    'conpanyLogo14.jpg',
    'conpanyLogo15.jpg',
    'conpanyLogo16.jpg',
    'conpanyLogo17.jpg',
  ]

  return (
    <section className='bg-gray-50'>
      <div className='container mx-auto px-6'>
        <Title
          title='   Trusted By Leading Companies'
          subTitle='     We are proud to partner with innovative businesses across industries'
        />

        <div className='grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 lg:grid-cols-6 gap-8'>
          {logos.map((logo, index) => (
            <div
              key={index}
              className='flex items-center justify-center p-4 bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow duration-300'
            >
              <Image
                src={`/company/${logo}`}
                alt={`Conpany Logo ${index + 1}`}
                width={160}
                height={80}
                className='object-contain h-12 w-full'
                style={{
                  maxWidth: '100%',
                  height: 'auto',
                }}
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default ClientLogos
