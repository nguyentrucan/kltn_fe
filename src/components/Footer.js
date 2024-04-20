import React from 'react'
import { Link } from 'react-router-dom'
import { BsFacebook, BsGithub, BsLinkedin } from "react-icons/bs";
import newsletter from '../images/newsletter.png'

const Footer = () => {
    return (
        <>
            <footer className='py-4'>
                <div className='container-xxl'>
                    <div className='row align-items-center'>
                        <div className='col-5'>
                            <div className='footer-top-data d-flex gap-30 align-items-center'>
                                <img src={newsletter} alt='newsletter' />
                                <h2 className='mb-0 text-white'>Sign Up for Newsletter</h2>
                            </div>
                        </div>
                        <div className='col-7'>
                            <div className="input-group">
                                <input type="text" className="form-control py-1" placeholder="Your Email Address" aria-label="Your Email Address" aria-describedby="basic-addon2" />
                                <span className="input-group-text p-2" id="basic-addon2">
                                    Subcribe
                                </span>
                            </div>
                        </div>
                    </div>
                </div>
            </footer>
            <footer className='py-4'>
                <div className='container-xxl'>
                    <div className='row'>
                        <div className='col-4'>
                            <h4 className='text-white mb-4'>Contact Us</h4>
                            <div>
                                <address className='text-white fs-6'>
                                    34 Linh Trung Street, <br /> Thu Duc City, Ho Chi Minh City <br />
                                </address>
                                <a href='tel:+84 399195099' className='text-white mt-3 d-block mb-1'>
                                    +84 399 195 099
                                </a>
                                <a href='mailto:nguyenan102az@gmail.com' className='mt-2 d-block mb-0 text-white '>
                                    nguyenan102az@gmail.com
                                </a>
                                <div className='social_icons d-flex align-items-center gap-30 mt-4'>
                                    <a className='text-white' href='https://www.linkedin.com/in/an-nguy%E1%BB%85n-tr%C3%BAc-b301a22bb/'>
                                        <BsLinkedin className='fs-4' />
                                    </a>
                                    <a className='text-white' href='https://github.com/nguyentrucan'>
                                        <BsGithub className='fs-4' />
                                    </a>
                                    <a className='text-white' href='https://www.facebook.com/ntan110802/'>
                                        <BsFacebook className='fs-4' />
                                    </a>
                                </div>
                            </div>
                        </div>
                        <div className='col-3'>
                            <h4 className='text-white mb-4'>Information</h4>
                            <div className='footer-links d-flex flex-column'>
                                <Link to='/privacy-policy' className='text-white py-2 mb-1'>Privacy Policy</Link>
                                <Link to='/refund-policy' className='text-white py-2 mb-1'>Refund Policy</Link>
                                <Link to='/shipping-policy' className='text-white py-2 mb-1'>Shipping Policy</Link>
                                <Link to='/term-conditions' className='text-white py-2 mb-1'>Terms & Conditions</Link>
                                <Link to='/blogs' className='text-white py-2 mb-1'>Blogs</Link>
                            </div>
                        </div>
                        <div className='col-3'>
                            <h4 className='text-white mb-4'>Account</h4>
                            <div className='footer-links d-flex flex-column'>
                                <Link className='text-white py-2 mb-1'>About Us</Link>
                                <Link className='text-white py-2 mb-1'>Faq</Link>
                                <Link className='text-white py-2 mb-1'>Contact</Link>
                            </div>
                        </div>
                        <div className='col-2'>
                            <h4 className='text-white mb-4'>Quick Links</h4>
                            <div className='footer-links d-flex flex-column'>
                                <Link className='text-white py-2 mb-1'>Laptops</Link>
                                <Link className='text-white py-2 mb-1'>Headphones</Link>
                                <Link className='text-white py-2 mb-1'>Tablets</Link>
                                <Link className='text-white py-2 mb-1'>Watchs</Link>
                            </div>
                        </div>
                    </div>
                </div>
            </footer>
            <footer className='py-4'>
                <div className='container-xxl'>
                    <div className='row'>
                        <div className='col-12'>
                            <p className='text-center mb-0 text-white'>© {new Date().getFullYear()}: Powered by Nguyen Truc An</p>
                        </div>
                    </div>
                </div>
            </footer>
        </>
    )
}

export default Footer
