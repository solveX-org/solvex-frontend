'use client'
import ProductCard from './ProductCard'
import style from './products.module.css'
import { useRef, useState, useEffect } from 'react'
import { motion, useInView } from 'framer-motion'
import { MdArrowBackIosNew, MdArrowForwardIos } from 'react-icons/md'
import axios from 'axios'

const apiLink = 'https://api.solvexng.com/api/v1/products/'

function OurProducts() {
  const sectionRef = useRef(null)
  const trackRef = useRef(null)
  const isInView = useInView(sectionRef, { once: true, amount: 0.1 })
  const [productData, setProductData] = useState([])
  const [errorMessage, setErrorMessage] = useState(null)
  const [activeIdx, setActiveIdx] = useState(0)

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

  const scrollTo = (idx) => {
    if (!trackRef.current) return
    const card = trackRef.current.children[idx]
    if (!card) return
    card.scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'start' })
    setActiveIdx(idx)
  }

  const prev = () => scrollTo(Math.max(0, activeIdx - 1))
  const next = () => scrollTo(Math.min(productData.length - 1, activeIdx + 1))

  return (
    <section className={style.container} id='product' ref={sectionRef}>
      <div className={`width ${style.header}`}>
        <div className={style.headerLeft}>
          <motion.p
            className='title'
            style={{ textAlign: 'left' }}
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

        {/* Nav arrows — only show when more than 1 product */}
        {productData.length > 1 && (
          <motion.div
            className={style.navBtns}
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : {}}
            transition={{ duration: 0.5, delay: 0.3 }}>
            <button
              className={style.navBtn}
              onClick={prev}
              disabled={activeIdx === 0}
              aria-label='Previous product'>
              <MdArrowBackIosNew />
            </button>
            <button
              className={style.navBtn}
              onClick={next}
              disabled={activeIdx === productData.length - 1}
              aria-label='Next product'>
              <MdArrowForwardIos />
            </button>
          </motion.div>
        )}
      </div>

      {errorMessage && (
        <div className='width'>
          <p className={style.errorMsg}>{errorMessage}</p>
        </div>
      )}

      {productData.length > 0 && (
        <>
          {/* Carousel track */}
          <div className={style.carouselOuter}>
            <div className={`${style.carouselPadding} width`}>
              <div className={style.track} ref={trackRef}>
                {productData.map((data, index) => (
                  <motion.div
                    key={index}
                    className={style.slide}
                    initial={{ opacity: 0, y: 40 }}
                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.6, delay: 0.2 + index * 0.12 }}>
                    <ProductCard
                      img={data.get_logo_absolute_url}
                      alt={data.name}
                      name={data.name}
                      text={data.description}
                      url={data.url} />
                  </motion.div>
                ))}
              </div>
            </div>
          </div>

          {/* Dot indicators */}
          {productData.length > 1 && (
            <div className={`width ${style.dots}`}>
              {productData.map((_, i) => (
                <button
                  key={i}
                  className={`${style.dot} ${i === activeIdx ? style.dotActive : ''}`}
                  onClick={() => scrollTo(i)}
                  aria-label={`Go to product ${i + 1}`} />
              ))}
            </div>
          )}
        </>
      )}
    </section>
  )
}

export default OurProducts
