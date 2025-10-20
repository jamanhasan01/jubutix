'use client'

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import React, { useActionState, useEffect, useState } from 'react'
import { Create_User } from '@/lib/action/user.action'
import { toast } from 'sonner'
import { FaEye, FaEyeSlash } from 'react-icons/fa'
import { User, Mail, Lock, Upload } from 'lucide-react' // Use Lucide icons for consistency
import Link from 'next/link'
import { redirect } from 'next/navigation'

// 💡 Assuming 'Logo' component or text branding here.


const RegistrationPage = () => {
  const [state, formAction, isPending] = useActionState(Create_User, null)
  const [showPassword, setShowPassword] = useState(false)

  useEffect(() => {
    if (state?.status === 'success') {
      toast.success(state.message)
      redirect("/login")
    } else if (state?.status === 'error') {
      toast.error(state.message)
    }
  }, [state])

  return (
    <div className='flex items-center justify-center min-h-screen bg-gray-50 p-4'>
      <form action={formAction} className='w-full max-w-lg mx-auto'>
        <Card className='shadow-xl hover:shadow-2xl transition-shadow duration-300 border-t-4 border-t-secondary'>
          <CardHeader className='text-center space-y-2'>

            <CardTitle className='text-3xl font-bold text-secondary'>Create an Account</CardTitle>
            <CardDescription className='text-md text-gray-600'>
              Join the champions. Enter your details to get started.
            </CardDescription>
          </CardHeader>

          <CardContent className='space-y-6'>
            {/* User Name Field */}
            <div className='space-y-2'>
              <Label
                htmlFor='user_name'
                className='flex items-center gap-2 font-semibold text-gray-700'
              >
                <User className='w-4 h-4 text-secondary' /> User Name
              </Label>
              <Input
                type='text'
                name='user_name'
                id='user_name'
                placeholder='Enter your full name'
                required
                className='h-12 text-base focus:border-secondary'
              />
            </div>

            {/* Email Field */}
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
                required
                className='h-12 text-base focus:border-secondary'
              />
            </div>

            {/* Profile File Input */}
            <div className='space-y-2'>
              <Label
                htmlFor='profile'
                className='flex items-center gap-2 font-semibold text-gray-700'
              >
                <Upload className='w-4 h-4 text-secondary' /> Profile Picture
              </Label>
              <Input
                type='file'
                name='profile'
                id='profile'
                required
                // 1. ADD 'flex items-center' to vertically center the button and text.
                // 2. REMOVE 'file:mt-1' which was causing the misalignment.
                className='h-12 text-base flex items-center 
             file:mr-4 file:py-2 file:px-4 file:rounded-full 
             file:border-0 file:text-sm file:font-semibold 
              file:text-secondary'
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
                  placeholder='Enter a strong password'
                  required
                  className='h-12 text-base pr-10 focus:border-secondary'
                />
                <button
                  type='button'
                  onClick={() => setShowPassword(!showPassword)}
                  className='absolute inset-y-0 right-0 pr-3 flex items-center text-gray-500 hover:text-secondary'
                  aria-label={showPassword ? 'Hide password' : 'Show password'}
                >
                  {showPassword ? <FaEyeSlash size={18} /> : <FaEye size={18} />}
                </button>
              </div>
            </div>
          </CardContent>

          <CardFooter className='flex flex-col gap-4'>
            <button
              type='submit'
              name='submit' // Recommended: Add name for better form data handling
              disabled={isPending}
              className='w-full h-12 bg-secondary text-white font-bold text-lg 
              rounded-lg transition-all duration-300 hover:bg-secondary/90 
              hover:shadow-lg hover:-translate-y-0.5 
              disabled:opacity-60 disabled:cursor-not-allowed flex items-center justify-center'
            >
              {isPending ? (
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
                  Creating Account...
                </>
              ) : (
                'Create Account'
              )}
            </button>

            <p className='text-sm text-center text-gray-500'>
              Already have an account?{' '}
              <Link href='/login' className='text-secondary font-semibold hover:underline'>
                Sign In
              </Link>
            </p>
          </CardFooter>
        </Card>
      </form>
    </div>
  )
}

export default RegistrationPage
