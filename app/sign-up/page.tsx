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
import Button from '../components/Button'
import { Create_User } from '@/lib/action/user.action'
import { toast } from 'sonner'
import { FaEye, FaEyeSlash } from 'react-icons/fa'

const RegistrationPage = () => {
  const [state, formAction, isPending] = useActionState(Create_User, null)
  const [showPassword, setShowPassword] = useState(false)
  useEffect(() => {
    if (state?.status == 'success') {
      toast.success(state.message)
    } else if (state?.status == 'error') {
      toast.error(state.message)
    }
  }, [state])

  return (
    <div className='flex items-center justify-center min-h-screen'>
      <form action={formAction} className='w-full max-w-[600px] mx-auto transition-transform-y'>
        <Card>
          <CardHeader>
            <CardTitle className='text-2xl'>Create an account</CardTitle>
            <CardDescription>Enter your email below to create your account</CardDescription>
          </CardHeader>
          <CardContent className='space-y-4'>
            <div className='space-y-2'>
              <Label>User Name</Label>
              <Input type='text' name='user_name' id='user_name' required />
            </div>
            <div className='space-y-2'>
              <Label>Email</Label>
              <Input type='email' name='email' id='email' required />
            </div>
            <div className='space-y-2'>
              <Label>Profile</Label>
              <Input type='file' name='profile' id='profile' required />
            </div>
            <div className='space-y-2 relative'>
              <Label>Password</Label>
              <Input
                type={showPassword ? 'text' : 'password'} // Set type based on state
                name='password'
                id='password'
                required
              />
              <button
                type='button' // Important: type="button" prevents form submission
                onClick={() => setShowPassword(!showPassword)} // Toggle the state
                className='absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500'
              >
                {showPassword ? <FaEyeSlash size={20} /> : <FaEye size={20} />}
              </button>
            </div>
          </CardContent>
          <CardFooter>
            <button
              type='submit'
              disabled={isPending}
              className='py-2 w-full bg-secondary text-white font-semibold 
             transition-transform duration-200 hover:scale-105 rounded-lg 
             cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed' // 👈 Added disabled styles
            >
              {isPending ? 'Creating Account...' : 'Create Account'}
            </button>
          </CardFooter>
        </Card>
      </form>
    </div>
  )
}

export default RegistrationPage
