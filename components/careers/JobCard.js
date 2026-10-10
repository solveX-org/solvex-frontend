import Link from 'next/link'
import style from './careers.module.css'

export const TYPE_LABELS = {
  full_time: 'Full-time',
  part_time: 'Part-time',
  contract: 'Contract',
  internship: 'Internship',
}

export default function JobCard({ job }) {
  return (
    <Link href={`/careers/${job.slug}`} className={style.card}>
      <h2 className={style.cardTitle}>{job.title}</h2>
      <p className={style.cardSummary}>{job.summary}</p>
      <div className={style.tags}>
        {job.department && <span className={style.tag}>{job.department}</span>}
        <span className={style.tag}>{job.location}</span>
        <span className={style.tag}>{TYPE_LABELS[job.employment_type]}</span>
      </div>
    </Link>
  )
}
