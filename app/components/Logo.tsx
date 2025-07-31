import Image from 'next/image'
import favicon from '../../public/favicon.png'

const Logo = () => (
  <div className='flex items-center text-primary'>
    <div>
      <Image src={favicon} width={40} height={40} alt='Jubutix Logo' />
    </div>
    <span className='font-extrabold text-xl font-bold text-primary'>JUBUTIX</span>
  </div>
)

export default Logo
