import Link from "next/link"

function Btn2({name, onclick, style, href}) {
  if (href) return (
    <Link href={href}>
       <button className={`btn2 ${style}`}>{name}</button>
    </Link>
    )

    return (
      <button className={`btn2 ${style}`}>{name}</button>
      )
}

export default Btn2