import React, { useEffect, useState } from 'react'
import ReactStars from "react-rating-stars-component"
import { Link, useLocation, useNavigate } from 'react-router-dom'
import prodcompare from '../images/prodcompare.svg'
import wish from '../images/wish.svg'
import addcart from '../images/add-cart.svg'
import view from '../images/view.svg'
import { useDispatch, useSelector } from 'react-redux'
import { addToWishList } from '../features/products/productSlice'
import { AiFillHeart, AiOutlineHeart } from 'react-icons/ai'

const ProductCard = (props) => {
    const { data, grid } = props
    const dispatch = useDispatch()
    const navigate = useNavigate()
    let location = useLocation();

    const wishlistState = useSelector((state) => state?.auth?.wishlist?.wishlist)

    const [wishlist, setWishlist] = useState(wishlistState || [])

    useEffect(() => {
        setWishlist(wishlistState || [])
    }, [wishlistState])

    const isProductInWishlist = (productId) => {
        return wishlist?.some((item) => item._id === productId)
    }

    const addToWishListed = (productId) => {
        if (isProductInWishlist(productId)) {
            dispatch(addToWishList(productId));

            const updatedWishlist = wishlist.filter((item) => item._id !== productId)
            setWishlist(updatedWishlist)
        } else {
            dispatch(addToWishList(productId))
            const product = data.find((item) => item._id === productId);
            setWishlist([...wishlist, product]);
        }
    }


    return (
        <>
            {
                data?.map((item, index) => {
                    const isWishlist = isProductInWishlist(item._id);
                    return (
                        <div
                            key={index}
                            className={`${location.pathname === '/product' ? `gr-${grid}` : 'col-3'}`}>
                            <div
                                className='product-card position-relative'>
                                {/* Add Wishlist */}
                                <div className='wishlist-icon position-absolute'>
                                    <button
                                        onClick={() => { addToWishListed(item?._id) }}
                                        className='border-0 bg-transparent'>
                                        {isWishlist ? (
                                            <AiFillHeart className="fs-5 me-1" />
                                        ) : (
                                            <AiOutlineHeart className="fs-5 me-1" />
                                        )}
                                    </button>
                                </div>
                                {/* Product Image */}
                                <div className='product-image'>
                                    <img
                                        src={item?.images[0]?.url}
                                        //className='img-fluid mx-auto' 
                                        alt='productimage'
                                        height={"250px"}
                                        width={"100%"}
                                        onClick={() => navigate("/product/" + item?._id)} />
                                    <img
                                        src={item?.images[0]?.url}
                                        //className='img-fluid mx-auto'
                                        alt='productimage'
                                        height={"250px"}
                                        width={"100%"}
                                        onClick={() => navigate("/product/" + item?._id)} />
                                </div>
                                {/* Product Details */}
                                <div className='product-details'>
                                    {/* Brand */}
                                    <h6 className='brand'>{item?.brand}</h6>
                                    {/* Title */}
                                    <h5 className='product-title'>
                                        {grid === 12 || grid === 6
                                            ? item?.title
                                            : item?.title?.substr(0, 80) + "..."}
                                    </h5>
                                    {/* Rate */}
                                    <ReactStars
                                        count={5}
                                        size={24}
                                        value={item?.totalrating}
                                        edit={false}
                                        activeColor="#ffd700" />
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
                                            <img onClick={() => navigate('/product/' + item?._id)} src={view} alt='view' />
                                        </button>
                                        <button className='border-0 bg-transparent'>
                                            <img src={addcart} alt='addcart' />
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )
                })
            }
        </>
    )
}

export default ProductCard
