// app/dashboard/posts/page.tsx
import React from 'react'
import { getAllBlogs } from '@/lib/action/blog.actions'
import AllPostsTable from '../components/AllPostsTable'
import { Pagination, SearchAndFilter } from '../components/SearchAndFilter'

const AVAILABLE_CATEGORIES = ['Technology', 'Lifestyle', 'Travel', 'Food']

// ✅ Fix: mark both props as Promises (as expected by Next.js 15 PageProps)
export default async function PostsPage({
  searchParams,
  params,
}: {
  searchParams: Promise<{
    page?: string | null
    search?: string | null
    category?: string | null
  }>
  params: Promise<Record<string, string>>
}) {
  // ✅ Await both since they are Promises now
  const resolvedSearchParams = await searchParams
  const resolvedParams = await params // (not used, but satisfies type check)

  const currentPage = parseInt(resolvedSearchParams.page || '1')
  const searchQuery = resolvedSearchParams.search || ''
  const categoryFilter = resolvedSearchParams.category || ''
  const limit = 10

  const { blogs, totalPages } = await getAllBlogs({
    page: currentPage,
    limit,
    search: searchQuery,
    category: categoryFilter,
  })

  return (
    <main className='flex flex-1 flex-col gap-4 p-4 lg:gap-6 lg:p-6'>
      <div className='flex items-center justify-between mb-4'>
        <h1 className='text-lg font-semibold md:text-2xl'>All Blog Posts</h1>
        <SearchAndFilter
          currentSearch={searchQuery}
          currentCategory={categoryFilter}
          categories={AVAILABLE_CATEGORIES}
        />
      </div>

      <AllPostsTable posts={blogs} />

      <div className='flex justify-center mt-4'>
        <Pagination totalPages={totalPages} currentPage={currentPage} />
      </div>
    </main>
  )
}
