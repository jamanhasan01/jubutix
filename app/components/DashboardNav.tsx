'use client'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { LayoutDashboard, Search, Link2, ShieldCheck, Sparkles } from 'lucide-react'

const navLinks = [
  // ... (same navLinks array as before)
  { href: '/keyword-research', label: 'Keyword Research', icon: Search },
  { href: '/backlink-monitoring', label: 'Backlink Monitoring', icon: Link2 },
  { href: '/site-audit', label: 'Site Audit', icon: ShieldCheck },
  { href: '/ai-search', label: 'AI Search Visibility', icon: Sparkles },
]

export function DashboardNav() {
  return (
    // Note: No background or max-width here, the parent will handle it.
    <div className='flex items-center justify-between border-b border-gray-200 dark:border-zinc-800 px-4 md:px-6 py-3'>
      {/* Left Side: Logo/Brand */}
      <Link href='/'>
        <Button
          className='   bg-secondary
        text-primary hover:bg-zinc-800 dark:bg-zinc-50 dark:text-zinc-900 dark:hover:bg-zinc-200'
        >
          <LayoutDashboard className='h-5 w-5 mr-2' />
          Rank Tracker
        </Button>
      </Link>

      {/* Center: Navigation Links */}
      <div className='hidden md:flex items-center gap-2'>
        {navLinks.map((link) => (
          <Link key={link.label} href={link.href}>
            <Button variant='ghost' className='text-gray-600 dark:text-gray-300 font-medium'>
              <link.icon className='h-4 w-4 mr-2' />
              {link.label}
            </Button>
          </Link>
        ))}
      </div>
    </div>
  )
}
