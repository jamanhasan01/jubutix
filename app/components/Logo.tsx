import Image from 'next/image'
import favicon from '../../public/favicon.png'
import Link from 'next/link'

const Logo = () => (
  <Link href={'/'} className='flex items-center text-primary'>
    <div>
      <Image src={favicon} width={40} height={40} alt='Jubutix Logo' />
    </div>
    <span className='font-extrabold text-xl font-bold text-primary'>JUBUTIX</span>
  </Link>
)

export default Logo
