
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import './Signin.css'
import { register } from './user/userSign'


export default function Register(props) {

    const [name , setName] = useState("")
    const [email , setEmail] = useState("")
    const [pass, setPass] = useState("")

    const nameHandler = (e) => {
        setName(e.target.value)
    }
    const emailHandler = (e) => {
        setEmail(e.target.value)
    }
    const passHandler = (e) => {
        setPass(e.target.value)
    }

    const users = useSelector(state => state.userRegister)

    const { userRes, loading , error } =  users 

    useEffect(() => {
        if(userRes)
            props.history.push('/signin')
        return () => { 
        }
    }, [userRes])

    const dispatch = useDispatch()
    const registerHandler = (e) => {
        e.preventDefault()
        dispatch(register(name ,email,pass))
    }

    return (
        <>
            <div className="wrapper">
                <div className="container center-con">
                    <form className="signin-form" onSubmit={registerHandler}>
                        <h1 className="form-heading">Register.</h1>
                        { loading && <div className="process-message">loading</div> }
                        { error && <div  className="process-message">{error}</div>   }
                        <label className="label">Name</label>
                        <input type="text" name="name" id="name" className="input" onChange={nameHandler}/>
                        <label className="label">Email</label>
                        <input type="email" name="email" id="email" className="input"  onChange={emailHandler}/>
                        <label className="label">Password</label>
                        <input type="password" name="password" id="password" className="input"  onChange={passHandler}/>
                        <button className="btn btn-large" type="submit">Register</button>
                        <Link to='/signin'>
                            <h3 className="register-help-signin">Already a member? SignIn</h3>
                        </Link>
                    </form>
                </div>
            </div>
        </>
    )
}
