import React from 'react'
import './Modal.css'

export default function AdminModal({open , children , onClose}) {
    if(!open) return null
    return (
        <>
        <div className="admin-modal-wrapper">
            <h3 className="cross-button" onClick={onClose}>X</h3>
            {children} 
        </div>
        </>
    )
}
