'use client'
import { useEffect, useMemo, useState } from 'react'
import { apiFetch } from '@/utils/auth'
import style from './dashboard.module.css'
import pipe from './pipeline.module.css'

const COMMON_ZONES = [
  'Africa/Lagos', 'Africa/Accra', 'Africa/Nairobi', 'Africa/Johannesburg', 'Africa/Cairo',
  'Europe/London', 'Europe/Berlin', 'Europe/Paris', 'America/New_York', 'America/Chicago',
  'America/Los_Angeles', 'America/Toronto', 'Asia/Dubai', 'Asia/Kolkata', 'Asia/Singapore', 'UTC',
]

function useZones() {
  return useMemo(() => {
    let all = []
    try { all = Intl.supportedValuesOf('timeZone') } catch {}
    return { common: COMMON_ZONES, rest: all.filter(z => !COMMON_ZONES.includes(z)) }
  }, [])
}

function ZoneSelect({ value, onChange }) {
  const { common, rest } = useZones()
  return (
    <select className={style.input} value={value} onChange={e => onChange(e.target.value)}>
      <optgroup label='Common'>
        {common.map(z => <option key={z} value={z}>{z.replace('_', ' ')}</option>)}
      </optgroup>
      {rest.length > 0 && (
        <optgroup label='All time zones'>
          {rest.map(z => <option key={z} value={z}>{z.replace('_', ' ')}</option>)}
        </optgroup>
      )}
    </select>
  )
}

const EMPTY = {
  date: '', time: '10:00', timezone: 'Africa/Lagos', interviewer_timezone: 'Africa/Lagos',
  duration_minutes: 30, mode: 'online', location: '', notes: '',
  interviewer_name: '', interviewer_email: '',
}

const MODE_LABEL = { online: 'Online', in_person: 'In person', phone: 'Phone' }
const LOCATION_LABEL = { online: 'Meeting link', in_person: 'Address', phone: 'Phone number (optional)' }

function emailSummary(emails) {
  if (!emails) return null
  const failed = Object.entries(emails).filter(([, ok]) => ok === false).map(([who]) => who)
  const sent = Object.entries(emails).filter(([, ok]) => ok === true).map(([who]) => who)
  if (failed.length) return { ok: false, text: `Saved, but the email to the ${failed.join(' and ')} failed to send.` }
  if (sent.length) return { ok: true, text: `Emails sent to the ${sent.join(' and ')}.` }
  return null
}

export default function InterviewPanel({ applicationId, onChange }) {
  const [interviews, setInterviews] = useState([])
  const [form, setForm] = useState(null) // null = closed, else form state
  const [editingId, setEditingId] = useState(null)
  const [busy, setBusy] = useState(false)
  const [error, setError] = useState(null)
  const [result, setResult] = useState(null)

  const load = async () => {
    const res = await apiFetch(`/careers/applications/${applicationId}/interviews/`)
    if (res?.ok) setInterviews(await res.json())
  }
  useEffect(() => { load() }, [applicationId])

  const set = (k, v) => setForm(f => ({ ...f, [k]: v }))

  const openNew = () => { setEditingId(null); setForm(EMPTY); setError(null); setResult(null) }

  const openEdit = (iv) => {
    const [date, time] = iv.scheduled_local.split('T')
    setEditingId(iv.id)
    setForm({
      date, time, timezone: iv.timezone, interviewer_timezone: iv.interviewer_timezone,
      duration_minutes: iv.duration_minutes, mode: iv.mode, location: iv.location, notes: iv.notes,
      interviewer_name: iv.interviewer_name, interviewer_email: iv.interviewer_email,
    })
    setError(null)
    setResult(null)
  }

  const submit = async (e) => {
    e.preventDefault()
    setBusy(true)
    setError(null)
    const { date, time, ...rest } = form
    const payload = { ...rest, duration_minutes: Number(rest.duration_minutes), scheduled_local: `${date}T${time}` }
    const url = editingId ? `/careers/interviews/${editingId}/` : `/careers/applications/${applicationId}/interviews/`
    const res = await apiFetch(url, {
      method: editingId ? 'PATCH' : 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    })
    setBusy(false)
    const body = await res?.json().catch(() => null)
    if (res?.ok) {
      setResult(emailSummary(body.emails))
      setForm(null)
      load()
      onChange?.()
    } else {
      const first = body ? Object.values(body).flat()[0] : null
      setError(typeof first === 'string' ? first : `Could not save (HTTP ${res?.status}).`)
    }
  }

  const act = async (iv, action, payload = {}) => {
    const res = await apiFetch(`/careers/interviews/${iv.id}/${action}/`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    })
    const body = await res?.json().catch(() => null)
    if (res?.ok) { setResult(emailSummary(body.emails)); load(); onChange?.() }
    else alert(body?.error || `Failed (HTTP ${res?.status}).`)
  }

  const cancel = (iv) => {
    const reason = prompt('Reason for cancelling (included in the email, optional):')
    if (reason === null) return
    act(iv, 'cancel', { reason })
  }

  return (
    <div className={pipe.panel}>
      <div className={pipe.panelHead}>
        <h3 className={pipe.panelTitle} style={{ margin: 0 }}>Interviews</h3>
        {!form && <button type='button' className={pipe.linkBtn} onClick={openNew}>+ Schedule</button>}
      </div>

      {result && <p className={result.ok ? pipe.ok : style.formError}>{result.text}</p>}

      {form && (
        <form onSubmit={submit} className={pipe.interviewForm}>
          <div className={pipe.formRow}>
            <div className={style.field}>
              <label className={style.label}>Date</label>
              <input className={style.input} type='date' required value={form.date} onChange={e => set('date', e.target.value)} />
            </div>
            <div className={style.field}>
              <label className={style.label}>Time</label>
              <input className={style.input} type='time' required value={form.time} onChange={e => set('time', e.target.value)} />
            </div>
            <div className={style.field}>
              <label className={style.label}>Minutes</label>
              <input className={style.input} type='number' min={5} max={480} step={5} required
                value={form.duration_minutes} onChange={e => set('duration_minutes', e.target.value)} />
            </div>
          </div>
          <div className={pipe.formRow}>
            <div className={style.field}>
              <label className={style.label}>Time zone (candidate)</label>
              <ZoneSelect value={form.timezone} onChange={v => set('timezone', v)} />
            </div>
            <div className={style.field}>
              <label className={style.label}>Time zone (interviewer)</label>
              <ZoneSelect value={form.interviewer_timezone} onChange={v => set('interviewer_timezone', v)} />
            </div>
          </div>
          <p className={pipe.hint}>The time above is in the candidate&apos;s time zone. Each person sees it in their own zone.</p>
          <div className={pipe.formRow}>
            <div className={style.field}>
              <label className={style.label}>Format</label>
              <select className={style.input} value={form.mode} onChange={e => set('mode', e.target.value)}>
                {Object.entries(MODE_LABEL).map(([v, l]) => <option key={v} value={v}>{l}</option>)}
              </select>
            </div>
            <div className={style.field} style={{ flex: 2 }}>
              <label className={style.label}>{LOCATION_LABEL[form.mode]}</label>
              <input className={style.input} value={form.location} required={form.mode !== 'phone'}
                onChange={e => set('location', e.target.value)} placeholder={form.mode === 'online' ? 'https://meet.google.com/…' : ''} />
            </div>
          </div>
          <div className={pipe.formRow}>
            <div className={style.field}>
              <label className={style.label}>Interviewer name</label>
              <input className={style.input} value={form.interviewer_name} onChange={e => set('interviewer_name', e.target.value)} />
            </div>
            <div className={style.field}>
              <label className={style.label}>Interviewer email</label>
              <input className={style.input} type='email' value={form.interviewer_email} onChange={e => set('interviewer_email', e.target.value)} />
            </div>
          </div>
          <div className={style.field}>
            <label className={style.label}>Message to include in the emails (optional)</label>
            <textarea className={style.textarea} rows={3} value={form.notes} onChange={e => set('notes', e.target.value)}
              placeholder='e.g. Please have your portfolio ready' />
          </div>
          {error && <p className={style.formError}>{error}</p>}
          <p className={pipe.hint}>
            {editingId ? 'Saving emails the new details to the candidate' : 'Saving emails an invite to the candidate'}
            {form.interviewer_email ? ' and the interviewer' : ''}, with a calendar file. Reminders go out 24 hours and 1 hour before.
          </p>
          <div className={pipe.formRow}>
            <button type='submit' className={style.submitBtn} disabled={busy}>
              {busy ? 'Saving…' : editingId ? 'Save & notify' : 'Schedule & send invite'}
            </button>
            <button type='button' className={pipe.ghostBtn} onClick={() => setForm(null)}>Close</button>
          </div>
        </form>
      )}

      {interviews.length === 0 && !form && <p className={pipe.empty}>No interviews scheduled.</p>}
      <ul className={pipe.timeline}>
        {interviews.map(iv => (
          <li key={iv.id} className={`${pipe.event} ${iv.status !== 'scheduled' ? pipe.muted : ''}`}>
            <div className={pipe.eventHead}>
              {iv.when_display}
              <span className={`${pipe.pill} ${pipe['pill_' + iv.status]}`}>{iv.status}</span>
            </div>
            <div className={pipe.eventMeta}>
              {iv.duration_minutes} min · {MODE_LABEL[iv.mode]}{iv.location ? ` · ${iv.location}` : ''}
              {iv.interviewer_name ? ` · with ${iv.interviewer_name}` : ''}
            </div>
            {iv.status === 'cancelled' && iv.cancel_reason && <div className={pipe.eventNote}>Reason: {iv.cancel_reason}</div>}
            {iv.status === 'scheduled' && (
              <div className={pipe.rowActions}>
                <button type='button' className={pipe.inlineLink} onClick={() => openEdit(iv)}>Reschedule / edit</button>
                <button type='button' className={pipe.inlineLink} onClick={() => act(iv, 'complete')}>Mark done</button>
                <button type='button' className={pipe.inlineLink} onClick={() => cancel(iv)}>Cancel</button>
              </div>
            )}
          </li>
        ))}
      </ul>
    </div>
  )
}
