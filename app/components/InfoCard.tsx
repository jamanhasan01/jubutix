// components/InfoCard.tsx
'use client'

// 👇 Import ReactNode from 'react'
import { type ReactNode } from 'react'
// 👇 Framer Motion types are imported separately
import { motion, type Variants } from 'framer-motion'

interface InfoCardProps {
  icon: ReactNode
  title: string
  subtitle: string
  className?: string
  variants?: Variants
}

const InfoCard = ({ icon, title, subtitle, className, variants }: InfoCardProps) => {
  return (
    <motion.div
      variants={variants}
      className={`absolute flex items-center gap-3 rounded-xl border border-white/20 bg-white/80 p-2 shadow-lg backdrop-blur-sm ${className}`}
    >
      {/* Icon with colored background */}
      {icon}

      {/* Text Content */}
      <div className='flex flex-col'>
        <p className='text-sm font-bold text-gray-800'>{title}</p>
        <p className='text-xs text-gray-500'>{subtitle}</p>
      </div>
    </motion.div>
  )
}

// A helper for creating the icon with its background
export const CardIcon = ({
  icon: Icon,
  bgColor,
  color,
}: {
  icon: React.ElementType
  bgColor: string
  color: string
}) => (
  <div className={`flex h-8 w-8 items-center justify-center rounded-full ${bgColor}`}>
    <Icon className={`h-4 w-4 ${color}`} />
  </div>
)

export default InfoCard