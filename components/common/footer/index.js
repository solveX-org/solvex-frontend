import style from './footer.module.css'
import ImageCont from '../images'
import Link from 'next/link'
import { IoLogoFacebook } from "react-icons/io";
import { FaSquareInstagram } from "react-icons/fa6";
import { FaSquarePinterest } from "react-icons/fa6";

function Footer() {
  return (
    <footer className={style.container}>
      <div className={`width ${style.innercontainer}`}>
        <div className={`${style.innercontainer2}`}>
          <div className={style.logoText}>
            <Link href={'/'}>
              <ImageCont
                src={'/images/mini_logo.png'} 
                alt={'solveX'} 
                style={`${style.logo}`}/>
            </Link>
              <span>
                <p>Crafting Solutions</p>
                <p> That Put You First...</p>
              </span>
          </div>

          <div className={style.footernav}>
            <ul className={style.navItem}>
              <li className={style.borderRight}><Link href={'/'}>Products</Link></li>
              <li className={style.borderRight}><Link href={'/'}>Terms and conditions</Link></li>
              <li className={style.borderRight}><Link href={'/'}>About us</Link></li>
              <li><Link href={'/'}>Services</Link></li>
            </ul>
            <ul className={style.socials}>
              <li><a href={''}><FaSquareInstagram/></a></li>
              <li><a href={''}><IoLogoFacebook/></a></li>
              <li><a href={''}><FaSquarePinterest/></a></li>
            </ul>
          </div>
        </div>
        <hr className={style.hr}/>
        <p className={style.copyright}>Copyright © solveX {new Date().getFullYear()}. All rights reserved</p>
      </div>
    </footer>
  )
}

export default Footer