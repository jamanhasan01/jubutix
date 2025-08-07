import Image from 'next/image'
import Title from '../../components/Title'
let channelLogo = [
  '/gazi-tv-bd.png',
  '/gazi-tv-bd.png',
  '/gazi-tv-bd.png',
  '/gazi-tv-bd.png',
  '/gazi-tv-bd.png',
  '/gazi-tv-bd.png',
]

const Feature = () => {
  return (
    <section className='bg-gray-100'>
      <div className='container'>
        <Title title='Featured In' subTitle='' />
        <div className='grid grid-cols-6 gap-4'>
          {channelLogo.map((logo) => (
            <Image
              className='w-60 h-26 bg-white p-2 rounded-lg'
              src={`${logo}`}
              width={300}
              height={150}
              alt='tv chalnel'
            ></Image>
          ))}
        </div>
      </div>
    </section>
  )
}

export default Feature
