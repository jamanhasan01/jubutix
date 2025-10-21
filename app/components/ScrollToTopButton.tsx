'use client'

import { ArrowUp } from 'lucide-react'
import { usePathname } from 'next/navigation'
import React, { useState, useEffect } from 'react'

const ScrollToTopButton: React.FC = () => {
  const pathname = usePathname()

  const [isVisible, setIsVisible] = useState(false)



  const scrollToTop = () => {
    if (typeof window !== 'undefined') {
      window.scrollTo({ top: 0, behavior: 'smooth' })
    }
  }

  useEffect(() => {
    const toggleVisibility = () => {
      if (window.scrollY > 300) {
        setIsVisible(true)
      } else {
        setIsVisible(false)
      }
    }

    window.addEventListener('scroll', toggleVisibility)

    return () => window.removeEventListener('scroll', toggleVisibility)
  }, [])
  if (!isVisible) {
    return null
  }

  
  return (
    <button
      onClick={scrollToTop}
      aria-label='Scroll to top'
      className='fixed bottom-5 left-1/2 -translate-x-1/2 z-50 bg-primary text-white p-3 rounded-full shadow-lg hover:bg-slate-700 transition duration-300 ease-in-out transform hover:scale-105'
    >
      <ArrowUp className='w-5 h-5' />
    </button>
  )
}

export default ScrollToTopButton
