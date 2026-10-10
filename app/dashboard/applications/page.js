'use client'
import { Suspense, useEffect, useState } from 'react'
import Link from 'next/link'
import { useRouter, useSearchParams } from 'next/navigation'
import { apiFetch } from '@/utils/auth'
import Sidebar from '@/components/dashboard/Sidebar'
import style from '@/components/dashboard/dashboard.module.css'
import pipe from '@/components/dashboard/pipeline.module.css'

function formatDate(iso) {
  return new Date(iso).toLocaleDateString('en-GB', { day: 'numeric', month: 'short' })
}

function Board() {
  const router = useRouter()
  const jobId = useSearchParams().get('job') || ''
  const [stages, setStages] = useState([])
  const [jobs, setJobs] = useState([])
  const [apps, setApps] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    Promise.all([apiFetch('/careers/stages/'), apiFetch('/careers/manage/')])
      .then(rs => Promise.all(rs.map(r => r?.json())))
      .then(([s, j]) => { setStages(s || []); setJobs(j || []) })
  }, [])

  useEffect(() => {
    setLoading(true)
    apiFetch(`/careers/applications/${jobId ? `?job=${jobId}` : ''}`)
      .then(res => res?.json())
      .then(data => setApps(Array.isArray(data) ? data : []))
      .finally(() => setLoading(false))
  }, [jobId])

  const move = async (app, stageId) => {
    const previous = apps
    setApps(apps.map(a => a.id === app.id ? { ...a, stage: stageId } : a))
    const res = await apiFetch(`/careers/applications/${app.id}/`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ stage: stageId }),
    })
    if (!res?.ok) setApps(previous)
  }

  return (
    <main className={style.main}>
      <div className={style.topBar}>
        <h1 className={style.pageTitle}>Applications</h1>
      </div>
      <div className={pipe.toolbar}>
        <select className={pipe.select} value={jobId}
          onChange={e => router.push(e.target.value ? `/dashboard/applications?job=${e.target.value}` : '/dashboard/applications')}>
          <option value=''>All jobs</option>
          {jobs.map(j => <option key={j.id} value={j.id}>{j.title}</option>)}
        </select>
      </div>

      {loading ? <p className={style.loadingText}>Loading…</p> : (
        <div className={pipe.board}>
          {stages.map(stage => {
            const items = apps.filter(a => a.stage === stage.id)
            return (
              <section key={stage.id} className={`${pipe.column} ${pipe[stage.kind] || ''}`}>
                <div className={pipe.columnHead}>
                  <span>{stage.name}</span>
                  <span className={pipe.count}>{items.length}</span>
                </div>
                {items.length === 0 && <p className={pipe.empty}>—</p>}
                {items.map(app => (
                  <div key={app.id} className={pipe.card}>
                    <Link href={`/dashboard/applications/${app.id}`} className={pipe.cardName}>
                      {app.first_name} {app.last_name}
                    </Link>
                    <span className={pipe.cardMeta}>{app.job_title}</span>
                    <span className={pipe.cardMeta}>Applied {formatDate(app.created_at)}</span>
                    <select className={pipe.cardSelect} value={app.stage}
                      onChange={e => move(app, Number(e.target.value))}>
                      {stages.map(s => <option key={s.id} value={s.id}>{s.name}</option>)}
                    </select>
                  </div>
                ))}
              </section>
            )
          })}
        </div>
      )}
    </main>
  )
}

export default function ApplicationsPage() {
  return (
    <div className={style.page}>
      <Sidebar />
      <Suspense fallback={<main className={style.main}><p className={style.loadingText}>Loading…</p></main>}>
        <Board />
      </Suspense>
    </div>
  )
}
