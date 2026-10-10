'use client'
import { useEffect, useState } from 'react'
import Link from 'next/link'
import { apiFetch } from '@/utils/auth'
import Sidebar from '@/components/dashboard/Sidebar'
import style from '@/components/dashboard/dashboard.module.css'

export default function JobsPage() {
  const [jobs, setJobs] = useState([])
  const [loading, setLoading] = useState(true)

  const fetchJobs = async () => {
    try {
      const res = await apiFetch('/careers/manage/')
      if (res?.ok) setJobs(await res.json())
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => { fetchJobs() }, [])

  const handleDelete = async (job) => {
    const extra = job.application_count ? ` This also deletes its ${job.application_count} application(s).` : ''
    if (!confirm(`Delete "${job.title}"?${extra}`)) return
    const res = await apiFetch(`/careers/manage/${job.id}/`, { method: 'DELETE' })
    if (res?.ok) setJobs(jobs.filter(j => j.id !== job.id))
  }

  const handleToggle = async (job) => {
    const res = await apiFetch(`/careers/manage/${job.id}/`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ is_open: !job.is_open }),
    })
    if (res?.ok) fetchJobs()
  }

  return (
    <div className={style.page}>
      <Sidebar />
      <main className={style.main}>
        <div className={style.topBar}>
          <h1 className={style.pageTitle}>Jobs</h1>
          <Link href='/dashboard/jobs/new' className={style.newBtn}>+ New Job</Link>
        </div>

        {loading ? (
          <p className={style.loadingText}>Loading…</p>
        ) : jobs.length === 0 ? (
          <p className={style.emptyText}>No jobs yet. <Link href='/dashboard/jobs/new'>Create your first one.</Link></p>
        ) : (
          <div className={style.table}>
            <div className={style.tableHead}>
              <span>Title</span>
              <span>Applicants</span>
              <span>Status</span>
              <span>Actions</span>
            </div>
            {jobs.map(job => (
              <div key={job.id} className={style.tableRow}>
                <span className={style.postTitle}>{job.title}</span>
                <Link href={`/dashboard/applications?job=${job.id}`} className={style.postMeta}>
                  {job.application_count}
                </Link>
                <button
                  className={`${style.badge} ${job.is_open ? style.badgePublished : style.badgeDraft}`}
                  onClick={() => handleToggle(job)}>
                  {job.is_open ? 'Open' : 'Closed'}
                </button>
                <div className={style.actions}>
                  <Link href={`/dashboard/jobs/${job.id}`} className={style.editBtn}>Edit</Link>
                  <button className={style.deleteBtn} onClick={() => handleDelete(job)}>Delete</button>
                </div>
              </div>
            ))}
          </div>
        )}
      </main>
    </div>
  )
}
