import React from 'react'
import { useSelector } from 'react-redux'

export default function Success() {
    const cart = useSelector(state => state.cart)
    const { url,loading }  = cart
    return (loading ? <div className="msg">Loading...</div> :
        <>
         <div>done</div>
        </>
    )
}
