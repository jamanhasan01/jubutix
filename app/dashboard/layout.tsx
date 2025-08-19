import React from 'react'
import AsideNav from './components/AsideNav'

type DashboardLayoutProp = {
    children: React.ReactNode
}

const DashboardLayout = ({ children }: DashboardLayoutProp) => {
  return (
    <div className='flex h-screen overflow-hidden'>
      {/* Side Navbar */}
      <div className='w-64 flex-shrink-0 bg-white'> {/* Or your desired background color */}
        <AsideNav />
      </div>

      {/* Main Content (Scrollable) */}
      <main className='flex-1 bg-gray-100 overflow-y-auto'>
        {children}
      </main>
    </div>
  )
}

export default DashboardLayout