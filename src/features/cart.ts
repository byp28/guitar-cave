import { createSlice } from "@reduxjs/toolkit";

export type TCart = {
    id : number;
    name : string;
    price : number;
    quantity : number;
    img : string;
}

export type TInitialCart = {
    data : {
        cart : Array<TCart>
    }
    
}

const initialState : TInitialCart = {
    data : {
        cart : []
    }
}

export const cartSlice = createSlice({
    name : "cart",
    initialState,
    reducers : {
        addProductToCart : (state, action)=>{
            if(!localStorage.getItem("cart")){
                state.data.cart.push(action.payload)
                localStorage.setItem("cart", JSON.stringify(state.data.cart))
            }else{
                state.data.cart = JSON.parse(localStorage.getItem("cart") as string) as Array<TCart>
                state.data.cart.push(action.payload)
                localStorage.setItem("cart", JSON.stringify(state.data.cart))
            }
        },
        removeProductToCart : (state, action)=>{
            const indexCart = state.data.cart.findIndex(p => p.id === action.payload)
            state.data.cart.splice(indexCart,1)
            localStorage.setItem("cart", JSON.stringify(state.data.cart))
        },
        updateProductToCart : (state, action)=>{
            const product = state.data.cart.find(p => p.id === action.payload.id as number)
            if(product){
                product.quantity = action.payload.value
                console.log(action.payload.value)
                localStorage.setItem("cart", JSON.stringify(state.data.cart))
            }
            
        },
        fillCart : (state, action) =>{
            if(localStorage.getItem("cart")){
                state.data.cart = JSON.parse(localStorage.getItem("cart") as string) as Array<TCart>
                return state
            }
        }
    }
})

export const {addProductToCart, fillCart, removeProductToCart, updateProductToCart} = cartSlice.actions;
export default cartSlice.reducer;
