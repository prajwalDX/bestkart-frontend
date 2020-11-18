import {createStore, combineReducers, applyMiddleware, compose} from 'redux'
import thunk from 'redux-thunk'
import { cartReducer } from './reducers/CartReducers'
import { productListReducer , productDetailsReducer} from './reducers/ProductReducer'
import { userRegisterReducer, userSignReducer } from "./reducers/UserReducer"
import Cookie from "js-cookie"
import { loadStripe } from '@stripe/stripe-js'

const cartItems = Cookie.getJSON("cartItems") || []
const userData = Cookie.getJSON('userData') || null
const shippingData = Cookie.getJSON('shippingAddress') || null

const stripe = loadStripe("pk_test_51Hh9VtCYFnP044uIu8FW6Cn6WoyM6FZsISbVnQxkLfeWa6xjNmbuD7aV72EcjSaa69UvaaHTavCNjePscrQKRlXz00JUajfT4s")


const initialState = {
  cart: { cartItems , shipping: shippingData, },
  userSign: { userData },
}

const reducer = combineReducers({
    productList: productListReducer,
    productDetail: productDetailsReducer,
    cart: cartReducer,
    userSign: userSignReducer,
    userRegister: userRegisterReducer

})
const store = createStore(reducer, initialState, compose(applyMiddleware(thunk)))

export default store