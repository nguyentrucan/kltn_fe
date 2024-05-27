import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import Meta from '../components/Meta'
import BreadCrumb from '../components/BreadCrumb'
import Container from '../components/Container'
import { getUserProductWishlist } from '../features/user/userSlice'
import { addToWishList } from '../features/products/productSlice'

const Wishlist = () => {
    const dispatch = useDispatch()
    useEffect(() => {
        getWishlistFromOb()
        removeFromWishlist()
    }, []);
    const getWishlistFromOb = () => {
        dispatch(getUserProductWishlist())
    }
    const wishlistState = useSelector(state => state?.auth?.wishlist?.wishlist)
    const removeFromWishlist = (id) => {
        dispatch(addToWishList(id))
        setTimeout(() => {
            dispatch(getUserProductWishlist())
        }, 100)
    }
    return (
        <>
            <Meta title={'Wishlist'} />
            <BreadCrumb title='Wishlist' />
            <Container class1='wishlist-wrapper py-5 home-wrapper-2'>
                <div className='row'>
                    {
                        wishlistState &&
                        wishlistState.length === 0 &&
                        <div className='text-center fs-5'>No Data</div>
                    }
                    {
                        wishlistState &&
                        wishlistState?.map((item, index) => {
                            return (
                                <div key={index} className='col-3'>
                                    <div className='wishlist-card position-relative'>
                                        <img
                                            onClick={() => removeFromWishlist(item?._id)}
                                            src='images/cross.svg' alt='cross' className='position-absolute cross img-fluid' />
                                        <div className='wishlist-card-image bg-white'>
                                            <img src={item?.images[0].url} className='img-fluid w-100 d-block mx-auto' alt='watch'
                                                width={160} />
                                        </div>
                                        <div className='py-3 px-3'>
                                            <h5 className='title'>
                                                {item?.title}
                                            </h5>
                                            <h6 className='price'>
                                                $ {item?.price}
                                            </h6>
                                        </div>
                                    </div>
                                </div>
                            )
                        })
                    }
                </div>
            </Container>
        </>
    )
}

export default Wishlist
