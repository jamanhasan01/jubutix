import { FaTelegram, FaWhatsapp } from 'react-icons/fa'

const FixedSocialIcons = () => {
  return (
    <div className='fixed right-5 top-1/2 -translate-y-1/2'>
      <div className='flex flex-col gap-4 text-4xl'>
        <a href='https://wa.me/+8801805212243' target='_blank' rel='noopener noreferrer'>
          <FaWhatsapp className='text-green-500 hover:text-green-600 cursor-pointer' />
        </a>

        <a href='https://telegram.me/jubutix' target='_blank' rel='noopener noreferrer'>
          <FaTelegram className='text-sky-500 hover:text-sky-600 cursor-pointer' />
        </a>
      </div>
    </div>
  )
}

export default FixedSocialIcons
