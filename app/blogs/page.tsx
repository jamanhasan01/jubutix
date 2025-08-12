// app/blog/page.tsx

import Image from 'next/image'
import Link from 'next/link'
import { Badge } from '@/components/ui/badge'
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { Pagination, PaginationContent, PaginationItem, PaginationLink, PaginationNext, PaginationPrevious } from '@/components/ui/pagination'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'

// --- Mock Data for Blog Posts ---
// In a real app, this would come from a CMS (like Sanity, Contentful, or Strapi)
const posts = [
  {
    slug: 'mastering-seo-in-2025',
    title: 'Mastering SEO in 2025: A Guide for Dominating SERPs',
    category: 'SEO',
    imageUrl: '/results/result-1.png', // Replace with actual image
    excerpt: 'The digital landscape is always evolving. Stay ahead with our comprehensive guide to the latest SEO strategies that deliver results.',
    author: { name: 'Umar Tazkeer', imageUrl: '/person.jpg' },
    date: 'July 15, 2025',
  },
  {
    slug: 'ppc-campaigns-that-convert',
    title: 'Beyond the Click: Building PPC Campaigns That Actually Convert',
    category: 'PPC',
    imageUrl: '/results/result-2.png', // Replace with actual image
    excerpt: 'Stop burning your ad spend. Learn how to structure PPC campaigns that focus on what matters most: conversions and ROI.',
    author: { name: 'Jane Doe', imageUrl: '/person.jpg' },
    date: 'July 10, 2025',
  },
   {
    slug: 'the-power-of-meta-ads',
    title: 'The Untapped Power of Meta Ads for B2B Lead Generation',
    category: 'Social Media',
    imageUrl: '/results/result-3.png', // Replace with actual image
    excerpt: 'Think Facebook and Instagram are just for B2C? Think again. We break down how to generate high-quality B2B leads using Meta Ads.',
    author: { name: 'John Smith', imageUrl: '/person.jpg' },
    date: 'July 5, 2025',
  },
  // ... add more post objects here
];

const featuredPost = posts[0];
const otherPosts = posts.slice(1);

// --- Blog Listing Page Component ---
export default function BlogListPage() {
  return (
    <main className="bg-slate-50">
      <div className="container mx-auto px-4 py-16 sm:py-24">
        {/* --- Header --- */}
        <div className="text-center mb-16">
          <h1 className="text-4xl font-extrabold text-gray-900 sm:text-5xl lg:text-6xl">
            Digital Marketing Insights
          </h1>
          <p className="mt-4 text-xl text-gray-600 max-w-2xl mx-auto">
            Actionable strategies and expert analysis to help you grow your business.
          </p>
        </div>

        {/* --- Featured Post --- */}
        <Card className="grid grid-cols-1 md:grid-cols-2 overflow-hidden mb-16 shadow-lg">
          <div className="relative h-64 md:h-auto">
            <Image src={featuredPost.imageUrl} alt={featuredPost.title} fill className="object-cover"/>
          </div>
          <div className="p-8 flex flex-col justify-center">
            <Badge variant="destructive" className="w-fit">{featuredPost.category}</Badge>
            <CardTitle className="mt-4 text-3xl font-bold">
              <Link href={`/blog/${featuredPost.slug}`} className="hover:text-blue-600 transition-colors">
                {featuredPost.title}
              </Link>
            </CardTitle>
            <p className="mt-4 text-gray-600">{featuredPost.excerpt}</p>
            <div className="mt-6 flex items-center gap-4">
              <Avatar>
                <AvatarImage src={featuredPost.author.imageUrl} alt={featuredPost.author.name} />
                <AvatarFallback>{featuredPost.author.name.charAt(0)}</AvatarFallback>
              </Avatar>
              <div>
                <p className="font-semibold text-gray-900">{featuredPost.author.name}</p>
                <p className="text-sm text-gray-500">{featuredPost.date}</p>
              </div>
            </div>
          </div>
        </Card>

        {/* --- Regular Posts Grid --- */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {otherPosts.map((post) => (
            <Card key={post.slug} className="flex flex-col overflow-hidden hover:shadow-xl transition-shadow duration-300">
              <CardHeader className="p-0">
                <Link href={`/blog/${post.slug}`}>
                  <div className="relative h-52 w-full">
                    <Image src={post.imageUrl} alt={post.title} fill className="object-cover" />
                  </div>
                </Link>
              </CardHeader>
              <CardContent className="p-6 flex-grow">
                <Badge>{post.category}</Badge>
                <CardTitle className="mt-3 text-xl font-bold">
                  <Link href={`/blog/${post.slug}`} className="hover:text-blue-600 transition-colors">
                    {post.title}
                  </Link>
                </CardTitle>
                <p className="mt-3 text-sm text-gray-600 line-clamp-3">{post.excerpt}</p>
              </CardContent>
              <CardFooter className="p-6 pt-0">
                 <div className="flex items-center gap-3">
                  <Avatar className="h-9 w-9">
                    <AvatarImage src={post.author.imageUrl} alt={post.author.name} />
                    <AvatarFallback>{post.author.name.charAt(0)}</AvatarFallback>
                  </Avatar>
                  <div>
                    <p className="text-sm font-semibold text-gray-900">{post.author.name}</p>
                    <p className="text-xs text-gray-500">{post.date}</p>
                  </div>
                </div>
              </CardFooter>
            </Card>
          ))}
        </div>
        
        {/* --- Pagination --- */}
        <Pagination className="mt-16">
          <PaginationContent>
            <PaginationItem><PaginationPrevious href="#" /></PaginationItem>
            <PaginationItem><PaginationLink href="#">1</PaginationLink></PaginationItem>
            <PaginationItem><PaginationLink href="#" isActive>2</PaginationLink></PaginationItem>
            <PaginationItem><PaginationLink href="#">3</PaginationLink></PaginationItem>
            <PaginationItem><PaginationNext href="#" /></PaginationItem>
          </PaginationContent>
        </Pagination>

      </div>
    </main>
  );
}