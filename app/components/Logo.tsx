const Logo = () => (
  <div className='flex items-center gap-2'>
    {/* Placeholder for the violet 'VT' graphic */}
    <svg width='40' height='40' viewBox='0 0 100 100' className='text-brand-violet'>
      <path
        d='M20 20 L50 80 L80 20'
        stroke='currentColor'
        strokeWidth='12'
        fill='none'
        strokeLinecap='round'
        strokeLinejoin='round'
      />
      <path
        d='M40 50 L60 50'
        stroke='currentColor'
        strokeWidth='12'
        fill='none'
        strokeLinecap='round'
      />
    </svg>
    <div className='flex flex-col leading-tight'>
      <span className='font-bold text-zinc-800 text-base'>UT DIGITAL</span>
      <span className='text-xs text-brand-pink tracking-widest uppercase'>MEDIA</span>
    </div>
  </div>
)
export default Logo