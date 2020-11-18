import React, { createElement, useEffect } from 'react'
import { useState } from 'react';
import { loadStripe } from '@stripe/stripe-js';
import {
  CardElement,
  Elements,
  useElements,
  useStripe
} from '@stripe/react-stripe-js';
import { payCheckout } from './cart/Carthandler';
import { useDispatch, useSelector } from 'react-redux';
import LoadingModal from './modals/LoadingModal';

// Custom styling can be passed to options when creating an Element.


export default function PaymentMethod(props) {
  const elements = useElements()
  const dispatch = useDispatch()
  const cart = useSelector(state => state.cart)
  const { cartItems, shipping, loading, paymentStatus }  = cart

  const payGatway =async (e) => {
    e.preventDefault()
    const card = elements.getElement(CardElement)
    console.log(card)
    dispatch(payCheckout(card,props.stripe))
    // props.history.push('/success')
}
  

    const CARD_ELEMENT_OPTIONS = {
        style: {
          base: {
            color: '#444444',
            fontFamily: '"Montserrat", sans-serif',
            fontSmoothing: 'antialiased',
            fontSize: '16px',
            '::placeholder': {
              color: '#aab7c4'
            }
          },
          invalid: {
            color: '#fa755a',
            iconColor: '#fa755a'
          }
        }
      }


      
    return (
     
        <>
        
            <form onSubmit={payGatway}>
            <div className="form-row">
            <label for="card-element">
                Credit or debit card
            </label>
            <CardElement
                id="card-element"
                options={CARD_ELEMENT_OPTIONS}
            />
            </div>              

            
            <button type="submit" onClick={(e) => e.disabled=true} className="btn btn-mid">Pay</button>
        </form>

        </>
    )
}