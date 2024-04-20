import React from 'react'
import Meta from '../components/Meta'
import BreadCrumb from '../components/BreadCrumb'
import { Link } from 'react-router-dom'
import {HiOutlineArrowLeft} from 'react-icons/hi'
import blog from '../images/blog-1.jpg'

const SingleBlog = () => {
    return (
        <>
            <Meta title={'Dynamic Blog Name'} />
            <BreadCrumb title='Dynamic Blog Name' />
            <div className='blog-wrapper home-wrapper-2 py-5'>
                <div className='container-xxl'>
                    <div className='row'>
                        <div className='col-12'>
                            <div className='single-blog-card'>
                                <Link to='/blogs' className='d-flex align-items-center gap-10'><HiOutlineArrowLeft className='fs-4' /> Go back to Blogs</Link>
                                <h3 className='title'>
                                    A Beautiful Sunday Morning Renaissance
                                </h3>
                                <img src={blog} className='img-fluid w-100 my-4' alt='blog' />
                                <p>
                                    Một trang cá nhân trên Instagram muốn ấn tượng thì phải có nhiều bức ảnh đẹp. Điện thoại với chất lượng chụp ảnh tốt sẽ là một trong những công cụ giúp bạn có được những tấm ảnh đẹp dễ dàng hơn. Bạn có thể nhấn vào nút màu cam dưới đây để xem nhiều mẫu điện thoại chụp ảnh đẹp tại TGDĐ và mua chúng với giá ưu đãi nhất.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default SingleBlog
