'use client'

import { useState } from 'react'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Label } from '@/components/ui/label'
import { MessageSquare } from 'lucide-react'

export function MessageFormPopup() {
  // NOTE: The useToast() hook has been removed.
  const [open, setOpen] = useState(false)
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [message, setMessage] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    // Your Formspree or backend API call remains the same
    await fetch('https://formspree.io/f/your_unique_code', {
      method: 'POST',
      headers: { Accept: 'application/json' },
      body: JSON.stringify({ name, email, message }),
    })

    setIsSubmitting(false)
    setName('')
    setEmail('')
    setMessage('')
    setOpen(false)
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <button className='flex items-center gap-4 group text-lg text-left w-full'>
          <MessageSquare className='h-7 w-7 text-secondary' />
          <span className='group-hover:underline'>Send a Message</span>
        </button>
      </DialogTrigger>
      <DialogContent className='sm:max-w-[425px] bg-primary text-white border-secondary'>
        <DialogHeader>
          <DialogTitle>Contact Us</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className='grid gap-4 py-4'>
          <div className='grid grid-cols-4 items-center gap-4'>
            <Label htmlFor='name' className='text-right'>
              Name
            </Label>
            <Input
              id='name'
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              className='col-span-3 bg-primary-foreground/10'
            />
          </div>
          <div className='grid grid-cols-4 items-center gap-4'>
            <Label htmlFor='email' className='text-right'>
              Email
            </Label>
            <Input
              id='email'
              type='email'
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className='col-span-3 bg-primary-foreground/10'
            />
          </div>
          <div className='grid grid-cols-4 items-center gap-4'>
            <Label htmlFor='message' className='text-right'>
              Message
            </Label>
            <Textarea
              id='message'
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              required
              placeholder='How can we help you?'
              className='col-span-3 bg-primary-foreground/10'
            />
          </div>
          <Button
            type='submit'
            disabled={isSubmitting}
            className='w-full mt-2 bg-secondary hover:bg-secondary/90'
          >
            {isSubmitting ? 'Sending...' : 'Send Message'}
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  )
}
