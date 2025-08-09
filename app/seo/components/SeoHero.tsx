import Button from '../../components/Button'
import Title from '../../components/Title'
export function SeoHero() {
  return (
    <section className='flex  w-full items-center justify-center bg-primary'>
      <div className='container flex-col items-center justify-center gap-y-2 px-4 text-center text-white'>
        <Title
          title='Power of Search Engine Optimization'
          subTitle='GOOGLE RECEIVES 63,000+ SEARCHES EVERY SECOND!'
          h='text-white '
          p='text-white'
        />
        <h2 className='text-white'></h2>

        <Button text={`Let's Get Some of that Traffic!`} classname='mx-auto'></Button>
      </div>
    </section>
  )
}
