'use client'
import ImageCont from '@/components/common/images'
import * as Yup from 'yup';
import style from './contact.module.css'
import { Formik, Form, Field, ErrorMessage } from 'formik';
import axios from 'axios';
import { useState } from 'react';
const apiroute= 'api.solvexng.com/api/v1/contact-us/'
// once he comes through with the url where you are to send the form inputs collect with formik and send


function Index() {
  const [isSent, setIsSent] = useState(false);
  const [error, setError] = useState('');

  const initialValues = {
    firstname: '',
    lastname: '',
    email: '',
    message: ''
  };

  const validationSchema = Yup.object().shape({
    firstname: Yup.string().required('Firstname is required'),
    lastname: Yup.string().required('Lastname is required'),
    email: Yup.string().email('Invalid email').required('Email is required'),
    message: Yup.string().required('Message is required')
  });

  const handleSubmit = async (values, actions) => {
    try {
        await axios.post(apiroute, values);
        setIsSent(true);
        actions.resetForm();
    } catch (error) {
        setError('Failed to send message, refresh you browser and try again');
    }
  };

  return (
    <div className={style.container} id='contact'>
        <div className={`${style.innercontainer} width`}>
          <h1 className='title'>Contact us</h1>
          <div className={style.main}>
            <ImageCont
              src={'/images/woman.png'} 
              alt={'solveX'} 
              style={style.image}/> 
              <Formik
                initialValues={initialValues}
                validationSchema={validationSchema}
                onSubmit={handleSubmit}
            >
                {({ isSubmitting }) => (
                    
                      <Form className={style.form}>
                        <div className={style.name}>
                          <div className={`${style.label}`}>
                            <label htmlFor={'inputfield'} className={style.fname}>First Name</label>
                            <Field id={'inputfield'} className={style.fname_input} type='text' name="firstname" />
                            <ErrorMessage name="firstname" component="div" className="error" />
                          </div>

                          <div className={`${style.label}`}>
                            <label htmlFor={'inputfield1'} className={style.lname}>Last Name</label>
                            <Field id={'inputfield1'} className={style.lname_input} type='text' name="lastname" />
                            <ErrorMessage name="lastname" component="div" className="error" />
                          </div>
                        </div>

                        <div className={`${style.label2}`}>
                          <label htmlFor={'inputfield2'} className={style.fname}>Email</label>
                          <Field id={'inputfield2'} className={style.email_input} type="email" name="email" />
                          <ErrorMessage name="email" component="div" className="error" />
                        </div>

                        <div className={`${style.label3}`}>
                          <label htmlFor={'inputfield3'} className={style.fname}>Message</label>
                          <Field id={'inputfield3'} className={`${style.email_input} ${style.emailthing}`}  placeholder='Write your message here' as="textarea" name="message" />
                          <ErrorMessage name="message" component="div" className="error" />
                        </div>

                        <input className={style.submit} type='submit' disabled={isSubmitting} value={'Send'}/>
                        {isSent && <div className='text-[0.7rem] w-full text-center pt-1 '>Message sent successfully!, thanks for your feedback.</div>}
                        {error && <div className="error">{error}</div>}
                      </Form>
                )}
            </Formik>
          </div>
        </div>
    </div>
  )
}

export default Index



