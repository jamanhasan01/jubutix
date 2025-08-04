'use client'

import { ArrowUp } from 'lucide-react'
import React from 'react'

const ScrollToTopButton: React.FC = () => {
  const scrollToTop = () => {
    if (typeof window !== 'undefined') {
      window.scrollTo({ top: 0, behavior: 'smooth' })
    }
  }

  return (
    <button
      onClick={scrollToTop}
      aria-label='Scroll to top'
      className='fixed bottom-5 left-1/2 -translate-x-1/2 z-50 bg-primary text-white p-3 rounded-full shadow-md hover:bg-slate-700 transition'
    >
      <ArrowUp className='w-5 h-5' />
    </button>
  )
}

export default ScrollToTopButton
