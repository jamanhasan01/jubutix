import Link from 'next/link'
import Hero from '../components/Hero'

const CookiePolicyPage = () => {
  return (
    <main>
      <Hero heading={<>Cookie Policy</>} desc='' />
      <div className='container space-y-6'>
        <div>
          <h2>Our website uses cookie policy.</h2>
          <p className='!max-w-full mt-3'>
            Please read this cookie policy (“cookie policy”, "policy") carefully before using
            [https://jubutix.com/] website (“website”, "service") operated by [Red Sparrow Limited
            t/a Red Sparrow Digital] ("us", 'we", "our").
          </p>
        </div>
        <div>
          <h2>What are cookies?</h2>
          <p className='!max-w-full mt-3'>
            Cookies are simple text files that are stored on your computer or mobile device by a
            website’s server. Each cookie is unique to your web browser. It will contain some
            anonymous information such as a unique identifier, website’s domain name, and some
            digits and numbers.
          </p>
        </div>
        <div>
          <h2>How to delete cookies?</h2>
          <p className='!max-w-full mt-3'>
            If you want to restrict or block the cookies that are set by our website, you can do so
            through your browser setting. Alternatively, you can visit www.internetcookies.org,
            which contains comprehensive information on how to do this on a wide variety of browsers
            and devices. You will find general information about cookies and details on how to
            delete cookies from your device.
          </p>
        </div>
        <div>
          <h2>Contacting us</h2>
          <p className='!max-w-full mt-3'>
            If you have any questions about this policy or our use of cookies, please contact us.
          </p>
        </div>
      </div>
    </main>
  )
}

export default CookiePolicyPage
