'use client'
import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { RiPaintBrushFill } from 'react-icons/ri'
import { GrCloudSoftware } from 'react-icons/gr'
import Link from 'next/link'
import style from './aboutus.module.css'

/* ── Scroll reveal wrapper ────────────────────────── */
function Reveal({ children, delay = 0, className }) {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, amount: 0.2 })
  return (
    <motion.div
      ref={ref}
      className={className}
      initial={{ opacity: 0, y: 32 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.65, delay, ease: [0.25, 0.46, 0.45, 0.94] }}>
      {children}
    </motion.div>
  )
}

const capabilities = [
  {
    num: '01',
    icon: <RiPaintBrushFill />,
    title: 'Solution Architecture',
    text: 'Strategic architecture without the overhead. We design systems that scale with your vision, built right the first time.',
  },
  {
    num: '02',
    icon: <GrCloudSoftware />,
    title: 'Software Development',
    text: 'Cutting-edge technology delivered with commitment. Every line of code crafted to exceed your expectations.',
  },
]

/* ── About ────────────────────────────────────────── */
function About() {
  const headingRef = useRef(null)
  const isHeadingInView = useInView(headingRef, { once: true, amount: 0.35 })

  return (
    <section className={style.container} id='about'>
      <div className={`width ${style.inner}`}>

        {/* ── Left: heading + body + CTA ── */}
        <div className={style.leftCol}>
          <Reveal>
            <p className='title' style={{ textAlign: 'left' }}>About us</p>
          </Reveal>

          <h2 ref={headingRef} className={style.heading}>
            <span className={style.headLine}>
              {['Making', 'Living', 'Easy.'].map((word, i) => (
                <span key={i} style={{ display: 'inline-block', overflow: 'hidden', marginRight: '0.28em' }}>
                  <motion.span
                    style={{ display: 'inline-block' }}
                    initial={{ y: '110%' }}
                    animate={isHeadingInView ? { y: 0 } : {}}
                    transition={{ duration: 0.7, delay: i * 0.1, ease: [0.25, 0.46, 0.45, 0.94] }}>
                    {word}
                  </motion.span>
                </span>
              ))}
            </span>
            <span className={style.headLine}>
              <span style={{ display: 'inline-block', overflow: 'hidden', marginRight: '0.28em' }}>
                <motion.span
                  style={{ display: 'inline-block' }}
                  initial={{ y: '110%' }}
                  animate={isHeadingInView ? { y: 0 } : {}}
                  transition={{ duration: 0.7, delay: 0.33, ease: [0.25, 0.46, 0.45, 0.94] }}
                  className={style.blue}>
                  One Product
                </motion.span>
              </span>
              <span style={{ display: 'inline-block', overflow: 'hidden' }}>
                <motion.span
                  style={{ display: 'inline-block' }}
                  initial={{ y: '110%' }}
                  animate={isHeadingInView ? { y: 0 } : {}}
                  transition={{ duration: 0.7, delay: 0.48, ease: [0.25, 0.46, 0.45, 0.94] }}>
                  at a Time.
                </motion.span>
              </span>
            </span>
          </h2>

          <Reveal delay={0.2}>
            <p className={style.body}>
              At SolveX, we invite you to embark on a journey of transformative experiences, where technology meets purpose and innovation meets you. Explore our products and find the one that fits your life.
            </p>
          </Reveal>

          <Reveal delay={0.32}>
            <Link href='#product' className='btn1'>
              View Products →
            </Link>
          </Reveal>
        </div>

        {/* ── Right: capability tiles ── */}
        <div className={style.rightCol}>
          {capabilities.map((cap, i) => (
            <Reveal key={cap.num} delay={0.1 + i * 0.15}>
              <div className={style.capTile}>
                <div className={style.capHeader}>
                  <span className={style.capNum}>{cap.num}</span>
                  <div className={style.capIcon}>{cap.icon}</div>
                </div>
                <h3 className={style.capTitle}>{cap.title}</h3>
                <p className={style.capText}>{cap.text}</p>
              </div>
            </Reveal>
          ))}
        </div>

      </div>
    </section>
  )
}

export default About

export const AnimatedText = ({ text, el: Wrapper = 'p', className }) => {
  const ref = useRef(null)
  const isInView = useInView(ref, { amount: 0, once: true })
  return (
    <Wrapper className={className}>
      <span className='sr-only'>{text}</span>
      <motion.span
        ref={ref}
        initial='hidden'
        animate={isInView ? 'visible' : 'hidden'}
        transition={{ staggerChildren: 0.02 }}
        aria-hidden>
        {text.split('').map((char, i) => (
          <motion.span
            key={i}
            variants={{ hidden: { opacity: 0 }, visible: { opacity: 1 } }}
            aria-hidden>
            {char}
          </motion.span>
        ))}
      </motion.span>
    </Wrapper>
  )
}

export const AboutCard = ({ title, icon, p1, p2, p3 }) => (
  <div className={style.capTile}>
    <h3><span>{icon}</span> {title}</h3>
    <p className={style.capText}>{p1}{p2}</p>
    <p className={style.capText}>{p3}</p>
  </div>
)
