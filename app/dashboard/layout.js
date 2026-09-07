import style from '@/components/dashboard/dashboard.module.css'

export const metadata = { title: 'Dashboard | SolveX' }

export default function DashboardLayout({ children }) {
  return (
    <div className={style.shell}>
      {children}
    </div>
  )
}
