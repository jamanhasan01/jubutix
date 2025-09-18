// components/LoginForm.tsx
'use client' // This directive makes it a Client Component

import { useState } from 'react'
import { signIn } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { Label } from 'recharts'
import { Input } from '@/components/ui/input'
import { FaEye, FaEyeSlash } from 'react-icons/fa'
import { toast } from 'sonner'

export default function LoginForm() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const [showPassword, setshowPassword] = useState(false)
  const router = useRouter()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    try {
      const result = await signIn('credentials', {
        redirect: false,
        email,
        password,
      })
     

      if (result?.error) {
        toast.error('Invalid email or password. Please try again.')
      } else if (result?.ok) {
        router.push('/dashboard')
        toast.success('login successfully')
        router.refresh() // This line might be unnecessary
      }
    } catch (err) {
      toast.error('An unexpected error occurred.')
    }
  }

  return (
    <div className='flex items-center justify-center min-h-screen'>
      <form onSubmit={handleSubmit} className='w-full max-w-[600px] mx-auto transition-transform-y'>
        <Card>
          <CardHeader>
            <CardTitle className='text-2xl'>Create an account</CardTitle>
            <CardDescription>Enter your email below to create your account</CardDescription>
          </CardHeader>
          <CardContent className='space-y-4'>
            <div className='space-y-2'>
              <Label>Email</Label>
              <Input
                type='email'
                name='email'
                id='email'
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>

            <div className='space-y-2 relative'>
              <Label>Password</Label>
              <Input
                type={showPassword ? 'text' : 'password'} // Set type based on state
                name='password'
                id='password'
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
              <button
                type='button' // Important: type="button" prevents form submission
                onClick={() => setshowPassword(!showPassword)} // Toggle the state
                className='absolute right-3 top-2/3 transform -translate-y-1/2 text-gray-500'
              >
                {showPassword ? <FaEyeSlash size={20} /> : <FaEye size={20} />}
              </button>
            </div>
          </CardContent>
          <CardFooter>
            <button
              type='submit'
              className='py-2 w-full bg-secondary text-white font-semibold 
             transition-transform duration-200 hover:scale-105 rounded-lg 
             cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed'
            >
              Sign In
            </button>
          </CardFooter>
        </Card>
      </form>
    </div>
  )
}
