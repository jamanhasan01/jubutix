'use client'

import React, { useState, ReactNode } from 'react'
import Link from 'next/link'
import Logo from '@/app/components/Logo'
// --- Import the new icons you want to use ---
import {
  FaHome,
  FaFeatherAlt,
  FaChevronDown,
  FaListAlt, // Icon for 'All Posts'
  FaPlusSquare, // Icon for 'Add New'
  FaTags, // Icon for 'Categories'
} from 'react-icons/fa'
import { usePathname } from 'next/navigation'

// --- Type Definitions ---
type NavLink = {
  name: string
  link: string
  icon: ReactNode
  subItems?: never // Ensures subItems don't exist on a direct link
}

// 1. UPDATE SUB-ITEM TYPE TO INCLUDE AN ICON
type NavSubMenu = {
  name: string
  icon: ReactNode
  subItems: {
    name: string
    link: string
    icon: ReactNode // Add icon property here
  }[]
  link?: never // Ensures a direct link doesn't exist on a submenu parent
}

type NavItemType = NavLink | NavSubMenu

type NavItemProps = {
  item: NavItemType
}

// 2. UPDATE DATA STRUCTURE WITH ICONS FOR SUB-ITEMS
const navLinks: NavItemType[] = [
  { name: 'Dashboard', link: '/dashboard', icon: <FaHome className='w-5 h-5' /> },
  {
    name: 'Blog',
    icon: <FaFeatherAlt className='w-5 h-5' />,
    subItems: [
      {
        name: 'All Posts',
        link: '/dashboard/blog/posts',
        icon: <FaListAlt className='w-4 h-4' />, // Added icon
      },
      {
        name: 'Add New',
        link: '/dashboard/blog/new',
        icon: <FaPlusSquare className='w-4 h-4' />, // Added icon
      },
      {
        name: 'Categories',
        link: '/dashboard/blog/categories',
        icon: <FaTags className='w-4 h-4' />, // Added icon
      },
    ],
  },
]

// --- Typed Reusable NavItem Component ---
const NavItem = ({ item }: NavItemProps) => {
  const pathname = usePathname()

  // --- Sub-Menu Item Logic ---
  if (item.subItems) {
    const isParentActive = item.subItems.some((subItem) => subItem.link === pathname)
    const [isOpen, setIsOpen] = useState(isParentActive)

    const toggleSubMenu = () => {
      setIsOpen(!isOpen)
    }

    return (
      <li>
        <button
          onClick={toggleSubMenu}
          className={`flex items-center justify-between w-full gap-3 p-3 text-sm font-medium rounded-lg ${
            isParentActive ? 'bg-gray-100 text-gray-900' : 'text-gray-700 hover:bg-gray-100'
          }`}
        >
          <div className='flex items-center gap-3'>
            {item.icon}
            <span>{item.name}</span>
          </div>
          <FaChevronDown className={`w-3 h-3 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
        </button>
        {isOpen && (
          <ul className='pl-6 mt-2 space-y-2 border-l border-gray-200'>
            {item.subItems.map((subItem) => {
              const isSubActive = pathname === subItem.link
              return (
                <li key={subItem.name}>
                  {/* 3. RENDER THE ICON IN THE LINK */}
                  <Link
                    href={subItem.link}
                    className={`flex items-center gap-3 p-2 text-sm rounded-lg ${
                      // Use flex and gap for alignment
                      isSubActive ? 'bg-primary text-white' : 'text-gray-500 hover:bg-gray-100'
                    }`}
                  >
                    {subItem.icon}
                    <span>{subItem.name}</span>
                  </Link>
                </li>
              )
            })}
          </ul>
        )}
      </li>
    )
  }

  // --- Single Nav Item Logic ---
  const isActive = pathname === item.link
  return (
    <li>
      <Link
        href={item.link}
        className={`flex items-center gap-3 p-3 text-sm font-medium rounded-lg ${
          isActive ? 'bg-primary text-white' : 'text-gray-700 hover:bg-gray-100'
        }`}
      >
        {item.icon}
        <span>{item.name}</span>
      </Link>
    </li>
  )
}

const AsideNav = () => {
  return (
    <aside className='flex flex-col h-full bg-white border-r border-gray-200'>
      <div className='flex items-center justify-center h-16 border-b border-gray-200'>
        <Logo />
      </div>
      <nav className='flex-grow p-4'>
        <ul className='space-y-2'>
          {navLinks.map((item) => (
            <NavItem key={item.name} item={item} />
          ))}
        </ul>
      </nav>
    </aside>
  )
}

export default AsideNav
