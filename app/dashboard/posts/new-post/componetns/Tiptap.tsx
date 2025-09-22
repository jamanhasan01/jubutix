'use client'

import { useEditor, EditorContent } from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit'
import Link from '@tiptap/extension-link'
import Underline from '@tiptap/extension-underline'
import TextAlign from '@tiptap/extension-text-align'
import Image from '@tiptap/extension-image'
import Placeholder from '@tiptap/extension-placeholder'
import Heading, { Level } from '@tiptap/extension-heading'

// List extensions (explicitly added to avoid issues)
import BulletList from '@tiptap/extension-bullet-list'
import OrderedList from '@tiptap/extension-ordered-list'
import ListItem from '@tiptap/extension-list-item'

import { useEffect, useRef, useState } from 'react'

// Icons
import {
  Bold,
  Italic,
  Underline as UnderlineIcon,
  Strikethrough,
  List,
  ListOrdered,
  Quote,
  Minus,
  ImageIcon,
  Link as LinkIcon,
  Undo,
  Redo,
  Pilcrow,
  Type,
} from 'lucide-react'

export type TiptapProps = {
  value: string
  onChange: (html: string) => void
}

export default function TiptapEditor({ value, onChange }: TiptapProps) {
  const [activeTag, setActiveTag] = useState('Paragraph')

  const editor = useEditor({
    extensions: [
      StarterKit.configure({ heading: false }),
      Heading.configure({ levels: [1, 2, 3] }),
      BulletList,
      OrderedList,
      ListItem,
      Underline,
      Link.configure({
        openOnClick: true,
        autolink: true,
        HTMLAttributes: {
          class:
            'text-blue-600 underline underline-offset-2 hover:text-blue-800 flex items-center gap-1',
        },
      }),
      Image,
      TextAlign.configure({ types: ['heading', 'paragraph'] }),
      Placeholder.configure({
        placeholder: '✍️ Start writing your amazing blog post here...',
      }),
    ],
    content: value || '',
    editorProps: {
      attributes: {
        class:
          'prose dark:prose-invert max-w-none focus:outline-none prose-p:mt-0 prose-headings:mt-0',
      },
    },
    onUpdate({ editor }) {
      onChange(editor.getHTML())
    },
    onSelectionUpdate({ editor }) {
      if (editor.isActive('heading', { level: 1 })) {
        setActiveTag('Heading 1')
      } else if (editor.isActive('heading', { level: 2 })) {
        setActiveTag('Heading 2')
      } else if (editor.isActive('heading', { level: 3 })) {
        setActiveTag('Heading 3')
      } else if (editor.isActive('bulletList')) {
        setActiveTag('Bullet List')
      } else if (editor.isActive('orderedList')) {
        setActiveTag('Numbered List')
      } else if (editor.isActive('blockquote')) {
        setActiveTag('Quote')
      } else {
        setActiveTag('Paragraph')
      }
    },
    immediatelyRender: false,
  })

  const editorRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!editor) return
    if (value !== editor.getHTML()) {
      editor.commands.setContent(value || '', { emitUpdate: false })
    }
  }, [value, editor])

  if (!editor) return null

  return (
    <div className='border rounded-xl bg-background shadow-sm overflow-hidden'>
      {/* Fixed Toolbar */}
      <div className='sticky top-0 z-10 flex flex-wrap gap-1 p-2 border-b bg-muted/40 backdrop-blur-sm'>
        <ToolbarBtn
          onClick={() => editor.chain().focus().toggleBold().run()}
          active={editor.isActive('bold')}
          title='Bold'
        >
          <Bold size={16} />
        </ToolbarBtn>
        <ToolbarBtn
          onClick={() => editor.chain().focus().toggleItalic().run()}
          active={editor.isActive('italic')}
          title='Italic'
        >
          <Italic size={16} />
        </ToolbarBtn>
        <ToolbarBtn
          onClick={() => editor.chain().focus().toggleUnderline().run()}
          active={editor.isActive('underline')}
          title='Underline'
        >
          <UnderlineIcon size={16} />
        </ToolbarBtn>
        <ToolbarBtn
          onClick={() => editor.chain().focus().toggleStrike().run()}
          active={editor.isActive('strike')}
          title='Strikethrough'
        >
          <Strikethrough size={16} />
        </ToolbarBtn>
        <Divider />

        {/* Paragraph & Headings */}
        <ToolbarBtn
          onClick={() => editor.chain().focus().setParagraph().run()}
          active={editor.isActive('paragraph')}
          title='Paragraph'
        >
          <Pilcrow size={16} />
        </ToolbarBtn>
        {([1, 2, 3] as Level[]).map((level) => (
          <ToolbarBtn
            key={level}
            onClick={() => editor.chain().focus().toggleHeading({ level }).run()}
            active={editor.isActive('heading', { level })}
            title={`Heading ${level}`}
          >
            <Type size={16} /> H{level}
          </ToolbarBtn>
        ))}
        <Divider />

        {/* Lists */}
        <ToolbarBtn
          onClick={() => editor.chain().focus().toggleBulletList().run()}
          active={editor.isActive('bulletList')}
          title='Bullet List'
        >
          <List size={16} />
        </ToolbarBtn>
        <ToolbarBtn
          onClick={() => editor.chain().focus().toggleOrderedList().run()}
          active={editor.isActive('orderedList')}
          title='Numbered List'
        >
          <ListOrdered size={16} />
        </ToolbarBtn>
        <ToolbarBtn
          onClick={() => editor.chain().focus().toggleBlockquote().run()}
          active={editor.isActive('blockquote')}
          title='Blockquote'
        >
          <Quote size={16} />
        </ToolbarBtn>
        <ToolbarBtn
          onClick={() => editor.chain().focus().setHorizontalRule().run()}
          title='Horizontal Rule'
        >
          <Minus size={16} />
        </ToolbarBtn>
        <Divider />

        {/* Media & Links */}
        <ToolbarBtn
          onClick={() => {
            const url = prompt('Image URL')
            if (url) editor.chain().focus().setImage({ src: url }).run()
          }}
          title='Insert Image'
        >
          <ImageIcon size={16} />
        </ToolbarBtn>
        <ToolbarBtn
          onClick={() => {
            const url = prompt('Link URL')
            if (url)
              editor.chain().focus().setLink({ href: url, target: '_blank' }).run()
          }}
          active={editor.isActive('link')}
          title='Insert Link'
        >
          <LinkIcon size={16} />
        </ToolbarBtn>
        <Divider />

        {/* Undo/Redo */}
        <ToolbarBtn
          onClick={() => editor.chain().focus().undo().run()}
          title='Undo'
        >
          <Undo size={16} />
        </ToolbarBtn>
        <ToolbarBtn
          onClick={() => editor.chain().focus().redo().run()}
          title='Redo'
        >
          <Redo size={16} />
        </ToolbarBtn>
      </div>

      {/* Editor with scrolling content */}
      <div
        className='p-3 h-[400px] overflow-y-auto [&_ul]:list-disc [&_ul]:ml-6 [&_ol]:list-decimal [&_ol]:ml-6'
        ref={editorRef}
      >
        <EditorContent editor={editor} />
      </div>
      
      {/* Active Tag Status Footer */}
      <div className='p-2 border-t text-xs text-muted-foreground bg-muted/40'>
        Current: <span className='font-semibold'>{activeTag}</span>
      </div>
    </div>
  )
}

function ToolbarBtn({
  children,
  onClick,
  active,
  title,
}: {
  children: React.ReactNode
  onClick: () => void
  active?: boolean
  title?: string
}) {
  return (
    <button
      type='button'
      onClick={onClick}
      title={title}
      className={`flex items-center gap-1 px-2 py-1 rounded-md hover:bg-accent hover:text-accent-foreground transition ${
        active ? 'bg-primary text-white font-semibold' : ''
      }`}
    >
      {children}
    </button>
  )
}

function Divider() {
  return <span className='w-px h-6 bg-border mx-2' />
}