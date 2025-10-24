import { notFound } from 'next/navigation'
import Image from 'next/image'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Facebook, Linkedin, Twitter } from 'lucide-react'
import type { Metadata, ResolvingMetadata } from 'next'
import { getBlogPost } from '@/lib/action/blog.actions'
import * as cheerio from 'cheerio'

interface Props {
  params: Promise<{ slug: string }>
}

interface TocItem {
  id: string
  text: string
  level: number
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
    title: `jubutix | ${blog.seo.metaTitle}` || `jubutix | ${blog.title}`,
    description: blog.seo.metaDescription,
    openGraph: {
      title: blog.seo.metaTitle || blog.title,
      description: blog.seo.metaDescription,
      url: `/blog/${blog.slug}`,
      images: [
        {
          url: blog.featureImage,
          alt: blog.title,
        },
      ],
    },

    twitter: {
      card: 'summary_large_image',
      title: blog.metaTitle || blog.title,
      description: blog.metaDescription,
      images: [blog.featureImage],
    },
  }
}

function processBlogContent(htmlContent: string): { modifiedHtml: string; tocItems: TocItem[] } {
  const $ = cheerio.load(htmlContent)
  const headings: TocItem[] = []

  $('h2, h3').each((index, element) => {
    const $element = $(element)
    const tag = element.tagName.toLowerCase()
    const text = $element.text().trim()

    const id = text
      .toLowerCase()
      .replace(/[^a-z0-9\s-]/g, '')
      .trim()
      .replace(/\s+/g, '-')

    $element.attr('id', id)

    headings.push({
      id: id,
      text: text,
      level: parseInt(tag.replace('h', '')),
    })
  })

  const modifiedHtml = $.html()

  return { modifiedHtml, tocItems: headings }
}

const TableOfContents = ({ items }: { items: TocItem[] }) => {
  if (items.length === 0) {
    return null
  }

  return (
    <div className='rounded-lg border p-4'>
      <h3 className='mb-3 font-semibold'>In This Article</h3>
      <ul className='space-y-2'>
        {items.map((item) => (
          <li key={item.id} className={item.level === 3 ? 'ml-4' : ''}>
            <a
              href={`#${item.id}`}
              className='text-sm text-muted-foreground hover:text-primary transition-colors'
              style={{ paddingLeft: item.level === 3 ? '10px' : '0' }}
            >
              {item.text}
            </a>
          </li>
        ))}
      </ul>
    </div>
  )
}

const ShareButtons = () => (
  <div className='flex items-center space-x-2'>
    <span className='font-semibold'>Share</span>
    <a href='#' className='rounded-full border p-2 hover:bg-muted transition-colors'>
      <Linkedin size={18} />
    </a>
    <a href='#' className='rounded-full border p-2 hover:bg-muted transition-colors'>
      <Facebook size={18} />
    </a>
    <a href='#' className='rounded-full border p-2 hover:bg-muted transition-colors'>
      <Twitter size={18} />
    </a>
  </div>
)

import '../style.css'

export default async function BlogDetailsPage({ params }: Props) {
  const { slug } = await params

  const blog = await getBlogPost(slug)

  if (!blog) {
    notFound()
  }

  const { modifiedHtml, tocItems } = processBlogContent(blog.content)

  const publishedDate = new Date(blog.createdAt).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  })

  return (
    <section>
      <div className='container mt-20'>
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

        <div className='relative my-8 h-64 w-full overflow-hidden rounded-lg md:h-[450px]'>
          <Image src={blog.featureImage} alt={blog.title} fill className='object-cover' priority />
        </div>

        <div className='mx-auto grid max-w-7xl grid-cols-1 gap-12 lg:grid-cols-4'>
          <article
            className='lg:col-span-3 text-base blog-container'
            dangerouslySetInnerHTML={{ __html: modifiedHtml }}
          />

          <aside className='lg:col-span-1'>
            <div className='sticky top-24 space-y-6'>
              <ShareButtons />
              <TableOfContents items={tocItems} />
            </div>
          </aside>
        </div>
      </div>
    </section>
  )
}
