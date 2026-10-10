'use client'
import { useState } from 'react'
import { apiFetch } from '@/utils/auth'
import style from './dashboard.module.css'
import pipe from './pipeline.module.css'

const LS_KEY = 'solvex_offer_signatory'

function readSignatory() {
  try { return JSON.parse(localStorage.getItem(LS_KEY)) || {} } catch { return {} }
}

const EMPTY = {
  salary: '', start_date: '', reply_by: '', reporting_to: '', extra_terms: '',
  signatory_name: '', signatory_title: '',
}

function firstError(body, status) {
  const first = body ? Object.values(body).flat()[0] : null
  return typeof first === 'string' ? first : `Request failed (HTTP ${status}).`
}

function fmt(iso) {
  return new Date(iso).toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' })
}

export default function OfferPanel({ applicationId, offers, reload }) {
  const [form, setForm] = useState(null)   // null = closed
  const [letter, setLetter] = useState(null) // null = step 1 (terms), string = step 2 (review)
  const [busy, setBusy] = useState(false)
  const [error, setError] = useState(null)

  const set = (k, v) => setForm(f => ({ ...f, [k]: v }))

  const open = () => {
    setForm({ ...EMPTY, ...readSignatory() })
    setLetter(null)
    setError(null)
  }
  const close = () => { setForm(null); setLetter(null); setError(null) }

  const terms = () => ({ ...form })

  const preview = async (e) => {
    e.preventDefault()
    setBusy(true)
    setError(null)
    const res = await apiFetch(`/careers/applications/${applicationId}/offers/preview/`, {
      method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(terms()),
    })
    setBusy(false)
    const body = await res?.json().catch(() => null)
    if (res?.ok) setLetter(body.body)
    else setError(firstError(body, res?.status))
  }

  const generate = async () => {
    setBusy(true)
    setError(null)
    const res = await apiFetch(`/careers/applications/${applicationId}/offers/`, {
      method: 'POST', headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ ...terms(), body: letter }),
    })
    setBusy(false)
    const body = await res?.json().catch(() => null)
    if (res?.ok) {
      try {
        localStorage.setItem(LS_KEY, JSON.stringify({
          signatory_name: form.signatory_name, signatory_title: form.signatory_title,
        }))
      } catch {}
      close()
      reload()
    } else setError(firstError(body, res?.status))
  }

  const download = async (offer) => {
    const res = await apiFetch(`/careers/offers/${offer.id}/pdf/`)
    if (!res?.ok) return alert('Could not download the PDF.')
    const url = URL.createObjectURL(await res.blob())
    const a = document.createElement('a')
    a.href = url
    a.download = /filename="?([^"]+)"?/.exec(res.headers.get('Content-Disposition') || '')?.[1] || 'offer-letter.pdf'
    a.click()
    URL.revokeObjectURL(url)
  }

  const remove = async (offer) => {
    if (!confirm('Delete this offer letter?')) return
    const res = await apiFetch(`/careers/offers/${offer.id}/pdf/`, { method: 'DELETE' })
    if (res?.ok) reload()
    else alert((await res?.json().catch(() => null))?.error || 'Could not delete.')
  }

  return (
    <div className={pipe.panel}>
      <div className={pipe.panelHead}>
        <h3 className={pipe.panelTitle} style={{ margin: 0 }}>Offer letter</h3>
        {!form && <button type='button' className={pipe.linkBtn} onClick={open}>+ Create</button>}
      </div>

      {form && letter === null && (
        <form onSubmit={preview} className={pipe.interviewForm}>
          <div className={style.field}>
            <label className={style.label}>Salary / compensation *</label>
            <input className={style.input} required value={form.salary} placeholder='e.g. ₦600,000 per month'
              onChange={e => set('salary', e.target.value)} />
          </div>
          <div className={pipe.formRow}>
            <div className={style.field}>
              <label className={style.label}>Start date *</label>
              <input className={style.input} type='date' required value={form.start_date} onChange={e => set('start_date', e.target.value)} />
            </div>
            <div className={style.field}>
              <label className={style.label}>Reply by *</label>
              <input className={style.input} type='date' required value={form.reply_by} onChange={e => set('reply_by', e.target.value)} />
            </div>
          </div>
          <div className={style.field}>
            <label className={style.label}>Reporting to</label>
            <input className={style.input} value={form.reporting_to} onChange={e => set('reporting_to', e.target.value)} />
          </div>
          <div className={style.field}>
            <label className={style.label}>Additional terms (benefits, probation…)</label>
            <textarea className={style.textarea} rows={3} value={form.extra_terms} onChange={e => set('extra_terms', e.target.value)} />
          </div>
          <div className={pipe.formRow}>
            <div className={style.field}>
              <label className={style.label}>Signed by (name) *</label>
              <input className={style.input} required value={form.signatory_name} onChange={e => set('signatory_name', e.target.value)} />
            </div>
            <div className={style.field}>
              <label className={style.label}>Title</label>
              <input className={style.input} value={form.signatory_title} onChange={e => set('signatory_title', e.target.value)} />
            </div>
          </div>
          {error && <p className={style.formError}>{error}</p>}
          <div className={pipe.formRow}>
            <button type='submit' className={style.submitBtn} disabled={busy}>{busy ? 'Loading…' : 'Preview letter'}</button>
            <button type='button' className={pipe.ghostBtn} onClick={close}>Close</button>
          </div>
        </form>
      )}

      {form && letter !== null && (
        <div className={pipe.interviewForm}>
          <label className={style.label}>Review and edit the letter</label>
          <textarea className={`${style.textarea} ${pipe.letterEditor}`} rows={22} value={letter}
            onChange={e => setLetter(e.target.value)} />
          <p className={pipe.hint}>
            Blank line = new paragraph · <code># </code>heading · <code>- </code>bullet. Signature boxes are added automatically.
            Replace anything in [[double brackets]].
          </p>
          {/\[\[.*?\]\]/.test(letter) && <p className={pipe.warn}>Replace the [[bracketed]] parts before generating.</p>}
          {error && <p className={style.formError}>{error}</p>}
          <div className={pipe.formRow}>
            <button type='button' className={style.submitBtn} disabled={busy || /\[\[.*?\]\]/.test(letter)} onClick={generate}>
              {busy ? 'Generating…' : 'Generate PDF'}
            </button>
            <button type='button' className={pipe.ghostBtn} onClick={() => setLetter(null)}>← Back</button>
          </div>
        </div>
      )}

      {offers.length === 0 && !form && <p className={pipe.empty}>No offer letters yet.</p>}
      <ul className={pipe.timeline}>
        {offers.map(o => (
          <li key={o.id} className={pipe.event}>
            <div className={pipe.eventHead}>
              {o.salary}
              <span className={`${pipe.pill} ${o.sent_at ? pipe.pill_completed : pipe.pill_scheduled}`}>
                {o.sent_at ? 'sent' : 'draft'}
              </span>
            </div>
            <div className={pipe.eventMeta}>
              Starts {fmt(o.start_date)} · reply by {fmt(o.reply_by)} · created {fmt(o.created_at)}
              {o.sent_at ? ` · sent ${fmt(o.sent_at)}` : ''}
            </div>
            <div className={pipe.rowActions}>
              <button type='button' className={pipe.inlineLink} onClick={() => download(o)}>Download PDF</button>
              {!o.sent_at && <button type='button' className={pipe.inlineLink} onClick={() => remove(o)}>Delete</button>}
            </div>
          </li>
        ))}
      </ul>
    </div>
  )
}
