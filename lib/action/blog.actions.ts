'use server'

import cloudinary from '../cloudinary'
import connectDB from '../dbConnect'

import { revalidatePath } from 'next/cache'
import { BlogPost } from '../types'
import { Blog } from '@/models/blog.model'
import { UploadApiResponse } from 'cloudinary'

type ActionState = {
  message: string
  status: 'success' | 'error'
  errors?: Record<string, string>
} | null

export async function createBlog(
  previousState: ActionState,
  formData: FormData
): Promise<ActionState> {
  try {
    const { title, slug, content, category, meta_title, meta_description } = Object.fromEntries(
      formData.entries()
    )
    const file = formData.get('coverImage') as File | null

    let coverImageUrl = ''

    if (file && file.size > 0) {
      const arrayBuffer = await file.arrayBuffer()
      const buffer = Buffer.from(arrayBuffer)

      const uploadResult = await new Promise<UploadApiResponse>((resolve, reject) => {
        cloudinary.uploader
          .upload_stream({ folder: 'blogs' }, (error, result) => {
            if (error) reject(error)
            else if (result) resolve(result)
            else reject(new Error('Cloudinary upload failed without a result.'))
          })
          .end(buffer)
      })

      coverImageUrl = uploadResult.secure_url
    }

    const newBlogData = {
      title: title as string,
      slug: slug as string,
      content: content as string,
      category: category as string,
      coverImage: coverImageUrl,
      seo: {
        metaTitle: meta_title as string,
        metaDescription: meta_description as string,
      },
    }

    await connectDB()
    await Blog.create(newBlogData)

    revalidatePath('/')
    return { message: 'Blog created successfully!', status: 'success' }
  } catch (error: unknown) {
    if (error instanceof Error && error.name === 'ValidationError') {
      const validationError: Record<string, string> = {}

      const mongooseError = error as unknown as {
        errors: { [path: string]: { message: string } }
      }

      for (const key in mongooseError.errors) {
        validationError[key] = mongooseError.errors[key].message
      }
      console.log('error get from validationError object ', validationError)

      return { message: 'ValidationError', status: 'error', errors: validationError }
    }

    // ✅ FIX: This return statement ensures the function always returns a value, even for non-validation errors.
    return { message: 'An unexpected error occurred. Please try again.', status: 'error' }
  }
}
