// @/dashboard/page.tsx
'use server'

import React from 'react'
import { Tag } from 'lucide-react'
// Import the new action: getCategoryBreakdown
import { getAllBlogs, getBlogMetrics, getCategoryBreakdown } from '@/lib/action/blog.actions' 

// --- SHADCN UI-LIKE MOCK COMPONENTS (Keep existing mock components)
const Card: React.FC<React.ComponentProps<'div'>> = ({ children, className = '' }) => (
  <div className={`rounded-xl border bg-card text-card-foreground shadow ${className}`}>{children}</div>
)
const CardHeader: React.FC<React.ComponentProps<'div'>> = ({ children, className = '' }) => (
  <div className={`flex flex-col space-y-1.5 p-6 ${className}`}>{children}</div>
)
const CardTitle: React.FC<React.ComponentProps<'h3'>> = ({ children, className = '' }) => (
  <h3 className={`text-2xl font-semibold leading-none tracking-tight ${className}`}>{children}</h3>
)
const CardContent: React.FC<React.ComponentProps<'div'>> = ({ children, className = '' }) => (
  <div className={`p-6 pt-0 ${className}`}>{children}</div>
)
const CardDescription: React.FC<React.ComponentProps<'p'>> = ({ children, className = '' }) => (
  <p className={`text-sm text-muted-foreground ${className}`}>{children}</p>
)
const Badge: React.FC<{ children: React.ReactNode; variant?: 'default' | 'secondary' }> = ({
  children,
  variant = 'default',
}) => {
  const baseClasses =
    'inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold'
  const variantClasses =
    variant === 'secondary'
      ? 'bg-secondary text-secondary-foreground'
      : 'bg-primary text-primary-foreground'
  return <span className={`${baseClasses} ${variantClasses}`}>{children}</span>
}

const Table: React.FC<React.ComponentProps<'table'>> = ({ children }) => (
  <div className="w-full overflow-auto">
    <table className="w-full caption-bottom text-sm">{children}</table>
  </div>
)
const TableHeader: React.FC<React.ComponentProps<'thead'>> = ({ children }) => (
  <thead className="[&_tr]:border-b">{children}</thead>
)
const TableBody: React.FC<React.ComponentProps<'tbody'>> = ({ children }) => (
  <tbody className="[&_tr:last-child]:border-0">{children}</tbody>
)
const TableRow: React.FC<React.ComponentProps<'tr'>> = ({ children }) => (
  <tr className="border-b transition-colors hover:bg-muted/50 data-[state=selected]:bg-muted">
    {children}
  </tr>
)
const TableHead: React.FC<React.ComponentProps<'th'>> = ({ children }) => (
  <th className="h-12 px-4 text-left align-middle font-medium text-muted-foreground [&:has([role=checkbox])]:pr-0">
    {children}
  </th>
)
const TableCell: React.FC<React.ComponentProps<'td'>> = ({ children, className = '' }) => (
  <td className={`p-4 align-middle [&:has([role=checkbox])]:pr-0 ${className}`}>{children}</td>
)

// ----------------------------------------------------------------------
// Dashboard Page
// ----------------------------------------------------------------------

const DashBoardPage = async () => {
  // 1. Fetch ACCURATE METRICS
  const { totalPosts, publishedCount, draftCount } = await getBlogMetrics()

  // 2. Fetch category breakdown for ALL posts
  const categoryData = await getCategoryBreakdown()

  // 3. Fetch recent posts for the table (efficiently loads only 5)
  const { blogs: recentPosts } = await getAllBlogs({ page: 1, limit: 5 })

  // Calculate the total number of unique categories
  const totalCategories = categoryData.length

  return (
    <div className="flex-1 space-y-4 p-8 pt-6">
      <h2 className="text-3xl font-bold tracking-tight">Dashboard Overview</h2>

      {/* Metrics (Using accurate counts) */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader>
            <CardTitle>Total Posts</CardTitle>
            <CardDescription>Total number of blogs</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">{totalPosts}</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Published</CardTitle>
            <CardDescription>Live posts visible to readers</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">{publishedCount}</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Drafts</CardTitle>
            <CardDescription>Unpublished posts</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">{draftCount}</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Categories</CardTitle>
            <CardDescription>Unique blog categories</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">{totalCategories}</div>
          </CardContent>
        </Card>
      </div>

      {/* Posts & Category Breakdown */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7 mt-6">
        <Card className="col-span-4">
          <CardHeader>
            <CardTitle>Recent Blog Posts</CardTitle>
            <CardDescription>Latest {recentPosts.length} posts by update date</CardDescription>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Title</TableHead>
                  <TableHead>Author</TableHead>
                  <TableHead>Category</TableHead>
                  <TableHead>Status</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {recentPosts.length > 0 ? (
                  recentPosts.map((post) => (
                    // Type casting required as it comes from JSON.parse(JSON.stringify(blogs))
                    <TableRow key={post._id as string}> 
                      <TableCell className="font-medium">{post.title}</TableCell>
                      <TableCell>{(post.user as { name: string })?.name || 'Unknown'}</TableCell>
                      <TableCell>{post.category}</TableCell>
                      <TableCell>
                        <Badge variant={post.status === 'published' ? 'default' : 'secondary'}>
                          {post.status}
                        </Badge>
                      </TableCell>
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell colSpan={4} className="text-center">
                      No recent posts found.
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </CardContent>
        </Card>

        {/* Category Breakdown (Based on ALL posts) */}
        <Card className="col-span-3">
          <CardHeader>
            <CardTitle>Category Breakdown</CardTitle>
            <CardDescription>Distribution of posts by category (all data)</CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            {categoryData.length > 0 ? (
              categoryData.map((cat) => (
                <div key={cat.category} className="flex items-center">
                  <Tag className="h-4 w-4 text-muted-foreground" />
                  <div className="ml-4">
                    <p className="text-sm font-medium">{cat.category}</p>
                    <p className="text-xs text-muted-foreground">
                      {/* Calculate percentage using totalPosts (the full count) */}
                      {((cat.count / totalPosts) * 100).toFixed(1)}% of total
                    </p>
                  </div>
                  <div className="ml-auto font-semibold">{cat.count}</div>
                </div>
              ))
            ) : (
              <p className="text-sm text-muted-foreground">No categories available</p>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

export default DashBoardPage