'use client'

import { Sheet, SheetContent, SheetHeader, SheetTrigger } from '@/components/ui/sheet'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Phone } from 'lucide-react'
import { TypingAnimation } from '@/components/magicui/typing-animation'

// 1. Import our new, self-contained popup component
import { MessageFormPopup } from './MessageFormPopup'
import { FaTelegram, FaWhatsapp } from 'react-icons/fa'
import { usePathname } from 'next/navigation'

export function HelpSidebar() {
  const pathname=usePathname()
  if (pathname.startsWith("/dashboard")) {
    return null
  }
  return (
    <Sheet>
      <SheetTrigger asChild>
        <div className='fixed top-1/2 -translate-y-1/2 right-0 z-50 cursor-pointer'>
          <div className='flex flex-col items-center justify-center gap-4 p-2  bg-secondary transition-colors duration-300 rounded-t-full shadow-lg '>
            <Avatar className='h-13 w-13 border-2 border-white/80'>
              <AvatarImage src='/favicon.ico' alt='logo' />
              <AvatarFallback>SH</AvatarFallback>
            </Avatar>
            <p className='font-bold  text-xl text-white [writing-mode:vertical-rl] rotate-180'>
              Need Help?
            </p>
          </div>
        </div>
      </SheetTrigger>

      <SheetContent className='fixed top-1/2 -translate-y-1/2 right-0 z-50  bg-primary text-white border-l-gray-800 w-[250px] h-64 p-4 rounded-xl'>
        <SheetHeader>
          <TypingAnimation className='text-left text-lg font-bold text-white'>
            We are here for you.
          </TypingAnimation>
        </SheetHeader>

        {/* This is the main container inside your SheetContent */}
        <div className='flex flex-col gap-6'>
          {/* --- Group 1: Primary Actions --- */}
          <a href='tel:+8801805212243' className='flex items-center gap-4 group text-lg'>
            <Phone className='h-7 w-7 text-secondary' />
            <span className='group-hover:underline'>Call Us Now</span>
          </a>

          {/* Your message popup component */}
          <MessageFormPopup />

          {/* --- Group 2: Social Media Icons Section --- */}
          {/* pt-6 adds space, border-t creates a separator line */}
          <div className='pt-2 border-t border-white/20'>
            {/* This div arranges the icons horizontally with a gap */}
            <div className='flex items-center gap-4'>
              <span className='text-base text-gray-300'>Or connect on:</span>

              <a
                href='https://wa.me/+8801805212243'
                target='_blank'
                rel='noopener noreferrer'
                title='WhatsApp'
              >
                {/* Your colors are correct! text-green-500 works perfectly. */}
                <FaWhatsapp className='text-green-500 w-8 h-8 hover:opacity-80 transition-opacity cursor-pointer' />
              </a>

              <a
                href='https://telegram.me/jubutix'
                target='_blank'
                rel='noopener noreferrer'
                title='Telegram'
              >
                {/* Your colors are correct! text-sky-500 works perfectly. */}
                <FaTelegram className='text-sky-500 w-8 h-8 hover:opacity-80 transition-opacity cursor-pointer' />
              </a>
            </div>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  )
}
