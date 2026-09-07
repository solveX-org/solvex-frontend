'use client'
import { useEditor, EditorContent } from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit'
import Underline from '@tiptap/extension-underline'
import Link from '@tiptap/extension-link'
import TextAlign from '@tiptap/extension-text-align'
import Placeholder from '@tiptap/extension-placeholder'
import style from './dashboard.module.css'

const ToolbarBtn = ({ onClick, active, title, children }) => (
  <button
    type='button'
    onMouseDown={e => { e.preventDefault(); onClick() }}
    className={`${style.toolbarBtn} ${active ? style.toolbarBtnActive : ''}`}
    title={title}>
    {children}
  </button>
)

export default function Editor({ content, onChange }) {
  const editor = useEditor({
    extensions: [
      StarterKit,
      Underline,
      TextAlign.configure({ types: ['heading', 'paragraph'] }),
      Placeholder.configure({ placeholder: 'Write your post here…' }),
      Link.configure({ openOnClick: false }),
    ],
    content,
    onUpdate: ({ editor }) => onChange(editor.getHTML()),
  })

  if (!editor) return null

  const setLink = () => {
    const url = window.prompt('URL:', editor.getAttributes('link').href || '')
    if (url === null) return
    if (url === '') { editor.chain().focus().unsetLink().run(); return }
    editor.chain().focus().setLink({ href: url }).run()
  }

  return (
    <div className={style.editorWrap}>
      <div className={style.toolbar}>
        <ToolbarBtn onClick={() => editor.chain().focus().toggleBold().run()} active={editor.isActive('bold')} title='Bold'><b>B</b></ToolbarBtn>
        <ToolbarBtn onClick={() => editor.chain().focus().toggleItalic().run()} active={editor.isActive('italic')} title='Italic'><i>I</i></ToolbarBtn>
        <ToolbarBtn onClick={() => editor.chain().focus().toggleUnderline().run()} active={editor.isActive('underline')} title='Underline'><u>U</u></ToolbarBtn>
        <ToolbarBtn onClick={() => editor.chain().focus().toggleStrike().run()} active={editor.isActive('strike')} title='Strikethrough'><s>S</s></ToolbarBtn>
        <div className={style.toolbarDivider} />
        <ToolbarBtn onClick={() => editor.chain().focus().toggleHeading({ level: 1 }).run()} active={editor.isActive('heading', { level: 1 })} title='Heading 1'>H1</ToolbarBtn>
        <ToolbarBtn onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()} active={editor.isActive('heading', { level: 2 })} title='Heading 2'>H2</ToolbarBtn>
        <ToolbarBtn onClick={() => editor.chain().focus().toggleHeading({ level: 3 }).run()} active={editor.isActive('heading', { level: 3 })} title='Heading 3'>H3</ToolbarBtn>
        <div className={style.toolbarDivider} />
        <ToolbarBtn onClick={() => editor.chain().focus().toggleBulletList().run()} active={editor.isActive('bulletList')} title='Bullet list'>• List</ToolbarBtn>
        <ToolbarBtn onClick={() => editor.chain().focus().toggleOrderedList().run()} active={editor.isActive('orderedList')} title='Numbered list'>1. List</ToolbarBtn>
        <div className={style.toolbarDivider} />
        <ToolbarBtn onClick={() => editor.chain().focus().setTextAlign('left').run()} active={editor.isActive({ textAlign: 'left' })} title='Align left'>Left</ToolbarBtn>
        <ToolbarBtn onClick={() => editor.chain().focus().setTextAlign('center').run()} active={editor.isActive({ textAlign: 'center' })} title='Align center'>Center</ToolbarBtn>
        <ToolbarBtn onClick={() => editor.chain().focus().setTextAlign('right').run()} active={editor.isActive({ textAlign: 'right' })} title='Align right'>Right</ToolbarBtn>
        <div className={style.toolbarDivider} />
        <ToolbarBtn onClick={setLink} active={editor.isActive('link')} title='Link'>Link</ToolbarBtn>
        <ToolbarBtn onClick={() => editor.chain().focus().toggleBlockquote().run()} active={editor.isActive('blockquote')} title='Blockquote'>Quote</ToolbarBtn>
        <ToolbarBtn onClick={() => editor.chain().focus().toggleCodeBlock().run()} active={editor.isActive('codeBlock')} title='Code block'>Code</ToolbarBtn>
        <ToolbarBtn onClick={() => editor.chain().focus().setHorizontalRule().run()} active={false} title='Horizontal rule'>—</ToolbarBtn>
      </div>
      <EditorContent editor={editor} className={style.editorContent} />
    </div>
  )
}
