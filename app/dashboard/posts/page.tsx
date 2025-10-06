import { getAllBlogs } from '@/lib/action/blog.actions'

import { Button } from '@/components/ui/button'
import Link from 'next/link'
import { PlusCircle } from 'lucide-react'
import AllPostsTable from '../components/AllPostsTable'

export default async function AllPostsPage() {
  const posts = await getAllBlogs()

  return (
    <div className='flex flex-col w-full min-h-screen bg-muted/40'>
      <main className='flex flex-col flex-1 gap-4 p-4 sm:px-6 sm:py-0 md:gap-8'>
        <div className='flex items-center pt-4'>
          <div className='ml-auto flex items-center gap-2'>
            <Link href='/dashboard/blog/new-post'>
              <Button size='sm' className='h-8 gap-1'>
                <PlusCircle className='h-3.5 w-3.5' />
                <span className='sr-only sm:not-sr-only sm:whitespace-nowrap'>Add New Post</span>
              </Button>
            </Link>
          </div>
        </div>

        {/* Pass the fetched data to the client component */}
        <AllPostsTable posts={posts} />
      </main>
    </div>
  )
}
