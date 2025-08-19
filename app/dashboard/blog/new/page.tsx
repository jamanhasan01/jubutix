'use client';

import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import Link from 'next/link';
import React, { useState, ChangeEvent, FormEvent } from 'react';
import { useRouter } from 'next/navigation';

// --- Add New Post Page Component (No Slug) ---
const AddNewPostPage = () => {
  const router = useRouter();
  const [formData, setFormData] = useState({
    title: '',
    content: '',
    published: 'false', // 'false' for Draft, 'true' for Published
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSelectChange = (value: string) => {
    setFormData((prev) => ({ ...prev, published: value }));
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError(null);

    try {
      const response = await fetch('/api/blogs', { // Assuming your API is at /api/blogs
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...formData,
          published: formData.published === 'true', // Convert string to boolean
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Failed to create post');
      }

      // Redirect to the posts page on success
      router.push('/dashboard/blog/posts');

    } catch (err) {
      setError(err instanceof Error ? err.message : 'An unknown error occurred');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className='flex justify-center w-full min-h-screen bg-muted/40 p-4 sm:p-6 md:p-8'>
      <main className='w-full max-w-3xl'>
        <form onSubmit={handleSubmit}>
          <div className='grid auto-rows-max items-start gap-4'>
            <Card>
              <CardHeader>
                <CardTitle>Create New Post</CardTitle>
                <CardDescription>
                  Fill in the details below to create a new blog post.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className='grid gap-6'>
                  {/* Post Title */}
                  <div className='grid gap-3'>
                    <Label htmlFor='title'>Title</Label>
                    <Input
                      id='title'
                      name='title'
                      type='text'
                      className='w-full'
                      placeholder='e.g., My First Blog Post'
                      value={formData.title}
                      onChange={handleChange}
                      required
                    />
                  </div>

                  {/* Post Content */}
                  <div className='grid gap-3'>
                    <Label htmlFor='content'>Content</Label>
                    <Textarea
                      id='content'
                      name='content'
                      placeholder='Write your blog post content here...'
                      className='min-h-48'
                      value={formData.content}
                      onChange={handleChange}
                      required
                    />
                  </div>

                  {/* Published Status */}
                  <div className='grid gap-3'>
                    <Label htmlFor='published'>Published</Label>
                    <Select value={formData.published} onValueChange={handleSelectChange}>
                      <SelectTrigger id='published' aria-label='Select status'>
                        <SelectValue placeholder='Select status' />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value='false'>No (Draft)</SelectItem>
                        <SelectItem value='true'>Yes (Published)</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  
                  {error && <p className="text-sm text-red-500">{error}</p>}

                </div>
              </CardContent>
              <CardFooter className='justify-end gap-2'>
                <Link href='/dashboard/blog/posts'>
                  <Button variant='outline' type="button">Cancel</Button>
                </Link>
                <Button type='submit' disabled={isSubmitting}>
                  {isSubmitting ? 'Saving...' : 'Save Post'}
                </Button>
              </CardFooter>
            </Card>
          </div>
        </form>
      </main>
    </div>
  );
};

export default AddNewPostPage;
