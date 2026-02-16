'use client'
import ImageCont from '@/components/common/images'
import style from './homehero.module.css'
import Link from 'next/link'
import { useRef, useState, useEffect } from 'react'
import { motion, useInView } from 'framer-motion'

/* ── Animated counter ─────────────────────────────────────── */
function CountUp({ end, suffix = '' }) {
  const [count, setCount] = useState(0)
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true })

  useEffect(() => {
    if (!isInView) return
    let start = 0
    const step = end / 60
    const tick = () => {
      start += step
      if (start >= end) { setCount(end); return }
      setCount(Math.floor(start))
      requestAnimationFrame(tick)
    }
    requestAnimationFrame(tick)
  }, [isInView, end])

  return <span ref={ref}>{count}{suffix}</span>
}

/* ── Word-by-word slide-up reveal ─────────────────────────── */
function WordReveal({ text, delay = 0, className }) {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, amount: 0.3 })
  return (
    <span ref={ref} className={className} aria-label={text}>
      {text.split(' ').map((word, i) => (
        <span key={i} style={{ display: 'inline-block', overflow: 'hidden', marginRight: '0.28em' }}>
          <motion.span
            style={{ display: 'inline-block' }}
            initial={{ y: '115%' }}
            animate={isInView ? { y: 0 } : {}}
            transition={{ duration: 0.75, delay: delay + i * 0.1, ease: [0.25, 0.46, 0.45, 0.94] }}>
            {word}
          </motion.span>
        </span>
      ))}
    </span>
  )
}

/* ── Hero ───────────────────────────────────────────────────── */
function Hero() {
  return (
    <section className={style.container}>
      <div className={`${style.inner} width`}>
        {/* ── Left text column ── */}
        <div className={style.textCol}>
          <motion.div
            className={style.badge}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55, delay: 0.2 }}>
            <span className={style.badgeDot} />
            Building the future of product innovation
          </motion.div>

          <h1 className={style.heading}>
            <span className={style.headLine}>
              <WordReveal text="Crafting" delay={0.35} />
            </span>
            <span className={style.headLine}>
              <WordReveal text="Solutions" className={style.orange} delay={0.5} />
              <WordReveal text="That" delay={0.6} />
            </span>
            <span className={style.headLine}>
              <WordReveal text="Put You First." delay={0.72} />
            </span>
          </h1>

          <motion.p
            className={style.subtitle}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 1.05 }}>
            Fostering a world where every product innovation enriches every aspect of living.
          </motion.p>

          <motion.div
            className={style.ctaRow}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 1.25 }}>
            <Link href="#product" className={style.primaryBtn}>
              Explore Products
              <motion.span
                className={style.arrow}
                animate={{ x: [0, 5, 0] }}
                transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}>
                →
              </motion.span>
            </Link>
            <Link href="#about" className={style.ghostBtn}>
              Learn more
            </Link>
          </motion.div>

          <motion.div
            className={style.stats}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.7, delay: 1.5 }}>
            {[
              { end: 5, suffix: '+', label: 'Products Built' },
              { end: 10, suffix: 'K+', label: 'Users Reached' },
              { end: 3, suffix: '+', label: 'Years Active' },
            ].map((s, i) => (
              <div key={i} className={style.statItem}>
                <span className={style.statNum}><CountUp end={s.end} suffix={s.suffix} /></span>
                <span className={style.statLabel}>{s.label}</span>
              </div>
            ))}
          </motion.div>
        </div>

        {/* ── Right image column ── */}
        <motion.div
          className={style.imgCol}
          initial={{ opacity: 0, x: 60 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 1, delay: 0.45, ease: [0.25, 0.46, 0.45, 0.94] }}>
          <div className={style.imgGlow} aria-hidden />
          <ImageCont
            src={'/images/laptoppresser.png'}
            alt={'SolveX products on a laptop'}
            style={style.imgContainer}
            imagestyle={style.imgImage} />
        </motion.div>
      </div>
    </section>
  )
}

export default Hero

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
        transition={{ staggerChildren: 0.03 }}
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
