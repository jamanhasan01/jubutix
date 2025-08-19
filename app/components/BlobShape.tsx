// components/BlobShape.tsx
import { motion } from 'framer-motion'

export const BlobShape = () => {
  return (
    <motion.div
      // Optional: Add some animation
      animate={{ rotate: 360 }}
      transition={{ duration: 40, repeat: Infinity, ease: 'linear' }}
      className='w-[700px] h-[700px]' // Adjust size as needed
    >
      <svg
        viewBox='0 0 1000 1000'
        xmlns='http://www.w3.org/2000/svg'
        className='w-full h-full'
      >
        <defs>
          <linearGradient id='blobGradient' gradientTransform='rotate(45)'>
            {/* Start Color (like the yellow in your image) */}
            <stop offset='0%' stopColor='#F59E0B' />
            {/* End Color (like the orange in your image) */}
            <stop offset='100%' stopColor='#EF4444' />
          </linearGradient>
        </defs>
        <path
          d='M815.5,567Q750,634,697,713.5Q644,793,549.5,820Q455,847,364,813Q273,779,195,716Q117,653,111.5,551Q106,449,114.5,350Q123,251,192.5,190.5Q262,130,357.5,108Q453,86,541,114.5Q629,143,710,195Q791,247,838,323.5Q885,400,815.5,567Z'
          fill='url(#blobGradient)'
        ></path>
      </svg>
    </motion.div>
  )
}