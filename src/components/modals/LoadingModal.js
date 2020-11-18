import React, { Children, useEffect } from 'react'
import { useSelector } from 'react-redux'
import './Modal.css'

export default function LoadingModal(props) {
    const cart = useSelector(state => state.cart)
    const { cartItems, shipping, loading, paymentStatus }  = cart



    return (
        <>
        <div className="admin-modal-wrapper">
            {props.children}
        </div>
        </>
    )
}
