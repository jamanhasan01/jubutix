import React from 'react'
import AsideNav from './components/AsideNav'
import DashbaordHeader from './components/DashbaordHeader'
import { auth } from '@/lib/auth'
import { Search } from 'lucide-react'
import { redirect } from 'next/navigation'

type DashboardLayoutProp = {
  children: React.ReactNode
}

const DashboardLayout = async ({ children }: DashboardLayoutProp) => {
  const session = await auth()

  if (session?.user?.role !== 'admin' && session?.user?.role !== 'moderator') {
    redirect('/login')
  }

  return (
    // Full-screen layout with column flex for top bar
    <div className='flex h-screen overflow-hidden'>
      {/* Sidebar */}
      <aside className='w-64 bg-white border-r overflow-visible'>
        <AsideNav />
      </aside>

      {/* Right side (Top bar + content) */}
      <div className='flex flex-col flex-1'>
        {/* Top Bar */}
        <header className='bg-white text-white p-4 shadow-md flex-shrink-0 border-b h-16'>
          <DashbaordHeader />
        </header>

        {/* Main Content */}
        <main className='flex-1 bg-gray-100 overflow-y-auto p-6'>{children}</main>
      </div>
    </div>
  )
}

export default DashboardLayout
