const { default: Axios } = require("axios")
const { PRODUCT_LIST_REQUEST, PRODUCT_LIST_SUCCESS, PRODUCT_LIST_FAIL, PRODUCT_DETAIL_REQUEST, PRODUCT_DETAIL_SUCCESS, PRODUCT_DETAIL_FAIL, PRODUCT_ADD_SUCCESS, PRODUCT_ADD_FAIL } = require("../reducers/constants")

const ListProduct = () => async (dispatch) => {
    try{
        dispatch({type: PRODUCT_LIST_REQUEST})
        const {data} = await Axios.get("/api/products")
        dispatch({type: PRODUCT_LIST_SUCCESS, payload:data})
    
    }
    catch(error){
        dispatch({type: PRODUCT_LIST_FAIL, payload: error.response.data})
    }
}


const DetailsProduct = (productId) => async (dispatch) => {
    try{
        dispatch({type: PRODUCT_DETAIL_REQUEST , payload: productId})
        const {data} = await Axios.get("/api/products/" + productId)
        dispatch({type: PRODUCT_DETAIL_SUCCESS, payload:data})
    }
    catch(error){
        dispatch({type: PRODUCT_DETAIL_FAIL, payload: error.response.data.message})
    }
}

const AddProduct = (data) => async (dispatch) => {
    try {
        const res = await Axios.post('/api/products', data)
        dispatch({type: PRODUCT_ADD_SUCCESS, payload: res})
        }
    catch(error){
        dispatch({type: PRODUCT_ADD_FAIL, payload: error.response.data.message})
    }
}
export { ListProduct, DetailsProduct, AddProduct }