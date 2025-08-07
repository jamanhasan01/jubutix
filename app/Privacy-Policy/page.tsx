// app/privacy-policy/page.tsx

import React from 'react'
import Hero from '../components/Hero'

const PolicySection = ({ title, children }: { title: string; children: React.ReactNode }) => (
  <section className='mb-10'>
    <h3 className='text-2xl md:text-3xl font-bold text-slate-800 mb-2'>{title}</h3>
    <div className='prose prose-lg max-w-none text-slate-700 prose-li:mb-2 prose-ul:list-disc prose-ul:list-inside'>
      {children}
    </div>
  </section>
)

const PrivacyPolicyPage = () => {
  return (
    <div className='bg-slate-50 font-sans text-slate-700 antialiased'>
      {/* Header Section */}

      <Hero
        heading={
          <>
            Our Privacy Policy :
            <br />
            How We Keep Your Info Safe
          </>
        }
        desc='We believe in being clear and open about how we handle your personal information. Your trust is super important to us!'
        btn={false}
      />

      {/* Main Content Section */}
      <main className='bg-gray-50'>
        <div className='container mx-auto px-6 max-w-4xl'>
          <div className='text-center mb-12 md:mb-16'>
            <h2 className='text-4xl md:text-5xl font-bold text-slate-800'>
              Understanding Our Privacy Rules
            </h2>
            <p className='mt-4 text-lg text-slate-600 leading-relaxed max-w-3xl mx-auto'>
              This page tells you how Jubutix Agency collects, uses, and protects your information
              when you visit our website or use our services.
            </p>
          </div>

          <PolicySection title='Who We Are'>
            <p className='max-w-full'>
              Jubutix Agency (we, us, or our) is a marketing agency that helps online stores grow.
              You can find us at: 343/2 Choto Alampur, Debidwar, Comilla, Bangladesh.
            </p>
          </PolicySection>

          <PolicySection title='What Information We Collect'>
            <p className='max-w-full'>
              When you visit our website or talk to us, we might collect different kinds of
              information:
            </p>
            <h4 className='font-semibold mt-4 text-2xl '>Personal Information:</h4>
            <p className='max-w-full'>
              This is info that can tell us who you are. We collect this when you:
            </p>
            <ul>
              <li>Fill out a contact form (like your name, email, phone number).</li>
              <li>Sign up for our newsletter or free checklist (your email).</li>
              <li>Apply for our services (more details like your business name).</li>
            </ul>
            <h4 className='font-semibold mt-4'>Usage Data:</h4>
            <p className='max-w-full'>
              This is info about how you use our website. It helps us make our website better. This
              includes things like:
            </p>
            <ul>
              <li>Which pages you visit.</li>
              <li>How long you stay on each page.</li>
              <li>What you click on.</li>
              <li>Your IP address (a number that identifies your computer on the internet).</li>
              <li>The type of device you are using (like a phone or computer).</li>
            </ul>
          </PolicySection>

          <PolicySection title='How We Collect Your Information'>
            <p className='max-w-full'>We collect information in a few ways:</p>
            <ul>
              <li>
                <strong>Directly from You:</strong> When you type it into our forms or send us an
                email.
              </li>
              <li>
                <strong>Automatically:</strong> When you browse our website, we use cookies and
                similar tools. Think of cookies like tiny notes that our website leaves on your
                computer to remember things about your visit.
              </li>
            </ul>
          </PolicySection>

          <PolicySection title='How We Use Your Information'>
            <p className='max-w-full'>We use the information we collect to:</p>
            <ul>
              <li>Answer your questions and provide the services you ask for.</li>
              <li>Make our website better and easier for you to use.</li>
              <li>
                Send you helpful newsletters, updates about our services, promotions, or events
                (only if you say it is okay).
              </li>
              <li>Understand how people use our website so we can improve our marketing.</li>
              <li>Keep our website safe and secure.</li>
            </ul>
          </PolicySection>

          <PolicySection title='How We Share Your Information'>
            <p className='max-w-full'>
              We do not sell your personal information. We might share it in very specific
              situations:
            </p>
            <ul>
              <li>
                <strong>With Trusted Helpers:</strong> We use other companies to help us run our
                business (like sending emails or analyzing website data). They only get the info
                they need to do their job and must keep it safe. This sharing is only for necessary
                business operations.
              </li>
              <li>
                <strong>If the Law Says So:</strong> If a law or court order tells us we have to
                share information, we will.
              </li>
              <li>
                <strong>If Our Business Changes Hands:</strong> If Jubutix Agency were to be bought
                by another company, your information might be part of that transfer. We would let
                you know if this happens.
              </li>
            </ul>
          </PolicySection>

          <PolicySection title='Anti-Spam Policy'>
            <p className='max-w-full'>
              Jubutix Agency follows a strict Anti-Spam policy. This means we do not send unwanted
              email messages, notifications, or any other messages you have not asked for. We only
              send communications to people who have given us permission.
            </p>
          </PolicySection>

          <PolicySection title='Cookies and Tracking Tools'>
            <p className='max-w-full'>
              Cookies are small text files stored on your device. They help our website remember you
              and your preferences. We use them to:
            </p>
            <ul>
              <li>Make our website work correctly.</li>
              <li>
                Understand how you use our site (like which pages are popular) using tools like
                Google Analytics.
              </li>
              <li>
                Show you ads that might be more interesting to you (this is called remarketing).
              </li>
            </ul>
            <p className='max-w-full'>
              This information collected by cookies is usually anonymous and helps us optimize your
              user experience, content, and marketing. If you do not want to see remarketing ads,
              you can often opt out by visiting the Google Ads Preferences Manager.
            </p>
            <p className='max-w-full'>
              You can choose to turn off cookies in your web browser settings if you do not want
              them. But if you do, some parts of our website might not work as well.
            </p>
          </PolicySection>

          <PolicySection title='Keeping Your Information Safe'>
            <p className='max-w-full'>
              We work hard to protect your information. We use good security measures to keep your
              data safe from being lost, stolen, or used in a way it should not be.
            </p>
          </PolicySection>

          <PolicySection title='Your Rights About Your Information'>
            <p className='max-w-full'>You have rights regarding your personal information:</p>
            <ul>
              <li>
                <strong>See Your Info:</strong> You can ask us to show you what personal information
                we have about you.
              </li>
              <li>
                <strong>Fix Your Info:</strong> If your info is wrong, you can ask us to correct it.
              </li>
              <li>
                <strong>Delete Your Info:</strong> In some cases, you can ask us to delete your
                personal information.
              </li>
              <li>
                <strong>Stop Marketing:</strong> You can always tell us to stop sending you
                marketing emails by clicking the unsubscribe link in our emails or by contacting us
                directly.
              </li>
            </ul>
            <p className='max-w-full'>
              To use any of these rights, just contact us using the info below.
            </p>
          </PolicySection>

          <PolicySection title="Kids' Privacy">
            <p className='max-w-full'>
              Our website is not for kids under 13. We do not knowingly collect personal information
              from children under 13. If you think a child has given us their info, please tell us,
              and we will remove it.
            </p>
          </PolicySection>

          <PolicySection title='Changes to This Policy'>
            <p className='max-w-full'>
              We might update this Privacy Policy sometimes. If we make big changes, we will put the
              new version on this page and change the <i>Last Updated</i> date. Please check back
              here once in a while to stay informed.
            </p>
          </PolicySection>

          <PolicySection title='Last Updated'>
            <p className='max-w-full'>August 5, 2025</p>
          </PolicySection>

          <PolicySection title='Contact Us'>
            <p className='max-w-full'>
              If you have any questions about this Privacy Policy, please get in touch:
            </p>
            <ul>
              <li>
                <strong>Email:</strong> contact@jubutix.com
              </li>
              <li>
                <strong>Phone:</strong> +880 1805-212243
              </li>
              <li>
                <strong>Address:</strong> 343/2 Choto Alampur, Debidwar, Comilla, Bangladesh
              </li>
            </ul>
          </PolicySection>
        </div>
      </main>
    </div>
  )
}

export default PrivacyPolicyPage
