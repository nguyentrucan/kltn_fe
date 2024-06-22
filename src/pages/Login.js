import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import Meta from '../components/Meta'
import BreadCrumb from '../components/BreadCrumb'
import { Link, useNavigate } from 'react-router-dom'
import Container from '../components/Container'
import CustomInput from '../components/CustomInput'
import { useFormik } from 'formik'
import * as yup from "yup"
import { loginUser } from '../features/user/userSlice'

const loginSchema = yup.object({
    email: yup.string().email("Email should be valid").required("Email is required !"),
    password: yup.string().required("Password is required !"),
})


const Login = () => {
    const authState = useSelector(state => state.auth)
    const navigate = useNavigate()
    const dispatch = useDispatch();
    const formik = useFormik({
        initialValues: {
            email: "",
            password: "",
        },
        validationSchema: loginSchema,
        onSubmit: (values) => {
            //alert(JSON.stringify(values))
            dispatch(loginUser(values))
            if (authState.isSuccess) {
                navigate("/")
            }
        }
    })

    return (
        <>
            <Meta title={'Login'} />
            <BreadCrumb title='Login' />
            <Container class1='login-wrapper py-5 home-wrapper-2'>
                <div className='row'>
                    <div className='col-12'>
                        <div className='auth-card'>
                            <h3 className='text-center mb-3'>Login</h3>
                            <form action='' onSubmit={formik.handleSubmit} className='d-flex flex-column gap-15'>
                                {/* Email */}
                                <CustomInput
                                    type='email'
                                    name='email'
                                    placeholder='Email'
                                    value={formik.values.email}
                                    onChange={formik.handleChange("email")}
                                    onBlur={formik.handleBlur("email")} />
                                <div className='error'>
                                    {formik.touched.email && formik.errors.email}
                                </div>

                                {/* Password */}
                                <CustomInput
                                    className='mt-1'
                                    type='password'
                                    name='password'
                                    placeholder='Password'
                                    value={formik.values.password}
                                    onChange={formik.handleChange("password")}
                                    onBlur={formik.handleBlur("password")} />
                                <div className='error'>
                                    {formik.touched.password && formik.errors.password}
                                </div>

                                {/* Button */}
                                <div>
                                    <Link to='/forgot-password'>Fogot Password ?</Link>
                                    <div className='mt-3 d-flex justify-content-center gap-15 align-items-center'>
                                        {/* Button Login */}
                                        <button className='button border-0' type='submit'>Login</button>

                                        {/* Button Signup */}
                                        <Link to='/signup' className='button signup'>Signup</Link>
                                    </div>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </Container>
        </>
    )
}

export default Login
