import { Badge } from '@/components/ui/badge'
import { Card, CardContent, CardDescription, CardTitle } from '@/components/ui/card'
import { getBlogsByStatus } from '@/lib/action/blog.actions'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

type Blog = {
  _id: string
  title: string
  slug: string
  featureImage: string
  category: string
  seo: {
    metaDescription: string
  }
  createdAt: string
}

const Blogs = async () => {
  const blogs: Blog[] = await getBlogsByStatus('published')

  // Helper function for date formatting
  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    const year = date.getFullYear()
    const month = (date.getMonth() + 1).toString().padStart(2, '0')
    const day = date.getDate().toString().padStart(2, '0')
    return `${year}-${month}-${day}`
  }

  return (
    <div className='container'>
      <div className='grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3'>
        {blogs && blogs.length > 0 ? (
          blogs.map((blog) => (
            <Link href={`/blog/${blog.slug}`} key={blog._id} className='group'>
              {/* ✅ RESTRUCTURED CARD: Removed CardHeader and CardFooter */}
              <Card className='flex h-full flex-col overflow-hidden rounded-lg border bg-card text-card-foreground shadow-sm transition-all group-hover:shadow-xl'>
                {/* Image is now a direct child, not in CardHeader */}
                <div className='relative h-52 w-full'>
                  <Image
                    src={blog.featureImage}
                    alt={blog.title}
                    fill
                    className='object-cover transition-transform duration-300 group-hover:scale-105'
                  />
                </div>

                {/* All text content is now in CardContent for consistent padding */}
                <CardContent className='flex flex-grow flex-col p-6'>
                  {/* ✅ CATEGORY & DATE: Wrapped in a flex container */}
                  <div className='mb-4 flex w-full items-center justify-between text-sm text-muted-foreground'>
                    <p className='font-medium text-primary'>{blog.category}</p>
                    <p>{formatDate(blog.createdAt)}</p>
                  </div>

                  <CardTitle className='mb-3 text-2xl font-semibold leading-tight'>
                    {blog.title}
                  </CardTitle>

                  {/* ✅ TRUNCATED DESCRIPTION with "Read More" */}
                  <CardDescription className='mt-auto'>
                    {blog.seo.metaDescription.substring(0, 100)}...
                    <span className='ml-2 font-semibold text-primary transition-colors group-hover:text-primary/80'>
                      Read More
                    </span>
                  </CardDescription>
                </CardContent>
              </Card>
            </Link>
          ))
        ) : (
          <p className='col-span-full text-center'>No blog posts found.</p>
        )}
      </div>
    </div>
  )
}

export default Blogs
