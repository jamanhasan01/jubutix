// @/lib/action/blog.actions.ts
'use server'

import cloudinary from '../cloudinary'
import connectDB from '../dbConnect'
import { revalidatePath } from 'next/cache'
import { UploadApiResponse } from 'cloudinary'
import slugify from 'slugify'
import { auth } from '../auth'
import { Blog } from '@/models/Blog.model'

// -----------------------------------------------------------------
// Export ActionState so the client component can import it
// -----------------------------------------------------------------
export type ActionState = {
  message: string
  status: 'success' | 'error'
  errors?: Record<string, string>
} | null

// --- Helper: File Upload Function (Reused) ---
const handleFileUpload = async (file: File, folder: string): Promise<string | null> => {
  if (!file || file.size === 0) return null

  try {
    const arrayBuffer = await file.arrayBuffer()
    const buffer = Buffer.from(arrayBuffer)

    const uploadResult = await new Promise<UploadApiResponse>((resolve, reject) => {
      cloudinary.uploader
        .upload_stream({ folder }, (error, result) => {
          if (error) reject(error)
          else if (result) resolve(result)
          else reject(new Error('Cloudinary upload failed without a result.'))
        })
        .end(buffer)
    })

    return uploadResult.secure_url
  } catch (error) {
    return null
  }
}

// =================================================================
// 1. ACTION: createBlog (Create New Post)
// =================================================================

// @/lib/action/blog.actions.ts (Updated createBlog function)

export async function createBlog(
  previousState: ActionState,
  formData: FormData
): Promise<ActionState> {
  const { title, slug, content, category, meta_title, meta_description, status } =
    Object.fromEntries(formData.entries()) as {
      title: string
      slug: string
      content: string
      category: string
      meta_title: string
      meta_description: string
      status: string
    }

  const file = formData.get('featureImage') as File | null
  const session = await auth()

  if (!session?.user?.id) {
    return {
      message: 'Authentication failed. Please log in.',
      status: 'error',
    }
  }
  if (!title || !slug || !content || !category || !meta_title || !meta_description) {
    return {
      message: 'Title, slug, content, category, and SEO fields are required.',
      status: 'error',
    }
  }

  if (status === 'published' && (!file || file.size === 0)) {
    return { message: 'Feature image is required to publish a blog post.', status: 'error' }
  }

  let featureImageUrl = ''

  try {
    await connectDB() // Only upload the image if a file is present
    if (file && file.size > 0) {
      const uploadedUrl = await handleFileUpload(file, 'blogs')
      if (!uploadedUrl) {
        return { message: 'Failed to upload feature image.', status: 'error' }
      }
      featureImageUrl = uploadedUrl
    }

    const newBlogData = {
      title,
      slug: slugify(slug).toLowerCase(),
      content,
      category,
      ...(featureImageUrl && { featureImage: featureImageUrl }),
      seo: {
        metaTitle: meta_title,
        metaDescription: meta_description,
      },
      user: session.user.id,
      status: status, // Correctly assigns the status ('draft' or 'published')
    }

    const res = await Blog.create(newBlogData)

    revalidatePath('/')
    revalidatePath('/dashboard/posts') // Update success message to use 'status'
    return { message: `Blog saved as ${status} successfully!`, status: 'success' }
  } catch (error: unknown) {
    if (error instanceof Error) {
      if (error.name === 'ValidationError') {
        const validationError: Record<string, string> = {}
        const mongooseError = error as unknown as {
          errors: { [path: string]: { message: string } }
        }
        for (const key in mongooseError.errors) {
          validationError[key] = mongooseError.errors[key].message
        }
        return { message: 'Validation Error', status: 'error', errors: validationError }
      }
      const err = error as { code?: number }
      if (err.code === 11000) {
        return { message: 'This slug already exists. Please choose another.', status: 'error' }
      }
    }
    return { message: 'An unexpected error occurred. Please try again.', status: 'error' }
  }
}

// =================================================================
// 2. ACTION: editBlog (Update Existing Post)
// =================================================================

// @/lib/action/blog.actions.ts (Updated editBlog function)

export async function editBlog(
  previousState: ActionState | null,
  formData: FormData
): Promise<ActionState> {
  const id = formData.get('id') as string
  const title = formData.get('title') as string
  const slug = formData.get('slug') as string
  const content = formData.get('content') as string
  const category = formData.get('category') as string
  const meta_title = formData.get('meta_title') as string
  const meta_description = formData.get('meta_description') as string
  const status = formData.get('status') as string // This will work now
  const file = formData.get('featureImage') as File | null

  if (!id) {
    return { message: 'Blog ID is missing.', status: 'error' }
  }
  try {
    await connectDB() // ✅ FIX: Define the type for updateData instead of using 'any'
    const updateData: {
      title: string
      slug: string
      content: string
      category: string
      status: string
      seo: { metaTitle: string; metaDescription: string }
      updatedAt: Date
      featureImage?: string // Add featureImage as optional since it's added later
    } = {
      title,
      slug: slugify(slug).toLowerCase(),
      content,
      category,
      status,
      seo: {
        metaTitle: meta_title,
        metaDescription: meta_description,
      },
      updatedAt: new Date(),
    } // Image Handling for Edit (now uses the typed updateData object)
    if (file && file.size > 0) {
      const uploadedUrl = await handleFileUpload(file, 'blogs')
      if (uploadedUrl) {
        updateData.featureImage = uploadedUrl
      }
    }

    const updatedBlog = await Blog.findByIdAndUpdate(id, updateData, {
      new: true,
      runValidators: true,
    })

    if (!updatedBlog) {
      return { message: 'Blog not found.', status: 'error' }
    }

    revalidatePath('/')
    revalidatePath('/dashboard/all-posts')
    return { message: `Blog updated to ${status} successfully!`, status: 'success' }
  } catch (error: unknown) {
    if (error instanceof Error) {
      if (error.name === 'ValidationError') {
        const validationError: Record<string, string> = {}
        const mongooseError = error as unknown as {
          errors: { [path: string]: { message: string } }
        }
        for (const key in mongooseError.errors) {
          validationError[key] = mongooseError.errors[key].message
        }
        return { message: 'Validation Error', status: 'error', errors: validationError }
      }
      const err = error as { code?: number }
      if (err.code === 11000) {
        return { message: 'This slug already exists. Please choose another.', status: 'error' }
      }
    }
    return { message: 'An unexpected error occurred.', status: 'error' }
  }
}
// =================================================================
// 3. ACTION: deleteBlog
// =================================================================

export async function deleteBlog(
  prevState: ActionState | null,
  formData: FormData
): Promise<ActionState> {
  const id = formData.get('id') as string

  if (!id) {
    return { message: 'Blog ID is missing.', status: 'error' }
  }

  try {
    await connectDB()
    const deletedBlog = await Blog.findByIdAndDelete(id)

    if (!deletedBlog) {
      return { message: 'Blog not found.', status: 'error' }
    }

    revalidatePath('/')
    revalidatePath('/dashboard/all-posts')
    return { message: 'Blog deleted successfully!', status: 'success' }
  } catch (error) {
    return { message: 'An unexpected error occurred.', status: 'error' }
  }
}

// =================================================================
// 4. ACTION: Data Fetching Functions
// =================================================================

export async function getAllBlogs({ 
  page = 1, 
  limit = 10, 
  search = '', 
  category = '' 
}: { 
  page?: number, 
  limit?: number, 
  search?: string, 
  category?: string 
}) {
  try {
    // 1. Establish database connection
    await connectDB()

    // 2. Build the MongoDB filter (query) object
    let query: any = {}
    
    // Add search filter (case-insensitive title match)
    if (search) {
      query.title = { $regex: search, $options: 'i' }
    }
    
    // Add category filter (if provided and not 'all')
    if (category && category.toLowerCase() !== 'all') {
      query.category = category
    }

    // 3. Calculate pagination variables
    const skipAmount = (page - 1) * limit
    
    // 4. Get the total count of documents matching the filter (for totalPages calculation)
    const totalCount = await Blog.countDocuments(query)

    // 5. Fetch the paginated and filtered blogs
    const blogs = await Blog.find(query)
      .sort({ createdAt: -1 })
      .skip(skipAmount)        // Skip to the correct page
      .limit(limit)            // Limit to 10 posts
      .populate('user', 'name profileImage')
      .lean()

    // 6. Calculate total pages
    const totalPages = Math.ceil(totalCount / limit)

    // Return serializable data
    return {
      blogs: JSON.parse(JSON.stringify(blogs)),
      totalPages,
    }

  } catch (error) {
    console.error('Error fetching blogs:', error)
    return { blogs: [], totalPages: 0 }
  }
}

// =================================================================
// 4. ACTION: this blog fetch based on id for (edit,view , delete)
// =================================================================

export async function getBlogPost(identifier: string) {
  try {
    await connectDB()

    let blog

    if (identifier.match(/^[0-9a-fA-F]{24}$/)) {
      blog = await Blog.findById(identifier).populate('user', 'name profileImage').lean()
    } else {
      // Search by slug
      blog = await Blog.findOne({ slug: identifier }).populate('user', 'name profileImage').lean()
    }

    return JSON.parse(JSON.stringify(blog))
  } catch (error) {
    return null
  }
}

export async function getBlogsByStatus(status: 'published' | 'draft') {
  try {
    await connectDB()
    const blogs = await Blog.find({ status })
      .sort({ createdAt: -1 })
      .populate('user', 'name profileImage')
      .lean()
    return JSON.parse(JSON.stringify(blogs))
  } catch (error) {
    return []
  }
}
