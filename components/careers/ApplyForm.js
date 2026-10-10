'use client'
import { useState } from 'react'
import style from './careers.module.css'
import { API } from '@/utils/api'

const MAX_BYTES = 5 * 1024 * 1024

export default function ApplyForm({ slug, jobTitle }) {
  const [form, setForm] = useState({
    first_name: '', last_name: '', email: '', phone: '',
    linkedin_url: '', portfolio_url: '', cover_letter: '', website: '',
  })
  const [resume, setResume] = useState(null)
  const [status, setStatus] = useState('idle') // idle | sending | done
  const [error, setError] = useState(null)

  const set = (k, v) => setForm(f => ({ ...f, [k]: v }))

  const onFile = (e) => {
    const file = e.target.files[0]
    setError(null)
    if (file && file.size > MAX_BYTES) {
      setError('Resume must be 5MB or smaller.')
      e.target.value = ''
      return setResume(null)
    }
    setResume(file || null)
  }

  const submit = async (e) => {
    e.preventDefault()
    if (!resume) return setError('Please attach your resume.')
    setStatus('sending')
    setError(null)
    const data = new FormData()
    Object.entries(form).forEach(([k, v]) => data.append(k, v))
    data.append('resume', resume)
    try {
      const res = await fetch(`${API}/careers/${slug}/apply/`, { method: 'POST', body: data })
      if (res.ok) return setStatus('done')
      if (res.status === 429) setError('Too many attempts. Please try again later.')
      else {
        const body = await res.json().catch(() => ({}))
        const first = Object.values(body).flat()[0]
        setError(typeof first === 'string' ? first : 'Something went wrong. Please try again.')
      }
    } catch {
      setError('Network error. Please try again.')
    }
    setStatus('idle')
  }

  if (status === 'done') {
    return (
      <div className={style.formCard}>
        <div className={style.success}>
          <h3>Application sent 🎉</h3>
          <p>Thanks for applying for {jobTitle}. We&apos;ve emailed you a confirmation.</p>
        </div>
      </div>
    )
  }

  return (
    <form className={style.formCard} onSubmit={submit}>
      <h2 className={style.formTitle}>Apply for this role</h2>

      <div className={style.row}>
        <div className={style.field}>
          <label className={style.label}>First name *</label>
          <input className={style.input} required maxLength={50} value={form.first_name}
            onChange={e => set('first_name', e.target.value)} />
        </div>
        <div className={style.field}>
          <label className={style.label}>Last name *</label>
          <input className={style.input} required maxLength={50} value={form.last_name}
            onChange={e => set('last_name', e.target.value)} />
        </div>
      </div>
      <div className={style.field}>
        <label className={style.label}>Email *</label>
        <input className={style.input} type='email' required value={form.email}
          onChange={e => set('email', e.target.value)} />
      </div>
      <div className={style.field}>
        <label className={style.label}>Phone</label>
        <input className={style.input} type='tel' maxLength={30} value={form.phone}
          onChange={e => set('phone', e.target.value)} />
      </div>
      <div className={style.field}>
        <label className={style.label}>LinkedIn</label>
        <input className={style.input} type='url' placeholder='https://' value={form.linkedin_url}
          onChange={e => set('linkedin_url', e.target.value)} />
      </div>
      <div className={style.field}>
        <label className={style.label}>Portfolio / GitHub</label>
        <input className={style.input} type='url' placeholder='https://' value={form.portfolio_url}
          onChange={e => set('portfolio_url', e.target.value)} />
      </div>
      <div className={style.field}>
        <label className={style.label}>Resume *</label>
        <input className={style.input} type='file' required accept='.pdf,.doc,.docx' onChange={onFile} />
        <span className={style.hint}>PDF, DOC or DOCX, up to 5MB</span>
      </div>
      <div className={style.field}>
        <label className={style.label}>Cover letter</label>
        <textarea className={style.input} rows={4} maxLength={5000} value={form.cover_letter}
          onChange={e => set('cover_letter', e.target.value)} />
      </div>

      {/* Honeypot — hidden from people, bots tend to fill it */}
      <div className={style.hp} aria-hidden='true'>
        <label>Website<input tabIndex={-1} autoComplete='off' value={form.website}
          onChange={e => set('website', e.target.value)} /></label>
      </div>

      {error && <p className={style.error}>{error}</p>}
      <button type='submit' className={style.submit} disabled={status === 'sending'}>
        {status === 'sending' ? 'Sending…' : 'Submit application'}
      </button>
    </form>
  )
}
