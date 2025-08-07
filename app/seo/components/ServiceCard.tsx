'use client'

// 1. Import 'motion' from the 'framer-motion' library
import { motion } from 'framer-motion'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'

interface ServiceCardProps {
  title: string
  description: string
  icon: React.ReactNode
}

const ServiceCard = ({ title, description, icon }: ServiceCardProps) => {
  return (
    // 2. Wrap the Card in a `motion.div` and apply the hover animation to it
    <motion.div whileHover={{ scale: 1.05, y: -5 }} >
      <Card className=' border-2 border-muted/50 shadow-md hover:shadow-lg transition-shadow duration-200 flex flex-col'>
        <CardHeader className=' '>
          {/* Use mx-auto to center the icon container */}
          <div className='mx-left flex h-14 w-14 items-center justify-center rounded-lg bg-primary/10 text-primary mb-2'>
            {icon}
          </div>
          <CardTitle className='text-2xl font-semibold text-primary' >{title}</CardTitle>
        </CardHeader>
        <CardContent className=' text-muted-foreground -mt-2'>
          <p className='text-lg'>{description}</p>
        </CardContent>
      </Card>
    </motion.div>
  )
}

export default ServiceCard
