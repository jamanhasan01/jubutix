'use server'

import { UploadApiResponse } from 'cloudinary'
import cloudinary from '../cloudinary'
import bcrypt from 'bcrypt'
import connectDB from '../dbConnect'
import User from '@/models/User'

type ActionState = {
  message: string
  status: 'success' | 'error'
} | null

export const Create_User = async (
  previousState: ActionState,
  formData: FormData
): Promise<ActionState> => {
  const user_name = formData.get('user_name') as string
  const email = formData.get('email') as string
  const password = formData.get('password') as string
  const file = formData.get('profile') as File

  try {
    let profileImage = ''

    if (file && file.size > 0) {
      const arrayBuffer = await file.arrayBuffer()
      const buffer = Buffer.from(arrayBuffer)

      const uploadResult = await new Promise<UploadApiResponse>((resolve, reject) => {
        cloudinary.uploader
          .upload_stream({ folder: 'Users' }, (error, result) => {
            if (error) reject(error)
            else if (result) resolve(result)
            else reject(new Error('Cloudinary upload failed without a result.'))
          })
          .end(buffer)
      })

      profileImage = uploadResult.secure_url
    }

    const hashedPassword = await bcrypt.hash(password, 10)

    connectDB()

    const createUser = {
      name: user_name,
      email,
      password: hashedPassword,
      profileImage,
    }

    await User.create(createUser)

    return { message: 'Account created successfully!', status: 'success' }
  } catch (error) {
    return { message: 'An error occurred. Please try again', status: 'error' }
  }
}
