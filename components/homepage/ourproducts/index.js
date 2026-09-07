'use client'
import ProductCard from './ProductCard'
import style from './products.module.css'
import { useRef, useState, useEffect } from 'react'
import { motion, useInView } from 'framer-motion'
import axios from 'axios'

const apiLink = 'https://api.solvexng.com/api/v1/products/'

function OurProducts() {
  const sectionRef = useRef(null)
  const isInView = useInView(sectionRef, { once: true, amount: 0.1 })
  const [productData, setProductData] = useState([])
  const [errorMessage, setErrorMessage] = useState(null)

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
        <div className={style.marqueeOuter}>
          <div className={style.marqueeTrack}>
            {/* Render twice — CSS animation moves -50% so only one copy is visible at a time */}
            {[...productData, ...productData].map((data, index) => (
              <div
                key={index}
                className={style.slide}
                aria-hidden={index >= productData.length}>
                <ProductCard
                  img={data.get_logo_absolute_url}
                  alt={data.name}
                  name={data.name}
                  url={data.url} />
              </div>
            ))}
          </div>
        </div>
      )}
    </section>
  )
}

export default OurProducts
