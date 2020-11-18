
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import './Signin.css'
import { proceedshipping } from './cart/Carthandler'
import { Redirect } from 'react-router-dom'


export default function Shipping(props) {

    const [address , setAddress] = useState("")
    const [state , setState] = useState("")
    const [country , setCountry] = useState("")
    const [pincode, setPincode] = useState("")

    const cart = useSelector(state => state.cart)
    const user = useSelector(state => state.userSign)
    const { cartItems, shipping }  = cart
    const {userData }  = user


    const addressHandler = (e) => {
        setAddress(e.target.value)
    }
    const stateHandler = (e) => {
        setState(e.target.value)
    }
    const countryHandler = (e) => {
        setCountry(e.target.value)
    }
    const pincodeHandler = (e) => {
        setPincode(e.target.value)
    }

    const redirects =  '/signin?redirect=shipping'
    const redirectc =  '/'
    const redirectsh =  '/payment'
    
    useEffect(() => {
      if (!userData) {
        props.history.push(redirects);
      }

      return () => {
        //
      };
    }, [userData])

    useEffect(() => {
      if (!cartItems) {
        props.history.push(redirectc);
      }

      return () => {
        //
      };
    }, [cartItems])


    useEffect(() => {
      if (shipping) {
        props.history.push(redirectsh);
      }

      return () => {
        //
      };
    }, [shipping])




    const dispatch = useDispatch()
    const shippingHandler = (e) => {
        e.preventDefault()
        dispatch(proceedshipping(address,state,country,pincode))
        props.history.push('/payment')
    }

    return (
      shipping ? <Redirect to='/payment' /> 
:        <>
            <div className="wrapper">
                <div className="container center-con">
                    <form className="signin-form" onSubmit={shippingHandler}>
                        <h1 className="form-heading">Shipping Address.</h1>
                        <label className="label">Address</label>
                        <input type="text" name="name" id="name" className="input"  onChange={addressHandler} required/>
                        <label className="label">State</label>
                        <input type="text" name="name" id="name" className="input"   onChange={stateHandler} required/>
                        <label className="label">Country</label>
                        <input type="text" name="email" id="email" className="input"   onChange={countryHandler} required/>
                        <label className="label">Pincode</label>
                        <input type="text" name="password" id="password" className="input"   onChange={pincodeHandler} required/>
                        <button className="btn btn-large" type="submit">Continue</button>
                    </form>
                </div>
            </div>
        </>
    )
}
