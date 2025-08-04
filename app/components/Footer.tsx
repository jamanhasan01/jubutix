'use client'
import Link from 'next/link'

import {  Facebook, Youtube, Instagram } from 'lucide-react'
import { FaTiktok } from 'react-icons/fa'

const quickLinks = [
  { name: 'Home', href: '/' },
  { name: 'Services', href: '/services' },
  { name: 'Success Stories', href: '/success-stories' },
  { name: 'How We Work', href: '/how-we-work' },
]

const socialLinks = [
  { name: 'Facebook', icon: Facebook, href: 'https://www.facebook.com/jubutix' },
  { name: 'Youtube', icon: Youtube, href: 'https://www.youtube.com/@jubutix' },
  { name: 'TikTok', icon: FaTiktok, href: 'https://www.tiktok.com/@jubutix' },
  { name: 'Instagram', icon: Instagram, href: 'https://www.instagram.com/jubutix' },
]

const Footer = () => {
  return (
    <footer className="bg-slate-800 text-slate-300">
      <div className="container mx-auto px-4 pt-16 pb-8">
        {/* Top section with columns */}
        <div className="grid grid-cols-1 gap-12 md:grid-cols-3">
          
          {/* Column 1: Agency Info */}
          <div>
            <h2 className="text-xl font-bold text-white">Jubutix Agency</h2>
            <p className="mt-4 text-slate-400">
              Dedicated to empowering e-commerce businesses with strategic marketing solutions that drive real results.
            </p>
          </div>

          {/* Column 2: Quick Links */}
          <div>
            <h3 className="text-lg font-bold text-white">Quick Links</h3>
            <ul className="mt-4 space-y-3">
              {quickLinks.map((link) => (
                <li key={link.name}>
                  <Link href={link.href} className="hover:text-white transition-colors duration-300">
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3: Contact Us */}
          <div>
            <h3 className="text-lg font-bold text-white">Contact Us</h3>
            <ul className="mt-4 space-y-3 text-slate-400">
              <li>contact@jubutix.comm</li>
              <li>Phone: +880 1805-212243</li>
              <li>343/2 Choto Alampur, Debidwar, Comilla, Bangladesh</li>
            </ul>
            <div className="mt-6 flex space-x-4">
              {socialLinks.map((social) => (
                <a
                  key={social.name}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={social.name}
                  className="text-slate-400 hover:text-white transition-colors duration-300"
                >
                  <social.icon className="h-5 w-5" />
                </a>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom section with copyright */}
        <div className="mt-12 border-t border-slate-700 pt-8 text-center">
          <p className="text-sm text-slate-500">
            &copy; {new Date().getFullYear()} Jubutix Agency. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  )
}

export default Footer