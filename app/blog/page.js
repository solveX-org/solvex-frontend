import Nav from '@/components/common/nav/nav'
import Footer from '@/components/common/footer/index'
import BlogCard from '@/components/blog/BlogCard'
import style from '@/components/blog/blog.module.css'

const apiLink = 'https://api.solvexng.com/api/v1/blog/'

async function getPosts() {
  try {
    const res = await fetch(apiLink, { next: { revalidate: 60 } })
    if (!res.ok) return []
    return res.json()
  } catch {
    return []
  }
}

export const metadata = {
  title: 'Blog | SolveX',
  description: 'Insights, updates and stories from the SolveX team.',
}

export default async function BlogPage() {
  const posts = await getPosts()

  return (
    <>
      <Nav />
      <main className={style.page}>
        <div className='width'>
          <div className={style.pageHeader}>
            <p className='title'>Our Blog</p>
            <h1 className={style.heading}>Insights & Updates</h1>
            <p className={style.subheading}>Stories, ideas, and news from the SolveX team.</p>
          </div>

          {posts.length === 0
            ? <p className={style.empty}>No posts yet. Check back soon.</p>
            : (
              <div className={style.grid}>
                {posts.map(post => (
                  <BlogCard
                    key={post.slug}
                    slug={post.slug}
                    title={post.title}
                    excerpt={post.excerpt}
                    author={post.author}
                    published_at={post.published_at}
                    cover={post.get_cover_absolute_url} />
                ))}
              </div>
            )}
        </div>
      </main>
      <Footer />
    </>
  )
}
