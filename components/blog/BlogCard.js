import Link from 'next/link'
import style from './blog.module.css'

function formatDate(iso) {
  return new Date(iso).toLocaleDateString('en-GB', {
    day: 'numeric', month: 'long', year: 'numeric'
  })
}

function BlogCard({ slug, title, excerpt, author, published_at, cover }) {
  return (
    <Link href={`/blog/${slug}`} className={style.card}>
      <div className={style.cardCover}>
        {cover
          ? <img src={cover} alt={title} className={style.coverImg} />
          : <div className={style.coverFallback} />}
      </div>
      <div className={style.cardBody}>
        <p className={style.meta}>{formatDate(published_at)} · {author}</p>
        <h2 className={style.cardTitle}>{title}</h2>
        <p className={style.cardExcerpt}>{excerpt}</p>
        <span className={style.readMore}>Read more →</span>
      </div>
    </Link>
  )
}

export default BlogCard
