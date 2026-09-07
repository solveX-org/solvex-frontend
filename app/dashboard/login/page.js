'use client'
import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { login } from '@/utils/auth'
import style from '@/components/dashboard/dashboard.module.css'

export default function LoginPage() {
  const router = useRouter()
  const [form, setForm] = useState({ username: '', password: '' })
  const [error, setError] = useState(null)
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    setError(null)
    try {
      await login(form.username, form.password)
      router.push('/dashboard')
    } catch {
      setError('Invalid username or password.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className={style.loginPage}>
      <div className={style.loginCard}>
        <div className={style.loginLogo}>
          Solve<span>X</span>
        </div>
        <h1 className={style.loginTitle}>Dashboard Login</h1>

        <form onSubmit={handleSubmit} className={style.loginForm}>
          <div className={style.field}>
            <label className={style.label}>Username</label>
            <input
              className={style.input}
              type='text'
              value={form.username}
              onChange={e => setForm({ ...form, username: e.target.value })}
              required
              autoFocus />
          </div>
          <div className={style.field}>
            <label className={style.label}>Password</label>
            <input
              className={style.input}
              type='password'
              value={form.password}
              onChange={e => setForm({ ...form, password: e.target.value })}
              required />
          </div>
          {error && <p className={style.loginError}>{error}</p>}
          <button className={style.loginBtn} type='submit' disabled={loading}>
            {loading ? 'Signing in…' : 'Sign In'}
          </button>
        </form>
      </div>
    </div>
  )
}
