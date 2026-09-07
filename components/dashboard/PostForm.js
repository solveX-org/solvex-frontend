'use client'
import { useState } from 'react'
import dynamic from 'next/dynamic'
import style from './dashboard.module.css'

const Editor = dynamic(() => import('./Editor'), { ssr: false })

export default function PostForm({ initial = {}, onSubmit, loading }) {
  const [form, setForm] = useState({
    title: initial.title || '',
    excerpt: initial.excerpt || '',
    author: initial.author || 'SolveX Team',
    is_published: initial.is_published || false,
    body: initial.body || '',
  })
  const [coverFile, setCoverFile] = useState(null)
  const [coverPreview, setCoverPreview] = useState(initial.get_cover_absolute_url || null)

  const set = (key, val) => setForm(f => ({ ...f, [key]: val }))

  const handleCover = (e) => {
    const file = e.target.files[0]
    if (!file) return
    setCoverFile(file)
    setCoverPreview(URL.createObjectURL(file))
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    const formData = new FormData()
    formData.append('title', form.title)
    formData.append('excerpt', form.excerpt)
    formData.append('author', form.author)
    formData.append('body', form.body)
    formData.append('is_published', form.is_published)
    if (coverFile) formData.append('cover_image', coverFile)
    onSubmit(formData)
  }

  return (
    <form onSubmit={handleSubmit} className={style.postForm}>
      <div className={style.formGrid}>
        {/* Left column */}
        <div className={style.formMain}>
          <div className={style.field}>
            <label className={style.label}>Title</label>
            <input
              className={style.input}
              type='text'
              value={form.title}
              onChange={e => set('title', e.target.value)}
              placeholder='Post title'
              required />
          </div>

          <div className={style.field}>
            <label className={style.label}>Excerpt</label>
            <textarea
              className={style.textarea}
              value={form.excerpt}
              onChange={e => set('excerpt', e.target.value)}
              placeholder='Short description shown on the blog listing'
              rows={3}
              required />
          </div>

          <div className={style.field}>
            <label className={style.label}>Body</label>
            <Editor
              content={form.body}
              onChange={val => set('body', val)} />
          </div>
        </div>

        {/* Right column */}
        <div className={style.formSide}>
          <div className={style.sideCard}>
            <h3 className={style.sideCardTitle}>Publish</h3>
            <label className={style.toggleLabel}>
              <input
                type='checkbox'
                className={style.toggleInput}
                checked={form.is_published}
                onChange={e => set('is_published', e.target.checked)} />
              <span className={style.toggle} />
              <span>{form.is_published ? 'Published' : 'Draft'}</span>
            </label>
            <button
              type='submit'
              className={style.submitBtn}
              disabled={loading}>
              {loading ? 'Saving…' : 'Save Post'}
            </button>
          </div>

          <div className={style.sideCard}>
            <h3 className={style.sideCardTitle}>Author</h3>
            <input
              className={style.input}
              type='text'
              value={form.author}
              onChange={e => set('author', e.target.value)} />
          </div>

          <div className={style.sideCard}>
            <h3 className={style.sideCardTitle}>Cover Image</h3>
            {coverPreview && (
              <img src={coverPreview} alt='Cover preview' className={style.coverPreview} />
            )}
            <input
              type='file'
              accept='image/*'
              onChange={handleCover}
              className={style.fileInput} />
          </div>
        </div>
      </div>
    </form>
  )
}
