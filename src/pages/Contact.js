import React from 'react'
import Meta from '../components/Meta'
import BreadCrumb from '../components/BreadCrumb'
import { AiOutlineHome, AiOutlineMail } from 'react-icons/ai'
import { BiInfoCircle, BiPhoneCall } from 'react-icons/bi'
import Container from '../components/Container'
import CustomInput from '../components/CustomInput'
import { useDispatch } from 'react-redux'
import * as yup from 'yup'
import { useFormik } from 'formik'
import { createEnquiry, resetState } from '../features/contact/contactSlice'

const contactSchema = yup.object({
    name: yup.string().required("Name is required !"),
    email: yup.string().nullable().email("Email should be valid").required("Email is required !"),
    mobile: yup.string().default('').nullable().required("Mobile is required !"),
    comment: yup.string().default('').nullable().required("Comment is required !"),
})

const Contact = () => {
    const dispatch = useDispatch()

    const formik = useFormik({
        initialValues: {
            name: "",
            email: "",
            mobile: "",
            comment: "",
        },
        validationSchema: contactSchema,
        onSubmit: (values) => {
            //alert(JSON.stringify(values, null, 2))
            dispatch(createEnquiry(values))
            formik.resetForm()
            setTimeout(() => {
                dispatch(resetState())
            },200)
        }
    })

    return (
        <>
            <Meta title={'Contact Us'} />
            <BreadCrumb title='Contact Us' />
            <Container class1='contact-wrapper py-5 home-wrapper-2'>
                <div className='row'>
                    {/* Map */}
                    <div className='col-12'>
                        <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d15673.34013203891!2d106.75462030789589!3d10.862102229382172!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x317527835432dab7%3A0xd130525e26964a36!2zMzQgTGluaCBUcnVuZywgUGjGsOG7nW5nIExpbmggVHJ1bmcsIFRo4bunIMSQ4bupYywgVGjDoG5oIHBo4buRIEjhu5MgQ2jDrSBNaW5oLCBWaeG7h3QgTmFt!5e0!3m2!1svi!2s!4v1712661317983!5m2!1svi!2s" width="600" height="450" className='border-0 w-100' allowFullScreen="" loading="lazy" referrerPolicy="no-referrer-when-downgrade"></iframe>
                    </div>

                    {/* Input */}
                    <div className='col-12 mt-5'>
                        <div className='contact-inner-wrapper d-flex justify-content-between'>
                            <div>
                                <h3 className='contact-title mb-4'>Contact</h3>
                                <form action='' onSubmit={formik.handleSubmit} className='d-flex flex-column gap-15'>

                                    {/* Name */}
                                    <CustomInput
                                        type='text'
                                        placeholder='Name'
                                        name="name"
                                        value={formik.values.name}
                                        onChange={formik.handleChange('name')}
                                        onBlur={formik.handleBlur("name")} />
                                    <div className='error'>
                                        {formik.touched.name && formik.errors.name}
                                    </div>

                                    {/* Email */}
                                    <CustomInput
                                        type='email'
                                        placeholder='Email'
                                        name="email"
                                        value={formik.values.email}
                                        onChange={formik.handleChange('email')}
                                        onBlur={formik.handleBlur("email")} />
                                    <div className='error'>
                                        {formik.touched.email && formik.errors.email}
                                    </div>

                                    {/* Mobile */}
                                    <CustomInput
                                        type='tel'
                                        placeholder='Mobile'
                                        name="mobile"
                                        value={formik.values.mobile}
                                        onChange={formik.handleChange('mobile')}
                                        onBlur={formik.handleBlur("mobile")} />
                                    <div className='error'>
                                        {formik.touched.mobile && formik.errors.mobile}
                                    </div>

                                    {/* Comment */}
                                    <div>
                                        <textarea
                                            className='w-100 form-control'
                                            id=''
                                            cols='30'
                                            rows='4' placeholder='Comment'
                                            name="comment"
                                            value={formik.values.comment}
                                            onChange={formik.handleChange('comment')}
                                            onBlur={formik.handleBlur("comment")}></textarea>
                                        <div className='error'>
                                            {formik.touched.comment && formik.errors.comment}
                                        </div>
                                    </div>

                                    {/* Button */}
                                    <div>
                                        <button className='button border-0'>Submit</button>
                                    </div>
                                </form>
                            </div>
                            <div>
                                <h3 className='contact-title mb-4'>Get In Touch With Us</h3>
                                <div>
                                    <ul className='ps-0'>
                                        <li className='mb-3 d-flex gap-15 align-items-center'>
                                            <AiOutlineHome className='fs-5' />
                                            <address className='mb-0'>34 Linh Trung Street, Thu Duc City, Ho Chi Minh City</address>
                                        </li>
                                        <li className='mb-3 d-flex gap-15 align-items-center'>
                                            <BiPhoneCall className='fs-5' />
                                            <a href='tel: +84 399195099'>+84 399 195 099</a>
                                        </li>
                                        <li className='mb-3 d-flex gap-15 align-items-center'>
                                            <AiOutlineMail className='fs-5' />
                                            <a href='mailto:an.ngtruc2002@gmail.com'>an.ngtruc2002@gmail.com</a>
                                        </li>
                                        <li className='mb-3 d-flex gap-15 align-items-center'>
                                            <BiInfoCircle className='fs-5' />
                                            <p className='mb-0'>Monday - Friday 8 AM - 6 PM</p>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </Container>
        </>
    )
}

export default Contact
