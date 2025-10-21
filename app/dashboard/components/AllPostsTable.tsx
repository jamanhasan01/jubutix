'use client'

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
// Assuming this function is correctly implemented as a server action
import { deleteBlog } from '@/lib/action/blog.actions' 
import { BlogPost } from '@/types/blog.types'

import { MoreHorizontal } from 'lucide-react'
import Link from 'next/link'
import React, { useActionState, useEffect } from 'react'
import { toast } from 'sonner'

// 1. Define the shape of a single post object
interface Post {
  _id: string
  title: string
  slug: string
  user?: {
    name: string
  }
  category: string
  // Use literal types for statuses for better type safety
  status: 'publish' | 'draft' | 'archived' 
  createdAt: string | Date
}

// 2. Define the shape of the component's props
interface AllPostsTableProps {
  posts: BlogPost[]
}

// 3. Define the return type of the server action for useActionState
type ActionState = {
  message: string
  // Use literal types for status to match the checks in useEffect
  status: 'success' | 'error' 
} | null

export default function AllPostsTable({ posts }: AllPostsTableProps) {

  const [state, formAction] = useActionState<ActionState, FormData>(deleteBlog, null)
  
  useEffect(() => {
    if (state?.message) {
      if (state.status === 'success') {
        toast.success(state.message)
      } else {
        // Since status is either 'success' or 'error', this covers the 'error' case
        toast.error(state.message) 
      }
    }
  }, [state])

  return (
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
            {posts && posts.length > 0 ? (
              posts.map((post) => (
                <TableRow key={post._id}>
                  <TableCell className='font-medium'>{post.title}</TableCell>
                  <TableCell className='hidden md:table-cell'>{post.user?.name || 'N/A'}</TableCell>
                  <TableCell className='hidden md:table-cell'>
                    <Badge variant='outline'>{post.category}</Badge>
                  </TableCell>
                  <TableCell>
                    <Badge
                      variant={
                        post.status === 'published'
                          ? 'default'
                          : post.status === 'draft'
                          ? 'secondary'
                          : 'destructive'
                      }
                    >
                      {post.status}
                    </Badge>
                  </TableCell>
                  <TableCell className='hidden md:table-cell'>
                    {new Date(post.createdAt).toLocaleDateString()}
                  </TableCell>
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
                        <DropdownMenuItem asChild>
                          <Link href={`/dashboard/posts/edit/${post._id}`}>Edit</Link>
                        </DropdownMenuItem>
                        <DropdownMenuItem asChild>
                          <Link href={`/dashboard/posts/view/${post.slug}`}>View</Link>
                        </DropdownMenuItem>
                        <DropdownMenuItem asChild>
                          <form action={formAction}>
                            <input type='hidden' name='id' value={post._id} />
                            {/* Make the delete button look like a link/menu item for better UX */}
                            <button type='submit' className="w-full text-left">
                                Delete
                            </button>
                          </form>
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={6} className='text-center text-gray-500'>
                  No blog posts found.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  )
}