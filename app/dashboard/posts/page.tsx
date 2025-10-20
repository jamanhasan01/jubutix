// app/dashboard/posts/page.tsx (Server Component)

import React from 'react'
import { getAllBlogs } from '@/lib/action/blog.actions'
import AllPostsTable from '../components/AllPostsTable'
import { Pagination, SearchAndFilter } from '../components/SearchAndFilter'

// NOTE: Define available categories on the server side for consistency
const AVAILABLE_CATEGORIES = ['Technology', 'Lifestyle', 'Travel', 'Food'] 

// Define the component props based on Next.js App Router conventions
interface PostsPageProps {
  // searchParams automatically receives the query parameters from the URL
  searchParams: {
    page?: string
    search?: string
    category?: string
  }
}

export default async function PostsPage({ searchParams }: PostsPageProps) {
  // 🔑 FIX: Await the searchParams object before accessing its properties.
  const awaitedSearchParams = await searchParams;

  // 1. Extract and sanitize parameters from URL, providing defaults
  const currentPage = parseInt(awaitedSearchParams.page || '1')
  const searchQuery = awaitedSearchParams.search || ''
  const categoryFilter = awaitedSearchParams.category || '' // Empty string represents 'all'
  const limit = 10 

  // 2. Fetch the paginated, searched, and filtered data
  const { blogs, totalPages } = await getAllBlogs({
    page: currentPage,
    limit,
    search: searchQuery,
    category: categoryFilter,
  })

  // 3. Render the UI
  return (
    <main className='flex flex-1 flex-col gap-4 p-4 lg:gap-6 lg:p-6'>
      <div className='flex items-center justify-between mb-4'>
        <h1 className='text-lg font-semibold md:text-2xl'>All Blog Posts</h1>
        {/* The client component handles search and filter input, updating the URL */}
        <SearchAndFilter 
          currentSearch={searchQuery}
          currentCategory={categoryFilter}
          categories={AVAILABLE_CATEGORIES}
        />
      </div>

      {/* Renders the table with the fetched data */}
      <AllPostsTable posts={blogs} />
      
      {/* Pagination Component */}
      <div className="flex justify-center mt-4">
        <Pagination totalPages={totalPages} currentPage={currentPage} />
      </div>

    </main>
  )
}