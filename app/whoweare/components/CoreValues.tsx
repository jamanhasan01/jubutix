import { Handshake, Telescope, Lightbulb, ShieldCheck } from 'lucide-react'

const values = [
  {
    icon: Handshake,
    title: 'Partnership',
    description: 'We work with you, not just for you. Your goals become our goals.',
  },
  {
    icon: Telescope,
    title: 'Transparency',
    description: 'Honest, clear communication and reporting. You always know where you stand.',
  },
  {
    icon: Lightbulb,
    title: 'Innovation',
    description: 'We constantly test, learn, and adapt to stay ahead of the curve.',
  },
  {
    icon: ShieldCheck,
    title: 'Integrity',
    description: 'Doing the right thing for your business, always. No shortcuts, no excuses.',
  },
]

const CoreValues = () => {
  return (
    <section className='bg-white'>
      <div className='container'>
        <h1 className='text-center'>Our Guiding Principles</h1>
        <p className='mt-4 text-lg text-gray-600 max-w-2xl mx-auto'>
          These values are the foundation of our work and the key to our clients success.
        </p>
        <div className='mt-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8'>
          {values.map((value) => (
            <div key={value.title} className='p-6 border rounded'>
              <div className='flex items-center justify-center h-16 w-16 rounded-full bg-blue-100 mx-auto'>
                <value.icon className='h-8 w-8 text-blue-600' />
              </div>
              <h3 className='mt-6 text-xl font-bold text-gray-900 text-center'>{value.title}</h3>
              <p className='mt-2 text-gray-600 text-center'>{value.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default CoreValues
