'use client'
import React, { useState, useEffect } from 'react'
import ImageCont from '../images'
import style from './nav.module.css'
import Link from 'next/link'
import { motion, AnimatePresence } from 'framer-motion'
import { FaSquareInstagram, FaSquarePinterest } from 'react-icons/fa6'
import { IoLogoFacebook } from 'react-icons/io'

function Nav() {
  const [toggle, setToggle] = useState(false)
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <motion.nav
      className={`${style.nav} ${scrolled ? style.blur : ''}`}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5, delay: 0.1 }}>
      <div className={`${style.inner} width`}>
        <Link href='/' className={style.logoLink}>
          <ImageCont src={'/images/logo.png'} alt='SolveX' style={style.logo} />
        </Link>

        <ul className={style.links}>
          <li><Link href='#about'>About</Link></li>
          <li><Link href='#about'>Services</Link></li>
          <li><Link href='#product'>Products</Link></li>
          <li><Link href='#contact'>Contact</Link></li>
        </ul>

        <Link href='#product' className={style.ctaBtn}>
          Get Started
        </Link>

        {/* Mobile hamburger */}
        <button
          className={style.burger}
          onClick={() => setToggle(!toggle)}
          aria-label='Menu'>
          <motion.span animate={toggle ? { rotate: 45, y: 6 } : { rotate: 0, y: 0 }} />
          <motion.span animate={toggle ? { opacity: 0 } : { opacity: 1 }} />
          <motion.span animate={toggle ? { rotate: -45, y: -6 } : { rotate: 0, y: 0 }} />
        </button>
      </div>

      <AnimatePresence>
        {toggle && (
          <motion.div
            className={style.mobileMenu}
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.22 }}>
            <ul className={style.mobileLinks}>
              {[
                { label: 'About', href: '#about' },
                { label: 'Services', href: '#about' },
                { label: 'Products', href: '#product' },
                { label: 'Contact', href: '#contact' },
              ].map((item, i) => (
                <motion.li
                  key={item.label}
                  initial={{ opacity: 0, x: -12 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.06 }}>
                  <Link onClick={() => setToggle(false)} href={item.href}>
                    {item.label}
                  </Link>
                </motion.li>
              ))}
            </ul>
            <div className={style.mobileSocials}>
              <a target='_blank' rel='noreferrer' href='https://www.instagram.com/solvexng?utm_source=ig_web_button_share_sheet&igsh=ZDNlZDc0MzIxNw=='><FaSquareInstagram /></a>
              <a target='_blank' rel='noreferrer' href='https://www.facebook.com/solvexng/'><IoLogoFacebook /></a>
              <a target='_blank' rel='noreferrer' href='https://www.pinterest.com/solveXng/'><FaSquarePinterest /></a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  )
}

export default Nav
