'use client'
import { useState, useEffect } from 'react'
import { useRouter, useParams } from 'next/navigation'
import Link from 'next/link'
import { apiFetch } from '@/utils/auth'
import JobForm from '@/components/dashboard/JobForm'
import Sidebar from '@/components/dashboard/Sidebar'
import style from '@/components/dashboard/dashboard.module.css'

export default function EditJobPage() {
  const router = useRouter()
  const { id } = useParams()
  const [job, setJob] = useState(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  useEffect(() => {
    apiFetch(`/careers/manage/${id}/`).then(res => res?.json()).then(setJob)
  }, [id])

  const handleSubmit = async (data) => {
    setLoading(true)
    setError(null)
    const res = await apiFetch(`/careers/manage/${id}/`, {
      method: 'PATCH',
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
          <h1 className={style.pageTitle}>Edit Job</h1>
          <Link href='/dashboard/jobs' className={style.backBtn}>← Back</Link>
        </div>
        {error && <p className={style.formError}>{error}</p>}
        {job
          ? <JobForm initial={job} onSubmit={handleSubmit} loading={loading} />
          : <p className={style.loadingText}>Loading…</p>}
      </main>
    </div>
  )
}
