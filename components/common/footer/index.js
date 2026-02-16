import style from './footer.module.css'
import ImageCont from '../images'
import Link from 'next/link'
import { IoLogoFacebook } from 'react-icons/io'
import { FaSquareInstagram, FaSquarePinterest } from 'react-icons/fa6'

function Footer() {
  return (
    <footer className={style.container}>
      <div className={`width ${style.inner}`}>
        <div className={style.top}>
          {/* Brand */}
          <div className={style.brand}>
            <Link href='/'>
              <ImageCont
                src={'/images/logo.png'}
                alt={'SolveX'}
                style={style.logo} />
            </Link>
            <p className={style.tagline}>Crafting Solutions<br />That Put You First.</p>
          </div>

          {/* Nav */}
          <nav className={style.nav}>
            <ul className={style.navList}>
              <li><Link href='#product'>Products</Link></li>
              <li><Link href='/'>Terms &amp; Conditions</Link></li>
              <li><Link href='#about'>About us</Link></li>
              <li><Link href='#about'>Services</Link></li>
            </ul>
          </nav>

          {/* Socials */}
          <div className={style.socialsCol}>
            <p className={style.followLabel}>Follow us</p>
            <ul className={style.socials}>
              <li>
                <a target='_blank' rel='noreferrer' href='https://www.instagram.com/solvexng?utm_source=ig_web_button_share_sheet&igsh=ZDNlZDc0MzIxNw==' aria-label='Instagram'>
                  <FaSquareInstagram />
                </a>
              </li>
              <li>
                <a target='_blank' rel='noreferrer' href='https://www.facebook.com/solvexng/' aria-label='Facebook'>
                  <IoLogoFacebook />
                </a>
              </li>
              <li>
                <a target='_blank' rel='noreferrer' href='https://www.pinterest.com/solveXng/' aria-label='Pinterest'>
                  <FaSquarePinterest />
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className={style.divider} />

        <p className={style.copyright}>
          Copyright &copy; solveX {new Date().getFullYear()}. All rights reserved.
        </p>
      </div>
    </footer>
  )
}

export default Footer
