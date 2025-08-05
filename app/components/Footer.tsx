'use client'
import Link from 'next/link'

// Icons from two different libraries
import { Facebook, Instagram, Linkedin } from 'lucide-react'
import { FaTiktok } from 'react-icons/fa'

// --- Data Arrays Updated to Match Screenshot ---

const quickLinks = [
  { name: 'Home', href: '/' },
  { name: 'Our Services', href: '/services' },
  { name: 'Case Studies', href: '/case-studies' },
  { name: 'Our Process', href: '/process' },
  { name: 'About Us', href: '/about' },
]

const servicesLinks = [
  { name: 'SEO', href: '/seo' },
  { name: 'Google Ads)', href: '/google-ads' },
  { name: 'Facebook Ads', href: '/facebook-ads' },
]

const socialLinks = [
  { name: 'Facebook', icon: Facebook, href: 'https://www.facebook.com/jubutix' },
  { name: 'Instagram', icon: Instagram, href: 'https://www.instagram.com/jubutix' },
  { name: 'TikTok', icon: FaTiktok, href: 'https://www.tiktok.com/@jubutix' },
  { name: 'LinkedIn', icon: Linkedin, href: 'https://www.linkedin.com/company/jubutix' }, // Added LinkedIn
]

const Footer = () => {
  return (
    // Using a dark slate color to match the screenshot
    <footer className='bg-primary text-white'>
      <div className='container pb-6'>
        {/* --- Main grid updated to 4 columns on large screens --- */}
        <div className='grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4'>
          {/* --- Column 1: Agency Info --- */}
          <div className='text-center sm:text-left'>
            <h2 className='text-xl font-bold text-white'>Jubutix</h2>
            <p className='mt-4 text-sm text-slate-200'>
              Helping online businesses grow big with smart marketing and expert knowledge.
            </p>
            {/* Social links are now here, under the agency info */}
            <div className='mt-6 flex justify-center sm:justify-start space-x-4'>
              {socialLinks.map((social) => (
                <a
                  key={social.name}
                  href={social.href}
                  target='_blank'
                  rel='noopener noreferrer'
                  aria-label={social.name}
                  className='text-slate-200 hover:text-white transition-colors duration-300'
                >
                  <social.icon className='h-6 w-6' />
                </a>
              ))}
            </div>
          </div>

          {/* --- Column 2: Quick Links --- */}
          <div className='text-center sm:text-left'>
            <h3 className='text-lg font-semibold text-white'>Quick Links</h3>
            <ul className='mt-4 space-y-3'>
              {quickLinks.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className='hover:text-white transition-colors duration-300 text-sm'
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* --- Column 3: "Services" column added --- */}
          <div className='text-center sm:text-left'>
            <h3 className='text-lg font-semibold text-white'>Services</h3>
            <ul className='mt-4 space-y-3'>
              {servicesLinks.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className='hover:text-white transition-colors duration-300 text-sm'
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* --- Column 4: "Get In Touch" column added with Map button --- */}
          <div className='text-center sm:text-left'>
            <h3 className='text-lg font-semibold text-white'>Get In Touch</h3>
            <ul className='mt-4 space-y-3 text-sm text-slate-200'>
              <li>Email: contact@jubutix.com</li>
              <li>Phone: +880 1805-212243</li>
              {/* Using the address from your location in Debidwar */}
              <li>Address: 343/2, Choto Alampur, Debidwar, Comilla, Bangladesh</li>
            </ul>
          </div>
        </div>

        {/* Bottom section with copyright */}
        <div className='mt-12 border-t border-slate-800 pt-8 text-center'>
          <p className='text-sm text-slate-200'>
            &copy; {new Date().getFullYear()} Jubutix. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  )
}

export default Footer
