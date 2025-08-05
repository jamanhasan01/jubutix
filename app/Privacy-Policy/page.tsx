import type { Metadata } from 'next'

import Hero from '../components/Hero'

export const metadata: Metadata = {
  title: 'Our Privacy Policy: How We Keep Your Info Safe | Jubutix Agency',
  description:
    'We believe in being clear and open about how we handle your personal information. Learn how Jubutix Agency protects your data.',
}

const PrivacyPolicyPage = () => {
  return (
    <main className='bg-background text-foreground'>
      <Hero
        heading='Our Privacy Policy
How We Keep Your Info Safe'
        desc='We believe in being clear and open about how we handle your personal information. Your trust is super important to us!'
        btn={false}
      />
      <div className='container'>
        {/* Article content with a large vertical space between each centered section */}
        <article className='space-y-16'>
          {/* === Each section now uses this centered layout === */}
          <section>
            <div className='text-center max-w-3xl mx-auto'>
              <h2 className='text-3xl font-bold tracking-tight text-slate-800 dark:text-slate-100'>
                Understanding Our Privacy Rules
              </h2>
              <p className='mt-4 text-lg leading-relaxed text-slate-600 dark:text-slate-400'>
                This page tells you how Jubutix Agency collects, uses, and protects your information
                when you visit our website or use our services.
              </p>
            </div>
          </section>

          <section>
            <div className='text-center max-w-3xl mx-auto'>
              <h2 className='text-3xl font-bold tracking-tight text-slate-800 dark:text-slate-100'>
                Who We Are
              </h2>
              <p className='mt-4 text-lg leading-relaxed text-slate-600 dark:text-slate-400'>
                Jubutix Agency  is a marketing agency that helps online stores
                grow. You can find us at: 343/2 Choto Alampur, Debidwar, Comilla, Bangladesh.
              </p>
            </div>
          </section>

          <section>
            <div className='text-center max-w-3xl mx-auto'>
              <h2 className='text-3xl font-bold tracking-tight text-slate-800 dark:text-slate-100'>
                What Information We Collect
              </h2>
              <div className='mt-4 text-lg leading-relaxed text-slate-600 dark:text-slate-400 space-y-3'>
                <p>
                  When you visit our website or talk to us, we might collect different kinds of
                  information:
                </p>
                <p>
                  <strong>Personal Information:</strong> Info that can tell us who you are,
                  collected from forms, sign-ups, or service applications.
                </p>
                <p>
                  <strong>Usage Data:</strong> Info about how you use our website, like pages
                  visited, time on page, clicks, IP address, and device type.
                </p>
              </div>
            </div>
          </section>

          {/* Continue this pattern for all other sections */}
          <section>
            <div className='text-center max-w-3xl mx-auto'>
              <h2 className='text-3xl font-bold tracking-tight text-slate-800 dark:text-slate-100'>
                How We Use Your Information
              </h2>
              <p className='mt-4 text-lg leading-relaxed text-slate-600 dark:text-slate-400'>
                We use the information we collect to answer your questions, improve our website,
                send you marketing (with your permission), understand user behavior, and keep our
                site secure.
              </p>
            </div>
          </section>

          <section>
            <div className='text-center max-w-3xl mx-auto'>
              <h2 className='text-3xl font-bold tracking-tight text-slate-800 dark:text-slate-100'>
                Contact Us
              </h2>
              <p className='mt-4 text-lg leading-relaxed text-slate-600 dark:text-slate-400'>
                If you have any questions about this Privacy Policy, please get in touch:
              </p>
              <div className='mt-4 text-lg space-y-2'>
                <p>
                  <a
                    href='mailto:contact@jubutix.com'
                    className='font-medium text-primary hover:underline'
                  >
                    contact@jubutix.com
                  </a>
                </p>
                <p>
                  <a href='tel:+8801805212243' className='font-medium text-primary hover:underline'>
                    +880 1805-212243
                  </a>
                </p>
                <p className='text-slate-600 dark:text-slate-400'>
                  343/2 Choto Alampur, Debidwar, Comilla, Bangladesh
                </p>
              </div>
            </div>
          </section>
        </article>
      </div>
    </main>
  )
}

export default PrivacyPolicyPage
