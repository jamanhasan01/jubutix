'use server'

import cloudinary from './cloudinary'
import connectDB from './dbConnect'

import { revalidatePath } from 'next/cache'
import { BlogPost } from './types'
import { Blog } from '@/models/blog.model'

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

      const uploadResult = await new Promise<any>((resolve, reject) => {
        cloudinary.uploader
          .upload_stream({ folder: 'blogs' }, (error, result) => {
            if (error) reject(error)
            else resolve(result)
          })
          .end(buffer)
      })

      coverImageUrl = uploadResult.secure_url
    }

    // 3. Create a strongly-typed object.
    // This will give you IntelliSense and prevent typos.
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

    // 4. Pass the typed object to your Mongoose model.
    await Blog.create(newBlogData)

    revalidatePath('/')
    return { message: 'Blog created successfully!', status: 'success' }
  } catch (error: any) {
    if (error.name == 'ValidationError') {
      const validationError: Record<string, string> = {}

      for (const key in error.errors) {
        validationError[key] = error.errors[key].message
      }
      console.log('error get from validationError object ',validationError)

      return { message: 'ValidationError', status: 'error', errors: validationError }
    }

    return { message: 'Failed to create blog. Please try again.', status: 'error' }
  }
}
