'use client'

import { useEditor, EditorContent } from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit'
import Underline from '@tiptap/extension-underline'
import Link from '@tiptap/extension-link'
import Image from '@tiptap/extension-image'
import TextAlign from '@tiptap/extension-text-align'
import Placeholder from '@tiptap/extension-placeholder'
import Heading, { Level } from '@tiptap/extension-heading'

import Color from '@tiptap/extension-color'
import Highlight from '@tiptap/extension-highlight'
import FontFamily from '@tiptap/extension-font-family'
import FontSize from '@tiptap/extension-font-size'
import  { Table, TableCell, TableHeader, TableRow } from '@tiptap/extension-table'



import { useEffect, useRef, useState } from 'react'
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
  TableIcon,
} from 'lucide-react'
import { TextStyle } from '@tiptap/extension-text-style'
import { CharacterCount } from '@tiptap/extensions'

export type TiptapProps = {
  value: string
  onChange: (html: string) => void
}

interface ToolbarBtnProps {
  children: React.ReactNode
  onClick: () => void
  active?: boolean
  title?: string
}

export default function TiptapEditor({ value, onChange }: TiptapProps) {
  const [activeTag, setActiveTag] = useState('Paragraph')

  const editor = useEditor({
    extensions: [
      StarterKit.configure({ heading: false }),
      Heading.configure({ levels: [1, 2, 3] }),
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
        placeholder: '✍️ Start writing your amazing document...',
      }),
      TextStyle,
      Color,
      Highlight.configure({ multicolor: true }),
      FontFamily.configure({ types: ['textStyle'] }),
      FontSize.configure({ types: ['textStyle'] }),
      Table.configure({ resizable: true }),
      TableRow,
      TableHeader,
      TableCell,
      CharacterCount.configure(),
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
      if (editor.isActive('heading', { level: 1 })) setActiveTag('Heading 1')
      else if (editor.isActive('heading', { level: 2 })) setActiveTag('Heading 2')
      else if (editor.isActive('heading', { level: 3 })) setActiveTag('Heading 3')
      else if (editor.isActive('bulletList')) setActiveTag('Bullet List')
      else if (editor.isActive('orderedList')) setActiveTag('Numbered List')
      else if (editor.isActive('blockquote')) setActiveTag('Quote')
      else setActiveTag('Paragraph')
    },
    immediatelyRender: false,
  })

  const editorRef = useRef<HTMLDivElement>(null)

  // Sync external value
  useEffect(() => {
    if (!editor) return
    if (value !== editor.getHTML()) {
      editor.commands.setContent(value || '', { emitUpdate: false })
    }
  }, [value, editor])

  // Auto-save to localStorage every 5 seconds
  useEffect(() => {
    if (!editor) return
    const saveInterval = setInterval(() => {
      localStorage.setItem('autosave', editor.getHTML())
    }, 5000)
    return () => clearInterval(saveInterval)
  }, [editor])

  if (!editor) return null

  return (
    <div className="border rounded-xl bg-background shadow-sm overflow-hidden">
      {/* Toolbar */}
      <div className="sticky top-0 z-10 flex flex-wrap gap-2 p-2 border-b bg-muted/40 backdrop-blur-sm items-center">

        {/* Font Family */}
        <select
          onChange={(e) => editor.chain().focus().setFontFamily(e.target.value).run()}
          className="border rounded-md px-2 py-1 text-sm"
        >
          <option value="sans-serif">Sans</option>
          <option value="serif">Serif</option>
          <option value="monospace">Monospace</option>
          <option value="Poppins">Poppins</option>
          <option value="Roboto">Roboto</option>
        </select>

        {/* Font Size */}
        <select
          onChange={(e) => editor.chain().focus().setFontSize(e.target.value).run()}
          className="border rounded-md px-2 py-1 text-sm"
        >
          <option value="12px">12</option>
          <option value="14px">14</option>
          <option value="16px" selected>16</option>
          <option value="18px">18</option>
          <option value="20px">20</option>
          <option value="24px">24</option>
        </select>

        {/* Color + Highlight */}
        <input
          type="color"
          title="Text Color"
          onInput={(e) => editor.chain().focus().setColor(e.currentTarget.value).run()}
          className="w-8 h-8 border rounded-md"
        />
        <ToolbarBtn
          onClick={() => editor.chain().focus().toggleHighlight().run()}
          active={editor.isActive('highlight')}
          title="Highlight"
        >
          <span className="bg-yellow-300 px-1">H</span>
        </ToolbarBtn>

        <Divider />

        {/* Basic Formatting */}
        <ToolbarBtn
          onClick={() => editor.chain().focus().toggleBold().run()}
          active={editor.isActive('bold')}
          title="Bold"
        >
          <Bold size={16} />
        </ToolbarBtn>
        <ToolbarBtn
          onClick={() => editor.chain().focus().toggleItalic().run()}
          active={editor.isActive('italic')}
          title="Italic"
        >
          <Italic size={16} />
        </ToolbarBtn>
        <ToolbarBtn
          onClick={() => editor.chain().focus().toggleUnderline().run()}
          active={editor.isActive('underline')}
          title="Underline"
        >
          <UnderlineIcon size={16} />
        </ToolbarBtn>
        <ToolbarBtn
          onClick={() => editor.chain().focus().toggleStrike().run()}
          active={editor.isActive('strike')}
          title="Strikethrough"
        >
          <Strikethrough size={16} />
        </ToolbarBtn>

        <Divider />

        {/* Paragraph + Headings */}
        <ToolbarBtn onClick={() => editor.chain().focus().setParagraph().run()} active={editor.isActive('paragraph')} title="Paragraph">
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

        {/* Lists & Blocks */}
        <ToolbarBtn onClick={() => editor.chain().focus().toggleBulletList().run()} active={editor.isActive('bulletList')} title="Bullet List">
          <List size={16} />
        </ToolbarBtn>
        <ToolbarBtn onClick={() => editor.chain().focus().toggleOrderedList().run()} active={editor.isActive('orderedList')} title="Numbered List">
          <ListOrdered size={16} />
        </ToolbarBtn>
        <ToolbarBtn onClick={() => editor.chain().focus().toggleBlockquote().run()} active={editor.isActive('blockquote')} title="Quote">
          <Quote size={16} />
        </ToolbarBtn>
        <ToolbarBtn onClick={() => editor.chain().focus().setHorizontalRule().run()} title="Horizontal Rule">
          <Minus size={16} />
        </ToolbarBtn>

        <Divider />

        {/* Media & Links */}
        <ToolbarBtn
          onClick={() => {
            const url = prompt('Image URL')
            if (url) editor.chain().focus().setImage({ src: url }).run()
          }}
          title="Insert Image"
        >
          <ImageIcon size={16} />
        </ToolbarBtn>
        <ToolbarBtn
          onClick={() => {
            if (editor.isActive('link')) {
              editor.chain().focus().unsetLink().run()
            } else {
              const url = prompt('Link URL')
              if (url)
                editor.chain().focus().setLink({ href: url, target: '_blank' }).run()
            }
          }}
          active={editor.isActive('link')}
          title="Insert Link"
        >
          <LinkIcon size={16} />
        </ToolbarBtn>

        <Divider />

        {/* Table */}
        <ToolbarBtn
          onClick={() =>
            editor.chain().focus().insertTable({ rows: 3, cols: 3, withHeaderRow: true }).run()
          }
          title="Insert Table"
        >
          <TableIcon size={16} />
        </ToolbarBtn>

        <Divider />

        {/* Undo/Redo */}
        <ToolbarBtn onClick={() => editor.chain().focus().undo().run()} title="Undo">
          <Undo size={16} />
        </ToolbarBtn>
        <ToolbarBtn onClick={() => editor.chain().focus().redo().run()} title="Redo">
          <Redo size={16} />
        </ToolbarBtn>
      </div>

      {/* Content Area */}
      <div
        ref={editorRef}
        className="p-4 max-w-4xl h-[400px] overflow-y-auto [&_ul]:list-disc [&_ol]:list-decimal [&_ul]:ml-6 [&_ol]:ml-6"
      >
        <EditorContent editor={editor} />
      </div>

      {/* Footer */}
      <div className="p-2 border-t text-xs text-muted-foreground bg-muted/40 flex justify-between">
        <span>Current: <b>{activeTag}</b></span>
        <span>
          {editor.storage.characterCount?.words()} words /{' '}
          {editor.storage.characterCount?.characters()} chars
        </span>
      </div>
    </div>
  )
}

// Toolbar button component
function ToolbarBtn({ children, onClick, active, title }: ToolbarBtnProps) {
  return (
    <button
      type="button"
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
  return <span className="w-px h-6 bg-border mx-2" />
}
