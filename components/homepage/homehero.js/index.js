'use client'
import ImageCont from '@/components/common/images'
import style from './homehero.module.css'
import Btn1 from '@/components/common/btn1'
import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'

function index() {
  return (
    <div className={`${style.container}`}>
      <div className={`${style.innerContainer} width`}>
        <div className={style.textContainer}>
          <p className={style.herotext}>Crafting</p>
          <p className={style.herotext}><span>Solutions</span> That</p>
          <p className={style.herotext}>Put You First.</p>
          <AnimatedText className={style.herotextMini} text={'Fostering a world where every product innovation enriches every aspect of living.'}/>
          
          <Btn1 
            text={'Explore'}
            href={'#product'}
            style={style.explorebtn}/>
        </div>
        <div className={style.imageConatiner}>

          <ImageCont
            src={'/images/laptoppresser.png'} 
            alt={'solveX'} 
            // width={'40rem'} 
            // height={'35rem'} 
            style={style.presser1}
            imagestyle={style.presser}/> 
            
          <ImageCont
            src={'/images/vectorroll.png'} 
            alt={'solveX'} 
            width={'4rem'} 
            height={'4rem'} 
            style={style.rope}/> 

        </div>
      </div>
    </div>
  )
}

export default index

const defaultAnimations ={
  hidden: {
    opacity: 0
  },
  visible: {
    opacity: 1
  },
  transition: {
    duration: 0.1,
  }
}

export const AnimatedText =({
  text,
  el: Wrapper = 'p',
  className,
  once
  })=>{

    const ref = useRef(null)
    const isInView = useInView(ref, { amount: 0, once: true})

    return <Wrapper className={className}>
      <span className='sr-only'>{text}</span>
      <motion.span 
        ref={ref}
        initial={'hidden'} 
        animate={isInView? 'visible': "hidden"}
        transition={{staggerChildren: 0.04}} 
        aria-hidden>

        {text.split("").map((char, index)=>
        <motion.span key={index} variants={defaultAnimations} aria-hidden>{char}</motion.span>)}
        
      </motion.span>
      
      
    </Wrapper>
  }