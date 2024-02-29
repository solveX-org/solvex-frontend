'use client'
import { useEffect, useState } from 'react'
import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'
import { FaWhatsapp } from 'react-icons/fa6'
import style from './aboutus.module.css'
import { RiPaintBrushFill } from "react-icons/ri";
import { GrCloudSoftware } from "react-icons/gr";
import Btn2 from '@/components/common/btn2';

function index() {

   
  return (
    <div className={style.container} id='about'>
      <div className={`${style.containerInner} width`}>
          <h1 className='title'>About us</h1>
          <div className={style.flexbox}>
            <div className={`${style.box1} ${style.box1active}`}>
              <AboutCard
                title={'Solution Architect'}
                icon={<RiPaintBrushFill/>} 
                p1={'Experience the power of strategic architecture '} 
                p2={'without the overhead. Your solution,Our expertise.'}
                p3={'Experience the power of strategic architecture without the overhead. Your solution,Our expertise.'}/>
              <AboutCard
                title={'Software Development'}
                icon={<GrCloudSoftware/>} 
                p1={'Experience cutting-edge technology, all delivered with the '} 
                p2={'commitment to exceed your expectations.'}
                p3={'Experience cutting-edge technology, all delivered with the commitment to exceed your expectations.'}/>
            </div>
            <div className={style.box2}>
              <h1 className={style.header}>Making Living Easy; <span>One </span></h1>
              <h1 className={style.header2}> Product At A Time</h1>
              <AnimatedText className={style.content} text={'At solveX, we invite you to embark on a journey of transformative experiences, where technology meets purpose and innovation meets you. Scan through our products and decide which suites your needs.'}/>
              <Btn2
                style={style.btn2}
                href={'#product'}
                name={'View Products'}/>
            </div>
          </div>
      </div>
    </div>
  )
}

export default index

export const AboutCard = ({title, icon, p1, p2, p3}) =>{
  return(<div className={style.aboutCard}>
    <h1><span>{icon}</span> {title}</h1>
    <span>
      <p className={`${style.aboutText} lg`}>{p1}</p>
      <p className={`${style.aboutText} lg`}>{p2}</p>
      <p className={`${style.aboutText} md`}>{p3}</p>
    </span>
  </div>)
}

const defaultAnimations ={
  hidden: {
    opacity: 0
  },
  visible: {
    opacity: 1
  },
  transition: {
    duration: 0.01,
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
        transition={{staggerChildren: 0.02}} 
        aria-hidden>

        {text.split("").map((char, index)=>
        <motion.span key={index} variants={defaultAnimations} aria-hidden>{char}</motion.span>)}
        
      </motion.span>
      
      
    </Wrapper>
  }