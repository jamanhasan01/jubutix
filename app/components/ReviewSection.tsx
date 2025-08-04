'use client'

import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { FaStar, FaStarHalfAlt, FaRegStar, FaArrowLeft, FaArrowRight } from 'react-icons/fa'
import { cn } from '@/lib/utils'
import Image from 'next/image' // 1. Import the Next.js Image component
import Title from './Title'

// Sample data for reviews. Replace this with your actual data.
const reviews = [
  {
    id: 1,
    name: 'Sarah L.',
    title: 'Founder of TechNova',
    avatar: 'https://i.pravatar.cc/150?u=a042581f4e29026704d',
    rating: 5,
    quote:
      'Working with this team was a game-changer. Our organic traffic skyrocketed, and their strategic insights were invaluable. A truly professional and results-driven team.',
  },
  {
    id: 2,
    name: 'Michael B.',
    title: 'Marketing Director, ShopSphere',
    avatar: 'https://i.pravatar.cc/150?u=a042581f4e29026704e',
    rating: 5,
    quote:
      'The ROI on our Meta Ads campaign has been phenomenal. They are transparent, communicative, and incredibly skilled at what they do. I cannot recommend them enough.',
  },
  {
    id: 3,
    name: 'Jessica T.',
    title: 'CEO, Creative Solutions',
    avatar: 'https://i.pravatar.cc/150?u=a042581f4e29026704f',
    rating: 4.5,
    quote:
      'They delivered on their promise to get us on Page 1. The team is knowledgeable, responsive, and a pleasure to work with. Our lead quality has improved dramatically.',
  },
  {
    id: 4,
    name: 'David Chen',
    title: 'E-commerce Manager',
    avatar: 'https://i.pravatar.cc/150?u=a042581f4e29026704a',
    rating: 5,
    quote:
      "Our CPA is the lowest it's ever been. The detailed reports and proactive optimizations have given us a huge competitive edge. Highly skilled and highly recommended.",
  },
]

// Helper to render stars based on rating
const StarRating = ({ rating }: { rating: number }) => {
  const stars = []
  for (let i = 1; i <= 5; i++) {
    if (i <= rating) {
      stars.push(<FaStar key={i} className='text-amber-400' />)
    } else if (i === Math.ceil(rating) && !Number.isInteger(rating)) {
      stars.push(<FaStarHalfAlt key={i} className='text-amber-400' />)
    } else {
      stars.push(<FaRegStar key={i} className='text-slate-500' />)
    }
  }
  return <div className='flex items-center gap-1'>{stars}</div>
}

const variants = {
  enter: (direction: number) => ({
    x: direction > 0 ? 1000 : -1000,
    opacity: 0,
  }),
  center: {
    zIndex: 1,
    x: 0,
    opacity: 1,
  },
  exit: (direction: number) => ({
    zIndex: 0,
    x: direction < 0 ? 1000 : -1000,
    opacity: 0,
  }),
}

const swipeConfidenceThreshold = 10000
const swipePower = (offset: number, velocity: number) => {
  return Math.abs(offset) * velocity
}

const ReviewsSection = () => {
  const [[page, direction], setPage] = useState([0, 0])
  const reviewIndex = page % reviews.length

  const paginate = (newDirection: number) => {
    let newPage = page + newDirection
    if (newPage < 0) newPage = reviews.length - 1
    setPage([newPage, newDirection])
  }

  const currentReview = reviews[reviewIndex < 0 ? reviews.length + reviewIndex : reviewIndex]

  return (
    <section className='relative w-full overflow-hidden bg-primary'>
      {/* Background Grid - consistent with the previous section */}
      <div className='absolute inset-0 z-0'>
        <div className='absolute inset-0 bg-[radial-gradient(ellipse_80%_80%_at_50%_-20%,rgba(120,119,198,0.3),rgba(255,255,255,0))]'></div>
        <div
          className='absolute inset-0 h-full w-full bg-transparent'
          style={{
            backgroundImage:
              'linear-gradient(to right, #1f2937 1px, transparent 1px), linear-gradient(to bottom, #1f2937 1px, transparent 1px)',
            backgroundSize: '40px 40px',
            opacity: 0.2,
          }}
        ></div>
      </div>

      <div className='container relative z-10 mx-auto max-w-4xl px-4'>
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 0.5 }}
          className='mb-12 text-center'
        >
          <Title
            title='Trusted by Leaders in the Industry'
            subTitle=' Hear what our clients have to say about their success.'
            h='text-secondary'
            p='text-white'
          />
        </motion.div>

        <div className='relative h-[24rem] md:h-[20rem]'>
          <AnimatePresence initial={false} custom={direction}>
            <motion.div
              key={page}
              custom={direction}
              variants={variants}
              initial='enter'
              animate='center'
              exit='exit'
              transition={{
                x: { type: 'spring', stiffness: 300, damping: 30 },
                opacity: { duration: 0.2 },
              }}
              drag='x'
              dragConstraints={{ left: 0, right: 0 }}
              dragElastic={1}
              onDragEnd={(e, { offset, velocity }) => {
                const swipe = swipePower(offset.x, velocity.x)
                if (swipe < -swipeConfidenceThreshold) {
                  paginate(1)
                } else if (swipe > swipeConfidenceThreshold) {
                  paginate(-1)
                }
              }}
              className='absolute flex h-full w-full cursor-grab flex-col items-center justify-center active:cursor-grabbing'
            >
              <div className='w-full max-w-xl rounded-xl border border-slate-700 bg-slate-800/50 p-8 shadow-lg backdrop-blur-sm'>
                <div className='flex items-center gap-4'>
                  {/* 2. This is the updated Image component */}
                  <Image
                    src={currentReview.avatar}
                    alt={currentReview.name}
                    width={56}
                    height={56}
                    className='h-14 w-14 rounded-full border-2 border-slate-600'
                  />
                  <div>
                    <p className='font-semibold text-white'>{currentReview.name}</p>
                    <p className='text-sm text-slate-400'>{currentReview.title}</p>
                  </div>
                  <div className='ml-auto'>
                    <StarRating rating={currentReview.rating} />
                  </div>
                </div>
                <blockquote className='mt-6 border-l-4 border-cyan-500 pl-4 text-lg italic text-slate-200'>
                  {currentReview.quote}
                </blockquote>
              </div>
            </motion.div>
          </AnimatePresence>

          {/* Navigation Buttons */}
          <div className='absolute top-1/2 left-0 z-20 -translate-y-1/2 md:-left-16'>
            <button
              onClick={() => paginate(-1)}
              className='group rounded-full bg-white/10 p-3 text-white transition-colors hover:bg-white/20'
              aria-label='Previous review'
            >
              <FaArrowLeft className='h-5 w-5 transition-transform group-hover:scale-110' />
            </button>
          </div>
          <div className='absolute top-1/2 right-0 z-20 -translate-y-1/2 md:-right-16'>
            <button
              onClick={() => paginate(1)}
              className='group rounded-full bg-white/10 p-3 text-white transition-colors hover:bg-white/20'
              aria-label='Next review'
            >
              <FaArrowRight className='h-5 w-5 transition-transform group-hover:scale-110' />
            </button>
          </div>
        </div>

        {/* Pagination Dots */}
        <div className='mt-8 flex justify-center space-x-2'>
          {reviews.map((_, i) => (
            <button
              key={i}
              onClick={() => setPage([i, i > reviewIndex ? 1 : -1])}
              className={cn(
                'h-2 w-2 rounded-full transition-all duration-300',
                reviewIndex === i ? 'w-4 bg-cyan-400' : 'bg-slate-600 hover:bg-slate-400'
              )}
              aria-label={`Go to review ${i + 1}`}
            />
          ))}
        </div>
      </div>
    </section>
  )
}

export default ReviewsSection
