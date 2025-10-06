'use client'

import Link from 'next/link'
import { useEffect, useState } from 'react'
import { Menu, X, ChevronDown, Phone } from 'lucide-react'
import Logo from './Logo'
import Button from './Button'
import { usePathname } from 'next/navigation'
import TopBar from './Topbar'
import { signOut } from 'next-auth/react'

const Navbar = () => {
  const [isMobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [isScroll, setIsScroll] = useState(false)
  const pathname = usePathname()

  // Define service paths for active state checking
  const servicePaths = ['/seo', '/google-ads', '/facebook-ads']
  const isServiceActive = servicePaths.some((path) => pathname.startsWith(path))

  // Close mobile menu on route change
  useEffect(() => {
    setMobileMenuOpen(false)
  }, [pathname])

  useEffect(() => {
    const handleScrollFunc = () => {
      if (window.scrollY > 10) {
        setIsScroll(true)
      } else {
        setIsScroll(false)
      }
    }

    window.addEventListener('scroll', handleScrollFunc)
    return () => {
      window.removeEventListener('scroll', handleScrollFunc)
    }
  }, [])

  // Move the conditional return AFTER all hooks
  if (
    pathname.startsWith('/dashboard') ||
    pathname.startsWith('/sign-in') ||
    pathname.startsWith('/sign-up')
  ) {
    return null
  }

  return (
    <header
      className={`w-full fixed top-0 z-50 transition-all duration-300 ${
        isScroll ? ' px-4 ' : 'bg-transparent'
      }`}
    >
      {!isScroll && <TopBar />}
      <nav
        className={`max-w-7xl mx-auto px-8 py-4 flex justify-between items-center ${
          isScroll ? 'bg-black/10 backdrop-blur-md shadow-sm mt-4 rounded-full' : ''
        }`}
      >
        <Logo />

        {/* Desktop Nav */}
        <ul className='hidden md:flex items-center gap-10'>
          <li>
            <Link
              href='/'
              className={`uppercase font-semibold text-sm transition-colors ${
                pathname === '/' ? 'text-secondary' : 'text-zinc-700 hover:text-secondary'
              }`}
            >
              Home
            </Link>
          </li>
          <li>
            <Link
              href='/about-us'
              className={`uppercase font-semibold text-sm transition-colors ${
                pathname === '/about-us' ? 'text-secondary' : 'text-zinc-700 hover:text-secondary'
              }`}
            >
              About Us
            </Link>
          </li>
          <li className='relative group'>
            <span
              className={`uppercase font-semibold text-sm transition-colors flex items-center gap-1 cursor-pointer ${
                isServiceActive ? 'text-secondary' : 'text-zinc-700 hover:text-secondary'
              }`}
            >
              Services
              <ChevronDown className='w-4 h-4 transition-transform group-hover:rotate-180' />
            </span>
            <ul className='absolute top-full left-1/2 -translate-x-1/2 mt-2 w-52 bg-white shadow-lg rounded-md p-2 opacity-0 group-hover:opacity-100 invisible group-hover:visible transition-all duration-300 z-50'>
              {servicePaths.map((path) => (
                <li key={path}>
                  <Link
                    href={path}
                    className={`block ${
                      path == '/seo' ? ' uppercase ' : 'capitalize'
                    }  px-4 py-2 text-sm rounded-md ${
                      pathname === path
                        ? 'bg-secondary text-white'
                        : 'text-black/80 font-semibold hover:bg-secondary hover:text-white'
                    }`}
                  >
                    {/* Simple formatting for the link text from path */}
                    {path
                      .replace('/', '')
                      .replace('-', ' ')
                      .replace(/\b\w/g, (l) => l.toUpperCase())}
                  </Link>
                </li>
              ))}
            </ul>
          </li>
          <li>
            <Link
              href='/blog'
              className={`uppercase font-semibold text-sm transition-colors ${
                pathname.startsWith('/blog')
                  ? 'text-secondary'
                  : 'text-zinc-700 hover:text-secondary'
              }`}
            >
              Blog
            </Link>
          </li>
          <li>
            <Link
              href='/contact-us'
              className={`uppercase font-semibold text-sm transition-colors ${
                pathname === '/contact-us' ? 'text-secondary' : 'text-zinc-700 hover:text-secondary'
              }`}
            >
              Contact Us
            </Link>
          </li>
          <li>
            <Link
              href='/dashboard'
              className={`uppercase font-semibold text-sm transition-colors ${
                pathname === '/dashboard' ? 'text-secondary' : 'text-zinc-700 hover:text-secondary'
              }`}
            >
             Dashboard
            </Link>
          </li>
        </ul>

        {/* Desktop Action Button */}
        <div className='hidden md:block'>
          <Link href='/contact-us'>
            <Button text={'TALK TO US'} icon={<Phone size={20} />} />
          </Link>
        </div>

        {/* Mobile Menu Toggle */}
        <div className='md:hidden z-50'>
          <button onClick={() => setMobileMenuOpen(!isMobileMenuOpen)}>
            {isMobileMenuOpen ? (
              <X size={24} className='text-zinc-700' />
            ) : (
              <Menu size={24} className='text-zinc-700' />
            )}
          </button>
        </div>
      </nav>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className='md:hidden bg-white shadow-md px-8 pb-6'>
          <ul className='flex flex-col gap-4'>
            <li>
              <Link
                href='/'
                className={`text-sm font-medium ${
                  pathname === '/' ? 'text-secondary' : 'text-zinc-700 hover:text-secondary'
                }`}
              >
                Home
              </Link>
            </li>
            <li>
              <Link
                href='/about-us'
                className={`text-sm font-medium ${
                  pathname === '/about-us' ? 'text-secondary' : 'text-zinc-700 hover:text-secondary'
                }`}
              >
                Who We Are
              </Link>
            </li>
            <li>
              <span
                className={`text-sm font-medium ${
                  isServiceActive ? 'text-secondary' : 'text-zinc-700'
                }`}
              >
                Services
              </span>
              <ul className='pl-4 mt-2 space-y-2'>
                {servicePaths.map((path) => (
                  <li key={path}>
                    <Link
                      href={path}
                      className={`text-sm  ${path == '/seo' ? 'uppercase' : 'capitalize'} ${
                        pathname === path
                          ? `text-secondary font-semibold`
                          : 'text-zinc-600 hover:text-secondary'
                      }`}
                    >
                      {path
                        .replace('/', '')
                        .replace('-', ' ')
                        .replace(/\b\w/g, (l) => l.toUpperCase())}
                    </Link>
                  </li>
                ))}
              </ul>
            </li>
            <li>
              <Link
                href='/blog'
                className={`text-sm font-medium ${
                  pathname.startsWith('/blog')
                    ? 'text-secondary'
                    : 'text-zinc-700 hover:text-secondary'
                }`}
              >
                Blog
              </Link>
            </li>
            <li>
              <Link
                href='/contact-us'
                className={`text-sm font-medium ${
                  pathname === '/contact-us'
                    ? 'text-secondary'
                    : 'text-zinc-700 hover:text-secondary'
                }`}
              >
                Contact Us
              </Link>
            </li>
            <li>
              <Link
                href='/dashboard'
                className={`text-sm font-medium ${
                  pathname === '/dashboard'
                    ? 'text-secondary'
                    : 'text-zinc-700 hover:text-secondary'
                }`}
              >
                Dashboard
              </Link>
            </li>
            <li>
              <Link href='/contact-us'>
                <Button text={'TALK TO US'} icon={<Phone size={20} />} />
              </Link>
            </li>
          </ul>
        </div>
      )}
    </header>
  )
}

export default Navbar
