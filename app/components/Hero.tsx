import { ArrowUpRight } from 'lucide-react'
import { Badge } from '@/components/ui/badge'
import Button from './Button'
import { StaticImageData } from 'next/image'

interface heroProps {
  heading: string
  desc: string
  img: StaticImageData
}

const Hero = ({ heading, desc,  }: heroProps) => {
  return (
    <section className='relative isolate overflow-hidden'>
      {/* Blurred background blob */}
      <div className='absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-teal-500/20 rounded-full blur-[150px] z-[-1]'></div>

      <div className='container py-0'>
        {/* Main flex layout */}
        <div className='min-h-screen flex flex-col items-center justify-center text-center'>
          <Badge className='border-secondary/50 bg-white/10 text-secondary' variant='outline'>
            ✨ Your Website Builder
            <ArrowUpRight className='ml-2 size-4' />
          </Badge>

          <h1 className='my-6'>{heading}</h1>
          <p className='mx-auto max-w-2xl'>{desc}</p>

          <div className=' flex flex-col sm:flex-row items-center justify-center gap-4'>
            <Button text='Get a Free Audit' classname='' />
          </div>
        </div>
      </div>
    </section>
  )
}

export default Hero
