'use client'

import { useCallback, useEffect, useMemo, useState, useTransition } from 'react'
import { createBlog, updateBlog } from '@/lib/actions'
import type { BlogPost } from '@/lib/types'

// shadcn/ui
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Button } from '@/components/ui/button'
import { Label } from '@/components/ui/label'
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
  CardDescription,
} from '@/components/ui/card'
import { Separator } from '@/components/ui/separator'
import { Badge } from '@/components/ui/badge'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { Switch } from '@/components/ui/switch'

// Icons
import {
  Loader2,
  Image as ImageIcon,
  Link as LinkIcon,
  Type,
  Tag as TagIcon,
  Hash,
  FileText as FileTextIcon,
} from 'lucide-react'

import { toast } from 'sonner'
import TiptapEditor from './Tiptap'

// --- helpers ---
const slugify = (str: string) =>
  str
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')
    .slice(0, 120)

const SUGGESTED_CATEGORIES = ['Tech', 'Tutorial', 'News', 'Case Study', 'Opinion', 'Guide']

function isUrl(url?: string) {
  if (!url) return false
  try {
    new URL(url)
    return true
  } catch {
    return false
  }
}

export default function BlogForm({ initial }: { initial?: BlogPost }) {
  // Basic
  const [title, setTitle] = useState(initial?.title ?? '')
  const [slug, setSlug] = useState(initial?.slug ?? '')
  const [autoSlug, setAutoSlug] = useState(!Boolean(initial?.slug))
  const [excerpt, setExcerpt] = useState(initial?.excerpt ?? '')
  const [coverImage, setCoverImage] = useState(initial?.coverImage ?? '')
  const [category, setCategory] = useState(initial?.category ?? '')

  // Tags as chips
  const [tagInput, setTagInput] = useState('')
  const [tags, setTags] = useState<string[]>(initial?.tags ?? [])

  // Content
  const [content, setContent] = useState(initial?.content ?? '')

  // SEO
  const [metaTitle, setMetaTitle] = useState(initial?.seo?.metaTitle ?? '')
  const [metaDescription, setMetaDescription] = useState(initial?.seo?.metaDescription ?? '')
  const [metaAuthor, setMetaAuthor] = useState(initial?.seo?.metaAuthor ?? '')
  const [ogImage, setOgImage] = useState(initial?.seo?.ogImage ?? '')
  const [twitterCard, setTwitterCard] = useState(initial?.seo?.twitterCard ?? 'summary_large_image')
  const [canonicalUrl, setCanonicalUrl] = useState(initial?.seo?.canonicalUrl ?? '')
  const [faqJsonLd, setFaqJsonLd] = useState(initial?.seo?.faqJsonLd ?? '')

  const [isPending, startTransition] = useTransition()

  // Auto-generate slug from title
  useEffect(() => {
    if (autoSlug) setSlug(slugify(title))
  }, [title, autoSlug])

  // Derived UI bits
  const excerptCount = useMemo(() => excerpt.trim().length, [excerpt])
  const metaDescCount = useMemo(() => metaDescription.trim().length, [metaDescription])

  // Tag helpers
  const addTag = useCallback((raw: string) => {
    const t = raw.trim().replace(/,/g, '')
    if (!t) return
    setTags((prev) => (prev.includes(t) ? prev : [...prev, t]))
  }, [])
  const removeTag = useCallback((t: string) => setTags((prev) => prev.filter((x) => x !== t)), [])

  const onTagKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' || e.key === ',') {
      e.preventDefault()
      addTag(tagInput)
      setTagInput('')
    }
  }

  const handleTwitterCardChange = (value: string) => {
    // Assert the value is one of the allowed types.
    // This is safe because we control the <SelectItem> values.
    setTwitterCard(value as 'summary' | 'summary_large_image')
  }

  // Cmd/Ctrl + S to save
  const handleSubmit = useCallback(() => {
    startTransition(async () => {
      if (!title.trim()) {
        toast.error('Title is required')
        return
      }
      if (!content || content.trim().length < 10) {
        toast.error('Please write some content')
        return
      }

      const payload = {
        title,
        slug: slug || slugify(title),
        excerpt,
        coverImage,
        category,
        tags,
        content,
        seo: {
          metaTitle,
          metaDescription,
          metaAuthor,
          ogImage,
          twitterCard,
          canonicalUrl,
          faqJsonLd,
        },
      }

      const tid = toast.loading(initial ? 'Updating post…' : 'Creating post…')
      try {
        if (initial) {
          await updateBlog(initial._id, payload)
          toast.success('Post updated')
        } else {
          await createBlog(payload)
          toast.success('Post created')
        }
      } catch (e: unknown) {
        console.error(e)
        if (e instanceof Error) {
          toast.error(e.message)
        } else {
          toast.error('An unexpected error occurred.')
        }
      } finally {
        toast.dismiss(tid)
      }
    })
  }, [
    title,
    slug,
    excerpt,
    coverImage,
    category,
    tags,
    content,
    metaTitle,
    metaDescription,
    metaAuthor,
    ogImage,
    twitterCard,
    canonicalUrl,
    faqJsonLd,
    initial,
  ])

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 's') {
        e.preventDefault()
        handleSubmit()
      }
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [handleSubmit])

  return (
    <div className='mx-auto max-w-5xl space-y-6'>
      {/* Sticky header actions */}
      <div className='sticky top-0 z-20 -mx-4 md:-mx-8 border-b bg-background/80 backdrop-blur supports-[backdrop-filter]:bg-background/60'>
        <div className='mx-auto max-w-5xl px-4 md:px-8 py-3 flex items-center gap-3'>
          <div className='text-sm text-muted-foreground'>
            {initial ? 'Editing post' : 'New post'}
          </div>
          <Separator orientation='vertical' className='h-5' />
          <div className='ml-auto flex items-center gap-2'>
            <Button variant='outline' onClick={() => window.history.back()} disabled={isPending}>
              Back
            </Button>
            <Button onClick={handleSubmit} disabled={isPending}>
              {isPending && <Loader2 className='mr-2 h-4 w-4 animate-spin' />}
              {initial ? 'Save changes' : 'Create post'}
            </Button>
          </div>
        </div>
      </div>

      {/* Basics */}
      <Card className='shadow-sm'>
        <CardHeader>
          <CardTitle className='flex items-center gap-2'>
            <Type className='h-5 w-5' /> Basics
          </CardTitle>
          <CardDescription>Title, slug, excerpt, and cover image.</CardDescription>
        </CardHeader>
        <CardContent className='space-y-5'>
          <div className='grid gap-2'>
            <Label htmlFor='title'>Title</Label>
            <Input
              id='title'
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder='How to build a better blog with Next.js'
            />
            <div className='flex items-center justify-between text-xs text-muted-foreground'>
              <span>Make it descriptive & scannable.</span>
              <span>{title.trim().length} chars</span>
            </div>
          </div>

          <div className='grid gap-2'>
            <div className='flex items-center justify-between'>
              <Label htmlFor='slug' className='flex items-center gap-2'>
                <Hash className='h-4 w-4' /> Slug
              </Label>
              <div className='flex items-center gap-2 text-sm'>
                <span className='text-muted-foreground'>Auto</span>
                <Switch checked={autoSlug} onCheckedChange={setAutoSlug} />
              </div>
            </div>
            <Input
              id='slug'
              value={slug}
              onChange={(e) => {
                setSlug(e.target.value)
                setAutoSlug(false)
              }}
              placeholder='my-awesome-post'
            />
            <div className='text-xs text-muted-foreground'>
              URL will be <code className='bg-muted px-1 rounded'>/blog/{slug || 'your-slug'}</code>
            </div>
          </div>

          <div className='grid gap-2'>
            <div className='flex items-center justify-between'>
              <Label htmlFor='excerpt'>Excerpt</Label>
              <span
                className={`text-xs ${
                  excerptCount > 160 ? 'text-destructive' : 'text-muted-foreground'
                }`}
              >
                {excerptCount}/160
              </span>
            </div>
            <Textarea
              id='excerpt'
              value={excerpt}
              onChange={(e) => setExcerpt(e.target.value)}
              placeholder='Short summary shown on list pages and SEO.'
              rows={3}
            />
          </div>

          <div className='grid gap-2'>
            <Label htmlFor='cover'>Cover image URL</Label>
            <div className='flex gap-2'>
              <Input
                id='cover'
                value={coverImage}
                onChange={(e) => setCoverImage(e.target.value)}
                placeholder='https://…'
              />
              <Button
                type='button'
                variant='outline'
                onClick={() => setCoverImage(ogImage || coverImage)}
              >
                <ImageIcon className='h-4 w-4 mr-2' /> Use OG
              </Button>
            </div>
            {isUrl(coverImage) ? (
              <div className='aspect-[16/9] overflow-hidden rounded-xl border bg-muted/30'>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={coverImage} alt='Cover preview' className='h-full w-full object-cover' />
              </div>
            ) : (
              <div className='text-xs text-muted-foreground'>
                Paste a full image URL to preview.
              </div>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Content */}
      <Card className='shadow-sm'>
        <CardHeader>
          <CardTitle className='flex items-center gap-2'>
            <FileTextIcon className='h-5 w-5' /> Content
          </CardTitle>
          <CardDescription>Write your article using the rich editor.</CardDescription>
        </CardHeader>
        <CardContent className='space-y-2'>
          <TiptapEditor value={content} onChange={setContent} />
        </CardContent>
      </Card>

      {/* Taxonomy */}
      <Card className='shadow-sm'>
        <CardHeader>
          <CardTitle className='flex items-center gap-2'>
            <TagIcon className='h-5 w-5' /> Taxonomy
          </CardTitle>
          <CardDescription>Organize your post with a category and tags.</CardDescription>
        </CardHeader>
        <CardContent className='space-y-5'>
          <div className='grid gap-2'>
            <Label className='flex items-center gap-2' htmlFor='category'>
              <LinkIcon className='h-4 w-4' /> Category
            </Label>
            <div className='grid gap-2 md:grid-cols-2'>
              <Input
                id='category'
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                placeholder='e.g. Tech'
              />
              <Select onValueChange={setCategory} value={category || undefined}>
                <SelectTrigger aria-label='Pick a category'>
                  <SelectValue placeholder='Quick pick' />
                </SelectTrigger>
                <SelectContent>
                  {SUGGESTED_CATEGORIES.map((c) => (
                    <SelectItem key={c} value={c}>
                      {c}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className='flex flex-wrap gap-1 pt-1'>
              {SUGGESTED_CATEGORIES.map((c) => (
                <Badge
                  key={c}
                  variant='outline'
                  className='cursor-pointer'
                  onClick={() => setCategory(c)}
                >
                  {c}
                </Badge>
              ))}
            </div>
          </div>

          <div className='grid gap-2'>
            <Label className='flex items-center gap-2' htmlFor='tag-input'>
              <TagIcon className='h-4 w-4' /> Tags
            </Label>
            <Input
              id='tag-input'
              value={tagInput}
              onChange={(e) => setTagInput(e.target.value)}
              onKeyDown={onTagKeyDown}
              placeholder='Type a tag and press Enter'
            />
            {!!tags.length && (
              <div className='flex flex-wrap gap-2'>
                {tags.map((t) => (
                  <Badge key={t} variant='secondary' className='group'>
                    {t}
                    <button
                      type='button'
                      className='ml-2 rounded px-1 text-muted-foreground hover:text-foreground'
                      onClick={() => removeTag(t)}
                    >
                      ×
                    </button>
                  </Badge>
                ))}
              </div>
            )}
            {!tags.length && (
              <div className='text-xs text-muted-foreground'>No tags yet. Use Enter to add.</div>
            )}
          </div>
        </CardContent>
      </Card>

      {/* SEO (collapsible) */}
      <Card className='shadow-sm'>
        <CardHeader>
          <CardTitle className='flex items-center gap-2'>
            <LinkIcon className='h-5 w-5' /> SEO
          </CardTitle>
          <CardDescription>Meta tags, Open Graph and structured data.</CardDescription>
        </CardHeader>
        <CardContent className='space-y-5'>
          <div className='grid gap-2'>
            <Label htmlFor='metaTitle'>Meta title</Label>
            <Input
              id='metaTitle'
              value={metaTitle}
              onChange={(e) => setMetaTitle(e.target.value)}
              placeholder='Overrides the page title (optional)'
            />
          </div>

          <div className='grid gap-2'>
            <div className='flex items-center justify-between'>
              <Label htmlFor='metaDesc'>Meta description</Label>
              <span
                className={`text-xs ${
                  metaDescCount > 160 ? 'text-destructive' : 'text-muted-foreground'
                }`}
              >
                {metaDescCount}/160
              </span>
            </div>
            <Textarea
              id='metaDesc'
              rows={3}
              value={metaDescription}
              onChange={(e) => setMetaDescription(e.target.value)}
              placeholder='Concise description for search engines.'
            />
          </div>

          <div className='grid gap-3 md:grid-cols-3'>
            <div className='grid gap-2'>
              <Label htmlFor='metaAuthor'>Meta author</Label>
              <Input
                id='metaAuthor'
                value={metaAuthor}
                onChange={(e) => setMetaAuthor(e.target.value)}
              />
            </div>
            <div className='grid gap-2'>
              <Label htmlFor='og'>OG/Twitter image URL</Label>
              <Input
                id='og'
                value={ogImage}
                onChange={(e) => setOgImage(e.target.value)}
                placeholder='https://…'
              />
            </div>
            <div className='grid gap-2'>
              <Label htmlFor='tw'>Twitter card</Label>
              {/* --- FIX: Use the new handler function --- */}
              <Select value={twitterCard} onValueChange={handleTwitterCardChange}>
                <SelectTrigger id='tw'>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value='summary'>summary</SelectItem>
                  <SelectItem value='summary_large_image'>summary_large_image</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className='grid gap-2'>
            <Label htmlFor='canon'>Canonical URL</Label>
            <Input
              id='canon'
              value={canonicalUrl}
              onChange={(e) => setCanonicalUrl(e.target.value)}
              placeholder='https://example.com/blog/post'
            />
          </div>

          <div className='grid gap-2'>
            <Label htmlFor='faq'>FAQ JSON‑LD (optional)</Label>
            <Textarea
              id='faq'
              value={faqJsonLd}
              onChange={(e) => setFaqJsonLd(e.target.value)}
              placeholder='{"@context":"https://schema.org","@type":"FAQPage"}'
              rows={4}
            />
          </div>
        </CardContent>
        <CardFooter className='justify-end'>
          <Button onClick={handleSubmit} disabled={isPending}>
            {isPending && <Loader2 className='mr-2 h-4 w-4 animate-spin' />}
            {initial ? 'Save changes' : 'Create post'}
          </Button>
        </CardFooter>
      </Card>

      <div className='pb-10' />
    </div>
  )
}