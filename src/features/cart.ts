import { createSlice } from "@reduxjs/toolkit";

export type TCart = {
    id : number;
    name : string;
    price : number;
    value : number;
    img : string;
}

export type TInitialCart = {
    cart : Array<TCart>
}

const initialState : TInitialCart = {
    cart : []
}

export const cartSlice = createSlice({
    name : "cart",
    initialState,
    reducers : {
        addProductToCart : (state, action)=>{
            if(!localStorage.getItem("cart")){
                const currentCart = state;
                currentCart.cart.push(action.payload)
                localStorage.setItem("cart", JSON.stringify(currentCart.cart))
            }else{
                const currentCart : TInitialCart = {
                    cart : []
                };
                currentCart.cart = JSON.parse(localStorage.getItem("cart") as string) as Array<TCart>
                currentCart.cart.push(action.payload)
                localStorage.setItem("cart", JSON.stringify(currentCart.cart))
            }
        }
    }
})

export const {addProductToCart} = cartSlice.actions;
export default cartSlice.reducer;
