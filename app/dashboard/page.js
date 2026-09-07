'use client'
import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { apiFetch, clearToken } from '@/utils/auth'
import style from '@/components/dashboard/dashboard.module.css'

export default function DashboardPage() {
  const router = useRouter()
  const [posts, setPosts] = useState([])
  const [loading, setLoading] = useState(true)

  const fetchPosts = async () => {
    const res = await apiFetch('/blog/manage/')
    if (!res) return
    const data = await res.json()
    setPosts(data)
    setLoading(false)
  }

  useEffect(() => { fetchPosts() }, [])

  const handleDelete = async (id) => {
    if (!confirm('Delete this post?')) return
    await apiFetch(`/blog/manage/${id}/`, { method: 'DELETE' })
    setPosts(posts.filter(p => p.id !== id))
  }

  const handleTogglePublish = async (post) => {
    const formData = new FormData()
    formData.append('is_published', !post.is_published)
    const res = await apiFetch(`/blog/manage/${post.id}/`, {
      method: 'PATCH',
      body: formData,
    })
    if (res?.ok) fetchPosts()
  }

  const handleLogout = () => {
    clearToken()
    router.push('/dashboard/login')
  }

  return (
    <div className={style.page}>
      {/* Sidebar */}
      <aside className={style.sidebar}>
        <div className={style.sidebarLogo}>Solve<span>X</span></div>
        <nav className={style.sidebarNav}>
          <span className={style.navItem + ' ' + style.navActive}>Blog Posts</span>
        </nav>
        <button className={style.logoutBtn} onClick={handleLogout}>Log out</button>
      </aside>

      {/* Main */}
      <main className={style.main}>
        <div className={style.topBar}>
          <h1 className={style.pageTitle}>Blog Posts</h1>
          <Link href='/dashboard/posts/new' className={style.newBtn}>+ New Post</Link>
        </div>

        {loading ? (
          <p className={style.loadingText}>Loading…</p>
        ) : posts.length === 0 ? (
          <p className={style.emptyText}>No posts yet. <Link href='/dashboard/posts/new'>Create your first one.</Link></p>
        ) : (
          <div className={style.table}>
            <div className={style.tableHead}>
              <span>Title</span>
              <span>Author</span>
              <span>Status</span>
              <span>Actions</span>
            </div>
            {posts.map(post => (
              <div key={post.id} className={style.tableRow}>
                <span className={style.postTitle}>{post.title}</span>
                <span className={style.postMeta}>{post.author}</span>
                <button
                  className={`${style.badge} ${post.is_published ? style.badgePublished : style.badgeDraft}`}
                  onClick={() => handleTogglePublish(post)}>
                  {post.is_published ? 'Published' : 'Draft'}
                </button>
                <div className={style.actions}>
                  <Link href={`/dashboard/posts/${post.id}`} className={style.editBtn}>Edit</Link>
                  <button className={style.deleteBtn} onClick={() => handleDelete(post.id)}>Delete</button>
                </div>
              </div>
            ))}
          </div>
        )}
      </main>
    </div>
  )
}
