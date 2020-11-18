
import React ,{ useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import './Products.css'
import Searchbar from './Searchbar'

import { ListProduct } from './products-data/dataProducts'

export default function Products() {


    const productList = useSelector(state => state.productList)

    const {products, loading, error} = productList
        
    const [sorting , setSort] = useState('1')

    const dispatch = useDispatch()

    useEffect(() => {

        dispatch(ListProduct())
            
        return () => {
            
        }
    }, [])

    
    return (
        loading ? <div className="msg">Loading...</div> :
        error? <div className="msg">error occured check internet</div> :
        <>
            
            <Searchbar />
            <div className="wrapper">
                <div className="container sort-con">
                    <h2 className="sort-head">Sort :</h2>
                    <select id="sorting" className="sort-items" onChange={(e) => setSort(e.target.value)}>
                        <option value="1" className="sort-item">Price Low to High</option>
                        <option value="0" className="sort-item">Price High to Low</option>
                    </select>
                    <span className="arrow"></span>
                </div>
            </div>
            <div className="wrapper">
                <div className="container">
                    {   
                        sorting === '1' ? products.sort((a,b) => a.price - b.price) : products.sort((a,b) => b.price - a.price) ,
                        products.map(item => (
                            <Link key={item._id} to={'/product/'+ item._id}>
                            <div className="product-card">
                                <div className="product-image-wrapper">
                                    <img className="product-image" src={item.mainsrc} alt={item.alt}/>
                                </div>
                                <div className="product-data-wrapper">
                                    <h2 className="product-name">{item.name}</h2>
                                    <div className="price-data-wrapper">
                                        <h2 className="product-price">₹ {item.price}</h2>
                                        <h2 className="product-price-old">₹ {item.priceold}</h2>
                                    </div>
                                    
                                </div>
                            </div>  
                            </Link>                          
                        ))
                        
                    }
                </div>
            </div>
        </>
    )
}
