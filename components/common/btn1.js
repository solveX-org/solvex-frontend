// customized botton for orange buttons

import Link from "next/link"

function Btn1({text, style, href}) {
  if (href) return (
    <Link
        href={href}>
        <button
          className={`${style} btn1`}>
          {text}
      </button>
    </Link>
  )

  return (
    <button
        className={`${style} btn1`}>
        {text}
    </button>)
}

export default Btn1