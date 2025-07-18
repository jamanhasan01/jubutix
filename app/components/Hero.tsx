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
    <section>
      <div className='container'>
        <div className='grid items-center gap-8 lg:grid-cols-12'>
          <div className='lg:col-span-8 flex flex-col items-center text-center lg:items-start lg:text-left'>
            <Badge variant='outline'>
              {'✨ Your Website Builder'}
              <ArrowUpRight className='ml-2 size-4' />
            </Badge>
            <h1 className='my-6'>{heading}</h1>
            <p className='text-muted-foreground mb-8 max-w-xl lg:text-xl'>{desc}</p>
            <div className='flex w-full flex-col justify-center gap-2 sm:flex-row lg:justify-start'>
              <Button text='Work With Us' />
            </div>
          </div>

          {/* ✅ Changed this line */}
          <div className='lg:col-span-4 w-full '>
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
