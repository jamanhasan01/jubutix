// components/TopBar.tsx

import { Phone, Mail } from 'lucide-react'
import { FaFacebook, FaInstagram, FaLinkedin, FaTiktok, FaYoutube } from 'react-icons/fa'

const socialLinks = [
  { name: 'Facebook', icon: FaFacebook, href: 'https://www.facebook.com/jubutix' },
  { name: 'Instagram', icon: FaInstagram, href: 'https://www.instagram.com/jubutix' },
  { name: 'LinkedIn', icon: FaLinkedin, href: 'https://www.linkedin.com/company/jubutix' },
  {
    name: 'Youtube',
    icon: FaYoutube,
    href: 'https://www.youtube.com/@jubutix',
    color: 'text-white',
  },
  { name: 'TikTok', icon: FaTiktok, href: 'https://www.tiktok.com/@jubutix' },
]

const TopBar = () => {
  return (
    <div className='hidden md:flex text-white bg-primary text-sm '>
      <div className='container max-w-7xl mx-auto  flex justify-between items-center py-2'>
        {/* Left Side: Contact Information */}
        <div className='flex items-center gap-6 ml-2'>
          <a
            href='tel:+8801805212243'
            className='flex items-center gap-2 hover:text-brand-pink transition-colors'
          >
            <Phone size={16} />
            <span>+880 1805-212243</span>
          </a>
          <a
            href='mailto:contact@jubutix.com'
            className='flex items-center gap-2 hover:text-brand-pink transition-colors'
          >
            <Mail size={16} />
            <span>contact@jubutix.com</span>
          </a>
        </div>

        {/* Right Side: Social Icons */}
        <div className='flex items-center gap-4'>
          <div className='flex items-center gap-3'>
            {socialLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                aria-label={link.name}
                target='_blank'
                rel='noopener noreferrer'
                // The className now applies the brand color directly and adds a hover effect.
                className={`${link.color} hover:opacity-80 transition-opacity`}
              >
                <link.icon size={18} />
              </a>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

export default TopBar
