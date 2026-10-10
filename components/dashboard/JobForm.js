'use client'
import { useState } from 'react'
import dynamic from 'next/dynamic'
import style from './dashboard.module.css'

const Editor = dynamic(() => import('./Editor'), { ssr: false })

export const EMPLOYMENT_TYPES = [
  ['full_time', 'Full-time'],
  ['part_time', 'Part-time'],
  ['contract', 'Contract'],
  ['internship', 'Internship'],
]

export default function JobForm({ initial = {}, onSubmit, loading }) {
  const [form, setForm] = useState({
    title: initial.title || '',
    department: initial.department || '',
    location: initial.location || 'Remote',
    employment_type: initial.employment_type || 'full_time',
    summary: initial.summary || '',
    description: initial.description || '',
    closing_date: initial.closing_date || '',
    is_open: initial.is_open || false,
  })
  const set = (key, val) => setForm(f => ({ ...f, [key]: val }))

  const handleSubmit = (e) => {
    e.preventDefault()
    onSubmit({ ...form, closing_date: form.closing_date || null })
  }

  return (
    <form onSubmit={handleSubmit} className={style.postForm}>
      <div className={style.formGrid}>
        <div className={style.formMain}>
          <div className={style.field}>
            <label className={style.label}>Job title</label>
            <input className={style.input} value={form.title} required
              onChange={e => set('title', e.target.value)} placeholder='e.g. Backend Engineer' />
          </div>
          <div className={style.field}>
            <label className={style.label}>Summary</label>
            <textarea className={style.textarea} rows={3} value={form.summary} required
              onChange={e => set('summary', e.target.value)}
              placeholder='One or two lines shown on the careers listing' />
          </div>
          <div className={style.field}>
            <label className={style.label}>Description</label>
            <Editor content={form.description} onChange={val => set('description', val)} />
          </div>
        </div>

        <div className={style.formSide}>
          <div className={style.sideCard}>
            <h3 className={style.sideCardTitle}>Publish</h3>
            <label className={style.toggleLabel}>
              <input type='checkbox' className={style.toggleInput} checked={form.is_open}
                onChange={e => set('is_open', e.target.checked)} />
              <span className={style.toggle} />
              <span>{form.is_open ? 'Open' : 'Closed'}</span>
            </label>
            <button type='submit' className={style.submitBtn} disabled={loading}>
              {loading ? 'Saving…' : 'Save Job'}
            </button>
          </div>

          <div className={style.sideCard}>
            <h3 className={style.sideCardTitle}>Details</h3>
            <div className={style.field}>
              <label className={style.label}>Department</label>
              <input className={style.input} value={form.department}
                onChange={e => set('department', e.target.value)} />
            </div>
            <div className={style.field}>
              <label className={style.label}>Location</label>
              <input className={style.input} value={form.location} required
                onChange={e => set('location', e.target.value)} />
            </div>
            <div className={style.field}>
              <label className={style.label}>Type</label>
              <select className={style.input} value={form.employment_type}
                onChange={e => set('employment_type', e.target.value)}>
                {EMPLOYMENT_TYPES.map(([v, l]) => <option key={v} value={v}>{l}</option>)}
              </select>
            </div>
            <div className={style.field}>
              <label className={style.label}>Closing date (optional)</label>
              <input className={style.input} type='date' value={form.closing_date || ''}
                onChange={e => set('closing_date', e.target.value)} />
            </div>
          </div>
        </div>
      </div>
    </form>
  )
}
