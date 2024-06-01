import React, { useEffect, useState } from 'react'
import { BiArrowBack } from 'react-icons/bi'
import { Link } from 'react-router-dom'
import watch from '../images/watch.jpg'
import Container from '../components/Container'
import { useDispatch, useSelector } from 'react-redux'
import { useFormik } from 'formik'
import * as yup from 'yup'
import axios from 'axios'
import { config } from '../utils/axiosConfig'
import { createAnOrder } from '../features/user/userSlice'

const shippingSchema = yup.object({
    firstName: yup.string().required("First Name is required"),
    lastName: yup.string().required("Last Name is required"),
    address: yup.string().required("Address Details are required"),
    state: yup.string().required("State are required"),
    city: yup.string().required("City are required"),
    country: yup.string().required("Country are required"),
    pincode: yup.number().required("Pincode are required"),
})

const Checkout = () => {
    const dispatch = useDispatch()
    const cartState = useSelector(state => state.auth.cartProducts)
    const [totalAmount, setTotalAmount] = useState(null)

    const [shippingInfo, setShippingInfo] = useState(null)
    const [paymentInfo, setPaymentInfo] = useState({
        razorpayPaymentId: "",
        razorpayOrderId: "",
    })

    console.log(cartState);

    useEffect(() => {
        let sum = 0
        for (let index = 0; index < cartState.length; index++) {
            sum = sum + (Number(cartState[index].quantity) * cartState[index].price)
            setTotalAmount(sum)
        }
    }, [cartState])

    const formik = useFormik({
        initialValues: {
            firstName: "",
            lastName: "",
            address: "",
            state: "",
            city: "",
            country: "",
            pincode: "",
            other: "",
        },
        validationSchema: shippingSchema,
        onSubmit: (values) => {
            //alert(JSON.stringify(values))
            setShippingInfo(values)
            checkoutHandler()
        },
    })

    useEffect(() => {
        let items = []
        for (let index = 0; index < cartState?.length; index++) {
            items.push({
                product: cartState[index].productId._id,
                quantity: cartState[index].quantity,
                color: cartState[index].color,
                price: cartState[index].price,
            })
        }
    }, [])

    const loadScript = (src) => {
        return new Promise((resolve) => {
            const script = document.createElement("script")
            script.src = src;
            script.onload = () => {
                resolve(true)
            }
            script.onerror = () => {
                resolve(false)
            }
            document.body.appendChild(script)
        })
    }

    const checkoutHandler = async () => {
        const res = await loadScript("https://checkout.razorpay.com/v1/checkout.js")
        if (!res) {
            alert("Razorpay SDK Failed To Load")
            return
        }
        const result = await axios.post("http://localhost:5000/api/user/order/checkout", "", config)
        if (!result) {
            alert("Something went wrong")
            return
        }

        const { amount, id: order_id, currency } = result.data.order

        const options = {
            key: "rzp_test_jk96M1tbCBGW2H", // Enter the Key ID generated from the Dashboard
            amount: amount,
            currency: currency,
            name: "Nguyen An",
            description: "Test Transaction",

            order_id: order_id,
            handler: async function (response) {
                const data = {
                    orderCreationId: order_id,
                    razorpayPaymentId: response.razorpay_payment_id,
                    razorpayOrderId: response.razorpay_order_id,
                };

                const result = await axios.post("http://localhost:5000/api/user/order/paymentVerification", data, config);

                setPaymentInfo({
                    razorpayPaymentId: response.razorpay_payment_id,
                    razorpayOrderId: response.razorpay_order_id,
                })

                dispatch(createAnOrder({
                    totalPrice: totalAmount,
                    totalPriceAfterDiscount: totalAmount,
                    orderItems: [],
                    paymentInfo,
                    shippingInfo,
                }))
            },
            prefill: {
                name: "Nguyen An",
                email: "nguyenan102az@gmail.com",
                contact: "0961869560",
            },
            notes: {
                address: "Thu Duc City",
            },
            theme: {
                color: "#61dafb",
            },
        };

        const paymentObject = new window.Razorpay(options);
        paymentObject.open();
    }

    return (
        <>
            <Container class1='checkout-wrapper py-5 home-wrapper-2'>
                <div className='row'>
                    <div className='col-7'>
                        <div className='checkout-left-data'>
                            <h3 className='website-name'>Dev Corner</h3>
                            <nav style={{ "--bs-breadcrumb-divider": '>' }} aria-label="breadcrumb">
                                <ol className="breadcrumb">
                                    <li className="breadcrumb-item">
                                        <Link className='text-dark total-price' to='/cart'>Cart</Link>
                                    </li>
                                    &nbsp; /
                                    <li className="breadcrumb-item total-price active" aria-current="page">
                                        Information
                                    </li>
                                    &nbsp; /
                                    <li className="breadcrumb-item total-price active" aria-current="page">
                                        Shipping
                                    </li>
                                    &nbsp; /
                                    <li className="breadcrumb-item total-price active" aria-current="page">
                                        Payment
                                    </li>
                                </ol>
                            </nav>
                            <h4 className='title total'>
                                Contact Information
                            </h4>
                            <p className='user-details total'>
                                Nguyen Truc An (nguyenan102az@gmail.com)
                            </p>
                            <h4 className='mb-3'>Shipping Address</h4>
                            <form
                                onSubmit={formik.handleSubmit}
                                action=''
                                className='d-flex gap-15 flex-wrap justify-content-between'>

                                {/* Country */}
                                <div className='w-100'>
                                    <select
                                        name='country'
                                        value={formik.values.country}
                                        onChange={formik.handleChange("country")}
                                        onBlur={formik.handleBlur("country")}
                                        className='form-control form-select'
                                        id=''
                                        defaultValue={''}>
                                        <option value='' disabled>
                                            Select Country
                                        </option>
                                        <option value='Viet Nam'>
                                            Viet Nam
                                        </option>
                                    </select>
                                    <div className='error ms-2 my-1'>
                                        {formik.touched.country && formik.errors.country}
                                    </div>
                                </div>

                                {/* First name */}
                                <div className='flex-grow-1'>
                                    <input
                                        name='firstName'
                                        value={formik.values.firstName}
                                        onChange={formik.handleChange("firstName")}
                                        onBlur={formik.handleBlur("firstName")}
                                        type='text'
                                        placeholder='First Name' className='form-control' />
                                    <div className='error ms-2 my-1'>
                                        {formik.touched.firstName && formik.errors.firstName}
                                    </div>
                                </div>

                                {/* Last name */}
                                <div className='flex-grow-1'>
                                    <input
                                        name='lastName'
                                        value={formik.values.lastName}
                                        onChange={formik.handleChange("lastName")}
                                        onBlur={formik.handleBlur("lastName")}
                                        type='text'
                                        placeholder='Last Name' className='form-control' />
                                    <div className='error ms-2 my-1'>
                                        {formik.touched.lastName && formik.errors.lastName}
                                    </div>
                                </div>

                                {/* Address */}
                                <div className='w-100'>
                                    <input
                                        name='address'
                                        value={formik.values.address}
                                        onChange={formik.handleChange("address")}
                                        onBlur={formik.handleBlur("address")}
                                        type='text'
                                        placeholder='Address' className='form-control' />
                                    <div className='error ms-2 my-1'>
                                        {formik.touched.address && formik.errors.address}
                                    </div>
                                </div>

                                {/* Other */}
                                <div className='w-100'>
                                    <input
                                        name='other'
                                        value={formik.values.other}
                                        onChange={formik.handleChange("other")}
                                        onBlur={formik.handleBlur("other")}
                                        type='text'
                                        placeholder='Apartment, Suite, etc'
                                        className='form-control' />
                                </div>

                                {/* City */}
                                <div className='flex-grow-1'>
                                    <input
                                        name='city'
                                        value={formik.values.city}
                                        onChange={formik.handleChange("city")}
                                        onBlur={formik.handleBlur("city")}
                                        type='text'
                                        placeholder='City'
                                        className='form-control' />
                                    <div className='error ms-2 my-1'>
                                        {formik.touched.city && formik.errors.city}
                                    </div>
                                </div>

                                {/* State */}
                                <div className='flex-grow-1'>
                                    <select
                                        name='state'
                                        value={formik.values.state}
                                        onChange={formik.handleChange("state")}
                                        onBlur={formik.handleBlur("state")}
                                        className='form-control form-select'
                                        defaultValue={''}
                                        id=''>
                                        <option value='' disabled>
                                            Select State
                                        </option>
                                        <option value='Ho Chi Minh'>
                                            Ho Chi Minh
                                        </option>
                                        <option value='Dong Thap'>
                                            Dong Thap
                                        </option>
                                    </select>
                                    <div className='error ms-2 my-1'>
                                        {formik.touched.state && formik.errors.state}
                                    </div>
                                </div>

                                {/* Zipcode */}
                                <div className='flex-grow-1'>
                                    <input
                                        name='pincode'
                                        value={formik.values.pincode}
                                        onChange={formik.handleChange("pincode")}
                                        onBlur={formik.handleBlur("pincode")}
                                        type='number'
                                        placeholder='Zipcode'
                                        className='form-control' />
                                    <div className='error ms-2 my-1'>
                                        {formik.touched.pincode && formik.errors.pincode}
                                    </div>
                                </div>

                                <div className='w-100'>
                                    <div className='d-flex justify-content-between align-items-center'>
                                        <Link to='/cart' className='text-dark'><BiArrowBack className='me-2' /> Return to Cart</Link>
                                        <Link to='/cart' className='button'>Continue to Shipping</Link>
                                        <button
                                            className='button'
                                            type='submit'
                                        >Place Order</button>
                                    </div>
                                </div>
                            </form>
                        </div>
                    </div>
                    <div className='col-5'>
                        <div className='border-bottom py-4'>
                            {
                                cartState && cartState.map((item, index) => {
                                    return (
                                        <div
                                            key={index}
                                            className='d-flex gap-10 mb-2 align-items-center'>
                                            <div className='w-75 d-flex gap-10'>
                                                <div className='w-25 position-relative'>
                                                    <span style={{ 'top': '-10px', 'right': '2px' }} className='badge bg-secondary text-white rounded-circle p-2 position-absolute'>{item?.quantity}</span>
                                                    <img
                                                        width={100}
                                                        height={100}

                                                        src={item?.productId.images[0]?.url}
                                                        alt='product' />
                                                </div>
                                                <div>
                                                    <h5 className='total-price'>{item?.productId?.title}</h5>
                                                    <p className='total-price'>{item?.color.title}</p>
                                                </div>
                                            </div>
                                            <div className='flex-grow-1'>
                                                <h5 className='total'>$ {item?.price * item?.quantity}</h5>
                                            </div>
                                        </div>
                                    )
                                })
                            }

                        </div>
                        <div className='border-bottom py-4'>
                            <div className='d-flex justify-content-between align-items-center'>
                                <p className='total'>Subtotal</p>
                                <p className='total-price'>$ {totalAmount ? totalAmount : 0}</p>
                            </div>
                            <div className='d-flex justify-content-between align-items-center'>
                                <p className='mb-0 total'>Shipping</p>
                                <p className='mb-0 total-price'>$ {totalAmount > 100 ? 0 : 5}</p>
                            </div>
                        </div>
                        <div className='d-flex justify-content-between align-items-center py-4'>
                            <h4 className='total'>Total</h4>
                            <h5 className='total-price'>$ {totalAmount ? totalAmount + (totalAmount > 100 ? 0 : 5) : 0}</h5>
                        </div>
                    </div>
                </div>
            </Container>
        </>
    )
}

export default Checkout
