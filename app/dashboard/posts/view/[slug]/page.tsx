import { notFound } from 'next/navigation'
import Image from 'next/image'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Facebook, Linkedin, Twitter } from 'lucide-react'
import type { Metadata, ResolvingMetadata } from 'next'
import {  getBlogPost } from '@/lib/action/blog.actions'

interface Props {
  params: Promise<{ slug: string }>
}

export async function generateMetadata(
  { params }: Props,
  parent: ResolvingMetadata
): Promise<Metadata> {
  const { slug } = await params
  const blog = await getBlogPost(slug)


  if (!blog) {
    return {
      title: 'Blog Post Not Found',
      description: 'The blog post you are looking for does not exist.',
    }
  }

  return {
    title: blog.title,
  }
}

const TableOfContents = () => (
  <div className='rounded-lg border p-4'>
    <h3 className='mb-3 font-semibold'>In This Article</h3>
    <ul className='space-y-2'>
      <li>
        <a href='#section1' className='text-sm text-muted-foreground hover:text-primary'>
          What is This Blog About?
        </a>
      </li>
      <li>
        <a href='#section2' className='text-sm text-muted-foreground hover:text-primary'>
          Key Integrations
        </a>
      </li>
      <li>
        <a href='#section3' className='text-sm text-muted-foreground hover:text-primary'>
          Disadvantages to Consider
        </a>
      </li>
      <li>
        <a href='#section4' className='text-sm text-muted-foreground hover:text-primary'>
          Conclusion
        </a>
      </li>
    </ul>
  </div>
)

const ShareButtons = () => (
  <div className='flex items-center space-x-2'>
    <span className='font-semibold'>Share</span>
    <a href='#' className='rounded-full border p-2 hover:bg-muted'>
      <Linkedin size={18} />
    </a>
    <a href='#' className='rounded-full border p-2 hover:bg-muted'>
      <Facebook size={18} />
    </a>
    <a href='#' className='rounded-full border p-2 hover:bg-muted'>
      <Twitter size={18} />
    </a>
  </div>
)

export default async function ViewBlogPage({ params }: Props) {
  const { slug } = await params

  const blog = await getBlogPost(slug)

  if (!blog) {
    notFound()
  }

  const publishedDate = new Date(blog.createdAt).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  })

  return (
    <section className='bg-white'>
      <div className='container'>
        {/* === HEADER SECTION === */}
        <div className='mx-auto max-w-3xl text-center'>
          <h1 className='mb-4 text-4xl font-bold tracking-tight md:text-5xl'>{blog.title}</h1>
          <div className='mt-6 flex items-center justify-center space-x-4'>
            <Avatar>
              <AvatarImage src={blog.user.profileImage} alt={blog.user.name} />
              <AvatarFallback>{blog.user.name.charAt(0).toUpperCase()}</AvatarFallback>
            </Avatar>
            <div>
              <p className='font-semibold'>{blog.user.name}</p>
              <p className='text-sm text-muted-foreground'>Published on {publishedDate}</p>
            </div>
          </div>
        </div>

        {/* === COVER IMAGE === */}
        <div className='relative my-8 h-64 w-full overflow-hidden rounded-lg md:h-[450px]'>
          <Image src={blog.featureImage} alt={blog.title} fill className='object-cover' priority />
        </div>

        {/* === MAIN LAYOUT (CONTENT + SIDEBAR) === */}
        <div className='mx-auto grid max-w-5xl grid-cols-1 gap-12 lg:grid-cols-3'>
          {/* Right Column: Sidebar */}
          <aside className='lg:col-span-1'>
            <div className='sticky top-24 space-y-6'>
              <ShareButtons />
              <TableOfContents />
            </div>
          </aside>
          {/* Left Column: Article Content */}
          <article
            className='prose prose-lg max-w-none dark:prose-invert lg:col-span-2'
            dangerouslySetInnerHTML={{ __html: blog.content }}
          />
        </div>
      </div>
    </section>
  )
}
