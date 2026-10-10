'use client'
import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { apiFetch } from '@/utils/auth'
import Sidebar from '@/components/dashboard/Sidebar'
import PostForm from '@/components/dashboard/PostForm'
import style from '@/components/dashboard/dashboard.module.css'

export default function NewPostPage() {
  const router = useRouter()
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  const handleSubmit = async (formData) => {
    setLoading(true)
    setError(null)
    const res = await apiFetch('/blog/manage/', {
      method: 'POST',
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
          <h1 className={style.pageTitle}>New Post</h1>
          <Link href='/dashboard' className={style.backBtn}>← Back</Link>
        </div>
        {error && <p className={style.formError}>{error}</p>}
        <PostForm onSubmit={handleSubmit} loading={loading} />
      </main>
    </div>
  )
}
