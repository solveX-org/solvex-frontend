'use client'
import { useEffect, useState } from 'react'
import { useParams, useRouter } from 'next/navigation'
import Link from 'next/link'
import { apiFetch } from '@/utils/auth'
import Sidebar from '@/components/dashboard/Sidebar'
import style from '@/components/dashboard/dashboard.module.css'
import pipe from '@/components/dashboard/pipeline.module.css'

function formatDateTime(iso) {
  return new Date(iso).toLocaleString('en-GB', {
    day: 'numeric', month: 'short', year: 'numeric', hour: '2-digit', minute: '2-digit',
  })
}

export default function ApplicationPage() {
  const { id } = useParams()
  const router = useRouter()
  const [app, setApp] = useState(null)
  const [stages, setStages] = useState([])
  const [stageId, setStageId] = useState('')
  const [moveNote, setMoveNote] = useState('')
  const [note, setNote] = useState('')
  const [busy, setBusy] = useState(false)

  const load = async () => {
    const res = await apiFetch(`/careers/applications/${id}/`)
    if (!res?.ok) return
    const data = await res.json()
    setApp(data)
    setStageId(String(data.stage))
  }

  useEffect(() => {
    load()
    apiFetch('/careers/stages/').then(r => r?.json()).then(s => setStages(s || []))
  }, [id])

  const moveStage = async (e) => {
    e.preventDefault()
    setBusy(true)
    const res = await apiFetch(`/careers/applications/${id}/`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ stage: Number(stageId), note: moveNote }),
    })
    setBusy(false)
    if (res?.ok) { setMoveNote(''); load() }
  }

  const addNote = async (e) => {
    e.preventDefault()
    if (!note.trim()) return
    setBusy(true)
    const res = await apiFetch(`/careers/applications/${id}/notes/`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ note }),
    })
    setBusy(false)
    if (res?.ok) { setNote(''); load() }
  }

  // The resume endpoint needs the bearer token, so a plain <a href> won't work.
  const downloadResume = async () => {
    const res = await apiFetch(`/careers/applications/${id}/resume/`)
    if (!res?.ok) return alert('Could not download resume.')
    const blob = await res.blob()
    const name = /filename="?([^"]+)"?/.exec(res.headers.get('Content-Disposition') || '')?.[1] || 'resume'
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = name
    a.click()
    URL.revokeObjectURL(url)
  }

  const handleDelete = async () => {
    if (!confirm('Permanently delete this application?')) return
    const res = await apiFetch(`/careers/applications/${id}/`, { method: 'DELETE' })
    if (res?.ok) router.push('/dashboard/applications')
  }

  return (
    <div className={style.page}>
      <Sidebar />
      <main className={style.main}>
        <div className={style.topBar}>
          <h1 className={style.pageTitle}>{app ? `${app.first_name} ${app.last_name}` : 'Application'}</h1>
          <Link href='/dashboard/applications' className={style.backBtn}>← Back</Link>
        </div>

        {!app ? <p className={style.loadingText}>Loading…</p> : (
          <div className={pipe.detail}>
            <div>
              <div className={pipe.panel}>
                <h3 className={pipe.panelTitle}>Candidate</h3>
                <div className={pipe.infoRow}><span className={pipe.infoLabel}>Role</span>{app.job_title}</div>
                <div className={pipe.infoRow}><span className={pipe.infoLabel}>Email</span><a href={`mailto:${app.email}`}>{app.email}</a></div>
                {app.phone && <div className={pipe.infoRow}><span className={pipe.infoLabel}>Phone</span>{app.phone}</div>}
                {app.linkedin_url && <div className={pipe.infoRow}><span className={pipe.infoLabel}>LinkedIn</span><a href={app.linkedin_url} target='_blank' rel='noopener noreferrer'>{app.linkedin_url}</a></div>}
                {app.portfolio_url && <div className={pipe.infoRow}><span className={pipe.infoLabel}>Portfolio</span><a href={app.portfolio_url} target='_blank' rel='noopener noreferrer'>{app.portfolio_url}</a></div>}
                <div className={pipe.infoRow}><span className={pipe.infoLabel}>Source</span>{app.source}</div>
                <div className={pipe.infoRow}><span className={pipe.infoLabel}>Applied</span>{formatDateTime(app.created_at)}</div>
                <div style={{ marginTop: '1rem' }}>
                  <button className={pipe.linkBtn} onClick={downloadResume}>Download resume</button>
                </div>
              </div>

              {app.cover_letter && (
                <div className={pipe.panel}>
                  <h3 className={pipe.panelTitle}>Cover letter</h3>
                  <p className={pipe.letter}>{app.cover_letter}</p>
                </div>
              )}

              <div className={pipe.panel}>
                <h3 className={pipe.panelTitle}>Activity</h3>
                <ul className={pipe.timeline}>
                  {app.events.map(ev => (
                    <li key={ev.id} className={pipe.event}>
                      <div className={pipe.eventHead}>
                        {ev.to_stage_name
                          ? (ev.from_stage_name ? `${ev.from_stage_name} → ${ev.to_stage_name}` : ev.to_stage_name)
                          : 'Note'}
                      </div>
                      <div className={pipe.eventMeta}>
                        {formatDateTime(ev.created_at)}{ev.author_name ? ` · ${ev.author_name}` : ''}
                      </div>
                      {ev.note && <div className={pipe.eventNote}>{ev.note}</div>}
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <div>
              <form className={pipe.panel} onSubmit={moveStage}>
                <h3 className={pipe.panelTitle}>Pipeline stage</h3>
                <div className={style.field}>
                  <select className={style.input} value={stageId} onChange={e => setStageId(e.target.value)}>
                    {stages.map(s => <option key={s.id} value={s.id}>{s.name}</option>)}
                  </select>
                </div>
                <div className={style.field}>
                  <textarea className={style.textarea} rows={3} value={moveNote}
                    onChange={e => setMoveNote(e.target.value)} placeholder='Optional note for this move' />
                </div>
                <button type='submit' className={style.submitBtn}
                  disabled={busy || Number(stageId) === app.stage}>Move</button>
              </form>

              <form className={pipe.panel} onSubmit={addNote}>
                <h3 className={pipe.panelTitle}>Internal note</h3>
                <div className={style.field}>
                  <textarea className={style.textarea} rows={4} value={note}
                    onChange={e => setNote(e.target.value)} placeholder='Only visible to the team' />
                </div>
                <button type='submit' className={style.submitBtn} disabled={busy || !note.trim()}>Add note</button>
              </form>

              <button className={style.deleteBtn} onClick={handleDelete}>Delete application</button>
            </div>
          </div>
        )}
      </main>
    </div>
  )
}
