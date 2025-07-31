'use client'

import React, { useCallback, useEffect, useRef, useState } from 'react'

// Utility to join class names
function cn(...classes: (string | false | null | undefined)[]) {
  return classes.filter(Boolean).join(' ')
}

export function Marquee({
  className,
  children,
}: {
  className?: string
  children: React.ReactNode
}) {
  const containerRef = useRef<HTMLDivElement>(null)
  const [containerWidth, setContainerWidth] = useState(0)
  const [squares, setSquares] = useState<number[]>([])

  const generateSquares = useCallback(() => {
    if (!containerRef.current) return
    const containerWidth = containerRef.current.offsetWidth
    const squareSize = 80
    const numSquares = Math.ceil(containerWidth / squareSize)
    const newSquares = Array.from({ length: numSquares }, (_, i) => i)
    setSquares(newSquares)
    setContainerWidth(containerWidth)
  }, [])

  useEffect(() => {
    generateSquares()

    const container = containerRef.current
    if (!container) return

    const observer = new ResizeObserver((entries) => {
      const entry = entries[0]
      const width = entry.contentRect.width
      setContainerWidth(width)
      generateSquares()
    })

    observer.observe(container)

    return () => {
      observer.unobserve(container)
    }
  }, [generateSquares])

  return (
    <div ref={containerRef} className={cn('overflow-hidden relative w-full', className)}>
      <div className='flex space-x-4 animate-marquee'>
        {squares.map((square) => (
          <div key={square} className='w-20 h-20 bg-blue-500 rounded' />
        ))}
      </div>

      {/* Optional: place children on top */}
      {children && (
        <div className='absolute inset-0 flex items-center justify-center pointer-events-none'>
          {children}
        </div>
      )}
    </div>
  )
}
