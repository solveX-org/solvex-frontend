'use client'; // Not strictly necessary in modern React, but can be kept for clarity

import ProductCard from './ProductCard';
import style from './products.module.css';
import { MdArrowForwardIos, MdArrowBackIosNew } from 'react-icons/md';
import { useRef, useState, useEffect } from 'react';
import axios from 'axios';

const apiLink = 'https://api.solvexng.com/api/v1/products/';

function Index() {
  const ref = useRef(null);
  const [scrollPoint, setScrollPoint] = useState(0);
  const [productData, setProductData] = useState([]);
  const [errorMessage, setErrorMessage] = useState(null);


  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(apiLink);
        setProductData(response.data);
      } catch (error) {
        setErrorMessage('Error fetching products. Please try again later.');
      }
    };

    fetchData();
  }, []); 

  const handleScroll = () => {
    ref.current.scrollLeft = 550 * (scrollPoint - 1);
    setScrollPoint(scrollPoint - 1);
  };

  const handleScrollForward = () => {
    ref.current.scrollLeft = 550 * (scrollPoint + 1);
    setScrollPoint(scrollPoint + 1);
  };

  return (
    <div className={`${style.container} width`} id="product">
      <div className="relative">
        <div className={style.innerContainer}>
          <h1 className="title">Our Products</h1>
          <div className={style.productsContainer} ref={ref}>
            {/* Check for error if there is any error */}
            {errorMessage && <div className={style.error}>{errorMessage}</div>}
            
            {/* TODO add a display it will show if product not available */}
            {/* TODO render image. Image rendering is still faulty */}
            {/* Only render elements when productData is loaded */}
            {productData.length > 0 && (
              <>
                {[...productData].map((data, index) => (
                  
                  <ProductCard
                    key={index}
                    img={data.get_logo_absolute_url}
                    alt={data.name}
                    name={data.name}
                    text={data.description}
                    url={data.url}
                  />
                ))}
                {/* Handle cases where productData is less than 4 */}
                {productData.length < 4 &&
                  [...Array(4 - productData.length)].map((_, index) => (
                    <ComingSoonCard key={index} />
                  ))}
              </>
            )}
          </div>
        </div>
        {scrollPoint !== 0 && (
          <button className={style.leftbtn} onClick={handleScroll}>
            <MdArrowBackIosNew />
          </button>
        )}
        <button className={style.rightbtn} onClick={handleScrollForward}>
          <MdArrowForwardIos />
        </button>
      </div>
    </div>
  );
}

export default Index;

export const ComingSoonCard = () => {
  return <div className={`${style.productCard} ${style.ComingSoonCard}`}>
    <h1>coming soon</h1>
  </div>;
};
