import React from 'react'
import Meta from '../components/Meta'
import BreadCrumb from '../components/BreadCrumb'

const Resetpassword = () => {
    return (
        <>
            <Meta title={'Reset Password'} />
            <BreadCrumb title='Reset Password' />
            <div className='login-wrapper py-5 home-wrapper-2'>
                <div className='container-xxl'>
                    <div className='row'>
                        <div className='col-12'>
                            <div className='auth-card'>
                                <h3 className='text-center mb-3'>Reset Password</h3>
                                <form action='' className='d-flex flex-column gap-15'>
                                    <div>
                                        <input
                                            type='password'
                                            name='password'
                                            placeholder='Password'
                                            className='form-control' />
                                    </div>
                                    <div>
                                        <input
                                            type='password'
                                            name='confpassword'
                                            placeholder='Confirm Password'
                                            className='form-control' />
                                    </div>
                                    <div>
                                        <div className='mt-3 d-flex flex-column justify-content-center gap-15 align-items-center'>
                                            <button className='button border-0' type='submit'>Submit</button>
                                        </div>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Resetpassword
