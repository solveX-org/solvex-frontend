import ImageCont from '@/components/common/images'
import style from './homehero.module.css'
import Btn1 from '@/components/common/btn1'

function index() {
  return (
    <div className={`${style.container}`}>
      <div className={`${style.innerContainer} width`}>
        <div className={style.textContainer}>
          <p className={style.herotext}>Crafting</p>
          <p className={style.herotext}><span>Solutions</span> That</p>
          <p className={style.herotext}>Put You First.</p>
          <p className={style.herotextMini}>Fostering a world where every product innovation enriches every aspect of living.</p>
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