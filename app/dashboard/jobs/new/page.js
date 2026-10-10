'use client'
import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { apiFetch } from '@/utils/auth'
import JobForm from '@/components/dashboard/JobForm'
import Sidebar from '@/components/dashboard/Sidebar'
import style from '@/components/dashboard/dashboard.module.css'

export default function NewJobPage() {
  const router = useRouter()
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  const handleSubmit = async (data) => {
    setLoading(true)
    setError(null)
    const res = await apiFetch('/careers/manage/', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    })
    setLoading(false)
    if (res?.ok) return router.push('/dashboard/jobs')
    const body = await res?.json().catch(() => null)
    setError(body ? JSON.stringify(body) : `Save failed (HTTP ${res?.status}). The API may not have the careers endpoints deployed yet.`)
  }

  return (
    <div className={style.page}>
      <Sidebar />
      <main className={style.main}>
        <div className={style.topBar}>
          <h1 className={style.pageTitle}>New Job</h1>
          <Link href='/dashboard/jobs' className={style.backBtn}>← Back</Link>
        </div>
        {error && <p className={style.formError}>{error}</p>}
        <JobForm onSubmit={handleSubmit} loading={loading} />
      </main>
    </div>
  )
}
