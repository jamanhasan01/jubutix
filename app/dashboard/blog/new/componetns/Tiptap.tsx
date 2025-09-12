'use client'
import { useEditor, EditorContent } from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit'
import Link from '@tiptap/extension-link'
import Underline from '@tiptap/extension-underline'
import TextAlign from '@tiptap/extension-text-align'
import Image from '@tiptap/extension-image'
import Placeholder from '@tiptap/extension-placeholder'
// Note: Heading is part of StarterKit, but configuring it here allows customization.
// If you don't need custom levels, StarterKit is enough.
import Heading from '@tiptap/extension-heading'
import { useEffect } from 'react'

export type TiptapProps = {
  value: string
  onChange: (html: string) => void
}

export default function TiptapEditor({ value, onChange }: TiptapProps) {
  const editor = useEditor({
    // FIX: Add all your imported extensions here
    extensions: [
      StarterKit.configure({
        // You can configure StarterKit extensions here if needed
        heading: false, // Disable default heading to use our custom one below
      }),
      Heading.configure({
        levels: [1, 2, 3, 4, 5],
      }),
      Underline,
      Link.configure({
        openOnClick: false,
        autolink: true,
      }),
      Image,
      TextAlign.configure({
        types: ['heading', 'paragraph'],
      }),
      Placeholder.configure({
        placeholder: 'Start writing your amazing blog post here...',
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
    // Prevent setting content if it's the same, to avoid cursor jumps
    if (value !== editor.getHTML()) {
      editor.commands.setContent(value || '', { emitUpdate: false })
    }
  }, [value, editor])

  if (!editor) return null

  return (
    <div className='border rounded-xl'>
      {/* Toolbar */}
      <div className='flex flex-wrap gap-1 p-2 border-b text-sm'>
        {/* Text styles */}
        <ToolbarBtn
          onClick={() => editor.chain().focus().toggleBold().run()}
          active={editor.isActive('bold')}
        >
          B
        </ToolbarBtn>
        <ToolbarBtn
          onClick={() => editor.chain().focus().toggleItalic().run()}
          active={editor.isActive('italic')}
        >
          I
        </ToolbarBtn>
        <ToolbarBtn
          onClick={() => editor.chain().focus().toggleUnderline().run()}
          active={editor.isActive('underline')}
        >
          U
        </ToolbarBtn>
        <ToolbarBtn
          onClick={() => editor.chain().focus().toggleStrike().run()}
          active={editor.isActive('strike')}
        >
          S
        </ToolbarBtn>
        <Divider /> {/* Paragraph & Headings */}
        <ToolbarBtn
          onClick={() => editor.chain().focus().setParagraph().run()}
          active={editor.isActive('paragraph')}
        >
          P
        </ToolbarBtn>
        {[1, 2, 3, 4, 5].map((level) => (
          <ToolbarBtn
            key={level}
            onClick={() =>
              editor
                .chain()
                .focus()
                .toggleHeading({ level: level as 1 | 2 | 3 | 4 | 5 })
                .run()
            }
            active={editor.isActive('heading', { level: level as 1 | 2 | 3 | 4 | 5 })}
          >
            H{level}
          </ToolbarBtn>
        ))}
        <Divider /> {/* Lists & Blockquotes */}
        <ToolbarBtn
          onClick={() => editor.chain().focus().toggleBulletList().run()}
          active={editor.isActive('bulletList')}
        >
          • List
        </ToolbarBtn>
        <ToolbarBtn
          onClick={() => editor.chain().focus().toggleOrderedList().run()}
          active={editor.isActive('orderedList')}
        >
          1. List
        </ToolbarBtn>
        <ToolbarBtn
          onClick={() => editor.chain().focus().toggleBlockquote().run()}
          active={editor.isActive('blockquote')}
        >
          ❝
        </ToolbarBtn>
        <ToolbarBtn onClick={() => editor.chain().focus().setHorizontalRule().run()}>—</ToolbarBtn>
        <Divider /> {/* Media & Links */}
        <ToolbarBtn
          onClick={() => {
            const url = prompt('Image URL')
            if (url) editor.chain().focus().setImage({ src: url }).run()
          }}
        >
          Img
        </ToolbarBtn>
        <ToolbarBtn
          onClick={() => {
            const url = prompt('Link URL')
            if (url) editor.chain().focus().setLink({ href: url, target: '_blank' }).run()
          }}
        >
          Link
        </ToolbarBtn>
        <Divider /> {/* Undo/Redo */}
        <ToolbarBtn onClick={() => editor.chain().focus().undo().run()}>↶</ToolbarBtn>
        <ToolbarBtn onClick={() => editor.chain().focus().redo().run()}>↷</ToolbarBtn>
      </div>
      {/* Editor */}
      <div className='p-3'>
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
      className={`px-2 py-1 rounded hover:bg-accent ${active ? 'bg-accent font-bold' : ''}`}
    >
      {children}
    </button>
  )
}

function Divider() {
  return <span className='w-px h-6 bg-border mx-1' />
}
