'use client'
import ProductCard from './ProductCard'
import style from './products.module.css'
import { useRef, useState, useEffect, useCallback } from 'react'
import { motion, useInView } from 'framer-motion'
import { MdArrowBackIosNew, MdArrowForwardIos } from 'react-icons/md'
import axios from 'axios'

const apiLink = 'https://api.solvexng.com/api/v1/products/'
const AUTO_SPEED = 0.6 // px per frame

function OurProducts() {
  const sectionRef = useRef(null)
  const trackRef = useRef(null)
  const isInView = useInView(sectionRef, { once: true, amount: 0.1 })
  const [productData, setProductData] = useState([])
  const [errorMessage, setErrorMessage] = useState(null)
  const pausedRef = useRef(false)
  const rafRef = useRef(null)

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(apiLink)
        setProductData(response.data)
      } catch (error) {
        setErrorMessage('Unable to load products. Please try again later.')
      }
    }
    fetchData()
  }, [])

  // Seamless infinite scroll: render items twice, reset at halfway silently
  useEffect(() => {
    if (productData.length === 0) return

    const tick = () => {
      const el = trackRef.current
      if (el && !pausedRef.current) {
        el.scrollLeft += AUTO_SPEED
        // When we've scrolled past the first copy, jump back seamlessly
        if (el.scrollLeft >= el.scrollWidth / 2) {
          el.scrollLeft -= el.scrollWidth / 2
        }
      }
      rafRef.current = requestAnimationFrame(tick)
    }

    rafRef.current = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(rafRef.current)
  }, [productData])

  const pause = () => { pausedRef.current = true }
  const resume = () => { pausedRef.current = false }

  const scroll = (dir) => {
    const el = trackRef.current
    if (!el) return
    pause()
    el.scrollBy({ left: dir * 220, behavior: 'smooth' })
    setTimeout(resume, 2000)
  }

  // Doubled items for seamless loop
  const doubled = [...productData, ...productData]

  return (
    <section className={style.container} id='product' ref={sectionRef}>
      <div className={`width ${style.header}`}>
        <motion.p
          className='title'
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}>
          Our Products
        </motion.p>
        <motion.h2
          className={style.heading}
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.1 }}>
          Tools Built to <span className={style.accent}>Make Life Easier</span>
        </motion.h2>
      </div>

      {errorMessage && (
        <div className='width'>
          <p className={style.errorMsg}>{errorMessage}</p>
        </div>
      )}

      {productData.length > 0 && (
        <div
          className={style.carouselWrapper}
          onMouseEnter={pause}
          onMouseLeave={resume}>

          <button
            className={`${style.arrow} ${style.arrowLeft}`}
            onClick={() => scroll(-1)}
            aria-label='Previous'>
            <MdArrowBackIosNew />
          </button>

          <div className={style.track} ref={trackRef}>
            {doubled.map((data, index) => (
              <motion.div
                key={index}
                className={style.slide}
                aria-hidden={index >= productData.length}
                initial={{ opacity: 0, y: 30 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: index < productData.length ? 0.1 + index * 0.07 : 0 }}>
                <ProductCard
                  img={data.get_logo_absolute_url}
                  alt={data.name}
                  name={data.name}
                  url={data.url} />
              </motion.div>
            ))}
          </div>

          <button
            className={`${style.arrow} ${style.arrowRight}`}
            onClick={() => scroll(1)}
            aria-label='Next'>
            <MdArrowForwardIos />
          </button>
        </div>
      )}
    </section>
  )
}

export default OurProducts
