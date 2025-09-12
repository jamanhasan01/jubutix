import Button from '@/app/components/Button'

export function CtaSection() {
  return (
    <section className='w-full'>
      <div className='container !py-26 bg-primary mx-auto flex  flex-col items-center justify-center gap-4 rounded-xl  text-center text-white md:p-12'>
        <h2 className='text-4xl text-white font-bold tracking-tight md:text-5xl lg:text-6xl'>
          Ready to Scale Your E-commerce Sales?
        </h2>
        <p className='max-w-2xl text-lg text-indigo-100 md:text-xl'>
          Let Jubutix take your Google Ads performance to the next level.
        </p>
        <div className=''>
          <Button text='Schedule Your Free Google Ads Consultation' />
        </div>
      </div>
    </section>
  )
}
