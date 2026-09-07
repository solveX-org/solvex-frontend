'use client'
import ImageCont from '@/components/common/images'
import style from './products.module.css'
import Link from 'next/link'

function ProductCard({ img, alt, name, url }) {
  return (
    <Link
      href={url}
      target='_blank'
      rel='noreferrer'
      className={style.card}>
      <div className={style.logoCircle}>
        <ImageCont
          src={img}
          alt={alt}
          style={style.logoImg}
          imagestyle={style.logoImgInner}
          unoptimized={true} />
      </div>
      <p className={style.cardName}>{name}</p>
    </Link>
  )
}

export default ProductCard
