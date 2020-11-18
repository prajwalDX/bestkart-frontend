import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { AddProduct } from '../products-data/dataProducts'
import './Modal.css'

export default function ProductModal({open , onClose}) {
 
    const [name, setName] = useState()
    const [desc, setDesc] = useState()
    const [imgfolder, setImgfolder] = useState()
    const [mainimg, setMainimg] = useState()
    const [imgalt, setImgalt] = useState()
    const [rating, setRatings] = useState()
    const [price, setPrice] = useState()
    const [priceo, setPriceo] = useState()
    const [stock, setStock] = useState()

    const dispatch = useDispatch()
    const addProduct = async () => {
        const data = {
            name: name,
            description: desc,
            imgfolder: imgfolder,
            mainsrc: mainimg,
            alt: imgalt,
            rating: rating,
            price: price,
            priceold: priceo,
            stock: stock
        }
        dispatch(AddProduct(data))

    }

    if(!open) return null

    return (
        <>
            <div className="admin-modal-wrapper">
                <h3 className="cross-button" onClick={onClose}>X</h3>
                <h1 className="modal-info">ADD a Product</h1>
                <div className="modal-form" >
                    <div className="right-modal">
                    <label htmlFor="name" className="label" >Name :</label>
                    <input id="name" type="text" className="input" onChange={(e) => setName(e.target.value)}/>
                    <label htmlFor="desc" className="label">Description :</label>
                    <input type="text"  className="input" onChange={(e) => setDesc(e.target.value)}/>
                    <label htmlFor="" className="label">image folder :</label>
                    <input type="text" className="input" onChange={(e) => setImgfolder(e.target.value)}/>
                    <label htmlFor="" className="label">main image :</label>
                    <input type="file" className="input" accept="image/png, image/jpeg" onChange={(e) => setMainimg(e.target.value)}/>
                    <label htmlFor="" className="label">image description :</label>
                    <input type="text" className="input" onChange={(e) => setImgalt(e.target.value)}/>
                    </div>
                    <div className="left-modal">
                    <label htmlFor="" className="label">Rating :</label>
                    <input type="text" className="input" onChange={(e) => setRatings(e.target.value)}/>
                    <label htmlFor="" className="label">Price :</label>
                    <input type="text" className="input" onChange={(e) => setPrice(e.target.value)}/>
                    <label htmlFor="" className="label">Price Old:</label>
                    <input type="text" className="input" onChange={(e) => setPriceo(e.target.value)}/>
                    <label htmlFor="" className="label">Stock :</label>
                    <input type="text" className="input" onChange={(e) => setStock(e.target.value)}/>
                    
                    </div>
                </div>
                <button onSubmit={addProduct} className="btn btn-mid">Add</button>
            </div>
        </>
)}