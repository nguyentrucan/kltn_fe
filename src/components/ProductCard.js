import React from 'react'
import ReactStars from "react-rating-stars-component"
import { Link, useLocation } from 'react-router-dom'
import prodcompare from '../images/prodcompare.svg'
import wish from '../images/wish.svg'
import wishlist from '../images/wishlist.svg'
import watch from '../images/watch.jpg'
import watch2 from '../images/watch-01.jpg'
import addcart from '../images/add-cart.svg'
import view from '../images/view.svg'
import { useDispatch } from 'react-redux'
import { addToWishList } from '../features/products/productSlice'

const ProductCard = (props) => {
    const { data, grid } = props
    const dispatch = useDispatch()
    const addToWishListed = (id) => {
        dispatch(addToWishList(id))
    }

    let location = useLocation();
    return (
        <>
            {
                data?.map((item, index) => {
                    return (
                        <div
                            key={index}
                            className={`${location.pathname === '/product' ? `gr-${grid}` : 'col-3'}`}>
                            <Link
                                // to={`${location.pathname == '/'
                                //     ? '/product/:id'
                                //     : location.pathname == '/product/:id'
                                //         ? '/product/:id'
                                //         : ':id'
                                //     }`}
                                className='product-card position-relative'>
                                {/* Add Wishlist */}
                                <div className='wishlist-icon position-absolute'>
                                    <button
                                        onClick={() => { addToWishListed(item?._id) }}
                                        className='border-0 bg-transparent'>
                                        <img src={wish} alt='wishlist' />
                                    </button>
                                </div>
                                {/* Product Image */}
                                <div className='product-image'>
                                    <img
                                        src={item?.images[0].url}
                                        className='img-fluid mx-auto' alt='productimage' />
                                    <img
                                        src={item?.images[0].url}
                                        className='img-fluid mx-auto' alt='productimage' />
                                </div>
                                {/* Product Details */}
                                <div className='product-details'>
                                    {/* Brand */}
                                    <h6 className='brand'>{item?.brand}</h6>
                                    {/* Title */}
                                    <h5 className='product-title'>
                                        {item?.title}
                                    </h5>
                                    {/* Rate */}
                                    <ReactStars
                                        count={5}
                                        size={24}
                                        value={item?.totalrating.toString(Number)}
                                        edit={false} activeColor="#ffd700" />
                                    {/* Desc */}
                                    <p className={`description ${grid === 12 ? 'd-block' : 'd-none'}`}
                                        dangerouslySetInnerHTML={{ __html: item?.description }}>

                                    </p>
                                    {/* Price */}
                                    <p className='price'>$ {item?.price}</p>
                                </div>
                                <div className='action-bar position-absolute'>
                                    <div className='d-flex flex-column gap-15'>
                                        <button className='border-0 bg-transparent'>
                                            <img src={prodcompare} alt='compare' />
                                        </button>
                                        <button className='border-0 bg-transparent'>
                                            <img src={view} alt='view' />
                                        </button>
                                        <button className='border-0 bg-transparent'>
                                            <img src={addcart} alt='addcart' />
                                        </button>
                                    </div>
                                </div>
                            </Link>
                        </div>
                    )
                })
            }
        </>
    )
}

export default ProductCard
