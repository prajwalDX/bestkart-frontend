const { USER_SIGNIN_REQUEST, USER_SIGNIN_SUCESS, USER_SIGNIN_ERROR, USER_SIGNOUT_REQUEST, USER_REGISTER_REQUEST, USER_REGISTER_SUCESS, USER_REGISTER_ERROR } = require("./constants")

function userSignReducer(state ={userData: []} , action) {
    switch(action.type) {
        case USER_SIGNIN_REQUEST:
            return ({loading: true})
        case USER_SIGNIN_SUCESS:
            return ({loading: false , userData: action.payload})
        case USER_SIGNIN_ERROR:
            return ({loading: false , error: action.payload})
        case USER_SIGNOUT_REQUEST:
            return ({loading: false , userData: null})
        default:
            return state
    }
}

function userRegisterReducer(state ={} , action) {
    switch(action.type) {
        case USER_REGISTER_REQUEST:
            return ({loading: true})
        case USER_REGISTER_SUCESS:
            return ({loading: false , userRes: action.payload})
        case USER_REGISTER_ERROR:
            return ({loading: false , error: action.payload})
        default:
            return state
    }
}

export { userSignReducer,userRegisterReducer }