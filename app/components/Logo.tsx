import Image from 'next/image'

const Logo = () => (
  <div className='flex items-center text-primary'>
    <div>
      <Image src='/favicon.png' width={40} height={40} alt='logo' />
    </div>
    <span className='font-bold text-2xl text-primary'>JUBUTIX</span>
  </div>
)

export default Logo
