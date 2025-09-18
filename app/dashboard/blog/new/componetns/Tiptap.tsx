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

import { useEffect } from 'react'

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
          'prose dark:prose-invert max-w-none min-h-[320px] focus:outline-none prose-p:mt-0 prose-headings:mt-0',
      },
    },
    onUpdate({ editor }) {
      onChange(editor.getHTML())
    },
    immediatelyRender: false,
  })

  useEffect(() => {
    if (!editor) return
    if (value !== editor.getHTML()) {
      editor.commands.setContent(value || '', { emitUpdate: false })
    }
  }, [value, editor])

  if (!editor) return null

  return (
    <div className='border rounded-xl bg-background shadow-sm'>
      {/* Toolbar */}
      <div className='flex flex-wrap gap-1 p-2 border-b bg-muted/40'>
        <ToolbarBtn
          onClick={() => editor.chain().focus().toggleBold().run()}
          active={editor.isActive('bold')}
        >
          <Bold size={16} />
        </ToolbarBtn>
        <ToolbarBtn
          onClick={() => editor.chain().focus().toggleItalic().run()}
          active={editor.isActive('italic')}
        >
          <Italic size={16} />
        </ToolbarBtn>
        <ToolbarBtn
          onClick={() => editor.chain().focus().toggleUnderline().run()}
          active={editor.isActive('underline')}
        >
          <UnderlineIcon size={16} />
        </ToolbarBtn>
        <ToolbarBtn
          onClick={() => editor.chain().focus().toggleStrike().run()}
          active={editor.isActive('strike')}
        >
          <Strikethrough size={16} />
        </ToolbarBtn>
        <Divider />

        {/* Paragraph & Headings */}
        <ToolbarBtn
          onClick={() => editor.chain().focus().setParagraph().run()}
          active={editor.isActive('paragraph')}
        >
          <Pilcrow size={16} />
        </ToolbarBtn>
        {([1, 2, 3] as Level[]).map((level) => (
          <ToolbarBtn
            key={level}
            onClick={() => editor.chain().focus().toggleHeading({ level }).run()}
            active={editor.isActive('heading', { level })}
          >
            <Type size={16} /> H{level}
          </ToolbarBtn>
        ))}
        <Divider />

        {/* Lists */}
        <ToolbarBtn
          onClick={() => editor.chain().focus().toggleBulletList().run()}
          active={editor.isActive('bulletList')}
        >
          <List size={16} />
        </ToolbarBtn>
        <ToolbarBtn
          onClick={() => editor.chain().focus().toggleOrderedList().run()}
          active={editor.isActive('orderedList')}
        >
          <ListOrdered size={16} />
        </ToolbarBtn>
        <ToolbarBtn
          onClick={() => editor.chain().focus().toggleBlockquote().run()}
          active={editor.isActive('blockquote')}
        >
          <Quote size={16} />
        </ToolbarBtn>
        <ToolbarBtn onClick={() => editor.chain().focus().setHorizontalRule().run()}>
          <Minus size={16} />
        </ToolbarBtn>
        <Divider />

        {/* Media & Links */}
        <ToolbarBtn
          onClick={() => {
            const url = prompt('Image URL')
            if (url) editor.chain().focus().setImage({ src: url }).run()
          }}
        >
          <ImageIcon size={16} />
        </ToolbarBtn>
        <ToolbarBtn
          onClick={() => {
            const url = prompt('Link URL')
            if (url) editor.chain().focus().setLink({ href: url, target: '_blank' }).run()
          }}
          active={editor.isActive('link')}
        >
          <LinkIcon size={16} />
        </ToolbarBtn>
        <Divider />

        {/* Undo/Redo */}
        <ToolbarBtn onClick={() => editor.chain().focus().undo().run()}>
          <Undo size={16} />
        </ToolbarBtn>
        <ToolbarBtn onClick={() => editor.chain().focus().redo().run()}>
          <Redo size={16} />
        </ToolbarBtn>
      </div>

      {/* Editor */}
      <div className='p-3 [&_ul]:list-disc [&_ul]:ml-6 [&_ol]:list-decimal [&_ol]:ml-6'>
        <EditorContent editor={editor} />
      </div>
    </div>
  )
}

function ToolbarBtn({
  children,
  onClick,
  active,
}: {
  children: React.ReactNode
  onClick: () => void
  active?: boolean
}) {
  return (
    <button
      type='button'
      onClick={onClick}
      className={`flex items-center gap-1 px-2 py-1 rounded-md hover:bg-accent hover:text-accent-foreground transition ${
        active ? 'bg-accent text-accent-foreground font-semibold' : ''
      }`}
    >
      {children}
    </button>
  )
}

function Divider() {
  return <span className='w-px h-6 bg-border mx-2' />
}
