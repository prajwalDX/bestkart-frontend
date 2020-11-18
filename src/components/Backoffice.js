import React, { useState } from 'react'
import AdminModal from './modals/AdminModal'

import ProductModal from './modals/ProductModal'

export default function Backoffice() {

    const [productModal , setProductModal] = useState(false)
    const [adminModal , setAdminModal] = useState(false)

    

    const productModalHandler = () => {
        setProductModal(true)
    }

    const adminModalHandler = () => {
        setAdminModal(true)
    }


    return (
        <>
            <div className="wrapper full-wrapper">
                <div className="container ">
                    <button className="btn btn-large" onClick={productModalHandler}>Add Product</button>
                    <button className="btn btn-large"  onClick={adminModalHandler}>Add Admin</button>
                    

                    <AdminModal open={adminModal} onClose={()=>setAdminModal(false)}>
                        <h3 className="modal-info">Enter the details below.</h3>
                        <label className="label">User ID:</label>
                        <input type="text" className="input"/>
                        <button className="btn btn-mid">Submit</button>
                    </AdminModal>
                    <ProductModal open={productModal} onClose={()=>setProductModal(false)} />
                </div>
            </div> 
        </>
    )
}
