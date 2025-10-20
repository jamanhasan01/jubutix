'use client'

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
// 💡 Corrected import: Label should come from shadcn/ui/label
import { Label } from '@/components/ui/label'
import { Input } from '@/components/ui/input'
import { FaEye, FaEyeSlash } from 'react-icons/fa'
import { Mail, Lock, LogIn } from 'lucide-react'
import { toast } from 'sonner'
import Link from 'next/link'



export default function LoginForm() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false) // State for loading animation

  const [showPassword, setshowPassword] = useState(false)
  const router = useRouter()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    try {
      const result = await signIn('credentials', {
        redirect: false,
        email,
        password,
      })

      if (result?.error) {
        toast.error(result.error)
      } else if (result?.ok) {
        toast.success('Login successful! Redirecting...')
        router.push('/dashboard')
        router.refresh()
      }
    } catch (err) {
      toast.error('An unexpected error occurred.')
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className='flex items-center justify-center min-h-screen bg-gray-50 p-4'>
      <form onSubmit={handleSubmit} className='w-full max-w-lg mx-auto'>
        {/* Added professional shadow, hover effect, and brand color border */}
        <Card className='shadow-xl hover:shadow-2xl transition-shadow duration-300 border-t-4 border-t-secondary'>
          <CardHeader className='text-center '>
           
            {/* Corrected Title/Description for a Login Form */}
            <CardTitle className='text-3xl font-bold text-secondary'>Welcome Back</CardTitle>
            <CardDescription className='text-md text-gray-600'>
              Sign in to your account to access your dashboard.
            </CardDescription>
          </CardHeader>

          <CardContent className='space-y-6'>
            {/* Email Field with Icon Label */}
            <div className='space-y-2'>
              <Label
                htmlFor='email'
                className='flex items-center gap-2 font-semibold text-gray-700'
              >
                <Mail className='w-4 h-4 text-secondary' /> Email
              </Label>
              <Input
                type='email'
                name='email'
                id='email'
                placeholder='your.email@example.com'
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className='h-12 text-base focus:border-secondary'
              />
            </div>

            {/* Password Field with Toggle - Improved Positioning */}
            <div className='space-y-2 relative'>
              <Label
                htmlFor='password'
                className='flex items-center gap-2 font-semibold text-gray-700'
              >
                <Lock className='w-4 h-4 text-secondary' /> Password
              </Label>
              <div className='relative'>
                <Input
                  type={showPassword ? 'text' : 'password'}
                  name='password'
                  id='password'
                  placeholder='Enter your password'
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  className='h-12 text-base pr-10 focus:border-secondary'
                />
                <button
                  type='button'
                  onClick={() => setshowPassword(!showPassword)}
                  className='absolute inset-y-0 right-0 pr-3 flex items-center text-gray-500 hover:text-secondary'
                  aria-label={showPassword ? 'Hide password' : 'Show password'}
                >
                  {showPassword ? <FaEyeSlash size={18} /> : <FaEye size={18} />}
                </button>
              </div>
            </div>
          </CardContent>

          <CardFooter className='flex flex-col gap-4'>
            {/* Polished Button with Loading State */}
            <button
              type='submit'
              disabled={isSubmitting}
              className='w-full h-12 bg-secondary text-white font-bold text-lg 
              rounded-lg transition-all duration-300 hover:bg-secondary/90 
              hover:shadow-lg hover:-translate-y-0.5 
              disabled:opacity-60 disabled:cursor-not-allowed flex items-center justify-center'
            >
              {isSubmitting ? (
                <>
                  <svg className='animate-spin h-5 w-5 mr-3 text-white' viewBox='0 0 24 24'>
                    <circle
                      className='opacity-25'
                      cx='12'
                      cy='12'
                      r='10'
                      stroke='currentColor'
                      strokeWidth='4'
                    ></circle>
                    <path
                      className='opacity-75'
                      fill='currentColor'
                      d='M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z'
                    ></path>
                  </svg>
                  Signing In...
                </>
              ) : (
                <>
                  <LogIn className='w-5 h-5 mr-2' /> Sign In
                </>
              )}
            </button>

            {/* Added Registration Link for better UX flow */}
            <p className='text-sm text-center text-gray-500'>
              Don't have an account?{' '}
              <Link href='/register' className='text-secondary font-semibold hover:underline'>
                Create Account
              </Link>
            </p>
          </CardFooter>
        </Card>
      </form>
    </div>
  )
}
