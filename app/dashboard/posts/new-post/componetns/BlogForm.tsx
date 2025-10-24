'use client'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Type } from 'lucide-react'
import React, { useEffect, useRef, useState } from 'react'
import { useActionState } from 'react'
import TiptapEditor from './Tiptap'
import { createBlog, editBlog, ActionState } from '@/lib/action/blog.actions'
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
import { BlogPost } from '@/types/blog.types'
import { useRouter } from 'next/navigation'

interface BlogFormProps {
  initialPost?: BlogPost | null
}

// --- Component Logic ---Digital Marketing



const blogCategories = ['Digital Marketing','Google Ads', 'Facebook Ads','SEO']

const BlogForm: React.FC<BlogFormProps> = ({ initialPost }) => {
  const isEditing = !!initialPost
  const router = useRouter()
  const initialContent = initialPost?.content || ''
  const initialStatus = initialPost?.status || 'draft' 

  const [content, setContent] = useState(initialContent)

  const [currentStatus, setCurrentStatus] = useState(initialStatus)

  // Assign the correct action dynamically
  const action = isEditing ? editBlog : createBlog

  const [state, formAction, isPending] = useActionState<ActionState, FormData>(action, null)
  const formRef = useRef<HTMLFormElement>(null)

  useEffect(() => {
    if (state?.message) {
      if (state.status === 'success') {
        toast.success(state.message)
        if (!isEditing) {
          router.push('/dashboard/posts') 
          setContent('')
          formRef.current?.reset()
        }
      } else if (state.status === 'error') {
        toast.error(state.message)
      }
    }
  }, [state, isEditing, router])

  return (
    <div className='m-6'>
      <form ref={formRef} action={formAction} className='space-y-10'>
        {isEditing && <input type='hidden' name='id' value={initialPost!._id} />}

        <input type='hidden' name='content' value={content} />

        <input type='hidden' name='status' value={currentStatus} />

        <Card>
          <CardHeader>
            <CardTitle className='flex items-center gap-2'>
              <Type className='w-5 h-5' />
              {isEditing ? 'Edit Post' : 'New Post'}
            </CardTitle>
            <CardDescription>Title, Slug, Cover Image, Content, Category</CardDescription>
          </CardHeader>

          <CardContent className='grid md:grid-cols-2 gap-6'>
            {/* Title */}
            <div className='space-y-2'>
              <Label htmlFor='title'>Add Title</Label>
              <Input
                type='text'
                name='title'
                id='title'
                placeholder='The Ultimate Guide to...'
                defaultValue={initialPost?.title || ''}
              />
              {state?.errors?.title && <p className='text-sm text-red-500'>{state.errors.title}</p>}
            </div>

            {/* Slug */}
            <div className='space-y-2'>
              <Label htmlFor='slug'>Add Slug</Label>
              <Input
                type='text'
                name='slug'
                id='slug'
                placeholder='e.g., the-ultimate-guide'
                defaultValue={initialPost?.slug || ''}
              />
              {state?.errors?.slug && <p className='text-sm text-red-500'>{state.errors.slug}</p>}
            </div>

            {/* Feature Image */}
            <div className='space-y-2'>
              <Label>Set Feature Image</Label>
              {isEditing && initialPost?.featureImage && (
                <img
                  src={initialPost.featureImage}
                  alt='Current Feature'
                  className='w-20 h-20 object-cover rounded'
                />
              )}
              <Input type='file' name='featureImage' accept='image/*' />
              {state?.errors?.featureImage && (
                <p className='text-sm text-red-500'>{state.errors.featureImage}</p>
              )}
            </div>

            {/* Category Select */}
            <div className='space-y-2'>
              <Label>Select Categories</Label>
              <Select name='category' defaultValue={initialPost?.category}>
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

          {/* Content Editor */}
          <CardContent>
            <TiptapEditor value={content} onChange={setContent} />
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
            <CardDescription>Meta title, Meta description</CardDescription>
          </CardHeader>
          <CardContent className='grid grid-cols-2 gap-6'>
            {/* Meta Title */}
            <div className='space-y-2'>
              <Label>Meta Title</Label>
              <Input
                name='meta_title'
                type='text'
                id='meta_title'
                placeholder='A concise title for SEO'
                defaultValue={initialPost?.seo?.metaTitle || ''}
              />
              {state?.errors?.['seo.metaTitle'] && (
                <p className='text-sm text-red-500'>{state.errors['seo.metaTitle']}</p>
              )}
            </div>

            {/* Meta Description */}
            <div className='space-y-2'>
              <Label>Meta Description</Label>
              <Input
                name='meta_description'
                type='text'
                id='meta_description'
                placeholder='A compelling description for search engines'
                defaultValue={initialPost?.seo?.metaDescription || ''}
              />
              {state?.errors?.['seo.metaDescription'] && (
                <p className='text-sm text-red-500'>{state.errors['seo.metaDescription']}</p>
              )}
            </div>
          </CardContent>

          <CardContent className='flex items-center justify-end gap-4'>
            {/* Draft Button: sends status='draft' */}
            <Button
              type='submit'
              name='status'
              value='draft'
              variant='outline'
              disabled={isPending}
              onClick={() => setCurrentStatus('draft')}
            >
              {isPending ? 'Saving...' : 'Save as Draft'}
            </Button>

            {/* Publish Button: sends status='published' */}
            <Button
              type='submit'
              name='status'
              value='published'
              disabled={isPending}
              onClick={() => setCurrentStatus('published')}
            >
              {isPending
                ? isEditing
                  ? 'Updating...'
                  : 'Publishing...'
                : isEditing
                ? 'Update & Publish'
                : 'Publish'}
            </Button>
          </CardContent>
        </Card>
      </form>
    </div>
  )
}

export default BlogForm
