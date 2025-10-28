'use server'

import { UploadApiResponse } from 'cloudinary'
import cloudinary from '../cloudinary'
import bcrypt from 'bcrypt'
import connectDB from '../dbConnect'
import User from '@/models/User.model'
import { UserType } from '@/types/user.types'
import { revalidatePath } from 'next/cache'
import { auth } from '../auth'

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

// =================================================================
// 2. ACTION: get all users
// =================================================================

type AllUsersResponse = {
  users: UserType[]
}

export const getAllUsers = async (): Promise<AllUsersResponse> => {
  try {
    await connectDB()
    const users = await User.find({})
    return { users: JSON.parse(JSON.stringify(users)) }
  } catch (error) {
    return { users: [] }
  }
}

// =================================================================
// 3. ACTION: this api help for role change
// =================================================================

export const editUserRole = async (role: string, userId: string) => {
    try {
        await connectDB()

        // 1. Fetch the session
        const session = await auth() 
        
        // 2. 🛡️ CRITICAL AUTHORIZATION CHECK (Must happen first!)
        if (!session || !session.user || session.user.role !== 'admin') {
            return { success: false, message: 'Authorization Failed: Only administrators can change user roles.' }
        }
        
        // 3. 💾 Perform the secure update
        const updatedUser = await User.findByIdAndUpdate(
            userId, // Cleaner to pass ID directly
            { role }, 
            { new: true } // 💡 FIX: Return the *updated* document
        )

        // 4. Check if the user was found after the update attempt
        if (!updatedUser) {
            return { success: false, message: `User not found or ID is invalid.` }
        }
        
    
        revalidatePath('/dashboard/users')

        return { 
            success: true, 
            message: `Successfully changed the role for ${updatedUser.name} to ${role}` 
        }
    } catch (error) {
        console.error('Error during role update:', error)
        // Add specific CastError handling here for robustness if needed
        return { success: false, message: `Server side error: Could not complete role update.` }
    }
}
