
const Cookie = require('js-cookie')
const { default: Axios } = require("axios")
const { USER_SIGNIN_REQUEST, USER_SIGNIN_SUCESS, USER_SIGNIN_ERROR, USER_SIGNOUT_REQUEST, USER_REGISTER_REQUEST, USER_REGISTER_SUCESS, USER_REGISTER_ERROR } = require("../reducers/constants")

const signIn = (email, pass) => async (dispatch) => {
    dispatch({ type: USER_SIGNIN_REQUEST, payload: { email, pass } })
    try {
      const { data } = await Axios.post("/api/users/login", { email, "password": pass})
      dispatch({ type: USER_SIGNIN_SUCESS, payload: data })
      Cookie.set('userData', JSON.stringify(data))
    } catch (error) {
      dispatch({ type: USER_SIGNIN_ERROR, payload: error.response.data.message })
    }
  }

const register = (name, email, pass) => async (dispatch) => {
    dispatch({type:USER_REGISTER_REQUEST, payload: (name, email , pass)})
    try {
        const {data} = await Axios.post("/api/users/register", {name, email , "password" : pass})
        dispatch({type:USER_REGISTER_SUCESS, payload: data})
    }
    catch(error) {
        dispatch({type: USER_REGISTER_ERROR , payload: error.response.data.message})
    }
 
}

const signOut = () =>(dispatch) => {
    Cookie.remove("userData")
    Cookie.remove("shippingAddress")
    dispatch({type: USER_SIGNOUT_REQUEST })
    
}



export { signIn, signOut, register }