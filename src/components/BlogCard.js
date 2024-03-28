import React from 'react'
import { Link } from 'react-router-dom'

const BlogCard = () => {
    return (
        <div className='col-3'>
            <div className='blog-card'>
                <div className='card-image'>
                    <img src='images/blog-1.jpg' className='img-fluid' alt='blog' />
                </div>
                <div className='blog-content'>
                    <p className='date'>28 Mar, 2024</p>
                    <h5 className='title'>This is a title</h5>
                    <p className='desc'>A callback for when the marquee finishes a loop. Does not call if maximum loops are reached (use onFinish instead).</p>
                    <Link to='' className='button'>Read More</Link>
                </div>
            </div>
        </div>
    )

}

export default BlogCard
