import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import BreadCrumb from '../components/BreadCrumb'
import Meta from '../components/Meta'
import ReactStars from "react-rating-stars-component"
import ProductCard from '../components/ProductCard';
import Color from '../components/Color';
import Container from '../components/Container'
import { getAllProducts } from '../features/products/productSlice'

const OurStore = () => {
    const [grid, setGrid] = useState(4);
    const productState = useSelector((state) => state?.product?.product)
    const [brands, setBrands] = useState([]);
    const [categories, setCategories] = useState([]);

    const [tags, setTags] = useState([]);

    //Filter State
    const [tag, setTag] = useState(null)
    const [category, setCategory] = useState(null)
    const [brand, setBrand] = useState(null)
    const [minPrice, setminPrice] = useState(null)
    const [maxPrice, setmaxPrice] = useState(null)
    const [sort, setSort] = useState(null)

    useEffect(() => {
        let newBrands = [];
        let category = [];
        let newtags = [];
        for (let index = 0; index < productState?.length; index++) {
            const element = productState[index];
            newBrands.push(element.brand);
            category.push(element.category);
            newtags.push(element.tags)
        }
        setBrands(newBrands);
        setCategories(category);
        setTags(newtags);
    }, [productState])

    const dispatch = useDispatch()

    useEffect(() => {
        getProducts()
    }, [sort, tag, brand, category, minPrice, maxPrice])

    const getProducts = () => {
        dispatch(getAllProducts({ sort, tag, brand, category, minPrice, maxPrice }))
    }

    return (
        <>
            <Meta title={'Our Store'} />
            <BreadCrumb title='Our Store' />
            <Container class1='store-wrapper home-wrapper-2 py-5'>
                <div className='row'>
                    <div className='col-3'>
                        <div className='filter-card mb-3'>
                            <h3 className='filter-title'>Shop By Categories</h3>
                            <div>
                                <ul className="ps-0">
                                    <a
                                        className="ps-0"
                                        href="/product"
                                        style={{ color: "var(--color-777777)" }}
                                    >
                                        All
                                    </a>

                                    {categories &&
                                        [...new Set(categories)].map((item, index) => {
                                            return (
                                                <li key={index} onClick={() => setCategory(item)}>
                                                    {item}
                                                </li>
                                            );
                                        })}
                                </ul>
                            </div>
                        </div>
                        <div className='filter-card mb-3'>
                            <h3 className='filter-title'>Filter By</h3>
                            <div>
                                {/* <h5 className='sub-title'>Availability</h5>
                                <div>
                                    <div className='form-check'>
                                        <input className='form-check-input' type='checkbox' value='' id='' />
                                        <label className='form-check-label' htmlFor=''>In Stock (1)</label>
                                    </div>
                                    <div className='form-check'>
                                        <input className='form-check-input' type='checkbox' value='' id='' />
                                        <label className='form-check-label' htmlFor=''>Out of Stock (0)</label>
                                    </div>
                                </div> */}
                                <h5 className='sub-title'>Price</h5>
                                <div className='d-flex align-items-center gap-10'>
                                    <div className='form-floating'>
                                        <input
                                            type='number'
                                            className='form-control' id='floatingInput'
                                            placeholder='From'
                                            onChange={(e) => setminPrice(e.target.value)} />
                                        <label htmlFor='floatingInput'>From</label>
                                    </div>
                                    <div className='form-floating'>
                                        <input
                                            type='number'
                                            className='form-control' id='floatingInput1'
                                            placeholder='To'
                                            onChange={(e) => setmaxPrice(e.target.value)} />
                                        <label htmlFor='floatingInput1'>To</label>
                                    </div>
                                </div>
                                {/* <h5 className='sub-title'>Colors</h5>
                                <div>
                                    <Color />
                                </div> */}
                            </div>
                        </div>
                        <div className='filter-card mb-3'>
                            <h3 className='filter-title'>Product Tags</h3>
                            <div>
                                <div className='product-tags d-flex flex-wrap align-items-center gap-10'>
                                    {tags &&
                                        [...new Set(tags)].map((item, index) => {
                                            return (
                                                <span
                                                    key={index}
                                                    onClick={() => setTag(item)}
                                                    className="text-capitalize badge bg-light text-secondary rounded-3 py-2 px-3">
                                                    {item}
                                                </span>
                                            );
                                        })}
                                </div>
                            </div>
                        </div>
                        <div className="filter-card mt-4 mb-3">
                            <h3 className="sub-title">Product Brands</h3>
                            <div>
                                <div className="product-tags d-flex flex-wrap align-items-center gap-10">
                                    {brands &&
                                        [...new Set(brands)].map((item, index) => {
                                            return (
                                                <span
                                                    key={index}
                                                    onClick={() => setBrand(item)}
                                                    className="text-capitalize badge bg-light text-secondary rounded-3 py-2 px-3"
                                                >
                                                    {item}
                                                </span>
                                            );
                                        })}
                                </div>
                            </div>
                        </div>
                        <div className='filter-card mb-3'>
                            <h3 className='filter-title'>Random Product</h3>
                            <div>
                                <div className='random-products mb-3 d-flex  '>
                                    <div className='w-50'>
                                        <img src='images/watch.jpg' className='img-fluid' alt='watch' />
                                    </div>
                                    <div className='w-50'>
                                        <h5>
                                            Kids headphones bulk 10 pack multi colored for students
                                        </h5>
                                        <ReactStars count={5} size={24} value={3} edit={false} activeColor="#ffd700" />
                                        <b>$ 300</b>
                                    </div>
                                </div>
                                <div className='random-products d-flex  '>
                                    <div className='w-50'>
                                        <img src='images/watch.jpg' className='img-fluid' alt='watch' />
                                    </div>
                                    <div className='w-50'>
                                        <h5>
                                            Kids headphones bulk 10 pack multi colored for students
                                        </h5>
                                        <ReactStars count={5} size={24} value={3} edit={false} activeColor="#ffd700" />
                                        <b>$ 300</b>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className='col-9'>
                        <div className='filter-sort-grid mb-4'>
                            <div className='d-flex justify-content-between align-items-center'>
                                <div className='d-flex align-items-center gap-10'>
                                    <p className='mb-0 d-block' style={{ width: "100px" }}>Sort By:</p>
                                    <select
                                        name=''
                                        className='form-control form-select'
                                        id=''
                                        onChange={(e) => setSort(e.target.value)}
                                    >
                                        <option value="title">Alphabetically, A-Z</option>
                                        <option value="-title">Alphabetically, Z-A</option>
                                        <option value="price">Price, low to high</option>
                                        <option value="-price">Price, high to low</option>
                                        <option value="createdAt">Date, old to new</option>
                                        <option value="-createdAt">Date, new to old</option>
                                    </select>
                                </div>
                                <div className='d-flex align-items-center gap-10'>
                                    <p className='totalproducts mb-0'>
                                        {productState?.length} {productState?.length > 1 ? "Products" : "Product"}
                                    </p>
                                    <div className='d-flex gap-10 align-items-center grid'>
                                        <img onClick={() => { setGrid(3); }} src='images/gr4.svg' className='d-block img-fluid' alt='grid' />
                                        <img onClick={() => { setGrid(4); }} src='images/gr3.svg' className='d-block img-fluid' alt='grid' />
                                        <img onClick={() => { setGrid(6); }} src='images/gr2.svg' className='d-block img-fluid' alt='grid' />
                                        <img onClick={() => { setGrid(12); }} src='images/gr.svg' className='d-block img-fluid' alt='grid' />
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className='products-list pb-5'>
                            <div className='d-flex gap-10 flex-wrap'>
                                <ProductCard data={productState ? productState : []} grid={grid} />
                            </div>
                        </div>
                    </div>
                </div>
            </Container>
        </>
    )
}

export default OurStore
