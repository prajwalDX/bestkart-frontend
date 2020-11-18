import { CART_ADD_ITEM, CART_REMOVE_ADDRESS, CART_REMOVE_ITEM, CART_SHIPPING, PAYMENT_FAIL, PAYMENT_REQUEST, PAYMENT_SUCCESSFUL } from "../cart/Constants"

function cartReducer(state = { cartItems: [], shipping: {} }, action) {
    switch (action.type) {
      case CART_ADD_ITEM:
        const item = action.payload;
        const product = state.cartItems.find(e => e.product === item.product)
        if (product) {
          return { ...state, cartItems: state.cartItems.map(e => e.product === product.product ? item : e) ,shipping: {...state.shipping} }
        }
        return { ...state, cartItems: [...state.cartItems, item], shipping: {...state.shipping} }

      case CART_REMOVE_ITEM:
        return { ...state,cartItems: state.cartItems.filter(x => x.product !== action.payload) , shipping: {...state.shipping} }

      case CART_SHIPPING:
        return { ...state ,shipping: action.payload }
      
      case CART_REMOVE_ADDRESS:
        return{ ...state , shipping: action.payload}

      case PAYMENT_REQUEST:
        return {...state, loading: true }

      case PAYMENT_SUCCESSFUL:
        return {...state, loading: false , paymentStatus: action.payload , }

      case PAYMENT_FAIL:
        return {...state, loading: false , paymentStatus: action.payload,}

      default:
        return state
    }
  }
export { cartReducer}