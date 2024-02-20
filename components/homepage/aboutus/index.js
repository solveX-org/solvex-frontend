import { FaWhatsapp } from 'react-icons/fa6'
import style from './aboutus.module.css'
import { RiPaintBrushFill } from "react-icons/ri";
import { GrCloudSoftware } from "react-icons/gr";
import Btn2 from '@/components/common/btn2';

function index() {
  return (
    <div className={style.container}>
      <div className={`${style.containerInner} width`}>
          <h1 className='title'>About us</h1>
          <div className={style.flexbox}>
            <div className={style.box1}>
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
              <p className={style.content}>At solveX, we invite you to embark on a journey of transformative experiences, where technology meets purpose and innovation meets you. Scan through our products and decide which suites your needs.</p>
              <Btn2
                style={style.btn2}
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