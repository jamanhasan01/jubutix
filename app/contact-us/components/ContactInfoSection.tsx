import React from 'react'
import { Phone, Mail, MapPin } from 'lucide-react'

// 1. Store contact information in an array for easy updates.
const contactDetails = [
  {
    icon: Phone,
    title: 'Phone',
    detail: '+8801805212243',
    href: 'tel:+8801805212243',
  },
  {
    icon: Mail,
    title: 'Email',
    detail: 'contact@jubutix.com',
    href: 'mailto:contact@jubutix.com',
  },
  {
    icon: MapPin,
    title: 'Location',
    detail: '343/2 Choto Alampur, Debidwar, Comilla, Bangladesh',
  },
]

const ContactInfoSection = () => {
  return (
    <section>
      <div className='container'>
        <div className='grid grid-cols-1 gap-y-12 md:grid-cols-3 md:divide-x md:divide-gray-200'>
          {contactDetails.map((item, index) => (
            <div key={index} className='flex flex-col items-center text-center px-8'>
              <div className='bg-blue-100/60 rounded-full p-4'>
                <item.icon className='h-8 w-8 text-primary' />
              </div>

              <h3 className='mt-4 text-xl font-semibold text-gray-800'>{item.title}</h3>

              {item.href ? (
                <a
                  href={item.href}
                  className='mt-2 text-gray-600 hover:text-primary transition-colors'
                >
                  {item.detail}
                </a>
              ) : (
                <p className='mt-2 text-primary whitespace-pre-line'>{item.detail}</p>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default ContactInfoSection
