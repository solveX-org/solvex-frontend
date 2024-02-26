'use client'
import ProductCard from './ProductCard'
import style from './products.module.css'
import { MdArrowForwardIos } from "react-icons/md";
import { MdArrowBackIosNew } from "react-icons/md";
import { useRef, useState } from 'react';
import axios from 'axios';
const apiLink = 'https://www.solvexng.com/api/v1/products/'

function Index() {
  const ref = useRef(null)
  const [scrollPoint, setscrollPoint] = useState(0)
  const [productData, setproductData] = useState(
    [
      {
      logo: '/images/gethired.png',
      name: 'GetHired',
      description: 'Effortlessly connect job seekers with employment opportunities or employers with top talent, all with just one click.',
      url: '/'
    }
  ]
  )


  const getData = async () => {
    try {
      const response = await axios.get(apiLink);
      setproductData(response.message)
    } catch (error) {
      const errormsg= "Error fetching products, refresh your browser to try again"
      
    }
  };
  getData()

  const renderProducts = (products)=>{
    if (products?.length > 4) {
      return products.map((data, index)=><ProductCard
        key={index}
        img={data.logo}
        alt={data.name}
        name={data.name}
        text={data.description}
        url={data.url} />) }
    else if (products?.length > 0) {
      return [...products.map((data, index)=><ProductCard
        key={index+4}
        img={data.logo}
        alt={data.name}
        name={data.name}
        text={data.description}
        url={data.url} />) 
        ,
        ...[1,2,3].map((data, index)=><ComingSoonCard key={index}/>)]
    }
    else {
      return({...[1,2,3,4].map((data, index)=><ComingSoonCard key={index}/>)})
    }
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
    <div className={`${style.container} width`} id='product'>
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