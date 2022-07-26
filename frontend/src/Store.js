import { createContext, useReducer } from "react";
import Rating from "./components/Rating";

const initialState = {
    userInfo: localStorage.getItem('userInfo')?
    JSON.parse(localStorage.getItem('userInfo'))
    :null,
    cart: {
        paymentMethod:localStorage.getItem('paymentMethod')?
        localStorage.getItem('paymentMethod') : '',
        shippingAddress: localStorage.getItem('shippingAddress')?
        JSON.parse(localStorage.getItem('shippingAddress')) : { },
        cartItems: localStorage.getItem('cartItems')?
        JSON.parse(localStorage.getItem('cartItems')) : []
    }
}

function reducer (state, action) {
    switch(action.type) {
        case 'CART_ADD_ITEM':
            const existProduct = state.cart.cartItems.find(item => item._id===action.payload._id) ;
            console.log('state.cart.cartItems',state.cart.cartItems);
            console.log('action.payload',action.payload);
            
            const cartItems = existProduct? state.cart.cartItems.map(item=> item._id === existProduct._id?action.payload:item):
            [...state.cart.cartItems, action.payload];
            localStorage.setItem('cartItems', JSON.stringify(cartItems));
           return  {...state, 
            cart:{
                ...state.cart, 
                cartItems
            }}
        case 'CART_REMOVE_ITEM':{
            const cartItems = state.cart.cartItems.filter(
                item => item._id !== action.payload._id
                )
                return {...state, 
                    cart:{
                        ...state.cart, 
                        cartItems
                    }}
                }
        case 'USER_SIGNIN':  
                return {
                    ...state,
                    userInfo: action.payload
                }
        case 'USER_SIGNOUT':  
                return {
                    ...state,
                    userInfo: null,
                    cart:{
                    cartItems:[],
                    shippingAddress:{},
                    paymentMethod:''
                    }
                }
        case 'SAVE_SHIPPING_ADDRESS':
            return {
                ...state,
                cart: {
                    ...state.cart,
                    shippingAddress:action.payload
                }
            }
        case 'SAVE_PAYMENT_METHOD':
            return {
                ...state,
                cart: {
                    ...state.cart,
                    paymentMethod:action.payload
                }
            }
        default:
            return state;
    };

    
}
export const Store = createContext();
export function StoreProvider (props) {
    const [state, dispatch] = useReducer(reducer, initialState);
    const value = {state, dispatch};

    return(
        <Store.Provider value = {value}>
            {props.children}
        </Store.Provider>
    )
}