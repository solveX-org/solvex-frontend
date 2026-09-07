import Nav from '@/components/common/nav/nav'
import Footer from '@/components/common/footer/index'
import Link from 'next/link'
import style from '@/components/blog/post.module.css'

const apiBase = 'https://api.solvexng.com/api/v1/blog'

async function getPost(slug) {
  try {
    const res = await fetch(`${apiBase}/${slug}/`, { next: { revalidate: 60 } })
    if (!res.ok) return null
    return res.json()
  } catch {
    return null
  }
}

export async function generateMetadata({ params }) {
  const post = await getPost(params.slug)
  if (!post) return { title: 'Post not found | SolveX' }
  return {
    title: `${post.title} | SolveX Blog`,
    description: post.excerpt,
  }
}

function formatDate(iso) {
  return new Date(iso).toLocaleDateString('en-GB', {
    day: 'numeric', month: 'long', year: 'numeric'
  })
}

export default async function BlogPostPage({ params }) {
  const post = await getPost(params.slug)

  if (!post) {
    return (
      <>
        <Nav />
        <main className={style.page}>
          <div className={`width ${style.notFound}`}>
            <h1>Post not found</h1>
            <p>This post may have been removed or doesn&apos;t exist.</p>
            <Link href='/blog' className='btn1'>← Back to Blog</Link>
          </div>
        </main>
        <Footer />
      </>
    )
  }

  return (
    <>
      <Nav />
      <main className={style.page}>
        <div className='width'>
          <Link href='/blog' className={style.back}>← Back to Blog</Link>

          {post.get_cover_absolute_url
            ? (
              <div className={style.cover}>
                <img src={post.get_cover_absolute_url} alt={post.title} className={style.coverImg} />
              </div>
            )
            : <div className={`${style.cover} ${style.coverFallback}`} />}

          <div className={style.header}>
            <p className={style.meta}>{formatDate(post.published_at)} · {post.author}</p>
            <h1 className={style.title}>{post.title}</h1>
          </div>

          <div
            className={style.body}
            dangerouslySetInnerHTML={{ __html: post.body }} />
        </div>
      </main>
      <Footer />
    </>
  )
}
