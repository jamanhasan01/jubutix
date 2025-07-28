'use client'

import Link from 'next/link'
import { useEffect, useState } from 'react'
import { Menu, X, ChevronDown, Phone } from 'lucide-react' // Changed icons
import Logo from './Logo'
import Button from './Button'
import { usePathname } from 'next/navigation'

const Navbar = () => {
  const [isMobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [isScoll, setisScoll] = useState(false)
  const pathname = usePathname()

  useEffect(() => {
    const handleScrollFunc = () => {
      if (scrollY > 10) {
        setisScoll(true)
      } else {
        setisScoll(false)
      }
    }
    window.addEventListener('scroll', handleScrollFunc)
    return () => {
      window.removeEventListener('scroll', handleScrollFunc)
    }
  }, [])
  if (pathname.startsWith('/dashboard')) {
    return null
  }
  return (
    <header
      className={`w-full fixed top-0 z-50 transition-all duration-300 ${
        isScoll ? 'bg-white/30 backdrop-blur-md shadow-sm' : 'bg-transparent'
      }`}
    >
      <nav className='max-w-7xl mx-auto px-8 py-4 flex justify-between items-center'>
        {/* Logo */}
        <Link href='/'>
          <Logo />
        </Link>

        {/* Desktop Nav */}
        <ul className='hidden md:flex items-center gap-10'>
          <li>
            <Link
              href='/'
              className='uppercase font-semibold text-sm text-zinc-700 hover:text-brand-pink transition-colors'
            >
              Home
            </Link>
          </li>
          <li>
            <Link
              href='/whoweare'
              className='uppercase font-semibold text-sm text-zinc-700 hover:text-brand-pink transition-colors'
            >
              Who We Are
            </Link>
          </li>
          {/* Services Dropdown */}
          <li className='relative group'>
            <span className='uppercase font-semibold text-sm text-zinc-700 hover:text-brand-pink transition-colors flex items-center gap-1 cursor-pointer'>
              Services
              {/* Replaced FiChevronDown with ChevronDown */}
              <ChevronDown className='w-4 h-4 transition-transform group-hover:rotate-180' />
            </span>
            <ul className='absolute top-full left-1/2 -translate-x-1/2 mt-2 w-52 bg-white shadow-lg rounded-md p-2 opacity-0 group-hover:opacity-100 invisible group-hover:visible transition-all duration-300 z-50'>
              <li>
                <Link
                  href='/google-ads'
                  className='block px-4 py-2 text-sm text-zinc-700 rounded-md hover:bg-zinc-100 hover:text-brand-pink'
                >
                  Google Ads
                </Link>
              </li>
              <li>
                <Link
                  href='/facebook-ads'
                  className='block px-4 py-2 text-sm text-zinc-700 rounded-md hover:bg-zinc-100 hover:text-brand-pink'
                >
                  Facebook Ads
                </Link>
              </li>
            </ul>
          </li>
          <li>
            <Link
              href='/blogs'
              className='uppercase font-semibold text-sm text-zinc-700 hover:text-brand-pink transition-colors'
            >
              Blogs
            </Link>
          </li>
          <li>
            <Link
              href='/contact-us'
              className='uppercase font-semibold text-sm text-zinc-700 hover:text-brand-pink transition-colors'
            >
              Contact Us
            </Link>
          </li>
        </ul>

        {/* Desktop Action Button */}
        <div className='hidden md:block'>
          <Link href='/courses'>
            <Button text={'TALK TO US'} icon={<Phone size={20} />} />
          </Link>
        </div>

        {/* Mobile Menu Button */}
        <div className='md:hidden z-50'>
          <button onClick={() => setMobileMenuOpen(!isMobileMenuOpen)}>
            {/* Replaced FaTimes/FaBars with X/Menu */}
            {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </nav>

      {/* Mobile Menu Dropdown */}
      {isMobileMenuOpen && (
        <div className='md:hidden bg-white shadow-md px-8 pb-6'>
          <ul className='flex flex-col gap-4'>
            <li>
              <Link href='/' className='text-sm font-medium text-zinc-700'>
                Home
              </Link>
            </li>
            <li>
              <Link href='/who-we-are' className='text-sm font-medium text-zinc-700'>
                Who We Are
              </Link>
            </li>
            {/* Nested Dropdown (optional collapsible for mobile) */}
            <li>
              <span className='text-sm font-medium text-zinc-700'>Services</span>
              <ul className='pl-4 mt-1 space-y-1'>
                <li>
                  <Link href='/seo' className='text-sm text-zinc-600'>
                    SEO Optimization
                  </Link>
                </li>
                <li>
                  <Link href='/meta-ads' className='text-sm text-zinc-600'>
                    Meta Ads
                  </Link>
                </li>
              </ul>
            </li>
            <li>
              <Link href='/blogs' className='text-sm font-medium text-zinc-700'>
                Blogs
              </Link>
            </li>
            <li>
              <Link href='/contact-us' className='text-sm font-medium text-zinc-700'>
                Contact Us
              </Link>
            </li>
            <li>
              <Link href='/courses'>
                <Button
                  text={'TALK TO US'}
                  classname='w-full mt-2 bg-green-600'
                  // 2. Pass the icon as a JSX element to the 'icon' prop
                  icon={<Phone size={20} />}
                />
              </Link>
            </li>
          </ul>
        </div>
      )}
    </header>
  )
}

export default Navbar
