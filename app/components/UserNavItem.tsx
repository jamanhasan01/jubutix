import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { LayoutDashboard, LogOut, Phone } from 'lucide-react'

import { signOut, useSession } from 'next-auth/react'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'
import Button from './Button'

const FALLBACK_IMAGE_SRC = '/default-avatar.png'

const UserNavItem = () => {
  const { data: session } = useSession()
  // Function to handle logout
  const handleLogout = async () => {
    // Dropdown closes automatically upon click on MenuItem
    await signOut({ callbackUrl: '/' }) // Redirect to home page after signout
  }
  return (
    <div className='hidden md:flex items-center gap-4'>
      {session ? (
        // **shadcn/ui Dropdown Menu for Authenticated Users**
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <button
              // ... (keep your existing classes)
              className='flex items-center justify-center border-primary border p-[1px] w-10 h-10 rounded-full bg-gray-100 hover:bg-secondary/90 transition-colors focus:outline-none overflow-hidden'
              aria-label='User Profile'
            >
              <Image
                src={session.user.image || FALLBACK_IMAGE_SRC}
                width={500}
                height={500}
                className='w-full h-full  rounded-full'
                alt='User Profile'
              />
            </button>
          </DropdownMenuTrigger>

          <DropdownMenuContent align='end' className='w-56'>
            <DropdownMenuLabel>
              {session.user.name || 'My Account'}
              <p className='text-xs font-normal text-gray-500 truncate'>{session.user.email}</p>
            </DropdownMenuLabel>
            <DropdownMenuSeparator />

            {/* Dashboard Link (Link wrapped in DropdownMenuItem) */}
            <DropdownMenuItem asChild>
              <Link
                href={session.user.role === 'admin' ? '/dashboard' : '/dashboard'}
                className='flex items-center gap-2 cursor-pointer'
              >
                <LayoutDashboard className='w-4 h-4' />
                Dashboard
              </Link>
            </DropdownMenuItem>

            <DropdownMenuSeparator />

            {/* Logout Button */}
            <DropdownMenuItem
              onClick={handleLogout}
              className='flex items-center gap-2 text-red-600 focus:text-red-700 focus:bg-red-50 cursor-pointer'
            >
              <LogOut className='w-4 h-4' />
              Logout
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      ) : (
        // Existing 'TALK TO US' button and Sign In for unauthenticated users
        <>
          <Link href='/contact-us'>
            <Button text={'TALK TO US'} icon={<Phone size={20} />} />
          </Link>
        </>
      )}
    </div>
  )
}

export default UserNavItem
