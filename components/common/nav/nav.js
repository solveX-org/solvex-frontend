'use client'
import React from 'react'
import ImageCont from '../images'
import style from './nav.module.css'
import Link from 'next/link'
import { useState } from 'react'
import { FaSquareInstagram, FaSquarePinterest } from 'react-icons/fa6'
import { IoLogoFacebook } from 'react-icons/io'

function Nav() {
    const [toggle, setToggle] = useState(false)

  return (
    <nav className={style.nav}>
        <div className={`${style.container} width`}>
            <Link href={'/'}>
                <ImageCont
                    src={'/images/logo.png'} 
                    alt={''} 
                    // width={'8rem'} 
                    // height={'3rem'}
                    style={style.img}/>
            </Link>
            <ul className={style.navigations}>
                <div className={style.innerNav}>
                    <li className={style.aboutTag}><Link href={'#about'}> About</Link></li>
                    <li className={style.aboutTag}><Link href={'#about'}> Services</Link></li>
                    <li className={style.aboutTag}><Link href={'#contact'}> Contact</Link></li>
                </div>
                <div className='h-[1.7rem] w-[0.1rem] bg-[var(--dark-border)]'></div>
                <li><Link className={style.productTag} href={'#product'}> Products</Link></li>

            </ul>
            <button onClick={()=>setToggle(!toggle)} className={style.toggle}>
                <div className={!toggle ? style.div1: style.div01}></div>
                <div className={!toggle ? style.div2: style.div02}></div>
                <div className={!toggle ? style.div3: style.div03}></div>
            </button>

            <ul className={toggle? style.navigation2: style.hiddenNavigation2}>
                <ul className={style.navigations2}>
                    <li onClick={()=>setToggle(false)} className={style.aboutTag}><Link onClick={()=>setToggle(false)} href={'#about'}> About</Link></li>
                    <li onClick={()=>setToggle(false)} className={style.aboutTag}><Link onClick={()=>setToggle(false)} href={'#about'}> Services</Link></li>
                    <li onClick={()=>setToggle(false)} className={style.aboutTag}><Link onClick={()=>setToggle(false)} href={'#contact'}> Contact</Link></li>
                    <li onClick={()=>setToggle(false)} className={style.aboutTag}><Link onClick={()=>setToggle(false)} className={style.productTag} href={'#product'}> Products</Link></li>

                </ul>
                <div className={''}>
                    <ul className={style.socials}>
                        {/* i still need to work on this ones */}
                        <li onClick={()=>setToggle(false)}><a target='_blank' onClick={()=>setToggle(false)} href={'https://www.instagram.com/solvexng?utm_source=ig_web_button_share_sheet&igsh=ZDNlZDc0MzIxNw=='}><FaSquareInstagram/></a></li>
                        <li onClick={()=>setToggle(false)}><a target='_blank' onClick={()=>setToggle(false)} href={'https://www.facebook.com/solvexng/'}><IoLogoFacebook/></a></li>
                        <li onClick={()=>setToggle(false)}><a target='_blank' onClick={()=>setToggle(false)} href={'https://www.pinterest.com/solveXng/'}><FaSquarePinterest/></a></li>
                    </ul>
                </div>
            </ul>
        </div>
    </nav>
  )
}

export default Nav
