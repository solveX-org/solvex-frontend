import Nav from '@/components/common/nav/nav'
import Footer from '@/components/common/footer/index'
import Link from 'next/link'
import ApplyForm from '@/components/careers/ApplyForm'
import { TYPE_LABELS } from '@/components/careers/JobCard'
import style from '@/components/careers/careers.module.css'
import { API } from '@/utils/api'

const apiBase = `${API}/careers`

async function getJob(slug) {
  try {
    const res = await fetch(`${apiBase}/${slug}/`, { next: { revalidate: 60 } })
    if (!res.ok) return null
    return res.json()
  } catch {
    return null
  }
}

export async function generateMetadata({ params }) {
  const job = await getJob(params.slug)
  if (!job) return { title: 'Role not found | SolveX' }
  return { title: `${job.title} | SolveX Careers`, description: job.summary }
}

export default async function JobPage({ params }) {
  const job = await getJob(params.slug)

  if (!job) {
    return (
      <>
        <Nav />
        <main className={style.page}>
          <div className='width' style={{ textAlign: 'center' }}>
            <h1>Role not found</h1>
            <p>This role may have been filled or closed.</p>
            <Link href='/careers' className='btn1'>← All roles</Link>
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
          <Link href='/careers' className={style.back}>← All roles</Link>
          <div className={style.layout}>
            <div>
              <h1 className={style.title}>{job.title}</h1>
              <div className={style.tags}>
                {job.department && <span className={style.tag}>{job.department}</span>}
                <span className={style.tag}>{job.location}</span>
                <span className={style.tag}>{TYPE_LABELS[job.employment_type]}</span>
                {job.closing_date && (
                  <span className={style.tag}>
                    Closes {new Date(job.closing_date).toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' })}
                  </span>
                )}
              </div>
              <div className={style.body} dangerouslySetInnerHTML={{ __html: job.description }} />
            </div>
            <ApplyForm slug={job.slug} jobTitle={job.title} />
          </div>
        </div>
      </main>
      <Footer />
    </>
  )
}
