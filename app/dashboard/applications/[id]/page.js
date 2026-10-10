'use client'
import { useEffect, useState } from 'react'
import { useParams, useRouter } from 'next/navigation'
import Link from 'next/link'
import { apiFetch } from '@/utils/auth'
import Sidebar from '@/components/dashboard/Sidebar'
import InterviewPanel from '@/components/dashboard/InterviewPanel'
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
  const [notify, setNotify] = useState(false)
  const [emailSubject, setEmailSubject] = useState('')
  const [emailBody, setEmailBody] = useState('')
  const [allowAttachment, setAllowAttachment] = useState(false)
  const [attachment, setAttachment] = useState(null)
  const [moveError, setMoveError] = useState(null)
  const [moveResult, setMoveResult] = useState(null)
  const [hasTemplate, setHasTemplate] = useState(false)

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

  // Load the stage's email template whenever a different stage is picked.
  useEffect(() => {
    setAttachment(null)
    setMoveError(null)
    if (!app || !stageId || Number(stageId) === app.stage) {
      setNotify(false)
      return
    }
    apiFetch(`/careers/applications/${id}/email-preview/?stage=${stageId}`)
      .then(r => r?.json())
      .then(p => {
        if (!p) return
        setEmailSubject(p.subject)
        setEmailBody(p.body)
        setAllowAttachment(p.allow_attachment)
        setNotify(p.has_template && p.notify_by_default)
        setHasTemplate(p.has_template)
      })
  }, [stageId, app?.stage])

  const moveStage = async (e) => {
    e.preventDefault()
    setBusy(true)
    setMoveError(null)
    setMoveResult(null)
    const data = new FormData()
    data.append('stage', stageId)
    data.append('note', moveNote)
    if (notify) {
      data.append('notify', 'true')
      data.append('email_subject', emailSubject)
      data.append('email_body', emailBody)
      if (attachment) data.append('attachment', attachment)
    }
    const res = await apiFetch(`/careers/applications/${id}/`, { method: 'PATCH', body: data })
    setBusy(false)
    const body = await res?.json().catch(() => null)
    if (res?.ok) {
      setMoveNote('')
      setMoveResult(body?.email_status)
      load()
    } else {
      const first = body ? Object.values(body).flat()[0] : null
      setMoveError(typeof first === 'string' ? first : `Could not move (HTTP ${res?.status}).`)
    }
  }

  const moved = app && Number(stageId) !== app.stage

  const onAttach = (e) => {
    const f = e.target.files[0]
    if (f && f.size > 5 * 1024 * 1024) {
      setMoveError('Attachment must be 5MB or smaller.')
      e.target.value = ''
      return setAttachment(null)
    }
    setMoveError(null)
    setAttachment(f || null)
  }

  const downloadAttachment = async (ev) => {
    const res = await apiFetch(`/careers/applications/${id}/events/${ev.id}/attachment/`)
    if (!res?.ok) return alert('Could not download attachment.')
    const url = URL.createObjectURL(await res.blob())
    const a = document.createElement('a')
    a.href = url
    a.download = ev.attachment_name || 'attachment'
    a.click()
    URL.revokeObjectURL(url)
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

              <InterviewPanel applicationId={id} onChange={load} />

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
                      {ev.email_status && (
                        <div className={pipe.eventNote}>
                          {ev.email_status === 'sent' ? '✉ Emailed candidate: ' : '⚠ Email failed: '}
                          {ev.email_subject}
                          {ev.has_attachment && (
                            <> · <button type='button' className={pipe.inlineLink}
                              onClick={() => downloadAttachment(ev)}>{ev.attachment_name}</button></>
                          )}
                        </div>
                      )}
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
                  <textarea className={style.textarea} rows={2} value={moveNote}
                    onChange={e => setMoveNote(e.target.value)} placeholder='Optional internal note' />
                </div>

                {moved && hasTemplate && (
                  <>
                    <label className={pipe.checkRow}>
                      <input type='checkbox' checked={notify} onChange={e => setNotify(e.target.checked)} />
                      Email the candidate
                    </label>
                    {notify && (
                      <>
                        <div className={style.field}>
                          <label className={style.label}>Subject</label>
                          <input className={style.input} value={emailSubject}
                            onChange={e => setEmailSubject(e.target.value)} />
                        </div>
                        <div className={style.field}>
                          <label className={style.label}>Message</label>
                          <textarea className={`${style.textarea} ${pipe.emailBody}`} rows={12} value={emailBody}
                            onChange={e => setEmailBody(e.target.value)} />
                          {/\[\[.*?\]\]/.test(emailBody + emailSubject) && (
                            <span className={pipe.warn}>Replace the [[bracketed]] parts before sending.</span>
                          )}
                        </div>
                        {allowAttachment && (
                          <div className={style.field}>
                            <label className={style.label}>Attachment (e.g. offer letter)</label>
                            <input type='file' accept='.pdf,.doc,.docx' className={style.fileInput} onChange={onAttach} />
                            <span className={pipe.hint}>PDF, DOC or DOCX, up to 5MB</span>
                          </div>
                        )}
                      </>
                    )}
                  </>
                )}

                {moveError && <p className={style.formError}>{moveError}</p>}
                {moveResult === 'sent' && <p className={pipe.ok}>Moved and email sent.</p>}
                {moveResult === 'failed' && <p className={style.formError}>Moved, but the email failed to send.</p>}
                <button type='submit' className={style.submitBtn} disabled={busy || !moved}>
                  {busy ? 'Saving…' : notify ? 'Move & send email' : 'Move'}
                </button>
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
