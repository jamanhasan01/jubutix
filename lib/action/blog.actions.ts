'use server'

import cloudinary from '../cloudinary'
import connectDB from '../dbConnect'

import { revalidatePath } from 'next/cache'

import { UploadApiResponse } from 'cloudinary'
import slugify from 'slugify'
import { auth } from '../auth'
import { Blog } from '@/models/Blog.model'

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
    const session = await auth()

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
      slug: slugify(slug as string).toLowerCase(),
      content: content as string,
      category: category as string,
      coverImage: coverImageUrl,
      seo: {
        metaTitle: meta_title as string,
        metaDescription: meta_description as string,
      },
      user: session?.user.id,
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

      return { message: 'ValidationError', status: 'error', errors: validationError }
    }

    return { message: 'An unexpected error occurred. Please try again.', status: 'error' }
  }
}

export async function getAllBlogs() {
  try {
    await connectDB()

    const blogs = await Blog.find({}).sort({ createdAt: -1 }).lean()

    return JSON.parse(JSON.stringify(blogs))
  } catch (error) {
    return []
  }
}
export async function getBlogWithSlug(slug: string) {
  try {
    await connectDB()

    const blogs = await Blog.findOne({ slug }).populate('user', 'name  profileImage').lean()

    return JSON.parse(JSON.stringify(blogs))
  } catch (error) {
    return []
  }
}
