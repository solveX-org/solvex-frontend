'use client'
import React from 'react'
import ImageCont from '../images'
import style from './nav.module.css'
import Link from 'next/link'
import { useState } from 'react'
import { FaSquareInstagram, FaSquarePinterest } from 'react-icons/fa6'
import { IoLogoFacebook } from 'react-icons/io'

function nav() {
    const [toggle, setToggle] = useState(true)
    // const [toggle, setToggle] = useState(false)

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
            <button onClick={()=>setToggle(!toggle)} className={style.toggle}>
                <div className={!toggle ? style.div1: style.div01}></div>
                <div className={!toggle ? style.div2: style.div02}></div>
                <div className={!toggle ? style.div3: style.div03}></div>
            </button>

            <ul className={toggle? style.navigation2: style.hiddenNavigation2}>
                <ul className={style.navigations2}>
                    <li className={style.aboutTag}><Link href={'/'}> About</Link></li>
                    <li className={style.aboutTag}><Link href={'/'}> Services</Link></li>
                    <li className={style.aboutTag}><Link href={'/'}> Contact</Link></li>
                    <li className={style.aboutTag}><Link className={style.productTag} href={'/'}> Products</Link></li>

                </ul>
                <div className={''}>
                    <ul className={style.socials}>
                        <li><a href={''}><FaSquareInstagram/></a></li>
                        <li><a href={''}><IoLogoFacebook/></a></li>
                        <li><a href={''}><FaSquarePinterest/></a></li>
                    </ul>
                </div>
            </ul>
        </div>
    </nav>
  )
}

export default nav