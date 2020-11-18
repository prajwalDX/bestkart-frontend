import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { addToCart, removeFromCart } from './cart/Carthandler'

import './Cart.css'
import { Link } from 'react-router-dom'

export default function Cart(props) {

    const productId = props.match.params.id
    const qty = props.location.search ? Number(props.location.search.split('=')[1]) : 1
    
    const cart = useSelector(state => state.cart)
    const { cartItems,userData }  = cart
    const dispatch = useDispatch()

    const removeFromCarthandler = (productId) => {
        dispatch(removeFromCart(productId))
    }

    useEffect( () => {
        if(productId) {
            dispatch(addToCart(productId,qty))
        }
    }, [])
    //console.log(cart)



    const moveToShip = () => {
        
        props.history.push("/signin?redirect=shipping")
    }


    return (
        <>
            <div className="back-home">
                <Link to={'/'} className="back-home-link">Back</Link>
            </div>
            <div className="wrapper full-wrapper ">
                <div className="container cart-con">
                    <div className='output'>
                    {
                        cartItems.length === 0 ?
                        <div className="empty">cart is empty !</div>
                        :
                        cartItems.map( item => (
                            <div className="items">
                                <div className="cart-img-wrapper">
                                    <img className="img" src={"." + item.image} alt={item.alt}/>
                                </div>

                                <div className="detail-buy-wrapper">
                                    <h1 className="name">{item.name}</h1>

                                    <div className="detail-buy-qty-wrapper">
                                        <label htmlFor="qty" className="detail-buy-qty-label">Qty : </label>
                                        <input type="number" id="qty-number" className="detail-buy-qty" min="1" key={item.name} value={item.qty} onChange={(e) => dispatch(addToCart(item.product, e.target.value))}/>
                                        <button className="btn remove" onClick={() => removeFromCarthandler(item.product)}>Remove</button>
                                    </div>

                                </div>
                                <h1 className="price">₹ {item.qty * item.price}</h1>
                            </div>
                            
                        )
                        )
                    }
                    </div>
                
                <div className="total">
                    <h3 className="checkout-info">
                        Total : ₹  { cartItems.reduce((a, c) => a + c.price * c.qty , 0 )}  ( { cartItems.reduce((a, c) => a  + Number(c.qty) , 0 )} items )
                    </h3>
                    <button onClick={moveToShip} className="btn btn-large">Checkout</button>
                </div>
                </div>
            </div>
        </>
    )
}
