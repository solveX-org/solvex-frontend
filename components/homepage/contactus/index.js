'use client'
import * as Yup from 'yup'
import style from './contact.module.css'
import { Formik, Form, Field, ErrorMessage } from 'formik'
import axios from 'axios'
import { useState, useRef } from 'react'
import { motion, useInView } from 'framer-motion'

const apiroute = 'https://api.solvexng.com/api/v1/contact-us/'

function Reveal({ children, delay = 0, className }) {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, amount: 0.2 })
  return (
    <motion.div
      ref={ref}
      className={className}
      initial={{ opacity: 0, y: 30 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay, ease: [0.25, 0.46, 0.45, 0.94] }}>
      {children}
    </motion.div>
  )
}

function ContactUs() {
  const [isSent, setIsSent] = useState(false)
  const [error, setError] = useState('')

  const initialValues = { first_name: '', last_name: '', email: '', message: '' }

  const validationSchema = Yup.object().shape({
    first_name: Yup.string().required('First name is required'),
    last_name: Yup.string().required('Last name is required'),
    email: Yup.string().email('Invalid email').required('Email is required'),
    message: Yup.string().required('Message is required'),
  })

  const handleSubmit = async (values, actions) => {
    try {
      await axios.post(apiroute, values)
      setIsSent(true)
      actions.resetForm()
    } catch (err) {
      setError('Failed to send message. Please refresh and try again.')
    }
  }

  return (
    <section className={style.container} id='contact'>
      <div className={`${style.inner} width`}>
        {/* Left editorial column */}
        <Reveal className={style.left}>
          <p className={style.sectionLabel}>Contact us</p>
          <h2 className={style.heading}>
            Got a question?<br />
            <span className={style.orange}>Let&apos;s talk.</span>
          </h2>
          <p className={style.subtext}>
            We&apos;re here to help you find the right solution. Reach out and we&apos;ll get back to you as soon as possible.
          </p>
          <div className={style.infoCard}>
            <span className={style.infoLabel}>Response time</span>
            <span className={style.infoValue}>Within 24 hours</span>
          </div>
        </Reveal>

        {/* Right form column */}
        <Reveal delay={0.15} className={style.right}>
          <div className={style.formCard}>
            <Formik
              initialValues={initialValues}
              validationSchema={validationSchema}
              onSubmit={handleSubmit}>
              {({ isSubmitting }) => (
                <Form className={style.form}>
                  <div className={style.row}>
                    <div className={style.field}>
                      <label className={style.label}>First Name</label>
                      <Field className={style.input} type='text' name='first_name' placeholder='John' />
                      <ErrorMessage name='first_name' component='div' className='error' />
                    </div>
                    <div className={style.field}>
                      <label className={style.label}>Last Name</label>
                      <Field className={style.input} type='text' name='last_name' placeholder='Doe' />
                      <ErrorMessage name='last_name' component='div' className='error' />
                    </div>
                  </div>

                  <div className={style.field}>
                    <label className={style.label}>Email</label>
                    <Field className={style.input} type='email' name='email' placeholder='john@example.com' />
                    <ErrorMessage name='email' component='div' className='error' />
                  </div>

                  <div className={style.field}>
                    <label className={style.label}>Message</label>
                    <Field
                      className={`${style.input} ${style.textarea}`}
                      as='textarea'
                      name='message'
                      placeholder='Tell us how we can help you...' />
                    <ErrorMessage name='message' component='div' className='error' />
                  </div>

                  <button
                    className={style.submit}
                    type='submit'
                    disabled={isSubmitting}>
                    {isSubmitting ? 'Sending...' : 'Send Message'}
                    <span className={style.submitArrow}>→</span>
                  </button>

                  {isSent && (
                    <motion.p
                      className={style.successMsg}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}>
                      Message sent! Thanks for reaching out.
                    </motion.p>
                  )}
                  {error && <p className='error'>{error}</p>}
                </Form>
              )}
            </Formik>
          </div>
        </Reveal>
      </div>
    </section>
  )
}

export default ContactUs
