'use client'
import ProductCard from './ProductCard'
import style from './products.module.css'
import { MdArrowForwardIos } from "react-icons/md";
import { MdArrowBackIosNew } from "react-icons/md";
import { useRef, useState } from 'react';
import axios from 'axios';
import { FaFacebook } from 'react-icons/fa6';
const apiLink = 'api.solvexng.com/api/v1/products/'

function Index() {
  const ref = useRef(null)
  const [scrollPoint, setscrollPoint] = useState(0)
  const [productData, setproductData] = useState([])

  const getData = async () => {
    try {
      const response = await axios.get(apiLink);
      // am receiving a cores error from this pint of fetching data, I hope that logging into the resourse will allow it be fetched
      setproductData(response.message)
    } catch (error) {
      const errormsg= "Error fetching products, refresh your browser to try again"
      
    }
  };
  getData()

  const handleScroll =()=>{
    ref.current.scrollLeft = 550*(scrollPoint-1);
    setscrollPoint(scrollPoint - 1)
  }
  const handleScrollforward =()=>{
    ref.current.scrollLeft = 550*(scrollPoint+1);
    setscrollPoint(scrollPoint + 1)
  }

  console.log(productData)

  return (
    <div className={`${style.container} width`} id='product'>
        <div className='relative'>
          <div className={style.inneContainer}>
            <h1 className='title'> Our Products</h1>
            <div className={style.productsContainer} ref={ref}> 
              {!productData.length && [...[1,2,3,4]].map((data, index)=><ComingSoonCard key={index}/>)}
              {productData.length < 4 > 0 
                && [...[...productData.map((data, index)=><ProductCard
                  key={index+4}
                  img={data.logo}
                  alt={data.name}
                  name={data.name}
                  text={data.description}
                  url={data.url} />) 
                  ,
                  ...[...new Array(4-productData.length)].map((data, index)=><ComingSoonCard key={index}/>)]]
              }
              {productData.length > 3 
                && productData.map((data, index)=><ProductCard
                  key={index}
                  img={data.logo}
                  alt={data.name}
                  name={data.name}
                  text={data.description}
                  url={data.url} />) }

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





