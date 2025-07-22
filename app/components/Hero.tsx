import { ArrowUpRight } from 'lucide-react'
import { Badge } from '@/components/ui/badge'
import Button from './Button'
import Image, { StaticImageData } from 'next/image'

interface heroProps {
  heading: string
  desc: string
  img: StaticImageData
}

const Hero = ({ heading, desc, img }: heroProps) => {
  return (
    // 1. Setup the parent section for positioning and layering
    <section className='relative isolate overflow-hidden'>
      {/* 2. This is the blurred blob element */}
      <div className='absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-teal-500/20 rounded-full blur-[150px] z-[-1]'></div>

      {/* 3. Your content container stays on top */}
      <div className='container'>
        <div className='grid items-center gap-8 lg:grid-cols-12 py-16'>
          <div className='lg:col-span-8 flex flex-col items-center text-center lg:items-start lg:text-left'>
            <Badge className='border-white/50 bg-white/10 text-white' variant='outline'>
              {'✨ Your Website Builder'}
              <ArrowUpRight className='ml-2 size-4' />
            </Badge>
            <h1 className='my-6'>{heading}</h1>
            <p className='ml-0'>{desc}</p>
            <div className=' flex w-full flex-col justify-center gap-4 sm:flex-row lg:justify-start'>
              <Button text='Work With Us' classname='' />
            </div>
          </div>

          <div className='lg:col-span-4 w-full'>
            <Image
              className='w-full'
              src={img}
              width={1200}
              height={1200}
              alt='Digital Marketing Hero Image'
            ></Image>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Hero
