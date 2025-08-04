// components/rank-tracker-dashboard.tsx
'use client' // 👈 Add this at the top to mark it as a client component

import { useState } from 'react'
import {
  ArrowDown,
  ArrowUp,
  CalendarDays,
  Download,
  Globe,
  LayoutDashboard,
  Search,
  Link2,
  ShieldCheck,
  Sparkles,
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { BlurFade } from '@/components/magicui/blur-fade'
import { clsx } from 'clsx'
import { KeywordResearchView } from './KeywordResearchView'
import { SiteAuditView } from './SiteAuditView'

// Import the placeholder views

// --- Define the content for the default "Rank Tracker" view ---
const RankTrackerView = () => {
  const statsData = [
    { title: 'Avg Change', value: '+4.97', change: '+21.90%', changeType: 'increase' },
    { title: 'Top 3', value: '4/224', change: '-20.09%', changeType: 'decrease' },
    { title: 'Top 5', value: '4/224', change: '+1.79%', changeType: 'increase' },
    { title: 'Top 10', value: '66/224', change: '+29.44%', changeType: 'increase' },
    { title: 'Top 100', value: '219/224', change: '+97.77%', changeType: 'increase' },
  ]

  return (
    <div className='p-4 md:p-6'>
      <div className='flex flex-col md:flex-row items-start md:items-center justify-between gap-4 mb-6'>
        <div className='flex items-center gap-4'>
          <h2 className='text-2xl font-bold tracking-tight'>Performance</h2>
          <Select defaultValue='us'>
            <SelectTrigger className='w-[180px] h-9 bg-gray-50 dark:bg-zinc-800'>
              <Globe className='h-4 w-4 mr-2' />
              <SelectValue placeholder='Select Country' />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value='us'>United States</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div className='flex items-center gap-2'>
          <Button variant='outline' className='h-9 bg-gray-50 dark:bg-zinc-800'>
            <CalendarDays className='h-4 w-4 mr-2' />
            Last 30 days
          </Button>
          <Button className='h-9 bg-black text-white hover:bg-zinc-800 dark:bg-white dark:text-black dark:hover:bg-zinc-200'>
            <Download className='h-4 w-4 mr-2' />
            Export Report
          </Button>
        </div>
      </div>
      <div className='grid gap-4 md:grid-cols-2 lg:grid-cols-5'>
        {statsData.map((stat, index) => (
          <BlurFade key={stat.title} delay={0.1 * index}>
            <Card className='border-gray-200 dark:border-zinc-800 hover:border-gray-400 dark:hover:border-zinc-600 transition-colors'>
              <CardHeader className='flex flex-row items-center justify-between space-y-0 pb-2'>
                <CardTitle className='text-sm font-medium text-gray-500 dark:text-gray-400'>
                  {stat.title}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className='text-2xl font-bold'>{stat.value}</div>
                <div className='flex items-center text-xs text-muted-foreground'>
                  <span
                    className={clsx('flex items-center gap-1', {
                      'text-green-600 dark:text-green-500': stat.changeType === 'increase',
                      'text-red-600 dark:text-red-500': stat.changeType === 'decrease',
                    })}
                  >
                    {stat.changeType === 'increase' ? (
                      <ArrowUp className='h-4 w-4' />
                    ) : (
                      <ArrowDown className='h-4 w-4' />
                    )}{' '}
                    {stat.change}
                  </span>
                </div>
              </CardContent>
            </Card>
          </BlurFade>
        ))}
      </div>
    </div>
  )
}

// --- Main Dashboard Component ---
export function RankTrackerDashboard() {
  // 1. STATE to manage the active view
  const [activeView, setActiveView] = useState('rank-tracker')

  const navLinks = [
    { id: 'rank-tracker', label: 'Rank Tracker', icon: LayoutDashboard },
    { id: 'keyword-research', label: 'Keyword Research', icon: Search },
    { id: 'backlink-monitoring', label: 'Backlink Monitoring', icon: Link2 },
    { id: 'site-audit', label: 'Site Audit', icon: ShieldCheck },
    { id: 'ai-search', label: 'AI Search Visibility', icon: Sparkles },
  ]

  return (
    <section className='w-full max-w-7xl mx-auto bg-white dark:bg-zinc-900 rounded-xl shadow-lg overflow-hidden'>
      {/* 2. NAVIGATION with onClick handlers */}
      <div className='flex items-center border-b border-gray-200 dark:border-zinc-800 px-4 md:px-6 py-3'>
        {navLinks.map((link) => (
          <Button
            key={link.id}
            onClick={() => setActiveView(link.id)}
            variant={activeView === link.id ? 'default' : 'ghost'}
            className={clsx('font-medium', {
              '   bg-secondary text-primary hover:bg-zinc-800 dark:bg-zinc-50 dark:text-zinc-900 dark:hover:bg-zinc-200':
                activeView === link.id,
              'text-gray-600 dark:text-gray-300': activeView !== link.id,
            })}
          >
            <link.icon className='h-4 w-4 mr-2' />
            {link.label}
          </Button>
        ))}
      </div>

      {/* 3. CONDITIONAL RENDERING of content */}
      <div className='transition-opacity duration-300 ease-in-out'>
        {activeView === 'rank-tracker' && <RankTrackerView />}
        {activeView === 'keyword-research' && <KeywordResearchView />}
        {activeView === 'site-audit' && <SiteAuditView />}
        {/* Add placeholders for other views */}
        {activeView === 'backlink-monitoring' && (
          <div className='p-8 text-center'>
            <h3 className='text-xl font-bold'>Backlink Monitoring</h3>
          </div>
        )}
        {activeView === 'ai-search' && (
          <div className='p-8 text-center'>
            <h3 className='text-xl font-bold'>AI Search Visibility</h3>
          </div>
        )}
      </div>
    </section>
  )
}
