import { Badge } from '@/components/ui/badge'
import { Card, CardContent, CardDescription, CardTitle } from '@/components/ui/card'
import { getBlogsByStatus } from '@/lib/action/blog.actions'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'
import type { BlogPost } from '@/types/blog.types'

const Blogs = async () => {
  const blogs: BlogPost[] = await getBlogsByStatus('published')


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
              <Card className='flex h-full flex-col overflow-hidden rounded-2xl border bg-card text-card-foreground shadow-md transition-all duration-300 hover:shadow-xl border  px-0 py-0'>
                {/* --- Feature Image --- */}
                <div className='relative h-46 w-full overflow-hidden'>
                  <Image
                    src={blog.featureImage}
                    alt={blog.title}
                    fill
                    className='object-cover transition-transform duration-500 group-hover:scale-105 border '
                  />
                </div>

                {/* --- Blog Content --- */}
                <CardContent className='flex flex-col flex-grow pb-5'>
                  {/* Category & Date */}
                  <div className='mb-3 flex items-center justify-between'>
                    {blog.category ? (
                      <Badge variant='secondary' className='text-xs font-medium px-2 py-1'>
                        {blog.category}
                      </Badge>
                    ) : (
                      <span />
                    )}
                    <p className='text-xs text-muted-foreground'>{formatDate(blog.createdAt)}</p>
                  </div>

                  {/* Title */}
                  <CardTitle className='mb-2 text-xl font-semibold leading-snug group-hover:text-primary transition-colors'>
                    {blog.title.length > 55 ? blog.title.slice(0, 55) + '…' : blog.title}
                  </CardTitle>

                  {/* Description */}
                  <CardDescription className='text-sm text-muted-foreground mb-5 line-clamp-3'>
                    {blog.seo?.metaDescription || 'No description available.'}
                  </CardDescription>

                  {/* --- Author Section --- */}
                  {blog.user && (
                    <div className='mt-auto flex items-center gap-3 border-t pt-3'>
                      <div className='relative h-9 w-9 rounded-full overflow-hidden'>
                        <Image
                          src={blog?.user?.profileImage || '/default-avatar.png'}
                          alt={blog.user.name}
                          fill
                          className='object-cover'
                        />
                      </div>
                      <div>
                        <p className='text-xs text-muted-foreground'>Writer By</p>
                        <p className='text-sm font-medium'>{blog.user.name}</p>
                      </div>
                    </div>
                  )}
                </CardContent>
              </Card>
            </Link>
          ))
        ) : (
          <p className='col-span-full text-center text-muted-foreground'>No blog posts found.</p>
        )}
      </div>
    </div>
  )
}

export default Blogs
