// app/contact/page.tsx

import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { Button } from '@/components/ui/button'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
// import { BlurFade } from '@/components/magicui/blur-fade' // Removed to fix build error

import { Mail, Phone, MapPin, Twitter, Linkedin, Github ,Instagram} from 'lucide-react'


import { FaFacebook, FaTiktok ,FaYoutube  } from 'react-icons/fa';

// The array now has a 'color' property for the icon's default brand color.
const socialLinks = [
  {
    name: 'Facebook',
    icon: FaFacebook,
    href: 'https://www.facebook.com/jubutix',
    color: 'text-blue-600', // Facebook Blue
  },
  {
    name: 'Youtube',
    icon: FaYoutube,
    href: 'https://www.youtube.com/@jubutix',
    color: 'text-red-600', // YouTube Red
  },
  {
    name: 'TikTok',
    icon: FaTiktok,
    href: 'https://www.tiktok.com/@jubutix',
    color: 'text-black', // TikTok Black
  },
  {
    name: 'Instagram',
    icon: Instagram,
    href: 'https://www.instagram.com/jubutix',
    color: 'text-pink-500', // Instagram Pink
  },
];

const BlurFade = ({ children }: { children: React.ReactNode, delay: number, inView: boolean }) => {
    return <>{children}</>;
};

// Placeholder for Title component.
const Title = ({ title, subTitle, classname }: { title: string, subTitle: string, classname?: string }) => (
    <div className={classname}>
        <h1 className='text-3xl md:text-4xl font-bold tracking-tighter text-gray-900 dark:text-gray-50'>{title}</h1>
        <p className='mt-4 text-gray-600 dark:text-gray-400 max-w-2xl mx-auto md:mx-0'>{subTitle}</p>
    </div>
);

// --- End of Fix ---



// A reusable component for the contact items to avoid repetition
const ContactItem = ({ icon: Icon, text }: { icon: React.ElementType; text: string }) => (
    <div className='flex items-center justify-center md:justify-start gap-4'>
        <div className='bg-primary/10 dark:bg-primary/20 p-3 rounded-full'>
            <Icon className='h-5 w-5 text-primary' />
        </div>
        <span className='text-lg text-gray-800 dark:text-gray-200 text-left'>
            {text}
        </span>
    </div>
);


export default function ContactPage() {
  return (
    <div className='w-full min-h-screen bg-gray-50 dark:bg-black'>
      <div className='container grid grid-cols-1 md:grid-cols-2 gap-12 lg:gap-20 items-center px-4 py-16 lg:py-24'>
        {/* left Side: The Content */}
        <div className='text-center md:text-left'>
          <BlurFade delay={0.25} inView>
            <Title
              title='Lets Build Something Amazing'
              subTitle=' We are here to turn your vision into reality. Whether you have a question about our services, a project proposal, or just want to say hello, we would love to hear from you.'
              classname='text-left'
            ></Title>
          </BlurFade>

          <BlurFade delay={0.45} inView>
            {/* Updated contact info section with new styling */}
            <div className='mt-8 space-y-4'>
                <ContactItem icon={Mail} text="contact@jubutix.com" />
                <ContactItem icon={Phone} text="+880 1805-212243" />
                <ContactItem icon={MapPin} text="343/2 Choto Alampur, Debidwar, Comilla, Bangladesh" />
            </div>
          </BlurFade>

          <BlurFade delay={0.55} inView>
            {/* Social media icons now dynamically rendered with brand colors */}
            <div className='mt-12 flex justify-center md:justify-start space-x-2'>
              {socialLinks.map((social) => (
                <a
                  key={social.name}
                  href={social.href}
                  aria-label={social.name}
                  target='_blank'
                  rel='noopener noreferrer'
                  className='group'
                >
                  <Button variant='outline' size='icon' className="group-hover:bg-accent transition-colors hover:cursor-pointer">
                    <social.icon className={`h-5 w-5 ${social.color} group-hover:opacity-80 transition-opacity`} />
                  </Button>
                </a>
              ))}
            </div>
          </BlurFade>
        </div>
        {/* right Side: The Form */}
        <BlurFade delay={0.25} inView>
          <Card className='w-full max-w-lg mx-auto shadow-xl'>
            <CardHeader>
              <CardTitle className='text-2xl font-bold tracking-tight'>Contact Our Team</CardTitle>
            </CardHeader>
            <CardContent>
              <form className='space-y-4'>
                <div className='grid grid-cols-1 sm:grid-cols-2 gap-4'>
                  <div className='space-y-2'>
                    <Label htmlFor='name'>Full Name</Label>
                    <Input id='name' placeholder='John Doe' />
                  </div>
                  <div className='space-y-2'>
                    <Label htmlFor='company'>Company Name</Label>
                    <Input id='company' placeholder='Acme Inc.' />
                  </div>
                </div>
                <div className='space-y-2'>
                  <Label htmlFor='email'>Work Email</Label>
                  <Input id='email' type='email' placeholder='john.doe@acme.com' />
                </div>
                <div className='space-y-2'>
                  <Label htmlFor='service'>Service of Interest</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder='Select a service' />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value='google-ads'>Google Ads</SelectItem>
                      <SelectItem value='meta-ads'>Meta Ads</SelectItem>
                      <SelectItem value='seo'>SEO</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className='space-y-2'>
                  <Label htmlFor='message'>Message</Label>
                  <Textarea
                    id='message'
                    placeholder='Tell us how we can help...'
                    className='min-h-[100px]'
                  />
                </div>
                <Button type='submit' className='w-full !mt-6 bg-secondary' size='lg'>
                  Submit Inquiry
                </Button>
              </form>
            </CardContent>
          </Card>
        </BlurFade>
      </div>
    </div>
  )
}