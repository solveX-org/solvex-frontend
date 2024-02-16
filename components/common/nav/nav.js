import React from 'react'
import ImageCont from '../images'
import style from './nav.module.css'
import Link from 'next/link'

function nav() {
  return (
    <nav className={style.nav}>
        <div className={`${style.container} width`}>
            <ImageCont
                src={'/images/logo.png'} 
                alt={''} 
                width={'8rem'} 
                height={'2.5rem'}
                style={''}/>
            <ul className={style.navigations}>
                <div className={style.innerNav}>
                    <li className={style.aboutTag}><Link href={'/'}> About</Link></li>
                    <li className={style.aboutTag}><Link href={'/'}> Services</Link></li>
                    <li className={style.aboutTag}><Link href={'/'}> Contact</Link></li>
                </div>
                <div className='h-[1.7rem] w-[0.1rem] bg-[var(--dark-border)]'></div>
                <li><Link className={style.productTag} href={'/'}> Products</Link></li>

            </ul>
        </div>
    </nav>
  )
}

export default nav