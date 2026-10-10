import Nav from '@/components/common/nav/nav'
import Footer from '@/components/common/footer/index'
import JobCard from '@/components/careers/JobCard'
import style from '@/components/careers/careers.module.css'
import { API } from '@/utils/api'

const apiLink = `${API}/careers/`

async function getJobs() {
  try {
    const res = await fetch(apiLink, { next: { revalidate: 60 } })
    if (!res.ok) return []
    return res.json()
  } catch {
    return []
  }
}

export const metadata = {
  title: 'Careers | SolveX',
  description: 'Join the SolveX team. See our open roles.',
}

export default async function CareersPage() {
  const jobs = await getJobs()

  return (
    <>
      <Nav />
      <main className={style.page}>
        <div className='width'>
          <div className={style.pageHeader}>
            <p className='title'>Careers</p>
            <h1 className={style.heading}>Build with us</h1>
            <p className={style.subheading}>Help us solve real problems. See where you could fit.</p>
          </div>

          {jobs.length === 0
            ? <p className={style.empty}>No open roles right now. Check back soon.</p>
            : <div className={style.list}>{jobs.map(job => <JobCard key={job.slug} job={job} />)}</div>}
        </div>
      </main>
      <Footer />
    </>
  )
}
