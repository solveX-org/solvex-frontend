import ProductCard from './ProductCard'
import style from './products.module.css'
//add a carousel slide to this and more importantly a scroll tab showing the length of scroll one has to do

function index() {

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
      ...[1,2,3].map(data=><ComingSoonCard/>)]
    
  }
  console.log()

  return (
    <div className={`${style.container} width`}>
        <div className={style.inneContainer}>
          <h1 className='title'> Our Products</h1>
          <div className={style.productsContainer}> 
            {renderProducts(productData)}
          </div>
        </div>
    </div>
  )
}

export default index


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