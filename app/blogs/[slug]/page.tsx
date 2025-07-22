// app/blog/[slug]/page.tsx

import Image from 'next/image'
import { Badge } from '@/components/ui/badge'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'

// --- Mock Data for a Single Post ---
// In a real app, you would fetch this data based on the `slug` param
const post = {
  slug: 'mastering-seo-in-2025',
  title: 'Mastering SEO in 2025: A Guide for Dominating SERPs',
  category: 'SEO',
  imageUrl: '/results/result-1.png', // Replace with actual image
  author: { name: 'Umar Tazkeer', imageUrl: '/person.jpg' },
  date: 'July 15, 2025',
  content: ( // This would come from your CMS, likely as Markdown/HTML
    <>
      <p>The world of Search Engine Optimization (SEO) is in a constant state of flux. What worked yesterday might not work today, and what works today will almost certainly evolve by tomorrow. As we look towards 2025, several key trends are emerging that will define who wins and who loses in the search engine results pages (SERPs).</p>
      <h2>The Rise of AI-Powered Search</h2>
      <p>With advancements like Google is Search Generative Experience (SGE), the very nature of search is changing. Users are getting direct answers, which means ranking #1 in the traditional sense is no longer the only goal. Your content must be valuable enough to be featured in these AI-powered summaries.</p>
      <blockquote>This is not just about keywords anymore; it is about providing comprehensive, authoritative answers to complex questions.</blockquote>
      <ul>
        <li>Focus on semantic search and entity-based SEO.</li>
        <li>Structure your content with clear Q&A formats.</li>
        <li>Build topical authority around your core areas of expertise.</li>
      </ul>
      <h2>User Experience as a Core Ranking Factor</h2>
      <p>Google continues to double down on user experience metrics. Your site must be fast, mobile-friendly, and easy to navigate. Core Web Vitals are no longer just a suggestion—they are a requirement for competitive niches.</p>
    </>
  ),
};

// --- Single Post Page Component ---
// The `params` object will contain the slug from the URL
export default function BlogPostPage() {
  // In a real app, you'd use params.slug to fetch the correct post data
  
  return (
    <main className="bg-white py-16 sm:py-24">
      <div className="container mx-auto px-4">
        <article className="max-w-4xl mx-auto">
          {/* --- Article Header --- */}
          <header className="text-center mb-8">
            <Badge variant="default" className="mb-4">{post.category}</Badge>
            <h1 className="text-4xl font-extrabold text-gray-900 sm:text-5xl leading-tight">
              {post.title}
            </h1>
            <div className="mt-6 flex justify-center items-center gap-4">
              <Avatar>
                <AvatarImage src={post.author.imageUrl} alt={post.author.name} />
                <AvatarFallback>{post.author.name.charAt(0)}</AvatarFallback>
              </Avatar>
              <div>
                <p className="font-semibold text-gray-900">{post.author.name}</p>
                <p className="text-sm text-gray-500">{post.date}</p>
              </div>
            </div>
          </header>

          {/* --- Featured Image --- */}
          <div className="relative h-64 sm:h-80 lg:h-96 w-full rounded-lg overflow-hidden my-8 shadow-lg">
            <Image src={post.imageUrl} alt={post.title} fill className="object-cover" />
          </div>

          {/* --- Article Content --- */}
          {/* The 'prose' class from @tailwindcss/typography styles all the content inside */}
          <div className="prose prose-lg max-w-none prose-h2:font-bold prose-h2:text-gray-800 prose-a:text-blue-600 hover:prose-a:text-blue-800">
            {post.content}
          </div>
        </article>
      </div>
    </main>
  );
}