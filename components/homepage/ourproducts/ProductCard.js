'use client'
import ImageCont from '@/components/common/images'
import style from './products.module.css'
import Link from 'next/link'
import { MdArrowForwardIos } from 'react-icons/md'

function ProductCard({ img, alt, name, text, url }) {
  return (
    <div className={style.card}>
      {/* ── Top: image preview ── */}
      <div className={style.cardVisual} aria-hidden>
        <div className={style.cardVisualGlow} />
        <ImageCont
          src={img}
          alt={alt}
          style={style.cardVisualImg}
          imagestyle={style.cardVisualImgInner}
          unoptimized={true} />
      </div>

      {/* ── Bottom: content ── */}
      <div className={style.cardContent}>
        <h3 className={style.cardHeadline}>{name}</h3>
        <p className={style.cardDesc}>{text}</p>
        <Link
          href={url}
          target='_blank'
          rel='noreferrer'
          className={style.cardCta}>
          Visit {name}
          <MdArrowForwardIos className={style.cardCtaArrow} />
        </Link>
      </div>
    </div>
  )
}

export default ProductCard
