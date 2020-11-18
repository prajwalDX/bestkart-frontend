import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import './Signin.css'
import { signIn } from './user/userSign'


export default function Signin(props) {

    const [email , setEmail] = useState("")
    const [pass, setPass] = useState("")

    const emailHandler = (e) => {
        setEmail(e.target.value)
    }
    const passHandler = (e) => {
        setPass(e.target.value)
    }

    const userSign = useSelector(state => state.userSign)

    const { userData, loading , error } =  userSign

    const redirect = props.location.search ? props.location.search.split("=")[1] : '/'
    
    useEffect(() => {
      if (userData) {
        props.history.push(redirect);
      }
      return () => {
        //
      };
    }, [userData])

    const dispatch = useDispatch()
    const signInHandler = (e) => {
        e.preventDefault()
        dispatch(signIn(email,pass))
    }

    return (
        <>
            <div className="wrapper">
                <div className="container center-con">
                    
                    <form className="signin-form" onSubmit={signInHandler}>
                        <h1 className="form-heading">Sign In.</h1>
                        { loading && <div className="process-message">loading</div> }
                        { error && <div  className="process-message">{error}</div>   }
                        <label className="label">Email</label>
                        <input type="email" name="email" id="email" className="input" onChange={emailHandler}/>
                        <label className="label">Password</label>
                        <input type="password" name="password" id="password" className="input"  onChange={passHandler}/>
                        <button className="btn btn-large" type="submit">Sign in</button>
                        <div className="signin-help">
                            <Link to='/forgotzpassword'>
                                <h3 className="signin-help-pass" >forgot password?</h3>
                            </Link>
                            <Link to='/register'>
                                <h3 className="signin-help-new">create new account?</h3>
                            </Link>
                        </div>
                        
                    </form>
                </div>
            </div>
        </>
    )
}
