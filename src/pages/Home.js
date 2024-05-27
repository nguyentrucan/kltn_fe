import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'
import Marquee from "react-fast-marquee";
import BlogCard from '../components/BlogCard';
import ProductCard from '../components/ProductCard';
import SpecialProduct from '../components/SpecialProduct';
import Meta from '../components/Meta';
import Container from '../components/Container';
import { services } from '../utils/Data';
import moment from 'moment'
import { useEffect } from 'react';
import { getAllBlogs } from '../features/blogs/blogSlice';
import { addToWishList, getAllProducts } from '../features/products/productSlice';
import ReactStars from "react-rating-stars-component"
import prodcompare from '../images/prodcompare.svg'
import wish from '../images/wish.svg'
import wishlist from '../images/wishlist.svg'
import addcart from '../images/add-cart.svg'
import view from '../images/view.svg'

const Home = () => {
  const blogState = useSelector((state) => state?.blog?.blogs)
  const productState = useSelector((state) => state.product.products)
  const navigate = useNavigate()

  const dispatch = useDispatch()
  useEffect(() => {
    getBlogs()
    getProducts()
  }, [])
  const getBlogs = () => {
    dispatch(getAllBlogs())
  }
  const getProducts = () => {
    dispatch(getAllProducts())
  }
  const addToWishListed = (id) => {
    dispatch(addToWishList(id))
  }
  return (
    <>
      <Meta title={"Home"} />
      <Container class1='home-wrapper-1 py-5'>
        <div className='row'>
          <div className='col-6'>
            <div className='main-banner position-relative'>
              <img src='images/main-banner-1.jpg' className='img-fluid rounded-3' alt='main banner' />
              <div className='main-banner-content position-absolute'>
                <h4>SUPERCHARGED FOR PROS</h4>
                <h5>iPad S13+ Pro.</h5>
                <p>From $999.00 or $41.62/mo.</p>
                <Link className='button'>Buy Now</Link>
              </div>
            </div>
          </div>
          <div className='col-6'>
            <div className='d-flex flex-wrap gap-10 justify-content-between align-items-center'>
              <div className='small-banner position-relative'>
                <img src='images/catbanner-01.jpg' className='img-fluid rounded-3' alt='main banner' />
                <div className='small-banner-content position-absolute'>
                  <h4>Best Saler</h4>
                  <h5>iPad S13+ Pro.</h5>
                  <p>From $999.00 <br /> or $41.62/mo.</p>
                </div>
              </div>
              <div className='small-banner position-relative'>
                <img src='images/catbanner-02.jpg' className='img-fluid rounded-3' alt='main banner' />
                <div className='small-banner-content position-absolute'>
                  <h4>NEW ARRIVAL</h4>
                  <h5>Buy iPad Air</h5>
                  <p>From $999.00 <br /> or $41.62/mo.</p>
                </div>
              </div>
              <div className='small-banner position-relative'>
                <img src='images/catbanner-03.jpg' className='img-fluid rounded-3' alt='main banner' />
                <div className='small-banner-content position-absolute'>
                  <h4>NEW ARRIVAL</h4>
                  <h5>Buy iPad Air</h5>
                  <p>From $999.00 <br /> or $41.62/mo.</p>
                </div>
              </div>
              <div className='small-banner position-relative'>
                <img src='images/catbanner-04.jpg' className='img-fluid rounded-3' alt='main banner' />
                <div className='small-banner-content position-absolute'>
                  <h4>NEW ARRIVAL</h4>
                  <h5>Buy iPad Air</h5>
                  <p>From $999.00 <br /> or $41.62/mo.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Container>
      <Container class1='home-wrapper-2 py-5'>
        <div className='row'>
          <div className='col-12'>
            <div className='services d-flex align-items-center justify-content-between'>
              {
                services?.map((i, j) => {
                  return (
                    <div className='d-flex align-items-center gap-15' key={j}>
                      <img src={i.image} alt='services' />
                      <div>
                        <h6>{i.title}</h6>
                        <p className='mb-0'>{i.tagline}</p>
                      </div>
                    </div>
                  )
                })
              }
            </div>
          </div>
        </div>
      </Container>
      <Container class1='home-wrapper-2 py-5'>
        <div className='row'>
          <div className='col-12'>
            <div className='categories d-flex justify-content-between flex-wrap align-items-center'>
              <div className='d-flex gap align-items-center'>
                <div>
                  <h6>Cameras</h6>
                  <p>10 Items</p>
                </div>
                <img src='images/camera.jpg' alt='camera' />
              </div>
              <div className='d-flex gap align-items-center'>
                <div>
                  <h6>Smart TV</h6>
                  <p>10 Items</p>
                </div>
                <img src='images/tv.jpg' alt='tv' />
              </div>
              <div className='d-flex gap align-items-center'>
                <div>
                  <h6>Smart Watches</h6>
                  <p>10 Items</p>
                </div>
                <img src='images/headphone.jpg' alt='headphone' />
              </div>
              <div className='d-flex gap align-items-center'>
                <div>
                  <h6>Music & Gaming</h6>
                  <p>10 Items</p>
                </div>
                <img src='images/camera.jpg' alt='camera' />
              </div>
              <div className='d-flex gap align-items-center'>
                <div>
                  <h6>Cameras</h6>
                  <p>10 Items</p>
                </div>
                <img src='images/camera.jpg' alt='camera' />
              </div>
              <div className='d-flex gap align-items-center'>
                <div>
                  <h6>Smart TV</h6>
                  <p>10 Items</p>
                </div>
                <img src='images/tv.jpg' alt='tv' />
              </div>
              <div className='d-flex gap align-items-center'>
                <div>
                  <h6>Smart Watches</h6>
                  <p>10 Items</p>
                </div>
                <img src='images/headphone.jpg' alt='headphone' />
              </div>
              <div className='d-flex gap align-items-center'>
                <div>
                  <h6>Music & Gaming</h6>
                  <p>10 Items</p>
                </div>
                <img src='images/camera.jpg' alt='camera' />
              </div>
            </div>
          </div>
        </div>
      </Container>

      <Container class1='featured-wrapper py-5 home-wrapper-2'>
        <div className='row'>
          <div className='col-12'>
            <h3 className='Container-heading'>Featured Collection</h3>
          </div>
          {
            productState && productState?.map((item, index) => {
              if (item.tags === 'featured') {
                return (
                  <div key={index} className='col-3'>
                    <div
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

                        {/* Price */}
                        <p className='price'>$ {item?.price}</p>
                      </div>
                      <div className='action-bar position-absolute'>
                        <div className='d-flex flex-column gap-15'>
                          <button className='border-0 bg-transparent'>
                            <img src={prodcompare} alt='compare' />
                          </button>
                          <button className='border-0 bg-transparent'>
                            <img onClick={() => navigate("/product/" + item?._id)} src={view} alt='view' />
                          </button>
                          <button className='border-0 bg-transparent'>
                            <img src={addcart} alt='addcart' />
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                )
              }
            })
          }
        </div>
      </Container>

      {/* Featured Collection */}
      <Container class1='famous-wrapper py-5 home-wrapper-2'>
        <div className='row'>
          <div className='col-3'>
            <div className='famous-card position-relative'>
              <img src='images/famous-1.jpg' className='img-fluid' alt='famous' />
              <div className='famous-content position-absolute'>
                <h5>Big Screen</h5>
                <h6>Smart Watch Series 7</h6>
                <p>From $399 or $ 16.62/mo. for 24 mo.</p>
              </div>
            </div>
          </div>
          <div className='col-3'>
            <div className='famous-card position-relative'>
              <img src='images/famous-2.jpg' className='img-fluid' alt='famous' />
              <div className='famous-content position-absolute'>
                <h5 className='text-dark'>Studio Display</h5>
                <h6 className='text-dark'>600 nits of brightness</h6>
                <p className='text-dark'>From $399 or $ 16.62/mo. for 24 mo.</p>
              </div>
            </div>
          </div>
          <div className='col-3'>
            <div className='famous-card position-relative'>
              <img src='images/famous-1.jpg' className='img-fluid' alt='famous' />
              <div className='famous-content position-absolute'>
                <h5>Big Screen</h5>
                <h6>Smart Watch Series 7</h6>
                <p>From $399 or $ 16.62/mo. for 24 mo.</p>
              </div>
            </div>
          </div>
          <div className='col-3'>
            <div className='famous-card position-relative'>
              <img src='images/famous-1.jpg' className='img-fluid' alt='famous' />
              <div className='famous-content position-absolute'>
                <h5>Big Screen</h5>
                <h6>Smart Watch Series 7</h6>
                <p>From $399 or $ 16.62/mo. for 24 mo.</p>
              </div>
            </div>
          </div>
        </div>
      </Container>

      {/* Special Products */}
      <Container class1='special-wrapper py-5 home-wrapper-2'>
        <div className='row'>
          <div className='col-12'>
            <h3 className='Container-heading'>Special Products</h3>
          </div>
        </div>
        <div className='row'>
          {
            productState && productState?.map((item, index) => {
              if (item.tags === 'special') {
                return (
                  <SpecialProduct
                    key={index}
                    id={item?._id}
                    title={item?.title}
                    brand={item?.brand}
                    totalrating={item?.totalrating.toString()}
                    images={item?.images[0].url}
                    price={item?.price}
                    sold={item?.sold}
                    quantity={item?.quantity}
                  />
                )
              }
            })
          }
        </div>
      </Container>

      {/* Our Popular Products */}
      <Container class1='popular-wrapper py-5 home-wrapper-2'>
        <div className='row'>
          <div className='col-12'>
            <h3 className='section-heading'>Our Popular Products</h3>
          </div>
        </div>
        <div className='row'>
          {
            productState && productState?.map((item, index) => {
              if (item.tags === 'popular') {
                return (
                  <div key={index} className='col-3'>
                    <div
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

                        {/* Price */}
                        <p className='price'>$ {item?.price}</p>
                      </div>
                      <div className='action-bar position-absolute'>
                        <div className='d-flex flex-column gap-15'>
                          <button className='border-0 bg-transparent'>
                            <img src={prodcompare} alt='compare' />
                          </button>
                          <button className='border-0 bg-transparent'>
                            <img onClick={() => navigate("/product/" + item?._id)} src={view} alt='view' />
                          </button>
                          <button className='border-0 bg-transparent'>
                            <img src={addcart} alt='addcart' />
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                )
              }
            })
          }
        </div>
      </Container>

      {/* Brand */}
      <Container class1='marque-wrapper home-wrapper-2 py-5'>
        <div className='row'>
          <div className='col-12'>
            <div className='marquee-inner-wrapper card-wrapper'>
              <Marquee className='d-flex'>
                <div className='mx-4 w-25'>
                  <img src='images/brand-01.png' alt='brand' />
                </div>
                <div className='mx-4 w-25'>
                  <img src='images/brand-02.png' alt='brand' />
                </div>
                <div className='mx-4 w-25'>
                  <img src='images/brand-03.png' alt='brand' />
                </div>
                <div className='mx-4 w-25'>
                  <img src='images/brand-04.png' alt='brand' />
                </div>
                <div className='mx-4 w-25'>
                  <img src='images/brand-05.png' alt='brand' />
                </div>
                <div className='mx-4 w-25'>
                  <img src='images/brand-06.png' alt='brand' />
                </div>
                <div className='mx-4 w-25'>
                  <img src='images/brand-07.png' alt='brand' />
                </div>
                <div className='mx-4 w-25'>
                  <img src='images/brand-08.png' alt='brand' />
                </div>
              </Marquee>
            </div>
          </div>
        </div>
      </Container>

      {/* Blog */}
      <Container class1='blog-wrapper py-5 home-wrapper-2'>
        <div className='row'>
          <div className='col-12'>
            <h3 className='Container-heading'>Our Lastest Blogs</h3>
          </div>
          <div className='row'>
            {
              blogState && blogState?.map((item, index) => {
                if (index < 3) {
                  return (
                    <div key={index} className='col-3'>
                      <BlogCard
                        id={item?._id}
                        title={item?.title}
                        description={item?.description}
                        image={item?.images[0].url}
                        date={moment(item?.createdAt).format("MMMM Do YYYY, h:mm a")}
                      />
                    </div>
                  )
                }
              })
            }
          </div>
        </div>
      </Container>
    </>
  )
}

export default Home
