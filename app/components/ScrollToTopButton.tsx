'use client'

import { ArrowUp } from 'lucide-react'

const ScrollToTopButton = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  return (
    <button
      onClick={scrollToTop}
      aria-label='Scroll to top'
      className='fixed bottom-5 left-1/2 transform -translate-x-1/2 z-50 bg-slate-800 text-white p-3 rounded-full shadow-md hover:bg-slate-700 transition'
    >
      <ArrowUp className='w-5 h-5' />
    </button>
  )
}

export default ScrollToTopButton
