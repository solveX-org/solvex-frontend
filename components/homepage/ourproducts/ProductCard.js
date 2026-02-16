'use client'
import ImageCont from '@/components/common/images'
import style from './products.module.css'
import Link from 'next/link'
import { MdArrowForwardIos } from 'react-icons/md'

function ProductCard({ img, alt, name, text, url }) {
  return (
    <div className={style.card}>
      {/* ── Left: content ── */}
      <div className={style.cardContent}>
        {/* Logo mark + name row */}
        <div className={style.cardBrand}>
          <div className={style.cardLogoMark}>
            <ImageCont
              src={img}
              alt={alt}
              style={style.logoMarkImg} />
          </div>
          <span className={style.cardBrandName}>{name}</span>
        </div>

        {/* Headline */}
        <h3 className={style.cardHeadline}>{name}</h3>

        {/* Description */}
        <p className={style.cardDesc}>{text}</p>

        {/* CTA */}
        <Link
          href={url}
          target='_blank'
          rel='noreferrer'
          className={style.cardCta}>
          Visit {name}
          <MdArrowForwardIos className={style.cardCtaArrow} />
        </Link>
      </div>

      {/* ── Right: visual ── */}
      <div className={style.cardVisual} aria-hidden>
        <div className={style.cardVisualGlow} />
        <ImageCont
          src={img}
          alt={alt}
          style={style.cardVisualImg} />
      </div>
    </div>
  )
}

export default ProductCard
