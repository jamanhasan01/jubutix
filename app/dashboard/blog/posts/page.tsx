import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import { MoreHorizontal, PlusCircle } from 'lucide-react'
import Link from 'next/link'
import React from 'react'

// --- Mock Data for Blog Posts ---
const posts = [
  {
    id: 'POST001',
    title: 'Getting Started with Next.js 15',
    author: 'Jane Doe',
    status: 'Published',
    category: 'Web Development',
    createdAt: '2024-08-01',
  },
  {
    id: 'POST002',
    title: 'A Guide to shadcn/ui',
    author: 'John Smith',
    status: 'Published',
    category: 'Design',
    createdAt: '2024-07-28',
  },
  {
    id: 'POST003',
    title: 'The Power of Magic UI',
    author: 'Alice Johnson',
    status: 'Draft',
    category: 'UI/UX',
    createdAt: '2024-08-05',
  },
  {
    id: 'POST004',
    title: 'Advanced Tailwind CSS Techniques',
    author: 'Jane Doe',
    status: 'Archived',
    category: 'CSS',
    createdAt: '2024-06-15',
  },
  {
    id: 'POST005',
    title: 'State Management in React',
    author: 'Bob Brown',
    status: 'Published',
    category: 'React',
    createdAt: '2024-07-20',
  },
]

// --- All Posts Page Component ---
const AllPostsPage = () => {
  return (
    <div className='flex flex-col w-full min-h-screen bg-muted/40'>
      <main className='flex flex-col flex-1 gap-4 p-4 sm:px-6 sm:py-0 md:gap-8'>
        <div className='flex items-center pt-4'>
          <div className='ml-auto flex items-center gap-2'>
            <Link href='/dashboard/blog/new'>
              <Button size='sm' className='h-8 gap-1'>
                <PlusCircle className='h-3.5 w-3.5' />
                <span className='sr-only sm:not-sr-only sm:whitespace-nowrap'>Add New Post</span>
              </Button>
            </Link>
          </div>
        </div>
        <Card>
          <CardHeader>
            <CardTitle>All Blog Posts</CardTitle>
            <CardDescription>
              Manage your blog posts here. You can edit, view, or delete them.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Title</TableHead>
                  <TableHead className='hidden md:table-cell'>Author</TableHead>
                  <TableHead className='hidden md:table-cell'>Category</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead className='hidden md:table-cell'>Created at</TableHead>
                  <TableHead>
                    <span className='sr-only'>Actions</span>
                  </TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {posts.map((post) => (
                  <TableRow key={post.id}>
                    <TableCell className='font-medium'>{post.title}</TableCell>
                    <TableCell className='hidden md:table-cell'>{post.author}</TableCell>
                    <TableCell className='hidden md:table-cell'>
                      <Badge variant='outline'>{post.category}</Badge>
                    </TableCell>
                    <TableCell>
                      <Badge
                        variant={
                          post.status === 'Published'
                            ? 'default'
                            : post.status === 'Draft'
                            ? 'secondary'
                            : 'destructive'
                        }
                      >
                        {post.status}
                      </Badge>
                    </TableCell>
                    <TableCell className='hidden md:table-cell'>{post.createdAt}</TableCell>
                    <TableCell>
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button aria-haspopup='true' size='icon' variant='ghost'>
                            <MoreHorizontal className='h-4 w-4' />
                            <span className='sr-only'>Toggle menu</span>
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align='end'>
                          <DropdownMenuLabel>Actions</DropdownMenuLabel>
                          <DropdownMenuItem>Edit</DropdownMenuItem>
                          <DropdownMenuItem>View</DropdownMenuItem>
                          <DropdownMenuItem className='text-red-600'>Delete</DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </main>
    </div>
  )
}

export default AllPostsPage
