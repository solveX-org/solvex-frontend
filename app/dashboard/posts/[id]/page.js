'use client'
import { useState, useEffect } from 'react'
import { useRouter, useParams } from 'next/navigation'
import Link from 'next/link'
import { apiFetch } from '@/utils/auth'
import Sidebar from '@/components/dashboard/Sidebar'
import PostForm from '@/components/dashboard/PostForm'
import style from '@/components/dashboard/dashboard.module.css'

export default function EditPostPage() {
  const router = useRouter()
  const { id } = useParams()
  const [post, setPost] = useState(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  useEffect(() => {
    apiFetch(`/blog/manage/${id}/`).then(res => res?.json()).then(setPost)
  }, [id])

  const handleSubmit = async (formData) => {
    setLoading(true)
    setError(null)
    const res = await apiFetch(`/blog/manage/${id}/`, {
      method: 'PATCH',
      body: formData,
    })
    setLoading(false)
    if (res?.ok) {
      router.push('/dashboard')
    } else {
      const data = await res?.json()
      setError(JSON.stringify(data))
    }
  }

  return (
    <div className={style.page}>
      <Sidebar />

      <main className={style.main}>
        <div className={style.topBar}>
          <h1 className={style.pageTitle}>Edit Post</h1>
          <Link href='/dashboard' className={style.backBtn}>← Back</Link>
        </div>
        {error && <p className={style.formError}>{error}</p>}
        {post
          ? <PostForm initial={post} onSubmit={handleSubmit} loading={loading} />
          : <p className={style.loadingText}>Loading…</p>}
      </main>
    </div>
  )
}
