import React, { useState } from 'react'

import './Searchbar.css'

export default function Searchbar() {

    const [search, setSearch] = useState()
    const searchHandler = (e) => {
        setSearch(e.target.value)
    }

    return (
        <>
            <div className="wrapper">
                <div className="container search-con">
                    <input className="search-box" type="text" placeholder="Something Great!" onChange={searchHandler}/>
                    <button className="btn btn-mid" >Search</button>
                </div>
            </div>
        </>
    )
}
