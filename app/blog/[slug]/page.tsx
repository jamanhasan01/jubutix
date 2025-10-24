import { notFound } from 'next/navigation'
import Image from 'next/image'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { FaFacebook, FaInstagram, FaLinkedin, FaTiktok, FaYoutube } from 'react-icons/fa'
import { FaXTwitter } from 'react-icons/fa6'
import type { Metadata, ResolvingMetadata } from 'next'
import { getBlogPost } from '@/lib/action/blog.actions'
import * as cheerio from 'cheerio'

// Assuming this path is correct for your styles
import '../style.css'

// --- Type Definitions ---

interface Props {
  params: Promise<{ slug: string }>
}

interface TocItem {
  id: string
  text: string
  level: number
}

interface ShareButtonsProps {
  url: string // The full URL of the blog post
  title: string // The title of the blog post
}

// 🔑 REQUIRED ENV VARIABLE for Absolute URLs in Metadata
const WEBSITE_URL = process.env.WEBSITE_URL 

// --- 🚀 FIXED: Metadata Generation ---

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
    // 1. CRITICAL FIX: Set metadataBase to automatically prepend the base URL
    metadataBase: new URL(WEBSITE_URL),

    title: `jubutix | ${blog.seo.metaTitle}` || `jubutix | ${blog.title}`,
    description: blog.seo.metaDescription,
    
    openGraph: {
      title: blog.seo.metaTitle || blog.title,
      description: blog.seo.metaDescription,
      // 2. This relative path now correctly becomes an absolute URL thanks to metadataBase
      url: `/blog/${blog.slug}`, 
      siteName: 'jubutix', // Added for completeness
      type: 'article',
      images: [
        {
          // 3. This image path is now correctly absolute
          url: blog.featureImage, 
          alt: blog.title,
          // LinkedIn recommends 1200x627, but size detection is automatic
        },
      ],
    },

    twitter: {
      card: 'summary_large_image',
      title: blog.seo.metaTitle || blog.title,
      description: blog.seo.metaDescription,
      // 4. Twitter images are also now correctly absolute
      images: [blog.featureImage], 
    },
  }
}

// --- Content Processing (Kept the same) ---

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

// --- Table of Contents Component (Kept the same) ---

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

// --- ShareButtons Component (Kept the same) ---
const ShareButtons = ({ url, title }: ShareButtonsProps) => {
  // Ensure we use the full URL from the parent component
  const encodedUrl = encodeURIComponent(url) 
  const encodedTitle = encodeURIComponent(title)

  const linkedInShareUrl = `https://www.linkedin.com/shareArticle?mini=true&url=${encodedUrl}&title=${encodedTitle}`
  const facebookShareUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`
  const twitterShareUrl = `https://twitter.com/intent/tweet?url=${encodedUrl}&text=${encodedTitle}`

  return (
    <div className='flex items-center justify-center space-x-2'>
      <span className='font-semibold'>Share</span>

      <div className='flex'>
        <a
          href={linkedInShareUrl}
          target='_blank'
          rel='noopener noreferrer'
          className='p-2 rounded-full text-black/85 transition-colors hover:text-secondary'
        >
          <FaLinkedin size={26} />
        </a>

        <a
          href={facebookShareUrl}
          target='_blank'
          rel='noopener noreferrer'
          className='p-2 rounded-full text-black/85 transition-colors hover:text-secondary'
        >
          <FaFacebook size={26} />
        </a>

        <a
          href={twitterShareUrl}
          target='_blank'
          rel='noopener noreferrer'
          className='p-2 rounded-full text-black/85 transition-colors hover:text-secondary'
        >
          <FaXTwitter size={26} />
        </a>
      </div>
    </div>
  )
}

// --- BlogDetailsPage Component ---

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

  // The base URL must be read from the environment
  const baseUrl = process.env.WEBSITE_URL 
  // 5. This generates the FULL absolute URL for the ShareButtons component
  const blogUrl = `${baseUrl}/blog/${blog.slug}`

  return (
    <section>
      <div className='container mt-20'>
        <div className='text-center'>
          <h1 className='mb-4 text-4xl font-bold tracking-tight md:text-5xl'>{blog.title}</h1>
          <div className='flex items-center justify-center space-x-4'>
            <Avatar className='w-12 h-12'>
              <AvatarImage src={blog.user.profileImage} alt={blog.user.name} />
              <AvatarFallback>{blog.user.name.charAt(0).toUpperCase()}</AvatarFallback>
            </Avatar>
            <div className='mb-4 flex flex-col justify-center items-start'>
              <p className='font-semibold uppercase'>{blog.user.name}</p>
              <p className='text-sm text-muted-foreground !-mt-0'>Published on {publishedDate}</p>
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
              {/* Passing the full absolute URL */}
              <ShareButtons url={blogUrl} title={blog.title} /> 
              <TableOfContents items={tocItems} />
            </div>
          </aside>
        </div>
      </div>
    </section>
  )
}