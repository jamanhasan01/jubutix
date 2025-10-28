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
  FaUser,
} from 'react-icons/fa'
import { usePathname } from 'next/navigation'
import { useSession } from 'next-auth/react'

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
  roles?: string[] // Added
}

type NavLink = {
  name: string
  link: string
  icon: ReactNode
  subItems?: never
  roles?: string[] // Added
}

type NavItemType = NavLink | NavSubMenu

type NavItemProps = {
  item: NavItemType
}

// --- Navigation Data (Modified to exclude 'moderator' from 'Users' route) ---
const navLinks: NavItemType[] = [
  { name: 'Dashboard', link: '/dashboard', icon: <FaHome className='w-5 h-5' /> },
  {
    name: 'Users',
    link: '/dashboard/users',
    icon: <FaUser className='w-5 h-5' />,
    roles: ['admin'], // Users with role 'moderator' will NOT see this.
  },
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
        name: 'Add New Post',
        link: '/dashboard/posts/new-post',
        icon: <FaPlusSquare className='w-4 h-4' />,
      },
    ],
  },
]

// --- NavItem Component ---
const NavItem = ({ item }: NavItemProps) => {
  const pathname = usePathname()

  const isParentActive = item.subItems?.some((subItem) => subItem.link === pathname) ?? false

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

        {isFlyoutVisible && !isDropdownVisible && (
          <ul className='absolute top-0 left-full ml-0 w-48 p-2 space-y-1 bg-gray-800 text-white rounded-lg shadow-xl z-50'>
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

// --- Main Sidebar Component (Filtering Logic) ---
const AsideNav = () => {
  const { data: session, status } = useSession()
  const userRole = session?.user?.role // Get the current user's role

  if (status === 'loading') {
    return (
      <aside className='flex flex-col h-full bg-white border-r border-gray-200'>
        <div className='p-4 text-center text-gray-500'>Loading navigation...</div>
      </aside>
    )
  }

  // Filter the navigation links based on user role
  const filteredNavLinks = navLinks.filter((item) => {
    // If no 'roles' property is specified, the item is visible to all.
    if (!item.roles) {
      return true
    }
    // If 'roles' is specified, check if the current user's role is included.
    // Since 'Users' is defined with roles: ['admin', 'user'],
    // a 'moderator' will cause this check to return false, hiding the link.
    return item.roles.includes(userRole as string)
  })

  return (
    <aside className='flex flex-col h-full bg-white border-r border-gray-200'>
      <div className='flex items-center justify-center h-16 border-b border-gray-200'>
        <Logo />
      </div>
      <nav className='flex-grow p-4'>
        <ul className='space-y-2'>
          {filteredNavLinks.map((item) => (
            <NavItem key={item.name} item={item} />
          ))}
        </ul>
      </nav>
    </aside>
  )
}

export default AsideNav
