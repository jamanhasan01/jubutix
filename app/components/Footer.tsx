'use client'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { FaTiktok } from 'react-icons/fa'
import { MapPin, Phone, Mail, Facebook, Youtube, Instagram, ArrowUp } from 'lucide-react'
import { usePathname } from 'next/navigation'

const companyLinks = [
  { name: 'Home', href: '/' },
  { name: 'Who We Are', href: '/about' },
  { name: 'Blogs', href: '/blogs' },
  { name: 'Contact Us', href: '/contact' },
]

const servicesLinks = [
  { name: 'SEO', href: '/services/seo' },
  { name: 'Pay Per Click', href: '/services/ppc' },
  { name: 'Meta Ads', href: '/services/meta-ads' },
]

const socialLinks = [
  { name: 'Facebook', icon: Facebook, href: 'https://www.facebook.com/jubutix' },
  { name: 'Youtube', icon: Youtube, href: 'https://www.youtube.com/@jubutix' },
  { name: 'TikTok', icon: FaTiktok, href: 'https://www.tiktok.com/@jubutix' },
  { name: 'Instagram', icon: Instagram, href: 'https://www.instagram.com/jubutix' },
]

// --- Main Footer Component ---
const Footer = () => {
    const pathname = usePathname()
 
if (pathname.startsWith('/dashboard')) {
    return null
  }
  return (
    <footer className='bg-slate-900 text-slate-300'>
      <div className='container mx-auto px-4 py-16 sm:py-24'>
        {/* --- Main Grid: Changed to a more balanced 2-column layout --- */}
        <div className='grid grid-cols-1 lg:grid-cols-2 gap-16'>
          {/* --- Left Side: Links and Contact Info --- */}
          <div className='grid grid-cols-1 sm:grid-cols-2 gap-8'>
            <div>
              <h3 className='text-lg font-semibold text-white'>Company</h3>
              <ul className='mt-4 space-y-3'>
                {companyLinks.map((link) => (
                  <li key={link.name}>
                    <Link href={link.href} className='hover:text-white transition-colors'>
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h3 className='text-lg font-semibold text-white'>Services</h3>
              <ul className='mt-4 space-y-3'>
                {servicesLinks.map((link) => (
                  <li key={link.name}>
                    <Link href={link.href} className='hover:text-white transition-colors'>
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
            <div className='sm:col-span-2'>
              <h3 className='text-lg font-semibold text-white'>Get in Touch</h3>
              <ul className='mt-4 space-y-4'>
                <li className='flex items-start gap-3'>
                  <MapPin className='h-5 w-5 mt-1 flex-shrink-0 text-slate-400' />
                  <span>343/2 Choto Alampur, Debidwar, Comilla, Bangladesh</span>
                </li>
                <li className='flex items-start gap-3'>
                  <Phone className='h-5 w-5 mt-1 flex-shrink-0 text-slate-400' />
                  <span>+880 1805-212243</span>
                </li>
                <li className='flex items-start gap-3'>
                  <Mail className='h-5 w-5 mt-1 flex-shrink-0 text-slate-400' />
                  <span>contact@jubutix.com</span>
                </li>
              </ul>
            </div>
          </div>

          {/* --- Right Side: Contact Form --- */}
          <div className='bg-slate-800/50 p-8 rounded-lg'>
            <h3 className='text-2xl font-bold text-white'>We can grow your sales.</h3>
            <p className='mt-2 text-slate-400'>Ask us how!</p>
            <form className='mt-6 space-y-4'>
              <Input
                type='text'
                placeholder='Name*'
                className='bg-slate-900 border-slate-700 text-white focus:ring-blue-500'
              />
              <Input
                type='email'
                placeholder='Email*'
                className='bg-slate-900 border-slate-700 text-white focus:ring-blue-500'
              />
              <Input
                type='tel'
                placeholder='Phone*'
                className='bg-slate-900 border-slate-700 text-white focus:ring-blue-500'
              />
              <Textarea
                placeholder='Message*'
                className='bg-slate-900 border-slate-700 text-white min-h-[100px] focus:ring-blue-500'
              />
              <Button type='submit' size='lg' className='w-full bg-primary  text-white font-bold'>
                GROW YOUR SALES
              </Button>
            </form>
          </div>
        </div>
      </div>

      {/* --- Sub-footer: Simplified for a cleaner look --- */}
      <div className='bg-slate-950/50'>
        <div className='container mx-auto px-4 py-6 flex flex-col sm:flex-row justify-between items-center'>
          <p className='text-sm text-slate-500 text-center sm:text-left'>
            &copy; {new Date().getFullYear()} UT Digital Media. All Rights Reserved.
          </p>
          <div className='flex space-x-4 mt-4 sm:mt-0'>
            {socialLinks.map((social) => (
              <Link
                key={social.name}
                href={social.href}
                target='_blank'
                rel='noopener noreferrer'
                aria-label={social.name}
                className='text-slate-500 hover:text-white transition-colors'
              >
                <social.icon className='h-5 w-5' />
              </Link>
            ))}
          </div>
        
        </div>
      </div>
    </footer>
  )
}

export default Footer
