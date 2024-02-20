'use client'
import ProductCard from './ProductCard'
import style from './products.module.css'
import { MdArrowForwardIos } from "react-icons/md";
import { MdArrowBackIosNew } from "react-icons/md";
import { useRef, useState } from 'react' 
//add a carousel slide to this and more importantly a scroll tab showing the length of scroll one has to do
//the left scroll is still not working

function Index() {
  const ref = useRef(null)
  const [scrollPoint, setscrollPoint] = useState(0)

  const renderProducts = (products)=>{
    if (products?.length > 4) 
    return products.map((data, index)=><ProductCard
      key={index}
      img={data.img}
      alt={data.alt}
      name={data.name}
      text={data.text}
      url={data.url} />) 

    return [...products.map((data, index)=><ProductCard
      key={index}
      img={data.img}
      alt={data.alt}
      name={data.name}
      text={data.text}
      url={data.url} />) 
      ,
      ...[1,2,3].map((data, index)=><ComingSoonCard key={index}/>)]
    
  }

  const handleScroll =()=>{
    ref.current.scrollLeft = 550*(scrollPoint-1);
    setscrollPoint(scrollPoint - 1)
  }
  const handleScrollforward =()=>{
    ref.current.scrollLeft = 550*(scrollPoint+1);
    setscrollPoint(scrollPoint + 1)
  }
  

  return (
    <div className={`${style.container} width`}>
        <div className='relative'>
          <div className={style.inneContainer}>
            <h1 className='title'> Our Products</h1>
            <div className={style.productsContainer} ref={ref}> 
              {renderProducts(productData)}
            </div>
          </div>
          {scrollPoint != 0 && <button className={style.leftbtn} onClick={()=>handleScroll()}><MdArrowBackIosNew/></button>}
          <button className={style.rightbtn} onClick={()=>handleScrollforward()}><MdArrowForwardIos/></button>
        </div>

        
    </div>
  )
}

export default Index


export const ComingSoonCard = () =>{

  return <div className={`${style.productCard} ${style.ComingSoonCard}`}>
    <h1>coming soon</h1>
  </div>
}

const productData = [
  // The data displayed here is to be fecthed from our database for our products
  // once the database is configured, we can start working on the fetchinf and appropriate rendering
  {
    img: '/images/gethired.png',
    alt: 'gethired',
    name: 'GetHired',
    text: 'Effortlessly connect job seekers with employment opportunities or employers with top talent, all with just one click.',
    url: '/'
  }
]