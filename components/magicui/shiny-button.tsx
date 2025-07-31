'use client'

import React, { ButtonHTMLAttributes, ReactNode } from 'react'
import { cn } from '@/lib/utils'

// Define props interface instead of using `any`
interface ShinyButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode
  className?: string
}

export const ShinyButton = ({ children, className, ...props }: ShinyButtonProps) => {
  return (
    <button
      className={cn(
        'relative inline-flex items-center justify-center rounded-md border border-transparent bg-blue-600 px-6 py-2 text-white font-medium transition-colors duration-300 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2',
        className
      )}
      {...props}
    >
      {children}
      <span className="absolute inset-0 rounded-md bg-gradient-to-r from-transparent via-white/20 to-transparent opacity-0 group-hover:opacity-100 transition duration-300"></span>
    </button>
  )
}
