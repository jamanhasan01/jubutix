'use client'
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Type } from 'lucide-react'
import React, { useEffect, useRef, useState } from 'react'
import { useActionState } from 'react' // Correct import for React 19+
import TiptapEditor from './Tiptap'
import { createBlog } from '@/lib/action/blog.actions'
import { Button } from '@/components/ui/button'
import { toast } from 'sonner'
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { FaSearch } from 'react-icons/fa'

const blogCategories = ['Technology', 'Marketing', 'Web Development', 'Business', 'Lifestyle']

const BlogForm = () => {
  const [content, setContent] = useState('')
  const [state, formAction, isPending] = useActionState(createBlog, null)
  const formRef = useRef(null)


  useEffect(() => {
    if (state?.message) {
      if (state.status === 'success') {
        toast.success(state.message)
        setContent('')
      } else if (state.status === 'error') {
        toast.error(state.message)
      }
    }
  }, [state])

  return (
    <div className='m-6'>
      <form ref={formRef} action={formAction} className='space-y-10'>
        <Card>
          <CardHeader>
            <CardTitle className='flex items-center gap-2'>
              <Type className='w-5 h-5' />
              Blog
            </CardTitle>
            <CardDescription>Title, Slug, Cover Image, Content, Category</CardDescription>
          </CardHeader>

          <CardContent className='grid md:grid-cols-2 gap-6'>
            <div className='space-y-2'>
              <Label htmlFor='title'>Title</Label>
              {/* ✅ Added placeholder */}
              <Input type='text' name='title' id='title' placeholder='The Ultimate Guide to...' />
              {state?.errors?.title && <p className='text-sm text-red-500'>{state.errors.title}</p>}
            </div>
            <div className='space-y-2'>
              <Label htmlFor='slug'>Slug</Label>
              {/* ✅ Added placeholder */}
              <Input type='text' name='slug' id='slug' placeholder='e.g., the-ultimate-guide' />
              {state?.errors?.slug && <p className='text-sm text-red-500'>{state.errors.slug}</p>}
            </div>
            <div className='space-y-2'>
              <Label>Cover Image</Label>
              <Input type='file' name='coverImage' accept='image/*' />
              {state?.errors?.coverImage && (
                <p className='text-sm text-red-500'>{state.errors.coverImage}</p>
              )}
            </div>
            <div className='space-y-2'>
              <Label>Select Category</Label>
              <Select name='category'>
                <SelectTrigger className='w-full'>
                  <SelectValue placeholder='Choose a category...' />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <SelectLabel>Categories</SelectLabel>
                    {blogCategories.map((c) => (
                      <SelectItem key={c} value={c}>
                        {c}
                      </SelectItem>
                    ))}
                  </SelectGroup>
                </SelectContent>
              </Select>
              {state?.errors?.category && (
                <p className='text-sm text-red-500'>{state.errors.category}</p>
              )}
            </div>
          </CardContent>

          <CardContent>
            <TiptapEditor value={content} onChange={setContent} />
            <input type='hidden' name='content' value={content} />
            {state?.errors?.content && (
              <p className='mt-2 text-sm text-red-500'>{state.errors.content}</p>
            )}
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle className='flex items-center gap-2'>
              <FaSearch className='w-5 h-5' /> SEO
            </CardTitle>
            <CardDescription>Meta title , Meta description</CardDescription>
          </CardHeader>
          <CardContent className='grid grid-cols-2 gap-6'>
            <div className='space-y-2'>
              <Label>Meta Title</Label>
              {/* ✅ Added placeholder */}
              <Input
                name='meta_title'
                type='text'
                id='meta_title'
                placeholder='A concise title for SEO'
              />
              {state?.errors?.['seo.metaTitle'] && (
                <p className='text-sm text-red-500'>{state.errors['seo.metaTitle']}</p>
              )}
            </div>
            <div className='space-y-2'>
              <Label>Meta Description</Label>
              {/* ✅ Added placeholder */}
              <Input
                name='meta_description'
                type='text'
                id='meta_description'
                placeholder='A compelling description for search engines'
              />
              {state?.errors?.['seo.metaDescription'] && (
                <p className='text-sm text-red-500'>{state.errors['seo.metaDescription']}</p>
              )}
            </div>
          </CardContent>

          <CardContent className='flex flex-col gap-4'>
            <Button type='submit' disabled={isPending}>
              {isPending ? 'Creating Post...' : 'Create Post'}
            </Button>
          </CardContent>
        </Card>
      </form>
    </div>
  )
}

export default BlogForm
