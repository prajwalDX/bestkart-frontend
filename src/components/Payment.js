import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { addToCart, removeFromCart, removeAddress, payCheckout } from './cart/Carthandler'
import Cookie from 'js-cookie'
import './Payment.css'
import { Link, Redirect } from 'react-router-dom'
import PaymentMethod from './PaymentMethod'
import { loadStripe } from '@stripe/stripe-js';
import {
  CardElement,
  Elements,
  useElements,
  useStripe
} from '@stripe/react-stripe-js';
import LoadingModal from './modals/LoadingModal'

export default  function Payment(props) {


    const [payment, setPayment] = useState("stripe")


    const cart = useSelector(state => state.cart)
    const user = useSelector(state => state.userSign)
    const { cartItems, shipping, loading, paymentStatus }  = cart
    const {userData }  = user

    const dispatch = useDispatch()
    const removeFromCarthandler = (productId) => {
        dispatch(removeFromCart(productId))
    }

    const removeAddressHandler = () => {
        dispatch(removeAddress())
        props.history.push('/shipping')
    }

    const [price, setPrice] = useState('')
    const [ship, setShip] = useState('')

    

    const redirects =  '/signin?redirect=shipping'
    const redirectc =  '/'
    const redirectsh =  '/shipping'


    useEffect(() => {
        if (cartItems === {}) {
          props.history.push(redirectc);
        }
        else{
            setPrice(cartItems.reduce((a, c) => a + c.price * c.qty , 0 ))
            setShip(price > 1000 ? 0 : 50)
      
        }

        return () => {
          //
        };
      }, [cartItems,loading,paymentStatus])

      useEffect(() => {
        if (!userData) {
          props.history.push(redirects);
        }
  
        return () => {
          //
        };
      }, [userData])

      useEffect(() => {
        if (!shipping) {
          props.history.push(redirectsh);
        }
        return () => {
          //
        };
      }, [shipping])

      const [num, setNum] = useState()
      const [expm, setExpm] = useState()
      const [expy, setExpy] = useState()
      const [cvc, setCvc] = useState()

      useEffect(() => {
        if (paymentStatus) {
            props.history.push('/success')
        }
      }, [paymentStatus,loading])
  


    const paymentHandler = (e) => {
        setPayment(e.target.value)
    }


    const [stripe, setStripe] = useState()



    useEffect(() => {
      if (!stripe) {
          getStripe();
      }
    }, []);
  
    const getStripe = async () => {
      const response = await loadStripe("pk_test_51Hh9VtCYFnP044uIu8FW6Cn6WoyM6FZsISbVnQxkLfeWa6xjNmbuD7aV72EcjSaa69UvaaHTavCNjePscrQKRlXz00JUajfT4s")
      setStripe(response);
    }


    return (
        !shipping ? <Redirect to='/shipping' />  :
        <>
            <div className="wrapper">
                <div className="container pay-con">
                    <div className="right-payment-wrapper">
                        <div className="product-details-pay">
                            <h1 className="payment-label">Products</h1>
                            {cartItems.map( item => (
                                <div className="items-pay">
                                    <div className="item-wrapper">
                                    <div className="cart-img-wrapper">
                                        <img className="img-pay" src={"." + item.image} alt={item.alt}/>
                                    </div>
                                    <div className="detail-buy-wrapper-pay">
                                        <h1 className="name">{item.name}</h1>
                                        <h1 className="name">Qty: {item.qty}</h1>
                                    </div>
                                    <h1 className="price">₹ {item.qty * item.price}</h1>
                                    <button className="btn remove" onClick={() => removeFromCarthandler(item.product)}>Remove</button>
                                    </div>
                                </div>
                                
                                ))
                            }

                        </div>
                        <div className="shipping-details">
                        <h1 className="payment-label">Shipping</h1>
                        <div className="address-wrapper">
                            <h1 className="name">Address:</h1>
                            <h1 className="name">{shipping.address}, { shipping.state} ,</h1>
                            <h1 className="name">{shipping.country} - {shipping.pincode}</h1>
                            <button className="btn btn-mid" onClick={() => removeAddressHandler()}>Edit</button>
                        </div>
                        </div>
                        <div className="payment-details">
                        <h1 className="payment-label">Payment Methods</h1>
                        <div className="payment-methods-col">
                        <div className="payment-options">
                            <div className="payment-option">
                                <input type="radio" id="payment-method" name="payment-method" defaultChecked value="stripe"  onChange={paymentHandler}/>
                                <label htmlFor="payment-method" className="method-label" >Stripe</label>
                            </div> 
                            <div className="payment-option">
                                <input type="radio" id="payment-method" name="payment-method" value="razorpay" onChange={paymentHandler}/>
                                <label htmlFor="payment-method" className="method-label" >Razor Pay</label>
                            </div>  
                            </div>
                            <div className="payment-info">                            
                                {stripe ?
                            <Elements stripe={stripe}>
                                <PaymentMethod  {...props} stripe={stripe} method={payment} />
                            </Elements>
                             :
                            <div>loading...</div>
                                }
                                </div>
                        </div>
 
                        </div>
                        { 
                        loading ?              
                        <LoadingModal>
                        <h3>loading</h3>
                        </LoadingModal>  
                        : 
                        null
            }
                    </div>


                    <div className="left-payment-wrapper">
                        <div className="total-pay">
                            <h3 className="checkout-info">
                                Price : ₹  {price}  
                            </h3>
                            <h3 className="checkout-info">
                                Shipping Charges: ₹ {ship}
                            </h3>
                            <h3 className="checkout-info">
                                Total: ₹ {Number(price)+Number(ship)}
                            </h3>
                            {/* <button onClick={payGatway} className="btn checkout">Pay</button> */}
                        </div>
                    </div>

                

                </div>
            </div>
        </>
    )
}
