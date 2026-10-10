'use client'
import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation'
import { clearToken } from '@/utils/auth'
import style from './dashboard.module.css'

const LINKS = [
  { label: 'Blog Posts', href: '/dashboard', match: p => p === '/dashboard' || p.startsWith('/dashboard/posts') },
  { label: 'Jobs', href: '/dashboard/jobs', match: p => p.startsWith('/dashboard/jobs') },
]

export default function Sidebar() {
  const pathname = usePathname()
  const router = useRouter()

  const handleLogout = () => {
    clearToken()
    router.push('/dashboard/login')
  }

  return (
    <aside className={style.sidebar}>
      <div className={style.sidebarLogo}>Solve<span>X</span></div>
      <nav className={style.sidebarNav}>
        {LINKS.map(l => (
          <Link
            key={l.href}
            href={l.href}
            className={`${style.navItem} ${l.match(pathname) ? style.navActive : ''}`}>
            {l.label}
          </Link>
        ))}
      </nav>
      <button className={style.logoutBtn} onClick={handleLogout}>Log out</button>
    </aside>
  )
}
