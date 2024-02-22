import ImageCont from '@/components/common/images'
import style from './contact.module.css'
// once he comes through with the url where you are to send the form inputs collect with formik and send


function index() {
  return (
    <div className={style.container}>
        <div className={`${style.innercontainer} width`}>
          <h1 className='title'>Contact us</h1>
          <div className={style.main}>
            <ImageCont
              src={'/images/woman.png'} 
              alt={'solveX'} 
              style={style.image}/> 

              <form className={style.form}>
                <div className={style.name}>
                  <div className={`${style.label}`}>
                    <label htmlFor={'inputfield'} className={style.fname}>First Name</label>
                    <input id={'inputfield'} className={style.fname_input} type='text'/>
                  </div>
                  <div className={`${style.label}`}>
                    <label htmlFor={'inputfield1'} className={style.lname}>Last Name</label>
                    <input id={'inputfield1'} className={style.lname_input} type='text'/>
                  </div>
                </div>
                <div className={`${style.label2}`}>
                  <label htmlFor={'inputfield2'} className={style.fname}>Email</label>
                  <input id={'inputfield2'} className={style.email_input} type='email' />
                </div>

                <div className={`${style.label3}`}>
                  <label htmlFor={'inputfield3'} className={style.fname}>Message</label>
                  <textarea id={'inputfield3'} className={`${style.email_input} ${style.emailthing}`} type='email' placeholder='Write your message here'/>
                </div>

                <input className={style.submit} type='submit' value={'Send'}/>
              </form>
          </div>
        </div>
    </div>
  )
}

export default index