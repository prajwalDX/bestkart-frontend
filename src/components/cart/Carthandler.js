import { CART_ADD_ITEM, CART_REMOVE_ADDRESS, CART_REMOVE_ITEM, CART_SHIPPING, PAYMENT_FAIL, PAYMENT_REQUEST, PAYMENT_SUCCESSFUL } from "./Constants"
import Cookie from 'js-cookie'
import { Stripe } from 'stripe'
import { loadStripe } from '@stripe/stripe-js'
import {CardElement, useElements} from '@stripe/react-stripe-js'


const { default: Axios } = require("axios")

const addToCart = (productId , qty) => async (dispatch ,getState) => {
    try {
        const { data } = await Axios.get("/api/products/" + productId)
        dispatch({type: CART_ADD_ITEM, payload: {
            product: data._id,
            name: data.name,
            image: data.mainsrc,
            alt: data.alt,
            price: data.price,
            stock: data.stock,
            qty

        }})

        const { cart: {cartItems} } = getState()
        Cookie.set("cartItems" , JSON.stringify(cartItems))
    }
    catch(error) {
        console.log(error.response.data.message)
    }
}



const removeFromCart = (productId) => async (dispatch, getState) => {
    dispatch({type: CART_REMOVE_ITEM, payload: productId })
    
    const { cart: {cartItems} } = getState()
    Cookie.set("cartItems" , JSON.stringify(cartItems))
}

const proceedshipping = (address,state,country,pincode) => (dispatch,getState) => {
    dispatch({type: CART_SHIPPING, payload: {
        address,
        state,
        country,
        pincode
    } })
    const { cart: {shipping} } = getState()
    Cookie.set("shippingAddress" , JSON.stringify(shipping))
}


const removeAddress = () => async (dispatch) => {
    Cookie.remove("shippingAddress")
    dispatch({type: CART_REMOVE_ADDRESS ,payload: null })
}

const payCheckout = (card,stripe) => async (dispatch,getState) => {
    dispatch({type: PAYMENT_REQUEST})
    try{
        const { data } = await Axios.get("/api/pay")
        const result = await stripe.confirmCardPayment(data.client_secret, {
            payment_method: {
              card,
              billing_details: {
                name: 'Jenny Rosen',
              },
            }
          });
          
          if (result.paymentIntent.status === 'succeeded') {
            console.log("success")
            dispatch({type: PAYMENT_SUCCESSFUL, payload: true })
        }
          if (result.error) {
           console.log(result.error.message)
           dispatch({type: PAYMENT_FAIL, payload: false})

          } 


        
        }
       
        catch(error) {
            console.log(error)
            dispatch({type: PAYMENT_FAIL, payload: false})
        }
    }




export { addToCart, removeFromCart, proceedshipping, removeAddress, payCheckout}