'use client'

import Link from 'next/link'
import { useState } from 'react'
import { Menu, X, ChevronDown } from 'lucide-react' // Changed icons
import Logo from './Logo'
import Button from './Button'

const Navbar = () => {
  const [isMobileMenuOpen, setMobileMenuOpen] = useState(false)

  return (
    <header className='w-full bg-white shadow-sm sticky top-0 z-50'>
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
              href='/who-we-are'
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
                  href='/services/digital-marketing'
                  className='block px-4 py-2 text-sm text-zinc-700 rounded-md hover:bg-zinc-100 hover:text-brand-pink'
                >
                  Digital Marketing
                </Link>
              </li>
              <li>
                <Link
                  href='/services/seo'
                  className='block px-4 py-2 text-sm text-zinc-700 rounded-md hover:bg-zinc-100 hover:text-brand-pink'
                >
                  SEO Optimization
                </Link>
              </li>
              <li>
                <Link
                  href='/services/web-development'
                  className='block px-4 py-2 text-sm text-zinc-700 rounded-md hover:bg-zinc-100 hover:text-brand-pink'
                >
                  Web Development
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
            <Button text={'login'} classname={'bg-green-600'} />
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
                  <Link href='/services/digital-marketing' className='text-sm text-zinc-600'>
                    Digital Marketing
                  </Link>
                </li>
                <li>
                  <Link href='/services/seo' className='text-sm text-zinc-600'>
                    SEO Optimization
                  </Link>
                </li>
                <li>
                  <Link href='/services/web-development' className='text-sm text-zinc-600'>
                    Web Development
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
                <Button text={'login'} classname='w-full mt-2 bg-green-600' />
              </Link>
            </li>
          </ul>
        </div>
      )}
    </header>
  )
}

export default Navbar
