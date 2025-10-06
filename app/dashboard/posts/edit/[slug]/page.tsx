// app/dashboard/posts/edit/[slug]/page.tsx
import {  getBlogPost } from '@/lib/action/blog.actions'
import { notFound } from 'next/navigation'
import BlogForm from '../../new-post/componetns/BlogForm'
import { BlogPost } from '@/types/blog.types'

interface PageProps {
  params: Promise<{ slug: string }>
}

export default async function EditBlogPostPage(props: PageProps) {

    const { slug } = await props.params
    const initialPost = await getBlogPost(slug)

    if (!initialPost) {
      notFound()
    }

    const postData = initialPost as BlogPost

    return (
      <div className='m-6'>
        <BlogForm initialPost={postData} /> 
      </div>
    )
}