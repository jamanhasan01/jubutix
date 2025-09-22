'use client'

import React, { useState, ReactNode } from 'react'
import Link from 'next/link'
import Logo from '@/app/components/Logo'
import {
  FaHome,
  FaFeatherAlt,
  FaChevronDown,
  FaListAlt,
  FaPlusSquare,
  FaTags,
} from 'react-icons/fa'
import { usePathname } from 'next/navigation'

// --- Type Definitions ---
type NavSubMenu = {
  name: string
  icon: ReactNode
  subItems: {
    name: string
    link: string
    icon: ReactNode
  }[]
  link?: string
}

type NavLink = {
  name: string
  link: string
  icon: ReactNode
  subItems?: never
}

type NavItemType = NavLink | NavSubMenu

type NavItemProps = {
  item: NavItemType
}

// --- Navigation Data ---
const navLinks: NavItemType[] = [
  { name: 'Dashboard', link: '/dashboard', icon: <FaHome className='w-5 h-5' /> },
  {
    name: 'Posts',
    link: '/dashboard/posts',
    icon: <FaFeatherAlt className='w-5 h-5' />,
    subItems: [
      {
        name: 'All Posts',
        link: '/dashboard/posts',
        icon: <FaListAlt className='w-4 h-4' />,
      },
      {
        name: 'Add Post',
        link: '/dashboard/posts/new-post',
        icon: <FaPlusSquare className='w-4 h-4' />,
      },
      {
        name: 'Categories',
        link: '/dashboard/posts/categories',
        icon: <FaTags className='w-4 h-4' />,
      },
    ],
  },
]

// --- MODIFIED NavItem Component for Hybrid Menu ---
const NavItem = ({ item }: NavItemProps) => {
  const pathname = usePathname()
  const isParentActive = item.subItems?.some((subItem) => subItem.link === pathname) ?? false

  // 1. We need two state variables now
  const [isFlyoutVisible, setIsFlyoutVisible] = useState(false)
  const [isDropdownVisible, setIsDropdownVisible] = useState(isParentActive)

  const handleToggleDropdown = (e: React.MouseEvent) => {
    e.preventDefault()
    setIsDropdownVisible(!isDropdownVisible)
  }

  if (item.subItems) {
    return (
      <li
        className='relative'
        onMouseEnter={() => setIsFlyoutVisible(true)}
        onMouseLeave={() => setIsFlyoutVisible(false)}
      >
        <button onClick={handleToggleDropdown} className='w-full'>
          <div
            className={`flex items-center justify-between w-full rounded-lg transition-colors ${
              isParentActive || isDropdownVisible
                ? 'bg-gray-100 text-gray-900'
                : 'text-gray-700 hover:bg-gray-100'
            }`}
          >
            <Link
              href={item.link || '#'}
              className='flex items-center gap-3 p-3 text-sm font-medium grow'
            >
              {item.icon}
              <span>{item.name}</span>
            </Link>

            <FaChevronDown
              className={`w-3 h-3 mr-3 transition-transform ${
                isDropdownVisible ? 'rotate-180' : ''
              }`}
            />
          </div>
        </button>

        {/* 4. Conditionally render the FLYOUT menu (on hover) */}
        {/* It only shows if the dropdown is NOT open */}
        {isFlyoutVisible && !isDropdownVisible && (
          <ul className='absolute top-0 left-full ml-0 w-48 p-2 space-y-1 bg-gray-800 text-white rounded-lg shadow-xl z-10'>
            {item.subItems.map((subItem) => (
              <li key={subItem.name}>
                <Link
                  href={subItem.link}
                  className={`flex items-center w-full gap-3 p-2 text-sm rounded-md ${
                    pathname === subItem.link ? 'bg-primary' : 'hover:bg-gray-700'
                  }`}
                >
                  {subItem.icon}
                  <span>{subItem.name}</span>
                </Link>
              </li>
            ))}
          </ul>
        )}

        {/* 5. Conditionally render the DROPDOWN menu (on click) */}
        {isDropdownVisible && (
          <ul className='pl-6 mt-2 space-y-2 border-l border-gray-200'>
            {item.subItems.map((subItem) => (
              <li key={subItem.name}>
                <Link
                  href={subItem.link}
                  className={`flex items-center gap-3 p-2 text-sm rounded-lg ${
                    pathname === subItem.link
                      ? 'bg-primary text-white'
                      : 'text-gray-500 hover:bg-gray-100'
                  }`}
                >
                  {subItem.icon}
                  <span>{subItem.name}</span>
                </Link>
              </li>
            ))}
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

// --- Main Sidebar Component ---
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
