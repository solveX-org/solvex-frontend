import ImageCont from '@/components/common/images'
import style from './products.module.css'
import { MdArrowForwardIos } from "react-icons/md";
import Link from 'next/link';

function ProductCard({img, alt, name, text, url}) {
  return (
    <div className={`${style.productCard} ${style.ActiveCard}`}>
        <div className={style.imageCint}>
            <div className={style.image}>
                <ImageCont
                    src={img}
                    alt={alt}
                    style={style.image}/>
                <p></p>
            </div>
        </div>
        <p className={`${style.botton} ${style.name}`}>{name}</p>
        <div className={style.text}>
            <p>{text}</p>
            <Link href={url} className={`${style.botton} ${style.botton1}`}><MdArrowForwardIos/></Link>
        </div>
    </div>
  )
}

export default ProductCard