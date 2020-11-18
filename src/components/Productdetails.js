import React, { useState, useEffect } from 'react'

import './Productdetails.css'
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { DetailsProduct } from './products-data/dataProducts'
import { addToCart } from './cart/Carthandler'

export default function Productdetails(props) {

    const productDetail = useSelector(state => state.productDetail)
    const dispatch = useDispatch()


    const { product, loading, error} = productDetail
    useEffect(() => {

        dispatch(DetailsProduct(props.match.params.id))
            
        return () => {
            //
        }
    }, [])

    const [qty, setQty] = useState(1)

    const setQuantity = (e) => {
        setQty(e.target.value)
    }

    const [img , setImg] = useState(1)

    const setImager = () => {
        const val = img >= 2? 2 : img+1
        setImg(val)
    } 

    const setImagel = () => {
        const val = img <= 1 ? 1 : img-1
        setImg(val)
    } 

    const moveToCart = () => {
        dispatch(addToCart(product._id, qty))
    }


    
    return (
        <>
            <div className="back-home">
                <Link to='/' className="back-home-link">Back</Link>
            </div>
            {
                loading ? <div className="msg">Loading...</div> :
                error? <div className="msg">error occured check internet</div> :
                (
            <div className="wrapper">
                <div className="container product-detail-con">
                    <div className="detail-img-wrapper">
                        <span className="left-arrow" onClick={setImagel}></span>
                        <img className="detail-img" src={'.'+ product.imgfolder+img+'.jpg'} alt={product.alt}/>
                        <span className="right-arrow" onClick={setImager}></span>
                    </div>
                    <div className="detail-info-wrapper">
                        <h2 className="detail-name">{product.name}</h2>
                        <h2 className="detail-des">Description:</h2>
                        <h2 className="detail-des-p">{product.description}</h2>
                        <div className="detail-price-wrapper">
                            <h2 className="detail-price">₹ {product.price}</h2>
                            <h2 className="detail-price-old">₹ {product.priceold}</h2>
                        </div>
                        <h2 className="detail-reviews">Ratings: {product.rating} &#11088;</h2>
                    </div>
                    <div className="buy-options-wrapper">
                            <h2 className="detail-buy-price">Price: ₹ {product.price}</h2>
                            <h2 className="detail-buy-status">Status: {product.stock > 0 ? "In Stock" : "Out of Stock"}</h2>
                            <div className="detail-buy-qty-wrapper">
                                <label htmlFor="qty" className="detail-buy-qty-label">Qty :</label>
                                <input type="number" id="qty-number" className="detail-buy-qty" min="1" value={qty} onChange={setQuantity}/>
                            </div>
                            <button onClick={moveToCart} className="detail-buy-btn">Add to Cart</button>
                        </div>
                </div>
            </div> )
                }
            
        </>
    )
}
