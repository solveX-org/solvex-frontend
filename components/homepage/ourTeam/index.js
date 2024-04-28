"use client"
import Image from 'next/image'
import style from './style.module.css'
import { useInView } from 'react-intersection-observer';
import { motion } from 'framer-motion';
import { RiVerifiedBadgeFill } from "react-icons/ri";
import { MdOutlineKeyboardArrowDown } from "react-icons/md";
import { BiMessageRounded } from "react-icons/bi";
import { AiOutlineRetweet } from "react-icons/ai";
import { CiHeart } from "react-icons/ci";
import { LuUpload } from "react-icons/lu";
// import CardCOmponent from './card';


function Index() {
    const renderCard = CardData.map((data, index)=><Card
        key={index}
        name={data?.name} 
        imgBg={data?.imgBg}
        imgSrc={data?.imgSrc} 
        quote={data?.quote} 
        role={data?.role}/>)

  return (
    <div className={style.mainContainer}>
        <div className={`${style.container} width`}>
            <h1 className='title pb-[4rem]'>Quotes from our team members</h1>
            <div className={style.cardContainer}>
                {renderCard}
            </div>
        </div>
    </div>
  )
}

export default Index

export const Card = ({name, imgSrc, quote, role, imgBg})=>{

    const { ref, inView } = useInView({
        triggerOnce: true, 
        threshold: 0.2, 
      });

    return (
    <div ref={ref} className={style.card2}>
        <motion.div 
            initial={{translateY: '100%', opacity: 0}} 
            animate={inView? {translateY: 0, opacity: 1}: ""} 
            transition={{ duration: 0.5, ease: "linear" }}
            whileHover={{ scale: 0.9, transition: { duration: 0.1 } }}
            className={style.card} >
            <div className={style.imageContainer}>
                <Image 
                    src={imgSrc} 
                    alt={'alt'} 
                    layout="responsive" 
                    width={200} height={150} />
            </div>
            <div className={'flex justify-between py-[1rem]'}>
                <div className={style.miniHeader}>
                    <div 
                        className={style.miniImageContainer} 
                        style={{
                            backgroundImage: imgBg, 
                            backgroundPosition: "center",
                            backgroundSize: 'cover'
                            }}>
                    </div>
                    <div className={style.demographics}>
                        <div className={style.nameCOntainer}>
                            <p className={style.name}>{name}</p>
                            <RiVerifiedBadgeFill className={style.verified}/>
                        </div>
                        <p className={style.role}>{role}</p>
                    </div>
                </div>
                <MdOutlineKeyboardArrowDown className={style.icon}/>
            </div>
            <div className={style.box2}>
                <p className={style.quote}>{quote}</p>
                <p className={style.quoteLinks}>#reminder #quotes #inspiration</p>
                <hr className={style.line}/>
                <div className={style.flexBox}>
                    <span>
                        <BiMessageRounded />
                        <p>215</p>
                    </span>
                    <span>
                        <AiOutlineRetweet />
                        <p>356</p>
                    </span>
                    <span>
                        <CiHeart />
                        <p>885</p>
                    </span>
                    <LuUpload />
                </div>
            </div>
        </motion.div>
    </div>
    )
}



const CardData = [
    {
        name: 'Kene',
        imgBg: 'url("/images/kene.png")',
        imgSrc: '/images/kene.png',
        quote: "Just do it",
        role: "Back-end Developer"
    },
    {
        name: 'Chibuzor',
        imgSrc: '/images/chibuzor.png',
        imgBg: 'url("/images/chibuzor.png")',
        quote: "In this world whenever there is light, there are always shadows. As long as there is a concept of victors, the vanquished will also exist. The selfish desire for peace gives rise to war. And hatred is born in order  to protect love",
        role: "Front-end developer"
    },
    {
        name: 'Mercy',
        imgSrc: '/images/mercy.png',
        imgBg: 'url("/images/mercy.png")',
        quote: "“I’ve learnt that people will forget what you said, people will forget what you did, but people will never forget how you made them feel’ -Maya Angelou",
        role: "HR"
    },
    {
        name: 'Adaugo',
        imgSrc: '/images/adaugo.png',
        imgBg: 'url("/images/adaugo.png")',
        quote: "The rarerest quality of humans is consistency",
        role: "UI/UX Designer"
    },
    {
        name: 'Adaoma',
        imgSrc: '/images/Adaoma.png',
        imgBg: 'url("/images/Adaoma.png")',
        quote: "Be like a pineapple- stand tall, wear a crown and be sweet on the inside",
        role: "Product manager"
    },
    {
        name: 'Uloma',
        imgBg: 'url("/images/uloma.png")',
        imgSrc: '/images/uloma.png',
        quote: "Be kind, for everyone you meet is fighting a battle you know nothing about",
        role: "Social media manager"
    },
    {
        name: 'Christian',
        imgBg: 'url("/images/christian.png")',
        imgSrc: '/images/christian.png',
        quote: "Strength doesn’t come from what you can do. It comes from overcoming the things you once thought you couldn’t",
        role: "UI/UX designer"
    },
    {
        name: 'Chinedu',
        imgBg: 'url("/images/chinedu.png")',
        imgSrc: '/images/chinedu.png',
        quote: "If it can be done today, why wait till tomorrow",
        role: "Front-end developer"
    },
    {
        name: 'George',
        imgSrc: '/images/george.png',
        imgBg: 'url("/images/george.png")',
        quote: "Remember why you started",
        role: "Back-end developer"
    }
]
