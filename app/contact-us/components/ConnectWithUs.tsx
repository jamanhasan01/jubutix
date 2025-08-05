import React from 'react'
// Importing the correct icons for the social media platforms
import { FaFacebook, FaYoutube, FaTiktok, FaInstagram } from 'react-icons/fa'

// Data array for the connection cards
const socialConnectLinks = [
  {
    name: 'Facebook',
    icon: FaFacebook,
    href: 'https://www.facebook.com/jubutix',
    buttonText: 'FOLLOW ON FACEBOOK',
    iconColor: 'text-blue-600',
  },
  {
    name: 'Youtube',
    icon: FaYoutube,
    href: 'https://www.youtube.com/@jubutix',
    buttonText: 'SUBSCRIBE ON YOUTUBE',
    iconColor: 'text-red-600',
  },
  {
    name: 'TikTok',
    icon: FaTiktok,
    href: 'https://www.tiktok.com/@jubutix',
    buttonText: 'WATCH ON TIKTOK',
    iconColor: 'text-black',
  },
  {
    name: 'Instagram',
    icon: FaInstagram,
    href: 'https://www.instagram.com/jubutix',
    buttonText: 'FOLLOW ON INSTAGRAM',
    iconColor: 'text-pink-600', // This color will now be used
    isGradient: false, // FIX: Changed from true to false to show the solid pink color
  },
]

const ConnectWithUs = () => {
  return (
    <section className='bg-white '>
      <div className='container mx-auto px-4'>
        {/* Section Title */}
        <h2 className='text-center text-3xl sm:text-4xl font-bold text-gray-800 mb-12'>
          Connect With Us
        </h2>

        {/* Responsive Grid for Cards */}
        <div className='grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4'>
          {socialConnectLinks.map((link) => (
            <div
              key={link.name}
              // Card styling with hover effects
              className='flex flex-col items-center justify-between text-center p-8 bg-white border border-gray-200 rounded-lg shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300'
            >
              <div className='flex flex-col items-center'>
                {/* This conditional rendering will now choose the correct path */}
                {link.isGradient ? (
                  <link.icon className='h-16 w-16 mb-4 text-transparent bg-clip-text bg-gradient-to-br from-purple-500 via-pink-500 to-orange-500' />
                ) : (
                  <link.icon className={`h-16 w-16 mb-4 ${link.iconColor}`} />
                )}

                {/* Title */}
                <h3 className='text-xl font-semibold text-gray-800'>{link.name}</h3>
              </div>

              <div className='mt-6'>
                {/* Button/Link */}
                <a
                  href={link.href}
                  target='_blank'
                  rel='noopener noreferrer'
                  className='px-2 py-2 border border-gray-300 rounded-md text-xs font-medium text-gray-700 hover:bg-gray-100 hover:border-gray-400 transition-colors'
                >
                  {link.buttonText}
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default ConnectWithUs