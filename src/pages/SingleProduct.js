import Meta from '../components/Meta'
import BreadCrumb from '../components/BreadCrumb'
import React, { useEffect, useState } from 'react'
import ProductCard from '../components/ProductCard'
import ReactStars from "react-rating-stars-component"
import ReactImageZoom from 'react-image-zoom'
import Color from '../components/Color'
import { TbGitCompare } from 'react-icons/tb'
import { AiFillHeart, AiOutlineHeart } from 'react-icons/ai'
import Container from '../components/Container'
import { useLocation, useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { addRating, getAllProducts, getProduct } from '../features/products/productSlice'
import { toast } from 'react-toastify'
import { addProductToCart, getUserCart } from '../features/user/userSlice'

const SingleProduct = () => {
    const [color, setColor] = useState(null)
    const [quantity, setQuantity] = useState(1)
    const [alreadyAdded, setAlreadyAdded] = useState(false)
    const location = useLocation()
    const navigate = useNavigate()
    const getProductId = location.pathname.split('/')[2]
    const dispatch = useDispatch()

    const productState = useSelector((state) => state?.product?.singleproduct)
    const productsState = useSelector((state) => state?.product?.product)
    const cartState = useSelector((state) => state?.auth?.cartProducts)

    const rat = productState?.totalrating
    const wishlistState = useSelector((state) => state?.auth?.wishlist?.wishlist)

    useEffect(() => {
        dispatch(getProduct(getProductId))
        dispatch(getUserCart())
        dispatch(getAllProducts())
    }, [])

    useEffect(() => {
        for (let index = 0; index < cartState?.length; index++) {
            if (getProductId === cartState[index]?.productId?._id) {
                setAlreadyAdded(true)
            }
        }
    })

    const uploadCart = () => {
        if (color === null) {
            toast.error("Please Choose Color !")
        } else {
            dispatch(addProductToCart({
                productId: productState?._id,
                quantity,
                color,
                price: productState?.price,
            }))
            navigate('/cart')
        }
    }

    const props = {
        width: 594,
        height: 600,
        zoomWidth: 600,
        img: productState?.images[0]?.url ? productState?.images[0]?.url : "https://images.pexels.com/photos/190819/pexels-photo-190819.jpeg"
    };
    const [orderedProduct, setorderedProduct] = useState(true)
    const copyToClipboard = (text) => {
        console.log('text', text)
        var textField = document.createElement('textarea')
        textField.innerText = text
        document.body.appendChild(textField)
        textField.select()
        document.execCommand('copy')
        textField.remove()
    }

    const closeModal = () => { };
    const [popularProduct, setPopularProduct] = useState([])

    useEffect(() => {
        let data = [];
        for (let index = 0; index < productState?.length; index++) {
            const element = productState[index];
            if (element.tags === "popular") {
                data.push(element)
            } else {
                setPopularProduct(data)
            }
        }
    }, [productState])

    const [star, setStar] = useState(null);
    const [comment, setComment] = useState(null);
    const [like, setLike] = useState(false);
    const [isFilled, setIsFilled] = useState(false)

    const handleToggle = () => {
        setIsFilled(!isFilled)
    }

    const addRatingToProduct = () => {
        if (star === null) {
            toast.error("Please add star rating")
            return false
        } else {
            dispatch(
                addRating({
                    star: star,
                    comment: comment,
                    prodId: getProductId
                })
            )
            setTimeout(() => {
                dispatch(getProduct(getProductId))
            }, 100)
        }
        return false
    }

    return (
        <>
            <Meta title={productState?.title} />
            <BreadCrumb title={productState?.title} />
            <Container class1='main-product-wrapper py-5 home-wrapper-2'>
                <div className='row'>
                    <div className='col-6'>
                        <div className='main-product-image'>
                            <div>
                                <ReactImageZoom {...props} />
                            </div>
                        </div>
                        <div className='other-product-images d-flex flex-wrap gap-15'>
                            {productState?.images.map((item, index) => {
                                return (
                                    <div key={index}>
                                        <img src={item?.url} className='img-fluid' alt='' />
                                    </div>
                                )
                            })}
                        </div>
                    </div>
                    <div className='col-6'>
                        <div className='main-product-details'>
                            <div className='border-bottom'>
                                <h3 className='title'>
                                    {productState?.title}
                                </h3>
                            </div>
                            <div className='border-bottom py-3'>
                                <p className='price'>$ {productState?.price}</p>
                                <div className='d-flex align-items-center gap-10'>
                                    <ReactStars count={5} size={24} value={productState?.totalrating.toString()} edit={false} activeColor="#ffd700" />
                                    <p className='mb-0 t-review'>({productState?.ratings?.length} {productState?.ratings?.length > 1 ? "Reviews" : "Review"})</p>
                                </div>
                                <a className='review-btn' href='#review'>Write a Review</a>
                            </div>
                            <div className='py-3'>
                                <div className='d-flex gap-10 align-items-center my-2'>
                                    <h3 className='product-heading'>Brand :</h3>
                                    <p className='product-data'>{productState?.brand}</p>
                                </div>
                                <div className='d-flex gap-10 align-items-center my-2'>
                                    <h3 className='product-heading'>Category :</h3>
                                    <p className='product-data'>{productState?.category}</p>
                                </div>
                                <div className='d-flex gap-10 align-items-center my-2'>
                                    <h3 className='product-heading'>Tags :</h3>
                                    <p className='product-data'>{productState?.tags}</p>
                                </div>
                                <div className='d-flex gap-10 align-items-center my-2'>
                                    <h3 className='product-heading'>Availability :</h3>
                                    <p className='product-data'>In Stock</p>
                                </div>
                                {
                                    alreadyAdded === false && <>
                                        <div className='d-flex gap-10 flex-column mt-2 mb-3'>
                                            <h3 className='product-heading'>Color :</h3>
                                            <Color setColor={setColor} colorData={productState?.color} />
                                        </div>
                                    </>
                                }
                                <div className='d-flex align-items-center gap-15 flex-row mt-2 mb-3'>
                                    {
                                        alreadyAdded === false && <>
                                            <h3 className='product-heading'>Quantity :</h3>
                                            <div className=''>
                                                <input
                                                    type='number'
                                                    name=''
                                                    min={1}
                                                    max={100}
                                                    defaultValue={1}
                                                    className='form-control'
                                                    style={{ 'width': '70px' }}
                                                    id=''
                                                    onChange={(e) => setQuantity(e.target.value)}
                                                    value={quantity} />
                                            </div>
                                        </>
                                    }
                                    <div className={alreadyAdded ? "ms-0" : "ms5" + 'd-flex align-items-center gap-30 ms-5'}>
                                        <button
                                            className='button border-0'
                                            type='button'
                                            // data-bs-toggle="modal"
                                            // data-bs-target="#staticBackdrop"
                                            onClick={() => {
                                                alreadyAdded ? navigate('/cart') : uploadCart()
                                            }}>
                                            {alreadyAdded ? "Go To Cart" : "Add To Cart"}
                                        </button>
                                    </div>
                                </div>
                                <div className='d-flex align-items-center gap-15'>
                                    {/* <div>
                                        <a href=''><TbGitCompare className='fs-5 me-2' /> Add To Compare</a>
                                    </div>
                                    <div>
                                        <a href=''><AiOutlineHeart className='fs-5 me-2' /> Add To Wishlist</a>
                                    </div> */}
                                    <div>
                                        {isFilled ? (
                                            <AiFillHeart
                                                className="fs-5 me-2"
                                                onClick={handleToggle}
                                            />
                                        ) : (
                                            <AiOutlineHeart
                                                className="fs-5 me-2"
                                                onClick={handleToggle}
                                            />
                                        )}
                                        <a> Add To Wishlist</a>
                                    </div>
                                </div>
                                <div className='d-flex gap-10 flex-column my-3'>
                                    <h3 className='product-heading'>Shipping & Returns :</h3>
                                    <p className='product-data'>Free shipping and returns available on all orders! <br /> We ship all us domestic orders within <b>5-10 business days!</b></p>
                                </div>
                                <div className='d-flex gap-10 align-items-center my-2'>
                                    <h3 className='product-heading'>Product Link :</h3>
                                    <a href='javascript:void(0);' onClick={() => copyToClipboard(window.location.href)}>Copy Product Link</a>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </Container>
            <Container class1='description-wrapper py-5 home-wrapper-2'>
                <div className='row'>
                    <div className='col-12'>
                        <h4>Description</h4>
                        <div className='bg-white p-3'>
                            <p
                                dangerouslySetInnerHTML={{ __html: productState?.description }}></p>
                        </div>
                    </div>
                </div>
            </Container>
            <Container class1='reviews-wrapper home-wrapper-2'>
                <div className='row'>
                    <div className='col-12'>
                        <h3>Reviews</h3>
                        <div className='review-inner-wrapper'>
                            <div className='review-head d-flex justify-content-between align-items-end'>
                                <div>
                                    <h4 className='mb-2'>Customer Reviews</h4>
                                    <div className='d-flex align-items-center gap-10'>
                                        <ReactStars
                                            count={5}
                                            size={24}
                                            value={productState?.totalrating?.toString()}
                                            edit={false}
                                            activeColor="#ffd700" />
                                        <p className='mb-0'>Based on {productState?.ratings?.length} {productState?.ratings?.length > 1 ? "Reviews" : "Review"}</p>
                                    </div>
                                </div>
                                {orderedProduct && (
                                    <div>
                                        <a className='text-dark text-decoration-underline' href='#review'>Write a Review</a>
                                    </div>
                                )}
                            </div>
                            <div id='review' className='review-form py-4'>
                                <h4>Write a Review</h4>
                                <form action='' className='d-flex flex-column gap-15'>
                                    <div>
                                        <ReactStars count={5} size={24} value={0} edit={true} activeColor="#ffd700" onChange={(e) => { setStar(e) }} />
                                    </div>
                                    <div>
                                        <textarea className='w-100 form-control' id='' cols='30' rows='4' placeholder='Comments' onChange={(e) => {
                                            setComment(e.target.value);
                                        }}></textarea>
                                    </div>
                                    <div className='d-flex justify-content-end'>
                                        <button
                                            onClick={addRatingToProduct}
                                            className='button border-0'
                                            type='button'>
                                            Submit Review
                                        </button>
                                    </div>
                                </form>
                            </div>
                            <div className='reviews mt-4'>
                                {productState &&
                                    productState.ratings?.map((item, index) => {
                                        return (
                                            <div key={index} className="review">
                                                <div className="d-flex gap-10 align-items-center">
                                                    <h6 className="mb-0">user</h6>
                                                    <ReactStars
                                                        count={5}
                                                        size={24}
                                                        value={item?.star}
                                                        edit={false}
                                                        activeColor="#ffd700"
                                                    />
                                                </div>
                                                <p className="mt-3">{item?.comment}</p>
                                            </div>
                                        );
                                    })}
                            </div>
                        </div>
                    </div>
                </div>
            </Container>
            <Container class1='popular-wrapper py-5 home-wrapper-2'>
                <div className='row'>
                    <div className='col-12'>
                        <h3 className='section-heading'>Our Popular Products</h3>
                    </div>
                </div>
                <div className='row'>
                    <ProductCard data={popularProduct} />
                </div>
            </Container>
        </>
    )
}

export default SingleProduct
